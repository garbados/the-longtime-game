(ns the-longtime-game.select 
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [the-longtime-game.core :as core]))

(s/def ::skills (s/map-of ::core/skill nat-int?))

(s/def ::contacts
  (s/or :one ::core/contact
        :many ::core/contacts))

(s/def ::space
  (s/or :one core/space-infra
        :many ::core/space))

(s/def ::infra
  (s/or :one core/buildings
        :many ::core/infra))

(s/def ::power pos-int?)

(s/def ::stores
  (s/map-of ::core/resource
            (s/or :n nat-int?
                  :x (s/and number? #(< 0 % 1)))))

(s/def ::filter (s/keys :opt-un [::skills
                                 ::stores
                                 ::core/season
                                 ::core/terrain
                                 ::contacts
                                 ::space
                                 ::infra
                                 ::power]))

;; other filter ideas: contacts, space, buildings

(defn passes-filter?
  [herd {:keys [skills
                stores
                season
                terrain
                contacts
                space
                infra
                power]}]
  (and (if terrain
         (= (:terrain (core/current-location herd)) terrain)
         true)
       (if season
         (= (core/get-season herd) season)
         true)
       (reduce
        (fn [ok? [resource required]]
          (let [amount
                (if (> 1 required 0)
                  (int (* required (count (:individuals herd))))
                  (get-in herd [:stores resource] 0))]
            (and ok?
                 (>= amount required))))
        true
        (or stores {}))
       (if (and contacts (s/valid? ::contacts contacts))
         (let [[kind x] (s/conform ::contacts contacts)]
           (case kind
             :one (contains? (:contacts herd) x)
             :many (nil? (seq (reduce disj x (:contacts herd))))))
         true)
       (if (and infra (s/valid? ::infra infra))
         (let [[kind x] (s/conform ::infra infra)
               location (core/current-location herd)]
           (case kind
             :one (contains? (:infra location) x)
             :many (nil? (seq (reduce disj x (:infra location))))))
         true)
       (if (and space (s/valid? ::space space))
         (let [[kind x] (s/conform ::space space)]
           (case kind
             :one (contains? (:space herd) x)
             :many (nil? (seq (reduce disj (set x) (:space herd))))))
         true)
       (if power
         (let [location (core/current-location herd)]
           (>= (:power location) power))
         true)
       (reduce
        (fn [ok? [skill required]]
          (and ok?
               (>= (core/collective-skill herd skill)
                   required)))
        true
        (or skills {}))))

(s/fdef passes-filter?
  :args (s/cat :herd ::core/herd
               :filter ::filter)
  :ret boolean?)

(s/def ::comp? 
  (s/with-gen
    ifn?
    #(g/return <)))

(s/def ::set-comp?
  (s/with-gen
    ifn?
    #(g/return contains?)))

(s/def ::fulfillment
  (s/or :n ::core/fulfillment
        :comp (s/tuple ::comp? ::core/fulfillment)))

(s/def ::passions
  (s/or :passion ::core/skill
        :set ::core/uses
        :comp (s/tuple ::set-comp? any?)))

(s/def ::traits
  (s/or :one core/traits
        :many ::core/traits))

(s/def ::age
  (s/tuple ::comp? ::core/age))

(s/def ::select (s/keys :opt-un [::traits
                                 ::core/skills
                                 ::fulfillment
                                 ::passions
                                 ::age]))

(defn passes-select?
  [herd individual {:keys [traits skills fulfillment passions age]}]
  (and (if (and traits (s/valid? ::traits traits))
         (let [[kind x] (s/conform ::traits traits)]
           (case kind
             :one (some? (-> individual :traits x))
             :many (every? some? (for [trait x]
                                   (-> individual :traits trait)))))
         true)
       (if skills
         (every? true? (for [[skill value] skills]
                         (-> individual :skills skill (>= value))))
         true)
       (if-let [[comp n] age]
         (comp (core/get-age herd individual) n)
         true)
       (if (and fulfillment (s/valid? ::fulfillment fulfillment))
         (let [[kind x] (s/conform ::fulfillment fulfillment)]
           (case kind
             :n (> (:fulfillment individual) x)
             :comp ((first x) (:fulfillment individual) (second x))))
         true)
       (if (and passions (s/valid? ::passions passions))
         (let [[kind x] (s/conform ::passions passions)]
           (case kind
             :passion (contains? (:passions individual) x)
             :set (empty? (reduce disj (set x) (:passions individual)))
             :comp ((first x) (:passions individual) (second x))))
         true)))

(s/fdef passes-select?
  :args (s/cat :herd ::core/herd
               :individual ::core/individual
               :select ::select)
  :ret boolean?)

(defn find-individuals
  [herd select]
  (seq
   (filter
    #(passes-select? herd % select)
    (:individuals herd))))

(s/fdef find-individuals
  :args (s/cat :herd ::core/herd
               :select ::select)
  :ret (s/nilable ::core/individuals))

(defn get-cast [herd selects]
  (seq
   (reduce
    (fn [selected select]
      (if-let [individuals
               (seq
                (filter
                 (complement (partial contains? selected))
                 (find-individuals herd select)))]
        (conj selected (rand-nth individuals))
        (reduced nil)))
    #{}
    selects)))

(s/fdef get-cast
  :args (s/cat :herd ::core/herd
               :selects (s/coll-of ::select))
  :ret (s/nilable ::core/individuals))
