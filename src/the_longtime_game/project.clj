(ns the-longtime-game.project
  (:require [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [clojure.spec.gen.alpha :as g]))

(defn skill->multiplier
  [skill-amount]
  (+ 1 (/ skill-amount 100)))

(defn construction-project
  [infra skill required-skill stores terrain]
  (let [uses (if (and skill (not= skill :craftwork))
               [:craftwork skill]
               [:craftwork])]
    {:name (str "Construct " (name infra))
     :uses uses
     :filter
     (cond-> {:stores stores
              :skills (if required-skill
                        (reduce
                         (fn [all skill]
                           (assoc all skill required-skill))
                         {}
                         uses)
                        {})}
       terrain (assoc :terrain terrain))
     :filter-fn
     (fn [_ location]
       (and
        (not (contains? (:infra location) infra))
        (> core/max-buildings (count (:infra location)))))
     :location-effect
     (fn [location]
       (update location :infra conj infra))}))

(defn gathering-project
  [uses n resources & {:keys [bonus-fn infra]
                       :or {bonus-fn
                            (constantly 1)}}]
  {:uses uses
   :effect
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
          [resource amount]))))})

(defn planting-project
  [crop]
  (let [[nutrients amount] (core/crop-info crop)]
    {:name (str "Plant " (name crop))
     :uses [:herbalism]
     :filter (cond-> {:terrain :plains
                      :season 0}
               (= 1 (count nutrients))
               (merge {:skills {:herbalism 50}}))
     :filter-fn
     (fn [_ location]
       (and
        (or (nil? (:crop location))
            (true? (:wild? location)))
        (every? true? (map #(>= (get location %) amount) nutrients))))
     :location-effect
     (fn [location]
       (-> (core/update-nutrients nutrients amount location)
           (assoc :crop crop
                  :wild? false
                  :ready? false)))}))

(defn production-project
  [uses resource product x n & {:keys [infra]}]
  {:uses uses
   :filter {:stores (assoc {} resource x)}
   :effect
   (fn [herd skill-amount]
     (let [infra-bonus
           (if (and infra
                    (core/local-infra? herd infra))
             2
             1)
           modifier (skill->multiplier skill-amount)
           amount (int (* x n modifier infra-bonus))]
       (update-in herd [:stores product] + amount)))})

(defn manufacturing-project
  [resource x]
  (merge
   (production-project [:craftwork]
                       resource
                       :tools
                       x
                       10
                       :infra :workshop)
   {:name (str "Manufacture " (name resource) " tools")
    :filter {:stores (assoc {} resource 50)}}))

(def projects
  (concat
   (map
    planting-project
    core/crops)
   (map
    (fn [[infra skill required-skill stores terrain]]
      (construction-project infra skill required-skill stores terrain))
    [[:granary
      :herbalism
      10
      {:wood 10 :stone 10 :tools 10}]
     [:stadium
      :athletics
      20
      {:wood 20 :tools 10}]
     [:observatory
      :organizing
      50
      {:wood 10 :stone 10 :tools 10}]
     [:quarry
      :geology
      50
      {:wood 10 :stone 50 :tools 20}]
     [:kitchen
      :medicine
      20
      {:wood 10 :stone 10 :tools 10}]
     [:workshop
      :craftwork
      20
      {:wood 10 :stone 10 :tools 10}]
     [:wind-forge
      :craftwork
      50
      {:wood 100 :stone 100 :tools 100}
      :jungle]
     [:monsoon-bellows
      :craftwork
      75
      {:bone 100 :stone 100 :tools 100}
      :jungle]
     [:temple
      :organizing
      100
      {:wood 100 :stone 100 :tools 100}]
     [:hospital
      :medicine
      50
      {:wood 10 :stone 10 :tools 10}]])
   (map
    #(apply manufacturing-project %)
    [[:stone 1]
     [:bone  2]
     [:metal 4]])
   (let [flora-bonus #(:flora (core/current-location %))
         flora-filter #(and (> (:flora %2) 0)
                            (false? (:depleted? %2)))
         deplete-land #(assoc % :depleted? true)]
     [(merge
       (gathering-project [:herbalism] 50 [[:wood 1]
                                           [:bone 1/2]]
        :bonus-fn flora-bonus)
       {:name "Gather deadfall"
        :filter {:terrain :forest}
        :filter-fn flora-filter
        :location-effect deplete-land})
      (merge
       (gathering-project [:herbalism] 100 [[:food 1]]
        :bonus-fn flora-bonus)
       {:name "Eat the land"
        :filter {:terrain :forest}
        :filter-fn flora-filter
        :location-effect deplete-land})
      (merge
       (gathering-project [:geology] 50 [[:ore 1]])
       {:name "Gather bog-iron"
        :filter {:terrain :swamp}
        :filter-fn #(false? (:depleted? %2))
        :location-effect
        (fn [location]
          (assoc location :depleted? true))})])
   [{:name "Explore"
     :uses [:organizing]
     :filter {:skills {:organizing 20}}
     :effect
     (fn [herd _]
       (let [location (-> core/terrains vec rand-nth core/init-location)]
         (update-in herd [:path 1] conj location)))}
    {:name "Elongate path"
     :uses []
     :filter {:skills {:organizing 100}}
     :effect
     (fn [herd _]
       (let [options (vec core/terrains)
             locations [(-> options rand-nth core/init-location)
                        (-> options rand-nth core/init-location)]]
         (update herd :path
                 (fn [path]
                   (vec
                    (concat (subvec path 0 2)
                            locations
                            (subvec path 2)))))))}
    {:name "Harvest crops"
     :uses [:herbalism]
     :filter {:terrain :plains}
     :filter-fn
     (fn [_ location]
       (true? (:ready? location)))
     :effect
     (fn [herd skill-amount]
       (let [modifier (skill->multiplier skill-amount)
             amount (int (* 100 modifier))]
         (update-in herd [:stores :food] + amount)))
     :location-effect
     #(assoc %
             :crop nil
             :ready? false)}
    (let [need 50]
      {:name "Hold festival"
       :uses [:athletics :organizing]
       :filter-fn
       (fn [herd _]
         (> (+ (get-in herd [:stores :food] 0)
               (get-in herd [:stores :rations] 0))
            need))
       :effect
       (fn [herd skill-amount]
         (let [stadium? (core/local-infra? herd :stadium)
               modifier (skill->multiplier skill-amount)
               amount (int (* 3
                              modifier
                              (if stadium? 2 1)))
               remaining-food (- (get-in herd [:stores :food] 0) need)
               remaining-rations
               (if (< remaining-food 0)
                 (+ (get-in herd [:stores :rations] 0)
                    remaining-food)
                 (get-in herd [:stores :rations]))]
           (-> herd
               (update :individuals
                       (comp vec
                             (partial map #(core/inc-fulfillment % amount))))
               (assoc-in [:stores :food] (max 0 remaining-food))
               (assoc-in [:stores :rations] remaining-rations))))})
    {:name "Venerate the land"
     :uses [:herbalism]
     :filter {:terrain :forest
              :stores {:rations 50}
              :skills {:herbalism 50}}
     :location-effect
     (fn [location]
       (update location :flora inc))}
    (-> (production-project [:craftwork]
                            :ore
                            :metal
                            50
                            1/2
                            :infra :monsoon-bellows)
        (assoc-in [:filter :season] 2)
        (assoc :name "Smelt metal"
               :filter-fn
               (fn [herd _]
                 (core/local-infra? herd :wind-forge))))
    (merge
     (production-project [:medicine]
                         :food
                         :poultices
                         50
                         1/2
                         :infra :hospital)
     {:name "Prepare poultices"})
    (merge
     (production-project [:medicine]
                         :food
                         :rations
                         50
                         1
                         :infra :kitchen)
     {:name "Cook rations"})
    (merge
     (gathering-project [:geology] 50 [[:stone 1]
                                       [:ore 1/10]])
     {:name "Gather stones"})
    (merge
     (gathering-project [:geology
                         :athletics] 50 [[:ore 1]])
     {:name "Spelunk"
      :filter {:terrain :mountain
               :stores {:tools 5}}})
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
    (merge
     (gathering-project [:herbalism] 50 [[:food 1]]
                        :bonus-fn
                        (fn [herd]
                          (if (= 3 (core/get-season herd))
                            1/2
                            1)))
     {:name "Graze"})]))

(s/def ::skills (s/map-of ::core/skill pos-int?))
(s/def ::filter
  (s/keys :opt-un [::core/season
                   ::terrain
                   ::skills
                   ::core/stores]))
(s/def ::filter-fn
  (s/or :fn ifn?
        :fn*
        (s/fspec
         :args (s/cat :herd ::core/herd
                      :location ::core/location)
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
            :opt-un [::filter
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
  [herd project]
  (let [location (core/current-location herd)]
    (and (if-let [terrain (get-in project [:filter :terrain])]
           (= (:terrain location) terrain)
           true)
         (if-let [season (get-in project [:filter :season])]
           (= (core/get-season herd) season)
           true)
         (reduce
          (fn [ok? [resource required]]
            (let [amount (get-in herd [:stores resource] 0)]
              (and ok?
                   (>= amount required))))
          true
          (get-in project [:filter :stores] []))
         (reduce
          (fn [ok? [skill required]]
            (and ok?
                 (>= (core/collective-skill herd skill)
                     required)))
          true
          (get-in project [:filter :skills] []))
         (if-let [filter-fn (:filter-fn project)]
           (filter-fn herd location)
           true))))

(s/fdef can-enact?
  :args (s/cat :herd ::core/herd
               :project ::project)
  :ret boolean?)

(defn enact-project
  [herd {:keys [uses effect location-effect] :as project}]
  (let [location (core/current-location herd)
        skill (if (seq uses)
                (as-> (partial core/collective-skill herd) $
                  (map $ uses)
                  (reduce + $)
                  (/ $ (count uses)))
                0)
        stores-filter (get-in project [:filter :stores])
        update-stores (if stores-filter
                        #(reduce
                          (fn [herd [resource amount]]
                            (update-in herd [:stores resource] - amount))
                          %
                          stores-filter)
                        identity)
        location* (cond-> location
                    location-effect location-effect)]
    (-> (cond-> herd
          effect (effect skill))
        (assoc-in [:path 0 (:index herd)] location*)
        update-stores)))

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
