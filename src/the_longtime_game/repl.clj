(ns the-longtime-game.repl
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [clojure.test.check.generators :as g]
            [the-longtime-game.event :as event]
            [the-longtime-game.project :as project]
            [the-longtime-game.core :as core]))

(defn collect-text
  [s]
  (vec
   (for [p (string/split s #"\n\n")]
     (string/join
      "\n"
      (for [line (string/split p #"\n")
            :let [trimmed (string/trim line)]
            :when (< 0 (count trimmed))]
        trimmed)))))

(defn wrap-text
  ([s]
   (wrap-text s 80))
  ([s width]
   (map
    #(string/join " " %)
    (reduce
     (fn [lines line]
       (reduce
        (fn [segment word]
          (let [line (last segment)
                line* (string/join " " (concat line [word]))
                line-width (count line*)]
            (if (> line-width width)
              (conj segment [word])
              (conj (pop segment)
                    (conj line word)))))
        lines
        (string/split line #" ")))
     [[]]
     (string/split-lines s)))))

(defn quote-text
  [s & {:keys [prefix width raw?]
        :or {prefix ">"
             width 80
             raw? false}}]
  (let [width* (- width (count prefix))
        sections (map
                  #(wrap-text % width*)
                  (if raw? [s] (collect-text s)))
        lines (string/join
               (str "\n" prefix "\n")
               (for [section sections]
                 (string/join
                  "\n"
                  (for [line section]
                    (string/join " " [prefix line])))))]
    lines))

(defn wrap-quote-text
  [s & {:keys [prefix header footer width raw?]
        :or {header "┌────"
             prefix "│"
             footer "└────"}}]
  (string/join "\n" [header
                     (quote-text s
                                 :prefix prefix
                                 :width width
                                 :raw? raw?)
                     footer]))

(defn wrap-options
  [header options & {:keys [prefix prefix-h footer]
                     :or {prefix-h "┌"
                          prefix "├─"
                          footer "└────"}}]
  (let [lines
        (concat [(string/join " " [prefix-h header])]
                (map
                 (fn [option]
                   (string/join " " [prefix option]))
                 options)
                [footer])]
    (string/join "\n" lines)))

(defn handle-read-line
  [s & [predicates {}]]
  (let [words (string/split s #" ")
        predicate (-> words
                      first
                      string/trim
                      string/lower-case)
        int-choice (try
                     (Integer/parseInt predicate)
                     (catch Exception _ nil))
        args (rest words)]
    (cond
      int-choice int-choice
      (contains? predicates predicate)
      (apply (-> predicate keyword predicates) args)
      :else
      nil)))

(defn prompt-text
  [& {:keys [prefix forbidden error]
      :or {prefix "<"
           forbidden []
           error "That answer is not allowed."}}]
  (print (str prefix " "))
  (let [s (read-line)
        x (handle-read-line s)]
    (cond
      (contains? forbidden x)
      (println (quote-text error))
      :else x)))

(defn select-from-options
  [prompt options & {:keys [may-cancel?]
                     :or {may-cancel? false}}]
  (let [options* (map #(string/join ". " [(inc %1) %2])
                      (range (count options))
                      options)]
    (println (wrap-options prompt options*)))
  (let [answer (prompt-text)]
    (cond
      (and (int? answer)
           (< answer (count options)))
      (nth options (dec answer))
      (and may-cancel?
           (= answer "cancel"))
      nil
      :else
      (select-from-options prompt options :may-cancel? may-cancel?))))

(defn select-in-range
  [prompt n]
  (println (quote-text prompt :prefix "!"))
  (let [answer (prompt-text)]
    (if (and (int? answer)
             (<= answer n))
      answer
      (select-in-range prompt n))))

(defn await-confirmation
  ([]
   (await-confirmation "Press enter to proceed."))
  ([prompt]
   (println (quote-text prompt :prefix "!"))
   (read-line)))

(defn match-prefix
  [l]
  (concat
   (map (constantly "├")
        (range (dec (count l))))
   ["└"]))

(defn print-herd
  [{:keys [individuals syndicates] :as herd}]
  (let [population (count individuals)
        syndicate-names
        (->> syndicates
             (map core/syndicate-name)
             sort
             (string/join ", "))
        skill-levels
        (map
         (fn [skill]
           [skill (core/collective-skill herd skill)])
         core/skills)]
    (println "┌────")
    (println "├" (:name herd))
    (println "├─ Month:" (:month herd))
    (println "├─ Population:" population)
    (println "├─ Syndicates:" syndicate-names)
    (println "├─ Location:" (:name (get (first (:path herd)) (:index herd))))
    (println "├─ Fulfillment (avg):"
             (as-> (:individuals herd) $
               (map :fulfillment $)
               (reduce + $)
               (/ $ population)
               (int $)))
    (println "├─ Hunger:" (:hunger herd))
    (println "├─ Sickness:"
             (as-> (:sickness herd) $
               (/ $ population)
               (* $ 100)
               (float $)
               (format "%.2f" $)
               (str $ "%")))
    (println "├┬ Skills")
    (let [skills (sort skill-levels)
          prefixes (match-prefix skills)
          skills* (map into skills prefixes)]
      (doseq [[skill amount prefix] skills*
              :let [name* (-> skill name string/capitalize)]]
        (println (str "│" prefix "─ " name* ": " amount))))
    (println "├┬ Stores")
    (let [stores (sort (seq (:stores herd)))
          prefixes (match-prefix stores)
          stores* (map into stores prefixes)]
      (doseq [[resource amount prefix] stores*
              :let [name* (-> resource name string/capitalize)]]
        (println (str "│" prefix "─ " name* ": " amount))))
    (println "├┬ Next Stage" (str "(of " (count (:path herd)) ")"))
    (let [locations (sort (map :name (second (:path herd))))
          prefixes (match-prefix locations)
          locations* (map vector locations prefixes)]
      (doseq [[name* prefix] locations*]
        (println (str "│" prefix "─ " name*))))
    (println "└────")))

(defn print-location
  [location]
  (println "┌────")
  (println "├" (:name location))
  (when-let [infra (seq (:infra location))]
    (println "├┬ Infrastructure")
    (let [prefixes (match-prefix infra)
          infra* (map vector infra prefixes)]
      (doseq [[i prefix] infra*]
        (println (str "│" prefix "─ " i)))))
  (when-let [stores (seq (:stores location))]
    (println "├┬ Stored")
    (let [stores (sort stores)
          prefixes (match-prefix stores)
          stores* (map into stores prefixes)]
      (doseq [[resource amount prefix] stores*
              :let [name* (-> resource name string/capitalize)]]
        (println (str "│" prefix "─ " name* ": " amount)))))
  (when (some? (:flora location))
    (println "├─ Flora:" (:flora location)))
  (when (some? (:depleted? location))
    (println "├─ Depleted?" (:depleted? location)))
  (when (= :plains (:terrain location))
    (println "├─ Nutrients:"
             (string/join
              ", "
              (map (fn [nutrient]
                     (string/join
                      " "
                      [(-> nutrient
                           name
                           string/capitalize)
                       (get location nutrient)]))
                   [:n :k :p]))))
  (when (contains? location :crop)
    (println "├─ Crop:" (:crop location)))
  (when (some? (:ready? location))
    (println "├─ Ready?" (:ready? location)))
  (when (some? (:wild? location))
    (println "├─ Wild?" (:wild? location)))
  (println "└────"))

(defn print-individual
  [herd individual]
  (println "┌────")
  (println "├" (:name individual))
  (println "├─ Age:" (core/get-age herd individual))
  (println "├─ Fulfillment:" (:fulfillment individual))
  (when-let [traits (seq (:traits individual))]
    (println "├─ Traits:" (string/join ", " traits)))
  (when-let [passions (map name (seq (:passions individual)))]
    (println "├─ Passions:" (string/join ", " passions)))
  (println "├┬ Skills")
  (let [skills (->> (:skills individual)
                    (filter
                     (fn [[_ amount]]
                       (> amount 0)))
                    sort)
        skills* (map into skills (match-prefix skills))]
    (doseq [[skill amount prefix] skills*
            :let [name* (-> skill name string/capitalize)]]
      (println (str "│" prefix "─ " name* ": " amount))))
  (println "└────"))
