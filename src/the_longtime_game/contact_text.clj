(ns the-longtime-game.contact-text 
  (:require [the-longtime-game.text :refer [join-text]]))

(def auter-contact
  (join-text
   "Rodents have taken up residence in the lodges, it seems.
    Hardly a meter tall, they come with roasted nuts and detailed tapestries,
    whose weaves encode formulas, algorithms, proofs, and arguments
    for the shape and meaning of the world;
    for the character of the lives they aspire to live.
    The Auters, as they are called, take quickly to the tongues of the herd.
    Eagerly they establish sign languages that their small paws and our large hands
    may each employ, opening the door to a complex dialogue.
    The meticulous mammals hail from an archipelago far to the south,
    where for eons they have cracked urchins and oysters on their bellies.
    This shard of them has come in search of strangeness and adventure,
    for they delight in how the world sprawls endless,
    replete with the miracles of life
    and the mysteries of death."))

(def felidar-contact
  (join-text
   "Foreign traders have come. They arrange their wares outside the lodges,
    enticing the herd with delectable dumplings and artful pottery, fine combs and jewelry.
    They know Minots, it seems, as they speak easily in the tongues of the herd.
    Far to the west, the Felidar have a longstanding relationship with the herds of their savannahs.
    The topic is a sensitive one.
    Long ago, a Felidari regency used Minots as livestock, for labor and meat,
    until the herds revolted.
    A stampede of kept and wild herds alike burned a path from the farthest village to the capitol center,
    where they set the city ablaze
    and returned the regent to soil.
    The subsequent regent, whose dynasty still reigns, guaranteed the autonomy of the herds,
    and forbade the butchery of any animal
    larger than a common rat.
    The traders' dumplings signify the enduring peace they now enjoy:
    desert potatoes, peas and corn, and spices that evoke heat and sweetness all at once;
    the Felidari culinarian's metaphors of choice for the dynamism of camaraderie.
    As the herd and these welcome strangers break rations together,
    they toast the possibility, indeed the certainty, of a bright future together."))

(def harp-contact
  (join-text
   "Since even before the time of words,
    small birds have lived alongside the herds,
    plucking the flies and ticks that accumulate in Minot fur,
    that swishing tails cannot dissuade from pestery.
    A larger variety of such creature --
    if only half a meter tall --
    has made its sapience known with monuments.
    Carefully stacked mounds of gems signify the societal ambitions
    of a People that has lived beside the herds for ages.
    The subtle bodily gestures that each has used to read the other
    grow into functional tongues of symbols and referents,
    whose subtletly remains intact -- the legacy of their ancient bond.
    The Harps, as they call themselves, conduct a state of exchange:
    an economy of face bound by decorum and willful deviancy.
    They are eager to enact the pageantry of bartering,
    of gem for stick and stick for stone,
    delighting in the terms with a degree of covetous opportunism.
    More than that, an excitement blossoms
    of all that these avid little avians and determined ungulate-primates
    might build together.
    Aye, the dream blossoms: to dance together on the world,
    to thrive together among the stars!"))

(def er-sol-contact
  (join-text
   "The trees have always been alive, of course,
    since long before any mammal or avian or reptile walked the land.
    The ground itself is thick with their passing, thick *from* it,
    and the likes of root and mycelia contain memories of seasons unbounded.
    They are not still, but flowing through branch and leaf and nodule,
    over and around what the wind tells them they will find.
    Their words are their deeds; the body of the forest is their manifesto.
    That is, save for the Er'sol, who we have found may speak as we do.
    Minots resting under the boughs of these contemplative beings
    find their dreams inviting the mind of the arboreal;
    eternity sprawls, and all spirits stand alive and present.
    Strange concepts emerge from rooted minds,
    and thorny problems borrow against their wisdom.
    They liase between herd and thick green,
    granting insight into its deepest arcana:
    the dynamics of flourishing and famine,
    wind and rain,
    canopy and corpse.
    To align with it is to become a part of its awesome dominion."))

(def dod-contact "TODO")

(def saurek-contact "TODO")

(def haroot-contact "TODO")

(def rak-contact "TODO")

(def dabulan-contact "TODO")

(def contact->blurb
  {:auter auter-contact
   :felidar felidar-contact
   :harp harp-contact
   :er-sol er-sol-contact
   :dod dod-contact
   :saurek saurek-contact
   :haroot haroot-contact
   :rak rak-contact
   :dabulan dabulan-contact})
