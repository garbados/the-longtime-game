(ns the-longtime-game.project
  (:require [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [clojure.test.check.generators :as g]))

(s/def ::uses (s/coll-of ::core/skill))
(s/def ::terrain (s/nilable core/terrains))
(s/def ::filter
  (s/keys :opt-un [::core/season
                   ::terrain
                   ::core/skills
                   ::core/stores]))
(s/def ::effect
  (s/or :fn ifn?
        :fn* (s/fspec :args (s/cat :herd ::core/herd
                                   :skill nat-int?)
                      :ret ::core/herd)))
(s/def ::filter-fn
  (s/or :fn ifn?
        :fn* (s/fspec
              :args (s/cat :herd ::core/herd
                           :location ::core/location)
              :ret boolean?)))
(s/def ::location-effect
  (s/or :fn ifn?
        :fn* (s/fspec
              :args (s/cat :location ::core/location)
              :ret ::core/location)))
(s/def ::project (s/keys :req-un [::core/name
                                  ::core/uses]
                         :opt-un [::filter
                                  ::filter-fn
                                  ::effect
                                  ::location-effect]))

(defn can-enact?
  [herd project]
  (let [location (core/current-location herd)]
    (and (if-let [terrain (get-in project [:filter :terrain])]
           (= (:type location) terrain)
           true)
         (if-let [season (get-in project [:filter :season])]
           (= (core/get-season herd) season)
           true)
         (reduce
          (fn [ok? [resource required]]
            (let [amount (get-in herd [:stores resource])]
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

(defn gains-experience?
  [used syndicates {:keys [passions skills]}]
  (let [used* (filter #(> core/max-skill (get skills %)) used)
        chance (* core/experience-rate (count used*))
        syndicate-counts (frequencies (reduce into syndicates []))
        syndicate-bonus #(get syndicate-counts % 0)
        passion-bonus #(if (contains? passions %) 1 0)]
    (first
     (filter
      (fn [skill]
        (let [threshold (reduce + 1 ((juxt syndicate-bonus passion-bonus) skill))
              roll (rand-int chance)]
          (>= threshold roll)))
      used*))))

(s/fdef gains-experience?
  :args (s/cat :used ::uses
               :syndicates ::syndicates
               :individual ::individual)
  :ret (s/nilable ::skill))

(defn distribute-experience
  [{:keys [syndicates] :as herd} {:keys [uses]}]
  (let [update-passions
        (fn [individual]
          (if-let [skill (core/becomes-passionate? uses individual)]
            (update individual :passions conj skill)
            individual))
        update-proficiency
        (fn [individual]
          (if-let [skill (gains-experience? uses syndicates individual)]
            (update-in individual [:skills skill] inc)
            individual))
        update-individual
        (comp update-proficiency update-passions)]
    (update herd :individuals (partial map update-individual))))

(s/fdef distribute-experience
  :args (s/cat :herd ::core/herd
               :project ::project)
  :ret ::core/herd)

(defn inc-fulfillment [individual amount]
  (-> individual
      (update :fulfillment + amount)
      (update :fulfillment min core/max-fulfillment)))

(s/fdef inc-fulfillment
  :args (s/cat :individual ::core/individual
               :amount int?)
  :ret ::core/individual)

(defn update-individual-fulfillment
  [uses {:keys [passions] :as individual}]
  (let [amount (int (/ core/fulfillment-rate (count uses)))
        overlap (-> (partial contains? passions)
                    (map uses)
                    frequencies
                    (get true))]
    (inc-fulfillment individual (* amount overlap))))

(s/fdef update-individual-fulfillment
  :args (s/cat :uses ::core/uses
               :individual ::core/individual)
  :ret ::core/individual)

(defn distribute-fulfillment
  [herd {:keys [uses]}]
  (update herd :individuals
          (->> uses
               (partial update-individual-fulfillment)
               (partial map))))

(s/fdef distribute-fulfillment
  :args (s/cat :herd ::core/herd
               :project ::project)
  :ret ::core/herd)

(def projects
  (concat (map
           (fn [crop]
             (let [[nutrients amount] (core/crop-info crop)]
               {:name (str "Plant " (name crop))
                :uses [:herbalism]
                :filter (cond-> {:terrain :plains
                                 :season 1}
                          (= 3 amount)
                          (merge {:skills {:herbalism 100}}))
                :filter-fn
                (fn [_ location]
                  (every? true? (map #(>= (get location %) amount) nutrients)))
                :location-effect
                (fn [location]
                  (-> (core/update-nutrients nutrients amount location)
                      (assoc :crop crop
                             :wild? false
                             :ready? false)))}))
           core/crops)
          (map (fn [[infra skill required-skill stores terrain]]
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
                      (> core/max-infrastructure (count (:infra location))))
                    :location-effect
                    (fn [location]
                      (update location :infra conj infra))}))
               [[:granary
                 :herbalism
                 100
                 {:wood 10 :stone 10 :tools 10}]
                [:stadium
                 :athletics
                 100
                 {:wood 20 :tools 5}]
                [:observatory
                 :organizing
                 100
                 {:wood 10 :stone 10 :tools 10}]
                [:quarry
                 :geology
                 100
                 {:wood 10 :stone 50 :tools 20}]
                [:kitchen
                 :medicine
                 100
                 {:wood 10 :stone 10 :tools 10}]
                [:workshop
                 :craftwork
                 100
                 {:wood 10 :stone 10 :tools 10}]
                [:wind-forge
                 :craftwork
                 500
                 {:wood 100 :stone 100 :tools 100}
                 :jungle]
                [:temple
                 :organizing
                 500
                 {:wood 100 :stone 100 :tools 100}]
                [:hospital
                 :medicine
                 100
                 {:wood 10 :stone 10 :tools 10}]])
          (map
           (fn [[i material]]
             {:name (str "Manufacture " (name material) " tools")
              :uses [:craftwork]
              :filter (assoc {} material 50)
              :effect
              (fn [herd skill-amount]
                (let [workshop? (core/local-infra? herd :workshop)
                      amount (-> (if workshop?
                                   skill-amount
                                   (/ skill-amount 2))
                                 (* i)
                                 int)]
                  (update-in herd [:stores :tools] + amount)))})
           [[1 :stone]
            [2 :bone]
            [4 :metal]])
          [{:name "Explore"
            :uses []
            :effect
            (fn [herd _]
              (let [location (-> core/terrains vec rand-nth core/init-location)]
                (update-in herd [:path 1] concat [location])))}
           {:name "Elongate path"
            :uses []
            :filter {:skills {:organizing 500}}
            :effect
            (fn [herd _]
              (let [options (vec core/terrains)
                    locations [(-> options rand-nth core/init-location)
                               (-> options rand-nth core/init-location)]]
                (update herd :path
                        (fn [path]
                          (concat (subvec path 0 2)
                                  locations
                                  (subvec path 2))))))}
           {:name "Harvest crops"
            :uses [:herbalism]
            :filter {:terrain :plains}
            :filter-fn
            (fn [_ location]
              (true? (:ready? location)))
            :effect
            (fn [herd skill-amount]
              (update-in herd [:stores :food] + skill-amount))
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
                      modifier (if stadium? 25 50)
                      amount (int (/ skill-amount modifier))
                      remaining-food (- (get-in herd [:stores :food] 0) need)
                      remaining-rations
                      (if (< remaining-food 0)
                        (+ (get-in herd [:stores :rations] 0)
                           remaining-food)
                        (get-in herd [:stores :rations]))]
                  (-> herd
                      (update :individuals
                              (partial map #(inc-fulfillment % amount)))
                      (assoc-in [:stores :food] (max 0 remaining-food))
                      (assoc-in [:stores :rations] (max 0 remaining-rations)))))})
           {:name "Gather deadfall"
            :uses [:herbalism]
            :filter {:terrain :forest}
            :filter-fn
            (fn [_ location]
              (false? (:depleted? location)))
            :location-effect
            (fn [location]
              (assoc location :depleted? true))
            :effect
            (fn [herd skill-amount]
              (let [flora (get-in herd [:path 0 (:index herd) :flora])
                    wood (int (* flora skill-amount 1/2))
                    bone (int (* flora skill-amount 1/4))]
                (-> herd
                    (update-in [:stores :wood] + wood)
                    (update-in [:stores :bone] + bone))))}
           {:name "Eat the land"
            :uses [:herbalism]
            :filter {:terrain :forest}
            :filter-fn
            (fn [_ location]
              (and (> (:flora location) 0)
                   (false? (:depleted? location))))
            :location-effect
            (fn [location]
              (-> location
                  (assoc :depleted? true)
                  (update :flora dec)))
            :effect
            (fn [herd skill-amount]
              (let [flora (get-in herd [:path 0 (:index herd) :flora])
                    amount (* flora skill-amount 1/2)]
                (update-in herd [:stores :food] + amount)))}
           {:name "Venerate the land"
            :uses [:herbalism]
            :filter {:terrain :forest
                     :skills {:herbalism 100}}
            :location-effect
            (fn [location]
              (update location :flora inc))}
           {:name "Smelt metal"
            :uses [:craftwork]
            :filter {:stores {:ore 100}
                     :season 2}
            :filter-fn
            (fn [herd _]
              (core/local-infra? herd :wind-forge))
            :effect
            (fn [herd skill-amount]
              (update-in herd [:stores :metal] + skill-amount))}
           {:name "Produce poultices"
            :uses [:medicine]
            :filter {:stores {:food 50}}
            :effect
            (fn [herd skill-amount]
              (update-in herd [:stores :poultices] + skill-amount))}
           {:name "Produce rations"
            :uses [:medicine]
            :filter {:stores {:food 50}}
            :effect
            (fn [herd skill-amount]
              (update-in herd [:stores :rations] + skill-amount))}
           {:name "Gather stones"
            :uses [:geology]
            :effect
            (fn [herd skill-amount]
              (-> herd
                  (update-in [:stores :stone] + (* skill-amount 3/4))
                  (update-in [:stores :ore] + (* skill-amount 1/4))))}
           {:name "Gather bog-iron"
            :uses [:geology]
            :filter {:terrain :swamp}
            :effect
            (fn [herd skill-amount]
              (update-in herd [:stores :ore] + skill-amount))
            :location-effect
            (fn [location]
              (assoc location :depleted? true))}
           {:name "Spelunk"
            :uses [:geology :athletics]
            :filter {:terrain :mountain
                     :stores {:tools 10}}
            :effect
            (fn [herd skill-amount]
              (update-in herd [:stores :ore] + skill-amount))}
           {:name "Stargaze"
            :uses [:organizing]
            :filter {:terrain :mountain}
            :effect
            (fn [herd skill-amount]
              (let [observatory? (core/local-infra? herd :observatory)
                    modifier (if observatory? 25 50)
                    amount (int (/ skill-amount modifier))]
                (update herd :individuals
                        (partial map #(inc-fulfillment % amount)))))}]))

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
                    location-effect (location-effect location))]
    (-> (cond-> herd
          effect (effect herd skill))
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
