(ns the-longtime-game.project
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [clojure.string :as string]
            [the-longtime-game.building :as building]
            [the-longtime-game.core :as core]
            [the-longtime-game.select :as select]))

(def base-need 50)

(defn skill->multiplier
  [skill-amount]
  (+ 1 (/ skill-amount 100)))

(def flora-bonus
  #(:flora (core/current-location %)))

(def flora-filter
  #(let [location (core/current-location %)]
     (and (> (:flora location 0) 0)
          (false? (:depleted? location)))))

(def deplete-land
  #(assoc % :depleted? true))

(def construction-projects
  (for [[name*
         {:keys [description detail uses filter filter-fn]
          :as building-info}]
        building/building->info]
    {:name (str "Construct " (building/building->name building-info))
     :description (str description " " detail)
     :uses (cond
             (seq uses) uses
             (nil? uses) #{:craftwork}
             (keyword? uses) #{:craftwork uses})
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
       (update location :infra conj name*))}))

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

(def planting-projects
  (for [crop core/crops
        :let [[nutrients amount] (core/crop-info crop)
              nutrient-names (string/join ", " (map name nutrients))]]
    {:name (str "Plant " (name crop) " (" nutrient-names ")")
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
     :uses [:medicine]
     :filter {:stores {:food base-need}}
     :effect
     (gather-factory base-need [[:rations 1]]
                     :infra :kitchen)}
    {:name "Eat the land"
     :uses [:herbalism]
     :filter {:terrain :forest}
     :filter-fn flora-filter
     :effect
     (gather-factory 100 [[:food 1]]
                     :bonus-fn flora-bonus)
     :location-effect deplete-land}
    {:name "Elongate path"
     :uses []
     :filter {:skills {:organizing 100}}
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
     :uses [:organizing]
     :filter {:skills {:organizing 20}}
     :filter-fn
     (fn [herd]
       (>= 3 (count (second (:path herd)))))
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
                     :infra :quarry)}
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
     (fn [herd]
       (let [location (core/current-location herd)]
         (true? (:ready? location))))
     :effect
     (fn [herd skill-amount]
       (let [modifier (skill->multiplier skill-amount)
             amount (int (* 100 modifier))]
         (update-in herd [:stores :food] + amount)))
     :location-effect
     #(assoc %
             :crop nil
             :ready? false)}
    {:name "Hold festival"
     :uses [:athletics :organizing]
     :filter-fn
     #(core/herd-has-nutrition? % base-need)
     :effect
     (fn [herd skill-amount]
       (let [stadium? (core/local-infra? herd :stadium)
             modifier (skill->multiplier skill-amount)
             amount (int (* 2 modifier (if stadium? 2 1)))]
         (-> herd
             (core/consume-nutrition base-need)
             (update :individuals
                     (comp vec
                           (partial map #(core/inc-fulfillment % amount)))))))}
    {:name "Mag-smelt metal"
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
     (fn [herd skill-amount]
       (let [observatory? (core/local-infra? herd :observatory)
             modifier (skill->multiplier skill-amount)
             amount (int (* 5
                            modifier
                            (if observatory? 2 1)))]
         (update herd :individuals
                 (partial map #(core/inc-fulfillment % amount)))))}
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
              :skills {:herbalism base-need}
              :filter-fn
              (fn [herd]
                (let [location (core/current-location herd)]
                  (core/herd-has-skill herd
                                       :herbalism
                                       (* 100 (:flora location)))))}
     :location-effect
     (fn [location]
       (update location :flora inc))}]))

(s/def ::filter-fn
  (s/or :fn ifn?
        :fn* (s/fspec
              :args (s/cat :herd ::core/herd)
              :ret boolean?)))
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
            :opt-un [::select/filter
                     ::filter-fn
                     ::effect
                     ::location-effect])
    #(g/elements projects)))

(defn distribute-experience
  [{:keys [syndicates] :as herd} {:keys [uses]}]
  (let [update-passions
        (fn [individual]
          (if-let [skill (core/becomes-passionate? uses individual)]
            (update individual :passions conj skill)
            individual))
        update-proficiency
        (fn [individual]
          (if-let [skill (core/gains-experience? uses syndicates individual)]
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
  (and
   (select/passes-filter? herd (:filter project {}))
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
