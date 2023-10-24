(ns the-longtime-game.repl
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.event :as event]))

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
             footer "└────"
             width 80
             raw? false}}]
  (let [text (quote-text s
                         :prefix prefix
                         :width width
                         :raw? raw?)]
    (string/join "\n" [header text footer])))

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
      s)))

(defn prompt-text
  [& {:keys [prefix forbidden error]
      :or {prefix "<"
           forbidden #{}
           error "That answer is not allowed."}}]
  (print (str prefix " "))
  (let [answer (handle-read-line (read-line))]
    (print "\n")
    (if (contains? forbidden answer)
      (do
        (println (quote-text error))
        (prompt-text :prefix prefix
                     :forbidden forbidden
                     :error error))
      answer)))

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
           (< (dec answer) (count options)))
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

(defn await-text
  [prompt & {:keys [forbidden prefix default]
             :or {forbidden #{}
                  prefix "<"}}]
  (println (quote-text prompt :prefix "!"))
  (let [default-forbidden? (contains? forbidden default)
        answer (prompt-text :prefix prefix
                            :forbidden forbidden)]
    (print "\n")
    (if (seq answer)
      (if (and (= answer default)
               default-forbidden?)
        (await-text prompt
                    :prefix prefix
                    :forbidden forbidden
                    :default default)
        answer)
      (if default-forbidden?
        (await-text prompt
                    :prefix prefix
                    :forbidden forbidden
                    :default default)
        default))))

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
    (println "├─ Hunger:" (:hunger herd))
    (println "├─ Sickness:"
             (as-> (:sickness herd) $
               (/ $ population)
               (* $ 100)
               (float $)
               (format "%.2f" $)
               (str $ "%")))
    (let [fulfillments (map :fulfillment (:individuals herd))
          average (as-> fulfillments $
                    (reduce + 0 $)
                    (/ $ population))
          stdev (as-> fulfillments $
                  (map - $ (repeat average))
                  (map #(* % %) $)
                  (reduce + $)
                  (/ $ (dec population))
                  (Math/sqrt $))]
      (println "├┬ Fulfillment")
      (println "│├─ avg:" (format "%.2f" (float average)))
      (println "│└─ std:" (format "%.2f" stdev)))
    (let [location (core/current-location herd)]
      (println "├┬ Location:" (:name (get (first (:path herd)) (:index herd))))
      (when-let [infra (seq (:infra location))]
        (println "│├┬ Infrastructure")
        (let [prefixes (match-prefix infra)
              infra* (map vector infra prefixes)]
          (doseq [[i prefix] infra*]
            (println (str "││" prefix "─ " i)))))
      (when-let [stores (seq (:stores location))]
        (println "│├┬ Stored")
        (let [stores (sort stores)
              prefixes (match-prefix stores)
              stores* (map into stores prefixes)]
          (doseq [[resource amount prefix] stores*
                  :let [name* (-> resource name string/capitalize)]]
            (println (str "││" prefix "─ " name* ": " amount)))))
      (let [strings
            (filter
             some?
             [(when (some? (:flora location))
                (str "─ Flora: " (:flora location)))
              (when (some? (:depleted? location))
                (str "─ Depleted? " (:depleted? location)))
              (when (= :plains (:terrain location))
                (str "─ Nutrients: "
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
                (str "─ Crop: " (:crop location)))
              (when (some? (:ready? location))
                (str "─ Ready? " (:ready? location)))
              (when (some? (:wild? location))
                (str "─ Wild? " (:wild? location)))])
            prefixes
            (match-prefix strings)]
        (println
         (string/join
          "\n"
          (map
           (fn [s prefix]
             (str "│" prefix s))
           strings
           prefixes)))))
    (println "├┬ Skills")
    (let [skills (sort skill-levels)
          prefixes (match-prefix skills)
          skills* (map into skills prefixes)]
      (doseq [[skill amount prefix] skills*
              :let [name* (-> skill name string/capitalize)]]
        (println (str "│" prefix "─ " name* ": " amount))))
    (let [stores (->> (:stores herd)
                      seq
                      (filter
                       (fn [[_ amount]]
                         (pos-int? amount)))
                      sort)]
      (when (seq stores)
        (println "├┬ Stores")
        (doseq [[resource amount prefix]
                (map into stores (match-prefix stores))
                :let [name* (-> resource name string/capitalize)]]
          (println (str "│" prefix "─ " name* ": " amount)))))
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
  (when-let [passions (seq (:passions individual))]
    (println "├─ Passions:" (string/join ", " (map name passions))))
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

(defn marshal-info
  [herd]
  (let [[journeyings deaths] (core/shift-population herd)
        [new-adults new-dead] (core/calc-pop-changes herd journeyings deaths)]
    {:new-adults new-adults
     :new-dead new-dead
     :event nil
     :projects []
     :dreams []}))

(defn cause-event
  [info herd]
  (let [{:keys [name marshal-fn text-fn effect] :as event}
        (->> event/events
             (filter
              (partial event/can-event-trigger? info herd))
             shuffle
             first)
        cast (event/get-cast herd event)
        args (marshal-fn info herd)
        blurb (text-fn info herd cast args)
        info (assoc info :event name)]
    (println (wrap-quote-text blurb))
    (effect info herd cast args)))

#_(defn introduce-location
  [herd]
  (println
   (wrap-quote-text
    (string/join " " [(event/get-remark herd)
                      (event/gen-moment herd)
                      (event/gen-moment herd)]))))

(defn select-project
  [info herd]
  (let [candidates
        (filter (partial project/can-enact? herd)
                project/projects)
        name->candidate
        (->> candidates
             (map
              (fn [candidate]
                [(:name candidate) candidate]))
             (into {}))
        name (select-from-options
              "Select a project to enact:"
              (keys name->candidate))
        candidate (name->candidate name)]
    [(update info :projects conj name)
     (project/enact-project herd candidate)]))

(defn select-month-projects
  [info herd]
  (reduce
   (fn [[info herd] i]
     (print-herd herd)
     (println (quote-text (str "Project " (inc i) " of 3")))
     (let [[info herd] (select-project info herd)]
       [info herd]))
   [info herd]
   (range 3)))

(defn answer-prayer
  [info herd]
  (let [{:keys [marshal-fn
                choices-fn
                text-fn
                effect]
         :as dream}
        (->> event/dreams
             (concat (:dreams info))
             (filter
              (partial event/can-dream-trigger? info herd))
             shuffle
             first)
        cast (event/get-cast herd dream)
        args (marshal-fn info herd cast)
        blurb (text-fn info herd cast args)
        choices (choices-fn info herd cast args)]
    (println (wrap-quote-text blurb))
    (let [choice
          (select-from-options "How do you counsel?" choices)]
      (effect info herd cast args choice))))

(defn choose-next-location
  [herd]
  (println (:path herd))
  (let [next-stage (second (:path herd))
        index
        (if (= 1 (count next-stage))
          0
          (let [names (map :name next-stage)
                name (select-from-options
                      "Where shall the herd go next?"
                      names)]
            (.indexOf names name)))]
    (core/next-location herd index)))

(defn decide-carrying
  [herd]
  (let [remaining (core/carry-limit herd)
        [_ carrying]
        (reduce
         (fn [[remaining carrying] resource]
           (let [amount (get-in herd [:stores resource] 0)
                 carry
                 (if (zero? amount)
                   0
                   (let [n (min amount remaining)
                         s (name resource)]
                     (select-in-range (str "Carry how much " s "? "
                                           amount " " s "; " remaining " carryable.")
                                      n)))]
             [(- remaining carry)
              (assoc carrying resource carry)]))
         [remaining {}]
         core/carryable)]
    (println
     (wrap-options
      "The herd will carry with it:"
      (for [[resource amount] (seq carrying)]
        (str resource ": " amount))))
    (if (select-from-options "OK?" [true false])
      (core/keep-and-leave-behind herd carrying)
      (decide-carrying herd))))

(defn leave-behind
  [herd]
  (let [leftovers (get-in herd [:stores :food] 0)
        herd (assoc-in herd [:stores :food] 0)
        location (core/current-location herd)
        location
        (if (core/local-infra? herd :granary)
          (update-in location [:stores :food] + leftovers)
          location)
        herd (assoc-in herd [:path (:index herd)] location)]
    (if (core/must-leave-some? herd)
      (decide-carrying herd)
      herd)))

(defn do-month
  [herd]
  (if (= :steppe (:terrain (core/current-location herd)))
    (choose-next-location herd)
    (let [{:keys [new-adults new-dead] :as info} (marshal-info herd)
          ;; TODO announce with println
          herd (core/apply-pop-changes herd new-adults new-dead)
          ;; [info herd] (cause-event info herd)
          [info herd] (select-month-projects info herd)
          ;; herd (answer-prayer info herd)
          herd (core/apply-herd-upkeep herd)
          herd (leave-behind herd)
          herd (choose-next-location herd)
          herd (core/inc-month herd)]
      herd)))
