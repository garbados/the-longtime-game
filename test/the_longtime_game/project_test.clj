(ns the-longtime-game.project-test
  (:require [clojure.spec.alpha :as s]
            [clojure.test :refer [deftest is testing]]
            [clojure.test.check.clojure-test :refer [defspec]]
            [clojure.test.check.properties :as props]
            [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.test-util :as util]
            [clojure.test.check.generators :as g]))

(deftest validate-projects
  (testing "Projects conform to spec"
    (doseq [p project/projects]
      (is
       (s/valid? ::project/project p)
       (s/explain-str ::project/project p)))))

(deftest spec-tests
  (util/spec-test-syms
   [`project/gains-experience?
    `project/inc-fulfillment
    `project/update-individual-fulfillment]))

(defspec test-distribute-experience 20
  (props/for-all
   [herd (s/gen ::core/herd)
    project (g/elements project/projects)]
   (is (s/valid? ::core/herd (project/distribute-experience herd project)))))

(defspec test-distribute-fulfillment 20
  (props/for-all
   [herd (s/gen ::core/herd)
    project (g/elements project/projects)]
   (is (s/valid? ::core/herd (project/distribute-fulfillment herd project)))))

(defspec test-can-enact? 20
  (props/for-all
   [herd (s/gen ::core/herd)
    project (g/elements project/projects)]
   (is (s/valid? boolean? (project/can-enact? herd project)))))

(defspec test-enact-project 20
  (props/for-all
   [herd (s/gen ::core/herd)]
   (g/let [project (g/such-that
                    (fn [project]
                      (project/can-enact? herd project))
                    (g/elements project/projects))]
     (is (s/valid? ::core/herd
                   (project/enact-project herd project))))))
