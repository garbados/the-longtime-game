(ns the-longtime-game.core 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [clojure.test.check.generators :as g]))

(def resources #{:food
                 :poultice
                 :bone
                 :ore
                 :tools})

(def skills #{:sport
              :craftwork
              :geology
              :zoology
              :herbalism
              :medicine
              :artistry
              :organizing
              :research})

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
   :medicine   "med"
   :artistry   "art"
   :organizing "org"
   :research   "re"})

(def first-syllable
  ["Il" "Ol" "Ib" "Ak"
   "Li" "El" "Et" "Uk"
   "Al" "At" "Im" "Ip"])

(def second-syllable
  ["Ba" "So" "Po" "Ma"
   "Na" "Mi" "Si" "Pa"
   "Zo" "Ze" "Ki" "Gi"])

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
(s/def ::skills (s/map-of ::skill (s/int-in 0 5)))
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
(s/def ::flora (s/int-in 0 5))
(s/def ::fauna (s/int-in 0 5))
(s/def ::crew (s/nilable (s/coll-of ::individual :count 6)))

(s/def ::location (s/keys :req-un [::type
                                   ::flora
                                   ::fauna
                                   ::crew]))

(s/def ::ethos (s/coll-of ::skill :kind set? :count 2))
(s/def ::syndicate ::ethos)

(s/def ::syndicates (s/coll-of ::syndicate :kind set?))
(s/def ::individuals (s/coll-of ::individual))
(s/def ::resource resources)
(s/def ::stores (s/map-of ::resource pos-int?))
(s/def ::rationale #{:todo}) ; TODO
(s/def ::researching ::rationale)
(s/def ::rationales (s/coll-of ::rationale :kind set?))
(s/def ::organization nat-int?)
(s/def ::locations (s/coll-of ::location))
(s/def ::path (s/coll-of ::locations :kind vector?))
(s/def ::herd
  (s/with-gen
    (s/keys :req-un [::individuals
                     ::syndicates
                     ::stores
                     ::rationales
                     ::location
                     ::organization
                     ::researching
                     ::path])
    #(g/fmap (fn [[individuals location rationale]]
               {:individuals individuals
                :syndicates #{}
                :stores {}
                :rationales #{}
                :location location
                :organization 0
                :researching rationale
                :path [[location]]})
             (g/tuple
              (s/gen ::individuals)
              (s/gen ::location)
              (s/gen ::rationale)))))

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

