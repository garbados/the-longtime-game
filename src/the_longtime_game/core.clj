(ns the-longtime-game.core
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [clojure.test.check.generators :as g]))

(def resources #{:food
                 :rations
                 :poultices
                 :wood
                 :bone
                 :ore
                 :metal
                 :tools})

(def skills #{:athletics
              :craftwork
              :geology
              :herbalism
              :medicine
              :organizing})

(def terrains #{:plains
                :forest
                :jungle
                :swamp
                :steppe
                :mountain
                :elevator})

(def traits #{:todo}) ; TODO

(def crops #{:grapplewheat
             :rattails
             :drum-squash
             :singe-pepper
             :lorry-tops
             :craunions})

(def skill-ranks ["unfamiliar"
                  "novice"
                  "learned"
                  "adept"
                  "expert"
                  "virtuoso"])

(def max-age 100)
(def max-hunger 4)
(def max-skill (count skill-ranks))
(def max-fulfillment 100)
(def max-passions 3)
(def experience-rate 10)
(def passion-rate 10)
(def fulfillment-rate 10)
(def fulfillment-decay 1)
(def organization-threshold 100)
(def organization-multiplier 10)

(def crop->nutrients
  {:grapplewheat #{:n :k}
   :rattails     #{:n :p}
   :drum-squash  #{:p :k}
   :singe-pepper #{:n}
   :lorry-tops   #{:p}
   :craunions    #{:k}})

(def skill->shortname
  {:athletics  "ath"
   :craftwork  "craf"
   :geology    "geo"
   :herbalism  "herb"
   :medicine   "med"
   :organizing "org"})

(def first-syllable
  ["Il" "Ol" "Ib" "Ak"
   "Li" "El" "Et" "Uk"
   "Al" "At" "Im" "Ip"])

(def second-syllable
  ["Ba" "So" "Po" "Ma"
   "Na" "Mi" "Si" "Pa"
   "Zo" "Ze" "Ki" "Gi"])

(def infrastructure #{:granary
                      :stadium
                      :observatory
                      :quarry
                      :workshop
                      :wind-forge
                      :temple
                      :hospital
                      :kitchen})

(defn gen-name []
  (string/join "-" [(rand-nth first-syllable)
                    (rand-nth second-syllable)]))

(s/def ::name string?)

(s/def ::minot-name
  (s/with-gen ::name
    #(g/fmap (partial string/join "-")
             (g/tuple (g/elements first-syllable)
                      (g/elements second-syllable)))))

(s/fdef gen-name
  :args (s/cat)
  :ret ::minot-name)

(s/def ::age (s/int-in 0 max-age))
(s/def ::passions (s/coll-of ::skill
                             :kind set?
                             :min-count 0
                             :max-count max-passions))
(s/def ::skill skills)
(s/def ::skills (s/map-of ::skill (s/int-in 0 max-skill)))
(s/def ::trait traits)
(s/def ::traits (s/coll-of ::trait :kind set?))
(s/def ::fulfillment (s/int-in 0 max-fulfillment))
(s/def ::individual
  (s/keys :req-un [::name
                   ::age
                   ::traits
                   ::passions
                   ::skills
                   ::fulfillment]))

(s/def ::type terrains)
(s/def ::infrastructure infrastructure)
(s/def ::infra (s/coll-of ::infrastructure :kind set?))
(s/def ::nutrient nat-int?)
(s/def ::n ::nutrient)
(s/def ::k ::nutrient)
(s/def ::p ::nutrient)
(s/def ::crop (s/nilable crops))
(s/def ::wild? boolean?)
(s/def ::ready? boolean?)
(s/def ::flora (s/int-in 0 5))

(s/def ::location
  (s/and
   (s/keys :req-un [::type])
   (s/or
    :plains (s/keys :req-un [::infra
                             ::n
                             ::k
                             ::p
                             ::crop
                             ::wild?
                             ::ready?])
    :forest (s/keys :req-un [::infra
                             ::flora])
    :basic  (s/keys :req-un [::infra])
    :shortcut (s/keys :req-un []))))

(s/def ::ethos (s/coll-of ::skill :kind set? :count 2))
(s/def ::syndicate ::ethos)

