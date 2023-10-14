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

(def crop->nutrients
  {:grapplewheat #{:n :k}
   :rattails     #{:n :p}
   :drum-squash  #{:p :k}
   :singe-pepper #{:n}
   :lorry-tops   #{:p}
   :craunions    #{:k}})

(def skill-ranks ["unfamiliar"
                  "novice"
                  "learned"
                  "adept"
                  "expert"
                  "virtuoso"])

(def skill->shortname
  {:sport      "spo"
   :craftwork  "craf"
   :geology    "geo"
   :zoology    "zoo"
   :herbalism  "herb"
   :granarism  "gran"
   :medicine   "med"
   :artistry   "art"
   :organizing "org"})

(def first-syllable
  ["Il" "Ol" "Ib" "Ak"
   "Li" "El" "Et" "Uk"
   "Al" "At" "Im" "Ip"])

(def second-syllable
  ["Ba" "So" "Po" "Ma"
   "Na" "Mi" "Si" "Pa"
   "Zo" "Ze" "Ki" "Gi"])

(def infrastructure #{:todo}) ; TODO

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

(s/def ::age (s/int-in 0 100))
(s/def ::passions (s/coll-of ::skill
                             :kind set?
                             :min-count 0
                             :max-count 3))
(s/def ::skill skills)
(s/def ::skills (s/map-of ::skill (s/int-in 0 6)))
(s/def ::trait traits)
(s/def ::traits (s/coll-of ::trait :kind set?))
(s/def ::fulfillment (s/int-in 0 100))
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
                             ::wild?])
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
(s/def ::locations (s/coll-of ::location))
(s/def ::path (s/coll-of ::locations :kind vector?))
(s/def ::hunger (s/int-in 0 4)) ; 0, 1, 2, 3 => you lose
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
    #(g/fmap (fn [[individuals location]]
               {:individuals individuals
                :syndicates #{}
                :stores {}
                :hunger 0
                :sickness 0
                :index 0
                :month 0
                :path [[location]]})
             (g/tuple
              (s/gen ::individuals)
              (s/gen ::location)))))

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
            (- 1 (/ hunger 4))
            1)
          (if (> sickness 0)
            (max 0 (- 1 (/ sickness (count individuals))))
            1))))

(s/fdef effective-skill
  :args (s/cat :herd ::herd
               :skill ::skill)
  :ret nat-int?)

(defn location-upkeep
  [{:keys [individuals stores] :as herd}]
  (let [{:keys [food rations poultices]} stores
        need (count individuals)
        food-deficit (max 0 (- need food))
        new-rations (- rations food-deficit)
        hunger? (> 0 new-rations)
        poultice-deficit (max 0 (- need poultices))
        sickness? (> 0 poultice-deficit)]
    (cond-> herd
      hunger? (update :hunger inc)
      (not hunger?) (assoc :hunger 0)
      sickness? (assoc :sickness poultice-deficit))))

(s/fdef location-upkeep
  :args (s/cat :herd ::herd)
  :ret ::herd)

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
  (let [age (+ 1 (rand-int 100))
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
  (s/keys :req-un [::terrain
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
                                  ::uses
                                  ::filter
                                  ::effect]
                         :opt-un [::filter-fn
                                  ::location-effect]))

(defn can-enact?
  [herd location project]
  (and (if-let [terrain (get-in project [:filter :terrain])]
         (= (:type location) terrain)
         true)
       (reduce
        (fn [ok? [resource required]]
          (let [amount (get-in herd [:stores resource])]
            (and ok?
                 (>= amount required))))
        true
        (get-in project [:filter :stores]))
       (reduce
        (fn [ok? [skill required]]
          (and ok?
               (>= (effective-skill herd skill)
                   required)))
        true
        (get-in project [:filter :skills]))
       (if-let [filter-fn (:filter-fn project)]
         (filter-fn herd location)
         true)))

(s/fdef can-enact?
  :args (s/cat :herd ::herd
               :location ::location
               :project ::project)
  :ret boolean?)

(defn enact-project
  [herd location {:keys [uses effect location-effect]}]
  (let [skill (/ (reduce + (map (partial effective-skill herd) uses)) (count uses))]
    [(effect herd skill)
     (if location-effect
       (location-effect location)
       location)]))

(s/fdef enact-project
  :args (s/cat :herd ::herd
               :location ::location
               :project ::project)
  :ret (s/tuple ::herd ::location))

(defn distribute-experience
  [herd {:keys [uses]}]
  'todo)

(s/fdef distribute-experience
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn distribute-fulfillment
  [herd {:keys [uses]}]
  'todo)

(s/fdef distribute-fulfillment
  :args (s/cat :herd ::herd)
  :ret ::herd)