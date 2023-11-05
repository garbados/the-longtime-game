(ns the-longtime-game.text 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]))

(def default-width 80)

(defn join-text
  [& s]
  (->> (string/join " " s)
       string/split-lines
       (map string/trim)
       (filter #(pos-int? (count %)))
       (string/join " ")))

(s/fdef join-text
  :args (s/cat :s string?
               :* (s/* string?))
  :ret string?
  :fn (fn [{:keys [ret]}]
        (nil? (re-find #"\n" ret))))

(defn collect-text
  [s]
  (for [p (string/split s #"\n\n")]
    (->> (string/split-lines p)
         (map string/trim)
         (filter (comp pos-int? count))
         (string/join "\n"))))

(s/fdef collect-text
  :args (s/cat :s string?)
  :ret (s/coll-of string?))

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

(s/fdef wrap-text
  :args (s/or
         :default (s/cat :s string?)
         :custom (s/cat :s string?
                        :width pos-int?))
  :ret (s/coll-of string?))

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

(s/fdef quote-text
  :args (s/cat :s string?)
  :ret string?)

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

(s/fdef wrap-quote-text
  :args (s/cat :s string?)
  :ret string?)

(defn wrap-options
  [header options & {:keys [prefix prefix-h footer]
                     :or {prefix-h "┌"
                          prefix "├─"
                          footer "└────"}}]
  (string/join
   "\n"
   (concat [(string/join " " [prefix-h header])]
           (for [option options]
             (string/join
              " "
              [prefix
               (cond
                 (keyword? option) (name option)
                 (string? option) option
                 :else (str option))]))
           [footer])))

(s/fdef wrap-options
  :args (s/cat :header string?
               :options (s/coll-of any?)))
