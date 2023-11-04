(ns the-longtime-game.select-test
  (:require [the-longtime-game.select :as select]
            [clojure.test :refer [deftest]]
            [the-longtime-game.test-util :as util]))

(deftest spec-tests
  (util/spec-test-syms
   [`select/passes-filter?
    `select/passes-select?
    `select/find-individuals
    `select/get-cast]))
