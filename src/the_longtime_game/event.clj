(ns the-longtime-game.event
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [the-longtime-game.core :as core]
            [the-longtime-game.dreams.purpose :as purpose]
            [the-longtime-game.events.crossed-paths :as crossed-paths]
            [the-longtime-game.events.depression :as depression]
            [the-longtime-game.events.fire :as fire]
            [the-longtime-game.events.gruxnis-attack :as gruxnis-attack]
            [the-longtime-game.events.plague :as plague]
            [the-longtime-game.events.ration-rot :as ration-rot]
            [the-longtime-game.events.wound-healed :as wound-healed]))

(def events
  [plague/event
   ration-rot/event
   #_gruxnis-attack/event
   #_depression/event
   #_wound-healed/event
   #_crossed-paths/event
   #_fire/event
   #_{:name "Flash flood"
      :select [{:athletics 2}]
      :filter {:stores {:tools 10} :skills {:craftwork 10 :organizing 10}}
      :effect
      (fn [info herd [individual] _]
        [info
         (core/update-individual herd individual
                                 #(update % :traits conj :wounded))])
      :text-fn
      (constantly "TODO")}
   #_{:name "Public dispute"
      :select [{:min-passions 2} {:min-passions 2}]
      :effect
      (fn [info herd [fitecow1 fitecow2] _]
      ;; TODO
        [info herd])
      :text-fn
      (constantly "TODO")}
   #_{:name "Syndicate rivalry"}
   #_{:name "Catharsis"}
   #_{:name "Wound festers"}
   #_{:name "Head injury"}
   #_{:name "Syndicate induction"}
   #_{:name "Fallen in love"}])

(def dreams
  [purpose/dream
   #_{:name "Doubt"
    :select [{:traits #{:depressed}}]}
   #_{:name "Exhaustion"}
   #_{:name "Gratitude"
    :select [{}]
    :filter-fn
    (fn [_ herd]
      (< 70 (/ (reduce + (map :fulfillment (:individuals herd)))
               (count (:individuals herd)))))}
   #_{:name "Grief"
    :select [{}]
    :filter-fn
    (fn [{:keys [deaths]} _]
      (< 0 (count deaths)))
    :marshal-fn
    (fn [{:keys [deaths]} _ _]
      (rand-nth deaths))}
   #_{:name "Joy"}
   #_{:name "Growth"}])

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
             (if-let [marshal-fn (:marshal-fn dream)]
               (let [args (marshal-fn info herd cast)]
                 (< 0 (count (choices-fn info herd cast args))))
               (< 0 (count (choices-fn info herd cast nil))))
             true)
           true))))

(s/fdef can-dream-trigger?
  :args (s/cat :info ::core/info
               :herd ::core/herd
               :dream ::dream)
  :ret boolean?)

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
