(ns the-longtime-game.core-test
  (:require [clojure.spec.alpha :as s]
            [clojure.test :refer [deftest is testing]]
            [clojure.test.check.clojure-test :refer [defspec]]
            [clojure.test.check.properties :as props]
            [the-longtime-game.core :as core]
            [the-longtime-game.test-util :as util]))

(deftest spec-tests
  (util/spec-test-syms
   [`core/add-syndicate
    `core/age-individual
    `core/age-individuals
    `core/aggregate-store
    `core/apply-herd-upkeep
    `core/assoc-location
    `core/becomes-passionate?
    `core/begin-month
    `core/birth-chance
    `core/calculate-vote
    `core/carry-limit
    `core/collective-labor
    `core/collective-skill
    `core/consolidate-stores
    `core/consume-nutrition
    `core/count-infra
    `core/crop-info
    `core/current-location
    `core/death-chance
    `core/enter-fall
    `core/enter-spring
    `core/enter-summer
    `core/enter-winter
    `core/gains-experience?
    `core/gen-adult
    `core/gen-baby
    `core/gen-herd
    `core/gen-individual
    `core/gen-individuals
    `core/gen-name
    `core/get-age
    `core/get-next-contact
    `core/get-season
    `core/has-lost?
    `core/herd-has-resource?
    `core/herd-has-skill?
    `core/herd-has-nutrition?
    `core/inc-atomic-reactors
    `core/inc-fulfillment
    `core/end-month
    `core/inc-passion-skill
    `core/inc-season
    `core/inc-some-skill
    `core/individual-skill
    `core/init-location
    `core/keep-and-leave-behind
    `core/local-infra?
    `core/map-locations
    `core/must-leave-some?
    `core/new-contact?
    `core/next-location
    `core/perish
    `core/plains-enters-summer
    `core/port-cove-giftright
    `core/rank-candidates
    `core/remove-syndicate
    `core/select-candidate
    `core/shift-population
    `core/should-add-syndicate?
    `core/syndicate-name
    `core/tally-votes
    `core/update-current-location
    `core/update-individual
    `core/update-individual-fulfillment
    `core/update-individuals
    `core/update-nutrients]))

(deftest test-stable-population-growth
  (let [herd (core/gen-herd)
        optimal (core/calc-optimal-population herd)
        herd*
        (reduce
         (fn [herd _]
           (let [[journeyings deaths] (core/shift-population herd)
                 [new-adults new-dead] (core/calc-pop-changes herd journeyings deaths)]
             (core/apply-pop-changes herd new-adults new-dead)))
         herd
         (range 100))]
    (is (> (* 3/2 optimal)
           (count (:individuals herd*))
           (* 1/2 optimal)))))

(deftest test-inc-max-skill
  (testing "Skills should not change when inc'd if all skills are maxed."
    (let [skills (reduce
                  (fn [all skill]
                    (assoc all skill core/max-skill))
                  {}
                  core/skills)
          {skills* :skills} (core/inc-some-skill {:skills skills})]
      (is (= skills skills*)))))

(deftest test-all-contacts
  (testing "get-next-contact should get all contacts eventually."
    (let [herd (core/gen-herd)
          herd*
          (reduce
           (fn [herd _]
             (update herd :contacts conj (core/get-next-contact herd)))
           herd
           (range (count core/contacts)))]
      (is (= (count (:contacts herd*)) (count core/contacts))))))

(deftest test-locations-across-seasons
  (testing "Terrain across the seasons."
    (let [herd
          (reduce
           (fn [herd _]
             (let [old-season (core/get-season herd)]
               (-> (update herd :month inc)
                   (core/inc-season old-season))))
           (assoc (core/gen-herd) :path [(vec (map core/init-location core/terrains))])
           (range 12))]
      (is (s/valid? ::core/herd herd)))))

(deftest test-plains-enters-summer
  (testing "Plains enters summer safely."
    (let [location (core/init-location :plains)]
      (testing "Field is fallow"
        (let [location*
              (->> (core/update-nutrients core/nutrients 1 location)
                   core/plains-enters-summer)]
          (is (every? #(= 2 %) (map second (select-keys location* (seq core/nutrients)))))))
      (testing "Crop is ready for harvest."
        (let [location*
              (core/plains-enters-summer
               (assoc location :crop :grapplewheat))]
          (is (true? (:ready? location*)))))
      (testing "Crop stays wild."
        (let [location*
              (core/plains-enters-summer
               (assoc location
                      :crop :grapplewheat
                      :wild? true))]
          (is (true? (:wild? location*))))))))

(deftest test-port-cove-giftright
  (testing "Location should accrue interest."
    (let [stores
          (reduce
           (fn [stores [resource amount]]
             (assoc stores resource amount))
           {}
           (map vector core/resources (repeatedly (constantly 100))))
          stores*
          (-> (core/init-location :jungle)
              (update :infra conj :port-cove)
              (assoc :stores stores)
              (core/port-cove-giftright)
              :stores)]
      (doseq [[resource amount] stores
              :let [amount* (get stores* resource)]]
        (is (> amount* amount))))))
