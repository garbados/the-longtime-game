(ns the-longtime-game.core-test
  (:require [clojure.test :refer [deftest is testing]]
            [clojure.spec.test.alpha :as stest]
            [the-longtime-game.core :as core]))

(deftest spec-tests
  (doseq [sym [`core/gen-name
               `core/death-chance
               `core/syndicate-name
               `core/effective-skill
               `core/next-location
               `core/calculate-vote
               `core/tally-votes
               `core/rank-candidates
               `core/select-candidate
               `core/add-syndicate
               `core/remove-syndicate
               `core/inc-some-skill
               `core/gen-individual
               `core/gen-individuals
               `core/gen-herd
               ]]
    (testing (str sym)
      (let [{:keys [failure]}
            (-> sym stest/check first stest/abbrev-result)]
        (is (nil? failure) failure)))))
