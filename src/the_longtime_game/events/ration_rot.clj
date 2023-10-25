(ns the-longtime-game.events.ration-rot 
  (:require [clojure.string :as string]))

(def event
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
       "That was never in doubt."]))})
