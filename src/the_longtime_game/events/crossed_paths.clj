(ns the-longtime-game.events.crossed-paths 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def event
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
   (fn [_info herd [orgcow] & _]
     (let [other-herd-name (rand-nth core/herd-names)]
       (string/join
        " "
        ["It takes a fair bit of planning for herds to safely cross paths,"
         "as" (:name orgcow) "well knows."
         "Their coming and going changes the land;"
         "delicate landscapes turn quickly to stamped mush."
         "So today they pass nearby, and a festival is held between."
         "Apples and haysweets, honored effigies, music and dancing;"
         "A mutual celebration of life!"
         "The next morning," (:name orgcow) "clasps their counterpart's hand."
         "Perhaps" (:name herd) "and" other-herd-name
         "will meet again in their lifetimes."
         "Perhaps they will only know each other once more"
         "in the folds of eternity."])))})
