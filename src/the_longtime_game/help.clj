(ns the-longtime-game.help 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.select :as select]
            [the-longtime-game.text :as text]
            [the-longtime-game.meta-text :as meta-text]))

(defn introduction
  [herd]
  (text/wrap-quote-sections
   (map text/wrap-text (string/split (meta-text/tutorial-text herd) #"\n\n"))))

(def credits
  (text/wrap-quote-sections
   [["*The Longtime*, a game by Diana Fernanda Belle."
     "A love letter for a kinder world."
     "Special thanks to: Lucia Brody, Rimworld, Kitten Game, and Frostpunk."]]))

(defn explain-map
  [map*]
  (string/join
   ", "
   (for [[x y] map*]
     (str (text/normalize-name x) ": " (text/normalize-name y)))))

(defn explain-filter
  [filter*]
  (let [sections
        [(when-let [stores (:stores filter*)]
           (explain-map stores))
         (when-let [skills (:skills filter*)]
           (explain-map skills))
         (when-let [terrain (:terrain filter*)]
           (str "terrain: " (text/normalize-name terrain)))
         (when-let [season (:season filter*)]
           (core/int->season season))
         (when-let [infra (:infra filter*)]
           (let [[kind x] (s/conform ::select/infra infra)]
             (str "infra: "
                  (case kind
                    :one (text/normalize-name x)
                    :many (string/join ", " (map text/normalize-name x))))))
         (when-let [space (:space filter*)]
           (let [[kind x] (s/conform ::select/space space)]
             (str "space: "
                  (case kind
                    :one (text/normalize-name x)
                    :many (string/join ", " (map text/normalize-name x))))))
         (when-let [contacts (:contacts filter*)]
           (let [[kind x] (s/conform ::select/contacts contacts)]
             (str "contacts: "
                  (case kind
                    :one (text/normalize-name x)
                    :many (string/join ", " (map text/normalize-name x))))))
         (when-let [power (:power filter*)]
           (str "power: " (text/normalize-name power)))]]
    (string/join "; " (filter some? sections))))

(defn marshal-project-to-str
  [project]
  (string/join
   " "
   (filter some?
           [(str (:name project) ":")
            (:description project)
            (:detail project)
            (when-let [uses (seq (:uses project))]
              (str "Uses " (string/join ", " (map name uses)) "."))
            (when-let [filter* (:filter project)]
              (str "(" (explain-filter filter*) ")"))])))

(defn projects
  [& {:keys [preface when]
      :or {when (constantly true)
           preface "Projects"}}]
  (let [width (- text/default-width 4)]
    (string/join
     "\n"
     (flatten
      [(str "┌ " preface)
       (for [project (sort-by :name project/projects)
             :let [lines (text/wrap-text (marshal-project-to-str project) width)]
             :when (when project)]
         (for [i (range (count lines))
               :let [line (nth lines i)
                     first? (zero? i)
                     prefix (if first? "├─" "│")]]
           (str prefix " " line)))
       "└────"]))))

(defn explain-location
  [location]
  (let [strings
        (filter
         some?
         [(when (pos-int? (:power location))
            (str "─ Power: " (:power location)))
          (when (some? (:flora location))
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
          (when (some? (:crop location))
            (str "─ Crop: " (name (:crop location))))
          (when (some? (:ready? location))
            (str "─ Ready? " (:ready? location)))
          (when (some? (:wild? location))
            (str "─ Wild? " (:wild? location)))
          (when-let [stores (seq (filter (comp pos-int? second) (:stores location)))]
            (str "─ Stores: "
                 (string/join
                  ", "
                  (for [[resource amount] stores]
                    (str (name resource) ": " amount)))))
          (when-let [infra (seq (:infra location))]
            (string/join
             "\n"
             (concat [(str "┬ Infrastructure")]
                     (let [prefixes (text/match-prefix infra)
                           infra* (map vector infra prefixes)]
                       (for [[i prefix] infra*
                             :let [s (string/capitalize (name i))]]
                         (str " " prefix "─ " s))))))])
        prefixes
        (text/match-prefix strings)
        first-prefix (if (seq strings) "┬" "─")]
    (string/join
     "\n"
     (flatten
      [(str first-prefix " Location: " (:name location))
       (when (seq strings)
         (string/join
          "\n"
          (map str prefixes strings)))]))))

(defn explain-stage
  [stage]
  (for [location stage
        :let [lines (string/split-lines (explain-location location))
              prefixes (text/match-section-prefixes lines
                                                    :one-char "├"
                                                    :first-char "├"
                                                    :mid-char "││"
                                                    :end-char "││")]]
    (string/join "\n" (map str prefixes lines))))

(defn path
  [herd]
  (string/join
   "\n"
   (concat
    [(str "┌ Path of " (:name herd))]
    (flatten
     (for [i (range (count (:path herd)))
           :let [stage (nth (:path herd) i)
                 lines
                 (flatten
                  [(str "┬ Stage " (inc i))
                   (explain-stage stage)
                   "└────"])
                 prefixes (text/match-section-prefixes lines
                                                       :one-char "├"
                                                       :first-char "├"
                                                       :end-char "│")]]
       (string/join "\n" (map str prefixes lines))))
    ["└────"])))

(defn explain-individual
  [herd individual & {:keys [preface]}]
  (let [smiley (cond
                 (> (:fulfillment individual) (* core/max-fulfillment 2/3)) "😄"
                 (> (:fulfillment individual) (* core/max-fulfillment 1/2)) "😀"
                 (> (:fulfillment individual) (* core/max-fulfillment 1/3)) "🙁"
                 :else "😢")]
    (text/wrap-section
     (str preface (:name individual) ", " (core/get-age herd individual)
          ", " smiley
          (when-let [traits (seq (:traits individual))]
            (str "; " (string/join ", " (map name traits))))
          (when-let [passions (seq (:passions individual))]
            (str "; passions: " (string/join ", " (map name passions))))
          (when-let [skills (seq (filter (comp pos-int? second) (:skills individual)))]
            (str "; "
                 (string/join
                  ", "
                  (for [[skill amount] skills]
                    (str (name skill) " " amount))))))

     :one-char "├─"
     :first-char "├─"
     :mid-char "│"
     :end-char "│")))

(defn individuals
  [herd]
  (string/join
   "\n"
   [(str "┌ Population of " (:name herd))
    (str "├─ Individuals: " (count (:individuals herd)))
    (str "├─ Syndicates: " (string/join ", " (map core/syndicate-name (:syndicates herd))))
    (let [individual (rand-nth (:individuals herd))]
      (explain-individual herd individual :preface "Random: "))
    (let [individual (first (sort (fn [i1 i2] (< (:fulfillment i1) (:fulfillment i2)))
                                  (:individuals herd)))]
      (explain-individual herd individual :preface "Unhappiest: "))
    (let [traits (frequencies (reduce concat (map :traits (:individuals herd))))
          traits (take 3 (sort (fn [[_ n1] [_ n2]] (> n1 n2)) traits))]
      (str "├─ Common traits: "
           (string/join
            ", "
            (for [[trait n] traits]
              (str (name trait) ": " n)))))
    (let [passions (frequencies (reduce concat (map :passions (:individuals herd))))
          passions (take 3 (sort (fn [[_ n1] [_ n2]] (> n1 n2)) passions))]
      (str "├─ Common passions: "
           (string/join
            ", "
            (for [[passion n] passions]
              (str (name passion) ": " n)))))
    "└────"]))

(defn search
  [herd query]
  (let [pattern (re-pattern (str "(?i)" query))
        find-pattern (partial re-find pattern)]
    (string/join
     "\n"
     [(projects
       :preface (str "Projects matching: " query)
       :when
       #(->> (select-keys % [:name :description :detail])
             (map text/normalize-name)
             (filter find-pattern)
             seq))

      (string/join
       "\n"
       (flatten
        [(str "┌ Individuals matching: " query)
         (for [individual (:individuals herd)
               :when (or (find-pattern (:name individual))
                         (seq (filter find-pattern (map name (:traits individual))))
                         (seq (filter find-pattern (map name (:passions individual)))))]
           (explain-individual herd individual))
         "└────"]))])))
