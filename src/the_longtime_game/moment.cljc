(ns the-longtime-game.moment
  "A moment is a personal experience, involving one person from the herd.
   Basic ones are independent of location, and require only one associated trait.
   More advanced ones may utilize the flexibility of scenes."
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.scene :as scene]))

(def basic-moments
  {:angry
   [#(str % " fumes at the hubris of the uncaring stars.")
    #(str "Too angry to eat, " % " refuses an evening ration.")
    #(str % " sits alone with their anger, wrestling in silence with the ineffable.")]
   :kind
   [#(str % " feeds grass-apple bits to a gaggle of gossiping corvids.")
    #(str % " whispers kind words to flora and fauna, tender hands evoking growth.")]
   :pensive
   [#(str % " considers the stars above and wonders how they consider them in turn.")
    #(str "Curious " % " piles shaped rocks, only to watch them fall apart.")
    #(str % " measures the alignment of the heavens.")]
   :loving
   [#(str % " regales younglings with tales of adventure.")
    #(str % " consoles a grieving cousin for love found and lost.")]
   :fierce
   [#(str "Determined " % " imprints wood and stone with honed force.")
    #(str % " persists in strenuous effort, grunting to overcome their body's complaints.")]
   :devoted
   [#(str % " rubs beads in their palm and prays to the Longtime intently.")
    #(str "Tirelessly " % " assists their brethren about the day.")]
   :sickly
   [#(str % " coughs heavily, worryingly.")
    #(str % " shivers from a phantom chill.")]
   :wounded
   [#(str % " limps on crutches as their wound heals.")
    #(str % " rests on the ground, drifting between sleep and fever-dream.")]
   :attentive
   [#(str % " scans the horizon for strangeness and opportunity.")
    #(str "Ants pass industriously under " % "'s watchful gaze.")
    #(str "Watching a flower too closely, " % " cannot avoid a sneeze.")]
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
    #(str % " smiles at the sky, thankful for the day.")
    #(str % " thinks things will work out this time.")]
   :pessimistic
   [#(str % " examines the ground underhoof and finds it wanting.")
    #(str "Seasoned " % " predicts foul weather.")
    #(str "Nursing a wizened hesitance, " % " grumbles in disagreement.")]
   :poet
   [#(str % " can hardly find the words for their feelings, try as they might.")
    #(str % " reflects on the stories they have heard, and that they might tell.")
    #(str % " excitedly presses marks into clay, recording careful and decisive words.")]
   :dancer
   [#(str % " whirls and flourishes about the camp, impressing nuance into each motion.")
    #(str % " pulls another minot into a twirl, eliciting a beaming grin.")]})

(def moment-scenes
  (flatten
   (for [[trait moments] basic-moments]
     (for [text-fn moments]
       {:text-fn (fn [_ [individual] & _] (text-fn (:name individual)))
        :selects [{:traits trait}]}))))

(defn gen-moments
  [herd]
  (->> (shuffle moment-scenes)
       (filter (partial scene/scene-may-occur? herd))
       (map (partial scene/marshal-scene herd))
       (map (fn [[text-fn _]] (text-fn)))
       (take 2)
       (string/join " ")))

(s/fdef gen-moments
  :args (s/cat :herd ::core/herd)
  :ret string?)
