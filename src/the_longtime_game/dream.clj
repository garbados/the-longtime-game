(ns the-longtime-game.dream 
  (:require [clojure.set :refer [difference]]
            [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [the-longtime-game.core :as core]
            [the-longtime-game.dream-text :as dream-text]
            [the-longtime-game.scene :as scene]
            [the-longtime-game.select :as select]))

(def catharsis
  {:name "Catharsis"
   :text-fn dream-text/catharsis
   :selects [{:fulfillment [<= 30]}]
   :marshal-fn
   (fn [_herd [sadcow]]
     (-> sadcow :traits :depressed))
   :effect
   (fn [herd [sadcow] depressed?]
     (core/update-individual
      herd
      sadcow
      (if depressed?
        #(-> %
             (update :traits conj :depressed)
             (core/inc-fulfillment 20))
        #(core/inc-fulfillment % 5))))})

(def doubt
  {:name "Doubt"
   :text-fn dream-text/doubt
   :selects [{:traits :depressed}]
   :marshal-fn
   (fn [_herd [sadcow]]
     (rand-nth (vec (:passions sadcow))))
   :effect
   (fn [herd [sadcow] dispassion & _]
     (if dispassion
       (core/update-individual
        herd
        sadcow
        #(update % :passions disj dispassion))
       (core/update-individual
        herd
        sadcow
        #(core/inc-fulfillment % -5))))})

(def gratitude
  {:name "Gratitude"
   :text-fn dream-text/gratitude
   :selects [{:fulfillment 70}]
   :effect
   (fn [herd [happycow] & _]
     (cond
       (-> happycow :traits :depressed)
       (core/update-individual herd happycow
                               #(update % :traits disj :depressed))
       (-> happycow :traits :weary)
       (core/update-individual herd happycow
                               #(update % :traits disj :weary))
       :else
       (update herd :individuals
               (fn [individuals]
                 (vec
                  (map #(core/inc-fulfillment % 2)
                       individuals))))))})

(def purpose
  {:name "Purpose"
   :text-fn dream-text/purpose
   :selects [{:max-passions 2}]
   :choices-fn
   (fn [_herd [dreamer] _]
     (->> (:passions dreamer)
          (difference core/skills)
          vec
          shuffle
          (take 2)))
   :effect
   (fn [herd [dreamer] _ skill]
     (core/update-individual
      herd
      dreamer
      #(update % :passions conj skill)))})

(def dreams
  [catharsis
   doubt
   gratitude
   purpose])

(s/def ::choices-fn ifn?)
(s/def ::post-text-fn ifn?)

(s/def ::dream
  (s/with-gen
    (s/and
     ::scene/scene
     (s/keys :req-un [::text-fn
                      ::choices-fn]
             :opt-un [::post-text-fn])
     #(pos-int? (count (:selects %))))
    #(g/elements dreams)))

(defn pick-dream
  [herd]
  (first
   (filter (partial scene/scene-may-occur? herd)
           (shuffle dreams))))

(s/fdef pick-dream
  :args (s/cat :herd ::core/herd)
  :ret ::dream)

(defn marshal-dream
  [herd {:keys [selects marshal-fn choices-fn text-fn post-text-fn effect]
         :or {post-text-fn (constantly nil)
              marshal-fn (constantly nil)
              text-fn (constantly nil)
              effect (constantly herd)}}]
  (let [individuals (select/get-cast herd selects)
        args (marshal-fn herd individuals)]
    [(choices-fn herd individuals args)
     (partial text-fn herd individuals args)
     #(post-text-fn %1 individuals args %2)
     (partial effect herd individuals args)]))

(s/fdef marshal-dream
  :args (s/cat :herd ::core/herd
               :dream ::dream)
  :ret (s/tuple
        (s/coll-of any?)
        ifn?
        ifn?
        ifn?))

(comment
  "Dream ideas..."
   {:name "Exhaustion"}
   {:name "Gratitude"
      :select [{}]
      :filter-fn
      (fn [_ herd]
        (< 70 (/ (reduce + (map :fulfillment (:individuals herd)))
                 (count (:individuals herd)))))}
   {:name "Grief"
      :select [{}]
      :filter-fn
      (fn [{:keys [deaths]} _]
        (< 0 (count deaths)))
      :marshal-fn
      (fn [{:keys [deaths]} _ _]
        (rand-nth deaths))}
   {:name "Joy"}
   {:name "Growth"})
