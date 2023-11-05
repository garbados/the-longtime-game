(ns the-longtime-game.scene-test
  (:require [clojure.test :refer [deftest]]
            [the-longtime-game.scene :as scene]
            [the-longtime-game.test-util :as util]))

(deftest spec-tests
  (util/spec-test-syms
   [`scene/marshal-scene
    `scene/scene-may-occur?]))
