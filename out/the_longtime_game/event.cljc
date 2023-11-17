(ns the-longtime-game.event
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [the-longtime-game.core :as core]
            [the-longtime-game.event-text :as event-text]
            [the-longtime-game.scene :as scene]
            [the-longtime-game.select :as select]))

(def crossed-paths
  {:name "Crossed Paths"
   :selects [{:skills {:organizing 4}} {:skills {:organizing 3}}]
   :text-fn event-text/crossed-paths
   :marshal-fn
   (fn [_ herd & _]
     (let [n (int (* (/ 1 8) (count (:individuals herd))))]
       (reduce
        (fn [all resource]
          (assoc all resource (rand-int n)))
        {}
        (take (rand-int (count core/carryable))
              (vec core/carryable)))))
   :effect
   (fn [herd _ gift]
     (-> (update herd :stores (partial merge-with +) gift)
         (core/update-individuals #(core/inc-fulfillment % 5))))})

(def depression-ends
  {:name "Depression Ends"
   :selects [{:traits :depressed} {:skills {:medicine 4}}]
   :text-fn event-text/depression-ends
   :effect
   (fn [herd [sadcow healcow] & _]
     (-> herd
         (core/update-individual
          sadcow
          #(update % :traits disj :depressed))
         (core/update-individual
          healcow
          #(core/inc-fulfillment % 10))))})

(def fire!
  {:name "Fire!"
   :text-fn event-text/fire!
   :selects [{:traits :weary}]
   :filter-fn
   (fn [herd]
     (let [location (core/current-location herd)]
       (pos-int? (count (:infra location)))))
   :marshal-fn
   (fn [herd & _]
     (when-let [infra (seq (:infra (core/current-location herd)))]
       (rand-nth infra)))
   :effect
   (fn [herd [individual] infra]
     (-> herd
         (core/update-current-location update :infra disj infra)
         (core/update-individual
          individual
          #(update % :traits disj :weary))))})

(def funeral
  {:name "Funeral"
   :text-fn event-text/funeral
   :selects [{}]
   :filter-fn
   #(< 1 (count (:new-dead %)))
   :marshal-fn
   (fn [herd & _]
     (first (:new-dead herd)))
   :effect
   (fn [herd & _] herd)})

(def gruxnis-attack!
  {:name "Grux'nis attack"
   :text-fn event-text/gruxnis-attack!
   :selects [{} {:skills {:medicine 4 :athletics 4}}]
   :effect
   (fn [herd [victim ibba] & _]
     (-> herd
         (core/update-individual
          victim
          #(update % :traits conj :wounded))
         (core/update-individual
          ibba
          #(-> %
               (update-in [:skills :medicine] inc)
               (update-in [:skills :athletics] inc)))))})

(def journeying-ends
  {:name "Journeying Ends"
   :text-fn event-text/journeying-ends
   :filter-fn
   (fn [herd]
     (> (count (:new-adults herd)) 0))})

(def offshoot-joins
  {:name "Offshoot Joins"
   :text-fn event-text/offshoot-joins
   :filter-fn
   (fn [herd]
     (> (count (:new-adults herd)) 4))})

(def plague
  {:name "Plague!"
   :text-fn event-text/plague
   :selects [{}]
   :marshal-fn
   (fn [herd & _]
     (let [population (count (:individuals herd))]
       (and (core/herd-has-resource? herd :poultices (* (/ 1 3) population))
            (core/herd-has-skill? herd :medicine (* (/ 1 4) population)))))
   :effect
   (fn [herd [individual] passed?]
     (if passed?
       (update-in herd [:stores :poultices] (comp int *) (/ 2 3))
       (core/perish herd individual)))})

(def ration-rot
  {:name "Ration Rot"
   :text-fn event-text/ration-rot
   :filter {:stores {:rations 50}}
   :marshal-fn
   (fn [herd & _]
     (first (select/find-individuals herd {:skills {:medicine 3}})))
   :effect
   (fn [herd _ sanitarian]
     (if sanitarian
       (update-in herd [:stores :rations] (comp int *) (/ 2 3))
       (-> (update-in herd [:stores :rations] (comp int *) (/ 1 2))
           (core/update-individuals core/inc-fulfillment -5))))})

(def wound-healed
  {:name "Wound Healed"
   :text-fn event-text/wound-healed
   :selects [{:traits :wounded} {:skills {:medicine 3 :craftwork 3}}]
   :filter {:stores {:poultices 5 :tools 5}}
   :effect
   (fn [herd [hurtcow healcow] _]
     (-> herd
         (core/update-individual
          hurtcow
          #(update % :traits disj :wounded))
         (core/update-individual
          healcow
          #(update % :fulfillment + 10))))})

(def critical-events
  [depression-ends
   fire!
   gruxnis-attack!
   ration-rot
   plague
   wound-healed
   crossed-paths])

(def general-events
  [journeying-ends
   offshoot-joins
   funeral])

(s/def ::event
  (s/with-gen
    ::scene/scene
    #(g/elements
      (concat critical-events
              general-events))))

(defn pick-event
  [herd]
  (let [event-may-occur? (partial scene/scene-may-occur? herd)
        event (or (and (= 0 (rand-int 2))
                       (first (shuffle (filter event-may-occur? critical-events))))
                  (first (shuffle (filter event-may-occur? general-events))))]
    (when event
      (vec (concat [(:name event)] (scene/marshal-scene herd event))))))

(s/fdef pick-event
  :args (s/cat :herd ::core/herd)
  :ret (s/nilable (s/tuple string? ifn? ifn?)))

(comment
  "Event ideas..."
  {:name "Flash flood"
   :select [{:athletics 2}]
   :filter {:stores {:tools 10} :skills {:craftwork 10 :organizing 10}}
   :effect
   (fn [herd [individual] _]
     (core/update-individual herd individual
                             #(update % :traits conj :wounded)))
   :text-fn
   (constantly "TODO")}
  {:name "Public dispute"
   :select [{:min-passions 2} {:min-passions 2}]}
  {:name "Syndicate rivalry"}
  {:name "Catharsis"}
  {:name "Wound festers"}
  {:name "Head injury"}
  {:name "Syndicate induction"}
  {:name "Fallen in love"})
