(ns the-longtime-game.core-test
  (:require [clojure.test :refer [deftest]]
            [the-longtime-game.core :as core]
            [the-longtime-game.test-util :as util]))

(deftest spec-tests
  (util/spec-test-syms
   [`core/gen-name
    `core/inc-some-skill
    `core/gen-baby
    `core/gen-adult
    `core/gen-individual
    `core/gen-individuals ; slow
    `core/syndicate-name
    `core/calculate-vote
    `core/tally-votes
    `core/rank-candidates
    `core/select-candidate
    `core/add-syndicate
    `core/remove-syndicate
    `core/init-location
    `core/gen-herd
    `core/current-location
    `core/birth-chance
    `core/death-chance
    `core/died?
    `core/local-infra?
    `core/get-season
    `core/individual-skill
    `core/collective-skill
    `core/collective-labor
    `core/carry-limit
    `core/keep-and-leave-behind
    `core/aggregate-store
    `core/apply-herd-upkeep
    `core/map-locations
    `core/has-lost?
    `core/next-location
    `core/crop-info
    `core/update-nutrients
    `core/enter-spring
    `core/enter-summer
    `core/enter-fall
    `core/enter-winter
    `core/inc-month
    `core/gains-experience?
    `core/inc-fulfillment
    `core/update-individual-fulfillment
    `core/pre-month
    `core/post-month]))
