(ns the-longtime-game.events.fire 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

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
            (core/update-individual
             individual
             #(update % :traits disj :weary)))]))
   :text-fn
   (fn [_info _herd [eepycow] infra]
     (string/join
      " "
      [(:name eepycow) "awakens with a start from a frightening dream."
       "A great fire spirit slipped from their exhausted limbs"
       "and swept about the earthen-thatch dwelling."
       "It is not easy for fire to catch that moist matter;"
       "the spirit must have been motivated."
       "In the waking world," (:name eepycow) "witnesses the conflagration"
       "bake the hovel around them."
       "They rush out as the smoke thickens, and coughing they watch it spread."
       "A water brigade forms while sparks spread from roof to roof."
       "Most of the camp is saved, but the" (name infra)
       "emerges little more than ash and ruin."
       (:name eepycow) "finds the tipped-over oil lamp that started it all,"
       "that must still have been burning when they fell asleep."
       "They have been so tired lately, something deep in their bones dragging them down."
       "Perhaps it was that spirit, they wonder."
       "Perhaps now it is gone."
       "A lightness enters their step; a burden, flown away."]))})
