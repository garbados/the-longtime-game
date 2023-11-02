(ns the-longtime-game.events.ration-rot
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.select :as select]))

(def event
  {:name "Ration-rot"
   :marshal-fn
   (fn [_ herd & _]
     (first (select/find-individuals herd {:skills {:medicine 3}})))
   :effect
   (fn [info herd _ sanitarian]
     (if sanitarian
       [info
        (update-in herd [:stores :rations] (comp int *) 2/3)]
       [info
        (-> herd
            (update-in [:stores :rations] (comp int *) 1/2)
            (update :individuals
                    (fn [individuals]
                      (vec
                       (for [individual individuals]
                         (core/inc-fulfillment individual -5))))))]))
   :text-fn
   (fn [_ __ ___ sanitarian]
     (string/join
      " "
      (if sanitarian
        ["The wrong sort of bug got the scent of our stores,"
         "and they buggered right in there overnight."
         "What a mess."
         "But" (:name sanitarian) "spotted it right away."
         "First thing in the morning, they threw the lot in sacks"
         "and queued them for the pyre."
         "By then others were disinfecting the earthen-cellar"
         "with tenderfire and incense."
         "We've lost a fair few meals from the ordeal,"
         "but we'll live."
         "That was never in doubt."]
        ["The wrong sort of bug got the scent of our stores,"
         "and they buggered right in there overnight."
         "What a mess."
         "Novice medicinairs even distributed rations"
         "before we noticed what had happened."
         "The illness now spreading is only temporary,"
         "and never fatal. It's just pain and gas."
         "Still, the whole camp will smell"
         "like burnt grasshoppers"
         "all week,"
         "and a great many meals went to the pyre"
         "to stop the rot's spread."
         "But, we'll live."
         "That was never in doubt."])))})
