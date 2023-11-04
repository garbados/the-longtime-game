(ns the-longtime-game.dream 
  (:require [clojure.set :refer [difference]]
            [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [the-longtime-game.core :as core]
            [the-longtime-game.dream-text :as dream-text]
            [the-longtime-game.scene :as scene]))

(def catharsis
  {:name "Catharsis"
   :text-fn dream-text/catharsis
   :select [{:max-fulfillment 30}]
   :marshal-fn
   (fn [_info _herd [sadcow]]
     (-> sadcow :traits :depressed))
   :effect
   (fn [info herd [sadcow] depressed?]
     [info
      (if depressed?
        (core/update-individual herd sadcow
                                #(-> %
                                     (update :traits conj :depressed)
                                     (core/inc-fulfillment 20)))
        (core/update-individual herd sadcow
                                #(core/inc-fulfillment % 5)))])})

(def doubt
  {:name "Doubt"
   :text-fn dream-text/doubt
   :select [{:traits :depressed}]
   :marshal-fn
   (fn [_info _herd [sadcow]]
     (rand-nth (vec (:passions sadcow))))
   :effect
   (fn [_info herd [sadcow] dispassion & _]
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
   :select [{:min-fulfillment 70}]
   :effect
   (fn [_info herd [happycow] & _]
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
   :select [{:max-passions 2}]
   :choices-fn
   (fn [_info _herd [dreamer] _]
     (->> (:passions dreamer)
          (difference core/skills)
          vec
          shuffle
          (take 2)))
   :effect
   (fn [_info herd [dreamer] _ skill]
     (core/update-individual
      herd
      dreamer
      #(update % :passions conj skill)))})

(def dreams
  [catharsis
   doubt
   gratitude
   purpose])

(s/def ::choices-fn
  (s/fspec :args (s/cat :info ::core/info
                        :herd ::core/herd
                        :individuals ::core/individuals
                        :marshaled any?)
           :ret any?))

(s/def ::dream
  (s/with-gen
    (s/and
     ::scene/scene
     (s/keys :req-un [::scene/selects
                      ::choices-fn])
     #(pos-int? (count (:selects %))))
    #(g/elements dreams)))

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
