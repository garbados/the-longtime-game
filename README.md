# The Longtime

![Build and Test](https://github.com/garbados/the-longtime-game/actions/workflows/tests.yaml/badge.svg)

A nomadic city-builder game about cooperation and minotaurs, as a text adventure.

**CURRENT STATUS: ALPHA**

## Introduction

Take on the role of a Minot herd's revered spirit of the collective, the thread of all their shared dreams, *the Longtime*, and influence their monumental efforts as they traverse an ancient migration path.

Minots have traversed the Gran-Imun-Yuliak supercontinent for eons, in herds large and small, across ranges wide and narrow. Their vast strength, rapid gallop, and four stomachs have made them an herbivore atop a food chain. Now an era of tools and crops begins to dawn, while greater ambitions brew in the dreams of humble ungulate-primates.

Each month you will decide on the efforts to which the herd devotes itself, and where it travels next along its migration path. You will also answer prayers, receive dreams, and witness events. Follow and guide the herd, from grazing ancestral plains, to traveling among the stars.

See [How to Play](./doc/howtoplay.md) for more information on the concepts and mechanics of the game.

## Usage

The game runs in a terminal, and does not open its own window. It is written in [Clojure](https://clojure.org/).

The game can be built and played with three shell commands:

- `./start.sh`: Runs the game using [leiningen](https://leiningen.org/).
- `./build.sh`: Produces a portable JAR file of the game.
- `./run.sh`: Runs the game as a JAR file.

If you want to play the game, use `./start.sh`. However, you can also use one of the standalone release JARs, which you can run like this:

```sh
$ java -jar {jarfile}
```

## Acknowledgements

I owe much to Dwarf Fortress, Rimworld, Kitten Game, and Frostpunk for the city-builder heart of *The Longtime*. But I don't want to watch my pawns scurry, compelled by my inscrutable menus. I want the inspiration I bestow to be succinct and decisive, abstracted from physicality just as the player's very avatar is. I want to be the heart of their dreams. So I made this game.

Thanks are also owed to my loving partner Lucia Brody for collaboratively developing the world of *The Shepherd*, of which Minots are only a part.

## License

[CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)
