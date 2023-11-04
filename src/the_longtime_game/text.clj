(ns the-longtime-game.text 
  (:require [clojure.string :as string]))

(def default-width 80)

(defn join-text
  [& s]
  (->> (string/join " " s)
       string/split-lines
       (map string/trim)
       (filter #(pos-int? (count %)))
       (string/join " ")))

(defn collect-text
  [s]
  (for [p (string/split s #"\n\n")]
    (->> (string/split-lines p)
         (map string/trim)
         (filter (comp pos-int? count))
         (string/join "\n"))))

(defn wrap-text
  ([s]
   (wrap-text s default-width))
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
  [s & {:keys [prefix width]
        :or {prefix ">"
             width default-width}}]
  (let [width* (- width (count prefix))
        sections (map
                  #(wrap-text % width*)
                  (collect-text s))]
    (string/join
     (str "\n" prefix "\n")
     (for [section sections]
       (string/join
        "\n"
        (for [line section]
          (str prefix " " line)))))))

(defn wrap-quote-text
  [s & {:keys [prefix header footer width]
        :or {header "┌────"
             prefix "│"
             footer "└────"
             width default-width}}]
  (let [text (quote-text s
                         :prefix prefix
                         :width width)]
    (string/join "\n" [header text footer])))

(defn wrap-options
  [header options & {:keys [prefix prefix-h footer]
                     :or {prefix-h "┌"
                          prefix "├─"
                          footer "└────"}}]
  (let [lines
        (concat [(string/join " " [prefix-h header])]
                (map
                 (fn [option]
                   (let [option*
                         (if (keyword? option)
                           (name option)
                           option)]
                     (string/join " " [prefix option*])))
                 options)
                [footer])]
    (string/join "\n" lines)))
