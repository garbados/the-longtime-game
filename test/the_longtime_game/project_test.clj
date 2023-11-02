(ns the-longtime-game.project-test
  (:require [clojure.spec.alpha :as s]
            [clojure.test :refer [deftest is testing]]
            [clojure.test.check.clojure-test :refer [defspec]]
            [clojure.test.check.generators :as g]
            [clojure.test.check.properties :as props]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.test-util :as util]))

(deftest validate-projects
  (testing "Projects conform to spec"
    (doseq [p project/projects]
      (is
       (s/valid? ::project/project p)
       (s/explain-str ::project/project p)))))

(deftest spec-tests
  (util/spec-test-syms
   [`project/distribute-experience
    `project/distribute-fulfillment
    `project/can-enact?]))

(defspec test-enact-project 20
  (props/for-all
   [herd (s/gen ::core/herd)]
   (g/let [project (g/such-that
                    (fn [project]
                      (project/can-enact? herd project))
                    (s/gen ::project/project))]
     (and
      (is (s/valid? ::core/herd
                    (project/enact-project herd project)))
      (is (s/valid? ::core/herd
                    (project/do-project herd project)))))))
