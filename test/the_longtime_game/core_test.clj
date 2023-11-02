(ns the-longtime-game.core-test
  (:require [clojure.spec.alpha :as s]
            [clojure.test :refer [deftest]]
            [clojure.test.check.clojure-test :refer [defspec]]
            [clojure.test.check.properties :as props]
            [the-longtime-game.core :as core]
            [the-longtime-game.test-util :as util]))

(deftest spec-tests
  (util/spec-test-syms
   [`core/gen-name
    `core/inc-some-skill
    `core/get-age
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
    `core/gen-herd ; slow
    `core/current-location
    `core/birth-chance
    `core/death-chance
    `core/has-died?
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

;; FIXME: stable population growth
#_(defspec test-stable-population-growth 20
  (props/for-all
   [herd (s/gen ::core/herd)]
   (let [births (core/birth-chance herd)
         died? (filter (partial core/has-died? herd)
                       (:individuals herd))
         remove-dead
         (partial remove
                  (partial contains? (set died?)))
         newborns (for [_ (range births)]
                    (core/gen-baby (:month herd)))]
     (println [(-> herd :individuals count)
               (->
                (->> (:individuals herd)
                     (map
                      (partial core/get-age herd))
                     (reduce +))
                (/ (-> herd :individuals count))
                int)
               (count died?)
               births])
     (-> herd
         core/inc-month
         (update :individuals remove-dead)
         (update :individuals concat newborns)))))