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

(defn wrap-options
  [header options & {:keys [prefix prefix-h footer]
                     :or {prefix-h "┌"
                          prefix "├─"
                          footer "└────"}}]
  (let [lines
        (concat [(string/join " " [prefix-h header])]
                (map
                 (fn [option]
                   (string/join " " [prefix option]))
                 options)
                [footer])]
    (string/join "\n" lines)))

(defn handle-read-line
  [s & [predicates {}]]
  (let [words (string/split s #" ")
        predicate (-> words
                      first
                      string/trim
                      string/lower-case)
        int-choice (try
                     (Integer/parseInt predicate)
                     (catch Exception _ nil))
        args (rest words)]
    (cond
      int-choice int-choice
      (contains? predicates predicate)
      (apply (-> predicate keyword predicates) args)
      :else
      nil)))

(defn prompt-text
  [& {:keys [prefix forbidden error]
      :or {prefix "<"
           forbidden []
           error "That answer is not allowed."}}]
  (print (str prefix " "))
  (let [s (read-line)
        x (handle-read-line s)]
    (cond
      (contains? forbidden x)
      (println (quote-text error))
      :else x)))

(defn select-from-options
  [prompt options & {:keys [may-cancel?]
                     :or {may-cancel? false}}]
  (let [options* (map #(string/join ". " [(inc %1) %2])
                      (range (count options))
                      options)]
    (println (wrap-options prompt options*)))
  (let [answer (prompt-text)]
    (cond
      (and (int? answer)
           (< answer (count options)))
      (nth options (dec answer))
      (and may-cancel?
           (= answer "cancel"))
      nil
      :else
      (select-from-options prompt options :may-cancel? may-cancel?))))

(defn select-in-range
  [prompt n]
  (println (quote-text prompt :prefix "!"))
  (let [answer (prompt-text)]
    (if (and (int? answer)
             (<= answer n))
      answer
      (select-in-range prompt n))))

(defn await-confirmation
  ([]
   (await-confirmation "Press enter to proceed."))
  ([prompt]
   (println (quote-text prompt :prefix "!"))
   (read-line)))

