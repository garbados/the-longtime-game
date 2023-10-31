(ns the-longtime-game.building 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.select :as select]))

(s/def ::name ::core/building)
(s/def ::description string?)
(s/def ::detail string?)
(s/def ::filter-fn
  (s/fspec :args (s/cat :herd ::core/herd)
           :ret boolean?))
(s/def ::text-fn
  (s/fspec :args (s/cat :herd ::core/herd)
           :ret string?))

(s/def ::building-info
  (s/keys :req-un [::name
                   ::description
                   ::detail]
          :opt-un [::core/uses
                   ::select/filter
                   ::filter-fn
                   ::text-fn]))

(def building->info
  (reduce
   (fn [all info]
     (assoc all (:name info) info))
   {}
   [{:name :atomic-reactor
     :description "A steam turbine powered by the heat of decaying isotopes."
     :detail "Produces energy each month."
     :uses [:geology]
     :filter
     {:skills {:geology 500 :craftwork 500}
      :stores {:stone 300 :metal 1000 :tools 500}}
     :filter-fn
     #(contains? (:contacts %) :rak)}
    {:name :chargepot-generator
     :description "A vat of chemicals that binds solar rays to unstable polymers."
     :detail "Produces energy each summer."
     :uses [:geology]
     :filter
     {:skills {:geology 200 :craftwork 200}
      :stores {:stone 200 :metal 200 :tools 100}}
     :filter-fn
     #(contains? (:contacts %) :felidar)}
    {:name :eldermothertree
     :description "A venerated oldgrowth, shaped and loved."
     :detail "Raises the forest's flora each winter."
     :uses [:herbalism]
     :filter
     {:skills {:herbalism 200 :craftwork 200}
      :stores {:wood 300 :rations 150 :poultices 100}}
     :filter-fn
     #(contains? (:contacts %) :er-sol)}
    {:name :flyer-market
     :description "A market for birds and friends of birds."
     :detail "Exchange resources in an orchestrated hierarchy."
     :uses [:organizing]
     :filter
     {:skills {:organizing 150 :craftwork 100}
      :stores {:wood 200 :stone 100 :tools 50}}
     :filter-fn
     #(contains? (:contacts %) :harp)}
    {:name :granary
     :description "An expansive earthen cellar, for storing perishables."
     :detail "Stores food and keeps it safe for your next visit."
     :uses [:herbalism]
     :filter
     {:stores {:wood 10 :stone 10 :tools 10}
      :skills {:herbalism 10 :craftwork 10}}}
    {:name :hospital}
    {:name :kitchen}
    {:name :lodge}
    {:name :mag-launchpad}
    {:name :monsoon-bellows}
    {:name :observatory}
    {:name :quern-generator}
    {:name :pluriversity}
    {:name :port-cove}
    {:name :quarry}
    {:name :stadium}
    {:name :stonetower-batteries}
    {:name :temple}
    {:name :wind-forge}
    {:name :workshop}]))

(defn building->name
  [building]
  (->> (string/split (name building) #"-")
       (map string/capitalize)
       (string/join " ")))

(s/fdef building->name
  :args (s/cat :building ::building)
  :ret string?)

(defn can-construct-building?
  [herd building]
  (let [{:keys [filter filter-fn]} (building->info building)]
    (and (if filter
           (select/passes-filter herd filter)
           true)
         (if filter-fn
           (filter-fn herd)
           true))))

(s/fdef can-construct-building?
  :args (s/cat :herd ::core/herd
               :building ::core/building)
  :ret boolean?)
