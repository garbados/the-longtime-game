(ns the-longtime-game.game
  (:gen-class)
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]
            [the-longtime-game.core :as core]
            [the-longtime-game.help :as help]
            [the-longtime-game.meta-text :as meta-text]
            [the-longtime-game.repl :as repl]
            [the-longtime-game.text :as text]))

(def save-path-re #"longtime_save_(.+)\.edn")

(defn save-path
  [path]
  (str "longtime_save_" path ".edn"))

(defn save-game
  [herd path]
  (spit (save-path path) herd))

(defn load-game
  [path]
  (edn/read-string (slurp (save-path path))))

(defn delete-game
  [path]
  (io/delete-file (save-path path)))

(defn end-game
  [{:keys [spirit]}]
  (println (text/wrap-quote-text meta-text/gameover-text))
  (delete-game spirit))

(defn new-game
  [& {:keys [forbidden]
      :or {forbidden #{}}}]
  (println (text/wrap-quote-text meta-text/intro-text :width text/default-width))
  (let [spirit (repl/await-text nil "What shall the herd call you?" :forbidden forbidden :default "Longtime")
        herd (core/gen-herd :spirit spirit)]
    (println
     (text/wrap-quote-text
      (str
       "A new thread of fate is woven in the name of the "
       spirit "!")
      :width 50))
    (save-game herd spirit)
    (println
     (text/quote-text
      (str "Game saved as " (save-path spirit))
      :prefix "?"))
    (println (help/introduction herd))
    (repl/await-confirmation herd)
    herd))

(defn prompt-for-game
  [saves]
  (let [new-game-s "[new game]"
        spirit (repl/select-from-options nil "Select a game to load" (cons new-game-s saves))]
    (if (= spirit new-game-s)
      (new-game :forbidden (set saves))
      (load-game spirit))))

(defn launch-game
  []
  (if-let [saves
           (->> (file-seq (io/file "."))
                (map #(re-matches save-path-re (.getName %)))
                (filter some?)
                (map second)
                seq)]
    (prompt-for-game saves)
    (new-game)))

(defn game-loop
  [{:keys [spirit] :as herd}]
  (reduce
   (fn [herd _]
     (if-let [herd* (repl/do-month herd)]
       (do
         (save-game herd* spirit)
         herd*)
       (do
         (end-game herd)
         (reduced nil))))
   herd
   (range)))

(defn -main [& _]
  (println help/credits)
  (game-loop (launch-game)))
