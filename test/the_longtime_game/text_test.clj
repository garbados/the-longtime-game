(ns the-longtime-game.text-test 
  (:require [clojure.test :refer [deftest]]
            [the-longtime-game.test-util :as util]
            [the-longtime-game.text :as text]))

(deftest spec-tests
  (util/spec-test-syms
   [`text/join-text
    `text/collect-text
    `text/quote-text
    `text/wrap-text
    `text/wrap-quote-text
    `text/wrap-options]))
