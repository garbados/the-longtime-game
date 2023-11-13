(defproject the-longtime-game "0.1.2"
  :description "The Longtime"
  :url "https//github.com/garbados/the-longtime-game"
  :license {:name "CC BY-NC-SA"
            :url "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"}
  :dependencies [[org.clojure/clojure "1.10.0"]]
  :plugins [[lein-cloverage "1.2.2"]]
  :profiles {:dev {:dependencies [[org.clojure/test.check "1.1.1"]]}}
  :repl-options {:init-ns the-longtime-game.core}
  :main the-longtime-game.game
  :aot [the-longtime-game.game])
