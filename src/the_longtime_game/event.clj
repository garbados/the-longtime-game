(ns the-longtime-game.event
  (:require [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [clojure.test.check.generators :as g]))

(def events
  [{:name "Plague"
    :select {}
    :marshal-fn
    (fn [herd]
      (and (<= 50 (get-in herd [:stores :poultices] 0))
           (>= (core/collective-skill herd :medicine)
               (/ (count (:individuals herd)) 2))))
    :effect
    (fn [info herd [individual] passed?]
      (if passed?
        [info
         (update-in herd [:stores :poultices] - 50)]
        [(update info :deaths conj individual)
         (update herd :individuals
                 #(filter (partial not= individual) %))]))
    :text-fn
    (fn [_ __ [individual] passed?]
      (if passed?
        (str "An ill wind seizes the people."
             "Many fall sick; healers leap into action."
             "They draw from plentiful reserves"
             "of medicines and expertise,"
             "preserving the lives of those afflicted."
             "Slowly but surely, they recover,"
             "returning to the daily business of the herd"
             "bit by bit, gently, day by day."
             "A season of loss, averted!")
        (str "An ill wind seizes the people."
             "Many fall sick; healers leap into action."
             "But " (:name individual) " is not strong enough."
             "For want of experts and remedies,"
             "they perish in simmering agony."
             "With hollow, shallow breath, last words slip out."
             "\"Live on,\" they beg, \"For me. For everyone.\"")))}
   {:name "Ration-rot"}
   {:name "Grux'nis attack"}
   {:name "Crossed paths"}
   {:name "Fire"}
   {:name "Flash flood"}
   {:name "Public dispute"}
   {:name "Syndicate rivalry"}
   {:name "Catharsis"}
   {:name "Wound festers"}
   {:name "Head injury"}
   {:name "Syndicate induction"}
   {:name "Fallen in love"}])

(def dreams
  [{:name "Purpose"}
   {:name "Doubt"}
   {:name "Exhaustion"}
   {:name "Gratitude"}
   {:name "Grief"}
   {:name "Joy"}
   {:name "Growth"}])

(s/def ::age (s/int-in 15 core/max-age))
(s/def ::min-age ::age)
(s/def ::max-age ::age)
(s/def ::character (s/keys :opt-un [::core/traits
                                    ::core/skills
                                    ::min-age
                                    ::max-age]))
(s/def ::select (s/coll-of ::character))
(s/def ::skills (s/map-of ::core/skill pos-int?))
(s/def ::filter (s/keys :opt-un [::core/season
                                 ::terrain
                                 ::skills
                                 ::core/stores]))
(s/def ::filter-fn ifn?)
(s/def ::effect ifn?)
(s/def ::marshal-fn ifn?)
(s/def ::text-fn ifn?)

(s/def ::event
  (s/with-gen
    (s/keys :req-un [::core/name
                     ::select
                     ::effect
                     ::marshal-fn
                     ::text-fn]
            :opt-un [::filter
                     ::filter-fn])
    #(g/elements events)))

(s/def ::dream
  (s/with-gen
    (s/keys :req-un [::core/name
                     ::filter
                     ::character
                     ::effect
                     ::marshal-fn
                     ::text-fn]
            :opt-un [::filter-fn])
    #(g/elements dreams)))

(s/def ::births (s/coll-of ::core/individual))
(s/def ::deaths (s/coll-of ::core/individual))
(s/def ::event (s/nilable string?))
(s/def ::projects (s/coll-of string?))
(s/def ::dreams (s/coll-of string?))
(s/def ::info
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
          (for [{:keys [traits skills max-age min-age]} (:select event [])]
            (first
             (for [individual (:individuals herd)
                   :when (and (every? some? (for [trait traits]
                                              (-> individual :traits trait)))
                              (every? true? (for [[skill value] skills]
                                              (-> individual :skills skill (>= value))))
                              (let [age (core/get-age herd individual)]
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

(defn get-character
  [herd character])