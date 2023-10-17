(ns the-longtime-game.event
  (:require [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [clojure.test.check.generators :as g]))

(s/def ::select (s/coll-of ::core/traits))

(s/def ::event
  (s/keys :req-un [::core/name
                   ::filter
                   ::select
                   ::text-fn
                   ::core/effect
                   ::core/location-effect]))