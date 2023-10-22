(ns the-longtime-game.repl
  (:require [the-longtime-game.core :as core]
            [the-longtime-game.project :as project]
            [the-longtime-game.event :as event]
            [clojure.string :as string]))

(defn collect-text
  [s]
  (vec
   (for [p (string/split s #"\n\n")]
     (string/join
      "\n\n"
      (for [line (string/split p #"\n")
            :let [trimmed (string/trim line)]
            :when (< 0 (count trimmed))]
        trimmed)))))

(defn wrap-text
  ([s]
   (wrap-text s 80))
  ([s width]
   (map
    #(string/join " " %)
    (reduce
     (fn [lines line]
       (reduce
        (fn [segment word]
          (let [line (last segment)
                line* (string/join " " (concat line [word]))
                line-width (count line*)]
            (if (> line-width width)
              (conj segment [word])
              (conj (pop segment)
                    (conj line word)))))
        lines
        (string/split line #" ")))
     [[]]
     (string/split-lines s)))))

(defn quote-text
  [s & {:keys [prefix width raw?]
        :or {prefix ">"
             width 80
             raw? false}}]
  (let [width* (- width (count prefix))
        sections (map
                  #(wrap-text % width*)
                  (if raw? [s] (collect-text s)))
        lines (string/join
               (str "\n" prefix "\n")
               (for [section sections]
                 (string/join
                  "\n"
                  (for [line section]
                    (string/join " " [prefix line])))))]
    lines))

(defn wrap-quote-text
  [s & {:keys [prefix header footer width raw?]
        :or {header "┌────"
             prefix "│"
             footer "└────"}}]
  (string/join "\n" [header
                     (quote-text s
                                 :prefix prefix
                                 :width width
                                 :raw? raw?)
                     footer]))