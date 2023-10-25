(ns the-longtime-game.events.fire 
  (:require [the-longtime-game.core :as core]))

(def event
  {:name "Fire"
   :select [{:traits #{:weary}}]
   :filter-fn
   (fn [_ herd]
     (let [location (core/current-location herd)]
       (pos? (count (:infra location)))))
   :marshal-fn
   (fn [_ herd _]
     (let [location (core/current-location herd)]
       (rand-nth (vec (:infra location)))))
   :effect
   (fn [info herd [individual] infra]
     (let [location (core/current-location herd)
           location* (update location :infra disj infra)]
       [info
        (-> herd
            (core/assoc-location location*)
            (core/update-individual individual
                                    #(update % :traits disj :weary)))]))
   :text-fn
   (constantly "TODO")})
