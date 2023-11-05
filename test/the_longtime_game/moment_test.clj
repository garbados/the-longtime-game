(ns the-longtime-game.moment-test 
  (:require [clojure.spec.alpha :as s]
            [clojure.test :refer [deftest is testing]]
            [the-longtime-game.moment :as moment]
            [the-longtime-game.scene :as scene]
            [the-longtime-game.test-util :as util]))

(deftest test-valid-moments
  (testing "Moments conform to scene spec."
    (doseq [scene moment/moment-scenes]
      (is (s/valid? ::scene/scene scene)
          (s/explain-str ::scene/scene scene)))))

(deftest spec-tests
  (util/spec-test-syms
   [`moment/gen-moments]))
