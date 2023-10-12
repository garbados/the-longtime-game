(ns the-longtime-game.test-util
  (:require [clojure.test :refer [is testing]]
            [clojure.spec.test.alpha :as stest]))

(def opts {:clojure.spec.test.check/opts {:num-tests 10}})

(defn spec-test-syms
  [syms]
  (doseq [sym syms]
    (testing (str sym)
      (println (str "Testing: " sym))
      (let [{:keys [failure] :as check}
            (->> (stest/check sym opts)
                 (map stest/abbrev-result)
                 (filter :failure)
                 first)]
        (is (nil? failure) check)))))
