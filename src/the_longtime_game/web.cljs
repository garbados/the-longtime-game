(ns the-longtime-game.web
  (:require [clojure.edn :as edn]
            [clojure.string :as string]
            [pouchdb]
            [reagent.core :as r]
            [reagent.dom :as rd]
            [the-longtime-game.core :as core]
            [the-longtime-game.meta-text :refer [intro-text tutorial-text]]
            [the-longtime-game.building :as building]
            [the-longtime-game.project :as project]))

(defonce db (.default pouchdb "longtime"))
(defonce state (r/atom :loading))
(defonce games (r/atom []))
(defonce game (r/atom nil))
(defonce herd (r/atom nil))
(defonce gamestate (r/atom :intro))

(defn- find-games []
  (.then (.allDocs db)
         (fn [rows]
           (reset! games (vec (map #(.-id %) (.-rows rows)))))))

(defn- save-doc [id value]
  (.put db (js-obj "_id" id
                   "value" (pr-str value))))

(defn- fetch-doc [id]
  (.then (.get db id)
         (fn [doc]
           (edn/read-string (.-value doc)))))

(defn- delete-doc [id]
  (-> (.get db id)
      (.then #(.remove db %))))

(defn- save-game []
  (save-doc @game @herd))

(defn- load-game [name]
  (reset! game name)
  (.then (fetch-doc name)
         (fn [herd*]
           (reset! herd herd*)
           (reset! state :playing))))

(defn- new-game [name]
  (reset! herd (core/gen-herd :spirit name))
  (reset! game name)
  (save-game)
  (find-games)
  (reset! state :playing))

(defn- setup []
  (.then (find-games)
         #(let [n (count @games)]
            (cond
              (zero? n) (reset! state :new-game)
              (= 1 n)   (load-game (first @games))
              :else     (reset! state :list-games)))))

(defn- delete-game [name]
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
     [:div.box
      [:div.content
       [:h3 intro-text]]]
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
       [:button.button.is-primary
        {:on-click #(reset! state :new-game)}
        "New Game"]])
    (when (pos-int? (count @games))
      [:div.level-item
       [:button.button.is-link
        {:on-click #(reset! state :list-games)}
        "List Games"]])
    (when (some? @herd)
      [:div.level-item
       [:button.button.is-info
        {:on-click #(do (reset! state :playing)
                        (reset! gamestate :playing))}
        "Play Game"]])
    (when (some? @herd)
      (for [state* [:intro :projects :individuals]
            :let [name* (-> state* name string/capitalize)]]
        ^{:key state*}
        [:div.level-item
         [:button.button.is-info
          {:on-click #(reset! gamestate state*)}
          name*]]))]
   [:div.level-right
    [:div.level-item
     [:a.button.is-info.is-light
      {:href "https://github.com/garbados/the-longtime-game"
       :target "_blank"}
      "Source"]]
    [:div.level-item
     [:p.subtitle
      [:strong "A game by "
       [:a {:href "https://www.patreon.com/garbados"
            :target "_blank"}
        "DFB"]]]]]])

(defn- print-location [location]
  (let [strings
        (filter
         some?
         [(when (pos-int? (:power location))
            (str "Power: " (:power location)))
          (when (some? (:flora location))
            (str "Flora: " (:flora location)))
          (when (some? (:depleted? location))
            (str "Depleted? " (:depleted? location)))
          (when (= :plains (:terrain location))
            (str "Nutrients: "
                 (string/join
                  ", "
                  (map (fn [nutrient]
                         (string/join
                          " "
                          [(-> nutrient
                               name
                               string/capitalize)
                           (get location nutrient)]))
                       [:n :k :p]))))
          (when (some? (:crop location))
            (str "Crop: " (name (:crop location))))
          (when (some? (:ready? location))
            (str "Ready? " (:ready? location)))
          (when (some? (:wild? location))
            (str "Wild? " (:wild? location)))
          (when-let [infra (seq (:infra location))]
            (str "Infra: "
                 (->> infra
                      (map building/building->name)
                      sort
                      (string/join ", "))))])]
    [:li
     [:span (str "Location: " (:name location))]
     [:ul
      (for [s strings]
        ^{:key s} [:li s])]]))

(defn- print-location-brief [location]
  (let [infra (seq (map building/building->name (:infra location)))]
    [:li (str (:name location) (if infra (str ": " (string/join ", " infra)) ""))]))

(defn- print-herd []
  (let [{:keys [individuals syndicates spirit month
                hunger sickness stores path]
         :as herd*}
        @herd
        population (count individuals)]
    [:div.box
     [:div.content
      [:h3 (:name herd*)]
      [:h5 (str "Shepherded by the " spirit)]
      [:ul
       [:li (let [month (inc (rem month 12))
                  year (inc (int (/ month 12)))
                  season (core/int->season (core/get-season herd*))]
              (str "Year " year ", month " month " (" season ")"))]
       [:li (str "Population: " population)]
       [:li (str "Syndicates: " (string/join ", " (sort (map core/syndicate-name syndicates))))]
       [:li (let [need (core/calc-food-need population)
                  ok? (core/herd-has-nutrition? herd* need)
                  ! (if ok? "" "!")]
              (str "Hunger: " hunger " (-" need ! ")"))]
       [:li (let [need (core/calc-meds-need population)
                  ok? (>= (get-in herd [:stores :poultices] 0) need)
                  value (str (int (* (/ sickness population) 100)) "%")
                  ! (if ok? "" "!")]
              (str "Sickness: " value " (-" need ! ")"))]
       [:li (let [fulfillments (map :fulfillment individuals)
                  average (/ (reduce + 0 fulfillments) population)
                  minimum (reduce min fulfillments)
                  maximum (reduce max fulfillments)]
              (str "Fulfillment: "
                   "avg " (int average) "%; "
                   "min " minimum "%; "
                   "max " maximum "%"))]
       [:li
        [:span "Skills:"]
        (let [skills (->> core/skills
                          (map
                           (fn [skill]
                             [skill (core/collective-skill herd skill)]))
                          sort)]
          [:table.table
           [:thead
            [:tr
             (for [[skill _] skills]
               ^{:key skill} [:th (-> skill name string/capitalize)])]]
           [:tbody
            [:tr
             (for [[skill amount] skills]
               ^{:key skill} [:td amount])]]])]
       [:li
        [:span "Stores:"]
        (let [stores* (sort (seq stores))]
          [:table.table
           [:thead
            [:tr
             (for [[resource _] stores*]
               ^{:key resource} [:th (-> resource name string/capitalize)])]]
           [:tbody
            [:tr
             (for [[resource amount] stores*]
               ^{:key resource} [:td amount])]]])]
       [print-location (core/current-location herd*)]
       [:li
        [:span "Next Stage:"
         [:ul
          (for [location (sort-by :name (second path))]
            ^{:key (:terrain location)} [print-location-brief location])]]]]]]))

(defn- intro []
  [:div.box>div.content
   (let [lines (string/split-lines (tutorial-text @herd))]
     (for [i (range (count lines))
           :let [line (nth lines i)]]
       ^{:key i} [:p line]))])

(defn- wiki-projects []
  [:div.box>div.content
   [:h3 "Projects"]
   (for [project (sort-by :name project/projects)]
     ^{:key (:name project)}
     [:div.box
      [:p [:strong (:name project)]]
      [:p
       [:span (:description project)]
       [:em (str " " (:detail project))]]])])

(defn- app []
  [:section.section
   [navbar]
   [:hr]
   [:div.block
    (case @state
      :loading    [loading]
      :new-game   [init-new-game]
      :list-games [list-games]
      :playing    [:div.columns
                   [:div.column.is-half-desktop
                    [print-herd]]
                   [:div.column.is-half-desktop
                    (case @gamestate
                      :intro [intro]
                      :projects [wiki-projects]
                      :individuals [:p "TODO"]
                      :playing [:p "TODO"])]])]])

(rd/render [app] (js/document.getElementById "app"))
