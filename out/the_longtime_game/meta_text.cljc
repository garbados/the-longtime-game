(ns the-longtime-game.meta-text 
  (:require [clojure.string :as string]
            [the-longtime-game.core :as core]
            [the-longtime-game.text :as text]))

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

(defn tutorial-text
  [herd]
  (string/join
   "\n\n"
   [(text/join-text
     "Hail, O" (str (:spirit herd) "!")
     "A herd of Minots has prayed you into being; invested you with their hopes, and their skills.
      It falls to you to shepherd them through the ages,
      to decide, in subtle and decisive ways, where they go and what they do.")
    (text/join-text
     "Minots have traversed the Gran-Imun-Yuliak supercontinent for eons,
      in herds large and small, across ranges wide and narrow.
      Their vast strength, rapid gallop, and four stomachs
      have made them an herbivore atop a food chain.
      Now an era of tools and crops begins to dawn,
      while greater ambitions brew in the dreams
      of humble ungulate-primates.")
    (text/join-text
     "Each month, you will select three projects for the herd to enact.
      These include grazing, gathering stones, or constructing buildings.
      Check `projects` for more info on all the projects in the game.
      At the end of each month, the upkeeps of hunger and sickness apply,
      consuming nutrition and poultices respectively.
      Without enough food or rations, the herd goes hungry, degrading its abilities.
      If the herd remains hungry for an entire year, it will disband, destroying you.
      Without enough poultices, sickness spreads, reducing effective skills.
      After upkeep is applied, you will select the next location for the herd to travel to.
      The herd's migration path consists of a loop of stages;
      each stage has up to four locations, and you may travel to any location in the next stage.")
    (text/join-text
     "At the beginning of each month, an event may occur.
      Events are happenings that the herd handles on its own.
      These may include weather events, interpersonal conflicts, plague and fire, and so on.
      At the end of each month, a dream may occur.
      Dreams represent the prayers of your people, and you may be prompted to answer them.
      Your counsel will influence the dreamer as they forge their life.")
    (text/join-text
     "Individuals in the herd have traits, passions, skills, and fulfillment.
      Check out `individuals` for details about your herd.
      When individual fulfillment gets too low, unhappy folk will become weary and depressed.
      On the other hand, happy individuals will tend to spread the love around.")
    ((comp #(string/join "\n" %) #(map string/trim %) string/split-lines)
     "There are six types of terrain in the game:
      - Plains: grow crops in spring, harvest in summer or fall.
      - Forest: flora grows over time; gather deadfall for wood.
      - Mountain: good for stone-gathering, spelunking, and stargazing.
      - Steppe: rush overland easily; cross this stage without passing time.
      - Jungle: a tropical rainforest; a thick and vicious green.
      - Swamp: gather bog-iron once a year.")
    (text/join-text
     "Each stage of the herd's migration path may have up to four locations.
      Each location may have up to four constructed buildings.")
    (text/join-text
     "Eventually, your herd will possess the skills to explore new locations,
      and to elongate the migration path to accommodate a larger herd.
      For now, you walk a small loop from plains to mountain and back again.
      Use `path` to look at your whole migration path.")
    (text/join-text
     "Now you are ready to look after" (str (:name herd) ".") 
     "Will you see them to new homes among the stars?
      Or will famine and want tear you apart?")]))

(def projects-description
  (text/join-text
   "Projects are how the herd organizes its collective efforts during the month.
    They usually require resources or have skill thresholds;
    you will gain access to more projects as your herd advances.
    Research this list to learn more about what your herd can eventually accomplish."))

(def individuals-description
  (text/join-text
   "Herds consist of individuals, who have passions, traits, fulfillment, and skills.
    Minots with more fulfillment are happier; unhappiness breeds weariness and depression."))

(def path-description
  (text/join-text
   "The herd's migration path consists of stages of up to four locations each.
    At the end of each month, you will select a location from the next stage
    to travel to.
    Steppe locations can be crossed without spending a month,
    though nor can you enact projects on steppes.
    Longer paths may support larger herds,
    though it takes significant organization
    to adjust a migration like that."))

(def credits-description
  (string/join
   "\n"
   [(text/join-text
     "The Longtime is a labor of love.
      I dreamed of being the subtle and decisive influence
      that united the hopes of a great collective,
      a maelstrom of effort across countless generations.
      I did not want to watch my pawns scurry,
      driven by inscrutible menus.
      I wanted to be the heart of their ambitions!
      So I made this game.")
    (text/join-text
     "Much is owed to the prior art of games like
      Rimworld, Kitten Game, Frostpunk, Dwarf Fortress, and Stellaris,
      but especial thanks go to my partner Lucia Brody
      for developing with me the whole universe of *The Shepherd*,
      of which Minots are only a part.")]))

(def syndicate-remarks
  {:athletics
   ["rigorous exertion"
    "strenuous feats"]
   :craftwork
   ["strange inventions"
    "curious designs"]
   :geology
   ["beautiful stonework"
    "earthen foresight"]
   :herbalism
   ["advanced greenlore"
    "keen pathfinding"]
   :medicine
   ["enlightening panaceas"
    "gourmet dining"]
   :organizing
   ["meticulous planning"
    "historical consideration"]})

(defn announce-syndicate [syndicate]
  (let [remarks (map syndicate-remarks syndicate)
        [r1 r2] (map rand-nth remarks)]
    (text/join-text
     "Record-keepers and rhetoricians rejoice!"
     "Enthusiasts have joined together in debate and duel."
     "They bicker and bother, sussing with susurrus"
     "the finer points of some greater ethos."
     (str "Through " r1 " and " r2 ",")
     "a potent consensus emerges,"
     "a bright and capable vision!"
     (str "So is founded " (core/syndicate-name syndicate) "."))))
