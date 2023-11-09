(ns the-longtime-game.building 
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.select :as select]))

(s/def ::name ::core/building)
(s/def ::description string?)
(s/def ::detail string?)
(s/def ::uses
  (s/or :set ::core/uses
        :one core/skills))
(s/def ::filter-fn
  (s/fspec :args (s/cat :herd ::core/herd)
           :ret boolean?))
(s/def ::text-fn
  (s/fspec :args (s/cat :herd ::core/herd)
           :ret string?))

(s/def ::building-info
  (s/keys :req-un [::name
                   ::description
                   ::detail
                   ::select/filter]
          :opt-un [::uses
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
     :uses :geology
     :filter
     {:skills {:geology 500 :craftwork 500}
      :stores {:stone 300 :metal 1000 :tools 500}
      :contacts :rak}}
    {:name :chargepot-generator
     :description "A vat of chemicals that binds solar rays to unstable polymers."
     :detail "Produces energy each summer."
     :uses :geology
     :filter
     {:skills {:geology 200 :craftwork 200}
      :stores {:stone 200 :metal 200 :tools 100}
      :contacts :felidar}}
    {:name :eldermothertree
     :description "A venerated oldgrowth, shaped and loved."
     :detail "Raises the forest's flora each winter."
     :uses :herbalism
     :filter
     {:skills {:herbalism 200 :craftwork 200}
      :stores {:wood 300 :rations 150 :poultices 100}
      :contacts :er-sol}}
    {:name :flyer-market
     :description "A market for birds and friends of birds."
     :detail "Exchange resources in an orchestrated hierarchy."
     :uses :organizing
     :filter
     {:skills {:organizing 150 :craftwork 100}
      :stores {:wood 200 :stone 100 :tools 50}
      :contacts :harp}}
    {:name :granary
     :description "An expansive earthen cellar, for storing perishables."
     :detail "Stores food and keeps it safe for your next visit."
     :uses :herbalism
     :filter
     {:stores {:wood 10 :stone 10 :tools 10}
      :skills {:herbalism 10 :craftwork 10}}}
    {:name :hospital
     :description "A well-equipped house of healing."
     :detail "Improves the production of poultices."
     :uses :medicine
     :filter
     {:stores {:wood 10 :stone 10 :tools 10}
      :skills {:medicine 50 :craftwork 50}}}
    {:name :kitchen
     :description "A public commissary and gathering hall."
     :detail "Improves the production of rations."
     :uses :medicine
     :filter
     {:stores {:wood 10 :stone 10 :tools 10}
      :skills {:medicine 20 :craftwork 20}}}
    {:name :lodge
     :description "An earthen shrine, fit for passing spirits and critters."
     :detail "Safe homes become the dwelling places of strange allies."
     :uses :organizing
     :filter
     {:stores {:bone 20 :wood 20 :stone 20 :tools 20}}}
    {:name :mag-forge
     :description "Automated forge using electro-magnets to purify metals."
     :detail "Use power to smelt metal."
     :filter
     {:stores {:metal 500 :tools 500}
      :skills {:craftwork 700}}}
    {:name :mag-launchpad
     :description "A rail-acceleration system which launches a payload beyond the gravity well."
     :detail "Enables further development of space."
     :filter
     {:stores {:metal 1000 :tools 1000}
      :skills {:craftwork 1000}
      :contacts :dod}}
    {:name :monsoon-bellows
     :description "Articulated flumes to swallow the monsoon winds."
     :detail "Improves the smelting of metal with a Wind Forge."
     :filter
     {:stores {:bone 100 :stone 100 :tools 100}
      :skills {:craftwork 75}
      :terrain :jungle
      :infra :wind-forge}}
    {:name :observatory
     :description "A protected spire upon the mountain, fitted with looking-glass equipment."
     :detail "Improves the fulfillment of stargazing."
     :filter
     {:stores {:wood 10 :stone 10 :tools 10}
      :skills {:craftwork 50}
      :terrain :mountain}}
    {:name :quern-generator
     :description "A system of high-resistance rotary turbines, which volunteers turn to generate electricity."
     :detail "Turns time into power."
     :uses :geology
     :filter
     {:stores {:stone 350 :metal 200 :tools 100}
      :skills {:craftwork 150 :geology 100}}}
    {:name :pluriversity
     :description "A scholastic order's manorly home, devoted to the currying of expertise."
     :detail "Improves the rate of learning skills."
     :uses :organizing
     :filter
     {:stores {:wood 200 :stone 200 :tools 100}
      :skills {:craftwork 100 :organizing 100}
      :contacts :auter}}
    {:name :port-cove
     :description "A sculpted stone quay, a permanent harbor for sailing clans."
     :detail "Resources stored here will gain interest, as the clans practice giftright."
     :uses :organizing
     :filter
     {:stores {:wood 200 :stone 200 :tools 100}
      :skills {:craftwork 100 :organizing 100}
      :contacts :saurek}}
    {:name :quarry
     :description "A valley carved from earth and stone. A pit with a river-drain."
     :detail "Improves the gathering of stone."
     :uses :geology
     :filter
     {:stores {:wood 10 :stone 50 :tools 20}
      :skills {:craftwork 50 :geology 50}
      :terrain :mountain}}
    {:name :railways
     :description "A complex system of transport-tracks connecting a portion of the continent."
     :detail "Increases the herd's carry limit considerably."
     :filter
     {:stores {:metal 1000 :tools 1000}
      :skills {:craftwork 500}}}
    {:name :stadium
     :description "A great arena for displays and contests of bodily and theatric excellence!"
     :detail "Improves the fulfillment of festivals."
     :uses :athletics
     :filter
     {:stores {:wood 20 :tools 10}
      :skills {:craftwork 20 :athletics 20}}}
    {:name :stonetower-batteries
     :description "Cranes suspending columns of rock, storing potential energy in the suspension."
     :detail "Allows power to persist and accumulate."
     :uses :geology
     :filter
     {:stores {:stone 500 :tools 100}
      :skills {:craftwork 200 :geology 200}}}
    {:name :temple
     :description "A hallowed place, rendered sacred by many hands."
     :detail "Reduces fulfillment decay."
     :uses :organizing
     :filter
     {:stores {:wood 200 :stone 200 :tools 50}
      :skills {:craftwork 100 :organizing 100}}}
    {:name :wind-forge
     :description "A charcoal furnace that uses monsoon winds to burn hot enough to work high-quality metals."
     :detail "Allows the smelting of metal from ore during monsoon season (fall)."
     :filter
     {:stores {:wood 100 :stone 100 :tools 100}
      :skills {:craftwork 50}
      :terrain :jungle}}
    {:name :workshop
     :description "The craftsperson's complete depot and tool library."
     :detail "Improves the manufacturing of tools."
     :filter
     {:stores {:wood 10 :stone 10 :tools 10}
      :skills {:craftwork 20}}}]))

(defn building->name
  [building]
  (->> (string/split (name building) #"-")
       (map string/capitalize)
       (string/join " ")))

(s/fdef building->name
  :args (s/cat :building ::core/building)
  :ret string?)
