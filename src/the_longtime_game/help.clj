(ns the-longtime-game.help 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.select :as select]
            [the-longtime-game.text :as text]))

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
  [project & {:keys [width]
              :or {width text/default-width}}]
  (text/wrap-section
   (string/join
    " "
    (filter some?
            [(str (:name project) ":")
             (:description project)
             (:detail project)
             (when-let [uses (seq (:uses project))]
               (str "Uses " (string/join ", " (map name uses)) "."))
             (when-let [filter* (:filter project)]
               (str "(" (explain-filter filter*) ")"))]))
   :width width))

(defn projects->str
  []
  (let [width (- text/default-width 4)]
    (string/join
     "\n"
     (flatten
      ["┌────"
       (for [project project/projects
             :let [s (marshal-project-to-str project :width width)
                   lines (string/split-lines s)
                   prefixes (text/match-section-prefixes lines
                                                         :first-char "├"
                                                         :one-char "├"
                                                         :end-char "│")]]
         (for [[prefix line] (map vector prefixes lines)]
           (str prefix line)))
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
          (when-let [infra (seq (:infra location))]
            (string/join
             "\n"
             (concat [(str "┬ Infrastructure")]
                     (let [prefixes (text/match-prefix infra)
                           infra* (map vector infra prefixes)]
                       (for [[i prefix] infra*
                             :let [s (string/capitalize (name i))]]
                         (str "│ " prefix "─ " s))))))])
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

(defn path->str
  [herd]
  (string/join
   "\n"
   (concat
    ["┌────"]
    (flatten
     (for [i (range (count (:path herd)))
           :let [stage (nth (:path herd) i)
                 lines
                 (for [location stage
                       :let [lines (string/split-lines (explain-location location))
                             prefixes (text/match-section-prefixes lines
                                                                   :one-char "├"
                                                                   :first-char "├"
                                                                   :mid-char "││"
                                                                   :end-char "││")]]
                   (string/join
                    "\n"
                    (map str prefixes lines)))
                 lines
                 (concat
                  [(str "┬ Stage " (inc i))]
                  lines
                  ["└────"])
                 prefixes (text/match-section-prefixes lines
                                                       :one-char "├"
                                                       :first-char "├"
                                                       :end-char "│")]]
       (string/join
        "\n"
        (map str prefixes lines))))
    ["└────"])))

(def terrain
  (as->
   "There are six types of terrain in the game:
    - Plains: has nutrients for growing crops.
    - Forest: has flora, which grows over time; gather deadfall for wood.
    - Mountain: good for stone-gathering, spelunking, and stargazing.
    - Steppe: rush overland easily; cross this stage without passing time.
    - Jungle: a tropical rainforest; a thick and vicious green.
    - Swamp: gather bog-iron once a year.
    Each stage of the herd's migration path may have up to four locations." $
    (string/split $ #"\n")
    (map string/trim $)
    (text/wrap-quote-sections [$])))

(defn introduction
  [& _]
  (text/wrap-quote-sections
   [["At the end of each month, you may be prompted to answer the prayers of your herd."]]))

(defn credits
  [& _]
  (text/wrap-quote-sections
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
