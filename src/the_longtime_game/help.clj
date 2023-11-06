(ns the-longtime-game.help 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.select :as select]
            [the-longtime-game.text :refer [match-prefix
                                            match-section-prefixes normalize-name
                                            wrap-quote-sections wrap-section]]))

(defn explain-map
  [map*]
  (string/join
   ", "
   (for [[x y] map*]
     (str (normalize-name x) ": " (normalize-name y)))))

(defn explain-filter
  [filter*]
  (let [sections
        [(when-let [stores (:stores filter*)]
           (explain-map stores))
         (when-let [skills (:skills filter*)]
           (explain-map skills))
         (when-let [terrain (:terrain filter*)]
           (normalize-name terrain))
         (when-let [season (:season filter*)]
           (core/int->season season))
         (when-let [infra (:infra filter*)]
           (let [[kind x] (s/conform ::select/infra infra)]
             (case kind
               :one (normalize-name x)
               :many (string/join ", " (map normalize-name x)))))
         (when-let [space (:space filter*)]
           (let [[kind x] (s/conform ::select/space space)]
             (case kind
               :one (normalize-name x)
               :many (string/join ", " (map normalize-name x)))))
         (when-let [contacts (:contacts filter*)]
           (let [[kind x] (s/conform ::select/contacts contacts)]
             (case kind
               :one (normalize-name x)
               :many (string/join ", " (map normalize-name x)))))
         (when-let [power (:power filter*)]
           (str "power: " (normalize-name power)))]]
    (string/join "; " (filter some? sections))))

(defn marshal-project-to-str
  [project]
  (wrap-section
   (string/join
    " "
    (filter some?
            [(str (:name project) ":")
             (:description project)
             (:detail project)
             (when-let [uses (:uses project)]
               (str "Uses " (string/join ", " (map name uses)) "."))
             (when-let [filter* (:filter project)]
               (str "(" (explain-filter filter*) ")"))]))))

(defn projects->str
  []
  (string/join
   "\n"
   (flatten
    ["┌────"
     (for [project project/projects
           :let [s (marshal-project-to-str project)
                 lines (string/split-lines s)
                 prefixes (match-section-prefixes lines
                                                  :first-char "├"
                                                  :one-char "├"
                                                  :end-char "│")]]
       (for [[prefix line] (map vector prefixes lines)]
         (str prefix line)))
     "└────"])))

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
          (when-let [infra (seq (:infra location))]
            (string/join
             "\n"
             (concat [(str "┬ Infrastructure")]
                     (let [prefixes (match-prefix infra)
                           infra* (map vector infra prefixes)]
                       (for [[i prefix] infra*
                             :let [s (string/capitalize (name i))]]
                         (str "│ " prefix "─ " s))))))])
        prefixes
        (match-prefix strings)
        first-prefix (if (seq strings) "┬" "─")]
    (string/join
     "\n"
     (flatten
      [(str "├" first-prefix " Location: " (:name location))
       (when (seq strings)
         (string/join
          "\n"
          (map
           (partial str "│")
           prefixes
           strings)))]))))

(defn path->str
  [herd]
  (string/join
   "\n"
   (flatten
    (for [stage (:path herd)]
      (for [location stage
            :let [lines (string/split-lines (explain-location location))]]
        lines)))))

(def terrain
  "There are seven types of terrain in the game:
   - Plains: has nutrients for growing crops.
   - Forest: has flora, which grows over time; gather deadfall for wood.
   - Mountain: good for stone-gathering, spelunking, and stargazing.
   - Steppe: rush overland easily; cross this stage without passing time.
   - Jungle: a tropical rainforest; a thick and vicious green.
   - Swamp: gather bog-iron once a year.")

(defn introduction
  [& _]
  (wrap-quote-sections
   [["At the end of each month, you may be prompted to answer the prayers of your herd."]]))

(defn credits
  [& _]
  (wrap-quote-sections
   [["THE LONGTIME, a game by Diana Fernanda Belle."
     "A love letter for a kinder world."
     "Special thanks to: Lucia Brody, Rimworld, Kitten Game, and Frostpunk."]]))

(defn individuals
  ([herd]
   "TODO")
  ([herd query]
   "TODO"))

(defn search
  [herd query]
  "TODO")
