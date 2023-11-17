# *The Longtime*: Notes

## Regarding population curves

A herd, absent hunger and sickness, will reach some optimal population and hover around that value consistently.

*Journeyed* individuals return to the herd, or beseech it for the first time, to commit to its Longtime. Usually this is done around the age of 20. Children, and particularly infant mortality, are abstracted away; only journeyed individuals constitute the Longtime.

Each month, some number of adults complete their journeying, and some number of adults die of old age. Herds have an "optimal" size, based on the number of stages in their path, and the relative likelihood of more or less journeyings and deaths shifts based on the delta to that optimal size.

*Journeying* is a term for an adulthood ritual in which an individual survives one year on a solitary migration, and returns to where they started. Sometimes journeying individuals will join other herds for a few seasons, or live like an aurochs in the woods, or camp civilly with rations aplenty.

Journeying may also refer any migratory commitment a minot makes to a herd, and so adult minots that choose to join a herd are said to *come in from their journey* just the same as returning herdlings.

## Regarding place descriptions

When you visit a location, after its event, a description is generated from three elements. One of them is terrain-related, and two are generated from traits in the herd. That is, two *moments* occur, which pair a character selector with a short text blurb.

The location blurb uses a function to map the location into a *remark*, which involves no characters. This may comment on the plains being grassy, a building existing, or the absence of buildings.

## Regarding Lodges

A lodge requires wood, stone, and tools, but mostly wood. They seem meaningless until you have several, and then several more. With enough lodges, complex relationships to the species lodging there will emerge, and *contact events* will play. Which people you contact will vary based on how many you have already contacted.

Early contacts:

- Auter: *Pluriversity*
- Harp: *Flying Market*
- Felidar: *Chargepot Generator*
- Er'sol: *Eldermothertree*

Mid contacts

- Dod: *Mag Launchpad*
- Saurek: *Port Cove*

Late contacts

- Haroot: *Launch Shipyard Requisites*
- Rak: *Atomic Reactor*
- Dabulan: *Launch Ringworld Requisites*

Within each tier, the next contact is random.

## Regarding a Website

By comparison, Kitten Game uses local storage to allow one game per session. Hypothetically, a sign-in system could allow a user to sync between devices, but I consider that within the scope of a later stage of development.

If I can compile the game to ClojureScript, I could use PouchDB to store saved games. Then I would just have to build a UI, and I could host it on GitHub Pages for free. There's no reason this approach shouldn't work.
