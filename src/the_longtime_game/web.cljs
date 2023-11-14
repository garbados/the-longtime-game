(ns the-longtime-game.web
  (:require [cljs.core.async :refer [go]]
            [cljs.core.async.interop :refer-macros [<p!]]
            [pouchdb]
            ["react" :as react]
            [reagent.core :as r]
            [reagent.dom :as rd]
            [the-longtime-game.core :as core]
            [clojure.edn :as edn]))

(defonce db (.default pouchdb "longtime"))
(defonce state (r/atom :loading))
(defonce games (r/atom []))
(defonce game (r/atom nil))
(defonce herd (r/atom nil))

(defn find-games []
  (.then
   (.allDocs db)
   (fn [result]
     (reset! games (vec (map #(.-id %) (.-rows result)))))))

(defn save-doc [id value]
  (.put db (js-obj "_id" id
                   "value" (pr-str value))))

(defn fetch-doc [id]
  (.then (.get db id)
         (fn [doc]
           (edn/read-string (.-value doc)))))

(defn save-game []
  (save-doc @game @herd))

(defn load-game [name]
  (reset! game name)
  (reset! herd (fetch-doc name)))

(defn new-game [name]
  (reset! herd (core/gen-herd))
  (reset! game name)
  (save-game))

(defn prompt-text [value on-submit]
  [:input.input
   {:type "text"
    :value @value
    :on-change #(reset! value (-> % .-target .-value))
    :on-key-down
    (fn [e]
      (when (= 13 (.-which e))
        (on-submit @value)))}])

(defn enter-your-name []
  (let [name (r/atom "")]
    [:div.field
     [:label.label "Enter your name:"]
     [:div.control [prompt-text name new-game]]]))

(defn- app []
  [:section.section>div.container
   [:h1.title "The Longtime"]
   [:p.subtitle "A game by DFB"]
   (case @state
     :loading
     (do
       (.then (find-games)
              #(let [n (count @games)]
                 (cond
                   (zero? n) (reset! state :new-game)
                   (= 1 n)   (.then (load-game (first @games))
                                    (fn [& _]
                                      (reset! state :playing)))
                   :else     (reset! state :list-games))))
       [:h1 "Loading..."])
     :new-game
     [enter-your-name]
     :list-games
     [:div
      [:p "I found some existing saves. Would you like to play one?"]
      [:ul
       (for [game @games]
         ^{:key game}
         [:li
          [:button.button
           {:on-click #(load-game game)}
           game]])]]
     :playing
     [:p "Here we go!!!"])])

(rd/render [app] (js/document.getElementById "app"))
