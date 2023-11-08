(ns the-longtime-game.project
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [clojure.string :as string]
            [the-longtime-game.building :as building]
            [the-longtime-game.core :as core]
            [the-longtime-game.select :as select]
            [the-longtime-game.space-text :as space-text]))

(def base-need 50)
(def low-need 10)

(def skill-multiplier 100)

(def earlygame-skill 10)
(def midgame-skill 100)
(def endgame-skill 1000)

(defn skill->multiplier
  [skill-amount]
  (+ 1 (/ skill-amount skill-multiplier)))

(def flora-bonus
  #(:flora (core/current-location %)))

(def flora-filter
  #(let [location (core/current-location %)]
     (and (> (:flora location 0) 0)
          (false? (:depleted? location)))))

(def deplete-land
  #(assoc % :depleted? true))

(defn trade-factory
  [resource x n m]
  (fn [herd]
    (let [floor (int (/ x n))
          roll (int (/ x (inc (rand-int m))))]
      (update-in herd [:stores resource] + floor roll))))

(def construction-projects
  (for [[name*
         {:keys [description detail uses filter filter-fn text-fn]}]
        building/building->info]
    (cond-> {:name (str "Construct " (building/building->name name*))
             :description description
             :detail detail
             :uses (cond
                     (nil? uses) #{:craftwork}
                     (keyword? uses) #{:craftwork uses}
                     (seq uses) uses)
             :filter filter
             :filter-fn
             (fn [herd]
               (let [location (core/current-location herd)]
                 (and
                  (not (contains? (:infra location) name*))
                  (> core/max-buildings (count (:infra location)))
                  (if filter-fn
                    (filter-fn herd)
                    true))))
             :location-effect
             (fn [location]
               (update location :infra conj name*))}
      text-fn (assoc :text-fn text-fn))))

(defn gather-factory
  [n resources & {:keys [bonus-fn infra]
                  :or {bonus-fn
                       (constantly 1)}}]
  (fn [herd skill-amount]
    (let [modifier (skill->multiplier skill-amount)
          infra-bonus
          (if (and infra
                   (core/local-infra? herd infra))
            2
            1)
          bonus (bonus-fn herd)]
      (reduce
       (fn [herd [resource amount]]
         (update-in herd [:stores resource] + amount))
       herd
       (for [[resource x] resources
             :let [amount (int (* x n modifier infra-bonus bonus))]]
         [resource amount])))))

(defn fulfillment-factory
  [n & {:keys [bonus-fn infra]
        :or {bonus-fn (constantly 1)}}]
  (fn [herd skill-amount]
    (let [modifier (skill->multiplier skill-amount)
          infra-bonus
          (if (and infra
                   (core/local-infra? herd infra))
            2
            1)
          bonus (bonus-fn herd)
          amount (int (* n modifier infra-bonus bonus))]
      (core/update-individuals herd core/inc-fulfillment amount))))

(def planting-projects
  (for [crop core/crops
        :let [[nutrients amount] (core/crop-info crop)
              nutrient-names (string/join ", " (map name nutrients))]]
    {:name (str "Plant " (name crop) " (" nutrient-names ")")
     :description "Plant in spring; harvest in summer or fall."
     :detail (str "Crop uses " amount " of each of its nutrients per year.")
     :uses [:herbalism]
     :filter (cond-> {:terrain :plains
                      :season 0}
               (= 1 (count nutrients))
               (merge {:skills {:herbalism base-need}}))
     :filter-fn
     (fn [herd]
       (let [location (core/current-location herd)]
         (and
          (or (nil? (:crop location))
              (true? (:wild? location)))
          (every? true? (map #(>= (get location % 0) amount) nutrients)))))
     :location-effect
     (fn [location]
       (-> (core/update-nutrients nutrients amount location)
           (assoc :crop crop
                  :wild? false
                  :ready? false)))}))

(def manufacturing-projects
  (for [[resource x] [[:stone 1]
                      [:bone  2]
                      [:metal 4]]]
    {:name (str "Manufacture " (name resource) " tools")
     :description "Produce tools from " (name resource) "."
     :detail "Better materials provide more tools!"
     :uses [:craftwork]
     :filter {:stores (assoc {} resource base-need)}
     :effect
     (gather-factory 10 [[:tools x]]
                     :infra :workshop)}))

(def projects
  (concat
   construction-projects
   planting-projects
   manufacturing-projects
   [{:name "Cook rations"
     :description "Prepare travel-ready meals that the herd can carry with it."
     :detail "Food cannot be transported, but rations can."
     :uses [:medicine]
     :filter {:stores {:food base-need}}
     :effect
     (gather-factory base-need [[:rations 1]]
                     :infra :kitchen)}
    {:name "Cook rations mechanically"
     :description "Using advanced mechanisms, automate much of the cooking process."
     :detail "Produces more rations, but consumes tools and power."
     :uses [:medicine]
     :filter {:stores {:food base-need
                       :tools low-need}
              :power 1}
     :effect
     (gather-factory base-need [[:rations 2]]
                     :infra :kitchen)}
    {:name "Eat the land"
     :description "Consume the forest's lower layers, converting detritus to rough calories."
     :detail "Reduces the forest's flora, but higher flora produces more food."
     :uses [:herbalism]
     :filter {:terrain :forest}
     :filter-fn flora-filter
     :effect
     (gather-factory 100 [[:food 1]]
                     :bonus-fn flora-bonus)
     :location-effect deplete-land}
    {:name "Elongate path"
     :description "Add another stage to the migration path."
     :detail "Longer paths support larger herds."
     :uses [:organizing]
     :filter {:skills {:organizing midgame-skill}}
     :effect
     (fn [herd _]
       (let [options (take 2 (shuffle (vec core/terrains)))
             locations (vec (map core/init-location options))]
         (update herd :path
                 (fn [path]
                   (vec
                    (concat (subvec path 0 1)
                            [locations]
                            (subvec path 1)))))))}
    {:name "Explore"
     :description "Add another location to the next stage of the path."
     :detail "Each stage may have up to four locations, each of different terrain."
     :uses [:organizing]
     :filter {:skills {:organizing 20}}
     :filter-fn
     (fn [herd]
       (> 4 (count (second (:path herd)))))
     :effect
     (fn [herd _]
       (let [terrains (set (map :terrain (get-in herd [:path 1])))
             ok-terrains (filter (complement terrains) core/terrains)
             location (-> ok-terrains vec rand-nth core/init-location)]
         (update-in herd [:path 1] conj location)))}
    {:name "Gather bog-iron"
     :uses [:geology]
     :filter {:terrain :swamp}
     :filter-fn
     #(false? (:depleted? (core/current-location %)))
     :effect
     (gather-factory base-need [[:ore 1]])
     :location-effect
     (fn [location]
       (assoc location :depleted? true))}
    {:name "Gather bog-iron with magnets"
     :uses [:geology]
     :filter {:terrain :swamp
              :power 1
              :stores {:tools 10}}
     :filter-fn
     #(false? (:depleted? (core/current-location %)))
     :effect
     (gather-factory base-need [[:ore 2]])}
    {:name "Gather deadfall"
     :uses [:herbalism]
     :filter {:terrain :forest}
     :filter-fn flora-filter
     :effect
     (gather-factory base-need [[:wood 1]
                                [:bone 1/2]]
                     :bonus-fn flora-bonus)
     :location-effect deplete-land}
    {:name "Gather stones"
     :uses [:geology]
     :effect
     (gather-factory base-need [[:stone 1]
                                [:ore 1/10]]
                     :infra :quarry
                     :bonus-fn
                     (fn [herd]
                       (if (= :mountain (:terrain (core/current-location herd)))
                         3/2
                         1)))}
    {:name "Graze"
     :uses [:herbalism]
     :effect
     (gather-factory base-need [[:food 1]]
                     :bonus-fn
                     (fn [herd]
                       (if (= 3 (core/get-season herd))
                         1/2
                         1)))}
    {:name "Harvest crops"
     :uses [:herbalism]
     :filter {:terrain :plains}
     :filter-fn
     #(true? (:ready? (core/current-location %)))
     :effect
     #(update-in %1 [:stores :food] +
                 (int (* 100 (skill->multiplier %2))))
     :location-effect
     #(assoc %
             :crop nil
             :ready? false)}
    {:name "Harvest crops mechanically"
     :uses [:herbalism]
     :filter {:terrain :plains
              :stores {:tools 10}
              :power 1}
     :filter-fn
     #(true? (:ready? (core/current-location %)))
     :effect
     #(update-in %1 [:stores :food] +
                 (int (* 200 (skill->multiplier %2))))
     :location-effect
     #(assoc %
             :crop nil
             :ready? false)}
    {:name "Hold festival"
     :uses [:athletics :organizing]
     :filter-fn
     #(core/herd-has-nutrition? % 1/5)
     :effect
     #(-> ((fulfillment-factory 3 :infra :stadium) %1 %2)
          (core/consume-nutrition 1/5))}
    {:name "Launch probe"
     :uses [:craftwork :organizing]
     :filter {:power 2
              :stores {:metal 500 :tools 1000}
              :infra :mag-launchpad}
     :filter-fn
     #(nil? (get-in % [:space :probe]))
     :effect
     #(-> (update % :space conj :probe)
          (core/update-individuals core/inc-fulfillment 20))
     :text-fn
     (constantly space-text/probe)}
    {:name "Launch permanent space station"
     :uses [:craftwork :organizing]
     :filter {:power 2
              :stores {:metal 1500 :tools 2000}}
     :filter-fn
     #(and (core/local-infra? % :mag-launchpad)
           (contains? (:space %) :probe)
           (nil? (get-in % [:space :station])))
     :effect
     #(-> (update % :space conj :station)
          (core/update-individuals core/inc-fulfillment 25))
     :text-fn
     (constantly space-text/station)}
    {:name "Launch shipyard requisites"
     :uses [:craftwork :organizing]
     :filter {:power 8
              :stores {:metal 5000 :tools 10000}}
     :filter-fn
     #(and (core/local-infra? % :mag-launchpad)
           (contains? (:space %) :probe)
           (contains? (:space %) :station)
           (nil? (get-in % [:space :shipyard])))
     :effect
     (fn [herd]
       (-> herd
           (update :space conj :shipyard)
           (core/update-individuals core/inc-fulfillment 30)))
     :text-fn
     (constantly space-text/shipyard)}
    {:name "Launch ringworld requisites"
     :uses [:craftwork :organizing]
     :filter {:power 16
              :stores {:metal 50000 :tools 100000}}
     :filter-fn
     #(and (core/local-infra? % :mag-launchpad)
           (contains? (:space %) :probe)
           (contains? (:space %) :station)
           (contains? (:space %) :shipyard)
           (nil? (get-in % [:space :ringworld])))
     :effect
     (fn [herd]
       (-> herd
           (update :space conj :ringworld)
           (core/update-individuals core/inc-fulfillment 40)))
     :text-fn
     (constantly space-text/ringworld)}
    {:name "Launch mobile ringworld requisites"
     :uses [:craftwork :organizing]
     :filter {:power 32
              :stores {:metal 500000 :tools 1000000}}
     :filter-fn
     #(and (core/local-infra? % :mag-launchpad)
           (contains? (:space %) :probe)
           (contains? (:space %) :station)
           (contains? (:space %) :shipyard)
           (contains? (:space %) :ringworld)
           (nil? (get-in % [:space :mobile-ringworld])))
     :effect
     (fn [herd]
       (-> herd
           (update :space conj :mobile-ringworld)
           (core/update-individuals core/inc-fulfillment 50)))
     :text-fn
     (constantly space-text/mobile-ringworld)}
    {:name "Mag-smelt metal"
     :uses [:craftwork]
     :filter {:power 1
              :stores {:ore base-need}}
     :filter-fn
     #(core/local-infra? % :mag-forge)
     :effect
     (gather-factory base-need [[:metal 1]])}
    {:name "Prepare poultices"
     :uses [:medicine]
     :filter {:stores {:food base-need}}
     :effect
     (gather-factory base-need [[:poultices 1/2]]
                     :infra :hospital)}
    {:name "Smelt metal"
     :uses [:craftwork]
     :filter {:season 2
              :stores {:wood base-need :ore base-need}}
     :filter-fn
     #(core/local-infra? % :wind-forge)
     :effect
     (gather-factory base-need [[:metal 1/2]]
                     :infra :monsoon-bellows)}
    {:name "Spelunk"
     :uses [:athletics :geology]
     :filter {:terrain :mountain
              :stores {:tools 5}}
     :effect
     (gather-factory base-need [[:ore 1]])}
    {:name "Stargaze"
     :uses [:organizing]
     :filter {:terrain :mountain}
     :effect
     (fulfillment-factory 2 :infra :observatory)}
    {:name "Synthesize medicine"
     :uses [:medicine]
     :filter {:infra :hospital
              :skills {:medicine 100}
              :stores {:food base-need
                       :tools 10}
              :power 1}
     :effect
     (gather-factory base-need [[:poultices 1]]
                     :infra :hospital)}
    {:name "Trade wood for stone"
     :uses []
     :filter {:stores {:wood base-need}
              :infra :flyer-market}
     :effect
     (trade-factory :stone base-need 2 3)}
    {:name "Trade stone for bone"
     :uses []
     :filter {:stores {:stone base-need}
              :infra :flyer-market}
     :effect
     (trade-factory :bone base-need 3 5)}
    {:name "Trade bone for ore"
     :uses []
     :filter {:stores {:bone base-need}
              :infra :flyer-market}
     :effect
     (trade-factory :ore base-need 4 7)}
    {:name "Trade ore for tools"
     :uses []
     :filter {:stores {:ore base-need}
              :infra :flyer-market}
     :effect
     (trade-factory :tools base-need 5 9)}
    {:name "Trade tools for metal"
     :uses []
     :filter {:stores {:tools base-need}
              :infra :flyer-market}
     :effect
     (trade-factory :metal base-need 6 11)}
    {:name "Turn generator"
     :uses [:athletics]
     :filter {:infra :quern-generator}
     :filter-fn
     (fn [herd]
       (or (core/local-infra? herd :stonetower-batteries)
           (= 0 (:power (core/current-location herd)))))
     :effect
     (fn [herd skill-amount]
       (let [amount (int (skill->multiplier skill-amount))]
         (core/update-current-location herd #(update % :power + amount))))}
    {:name "Venerate the land"
     :uses [:herbalism]
     :filter {:terrain :forest
              :stores {:rations base-need}
              :skills {:herbalism base-need}}
     :filter-fn
     (fn [herd]
       (let [location (core/current-location herd)]
         (core/herd-has-skill? herd
                               :herbalism
                               (* 100 (:flora location)))))
     :location-effect
     (fn [location]
       (update location :flora inc))}]))

(s/def ::description string?)
(s/def ::detail string?)
(s/def ::filter-fn
  (s/or :fn ifn?
        :fn* (s/fspec
              :args (s/cat :herd ::core/herd)
              :ret boolean?)))
(s/def ::text-fn
  (s/fspec :args (s/cat :herd ::core/herd)
           :ret string?))
(s/def ::effect
  (s/or :fn ifn?
        :fn* (s/fspec
              :args (s/cat :herd ::core/herd
                           :skill nat-int?)
              :ret ::core/herd)))
(s/def ::location-effect
  (s/or :fn ifn?
        :fn* (s/fspec
              :args (s/cat :location ::core/location)
              :ret ::core/location)))
(s/def ::project
  (s/with-gen
    (s/keys :req-un [::core/name
                     ::core/uses]
            :opt-un [::description
                     ::detail
                     ::select/filter
                     ::filter-fn
                     ::text-fn
                     ::effect
                     ::location-effect])
    #(g/elements projects)))

(defn distribute-experience
  [herd {:keys [uses]}]
  (let [update-passions
        (fn [individual]
          (if-let [skill (and (zero? (rand-int core/passion-rate))
                              (core/becomes-passionate? uses individual))]
            (update individual :passions conj skill)
            individual))
        update-proficiency
        (fn [individual]
          (if-let [skill (core/gains-experience? herd uses individual)]
            (update-in individual [:skills skill] inc)
            individual))
        update-individual
        (comp update-proficiency update-passions)]
    (update herd :individuals (partial map update-individual))))

(s/fdef distribute-experience
  :args (s/cat :herd (s/keys :req-un [::core/syndicates
                                      ::core/individuals])
               :project ::project)
  :ret (s/keys :req-un [::core/syndicates
                        ::core/individuals]))

(defn distribute-fulfillment
  [herd {:keys [uses]}]
  (->> uses
       (partial core/update-individual-fulfillment)
       (partial map)
       (update herd :individuals)))

(s/fdef distribute-fulfillment
  :args (s/cat :herd (s/keys :req-un [::core/individuals])
               :project (s/keys :req-un [::core/uses]))
  :ret (s/keys :req-un [::core/individuals]))

(defn can-enact?
  [herd {:keys [filter-fn] :as project}]
  (and (select/passes-filter? herd (:filter project {}))
       (if filter-fn
         (filter-fn herd)
         true)))

(s/fdef can-enact?
  :args (s/cat :herd ::core/herd
               :project ::project)
  :ret boolean?)

(defn enact-project
  [herd {:keys [uses effect location-effect] :as project}]
  (let [skill-amount
        (if (seq uses)
          (as-> (partial core/collective-skill herd) $
            (map $ uses)
            (reduce + $)
            (/ $ (count uses)))
          0)
        stores-filter (get-in project [:filter :stores])
        update-stores
        #(reduce
          (fn [herd [resource amount]]
            (update-in herd [:stores resource] - amount))
          %
          stores-filter)
        power-filter (get-in project [:filter :power])
        update-power
        #(core/update-current-location
          %
          (fn [location]
            (update location :power - power-filter)))]
    (cond-> herd
      effect (effect skill-amount)
      location-effect (core/update-current-location location-effect)
      stores-filter update-stores
      power-filter update-power)))

(s/fdef enact-project
  :args (s/cat :herd ::core/herd
               :project ::project)
  :ret ::core/herd)

(defn do-project
  [herd project]
  (-> (enact-project herd project)
      (distribute-experience project)
      (distribute-fulfillment project)))

(s/fdef do-project
  :args (s/cat :herd ::core/herd
               :project ::project)
  :ret ::core/herd)
