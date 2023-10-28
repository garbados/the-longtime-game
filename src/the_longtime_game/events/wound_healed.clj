(ns the-longtime-game.events.wound-healed 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def event
  {:name "Wound healed"
   :select [{:traits #{:wounded}} {:skills {:medicine 3 :craftwork 3}}]
   :filter {:stores {:poultices 5 :tools 5}}
   :effect
   (fn [info herd [hurtcow healcow] _]
     [info
      (-> herd
          (core/update-individual
           hurtcow
           #(update % :traits disj :wounded))
          (core/update-individual
           healcow
           #(update % :fulfillment + 10)))])
   :text-fn
   (fn [_info _herd [sadcow healcow] & _]
     (string/join
      " "
      ["Disability is produced by inaccessibility."
       "An order which excludes by design, limits its own potential."
       "Such an order can prevail even silently,"
       "as though no such barrier could exist."
       "They must be rooted out," (:name healcow) "knows."
       "Accommodations call for quality of craft and heartful vision."
       "Some wounds never really heal, mental or physical,"
       "but we can make the changes we need,"
       "as long as we devote the effort and expertise."
       "Only in so doing can we live up to our values."
       (:name sadcow) "offers a small thanks,"
       "but their eyes go to the horizon,"
       "the world open to them unfettered."]))})