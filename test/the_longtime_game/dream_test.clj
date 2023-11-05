(ns the-longtime-game.dream-test 
  (:require [clojure.test :refer [deftest]]
            [the-longtime-game.test-util :as util]
            [the-longtime-game.dream :as dream]))

(deftest spec-tests
  (util/spec-test-syms
   [`dream/marshal-dream
    `dream/pick-dream]))
