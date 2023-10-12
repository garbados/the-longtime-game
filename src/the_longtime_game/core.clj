(ns the-longtime-game.core
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [clojure.test.check.generators :as g]))

(def resources #{:food
                 :rations
                 :poultice
                 :wood
                 :bone
                 :ore
                 :tools})

(def skills #{:sport
              :craftwork
              :geology
              :zoology
              :herbalism
              :granarism
              :medicine
              :organizing})

(def skill-ranks ["unfamiliar"
                  "novice"
                  "learned"
                  "adept"
                  "expert"
                  "virtuoso"])

(def locations #{:plains
                 :forest
                 :jungle
                 :swamp
                 :steppe
                 :mountain
                 :shortcut
                 :elevator})

(def traits #{:todo}) ; TODO

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

(def rationales #{:todo}) ; TODO

(defn gen-name []
  (string/join "-" [(rand-nth first-syllable)
                    (rand-nth second-syllable)]))

(s/fdef gen-name
  :args (s/cat)
  :ret ::name)

(s/def ::name
  (s/with-gen string?
    #(g/fmap (partial string/join "-")
             (g/tuple (g/elements first-syllable)
                      (g/elements second-syllable)))))
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

(s/def ::type locations)
(s/def ::infrastructure infrastructure)
(s/def ::infra (s/coll-of ::infrastructure :kind set?))
(s/def ::nutrient nat-int?)
(s/def ::n ::nutrient)
(s/def ::k ::nutrient)
(s/def ::p ::nutrient)
(s/def ::flora (s/int-in 0 5))

(s/def ::meta
  (s/or
   :plains (s/keys :req-un [::infra
                            ::n
                            ::k
                            ::p])
   :forest (s/keys :req-un [::infra
                            ::flora])
   :steppe nil?
   :basic  (s/keys :req-un [::infra])))

(s/def ::location
  (s/and
   (s/keys :req-un [::type
                    ::meta])
   (fn [location]
     (contains? #{:basic (:type location)}
                (first (:meta location))))))

(s/def ::ethos (s/coll-of ::skill :kind set? :count 2))
(s/def ::syndicate ::ethos)

(s/def ::syndicates (s/coll-of ::syndicate :kind set?))
(s/def ::individuals (s/coll-of ::individual))
(s/def ::resource resources)
(s/def ::stores (s/map-of ::resource pos-int?))
(s/def ::rationale rationales)
(s/def ::rationales (s/coll-of ::rationale :kind set?))
(s/def ::locations (s/coll-of ::location))
(s/def ::path (s/coll-of ::locations :kind vector?))
(s/def ::index nat-int?)
(s/def ::herd
  (s/with-gen
    (s/keys :req-un [::individuals
                     ::syndicates
                     ::stores
                     ::rationales
                     ::index
                     ::path])
    #(g/fmap (fn [[individuals location]]
               {:individuals individuals
                :syndicates #{}
                :stores {}
                :rationales #{}
                :index 0
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
  :ret (s/and string?
              #(string/ends-with? % "-syn")))

(defn effective-skill [herd skill]
  (int (* (->> (:individuals herd)
               (map :skills)
               (map #(get % skill 0))
               (reduce +))
          (-> (->> (:syndicates herd)
                   (reduce into [])
                   frequencies)
              (get skill 0)
              (* 1/2)
              (+ 1/2)))))

(s/fdef effective-skill
  :args (s/cat :herd ::herd
               :skill ::skill)
  :ret nat-int?)

(defn next-location [herd index]
  (let [{:keys [path]} herd]
    (assoc herd
           :index index
           :path (conj (rest path)
                       (first path)))))

(s/fdef next-location
  :args (s/cat :herd ::herd
               :index ::index)
  :ret ::herd)

(defn tally-votes [herd]
  (->> (:individuals herd)
       (map
        (fn [individual]
          (reduce
           (fn [all [skill rank]]
             (assoc all skill (if (contains? (:passions individual) skill)
                                (* rank 2)
                                rank)))
           {}
           (:skills individual))))
       (reduce
        (fn [votes vote]
          (for [[skill value] votes]
            [skill (+ value (get vote skill 0))]))
        (for [skill skills]
          [skill 0]))
       (sort-by second >)))

(defn rank-candidates [votes]
  (let [leader (-> votes first first)]
    (if-let [runner (-> votes second first)]
      (conj (lazy-seq
             (rank-candidates (rest votes)))
            #{leader runner})
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
  :ret ::syndicate)

(defn add-syndicate [herd]
  (let [votes (tally-votes herd)
        candidates (rank-candidates votes)
        candidate (select-candidate (:syndicates herd) candidates)]
    (update herd :syndicates conj candidate)))

(s/fdef add-syndicate
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn remove-syndicate [herd]
  (update herd :syndicates rest))

(s/fdef remove-syndicate
  :args (s/cat :herd ::herd)
  :ret ::herd)
