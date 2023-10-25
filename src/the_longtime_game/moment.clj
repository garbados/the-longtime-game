(ns the-longtime-game.moment
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]))

(def basic-moments
  {:angry
   [#(str % " fumes at the hubris of the uncaring stars.")
    #(str "Too angry to eat, " % " refuses an evening ration.")]
   :kind
   [#(str % " feeds grass-apple bits to a gaggle of gossiping corvids.")]
   :pensive
   [#(str % " considers the stars above and wonders how they consider them in turn.")
    #(str "Curious " % " piles shaped rocks, only to watch them fall apart.")]
   :loving
   [#(str % " regales younglings with tales of adventure.")
    #(str % " consoles a grieving cousin for love found and lost.")]
   :fierce
   [#(str "Determined " % " imprints wood and stone with honed force.")
    #(str % " persists in strenuous effort, grunting to overcome their body's complaints.")]
   :devoted
   []
   :sickly
   [#(str % " coughs heavily, worryingly.")
    #(str % " shivers from a phantom chill.")]
   :wounded
   [#(str % " limps on crutches as their wound heals.")
    #(str % " rests on the ground, drifting between sleep and fever-dream.")]
   :attentive
   [#(str % " scans the horizon for strangeness and opportunity.")
    #(str "Ants pass industriously under " % "'s watchful gaze.")]
   :absent-minded
   [#(str % " peacefully watches the sky move overhead.")
    #(str "Idleness bouys " % "'s wandering spirit.")]
   :depressed
   [#(str % " wonders with a silent sigh if life is worth it.")
    #(str "Struggling to regain joy, " % " pursues idle hobbies.")]
   :mystical
   [#(str % " speaks to no-one in an unknown tongue.")
    #(str "With unfocused eyes, " % " beseeches something nameless.")]
   :weary
   [#(str % " collapses on their rump at day's end, relishing relaxation.")
    #(str "Huffing with exertion, " % " struggles with their duties.")]
   :optimistic
   [#(str % " looks to the horizon and sees a bright tomorrow glimmering.")
    #(str % " smiles at the sky, thankful for the day.")]
   :pessimistic
   [#(str % " examines the ground underhoof and finds it wanting.")
    #(str "Seasoned " % " predicts foul weather.")]
   :poet
   []
   :dancer
   []})

(defn gen-moments
  [herd]
  (->> (:individuals herd)
       shuffle
       (map #(->> (:traits %)
                  (map basic-moments)
                  (reduce concat [])
                  (map (fn [moment] (moment (:name %))))
                  shuffle
                  first))
       (filter some?)
       (take 2)
       (string/join " ")))
