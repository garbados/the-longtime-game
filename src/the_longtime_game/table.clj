(ns the-longtime-game.table 
  (:require [clojure.pprint :as pprint]
            [clojure.string :as string]))

(defn map->table [m]
  (let [ks (map name (keys m))]))

(defn table->str [& args]
  (binding [*out* (java.io.StringWriter.)]
    (apply pprint/print-table args)
    (-> (.toString *out*)
        (string/replace "|" "│")
        (string/replace "+" "┼")
        (string/replace "-" "─")
        (string/replace "│─" "├─")
        (string/replace "─│" "─┤"))))

(defn quote-table
  [s & {:keys [prefix]
        :or {prefix "│"}}]
  (string/join
   "\n"
   (for [line (string/split-lines s)
         :when (< 0 (count line))]
     (str prefix " " line))))

(defn make-table [headers rows]
  (let [header-lengths (map count headers)]
    (print )
    (doseq [length header-lengths])))