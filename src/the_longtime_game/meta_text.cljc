(ns the-longtime-game.meta-text 
  (:require [clojure.string :as string]
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
