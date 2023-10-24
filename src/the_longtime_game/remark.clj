(ns the-longtime-game.remark 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def general-remarks
  ["Wild reeds sway on a river's edge."])

(def spring-remarks
  ["Blossoms fly gold and yellow in the verdant breeze."])

(def summer-remarks
  ["Cloudless skies span wide above the herd."])

(def fall-remarks
  ["A cool and cloudy day envelops the land."])

(def winter-remarks
  ["Snow gathers on the wind, beating against fur and fabric."])

(def season->remarks
  [spring-remarks
   summer-remarks
   fall-remarks
   winter-remarks])

(def plains-remarks
  ["Old willows sway on green hills, deep roots thick with seasons."])

(def forest-remarks
  ["Fungus-circles enchant the deep wood with mysterious patterns."])

(def mountain-remarks
  ["Stone faces loom silent on a windless day."])

(def jungle-remarks
  ["Air thick with life buzzes and twitters."])

(def swamp-remarks
  ["A long-forgotten log of bog butter emerges from the fetid damp."])

(def steppe-remarks
  ["Struggling grasses sweep over the broad terrain."])

(def terrain->remarks
  {:plains plains-remarks
   :forest forest-remarks
   :mountain mountain-remarks
   :steppe steppe-remarks
   :swamp swamp-remarks
   :jungle jungle-remarks})

(defn remark-on-location
  [herd]
  (let [season (core/get-season herd)
        {terrain :terrain} (core/current-location herd)]
    (string/join
     " "
     [(rand-nth (season->remarks season))
      (rand-nth (terrain->remarks terrain))])))
