(ns the-longtime-game.core
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [clojure.test.check.generators :as g]))

(def resources #{:food
                 :rations
                 :poultices
                 :wood
                 :bone
                 :stone
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
                :mountain})

(def traits #{:todo}) ; TODO

(def skill-ranks ["unfamiliar"
                  "novice"
                  "learned"
                  "adept"
                  "expert"
                  "virtuoso"])

(def max-age 50)
(def adulthood 20)
(def death-modifier 2/3)
(def optimal-pops-per-stage 20)
(def birth-modifier 2)
(def max-hunger 4)
(def max-infrastructure 4)
(def max-skill (count skill-ranks))
(def max-fulfillment 100)
(def max-passions 3)
(def experience-rate 10)
(def passion-rate 10)
(def fulfillment-rate 10)
(def fulfillment-decay 1)
(def carry-modifier 5)
(def organization-threshold 100)
(def organization-multiplier 10)

(def crop->nutrients
  {:grapplewheat #{:n :k}
   :rattails     #{:n :p}
   :drum-squash  #{:p :k}
   :bean-peppers #{:n}
   :lorry-tops   #{:p}
   :crownions    #{:k}})

(def crops (set (keys crop->nutrients)))
(def nutrients #{:n :k :p})

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
                      :kitchen
                      :workshop
                      :wind-forge
                      :temple
                      :hospital})

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

(s/def ::born int?)
(s/def ::passions (s/coll-of ::skill
                             :kind set?
                             :min-count 0
                             :max-count max-passions))
(s/def ::skill skills)
(s/def ::skills (s/map-of ::skill nat-int?))
(s/def ::uses (s/coll-of ::skill))
(s/def ::trait traits)
(s/def ::traits (s/coll-of ::trait :kind set?))
(s/def ::fulfillment (s/int-in 0 max-fulfillment))

(defn inc-some-skill [skills*]
  (let [skill (rand-nth (vec skills))
        rank (get skills* skill 0)]
    (if (= rank 5)
      (inc-some-skill skills*)
      (assoc skills* skill (inc rank)))))

(s/fdef inc-some-skill
  :args (s/cat :skills ::skills)
  :ret ::skills)

(defn get-age [{:keys [month]} {:keys [born]}]
  (int (/ (- month born) 12)))

(s/fdef get-age
  :args (s/cat :herd (s/keys :req-un [::month])
               :individual (s/keys :req-un [::born]))
  :ret nat-int?)

(defn becomes-passionate?
  [used {:keys [passions]}]
  (when (> max-passions (count passions))
    (let [candidates (filter (partial (complement contains?) passions) used)]
      (when (seq candidates)
        (let [chance (rand-int (int (* passion-rate (count candidates))))]
          (when (< chance (count candidates))
            (nth candidates chance)))))))

(s/fdef becomes-passionate?
  :args (s/cat :used ::uses
               :individual (s/keys :req-un [::passions]))
  :ret (s/nilable ::skill))

(defn age-individual
  [herd individual]
  (let [age (get-age herd individual)
        birthday? (= 0 (rem (- (:month herd)
                               (:born individual))
                            12))
        quintile-bday? (and birthday?
                            (= 0 (rem age 5)))
        gain-passion? (and quintile-bday?
                           (> (rand-int 3) 0))
        skill (when gain-passion?
                (becomes-passionate? skills individual))]
    (cond-> individual
      quintile-bday?
      (update :skills inc-some-skill)
      skill
      (update :passions conj skill))))

(defn gen-baby
  [born]
  {:name (gen-name)
   :born born
   :fulfillment 50
   :traits #{}
   :passions #{}
   :skills (reduce
            (fn [skills* skill]
              (assoc skills* skill 0))
            {}
            skills)})

(defn gen-individual
  [{:keys [month]} age-in-months]
  (let [born (- month age-in-months)
        individual (gen-baby born)]
    (reduce
     (fn [individual i]
       (let [month* (+ born i)]
         (age-individual {:month month*} individual)))
     individual
     (range age-in-months))))

(defn gen-adult
  [herd]
  (let [age (+ (* 12 adulthood)
               (rand-int (* 12 (- max-age adulthood))))]
    (gen-individual herd age)))

(s/def ::individual
  (s/with-gen
    (s/keys :req-un [::name
                     ::born
                     ::traits
                     ::passions
                     ::skills
                     ::fulfillment])
    #(g/fmap
      (fn [age] (gen-individual {:month 0} age))
      (s/gen (s/int-in 0 (rand-int (* 12 max-age)))))))

(s/fdef gen-baby
  :args (s/cat :born ::born)
  :ret ::individual)

(s/fdef age-individual
  :args (s/cat :herd (s/keys :req-un [::month])
               :individual ::individual)
  :ret ::individual)

(s/fdef gen-individual
  :args (s/cat :herd (s/keys :req-un [::month])
               :age (s/int-in 1 (* 12 max-age)))
  :ret ::individual)

(s/fdef gen-adult
  :args (s/cat :herd (s/keys :req-un [::month]))
  :ret ::individual)

(s/def ::individuals (s/coll-of ::individual :min-count 1))

(defn gen-individuals [herd n]
  (for [_ (range n)
        :let [age (rand-int (* 12 max-age))]]
    (gen-individual herd age)))

(s/fdef gen-individuals
  :args (s/cat :herd (s/keys :req-un [::month])
               :n (s/int-in 1 50))
  :ret ::individuals)

(s/def ::ethos (s/coll-of ::skill :kind set? :count 2))
(s/def ::syndicate ::ethos)
(s/def ::syndicates (s/coll-of ::syndicate :kind set?))

(defn syndicate-name [ethos]
  (as-> (vec (map skill->shortname ethos)) $
    (vec $)
    (conj $ "syn")
    (string/join "-" $)))

(s/fdef syndicate-name
  :args (s/cat :ethos ::ethos)
  :ret (s/and ::name
              #(string/ends-with? % "-syn")))

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
  :args (s/cat :herd (s/keys :req-un [::individuals
                                      ::syndicates]))
  :ret (s/keys :req-un [::syndicates]))

(defn remove-syndicate [herd]
  (update herd :syndicates (comp set rest)))

(s/fdef remove-syndicate
  :args (s/cat :herd (s/keys :req-un [::syndicates]))
  :ret (s/keys :req-un [::syndicates]))

(s/def ::type terrains)
(s/def ::infrastructure infrastructure)
(s/def ::infra (s/coll-of ::infrastructure :kind set?))
(s/def ::nutrient (s/int-in 0 4))
(s/def ::n ::nutrient)
(s/def ::k ::nutrient)
(s/def ::p ::nutrient)
(s/def ::crop (s/nilable crops))
(s/def ::wild? boolean?)
(s/def ::ready? boolean?)
(s/def ::flora (s/int-in 0 5))
(s/def ::depleted? boolean?)

(defn init-location [terrain]
  (case terrain
    :plains
    {:type :plains
     :infra #{}
     :n 2
     :k 2
     :p 2
     :crop nil
     :wild? false
     :ready? nil}
    :forest
    {:type :forest
     :infra #{}
     :flora 1
     :depleted? false}
    :mountain
    {:type :mountain
     :infra #{}}
    :steppe
    {:type :steppe}
    :swamp
    {:type :swamp
     :infra #{}
     :depleted? false}
    :jungle
    {:type :jungle
     :infra #{}}))

(s/def ::location
  (s/with-gen
    (s/and
     (s/keys :req-un [::type])
     (s/or
      :plains (s/keys :req-un [::infra
                               ::n
                               ::k
                               ::p
                               ::crop
                               ::wild?
                               ::ready?
                               ::stores])
      :forest (s/keys :req-un [::infra
                               ::flora
                               ::depleted?
                               ::stores])
      :swamp (s/keys :req-un [::infra
                              ::depleted?
                              ::stores])
      :basic  (s/keys :req-un [::infra
                               ::stores])
      :shortcut (s/keys :req-un [])))
    #(g/fmap init-location
             (s/gen terrains))))

(s/fdef init-location
  :args (s/cat :terrain terrains)
  :ret ::location)

(s/def ::resource resources)
(s/def ::stores (s/map-of ::resource nat-int?))
(s/def ::locations (s/coll-of ::location :min-count 1))
(s/def ::path (s/coll-of ::locations :kind vector? :min-count 1))
(s/def ::hunger (s/int-in 0 (+ 1 max-hunger)))
(s/def ::sickness nat-int?)
(s/def ::index nat-int?)
(s/def ::month nat-int?)

(defn gen-herd
  ([]
   (gen-herd {:hunger 0
              :sickness 0
              :month 0}))
  ([{:keys [hunger sickness month] :as herd}]
   (let [individuals (gen-individuals herd (rand-int 50))
         {:keys [syndicates]}
         (-> {:individuals individuals
              :syndicates #{}}
             add-syndicate
             (update :syndicates conj
                     (set (take 2 (shuffle (vec skills))))))]
     (gen-herd individuals syndicates {:hunger hunger
                                       :sickness sickness
                                       :month month})))
  ([individuals syndicates {:keys [hunger sickness month]}]
   {:individuals individuals
    :syndicates syndicates
    :stores (reduce
             (fn [all resource]
               (assoc all resource 0))
             {}
             resources)
    :hunger hunger
    :sickness sickness
    :index 0
    :month month
    :path [[(init-location :plains)]
           [(init-location :forest)]
           [(init-location :mountain)]
           [(init-location :steppe)]]}))

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
    #(g/fmap (fn [[individuals syndicates]]
               {:individuals individuals
                :syndicates syndicates
                :stores (reduce
                         (fn [all resource]
                           (assoc all resource 50))
                         {}
                         resources)
                :hunger 0
                :sickness 0
                :index 0
                :month 0
                :path [[(init-location :plains)]
                       [(init-location :forest)]
                       [(init-location :mountain)]
                       [(init-location :steppe)]]})
             (g/tuple
              (s/gen ::individuals)
              (s/gen ::syndicates)))))

(defn current-location
  [herd]
  (get-in herd [:path 0 (:index herd)]))

(s/fdef current-location
  :args (s/cat :herd ::herd)
  :ret ::location)

(defn birth-chance
  [{:keys [hunger sickness individuals path]}]
  (let [stages (count path)
        population (count individuals)
        optimal (* optimal-pops-per-stage
                   stages
                   (- 1 (/ hunger max-hunger))
                   (- 1 (/ sickness population)))
        births (-> (- optimal population)
                   (/ optimal)
                   (+ 1)
                   (* birth-modifier)
                   int
                   rand-int)]
    births))

(defn death-chance
  [{:keys [hunger sickness individuals] :as herd} individual]
  (* (/ (get-age herd individual) max-age)
     (+ 1 (/ hunger max-hunger))
     (+ 1 (/ sickness (count individuals)))))

(s/fdef death-chance
  :args (s/cat :herd ::herd
               :individual ::individual)
  :ret (s/and number? #(>= % 0)))

(defn died?
  [herd individual]
  (let [chance (death-chance herd individual)
        rolled (* chance (rand-int max-age))
        threshold (* death-modifier max-age)
        passed? (> rolled threshold)]
    passed?))

(s/fdef died?
  :args (s/cat :herd ::herd
               :individual ::individual)
  :ret boolean?)

(defn local-infra? [herd infra]
  (let [location (current-location herd)]
    (contains? (:infra location) infra)))

(s/def ::season (s/int-in 0 4))

(defn get-season [{:keys [month]}]
  (int (/ (rem month 12) 3)))

(s/fdef get-season
  :args (s/cat :herd ::herd)
  :ret ::season)

(defn individual-skill
  [individual skill]
  (* (get-in individual [:skills skill] 0)
     (/ (:fulfillment individual) max-fulfillment)))

(s/fdef individual-skill
  :args (s/cat :individual ::individual
               :skill skills)
  :ret number?)

(defn collective-skill
  [{:keys [individuals syndicates hunger sickness]} skill]
  (int (* (reduce
           #(+ %1 (individual-skill %2 skill))
           0
           individuals)
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

(s/fdef collective-skill
  :args (s/cat :herd ::herd
               :skill ::skill)
  :ret nat-int?)

(defn collective-labor
  [herd skill]
  (+ (collective-skill herd skill)
     (count (:individuals herd))))

(s/fdef collective-labor
  :args (s/cat :herd ::herd
               :skill ::skill)
  :ret nat-int?)

(defn carry-limit
  [herd]
  (* (collective-labor herd :athletics)
     carry-modifier))

(s/fdef carry-limit
  :args (s/cat :herd ::herd)
  :ret pos-int?)

(defn keep-and-leave-behind
  [herd carrying]
  (let [carrying
        (cond-> carrying
          (not (local-infra? herd :granary))
          (assoc :food 0))
        leaving
        (reduce
         (fn [all [resource amount]]
           (let [stored (get-in herd [:stores resource] 0)]
             (assoc all resource
                    (- stored amount))))
         {}
         carrying)]
    (-> (assoc herd :stores carrying)
        (assoc-in [:path 0 (:index herd) :stores] leaving))))

(s/fdef keep-and-leave-behind
  :args (s/with-gen
          (s/cat :herd ::herd
                 :carrying ::stores)
          #(g/fmap (fn [herd]
                     [herd
                      (reduce
                       (fn [all [resource amount]]
                         (assoc all resource (rand-int amount)))
                       {}
                       (:stores herd))])
                   (s/gen ::herd)))
  :ret ::herd)

(defn aggregate-store
  [herd]
  (let [location (current-location herd)]
    (merge-with +
                (:stores herd)
                (:stores location))))

(s/fdef aggregate-store
  :args (s/cat :herd ::herd)
  :ret ::stores)

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

(s/fdef has-lost?
  :args (s/cat :herd ::herd)
  :ret boolean?)

(defn next-location
  [{:keys [path] :as herd} index]
  (assoc herd
         :index index
         :path (vec (conj (rest path)
                          (first path)))))

(s/fdef next-location
  :args (s/cat :herd ::herd
               :index ::index)
  :ret ::herd)

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
         (update nutrient max 0)
         (update nutrient min 3)))
   location
   nutrients))

(s/fdef update-nutrients
  :args (s/cat :nutrients (s/coll-of nutrients :kind set?)
               :amount int?
               :location (s/with-gen
                           ::location
                           #(g/return (init-location :plains))))
  :ret ::location)

(defn enter-spring
  [location]
  (cond
    (= :forest (:type location))
    (cond-> (assoc location :depleted? false)
      (> 2 (:flora location))
      (update :flora inc))
    (= :swamp (:type location))
    (assoc location :depleted? false)
    :else
    location))

(s/fdef enter-spring
  :args (s/cat :location ::location)
  :ret ::location)

(defn enter-summer
  [location]
  (if (= :plains (:type location))
    (cond
      ;; plains is fallow
      ;; restore one of each nutrient
      (nil? (:crop location))
      (update-nutrients nutrients -1 location)
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

(s/fdef enter-summer
  :args (s/cat :location ::location)
  :ret ::location)

(defn enter-fall
  [location]
  location)

(s/fdef enter-fall
  :args (s/cat :location ::location)
  :ret ::location)

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

(s/fdef enter-winter
  :args (s/cat :location ::location)
  :ret ::location)

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

(defn pre-location [herd]
  (inc-month herd))

(defn post-location [herd]
  (apply-herd-upkeep herd))
