(ns the-longtime-game.event-test
  (:require [clojure.spec.alpha :as s]
            [clojure.test :refer [deftest is testing]]
            [the-longtime-game.event :as event]
            [the-longtime-game.test-util :as util]))

(deftest spec-tests
  (util/spec-test-syms
   [`event/pick-event]))

(deftest test-valid-events
  (testing "All events conform to spec."
    (doseq [event (concat event/critical-events
                          event/general-events)]
      (is (s/valid? ::event/event event)
          (s/explain-str ::event/event event)))))

