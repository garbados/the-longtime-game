(ns the-longtime-game.dreams.doubt
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def dream
  {:name "Doubt"
   :select [{:traits #{:depressed}}]
   :marshal-fn
   (fn [_info _herd [sadcow]]
     (rand-nth (vec (:passions sadcow))))
   :effect
   (fn [_info herd [sadcow] dispassion & _]
     (if dispassion
       (core/update-individual
        herd
        sadcow
        #(update % :passions disj dispassion))
       (core/update-individual
        herd
        sadcow
        #(core/inc-fulfillment % -5))))
   :text-fn
   (fn [_info _herd [sadcow] dispassion & _]
     (->> ["A spirit of dispassion seizes" (:name sadcow) "."
           "They have struggled to experience joy, to feel much at all."
           "It all seems so small, so... meaningless."
           "Familiar passions grow distant, indistinct;"
           "dissatisfying, most of all."
           "A job well-done seems never worth doing."
           (if dispassion
             (str (:name sadcow) " loses their love of " (name dispassion) ".")
             (str (:name sadcow) " finds their love of life wounded."))
           "They go on, a little more empty."]
          (string/join " ")))})
