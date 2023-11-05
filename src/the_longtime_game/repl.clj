(ns the-longtime-game.repl
  (:require [clojure.string :as string]
            [the-longtime-game.contact-text :as contact-text]
            [the-longtime-game.core :as core]
            [the-longtime-game.dream :as dream]
            [the-longtime-game.event :as event]
            [the-longtime-game.moment :as moment]
            [the-longtime-game.project :as project]
            [the-longtime-game.remark :refer [gen-remarks]]
            [the-longtime-game.remark :as remark]
            [the-longtime-game.text :refer [join-text quote-text wrap-options
                                            wrap-quote-text]]))

(defn exit-game [& _] (System/exit 0))

(def read-line-predicates
  {"exit" exit-game
   "quit" exit-game})

(defn handle-read-line
  [s]
  (let [words (string/split s #" ")
        predicate (-> words
                      first
                      string/trim
                      string/lower-case)
        int-choice (try
                     (Integer/parseInt predicate)
                     (catch Exception _ nil))
        args (rest words)]
    (cond
      int-choice int-choice
      (contains? read-line-predicates predicate)
      (apply (read-line-predicates predicate) args)
      :else
      s)))

(defn prompt-text
  [& {:keys [prefix forbidden error]
      :or {prefix "!"
           forbidden #{}
           error "That answer is not allowed."}}]
  (let [answer (handle-read-line (read-line))]
    (if (contains? forbidden answer)
      (do
        (println (quote-text error :prefix prefix))
        (prompt-text :forbidden forbidden
                     :error error))
      answer)))

(defn select-from-options
  [prompt options & {:keys [may-cancel?]
                     :or {may-cancel? false}}]
  (let [options (sort options)
        options* (->> options
                      (map #(if (keyword? %) (name %) %))
                      (map #(string/join ". " [(inc %1) %2])
                           (range (count options))))]
    (println (wrap-options prompt options*))
    (let [answer (prompt-text)]
      (cond
        (and (int? answer)
             (< (dec answer) (count options)))
        (nth options (dec answer))
        (and may-cancel?
             (= answer "cancel"))
        nil
        :else
        (select-from-options prompt options :may-cancel? may-cancel?)))))

(defn select-in-range
  [prompt n & {:keys [default]}]
  (println (quote-text prompt :prefix "!"))
  (let [answer (prompt-text)]
    (if (and (int? answer)
             (<= answer n))
      answer
      (or default
          (select-in-range prompt n)))))

(defn await-text
  [prompt & {:keys [forbidden prefix default]
             :or {forbidden #{}
                  prefix "<"}}]
  (println (quote-text prompt :prefix "!"))
  (let [default-forbidden? (contains? forbidden default)
        answer (prompt-text :prefix prefix
                            :forbidden forbidden)]
    (if (seq answer)
      (if (and (= answer default)
               default-forbidden?)
        (await-text prompt
                    :prefix prefix
                    :forbidden forbidden
                    :default default)
        answer)
      (if default-forbidden?
        (await-text prompt
                    :prefix prefix
                    :forbidden forbidden
                    :default default)
        default))))

(defn await-confirmation
  ([]
   (await-confirmation "Press enter to proceed."))
  ([prompt]
   (println (quote-text prompt :prefix "!"))
   (handle-read-line (read-line))))

(defn match-prefix
  [l]
  (concat
   (map (constantly "├")
        (range (dec (count l))))
   ["└"]))

(defn print-herd
  [{:keys [individuals syndicates] :as herd}]
  (let [population (count individuals)
        syndicate-names
        (->> syndicates
             (map core/syndicate-name)
             sort
             (string/join ", "))]
    (println "┌────")
    (println "├" (:name herd))
    (let [month (:month herd)
          season (-> herd core/get-season
                     core/int->season)]
      (println (str "├─ Month: " month " (" season ")")))
    (println "├─ Population:" population)
    (println "├─ Syndicates:" syndicate-names)
    (println "├─ Hunger:"
             (:hunger herd)
             (str "(-" (core/calc-food-need population) ")"))
    (println "├─ Sickness:"
             (as-> (:sickness herd) $
               (/ $ population)
               (* $ 100)
               (float $)
               (format "%.2f" $)
               (str $ "%"))
             (str "(-" (core/calc-meds-need population) ")"))
    (let [fulfillments (map :fulfillment (:individuals herd))
          average (as-> fulfillments $
                    (reduce + 0 $)
                    (/ $ population))
          minimum (reduce min fulfillments)
          maximum (reduce max fulfillments)]
      (println "├─ Fulfillment:"
               "avg" (str (int average) "%;")
               "min" (str minimum "%;")
               "max" (str maximum "%"))))
    (let [location (core/current-location herd)
          strings
          (filter
           some?
           [(when-let [infra (seq (:infra location))]
              (string/join
               "\n"
               (concat [(str "┬ Infrastructure")]
                       (let [prefixes (match-prefix infra)
                             infra* (map vector infra prefixes)]
                         (for [[i prefix] infra*
                               :let [s (string/capitalize (name i))]]
                           (str "││" prefix "─ " s))))))
            (when (some? (:flora location))
              (str "─ Flora: " (:flora location)))
            (when (some? (:depleted? location))
              (str "─ Depleted? " (:depleted? location)))
            (when (= :plains (:terrain location))
              (str "─ Nutrients: "
                   (string/join
                    ", "
                    (map (fn [nutrient]
                           (string/join
                            " "
                            [(-> nutrient
                                 name
                                 string/capitalize)
                             (get location nutrient)]))
                         [:n :k :p]))))
            (when (some? (:crop location))
              (str "─ Crop: " (name (:crop location))))
            (when (some? (:ready? location))
              (str "─ Ready? " (:ready? location)))
            (when (some? (:wild? location))
              (str "─ Wild? " (:wild? location)))])
          prefixes
          (match-prefix strings)
          first-prefix (if (seq strings) "┬" "─")]
      (println (str "├" first-prefix " Location: " (:name location)))
      (when (seq strings)
        (println
         (string/join
          "\n"
          (map
           (fn [s prefix]
             (str "│" prefix s))
           strings
           prefixes)))))
    (println "├┬ Skills")
    (let [skill-levels
          (map
           (fn [skill]
             [skill (core/collective-skill herd skill)])
           core/skills)
          skills (sort skill-levels)
          prefixes (match-prefix skills)
          skills* (map into skills prefixes)]
      (doseq [[skill amount prefix] skills*
              :let [name* (-> skill name string/capitalize)]]
        (println (str "│" prefix "─ " name* ": " amount))))
    (let [stores (->> (:stores herd)
                      seq
                      (filter
                       (fn [[_ amount]]
                         (pos-int? amount)))
                      sort)]
      (when (seq stores)
        (println "├┬ Stores")
        (doseq [[resource amount prefix]
                (map into stores (match-prefix stores))
                :let [name* (-> resource name string/capitalize)]]
          (println (str "│" prefix "─ " name* ": " amount)))))
    (println "├┬ Next Stage" (str "(of " (count (:path herd)) ")"))
    (let [locations (sort
                     #(compare (:name %1) (:name %2))
                     (second (:path herd)))
          prefixes (match-prefix locations)]
      (doseq [[location prefix] (map vector locations prefixes)
              :let [name* (:name location)
                    infra (seq (map (comp string/capitalize name) (:infra location)))]]
        (println
         (if infra
           (str "│" prefix "─ " name* " (" (string/join ", " infra) ")")
           (str "│" prefix "─ " name*)))))
    (println "└────"))

(defn cause-event
  [herd]
  (if (zero? (rand-int 3))
    (let [[name text-fn effect] (event/pick-event herd)
          blurb (text-fn)]
      (println (wrap-quote-text blurb))
      (await-confirmation)
      (assoc (effect) :event name))
    herd))

(defn leave-behind-voluntarily
  [herd]
  (let [[remaining leaving]
        (reduce
         (fn [[remaining leaving] resource]
           (let [amount (get-in herd [:stores resource] 0)
                 carry
                 (if (zero? amount)
                   0
                   (let [n (min amount remaining)
                         s (name resource)]
                     (select-in-range (str "Leave behind how much " s "? "
                                           amount " " s "; " remaining " carryable.")
                                      n
                                      :default 0)))]
             [(- remaining carry)
              (assoc leaving resource carry)]))
         [(core/carry-limit herd) {}]
         core/carryable)]
    (if (> remaining 0)
      (-> herd
          (update :stores (partial merge-with -) leaving)
          (update-in [:path 0 (:index herd) :stores]
                     (partial merge-with +) leaving))
      (leave-behind-voluntarily herd))))

(def repl-projects
  (concat project/projects
          [{:name "Dismantle infrastructue"
            :uses [:craftwork]
            :filter-fn
            (fn [herd]
              (let [infra (:infra (core/current-location herd))]
                (> (count infra) 0)))
            :effect
            (fn [herd location]
              (let [infra (:infra location)
                    choice (select-from-options
                            "Select infrastructure to dismantle:"
                            infra)]
                (core/assoc-location
                 herd
                 (disj location :infra choice))))}
           {:name "Leave resources behind"
            :uses []
            :filter-fn
            (fn [{:keys [stores]}]
              (> 0 (reduce
                    (fn [total [_ amount]]
                      (+ total amount))
                    0
                    (seq stores))))
            :effect
            (fn [herd _]
              (leave-behind-voluntarily herd))}]))

(defn select-project
  [herd]
  (let [candidates
        (filter (partial project/can-enact? herd)
                repl-projects)
        name->candidate
        (->> candidates
             (map
              (fn [candidate]
                [(:name candidate) candidate]))
             (into {}))
        name (select-from-options
              "Select a project to enact:"
              (keys name->candidate))
        project (name->candidate name)
        herd* (-> (project/do-project herd project)
                  (update :projects conj name))]
    (when (:text-fn project)
      ((:text-fn project) herd*))
    herd*))

(defn select-month-projects
  [herd]
  (reduce
   (fn [herd i]
     (print-herd herd)
     (println (quote-text (str "Project " (inc i) " of 3")))
     (select-project herd))
   herd
   (range 3)))

(defn answer-prayer
  [herd]
  (if (= 0 (rand-int 3))
    (let [dream (dream/pick-dream herd)
          [choices text-fn post-text-fn effect] (dream/marshal-dream herd dream)
          blurb (text-fn)
          _ (println (wrap-quote-text blurb))
          choice (when (seq choices)
                   (if (= 1 (count choices))
                     (first choices)
                     (select-from-options
                      "How do you counsel?"
                      choices)))
          herd* (effect choice)
          post-blurb (post-text-fn herd* choice)]
      (when post-blurb
        (println (wrap-quote-text post-blurb)))
      herd*)
    herd))

(defn choose-next-location
  [herd]
  (let [next-stage (second (:path herd))
        index
        (if (= 1 (count next-stage))
          0
          (let [names (map :name next-stage)
                name (select-from-options
                      "Where shall the herd go next?"
                      names)]
            (.indexOf names name)))]
    (core/next-location herd index)))

(defn decide-carrying
  [herd]
  (let [remaining (core/carry-limit herd)
        _ (println
           (wrap-options
            (str "The herd has too many goods to carry (" remaining ")")
            (for [[resource amount] (seq (:stores herd))]
              (str (name resource) ": " amount))))
        [remaining carrying]
        (reduce
         (fn [[remaining carrying] resource]
           (let [amount (get-in herd [:stores resource] 0)
                 carry
                 (if (zero? amount)
                   0
                   (let [n (min amount remaining)
                         s (name resource)]
                     (select-in-range (str "Carry how much " s "? "
                                           amount " " s "; " remaining " carryable.")
                                      n
                                      :default amount)))]
             [(- remaining carry)
              (assoc carrying resource carry)]))
         [remaining {}]
         core/carryable)]
    (if (> 0 remaining)
      (do
        (println (quote-text (str "Carrying too much! Carry" remaining "less.")))
        (decide-carrying herd))
      (do
        (println
         (wrap-options
          "The herd will carry with it:"
          (for [[resource amount] (seq carrying)]
            (str (name resource) ": " amount))))
        (if (select-from-options "OK?" [true false])
          (core/keep-and-leave-behind herd carrying)
          (decide-carrying herd))))))

(defn leave-behind
  [herd]
  (let [leftovers (get-in herd [:stores :food] 0)
        herd (assoc-in herd [:stores :food] 0)
        location (core/current-location herd)
        location
        (if (core/local-infra? herd :granary)
          (update location [:stores :food] #(if %1 (+ %1 %2) %2) leftovers)
          location)
        herd (core/assoc-location herd location)]
    (if (core/must-leave-some? herd)
      (decide-carrying herd)
      herd)))

(defn introduce-location
  [herd]
  (let [location (core/current-location herd)
        steppe? (= :steppe (:terrain location))
        remarks (if steppe?
                  (remark/gen-remarks herd)
                  (string/join " " [(remark/gen-remarks herd)
                                    (moment/gen-moments herd)]))]
    (println (quote-text (str "The herd arrives at " (:name location) ".")))
    (println (wrap-quote-text remarks))
    (when steppe?
      (println (quote-text "The herd rushes unfettered across the steppe.")))
    (await-confirmation)))

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

(defn announce-new-syndicate
  [candidate]
  (let [remarks (map syndicate-remarks candidate)
        [r1 r2] (map rand-nth remarks)]
    (println
     (wrap-quote-text
      (join-text
       "Record-keepers and rhetoricians rejoice!"
       "Enthusiasts have joined together in debate and duel."
       "They bicker and bother, sussing with susurrus"
       "the finer points of some greater ethos."
       (str "Through " r1 " and " r2 ",")
       "a potent consensus emerges,"
       "a bright and capable vision!"
       (str "So is founded " (core/syndicate-name candidate) "."))))))

(defn maybe-add-syndicate
  [herd]
  (if (core/should-add-syndicate? herd)
    (let [votes (core/tally-votes (:individuals herd))
          candidates (core/rank-candidates votes)]
      (if-let [candidate (core/select-candidate (:syndicates herd) candidates)]
        (do
          (announce-new-syndicate candidate)
          (await-confirmation)
          (update herd :syndicates conj candidate))
        herd))
    herd))

(defn announce-pop-changes
  [{:keys [new-adults new-dead]}]
  (when (seq new-adults)
    (let [plural? (< 1 (count new-adults))
          verb (if plural?
                 "minots have"
                 "minot has")
          s? (if plural?
               "s"
               "")]
      (println
       (quote-text
        (str (count new-adults) " " verb " come in from their journey" s? ": "
             (string/join ", " (map :name new-adults)))))))
  (when (seq new-dead)
    (let [plural? (> 1 (count new-dead))
          verb (if plural?
                 "minots have"
                 "minot has")]
      (println
       (quote-text
        (str (count new-dead) " " verb " returned to soil: "
             (string/join ", " (map :name new-dead))))))))

(defn update-contacts
  [herd]
  (if (core/new-contact? herd)
    (let [contact (core/get-next-contact herd)]
      (println (wrap-quote-text (contact-text/contact->blurb contact)))
      (await-confirmation)
      (update herd :contacts conj contact))
    herd))

(defn do-month
  [herd]
  (if (= :steppe (:terrain (core/current-location herd)))
    (choose-next-location herd)
    (let [herd (core/begin-month herd)
          _ (introduce-location herd)
          _ (announce-pop-changes herd)
          herd (core/consolidate-stores herd)
          herd (cause-event herd)
          herd (select-month-projects herd)
          herd (update-contacts herd)
          herd (answer-prayer herd)
          herd (maybe-add-syndicate herd)
          herd (core/apply-herd-upkeep herd)
          herd (leave-behind herd)
          herd (choose-next-location herd)
          herd (core/inc-month herd)]
      (print-herd herd)
      herd)))
