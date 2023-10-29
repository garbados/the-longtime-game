(ns the-longtime-game.events.journeying 
  (:require [clojure.string :as string]))

(def solo-journeying-event
  {:name "One prodigal return."
   :filter-fn
   (fn [info _herd]
     (> (count (:new-adults info)) 0))
   :effect
   (fn [info herd & _]
     [info herd])
   :text-fn
   (fn [info herd & _]
     (let [journeycow (first (:new-adults info))
           spent-time (rand-nth ["camping in the woods"
                                 "stampeding with another herd"
                                 "seeing distant lands"])]
       (->> [(:name journeycow) "has come in from their journey."
             "A year ago, they set out from this very herd, to live apart from it"
             "and understand the absence of its warmth."
             "The growing adult spent that time" spent-time
             "but admits, after many glasses of mulled wine,"
             "that" (:name herd) "has the greener grass underhoof."]
            (string/join " "))))})

(def many-journeying-event
  {:name "Offshoot joins a new tree."
   :filter-fn
   (fn [info _herd]
     (> (count (:new-adults info)) 4))
   :effect
   (fn [info herd & _]
     [info herd])
   :text-fn
   (fn [_info herd & _]
     (let [reason (rand-nth ["followed the trail"
                             "augured the stars"
                             "stumbled half-starved"])]
       (string/join
        " "
        ["Herds crumble to bits. Scared and hungry people factionalize."
         "Even vast herds can splinter into bands of half a dozen,"
         "a flood of hooves that disappears like a ripple across the continent."
         "A fair few today have found" (:name herd) "and committed to its Longtime."
         "They have" reason "to the herd's embrace."
         "With fire and wine, the many dance and celebrate."
         "May this plenitude persist!"
         "May their faith be true."])))})