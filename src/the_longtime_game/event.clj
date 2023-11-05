(ns the-longtime-game.event
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [the-longtime-game.core :as core]
            [the-longtime-game.event-text :as event-text]
            [the-longtime-game.scene :as scene]
            [the-longtime-game.select :as select]))

(def crossed-paths
  {:name "Crossed Paths"
   :selects [{:skills {:organizing 3}}]
   :text-fn event-text/crossed-paths
   :marshal-fn
   (fn [_ herd & _]
     (let [n (int (* 1/8 (count (:individuals herd))))]
       (reduce
        (fn [all resource]
          (assoc all resource (rand-int n)))
        {}
        (take (rand-int (count core/carryable))
              (vec core/carryable)))))
   :effect
   (fn [info herd _ gift]
     [info
      (-> herd
          (update :stores (partial merge-with +) gift)
          (core/update-individuals #(core/inc-fulfillment % 5)))])})

(def depression-ends
  {:name "Depression Ends"
   :selects [{:traits :depressed} {:skills {:medicine 4}}]
   :text-fn event-text/depression-ends
   :effect
   (fn [info herd [sadcow healcow] & _]
     [info
      (-> herd
          (core/update-individual
           sadcow
           #(update % :traits disj :depressed))
          (core/update-individual
           healcow
           #(core/inc-fulfillment % 10)))])})

(def fire!
  {:name "Fire!"
   :text-fn event-text/fire!
   :selects [{:traits :weary}]
   :filter-fn
   (fn [_ herd]
     (let [location (core/current-location herd)]
       (pos-int? (count (:infra location)))))
   :marshal-fn
   (fn [_ herd & _]
     (when-let [infra (seq (:infra (core/current-location herd)))]
       (rand-nth infra)))
   :effect
   (fn [info herd [individual] infra]
     [info
      (-> herd
          (core/update-current-location update :infra disj infra)
          (core/update-individual
           individual
           #(update % :traits disj :weary)))])})

(def gruxnis-attack!
  {:name "Grux'nis attack"
   :text-fn event-text/gruxnis-attack!
   :selects [{} {:skills {:medicine 4 :athletics 4}}]
   :effect
   (fn [info herd [victim ibba] & _]
     [info
      (-> herd
          (core/update-individual
           victim
           #(update % :traits conj :wounded))
          (core/update-individual
           ibba
           #(-> %
                (update-in [:skills :medicine] inc)
                (update-in [:skills :athletics] inc))))])})

(def journeying-ends
  {:name "Journeying Ends"
   :text-fn event-text/journeying-ends
   :filter-fn
   (fn [info _]
     (> (count (:new-adults info)) 0))})

(def offshoot-joins
  {:name "Offshoot Joins"
   :text-fn event-text/offshoot-joins
   :filter-fn
   (fn [info _]
     (> (count (:new-adults info)) 4))})

(def plague
  {:name "Plague!"
   :text-fn event-text/plague
   :selects [{}]
   :marshal-fn
   (fn [_ herd & _]
     (let [population (count (:individuals herd))]
       (and (core/herd-has-resource? herd :poultices (* 1/3 population))
            (core/herd-has-skill? herd :medicine (* 1/4 population)))))
   :effect
   (fn [info herd [individual] passed?]
     (if passed?
       [info
        (update-in herd [:stores :poultices] (comp int *) 2/3)]
       (core/perish info herd individual)))})

(def ration-rot
  {:name "Ration Rot"
   :text-fn event-text/ration-rot
   :marshal-fn
   (fn [_ herd & _]
     (first (select/find-individuals herd {:skills {:medicine 3}})))
   :effect
   (fn [info herd _ sanitarian]
     [info
      (if sanitarian
        (update-in herd [:stores :rations] (comp int *) 2/3)
        (-> herd
            (update-in [:stores :rations] (comp int *) 1/2)
            (update :individuals
                    (fn [individuals]
                      (vec
                       (for [individual individuals]
                         (core/inc-fulfillment individual -5)))))))])})

(def wound-healed
  {:name "Wound Healed"
   :text-fn event-text/wound-healed
   :selects [{:traits :wounded} {:skills {:medicine 3 :craftwork 3}}]
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
           #(update % :fulfillment + 10)))])})

(def critical-events
  [depression-ends
   fire!
   gruxnis-attack!
   ration-rot
   plague
   wound-healed])

(def general-events
  [journeying-ends
   offshoot-joins
   crossed-paths])

(s/def ::event
  (s/with-gen
    ::scene/scene
    #(g/elements
      (concat critical-events
              general-events))))

(defn pick-event
  [info herd]
  (let [event-may-occur? (partial scene/scene-may-occur? info herd)
        event (or (and (= 0 (rand-int 2))
                       (first (shuffle (filter event-may-occur? critical-events))))
                  (first (shuffle (filter event-may-occur? general-events))))]
    (when event
      (concat [(:name event)] (scene/marshal-scene info herd event)))))

(s/fdef pick-event
  :args (s/cat :info ::core/info
               :herd ::core/herd)
  :ret (s/nilable (s/tuple string? ifn? ifn?)))

(comment
  "Event ideas..."
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
  {:name "Fallen in love"})
