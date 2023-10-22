(ns the-longtime-game.save
  (:require [the-longtime-game.core :as core]
            [the-longtime-game.event :as event]
            [clojure.spec.alpha :as s]
            [clojure.edn :as edn]))

(s/def ::game (s/keys :req-un [::core/herd
                               ::event/info]))

(defn save-game
  [game path]
  (spit path game))

(defn load-game
  [path]
  (edn/read-string (slurp path)))
