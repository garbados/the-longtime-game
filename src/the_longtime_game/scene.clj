(ns the-longtime-game.scene 
  (:require [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [the-longtime-game.select :as select]))

(s/def ::name string?)
(s/def ::description string?)
(s/def ::detail string?)

(s/def ::fn-args
  (s/cat :info ::core/info
         :herd ::core/herd
         :individuals ::core/individuals
         :* (s/* any?)))

(s/def ::filter-fn
  (s/fspec :args (s/cat :info ::core/info
                        :herd ::core/herd)
           :ret boolean?))

(s/def ::text-fn
  (s/fspec :args ::fn-args
           :ret string?))

(s/def ::marshal-fn
  (s/fspec :args ::fn-args
           :ret any?))

(s/def ::effect
  (s/fspec :args ::fn-args
           :ret ::core/herd))

(s/def ::selects (s/coll-of ::select/select))

(s/def ::scene
  (s/keys :req-un [::text-fn]
          :opt-un [::name
                   ::description
                   ::detail
                   ::select/filter
                   ::selects
                   ::marshal-fn
                   ::filter-fn
                   ::effect]))

(defn scene-may-occur?
  [info herd {:keys [filter selects filter-fn]}]
  (and (if filter
         (select/passes-filter? herd filter)
         true)
       (if selects
         (select/get-cast herd selects)
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
                   effect (constantly herd)}}]
  (let [individuals (select/get-cast herd selects)
        args (marshal-fn info herd individuals)]
    [(partial text-fn info herd individuals args)
     (partial effect info herd individuals args)]))

(s/fdef marshal-scene
  :args (s/cat :info ::core/info
               :herd ::core/herd
               :scene ::scene)
  :ret (s/tuple
        (s/fspec :args (s/cat)
                 :ret string?)
        (s/fspec :args (s/cat)
                 :ret ::core/herd)))
