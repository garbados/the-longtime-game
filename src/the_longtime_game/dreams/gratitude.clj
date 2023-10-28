(ns the-longtime-game.dreams.gratitude 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def dream
  {:name "Gratitude"
   :select [{:min-fulfillment 70}]
   :effect
   (fn [_info herd [happycow] & _]
     (cond
       (-> happycow :traits :depressed)
       (core/update-individual herd happycow
                               #(update % :traits disj :depressed))
       (-> happycow :traits :weary)
       (core/update-individual herd happycow
                               #(update % :traits disj :weary))
       :else
       (update herd :individuals
               (fn [individuals]
                 (vec
                  (map #(core/inc-fulfillment % 2)
                       individuals))))))
   :text-fn
   (fn [& _]
     (string/join
      " "
      ["Oh Longtime. I have been so happy lately."
       "I find joy in my efforts. They have meaning; the labor I exert matters."
       "I laugh with friends over sunsets and grass-apples."
       "There is color in the world. Rainbows so rich one might sup of them as wine."
       "I feel at home here. Among these people. In this way."
       "Thank you, Longtime."
       "I pray you will grant us continued fortune."]))})