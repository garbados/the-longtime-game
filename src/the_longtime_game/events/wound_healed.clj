(ns the-longtime-game.events.wound-healed 
  (:require [the-longtime-game.core :as core]))

(def event
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
   (constantly "TODO")})