(s/def ::syndicates (s/coll-of ::syndicate :kind set?))
(s/def ::individuals (s/coll-of ::individual))
(s/def ::resource resources)
(s/def ::stores (s/map-of ::resource pos-int?))
(s/def ::locations (s/coll-of ::location :min-count 1))
(s/def ::path (s/coll-of ::locations :kind vector? :min-count 1))
(s/def ::hunger (s/int-in 0 (+ 1 max-hunger)))
(s/def ::sickness nat-int?)
(s/def ::index nat-int?)
(s/def ::month nat-int?)
(s/def ::herd
  (s/with-gen
    (s/keys :req-un [::individuals
                     ::syndicates
                     ::stores
                     ::hunger
                     ::sickness
                     ::index
                     ::month
                     ::path])
    #(g/fmap (fn [[individuals syndicates stores path]]
               {:individuals individuals
                :syndicates syndicates
                :stores stores
                :hunger 0
                :sickness 0
                :index 0
                :month 0
                :path path})
             (g/tuple
              (s/gen ::individuals)
              (s/gen ::syndicates)
              (s/gen ::stores)
              (s/gen ::path)))))

(s/def ::season (s/int-in 0 4))

(defn get-season [{:keys [month]}]
  (int (/ (rem month 12) 3)))

(s/fdef get-season
  :args (s/cat :herd ::herd)
  :ret ::season)

(defn death-chance [individual]
  (/ (+ 1 (:age individual)) 100))

