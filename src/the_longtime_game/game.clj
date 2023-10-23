(ns the-longtime-game.game
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]
            [clojure.spec.alpha :as s]
            [the-longtime-game.core :as core]
            [the-longtime-game.event :as event]
            [the-longtime-game.repl :as repl]))

(s/def ::game (s/keys :req-un [::core/herd
                               ::event/info
                               ::core/name]))

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
            "Are you there, some enduring era of peace and plenty?
             Hard winters and bare summers have weakened our ways
             and scattered our herd.
             Only a few dozen of us remain now to walk
             the ancient path.
             I believe in us, you must understand!
             I believe in old age and young laughter,
             of the strength in all that we might share.
             I dream of homes among the stars,
             of a long time for me, for us all.
             Are you out there?
             I believe in you.
             I pray to you:
             tell me your name."
            :width 50))
  (let [spirit (repl/await-text "What shall the herd call you?"
                                :default "Longtime")
        herd (core/gen-herd)
        game {:info (event/fresh-info)
              :herd herd
              :name spirit}]
    (println
     (repl/wrap-quote-text
      (str
       "A new thread of fate is woven in the name of the "
       spirit "!")
      :width 50))
    (save-game game spirit)
    (println
     (repl/quote-text
      (str "Game saved as " (save-path spirit))
      :prefix "?"))
    game))

(defn prompt-for-game
  [saves]
  (let [new-game-s "[new game]"
        spirit (repl/select-from-options
                "Select a game to load"
                (cons new-game-s saves))]
    (if (= spirit new-game-s)
      (new-game)
      (load-game spirit))))

(defn launch-game
  []
  (let [directory (io/file ".")
        saves
        (->> (file-seq directory)
             (map
              (fn [file]
                (re-matches
                 #"save_(.+)\.edn"
                 (.getName file))))
             (filter some?)
             (map second))]
    (if (seq saves)
      (prompt-for-game saves)
      (new-game))))
