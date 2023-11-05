(ns the-longtime-game.scene 
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [the-longtime-game.core :as core]
            [the-longtime-game.select :as select]))

(s/def ::name string?)
(s/def ::description string?)
(s/def ::detail string?)
(s/def ::filter-fn ifn?)
(s/def ::text-fn ifn?)
(s/def ::marshal-fn ifn?)
(s/def ::effect ifn?)
(s/def ::selects (s/coll-of ::select/select :max-count 5))

(s/def ::scene
  (s/with-gen
    (s/keys :req-un [::text-fn]
            :opt-un [::name
                     ::description
                     ::detail
                     ::select/filter
                     ::selects
                     ::marshal-fn
                     ::filter-fn
                     ::effect])
    #(g/return {:name "hello"
                :description "world"
                :detail "wow"
                :filter {}
                :selects [{}]
                :text-fn (fn [& _] "OK")
                :marshal-fn (fn [& _] nil)
                :filter-fn (fn [& _] true)
                :effect (fn [& _] nil)})))

(defn scene-may-occur?
  [info herd {:keys [filter selects filter-fn]}]
  (and (if filter
         (select/passes-filter? herd filter)
         true)
       (if selects
         (some? (select/get-cast herd selects))
         true)
       (if filter-fn
         (filter-fn info herd)
         true)))

(s/fdef scene-may-occur?
  :args (s/cat :info ::core/info
               :herd ::core/herd
               :scene ::scene)
  :ret boolean?)

(defn marshal-scene
  "Scene that may occur, prepares to occur."
  [info herd {:keys [selects marshal-fn text-fn effect]
              :or {selects []
                   marshal-fn (constantly nil)
                   text-fn (constantly nil)
                   effect (constantly [info herd])}}]
  (let [individuals (select/get-cast herd selects)
        args (marshal-fn info herd individuals)]
    [(partial text-fn info herd individuals args)
     (partial effect info herd individuals args)]))

(s/fdef marshal-scene
  :args (s/cat :info ::core/info
               :herd ::core/herd
               :scene ::scene)
  :ret (s/tuple ifn? ifn?))
