(ns the-longtime-game.events.depression 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def trait->adj
  {:angry      "strong"
   :kind       "loving"
   :attentive  "detailed"
   :mystical   "mysterious"
   :optimistic "hopeful"
   :poet       "eloquent"})

(def event
  {:name "Depression ends"
   :select [{:traits #{:depressed}} {:skills {:medicine 4}}]
   :effect
   (fn [info herd [sadcow healcow] & _]
     [info
      (-> herd
          (core/update-individual
           sadcow
           #(update % :traits disj :depressed))
          (core/update-individual
           healcow
           #(core/inc-fulfillment % 10)))])
   :text-fn
   (fn [_info _herd [sadcow healcow] & _]
     (let [therapy-adj
           (or (first (filter some? (map trait->adj (:traits healcow))))
               "thoughtful")]
       (string/join
        " "
        [(:name sadcow) "has been talking with" (:name healcow) "lately."
         "Much has troubled the former,"
         "about their life, their experiences, their place."
         "It has sabotaged their ability to feel joy; to feel at all."
         "What once fueled their passions has grown mundane and meaningless."
         "But" (:name healcow) "has had " therapy-adj "words for them,"
         "and open ears for them to speak and be heard."
         "In sitting with these words," (:name healcow)
         "has come to a new comprehension."
         "Habits and routines evolve, slowly but surely, to satisfy one's opaque needs."
         "A novel peace blossoms over the mind's rough terrain,"
         "and old devotions return like a dawn, ray by sunborn ray."
         "Thanks are insufficient. A gift is made, and refused, and shared."
         "\"No gift is necessary. We do this for each other,\" "
         (:name healcow) "asserts, \"Now and always.\""])))})
