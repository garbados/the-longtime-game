(ns the-longtime-game.dream-text 
  (:require [the-longtime-game.text :refer [join-text]]))

(defn catharsis
  [_info _herd [sadcow] depressed?]
  (if depressed?
    (join-text
     "A bright morning finds" (:name sadcow) "buoyed by revelation."
     "They see now, some ineffable aspect of Creation, clear as day."
     "The world remains a grey and muted place, colored by depression,"
     "but what one understands, one fears perhaps less."
     "They go on, clinging to life."
     "\"I remember joy!\" they insist, \"I am a part of the joy of others.\""
     "Resolute, the minot presses on.")
    (join-text
     "A bright morning finds" (:name sadcow) "buoyed by revelation."
     "They see now, some ineffable aspect of Creation, clear as day."
     "But as it settles into their bones, depression takes root."
     "The shadow of understanding approaches boredom,"
     "a psychic stagnation that mutes a vivid world."
     "What they have pondered seeps back, joyless."
     "Humbled, troubled, the minot presses on.")))

(defn doubt
  [_ _ [sadcow] dispassion & _]
  (join-text
   "A spirit of dispassion seizes" (:name sadcow) "."
   "They have struggled to experience joy, to feel much at all."
   "It all seems so small, so... meaningless."
   "Familiar passions grow distant, indistinct;"
   "dissatisfying, most of all."
   "A job well-done seems never worth doing."
   (if dispassion
     (str (:name sadcow) " loses their love of " (name dispassion) ".")
     (str (:name sadcow) " finds their love of life wounded."))
   "They go on, a little more empty."))

(defn gratitude
  [& _]
  (join-text
   "Oh Longtime. I have been so happy lately."
   "I find joy in my efforts. They have meaning; the labor I exert matters."
   "I laugh with friends over sunsets and grass-apples."
   "There is color in the world. Rainbows so rich one might sup of them as wine."
   "I feel at home here. Among these people. In this way."
   "Thank you, Longtime."
   "I pray you will grant us continued fortune."))

(defn purpose
  [_ _ [dreamer] & _]
  (join-text
   (:name dreamer) "wonders about their purpose."
   "Why do they exist?"
   "Indeed, what do they exist *for*?"
   "They think of the things they like to do,"
   "and what drives the engine of their heart."
   "Certainly a life well-lived is lived for such things, no?"
   (:name dreamer) "tosses and turns in their sleep,"
   "visions of futures roiling in their dreams."
   "A life spent well, they ponder. A life spent well..."))
