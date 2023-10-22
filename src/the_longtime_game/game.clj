(ns the-longtime-game.game
  (:require [the-longtime-game.core :as core]
            [the-longtime-game.event :as event]
            [the-longtime-game.repl :as repl]
            [clojure.spec.alpha :as s]
            [clojure.edn :as edn]))

(s/def ::game (s/keys :req-un [::core/herd
                               ::event/info]))

(defn save-path
  [path]
  (str "save_" path ".edn"))

(defn save-game
  [game path]
  (spit (save-path path) game))

(defn load-game
  [path]
  (edn/read-string (slurp (save-path path))))

(defn new-game
  []
  (println (repl/wrap-quote-text
            "Are you there, some long time of peace and plenty?
             Hard winters and bare summers have weakened our ways
             and scattered our herd.
             Only a few dozen of us remain now to walk
             the ancient path.
             I believe in us, you must understand!
             I believe in old age and young laughter,
             of the strength in all that we might share.
             I dream of homes among the stars,
             of a long time for me, for us all.
             Are you out there, Longtime?
             I believe in you."
            :width 50))
  (let [spirit (repl/await-text "Name yourself, Longtime!"
                                :default "Longtime")
        herd (core/gen-herd)
        game {:info (event/fresh-info)
              :herd herd}]
    (println
     (repl/wrap-quote-text
      (str "A new thread of fate is woven in the name of " spirit "!")
      :width 50))
    (save-game game spirit)
    (println
     (repl/quote-text
      (str "Game saved as " (save-path spirit))
      :prefix "?"))))