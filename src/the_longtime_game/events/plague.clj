(ns the-longtime-game.events.plague 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def event
  {:name "Plague"
   :select [{}]
   :marshal-fn
   (fn [_ herd]
     (let [population (count (:individuals herd))]
       (and (core/herd-has-resource? herd :poultices (* 1/3 population))
            (core/herd-has-skill? herd :medicine (* 1/4 population)))))
   :effect
   (fn [info herd [individual] passed?]
     (if passed?
       [info
        (update-in herd [:stores :poultices] (comp int *) 2/3)]
       (core/perish info herd individual)))
   :text-fn
   (fn [_ __ [individual] passed?]
     (string/join
      " "
      (if passed?
        ["An ill wind seizes the people."
         "Many fall sick; healers leap into action."
         "They draw from plentiful reserves"
         "of medicines and expertise,"
         "preserving the lives of those afflicted."
         "Slowly but surely, they recover,"
         "returning to the daily business of the herd"
         "bit by bit, gently, day by day."
         "A season of loss, averted!"]
        ["An ill wind seizes the people."
         "Many fall sick; healers leap into action,"
         "though they are too little. Too late."
         (:name individual) "is not strong enough."
         "For want of experts and remedies,"
         "they perish in simmering agony."
         "With hollow, shallow breath, last words slip out."
         "\"Live on,\" they beg, \"For me. For everyone.\""])))})
