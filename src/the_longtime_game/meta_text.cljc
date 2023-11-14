(ns the-longtime-game.meta-text 
  (:require [the-longtime-game.text :as text]))

(def intro-text
  (text/join-text
   "Are you there, some enduring era
    of peace and plenty?
    Hard winters and bare summers
    have weakened our ways
    and scattered our herd.
    Only a few dozen of us remain now to walk
    the ancient path.
    I believe in us, you must understand!
    I believe in old age and young laughter,
    in the strength of all that we might share.
    I dream of homes among the stars,
    of a long time for me, for us all.
    Are you out there?
    I believe in you.
    I pray to you:
    tell me your name."))

(def gameover-text
  (text/join-text
   "After a year of growling bellies, the herd disbands.
    Starvation terrifies the masses, and the stampede that once encompassed you
    now spills across the land, unmarshaled, uncontrolled.
    Adults and children alike flee to seek more fecund ways
    among other herds. The shared dream you embody shatters.
    Eternity welcomes the wreckage of you back into its folds,
    to be resewn into new visions and stranger futures
    for another, luckier, pluckier herd.
    [GAME OVER]"))
