(ns the-longtime-game.web
  (:require [clojure.edn :as edn]
            [reagent.core :as r]
            [reagent.dom :as rd]
            [the-longtime-game.core :as core]
            [the-longtime-game.meta-text :refer [intro-text]]
            [pouchdb]))

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

(defn delete-doc [id]
  (-> (.get db id)
      (.then #(.remove db %))))

(defn save-game []
  (save-doc @game @herd))

(defn load-game [name]
  (reset! game name)
  (reset! herd (fetch-doc name))
  (reset! state :playing))

(defn new-game [name]
  (reset! herd (core/gen-herd))
  (reset! game name)
  (save-game)
  (find-games)
  (reset! state :playing))

(defn setup []
  (.then (find-games)
         #(let [n (count @games)]
            (cond
              (zero? n) (reset! state :new-game)
              (= 1 n)   (load-game (first @games))
              :else     (reset! state :list-games)))))

(defn delete-game [name]
  (-> (delete-doc name)
      (.then #(when (= @game name)
                (reset! game nil)
                (reset! herd nil)))
      (.then find-games)
      (.then #(if (zero? (count @games))
                (reset! state :new-game)
                (reset! state :list-games)))))

(defn- prompt-text [value on-submit]
  [:input.input
   {:type "text"
    :value @value
    :on-change #(reset! value (-> % .-target .-value))
    :on-key-down
    (fn [e]
      (when (= 13 (.-which e))
        (on-submit @value)))}])

(defn- init-new-game []
  (let [value (r/atom "")]
    [:div
     [:div.content
      [:p intro-text]]
     [:div.field
      [:label.label "What shall the herd call you?"]
      [:div.control
       [prompt-text value new-game]]]]))

(defn- list-games []
  [:div
   [:p "Select a game to play:"]
   [:ul
    (for [game @games]
      ^{:key game}
      [:li
       [:button.button.is-text
        {:on-click #(load-game game)}
        (str game)]
       [:button.button.is-text
        {:on-click #(delete-game game)}
        "Delete!"]])]])

(defn- loading []
  (setup)
  [:h1 "Loading..."])

(defn- navbar []
  [:div.level
   [:div.level-left
    [:div.level-item
     [:h1.title "The Longtime"]]
    (when (pos-int? (count @games))
      [:div.level-item
       [:button.button.is-link
        {:on-click #(reset! state :new-game)}
        "New Game"]])
    (when (some? @herd)
      [:div.level-item
       [:button.button.is-link
        {:on-click #(reset! state :playing)}
        "Play Game"]])
    (when (pos-int? (count @games))
      [:div.level-item
       [:button.button.is-link
        {:on-click #(reset! state :list-games)}
        "List Games"]])]
   [:div.level-right
    [:div.level-item
     [:a.button.is-link
      {:href "https://github.com/garbados/the-longtime-game"
       :target "_blank"}
      "Source"]]
    [:div.level-item
     [:p.subtitle
      [:strong "A game by "
       [:a {:href "https://www.patreon.com/garbados"
            :target "_blank"}
        "DFB"]]]]]])

(defn- app []
  [:section.section>div.container
   [navbar]
   [:hr]
   [:div.block
    (case @state
      :loading    [loading]
      :new-game   [init-new-game]
      :list-games [list-games]
      :playing    [:p "Here we go!!!"])]])

(rd/render [app] (js/document.getElementById "app"))
