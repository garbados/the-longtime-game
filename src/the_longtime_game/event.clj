(ns the-longtime-game.event
  (:require [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [clojure.test.check.generators :as g]))

(def events
  [{:name "Plague"
    :select {}
    :marshal-fn
    (fn [_ herd]
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
  [{:name "Purpose"
    :character {:max-passions 2}}
   {:name "Doubt"}
   {:name "Exhaustion"}
   {:name "Gratitude"}
   {:name "Grief"}
   {:name "Joy"}
   {:name "Growth"}])

(s/def ::passions (s/int-in 0 4))
(s/def ::min-passions ::passions)
(s/def ::max-passions ::passions)
(s/def ::age (s/int-in 15 core/max-age))
(s/def ::min-age ::age)
(s/def ::max-age ::age)
(s/def ::character (s/keys :opt-un [::core/traits
                                    ::core/skills
                                    ::min-passions
                                    ::max-passions
                                    ::min-age
                                    ::max-age]))
(s/def ::select (s/coll-of ::character))
(s/def ::filter (s/keys :opt-un [::core/season
                                 ::terrain
                                 ::core/stores]))
(s/def ::filter-fn ifn?)
(s/def ::effect ifn?)
(s/def ::marshal-fn ifn?)
(s/def ::choices-fn ifn?)
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
                     ::character
                     ::choices-fn
                     ::effect
                     ::text-fn]
            :opt-un [::filter
                     ::filter-fn])
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

(defn match-select [herd individual {:keys [traits skills max-age min-age]}]
  (and (if traits
         (every? some? (for [trait traits]
                         (-> individual :traits trait)))
         true)
       (if skills
         (every? true? (for [[skill value] skills]
                         (-> individual :skills skill (>= value))))
         true)
       (let [age (core/get-age herd individual)]
         (and (if max-age
                (< age max-age)
                true)
              (if min-age
                (> age min-age)
                true)))))

(s/fdef match-select
  :args (s/cat :herd ::core/herd
               :individual ::core/individual
               :select ::select)
  :ret boolean?)

(defn find-character [herd character-select]
  (first
   (for [individual (shuffle (:individuals herd))
         :when (match-select herd individual character-select)]
     individual)))

(s/fdef find-character
  :args (s/cat :herd ::core/herd
               :character-select ::character)
  :ret (s/nilable ::core/individual))

(defn get-cast [herd event]
  (for [character-select (:select event)]
    (find-character herd character-select)))

(s/fdef get-cast
  :args (s/cat :herd ::core/herd
               :event ::event)
  :ret (s/coll-of (s/nilable ::core/individual)))

(defn can-event-trigger?
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
         (if-let [filter-fn (:filter-fn event)]
           (boolean (filter-fn herd))
           true)
         (every?
          some?
          (for [character-select (:select event)]
            (find-character herd character-select))))))

(s/fdef can-event-trigger?
  :args (s/cat :herd ::core/herd
               :event ::event)
  :ret boolean?)

(defn can-dream-trigger?
  [info herd dream]
  (let [location (core/current-location herd)]
    (and (if-let [terrain (get-in dream [:filter :terrain])]
           (= (:terrain location) terrain)
           true)
         (if-let [season (get-in dream [:filter :season])]
           (= (core/get-season herd) season)
           true)
         (every?
          true?
          (for [[resource required] (get-in dream [:filter :stores] [])]
            (let [amount (get-in herd [:stores resource] 0)]
              (>= amount required))))
         (if-let [filter-fn (:filter-fn dream)]
           (boolean (filter-fn herd))
           true)
         (if-let [individual (find-character herd (:character dream))]
           (< 0 (count ((:choices-fn dream) info herd individual)))
           false))))

(defn enact-event
  [info herd {:keys [marshal-fn effect text-fn] :as event}]
  (let [characters (get-cast herd event)
        marshalled (marshal-fn info herd)
        text (text-fn info herd characters marshalled)
        [info herd] (effect info herd characters marshalled)]
    [info herd text]))

(s/fdef enact-event
  :args (s/cat :info ::info
               :herd ::core/herd
               :event ::event)
  :ret (s/tuple ::info ::core/herd string?))

(defn get-dream-choices
  [info herd dream character]
  ((:choices-fn dream) info herd character))