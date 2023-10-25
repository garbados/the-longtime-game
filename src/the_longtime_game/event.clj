(ns the-longtime-game.event
  (:require [clojure.set :refer [difference]]
            [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def events
  [{:name "Plague"
    :select [{}]
    :marshal-fn
    (fn [_ herd]
      (let [population (count (:individuals herd))]
        (and (core/herd-has-resource herd :poultices (* 1/3 population))
             (core/herd-has-skill herd :medicine (* 1/4 population)))))
    :effect
    (fn [info herd [individual] passed?]
      (if passed?
        [info
         (update-in herd [:stores :poultices] (comp int *) 2/3)]
        (core/perish info herd individual)))
    :text-fn
    (fn [_ __ [individual] passed?]
      (string/join
       " "
       (if passed?
         ["An ill wind seizes the people."
          "Many fall sick; healers leap into action."
          "They draw from plentiful reserves"
          "of medicines and expertise,"
          "preserving the lives of those afflicted."
          "Slowly but surely, they recover,"
          "returning to the daily business of the herd"
          "bit by bit, gently, day by day."
          "A season of loss, averted!"]
         ["An ill wind seizes the people."
          "Many fall sick; healers leap into action,"
          "though they are too little. Too late."
          (:name individual) "is not strong enough."
          "For want of experts and remedies,"
          "they perish in simmering agony."
          "With hollow, shallow breath, last words slip out."
          "\"Live on,\" they beg, \"For me. For everyone.\""])))}
   {:name "Ration-rot"
    :select [{:skills {:medicine 3}}]
    :effect
    (fn [info herd _ __]
      [info
       (update-in herd [:stores :rations] (comp int *) 2/3)])
    :text-fn
    (fn [_ __ [individual] ___]
      (string/join
       " "
       ["The wrong sort of bug got the scent of our stores,"
        "and they buggered right in there overnight."
        "What a mess."
        "But" (:name individual) "spotted it right away."
        "First thing in the morning, they threw the lot in sacks"
        "and queued them for the pyre."
        "By then others were disinfecting the earthen-cellar"
        "with tenderfire and incense."
        "We've lost a fair few meals from the ordeal,"
        "but we'll live."
        "That was never in doubt."]))}
   {:name "Grux'nis attack"
    :select [{} {:skills {:medicine 4 :athletics 4}}]
    :effect
    (fn [info herd [victim ibba] _]
      [info
       (-> herd
           (core/update-individual
            victim
            #(update % :traits conj :wounded))
           (core/update-individual
            ibba
            #(-> %
                 (update-in [:skills :medicine] inc)
                 (update-in [:skills :athletics] inc))))])
    :text-fn
    (constantly "TODO")}
   {:name "Depression ends"
    :select [{:traits #{:depressed}} {:skills {:medicine 3}}]
    :effect
    (fn [info herd [sadcow healcow] & _]
      [info
       (-> herd
           (core/update-individual
            sadcow
            #(update % :traits disj :depressed))
           (core/update-individual
            healcow
            #(update % :fulfillment + 10)))])
    :text-fn
    (constantly "TODO")}
   {:name "Wound healed"
    :select [{:traits #{:wounded}} {:skills {:medicine 3 :craftwork 3}}]
    :filter {:stores {:poultices 5 :tools 5}}
    :effect
    (fn [info herd [hurtcow healcow] _]
      [info
       (-> herd
           (core/update-individual
            hurtcow
            #(update % :traits disj :wounded))
           (core/update-individual
            healcow
            #(update % :fulfillment + 10)))])
    :text-fn
    (constantly "TODO")}
   {:name "Crossed paths"
    :select [{:skills {:organizing 3}}]
    :marshal-fn
    (fn [_info herd & _]
      (let [population (count (:individuals herd))
            n (int (* 1/8 population))
            gift (reduce
                  (fn [all resource]
                    (assoc all resource (rand-int n)))
                  {}
                  (take (rand-int (count core/carryable))
                        (vec core/carryable)))]
        gift))
    :effect
    (fn [info herd _ gift]
      [info
       (-> herd
           (update :stores (partial merge-with +) gift)
           (update :individuals
                   (fn [individuals]
                     (vec
                      (map #(core/inc-fulfillment % 5)
                           individuals)))))])
    :text-fn
    (constantly "TODO")}
   {:name "Fire"
    :select [{:traits #{:weary}}]
    :filter-fn
    (fn [_ herd]
      (let [location (core/current-location herd)]
        (pos? (count (:infra location)))))
    :marshal-fn
    (fn [_ herd _]
      (let [location (core/current-location herd)]
        (rand-nth (vec (:infra location)))))
    :effect
    (fn [info herd [individual] infra]
      (let [location (core/current-location herd)
            location* (update location :infra disj infra)]
        [info
         (-> herd
             (core/assoc-location location*)
             (core/update-individual individual
                                     #(update % :traits disj :weary)))]))
    :text-fn
    (constantly "TODO")}
   {:name "Flash flood"
    :select [{:athletics 2}]
    :filter {:stores {:tools 10} :skills {:craftwork 10 :organizing 10}}
    :effect
    (fn [info herd [individual] _]
      [info
       (core/update-individual herd individual
                               #(update % :traits conj :wounded))])
    :text-fn
    (constantly "TODO")}
   {:name "Public dispute"
    :select [{:min-passions 2} {:min-passions 2}]
    :effect
    (fn [info herd [fitecow1 fitecow2] _]
      ;; TODO
      [info herd])
    :text-fn
    (constantly "TODO")}
   {:name "Syndicate rivalry"}
   {:name "Catharsis"}
   {:name "Wound festers"}
   {:name "Head injury"}
   {:name "Syndicate induction"}
   {:name "Fallen in love"}])

(def dreams
  [{:name "Purpose"
    :select [{:max-passions 2}]
    :choices-fn
    (fn [_info _herd [dreamer]]
      (->> (:passions dreamer)
           (difference core/skills)
           vec
           shuffle
           (take 2)))
    :effect
    (fn [info herd [dreamer] _ skill]
      [info
       (core/update-individual
        herd
        dreamer
        #(update % :passions conj skill))])
    :text-fn
    (fn [_ __ [dreamer] _]
      (->> [(:name dreamer) "wonders about their purpose."
            "Why do they exist?"
            "Indeed, what do they exist *for*?"
            "They think of the things they like to do,"
            "and what drives the engine of their heart."
            "Certainly a life well-lived is lived for such things, no?"
            (:name dreamer) "tosses and turns in their sleep,"
            "visions of futures roiling in their dreams."
            "A life spent well, they ponder. A life spent well..."]
           (string/join " ")
           (constantly)))}
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

(s/def ::filter (s/keys :opt-un [::core/season
                                 ::terrain
                                 ::core/stores]))
(s/def ::filter-fn
  (s/fspec :args (s/cat :info ::core/info
                        :herd ::core/herd)
           :ret boolean?))
(s/def ::marshal-fn
  (s/fspec
   :args (s/cat :info ::core/info
                :herd ::core/herd
                :cast ::core/individuals)))
(s/def :event/effect
  (s/fspec :args (s/cat :info ::core/info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?)
           :ret (s/tuple ::core/info ::core/herd)))
(s/def :dream/effect
  (s/fspec :args (s/cat :info ::core/info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?
                        :choice any?)
           :ret (s/tuple ::core/info ::core/herd)))
(s/def ::choices-fn
  (s/fspec :args (s/cat :info ::core/info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?)
           :ret any?))
(s/def :event/text-fn
  (s/fspec :args (s/cat :info ::core/info
                        :herd ::core/herd
                        :cast ::core/individuals
                        :marshalled any?)
           :ret string?))
(s/def :dream/text-fn
  (s/fspec :args (s/cat :info ::core/info
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
                     :event/text-fn]
            :opt-un [::filter
                     ::marshal-fn
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
            (core/find-character herd character-select))))))

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
         (if-let [cast (core/get-cast herd dream)]
           (if-let [choices-fn (:choices-fn dream)]
             (< 0 (count (choices-fn info herd cast)))
             true)
           true))))

(defn enact-event
  [info herd {:keys [name marshal-fn effect text-fn] :as event}]
  (let [characters (core/get-cast herd event)
        marshalled (when marshal-fn
                     (marshal-fn info herd))
        text (text-fn info herd characters marshalled)
        [info herd] (effect info herd characters marshalled)]
    [(assoc info :event name)
     herd
     text]))

(s/fdef enact-event
  :args (s/cat :info ::core/info
               :herd ::core/herd
               :event ::event)
  :ret (s/tuple ::core/info ::core/herd string?))

(defn get-dream-choices
  [info herd dream character]
  ((:choices-fn dream) info herd character))

(defn enact-dream
  [info herd dream cast marshalled choice]
  ((:effect dream) info herd cast marshalled choice))