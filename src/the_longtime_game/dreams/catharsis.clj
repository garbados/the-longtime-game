(ns the-longtime-game.dreams.catharsis
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def dream
  {:name "Catharsis"
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
                                #(core/inc-fulfillment % 5)))])
   :text-fn
   (fn [_info _herd [sadcow] depressed?]
     (string/join
      " "
      (if depressed?
        ["A bright morning finds" (:name sadcow) "buoyed by revelation."
         "They see now, some ineffable aspect of Creation, clear as day."
         "The world remains a grey and muted place, colored by depression,"
         "but what one understands, one fears perhaps less."
         "They go on, clinging to life."
         "\"I remember joy!\" they insist, \"I am a part of the joy of others.\""
         "Resolute, the minot presses on."]
        ["A bright morning finds" (:name sadcow) "buoyed by revelation."
         "They see now, some ineffable aspect of Creation, clear as day."
         "But as it settles into their bones, depression takes root."
         "The shadow of understanding approaches boredom,"
         "a psychic stagnation that mutes a vivid world."
         "What they have pondered seeps back, joyless."
         "Humbled, troubled, the minot presses on."])))})
