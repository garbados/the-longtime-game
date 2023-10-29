(ns the-longtime-game.core
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as string]
            [clojure.spec.gen.alpha :as g]))

(def resources #{:food
                 :rations
                 :poultices
                 :wood
                 :bone
                 :stone
                 :ore
                 :metal
                 :tools})

(def carryable (disj resources :food))

(def skills #{:athletics
              :craftwork
              :geology
              :herbalism
              :medicine
              :organizing})

(def terrains #{:plains
                :forest
                :jungle
                :swamp
                :steppe
                :mountain})

(def buildings #{:granary
                 :stadium
                 :observatory
                 :quarry
                 :kitchen
                 :workshop
                 :wind-forge
                 :monsoon-bellows
                 :temple
                 :hospital})

(def traits #{:angry
              :kind
              :pensive
              :loving
              :fierce
              :devoted
              :sickly
              :wounded
              :attentive
              :absent-minded
              :depressed
              :mystical
              :weary
              :optimistic
              :pessimistic
              :poet
              :dancer})

(def negative-traits #{:sickly
                       :wounded
                       :depressed
                       :weary})

(def positive-traits
  (set (filter (complement negative-traits) traits)))

(def location-names
  ["Yuliak"
   "Gran"
   "Ekab"
   "Qux"
   "U'otl"
   "Un"
   "Oplith"
   "Imun"
   "Ikoleb"
   "Tux"
   "M'enli"
   "Wa'ifcha"
   "Eu"
   "Hagra"
   "Gurip"
   "Eol"
   "Yut"])

(def herd-names
  ["They of One Thousand Oaks"
   "Kin of the Season-Wheel"
   "Brash-Mane Stampede"
   "They of Horn and Thorn"])

(def skill-ranks ["unfamiliar"
                  "novice"
                  "learned"
                  "adept"
                  "expert"
                  "virtuoso"])

(def max-age 50)
(def adulthood 20)
(def optimal-pops-per-stage 25)
(def pop-shift-per-delta 10)
(def max-hunger 4)
(def max-buildings 4)
(def max-skill (count skill-ranks))
(def max-fulfillment 100)
(def max-passions 3)
(def experience-rate 10)
(def passion-rate 10)
(def fulfillment-rate 10)
(def fulfillment-decay 1)
(def carry-modifier 3)
(def org-threshold 10)
(def org-multiplier 2)
(def hunger-rate 1/3)
(def sickness-rate 1/4)

