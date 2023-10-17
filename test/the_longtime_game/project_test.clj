(ns the-longtime-game.project-test
  (:require [clojure.spec.alpha :as s]
            [clojure.test :refer [deftest]]
            [clojure.test.check.clojure-test :refer [defspec]]
            [clojure.test.check.properties :as props]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.test-util :as util]
            [clojure.test.check.generators :as g]))

(deftest spec-tests
  (util/spec-test-syms
   [`project/can-enact?
    `project/gains-experience?
    `project/distribute-experience
    `project/inc-fulfillment
    `project/update-individual-fulfillment
    `project/distribute-fulfillment]))

(defspec test-enact-project 20
  (props/for-all
   [herd (s/gen ::core/herd)]
   (let [project (g/generate
                  (g/such-that
                   (fn [project]
                     (project/can-enact? herd project))
                   (g/elements project/projects)))]
     (s/valid? ::core/herd
               (project/enact-project herd project)))))
