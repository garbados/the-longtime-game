(ns the-longtime-game.events.crossed-paths 
  (:require [the-longtime-game.core :as core]))

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
   (constantly "TODO")})
