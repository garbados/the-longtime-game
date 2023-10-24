(ns the-longtime-game.event
  (:require [clojure.set :refer [difference]]
            [clojure.spec.alpha :as s]
            [clojure.test.check.generators :as g]
            [the-longtime-game.core :as core]))

(def events
  [{:name "Plague"
    :select [{}]
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
    :select [{:max-passions 2}]
    :marshal-fn
    (constantly nil)
    :choices-fn
    (fn [_info _herd [dreamer]]
      (->> (:passions dreamer)
           (difference core/skills)
           vec
           shuffle
           (take 2)))
    :effect
    (fn [info herd cast _ skill]
      [info
       (core/update-individual
        herd
        (first cast)
        #(update % :passions conj skill))])
    :text-fn (constantly "a cow wonders about their purpose")}
   {:name "Doubt"
    :select [{:traits #{:depressed}}]}
   {:name "Exhaustion"}
   {:name "Gratitude"
    :select [{}]
    :filter-fn
    (fn [_ herd]
      (< 70 (/ (reduce + (map :fulfillment (:individuals herd)))
               (count (:individuals herd)))))}
   {:name "Grief"
    :select [{}]
    :filter-fn
    (fn [{:keys [deaths]} _]
      (< 0 (count deaths)))
    :marshal-fn
    (fn [{:keys [deaths]} _ _]
      (rand-nth deaths))}
   {:name "Joy"}
   {:name "Growth"}])

(s/def ::new-adults (s/coll-of ::core/individual))
(s/def ::new-dead (s/coll-of ::core/individual))
(s/def ::event (s/nilable string?))
(s/def ::projects (s/coll-of string?))
(s/def ::dreams (s/coll-of string?))
(s/def ::info
  (s/keys :req-un [::new-adults
                   ::new-dead
                   ::event
                   ::projects
                   ::dreams]))

(defn fresh-info
  []
  {:new-adults []
   :new-dead []
   :event nil
   :projects []
   :dreams []})

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
(s/def ::filter-fn
  (s/fspec :args (s/cat :info ::info
                        :herd ::core/herd)
           :ret boolean?))
(s/def ::marshal-fn
  (s/fspec
   :args (s/cat :info ::info
                :herd ::core/herd
                :cast ::core/individuals)))
(s/def :event/effect
  (s/fspec :args (s/cat :info ::info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?)
           :ret (s/tuple ::info ::core/herd)))
(s/def :dream/effect
  (s/fspec :args (s/cat :info ::info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?
                        :choice any?)
           :ret (s/tuple ::info ::core/herd)))
(s/def ::choices-fn
  (s/fspec :args (s/cat :info ::info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?)
           :ret any?))
(s/def :event/text-fn
  (s/fspec :args (s/cat :info ::info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?)
           :ret string?))
(s/def :dream/text-fn
  (s/fspec :args (s/cat :info ::info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?
                        :choice any?)
           :ret string?))

(s/def ::event
  (s/with-gen
    (s/keys :req-un [::core/name
                     ::select
                     :event/effect
                     ::marshal-fn
                     :event/text-fn]
            :opt-un [::filter
                     ::filter-fn])
    #(g/elements events)))

(s/def ::dream
  (s/with-gen
    (s/and
     (s/keys :req-un [::core/name
                      ::select
                      :dream/effect
                      ::marshal-fn
                      ::choices-fn
                      :dream/text-fn]
             :opt-un [::filter
                      ::filter-fn])
     #(< 0 (count (:select %))))
    #(g/elements dreams)))

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
   (for [individual (:individuals herd)
         :when (match-select herd individual character-select)]
     individual)))

(s/fdef find-character
  :args (s/cat :herd ::core/herd
               :character-select ::character)
  :ret (s/nilable ::core/individual))

(defn get-cast [herd event-or-dream]
  (for [character-select (:select event-or-dream)]
    (find-character herd character-select)))

(s/fdef get-cast
  :args (s/cat :herd ::core/herd
               :event-or-dream
               (s/keys :req-un [::select]))
  :ret (s/coll-of (s/nilable ::core/individual)))

(defn can-event-trigger?
  [info herd event]
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
           (boolean (filter-fn info herd))
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

(defn enact-dream
  [info herd dream cast marshalled choice]
  ((:effect dream) info herd cast marshalled choice))