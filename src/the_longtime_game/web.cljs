(ns the-longtime-game.web
  (:require [cljs.core.async :refer [go]]
            [cljs.core.async.interop :refer-macros [<p!]]
            [pouchdb]
            [reagent.dom :as rd]
            [the-longtime-game.core :as core]))

(def db (.default pouchdb "longtime"))
(def game (atom nil))

(defn save-game [name]
  (.put db (assoc @game "_id" name)))

(defn load-game [name]
  (.get db name))

(defn new-game [name]
  (let [herd (core/gen-herd)]
    (swap! game herd)
    (save-game name)
    herd))

(defn- app []
  [:section.section>div.container
   [:h1.title "The Longtime"]
   [:p.subtitle "A game by DFB"]])

(rd/render [app] (js/document.getElementById "app"))

(comment
  (.log js/console react/Component)
  (.log js/console (str core/resources))
  (go
    (let [docs (<p! (.allDocs db))]
      (.log js/console docs))))

