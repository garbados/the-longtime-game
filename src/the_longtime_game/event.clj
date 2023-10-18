(ns the-longtime-game.event
  (:require [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [clojure.test.check.generators :as g]))


(def events [])

(def dreams [])

(s/def ::min-age ::core/age)
(s/def ::max-age ::core/age)
(s/def ::character (s/keys :opt-un [::core/traits
                                    ::core/skills
                                    ::min-age
                                    ::max-age]))
(s/def ::select (s/coll-of ::character))
(s/def ::skills (s/map-of ::core/skill pos-int?))
(s/def ::filter (s/keys :opt-un [::core/season
                                 ::terrain
                                 ::core/stores]))
(s/def ::filter-fn ifn?)
(s/def ::effect ifn?)
(s/def ::marshal-fn ifn?)
(s/def ::text-fn ifn?)

(s/def ::event
  (s/with-gen
    (s/keys :req-un [::core/name
                     ::select
                     ::filter
                     ::effect
                     ::text-fn]
            :opt-un [::filter-fn])
    #(g/elements events)))

(s/def ::dream
  (s/with-gen
    (s/keys :req-un [::filter
                     ::character
                     ::marshal-fn
                     ::text-fn]
            :opt-un [::filter-fn])
    #(g/elements dreams)))

(s/def ::births (s/coll-of ::core/individual))
(s/def ::deaths (s/coll-of ::core/individual))
(s/def ::event (s/nilable string?))
(s/def ::projects (s/coll-of string?))
(s/def ::dreams (s/coll-of string?))
(s/def ::meta
  (s/keys :req-un [::births
                   ::deaths
                   ::event
                   ::projects
                   ::dreams]))

(defn can-trigger?
  [herd event]
  (let [location (core/current-location herd)]
    (and (if-let [terrain (get-in event [:filter :terrain])]
           (= (:terrain location) terrain)
           true)
         (if-let [season (get-in event [:filter :season])]
           (= (core/get-season herd) season)
           true)
         (every?
          true?
          (for [[resource required] (get-in event [:filter :stores] [])]
            (let [amount (get-in herd [:stores resource] 0)]
              (>= amount required))))
         (every?
          true?
          (for [{:keys [traits skills max-age min-age]} (:select event)]
            (first
             (for [individual (:individuals herd)
                   :when (and (every? some? (for [trait traits]
                                              (-> individual :traits trait)))
                              (every? true? (for [[skill value] skills]
                                              (-> individual :skills skill (>= value))))
                              (let [age (-> individual :born (- (:month herd)) (/ 12) int abs)]
                                (and (if max-age
                                       (< age max-age)
                                       true)
                                     (if min-age
                                       (> age min-age)
                                       true))))]
               true))))
         
         (if-let [filter-fn (:filter-fn event)]
           (boolean (filter-fn herd))
           true))))

(s/fdef can-trigger?
  :args (s/cat :herd ::core/herd
               :event ::event)
  :ret boolean?)
