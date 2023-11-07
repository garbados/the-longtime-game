(ns the-longtime-game.help 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.select :as select]
            [the-longtime-game.text :as text]))

(def terrain
  (as->
   "There are six types of terrain in the game:
    - Plains: grow crops in spring, harvest in summer or fall.
    - Forest: flora grows over time; gather deadfall for wood, or eat the land for food.
    - Mountain: good for stone-gathering, spelunking, and stargazing.
    - Steppe: rush overland easily; cross this stage without passing time.
    - Jungle: a tropical rainforest; a thick and vicious green.
    - Swamp: gather bog-iron once a year.
    Each stage of the herd's migration path may have up to four locations.
    Each location may have up to four constructed buildings."
   $
    (string/split $ #"\n")
    (map string/trim $)
    (text/wrap-quote-sections [$])))

(defn introduction
  [herd]
  (text/wrap-quote-sections
   [((comp text/wrap-text text/join-text)
     (str
      "Hail, O " (:spirit herd) "!
       A herd of Minots has prayed you into being; invested you with their hopes, and their skills.
       It falls to you to shepherd them through the ages,
       to decide, in subtle and decisive ways, where they go and what they do."))
    ((comp text/wrap-text text/join-text)
     "Minots have traversed the Gran-Imun-Yuliak supercontinent for eons,
      in herds large and small, across ranges wide and narrow.
      Their vast strength, rapid gallop, and four stomachs
      have made them an herbivore atop a food chain.
      Now an era of tools and crops begins to dawn,
      while greater ambitions brew in the dreams
      of humble ungulate-primates.")
    ((comp text/wrap-text text/join-text)
     "Each month, you will select three projects for the herd to enact.
      These include grazing, gathering stones, or constructing buildings.
      Type `projects` for more info on all the projects in the game.
      You can also use `search [query]` to look for specific projects.
      At the end of each month, the upkeeps of hunger and sickness apply,
      consuming nutrition and poultices respectively.
      Without enough food or rations, the herd goes hungry, degrading its abilities.
      If the herd remains hungry for an entire year, it will disband, destroying you.
      Without enough poultices, sickness spreads, reducing effective skills.
      After upkeep is applied, you will select the next location for the herd to travel to.
      The herd's migration path consists of a loop of stages;
      each stage has up to four locations, and you may travel to any location in the next stage.")
    ((comp text/wrap-text text/join-text)
     "At the beginning of each month, an event may occur.
      Events are happenings that the herd handles on its own.
      These may include weather events, interpersonal conflicts, plague and fire, and so on.
      At the end of each month, a dream may occur.
      Dreams represent the prayers of your people, and you may be prompted to answer them.
      Your counsel will influence the dreamer as they forge their life.")
    ((comp text/wrap-text text/join-text)
     "Individuals in the herd have traits, passions, skills, and fulfillment.
      Check out `individuals` for details about your herd.
      You can also use `search [query]` to look for individuals by their name, traits, et al.
      When individual fulfillment gets too low, unhappy folk will become weary and depressed.")
    ((comp #(map string/trim %) string/split-lines)
     "There are six types of terrain in the game:
      - Plains: grow crops in spring, harvest in summer or fall.
      - Forest: flora grows over time; gather deadfall for wood.
      - Mountain: good for stone-gathering, spelunking, and stargazing.
      - Steppe: rush overland easily; cross this stage without passing time.
      - Jungle: a tropical rainforest; a thick and vicious green.
      - Swamp: gather bog-iron once a year.
      Each stage of the herd's migration path may have up to four locations.
      Each location may have up to four constructed buildings.")
    ((comp text/wrap-text text/join-text)
     (str
      "Now you are ready to look after " (:name herd) ".
       Will you see them to new homes among the stars?
       Or will famine and want tear you apart?"))]))

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
       (for [project project/projects
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
