(ns the-longtime-game.core-test
  (:require [clojure.test :refer [deftest is testing]]
            [clojure.spec.test.alpha :as stest]
            [the-longtime-game.core :as core]))

(deftest spec-tests
  (doseq [sym [`core/gen-name
               `core/death-chance
               `core/syndicate-name
               `core/effective-skill]]
    (testing (str sym)
      (let [{:keys [failure]}
            (-> sym stest/check first stest/abbrev-result)]
        (is (nil? failure) [sym failure])))))
