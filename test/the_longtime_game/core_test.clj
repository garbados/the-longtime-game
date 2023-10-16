(ns the-longtime-game.core-test
  (:require [clojure.test :refer [deftest is testing]]
            [clojure.spec.test.alpha :as stest]
            [the-longtime-game.core :as core]))

(deftest spec-tests
  (doseq [sym [`core/gen-name
               `core/inc-some-skill
               `core/gen-individual
               `core/gen-individuals
               `core/syndicate-name
               `core/calculate-vote
               `core/tally-votes
               `core/rank-candidates
               `core/select-candidate
               `core/add-syndicate
               `core/remove-syndicate
               `core/init-location
               `core/gen-herd
               `core/death-chance
               `core/died?
               `core/local-infra?
               `core/get-season
               `core/collective-skill
               `core/collective-labor
               `core/apply-herd-upkeep
               `core/map-locations
               `core/has-lost?
               `core/next-location
               `core/can-enact?
               ; `core/enact-project ; TODO test manually
               ]]
    (testing (str sym)
      (println (str "Testing: " sym))
      (let [{:keys [failure]}
            (-> sym stest/check first stest/abbrev-result)]
        (is (nil? failure) failure)))))
