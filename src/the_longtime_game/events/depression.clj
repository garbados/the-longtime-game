(ns the-longtime-game.events.depression 
  (:require [the-longtime-game.core :as core]))

(def event
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
   (constantly "TODO")})