(def crop->nutrients
  {:grapplewheat #{:n :k}
   :rattails     #{:n :p}
   :drum-squash  #{:p :k}
   :bean-peppers #{:n}
   :lorry-tops   #{:p}
   :crownions    #{:k}})

(def crops (set (keys crop->nutrients)))
(def nutrients #{:n :k :p})

(def skill->shortname
  {:athletics  "ath"
   :craftwork  "craf"
   :geology    "geo"
   :herbalism  "herb"
   :medicine   "med"
   :organizing "org"})

(def int->season
  {0 "spring"
   1 "summer"
   2 "fall"
   3 "winter"})

(def first-syllable
  ["Il" "Ol" "Ib" "Ak"
   "Li" "El" "Et" "Uk"
   "Al" "At" "Im" "Ip"])

(def second-syllable
  ["Ba" "So" "Po" "Ma"
   "Na" "Mi" "Si" "Pa"
   "Zo" "Ze" "Ki" "Gi"])

(defn gen-name []
  (string/join "-" [(rand-nth first-syllable)
                    (rand-nth second-syllable)]))

(s/def ::name string?)

(s/fdef gen-name
  :args (s/cat)
  :ret ::name
  :fn (fn [{:keys [ret]}]
        (re-matches #"\w{2}-\w{2}" ret)))

(s/def ::born (s/int-in -10000 10000))
(s/def ::passions (s/coll-of ::skill
                             :kind set?
                             :min-count 0
                             :max-count (inc max-passions)))
(s/def ::skill skills)
(s/def ::skills (s/map-of ::skill (s/int-in 0 (inc max-skill))))
(s/def ::uses (s/coll-of ::skill))
(s/def ::trait traits)
(s/def ::traits (s/coll-of ::trait :kind set?))
(s/def ::fulfillment (s/int-in 0 (+ 1 max-fulfillment)))

(defn inc-some-skill [skills*]
  (let [skill (rand-nth (vec skills))
        rank (get skills* skill 0)]
    (if (= rank max-skill)
      (if (= max-skill (reduce min (vals skills*)))
        skills*
        (inc-some-skill skills*))
      (assoc skills* skill (inc rank)))))

(s/fdef inc-some-skill
  :args (s/cat :skills ::skills)
  :ret ::skills)

(defn get-age [{:keys [month]} {:keys [born]}]
  (int (/ (- month born) 12)))

(s/fdef get-age
  :args (s/cat :herd (s/keys :req-un [::month])
               :individual (s/keys :req-un [::born]))
  :ret int?)

(defn becomes-passionate?
  [used {:keys [passions]}]
  (when (> max-passions (count passions))
    (let [candidates (filter (partial (complement contains?) passions) used)]
      (when (seq candidates)
        (let [chance (rand-int (int (* passion-rate (count candidates))))]
          (when (< chance (count candidates))
            (nth candidates chance)))))))

(s/fdef becomes-passionate?
  :args (s/cat :used ::uses
               :individual (s/keys :req-un [::passions]))
  :ret (s/nilable ::skill))

(defn age-individual
  [herd individual]
  (let [age (get-age herd individual)
        birthday? (= 0 (rem (- (:month herd)
                               (:born individual))
                            12))
        quintile-bday? (and birthday?
                            (= 0 (rem age 5)))
        gain-passion? (and quintile-bday?
                           (> (rand-int 3) 0))
        skill (when gain-passion?
                (becomes-passionate? skills individual))]
    (cond-> individual
      quintile-bday?
      (update :skills inc-some-skill)
      skill
      (update :passions conj skill))))

(defn gen-baby
  [born]
  {:name (gen-name)
   :born born
   :fulfillment (+ 40 (rand-int 21))
   :traits (set (take 1 (shuffle (vec positive-traits))))
   :passions #{}
   :skills (reduce
            (fn [skills* skill]
              (assoc skills* skill 0))
            {}
            skills)})

(defn gen-individual
  [{:keys [month]} age-in-months]
  (let [born (- month age-in-months)
        individual (gen-baby born)]
    (reduce
     (fn [individual i]
       (let [month* (+ born i)]
         (age-individual {:month month*} individual)))
     individual
     (range age-in-months))))

(defn gen-adult
  [herd]
  (let [age (+ (* 12 adulthood)
               (rand-int (* 12 (- max-age adulthood))))]
    (gen-individual herd age)))

(s/def ::individual
  (s/with-gen
    (s/keys :req-un [::name
                     ::born
                     ::traits
                     ::passions
                     ::skills
                     ::fulfillment])
    #(g/fmap
      (fn [age] (gen-individual {:month 0} age))
      (s/gen (s/int-in 0 (rand-int (* 12 max-age)))))))

(s/fdef gen-baby
  :args (s/cat :born ::born)
  :ret ::individual)

(s/fdef age-individual
  :args (s/cat :herd (s/keys :req-un [::month])
               :individual ::individual)
  :ret ::individual)

(s/fdef gen-individual
  :args (s/cat :herd (s/keys :req-un [::month])
               :age (s/int-in 1 (* 12 max-age)))
  :ret ::individual)

(s/fdef gen-adult
  :args (s/cat :herd (s/keys :req-un [::month]))
  :ret ::individual)

(s/def ::individuals (s/coll-of ::individual
                                :min-count 1
                                :max-count 1000))

(defn gen-individuals [herd n]
  (for [_ (range n)
        :let [age (rand-int (* 12 max-age))]]
    (gen-individual herd age)))

(s/fdef gen-individuals
  :args (s/cat :herd (s/keys :req-un [::month])
               :n (s/int-in 1 max-age))
  :ret ::individuals)

(s/def ::ethos (s/coll-of ::skill :kind set? :count 2))
(s/def ::syndicate ::ethos)
(s/def ::syndicates (s/coll-of ::syndicate :kind set?))

(defn syndicate-name [ethos]
  (as-> (map skill->shortname ethos) $
    (vec $)
    (conj $ "syn")
    (string/join "-" $)))

(s/fdef syndicate-name
  :args (s/cat :ethos ::ethos)
  :ret (s/and ::name
              #(string/ends-with? % "-syn")))

(defn calculate-vote [individual skill]
  (let [rank (get-in individual [:skills skill] 0)]
    (if (contains? (:passions individual) skill)
      (* rank 2)
      rank)))

(s/fdef calculate-vote
  :args (s/cat :individual (s/keys :req-un [::skills
                                            ::passions])
               :skill ::skill)
  :ret nat-int?)

(defn tally-votes [individuals]
  (->> individuals
       (map
        (fn [individual]
          (reduce
           (fn [all skill]
             (assoc all skill
                    (calculate-vote individual skill)))
           {}
           skills)))
       (reduce
        (fn [votes vote]
          (for [[skill value] votes]
            [skill (+ value (get vote skill 0))]))
        (for [skill skills]
          [skill 0]))
       (sort-by second >)))

(s/fdef tally-votes
  :args (s/cat :individuals (s/coll-of
                             (s/keys :req-un [::skills
                                              ::passions])))
  :ret (s/coll-of (s/tuple ::skill nat-int?)))

(defn rank-candidates [votes]
  (let [leader (-> votes first first)]
    (if-let [runner (-> votes second first)]
      (if (not= leader runner)
        (conj (lazy-seq
               (rank-candidates (rest votes)))
              #{leader runner})
        [])
      [])))

(s/fdef rank-candidates
  :args (s/cat :votes (s/coll-of (s/tuple ::skill nat-int?)))
  :ret (s/coll-of ::syndicate))

(defn select-candidate [syndicates candidates]
  (if (contains? syndicates (first candidates))
    (select-candidate syndicates (rest candidates))
    (first candidates)))

(s/fdef select-candidate
  :args (s/cat :herd ::herd
               :candidates (s/coll-of ::syndicate))
  :ret (s/nilable ::syndicate))

(defn add-syndicate [{:keys [individuals syndicates] :as herd}]
  (let [votes (tally-votes individuals)
        candidates (rank-candidates votes)]
    (if-let [candidate (select-candidate syndicates candidates)]
      (update herd :syndicates conj candidate)
      herd))) ; do not modify herd if there is no valid candidate

(s/fdef add-syndicate
  :args (s/cat :herd (s/keys :req-un [::individuals
                                      ::syndicates]))
  :ret (s/keys :req-un [::syndicates]))

(defn remove-syndicate [herd]
  (update herd :syndicates (comp set rest)))

(s/fdef remove-syndicate
  :args (s/cat :herd (s/keys :req-un [::syndicates]))
  :ret (s/keys :req-un [::syndicates]))

(s/def ::terrain terrains)
(s/def ::building buildings)
(s/def ::infra (s/coll-of ::building :kind set?))
(s/def ::nutrient (s/int-in 0 4))
(s/def ::n ::nutrient)
(s/def ::k ::nutrient)
(s/def ::p ::nutrient)
(s/def ::crop (s/nilable crops))
(s/def ::wild? boolean?)
(s/def ::ready? boolean?)
(s/def ::flora (s/int-in 0 5))
(s/def ::depleted? boolean?)

(defn name-location [terrain]
  (let [prefix (string/join
                "-"
                (for [_ (range (inc (rand-int 2)))]
                  (rand-nth location-names)))]
    (str prefix " " (string/capitalize (name terrain)))))

(defn init-location
  ([]
   (init-location (rand-nth (seq terrains))))
  ([terrain]
   (let [name* (name-location terrain)]
     (case terrain
       :plains
       {:name name*
        :terrain :plains
        :infra #{}
        :n 2
        :k 2
        :p 2
        :crop nil
        :wild? false
        :ready? false}
       :forest
       {:name name*
        :terrain :forest
        :infra #{}
        :flora 1
        :depleted? false}
       :mountain
       {:name name*
        :terrain :mountain
        :infra #{}}
       :steppe
       {:name name*
        :terrain :steppe}
       :swamp
       {:name name*
        :terrain :swamp
        :infra #{}
        :depleted? false}
       :jungle
       {:name name*
        :terrain :jungle
        :infra #{}}))))

(s/def ::location
  (s/with-gen
    (s/and
     (s/keys :req-un [::terrain
                      ::name])
     (s/or
      :plains (s/keys :req-un [::infra
                               ::n
                               ::k
                               ::p
                               ::crop
                               ::wild?
                               ::ready?
                               ::stores])
      :forest (s/keys :req-un [::infra
                               ::flora
                               ::depleted?
                               ::stores])
      :swamp (s/keys :req-un [::infra
                              ::depleted?
                              ::stores])
      :basic  (s/keys :req-un [::infra
                               ::stores])
      :shortcut (s/keys :req-un [])))
    #(g/fmap init-location
             (s/gen terrains))))

(s/fdef init-location
  :args (s/cat :terrain terrains)
  :ret ::location)

(s/def ::resource resources)
(s/def ::stores (s/map-of ::resource nat-int?))
(s/def ::locations (s/coll-of ::location :min-count 1))
(s/def ::path (s/coll-of ::locations
                         :kind vector?
                         :min-count 1
                         :max-count 12))
(s/def ::hunger (s/int-in 0 (+ 1 max-hunger)))
(s/def ::sickness (s/int-in 0 10000))
(s/def ::index nat-int?)
(s/def ::month (s/and nat-int? (s/int-in 0 10000)))

(defn gen-herd
  ([]
   (gen-herd
    (rand-nth herd-names)
    {:hunger 0
     :sickness 0
     :month 0}))
  ([name* {:keys [hunger sickness month]
           :or {hunger 0
                sickness 0
                month 0}}]
   (let [herd {:name name*
               :hunger hunger
               :sickness sickness
               :month month}
         individuals (gen-individuals herd (+ 40 (rand-int 20)))
         {:keys [syndicates]}
         (-> {:individuals individuals
              :syndicates #{}}
             (update :syndicates conj
                     (set (take 2 (shuffle (vec skills)))))
             add-syndicate)]
     (gen-herd individuals syndicates herd)))
  ([individuals syndicates base-herd]
   (merge base-herd
          {:individuals individuals
           :syndicates syndicates
           :stores (reduce
                    (fn [all resource]
                      (assoc all resource 0))
                    {}
                    resources)
           :index 0
           :path [[(init-location :plains)]
                  [(init-location :forest)]
                  [(init-location :mountain)]
                  [(init-location :steppe)]
                  [(init-location :swamp)]
                  [(init-location :jungle)]]})))

(s/def ::herd
  (s/with-gen
    (s/keys :req-un [::name
                     ::individuals
                     ::syndicates
                     ::stores
                     ::hunger
                     ::sickness
                     ::index
                     ::month
                     ::path])
    #(g/fmap (fn [[individuals syndicates path stores hunger month sickness]]
               {:individuals individuals
                :syndicates syndicates
                :stores stores
                :hunger hunger
                :sickness (min sickness (count individuals))
                :index 0
                :month month
                :path path})
             (g/tuple
              (s/gen ::individuals)
              (s/gen ::syndicates)
              (s/gen ::path)
              (s/gen ::stores)
              (s/gen ::hunger)
              (s/gen ::month)
              (s/gen ::sickness)))))

(s/fdef gen-herd
  :args (s/alt :basic
               (s/cat)
               :minimal
               (s/cat :herd
                      (s/keys :opt-un [::hunger
                                       ::sickness
                                       ::month]))
               :full
               (s/cat :individuals ::individuals
                      :syndicates ::syndicates
                      :herd
                      (s/keys :opt-un [::hunger
                                       ::sickness
                                       ::month])))
  :ret ::herd)

(defn current-location
  [herd]
  (get-in herd [:path 0 (:index herd)]))

(s/fdef current-location
  :args (s/cat :herd ::herd)
  :ret ::location)

(defn assoc-location
  [herd location]
  (assoc-in herd [:path 0 (:index herd)] location))

(s/fdef assoc-location
  :args (s/cat :herd ::herd
               :location ::location)
  :ret ::herd)

(defn shift-population
  [{:keys [hunger sickness] :as herd}]
  (let [population (-> herd :individuals count)
        stages (-> herd :path count)
        optimal (int (* optimal-pops-per-stage
                        stages
                        (- 1 (/ hunger max-hunger))
                        (- 1 (/ sickness population))))
        delta (- optimal population)
        n (inc (Math/abs (int (/ delta pop-shift-per-delta))))]
    (if (> delta 0)
      [(rand-int n) (rand-int 2)]
      [(rand-int 2) (rand-int n)])))

(s/fdef shift-population
  :args (s/cat :herd ::herd)
  :ret (s/tuple nat-int? nat-int?))

(defn calc-pop-changes
  [herd journeyings deaths]
  [(vec (for [_ (range journeyings)] (gen-adult herd)))
   (set (take deaths (shuffle (:individuals herd))))])

(s/fdef calc-pop-changes
  :args (s/cat :herd ::herd
               :journeyings nat-int?
               :deaths nat-int?)
  :ret (s/tuple ::individuals ::individuals))

(defn apply-pop-changes
  [herd new-adults new-dead]
  (cond-> herd
    (seq new-adults)
    (update :individuals
            (comp vec concat) new-adults)
    (seq new-dead)
    (update :individuals
            (fn [individuals]
              (->> individuals
                   (remove #(contains? new-dead %))
                   vec)))))

(s/fdef apply-pop-changes
  :args (s/cat :herd ::herd
               :new-adults ::individuals
               :new-dead ::individuals)
  :ret ::herd)

(defn local-infra? [herd infra]
  (let [location (current-location herd)]
    (contains? (:infra location) infra)))

(s/fdef local-infra?
  :args (s/cat :herd ::herd
               :infra buildings)
  :ret boolean?)

(s/def ::season (s/int-in 0 4))

(defn get-season [{:keys [month]}]
  (int (/ (rem month 12) 3)))

(s/fdef get-season
  :args (s/cat :herd (s/keys :req-un [::month]))
  :ret ::season)

(defn individual-skill
  [individual skill]
  (* (get-in individual [:skills skill] 0)
     (/ (:fulfillment individual) max-fulfillment)))

(s/fdef individual-skill
  :args (s/cat :individual ::individual
               :skill skills)
  :ret number?)

(defn calc-sickness-penalty [population sickness]
  (-> (/ sickness population)
      (max 0)
      (min 1)))

(s/fdef calc-sickness-penalty
  :args (s/cat :population nat-int?
               :sickness nat-int?)
  :ret (s/and number? #(>= 1 % 0)))

(defn collective-skill
  [{:keys [individuals syndicates hunger sickness]} skill]
  (let [individuals-bonus
        (reduce
         #(+ %1 (individual-skill %2 skill))
         0
         individuals)
        syndicate-bonus
        (-> (count (filter skill syndicates))
            (* 1/2)
            (+ 1/2))
        hunger-penalty
        (- 1 (/ hunger max-hunger))
        sickness-penalty
        (- 1 (calc-sickness-penalty (count individuals) sickness))]
    (int (* individuals-bonus
            syndicate-bonus
            hunger-penalty
            sickness-penalty))))

(s/fdef collective-skill
  :args (s/cat :herd ::herd
               :skill ::skill)
  :ret nat-int?)

(defn collective-labor
  [herd skill]
  (+ (collective-skill herd skill)
     (count (:individuals herd))))

(s/fdef collective-labor
  :args (s/cat :herd ::herd
               :skill ::skill)
  :ret nat-int?)

(defn carry-limit
  [herd]
  (* (collective-labor herd :athletics)
     carry-modifier))

(s/fdef carry-limit
  :args (s/cat :herd ::herd)
  :ret nat-int?)

(defn must-leave-some?
  [herd]
  (let [total (->> carryable
                   (map #(get-in herd [:stores %] 0))
                   (reduce + 0))
        limit (carry-limit herd)]
    (< limit total)))

(defn keep-and-leave-behind
  [herd carrying]
  (let [leaving (merge-with - (:stores herd) carrying)]
    (-> (update herd :stores merge carrying)
        (update-in [:path 0 (:index herd) :stores]
                   (partial merge-with +) leaving))))

(s/fdef keep-and-leave-behind
  :args (s/with-gen
          (s/cat :herd ::herd
                 :carrying ::stores)
          #(g/fmap (fn [herd]
                     [herd
                      (reduce
                       (fn [all [resource amount]]
                         (assoc all resource (rand-int amount)))
                       {}
                       (:stores herd))])
                   (s/gen ::herd)))
  :ret ::herd)

(defn calc-food-need [population]
  (int (* hunger-rate population)))

(defn calc-meds-need [population]
  (int (* sickness-rate population)))

(defn apply-herd-upkeep
  [{:keys [individuals stores] :as herd}]
  (let [{:keys [food rations poultices]} stores
        {infra :infra} (current-location herd)
        temple? (contains? infra :temple)
        fulfillment-change (if temple?
                             0
                             (- fulfillment-decay))
        population (count individuals)
        food-need (calc-food-need population)
        food-deficit (max 0 (- food-need food))
        rations-deficit (- rations food-deficit)
        hunger? (and (> food-deficit 0) (> 0 rations-deficit))
        poultice-need (calc-meds-need population)
        poultice-deficit (max 0 (- poultice-need poultices))
        sickness? (< 0 poultice-deficit)]
    (-> herd
        (assoc-in [:stores :food]
                  (max 0 (- food food-need)))
        (assoc-in [:stores :rations]
                  (max 0 (- rations food-deficit)))
        (assoc-in [:stores :poultices]
                  (max 0 (- poultices poultice-need)))
        (assoc :individuals
               (map #(update % :fulfillment + fulfillment-change)
                    individuals))
        (cond->
         hunger? (update :hunger inc)
         (not hunger?) (assoc :hunger 0)
         sickness? (assoc :sickness poultice-deficit)
         (not sickness?) (assoc :sickness 0)))))

(s/fdef apply-herd-upkeep
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn map-locations [f {:keys [path] :as herd}]
  (assoc herd :path
         (vec
          (for [stage path]
            (vec
             (for [location stage]
               (f location)))))))

(s/fdef map-locations
  :args (s/cat :f (s/fspec
                   :args (s/cat :location ::location)
                   :ret ::location)
               :herd (s/keys :req-un [::path]))
  :ret (s/keys :req-un [::path]))

(defn has-lost? [herd]
  (= max-hunger (:hunger herd)))

(s/fdef has-lost?
  :args (s/cat :herd (s/keys :req-un [::hunger]))
  :ret boolean?)

(defn next-location
  [{:keys [path] :as herd} index]
  (assoc herd
         :index index
         :path (vec (concat (rest path)
                            [(first path)]))))

(s/fdef next-location
  :args (s/cat :herd (s/keys :req-un [::path
                                      ::index])
               :index ::index)
  :ret (s/keys :req-un [::path
                        ::index]))

(defn crop-info [crop]
  (let [nutrients (crop->nutrients crop)]
    [nutrients
     (if (= 2 (count nutrients))
       1
       2)]))

(s/fdef crop-info
  :args (s/cat :crop crops)
  :ret (s/tuple (s/coll-of nutrients)
                (s/int-in 2 4)))

(defn update-nutrients
  [nutrients amount location]
  (reduce
   (fn [location nutrient]
     (-> location
         (update nutrient - amount)
         (update nutrient max 0)
         (update nutrient min 2)))
   location
   nutrients))

(s/fdef update-nutrients
  :args (s/cat :nutrients (s/coll-of nutrients :kind set?)
               :amount int?
               :location (s/with-gen
                           ::location
                           #(g/return (init-location :plains))))
  :ret ::location)

(defn enter-spring
  [location]
  (cond
    (= :forest (:terrain location))
    (cond-> (assoc location :depleted? false)
      (> 2 (:flora location))
      (update :flora inc))
    (= :swamp (:terrain location))
    (assoc location :depleted? false)
    :else
    location))

(s/fdef enter-spring
  :args (s/cat :location ::location)
  :ret ::location)

(defn enter-summer
  [location]
  (if (= :plains (:terrain location))
    (cond
      ;; plains is fallow
      ;; restore one of each nutrient
      (nil? (:crop location))
      (update-nutrients nutrients -1 location)
      ;; crop is ready for harvest
      (and (some? (:crop location))
           (false? (:ready? location))
           (false? (:wild? location)))
      (let [nutrients* (crop->nutrients (:crop location))
            unused-nutrients (filter (complement nutrients*) nutrients)]
        ;; unused nutrients regrow
        (as-> location $
          (update-nutrients unused-nutrients -1 $)
          (assoc $ :ready? true)))
      ;; crop goes wild
      (and (true? (:ready? location))
           (false? (:wild? location)))
      (let [[nutrients amount] (crop-info (:crop location))]
        (-> (update-nutrients nutrients amount location)
            (assoc :wild? true
                   :ready? false)))
      ;; crop stays wild
      (true? (:wild? location))
      (let [[nutrients amount] (crop-info (:crop location))]
        (update-nutrients nutrients amount location))
      :else
      location)
    location))

(s/fdef enter-summer
  :args (s/cat :location ::location)
  :ret ::location)

(defn enter-fall
  [location]
  location)

(s/fdef enter-fall
  :args (s/cat :location ::location)
  :ret ::location)

(defn enter-winter
  [location]
  (if (= :plains (:terrain location))
    (if (and (some? (:crop location))
             (true? (:ready? location))
             (false? (:wild? location)))
      ;; crop goes wild in winter
      (assoc location
             :wild? true
             :ready? false)
      location)
    location))

(s/fdef enter-winter
  :args (s/cat :location ::location)
  :ret ::location)

(defn inc-month [herd]
  (let [old-season (get-season herd)
        herd*
        (-> herd
            (update :month inc)
            (update :individuals
                    (partial map (partial age-individual herd))))
        new-season (get-season herd*)]
    (if (not= new-season old-season)
      (case new-season
        ;; spring
        0 (map-locations enter-spring herd*)
        ;; summer
        1 (map-locations enter-summer herd*)
        ;; fall
        2 (map-locations enter-fall herd*)
        ;; winter
        3 (map-locations enter-winter herd*))
      herd*)))

(s/fdef inc-month
  :args (s/cat :herd ::herd)
  :ret ::herd)

(s/def ::uses (s/coll-of skills :distinct true))

(defn gains-experience?
  [used syndicates {:keys [passions skills]}]
  (let [used* (filter #(> max-skill (get skills %)) used)
        syndicate-counts (frequencies (reduce into syndicates []))
        syndicate-bonus #(get syndicate-counts % 0)
        passion-bonus #(if (contains? passions %) 1 0)]
    (first
     (filter
      (fn [skill]
        (let [bonus (+ 1
                       (syndicate-bonus skill)
                       (passion-bonus skill))
              roll (rand-int experience-rate)]
          (>= bonus roll)))
      used*))))

(s/fdef gains-experience?
  :args (s/cat :used ::uses
               :syndicates ::syndicates
               :individual ::individual)
  :ret (s/nilable ::skill))

(defn inc-fulfillment [individual amount]
  (-> individual
      (update :fulfillment + amount)
      (update :fulfillment min max-fulfillment)
      (update :fulfillment max 0)))

(s/fdef inc-fulfillment
  :args (s/cat :individual ::individual
               :amount (s/int-in -100 100))
  :ret ::individual)

(defn update-individual-fulfillment
  [uses {:keys [passions] :as individual}]
  (if (seq uses)
    (let [amount (int (/ fulfillment-rate (count uses)))
          overlap (-> (partial contains? passions)
                      (map uses)
                      frequencies
                      (get true 0))]
      (inc-fulfillment individual (* amount overlap)))
    individual))

(s/fdef update-individual-fulfillment
  :args (s/cat :uses ::uses
               :individual ::individual)
  :ret ::individual)

(defn update-individual
  [herd individual f & args]
  (update herd :individuals
          (fn [individuals]
            (map
             (fn [individual*]
               (if (= individual individual*)
                 (apply f individual args)
                 individual*))
             individuals))))

(s/fdef update-individual
  :args (s/cat :herd ::herd
               :individual ::individual
               :f ifn?
               :rest (s/* any?))
  :ret ::herd)

(defn consolidate-stores
  [herd]
  (let [location (current-location herd)
        stores (merge-with +
                           (:stores herd)
                           (:stores location {}))]
    (-> herd
        (assoc :stores stores)
        (assoc-location (assoc location :stores {})))))

(s/fdef consolidate-stores
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn should-add-syndicate?
  [herd]
  (let [n (count (:syndicates herd))
        x (* org-threshold (Math/pow org-multiplier n))
        skill-amount (collective-skill herd :organizing)]
    (> skill-amount x)))

(s/fdef should-add-syndicate?
  :args (s/cat :herd ::herd)
  :ret boolean?)

(s/def ::new-adults (s/coll-of ::individual))
(s/def ::new-dead (s/coll-of ::individual))
(s/def :info/event (s/nilable string?))
(s/def :info/projects (s/coll-of string?))
(s/def :info/dreams (s/coll-of string?))
;; month info. refreshes after month ends
(s/def ::info
  (s/keys :req-un [::new-adults
                   ::new-dead
                   :info/event
                   :info/projects
                   :info/dreams]))

(defn fresh-info
  []
  {:new-adults []
   :new-dead []
   :event nil
   :projects []
   :dreams []})

(s/fdef fresh-info
  :args (s/cat)
  :ret ::info)

(defn perish [info herd individual]
  [(update info :new-dead conj individual)
   (update herd :individuals
           #(vec (remove (partial = individual) %)))])

(s/fdef perish
  :args (s/cat :info ::info
               :herd ::herd
               :individual ::individual)
  :ret (s/tuple ::info ::herd))

(s/def ::min-passions (s/int-in 0 4))
(s/def ::max-passions (s/int-in 0 4))
(s/def ::age (s/int-in adulthood max-age))
(s/def ::min-fulfillment (s/int-in 0 max-fulfillment))
(s/def ::max-fulfillment (s/int-in 0 max-fulfillment))
(s/def ::min-age ::age)
(s/def ::max-age ::age)
(s/def ::character (s/keys :opt-un [::traits
                                    ::skills
                                    ::min-fulfillment
                                    ::max-fulfillment
                                    ::min-passions
                                    ::max-passions
                                    ::min-age
                                    ::max-age]))
(s/def ::select (s/coll-of ::character))

(defn match-select [herd individual {:keys [traits
                                            skills
                                            min-fulfillment
                                            max-fulfillment
                                            min-passions
                                            max-passions
                                            min-age
                                            max-age]}]
  (and (if traits
         (every? some? (for [trait traits]
                         (-> individual :traits trait)))
         true)
       (if skills
         (every? true? (for [[skill value] skills]
                         (-> individual :skills skill (>= value))))
         true)
       (if min-passions
         (>= (count (:passions individual)) min-passions)
         true)
       (if max-passions
         (< (count (:passions individual)) max-passions)
         true)
       (let [age (get-age herd individual)]
         (and (if max-age
                (< age max-age)
                true)
              (if min-age
                (> age min-age)
                true)))
       (let [fulfillment (:fulfillment individual)]
         (and (if min-fulfillment
                (>= fulfillment min-fulfillment)
                true)
              (if max-fulfillment
                (< fulfillment max-fulfillment)
                true)))))

(s/fdef match-select
  :args (s/cat :herd ::herd
               :individual ::individual
               :select ::select)
  :ret boolean?)

(defn find-character [herd character-select]
  (first
   (for [individual (:individuals herd)
         :when (match-select herd individual character-select)]
     individual)))

(s/fdef find-character
  :args (s/cat :herd ::herd
               :character-select ::character)
  :ret (s/nilable ::individual))

(defn get-cast [herd event-or-dream]
  (seq
   (for [character-select (:select event-or-dream [])
         :let [character (find-character herd character-select)]
         :when (some? character)]
     character)))

(s/fdef get-cast
  :args (s/cat :herd ::herd
               :event-or-dream
               (s/keys :req-un [::select]))
  :ret (s/coll-of (s/nilable ::individual)))

(defn herd-has-resource [herd resource n]
  (<= n (get-in herd [:stores resource] 0)))

(defn herd-has-skill [herd skill n]
  (<= n (collective-skill herd skill)))
