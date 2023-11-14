(ns the-longtime-game.text 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]))

(def default-width 80)

(defn normalize-name
  [x]
  (cond
    (keyword? x)     (name x)
    (and (number? x)
         (< 0 x 1))  (str (int (* 100 (float x))) "%")
    (string? x)      x
    :else            (str x)))

(s/fdef normalize-name
  :args (s/cat :x any?)
  :ret string?)

(defn match-prefix
  [l & {:keys [mid-char end-char]
        :or {mid-char "├"
             end-char "└"}}]
  (concat
   (map (constantly mid-char)
        (range (dec (count l))))
   [end-char]))

(s/fdef match-prefix
  :args (s/cat :l (s/coll-of any?))
  :ret (s/coll-of string?))

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

(defn quote-sections
  [sections & {:keys [prefix]
               :or {prefix ">"}}]
  (string/join
   (str "\n" prefix "\n")
   (for [section sections]
     (string/join
      "\n"
      (for [line section]
        (str prefix " " line))))))

(s/fdef quote-sections
  :args (s/cat :sections (s/coll-of (s/coll-of string?)))
  :ret string?)

(defn quote-text
  [s & {:keys [prefix width]
        :or {prefix ">"
             width default-width}}]
  (let [width* (- width (count prefix))
        sections (map
                  #(wrap-text % width*)
                  (collect-text s))]
    (quote-sections sections :prefix prefix)))

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

(defn wrap-quote-sections
  [sections & {:keys [prefix header footer]
               :or {header "┌────"
                    prefix "│"
                    footer "└────"}}]
  (let [text (quote-sections sections
                             :prefix prefix)]
    (string/join "\n" [header text footer])))

(s/fdef wrap-quote-sections
  :args (s/cat :sections (s/coll-of (s/coll-of string?)))
  :ret string?)

(defn wrap-options
  [header options & {:keys [prefix prefix-h footer]
                     :or {prefix-h "┌"
                          prefix "├─"
                          footer "└────"}}]
  (string/join
   "\n"
   (flatten
    [(str prefix-h " " header)
     (for [option options]
       (for [line (wrap-text (normalize-name option))]
         (string/join " " [prefix line])))
     footer])))

(s/fdef wrap-options
  :args (s/cat :header string?
               :options (s/coll-of any?)))

(defn match-section-prefixes
  [lines & {:keys [one-char first-char mid-char end-char]
            :or {one-char "─"
                 first-char "┬"
                 mid-char "│"
                 end-char "└"}}]
  (cond
    (= 1 (count lines))
    [one-char]
    (< 1 (count lines))
    (concat [first-char]
            (match-prefix (rest lines)
                          :mid-char mid-char
                          :end-char end-char))))

(defn wrap-section
  [s & {:keys [width one-char first-char mid-char end-char]
        :or {width default-width
             one-char "─"
             first-char "┬"
             mid-char "│"
             end-char "└"}}]
  (let [lines (wrap-text s width)
        prefixes (match-section-prefixes lines
                                         :one-char one-char
                                         :first-char first-char
                                         :mid-char mid-char
                                         :end-char end-char)]
    (string/join
     "\n"
     (for [[prefix line] (map vector prefixes lines)]
       (str prefix " " line)))))
