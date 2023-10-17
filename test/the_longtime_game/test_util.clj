(ns the-longtime-game.test-util
  (:require [clojure.test :refer [is testing]]
            [clojure.spec.test.alpha :as stest]))

(defn spec-test-syms
  [syms]
  (doseq [sym syms]
    (testing (str sym)
      (println (str "Testing: " sym))
      (let [{:keys [failure]}
            (->> (stest/check sym)
                 (map stest/abbrev-result)
                 (filter :failure)
                 first)]
        (is (nil? failure) failure)))))
