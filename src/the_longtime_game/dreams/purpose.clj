(ns the-longtime-game.dreams.purpose 
  (:require [clojure.set :refer [difference]]
            [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def dream
  {:name "Purpose"
   :select [{:max-passions 2}]
   :choices-fn
   (fn [_info _herd [dreamer] _]
     (->> (:passions dreamer)
          (difference core/skills)
          vec
          shuffle
          (take 2)))
   :effect
   (fn [_info herd [dreamer] _ skill]
     (core/update-individual
      herd
      dreamer
      #(update % :passions conj skill)))
   :text-fn
   (fn [_ __ [dreamer] _]
     (->> [(:name dreamer) "wonders about their purpose."
           "Why do they exist?"
           "Indeed, what do they exist *for*?"
           "They think of the things they like to do,"
           "and what drives the engine of their heart."
           "Certainly a life well-lived is lived for such things, no?"
           (:name dreamer) "tosses and turns in their sleep,"
           "visions of futures roiling in their dreams."
           "A life spent well, they ponder. A life spent well..."]
          (string/join " ")))})
