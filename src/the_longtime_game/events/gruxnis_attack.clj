(ns the-longtime-game.events.gruxnis-attack 
  (:require [the-longtime-game.core :as core]))

(def event
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
   (constantly "TODO")})