(s/fdef death-chance
  :args (s/cat :individual ::individual)
  :ret (s/and number? #(>= % 0)))

(def birth-chance 1/10)

(defn syndicate-name [ethos]
  (as-> (vec (map skill->shortname ethos)) $
    (vec $)
    (conj $ "syn")
    (string/join "-" $)))

(s/fdef syndicate-name
  :args (s/cat :ethos ::ethos)
  :ret (s/and ::name
              #(string/ends-with? % "-syn")))

(defn effective-skill
  [{:keys [individuals syndicates hunger sickness]} skill]
  (int (* (->> individuals
               (map :skills)
               (map #(get % skill 0))
               (reduce +))
          (-> (->> syndicates
                   (reduce into [])
                   frequencies)
              (get skill 0)
              (* 1/2)
              (+ 1/2))
          (if (> hunger 0)
            (- 1 (/ hunger max-hunger))
            1)
          (if (> sickness 0)
            (max 0 (- 1 (/ sickness (count individuals))))
            1))))

(s/fdef effective-skill
  :args (s/cat :herd ::herd
               :skill ::skill)
  :ret nat-int?)

(defn apply-herd-upkeep
  [{:keys [individuals stores] :as herd}]
  (let [{:keys [food rations poultices]} stores
        need (count individuals)
        food-deficit (max 0 (- need food))
        rations-deficit (- rations food-deficit)
        hunger? (and (> food-deficit 0) (> 0 rations-deficit))
        poultice-deficit (max 0 (- need poultices))
        sickness? (> 0 poultice-deficit)]
    (-> herd
        (assoc-in [:stores :food]
                  (max 0 (- food need)))
        (assoc-in [:stores :rations]
                  (max 0 (- rations food-deficit)))
        (assoc-in [:stores :poultices]
                  (max 0 (- poultices need)))
        (assoc :individuals
               (map #(update % :fulfillment - fulfillment-decay)
                    individuals))
        (cond->
         hunger? (update :hunger inc)
         (not hunger?) (assoc :hunger 0)
         sickness? (assoc :sickness poultice-deficit)))))

(s/fdef apply-herd-upkeep
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn map-locations [f {:keys [path] :as herd}]
  (assoc herd :path
         (vec
          (for [stage path]
            (vec
             (for [location stage]
               (f location)))))))

(defn has-lost? [herd]
  (= max-hunger (:hunger herd)))

(defn next-location [herd index]
  (let [{:keys [path]} herd]
    (assoc herd
           :index index
           :path (vec (conj (rest path)
                            (first path))))))

(s/fdef next-location
  :args (s/cat :herd ::herd
               :index ::index)
  :ret ::herd)

(defn calculate-vote [individual skill]
  (let [rank (get-in individual [:skills skill] 0)]
    (if (contains? (:passions individual) skill)
      (* rank 2)
      rank)))

(s/fdef calculate-vote
  :args (s/cat :individual ::individual
               :skill ::skill)
  :ret nat-int?)

(defn tally-votes [individuals]
  (->> individuals
       (map
        (fn [individual]
          (reduce
           (fn [all skill]
             (assoc all skill
                    (calculate-vote individual skill)))
           {}
           skills)))
       (reduce
        (fn [votes vote]
          (for [[skill value] votes]
            [skill (+ value (get vote skill 0))]))
        (for [skill skills]
          [skill 0]))
       (sort-by second >)))

(s/fdef tally-votes
  :args (s/cat :individuals ::individuals)
  :ret (s/coll-of (s/tuple ::skill nat-int?)))

(defn rank-candidates [votes]
  (let [leader (-> votes first first)]
    (if-let [runner (-> votes second first)]
      (if (not= leader runner)
        (conj (lazy-seq
               (rank-candidates (rest votes)))
              #{leader runner})
        [])
      [])))

(s/fdef rank-candidates
  :args (s/cat :votes (s/coll-of (s/tuple ::skill nat-int?)))
  :ret (s/coll-of ::syndicate))

(defn select-candidate [syndicates candidates]
  (if (contains? syndicates (first candidates))
    (select-candidate syndicates (rest candidates))
    (first candidates)))

(s/fdef select-candidate
  :args (s/cat :herd ::herd
               :candidates (s/coll-of ::syndicate))
  :ret (s/nilable ::syndicate))

(defn add-syndicate [{:keys [individuals syndicates] :as herd}]
  (let [votes (tally-votes individuals)
        candidates (rank-candidates votes)]
    (if-let [candidate (select-candidate syndicates candidates)]
      (update herd :syndicates conj candidate)
      herd))) ; do not modify herd if there is no valid candidate

(s/fdef add-syndicate
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn remove-syndicate [herd]
  (update herd :syndicates (comp set rest)))

(s/fdef remove-syndicate
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn inc-some-skill [skills*]
  (let [skill (rand-nth (vec skills))
        rank (get skills* skill 0)]
    (if (= rank 5)
      (inc-some-skill skills*)
      (assoc skills* skill (inc rank)))))

(s/fdef inc-some-skill
  :args (s/cat :skills ::skills
               :candidates (s/coll-of ::skill))
  :ret ::skills)

(defn gen-individual []
  (let [age (+ 1 (rand-int max-age))
        base-skills (int (/ age 10))]
    {:name (gen-name)
     :age age
     :fulfillment 50
     :traits (set [(first (shuffle traits))])
     :passions (set (take (+ 1 (rand-int 2))
                          (shuffle (vec skills))))
     :skills (reduce
              (fn [skills _]
                (inc-some-skill skills))
              {}
              (range base-skills))}))

(s/fdef gen-individual
  :args (s/cat)
  :ret ::individual)

(defn gen-individuals [n]
  (for [_ (range n)]
    (gen-individual)))

(s/fdef gen-individuals
  :args (s/cat :n (s/int-in 1 500))
  :ret ::individuals)

(defn gen-herd []
  (let [individuals (gen-individuals 50)
        path [[{:type :plains
                :infra #{}
                :n 2
                :k 2
                :p 2
                :crop nil
                :wild? false}]
              [{:type :forest
                :infra #{}
                :flora 2}]
              [{:type :mountain
                :infra #{}}]
              [{:type :steppe}]]]
    (-> {:individuals individuals
         :syndicates #{}
         :path path
         :stores (reduce
                  (fn [all resource]
                    (assoc all resource 50))
                  {}
                  resources)
         :index 0
         :month 0}
        ;; add one syndicate by vote
        add-syndicate
        ;; and another by chance
        (update :syndicates conj
                (set (take 2 (shuffle (vec skills))))))))

(s/fdef gen-herd
  :args (s/cat)
  :ret ::herd)

(s/def ::uses (s/coll-of ::skill))
(s/def ::terrain (s/nilable terrains))
(s/def ::filter
  (s/keys :opt-un [::season
                   ::terrain
                   ::skills
                   ::stores]))
(s/def ::effect
  (s/fspec :args (s/cat :herd ::herd
                        :skill nat-int?)
           :ret ::herd))
(s/def ::filter-fn
  (s/fspec
   :args (s/cat :herd ::herd
                :location ::type)
   :ret boolean?))
(s/def ::location-effect
  (s/fspec :args (s/cat :location ::location)
           :ret ::location))
(s/def ::project (s/keys :req-un [::name
                                  ::uses]
                         :opt-un [::filter
                                  ::filter-fn
                                  ::effect
                                  ::location-effect]))

(defn can-enact?
  [herd location project]
  (and (if-let [terrain (get-in project [:filter :terrain])]
         (= (:type location) terrain)
         true)
       (if-let [season (get-in project [:filter :season])]
         (= (get-season herd) season)
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
               (>= (effective-skill herd skill)
                   required)))
        true
        (get-in project [:filter :skills] []))
       (if-let [filter-fn (:filter-fn project)]
         (filter-fn herd location)
         true)))

(s/fdef can-enact?
  :args (s/cat :herd ::herd
               :location ::location
               :project ::project)
  :ret boolean?)

(defn enact-project
  [herd location {:keys [uses effect location-effect] :as project}]
  (let [skill (/ (reduce + (map (partial effective-skill herd) uses)) (count uses))
        stores-filter (get-in project [:filter :stores])
        update-stores (if stores-filter
                        #(reduce
                          (fn [herd [resource amount]]
                            (update-in herd [:stores resource] - amount))
                          %
                          stores-filter)
                        identity)]
    [(-> (effect herd skill)
         update-stores)
     (if location-effect
       (location-effect location)
       location)]))

(s/fdef enact-project
  :args (s/cat :herd ::herd
               :location ::location
               :project ::project)
  :ret (s/tuple ::herd ::location))

(defn becomes-passionate?
  [used {:keys [passions]}]
  (when (> max-passions (count passions))
    (let [candidates (filter (partial contains? passions) used)]
      (when (seq candidates)
        (let [chance (rand-int (int (* passion-rate (count candidates))))]
          (when (< chance (count candidates))
            (nth candidates chance)))))))

(s/fdef becomes-passionate?
  :args (s/cat :used ::uses
               :individual ::individual)
  :ret (s/nilable ::skill))

(defn gains-experience?
  [used syndicates {:keys [passions skills]}]
  (let [used* (filter #(> max-skill (get skills %)) used)
        chance (* experience-rate (count used*))
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
          (if-let [skill (becomes-passionate? uses individual)]
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
  :args (s/cat :herd ::herd
               :project ::project)
  :ret ::herd)

(defn update-individual-fulfillment
  [uses {:keys [passions] :as individual}]
  (let [amount (int (/ fulfillment-rate (count uses)))
        overlap (-> (partial contains? passions)
                    (map uses)
                    frequencies
                    (get true))]
    (-> individual
        (update :fulfillment + (* amount overlap))
        (update :fulfillment min max-fulfillment))))

(s/fdef update-individual-fulfillment
  :args (s/cat :uses ::uses
               :individual ::individual)
  :ret ::individual)

(defn distribute-fulfillment
  [herd {:keys [uses]}]
  (update herd :individuals
          (->> uses
               (partial update-individual-fulfillment)
               (partial map))))

(s/fdef distribute-fulfillment
  :args (s/cat :herd ::herd
               :project ::project)
  :ret ::herd)

(defn do-project
  [herd location project]
  (let [[herd location] (enact-project herd location project)]
    (-> (assoc-in herd [:path 0 (:index herd)] location)
        (distribute-experience project)
        (distribute-fulfillment project))))

(defn crop-info [crop]
  (let [nutrients (crop->nutrients crop)]
    [nutrients
     (if (= 2 (count nutrients))
       2
       3)]))

(defn update-nutrients
  [nutrients amount location]
  (reduce
   (fn [location nutrient]
     (-> location
         (update nutrient - amount)
         (update nutrient max 0)))
   location
   nutrients))

(s/fdef update-nutrients
  :args (s/cat :crop crops
               :location ::location))

(defn enter-spring
  [location]
  (if (= :forest (:type location))
    (if (> 2 (:flora location))
      (update location :flora inc)
      location)
    location))

(defn enter-summer
  [location]
  (if (= :plains (:type location))
    (cond
      ;; crop is ready for harvest
      (and (some? (:crop location))
           (false? (:ready? location))
           (false? (:wild? location)))
      (assoc location
             :ready? true)
      ;; crop goes wild
      (and (true? (:ready? location))
           (false? (:wild? location)))
      (let [[nutrients amount] (crop-info (:crop location))]
        (-> (update-nutrients nutrients amount location)
            (assoc :wild? true
                   :ready? false)))
      ;; crop stays wild
      (true? (:wild? location))
      (let [[nutrients amount] (crop-info (:crop location))]
        (update-nutrients nutrients amount location))
      :else
      location)
    location))

(defn enter-fall
  [location]
  location)

(defn enter-winter
  [location]
  (if (= :plains (:type location))
    (if (and (some? (:crop location))
             (true? (:ready? location))
             (false? (:wild? location)))
      ;; crop goes wild in winter
      (assoc location
             :wild? true
             :ready? false)
      location)
    location))

(defn inc-month [herd]
  (let [old-season (get-season herd)
        herd* (update herd :month inc)
        new-season (get-season herd*)]
    (if (not= new-season old-season)
      (case new-season
        ;; spring
        0 (map-locations enter-spring herd)
        ;; summer
        1 (map-locations enter-summer herd)
        ;; fall
        2 (map-locations enter-fall herd)
        ;; winter
        3 (map-locations enter-winter herd))
      herd*)))

(def crop-projects
  (map (fn [crop]
         (let [[nutrients amount] (crop-info crop)]
           [{:name (str "Plant " (name crop))
             :uses [:herbalism]
             :filter {:terrain :plains
                      :season :summer}
             :filter-fn
             (fn [_ location]
               (every? true? (map #(>= (get location %) amount) nutrients)))
             :location-effect
             #(-> (update-nutrients nutrients amount %)
                  (assoc :crop crop
                         :wild? false
                         :ready? false))}]))
       crops))

(def construction-projects
  (map (fn [[infra skill required-skill stores]]
         (let [uses (if skill
                      [:craftwork skill]
                      [:craftwork])]
           {:name (str "Construct " (name infra))
            :uses uses
            :filter {:stores stores
                     :skills (if required-skill
                               (reduce
                                (fn [all skill]
                                  (assoc all skill required-skill))
                                {}
                                uses)
                               {})}
            :location-effect
            (fn [location]
              (update location :infra conj infra))
            }))
       [[:granary :herbalism 100 {:wood 10 :stone 10 :tools 10}]
        [:stadium :athletics 100 {:wood 20 :stone 0 :tools 5}]
        [:quarry :geology 100 {:wood 10 :stone 50 :tools 20}]
        [:kitchen :medicine 100 {:wood 10 :stone 10 :tools 10}]]))

(def manufacture-projects
  (map
   (fn [[i material]]
     {:name (str "Manufacture " (name material) " tools")
      :uses [:craftwork]
      :filter (assoc {} material 50)
      :effect
      (fn [herd skill-amount]
        (let [amount (int (* i (/ skill-amount 2)))]
          (update-in herd [:stores :tools] + amount)))})
   [[1 :stone]
    [2 :bone]
    [4 :metal]]))

(def projects
  (concat crop-projects
          construction-projects
          manufacture-projects
          [{:name "Harvest crops"
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
           {:name "Hold festival"
            :uses [:athletics :organizing]
            :filter-fn
            (fn [herd _]
              (> (get-in herd [:stores :food] 0)
                 (count (:individuals herd))))
            :effect
            (fn [herd skill-amount]
              (let [amount (int (/ skill-amount 50))]
                (update herd :individuals
                        (partial map
                                 (fn [individual]
                                   (-> individual
                                       (update :fulfillment + amount)
                                       (update :fulfillment min max-fulfillment)))))))}
           {:name "Gather deadfall"
            :uses [:herbalism]
            :filter {:terrain :forest}
            :effect
            (fn [herd skill-amount]
              (let [wood (int (* skill-amount 3/4))
                    bone (int (* skill-amount 1/4))]
                (-> herd
                    (update-in [:stores :wood] + wood)
                    (update-in [:stores :bone] + bone))))}]))