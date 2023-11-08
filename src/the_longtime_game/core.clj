(ns the-longtime-game.core
  (:require [clojure.spec.alpha :as s]
            [clojure.spec.gen.alpha :as g]
            [clojure.string :as string]))

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

(def buildings #{:atomic-reactor
                 :chargepot-generator
                 :eldermothertree
                 :flyer-market
                 :granary
                 :hospital
                 :kitchen
                 :lodge
                 :mag-forge
                 :mag-launchpad
                 :monsoon-bellows
                 :observatory
                 :quern-generator
                 :pluriversity
                 :port-cove
                 :quarry
                 :stadium
                 :stonetower-batteries
                 :temple
                 :wind-forge
                 :workshop})

(def early-contacts #{:auter
                      :harp
                      :felidar
                      :er-sol})

(def mid-contacts #{:dod
                    :saurek})

(def late-contacts #{:haroot
                     :rak
                     :dabulan})

(def contacts (reduce into #{} [early-contacts
                                mid-contacts
                                late-contacts]))

(def space-infra #{:probe
                   :station
                   :shipyard
                   :ringworld
                   :mobile-ringworld})

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
   "Iqun"
   "Ikoleb"
   "Tux"
   "M'enli"
   "Wa'ifcha"
   "Eu"
   "Hagra"
   "Gurip"
   "Eol"
   "Yut"
   "Uf'cha"])

(def herd-names
  ["They of One Thousand Oaks"
   "Kin of the Season-Wheel"
   "Brash-Mane Stampede"
   "They of Horn and Thorn"
   "Staid-Hoof Kith"
   "They of the Behooved Order"
   "They of the Free Herds"
   "They of the Coalition of Horns"
   "Blossom-Trailing Step"])

(def skill-ranks ["unfamiliar"
                  "novice"
                  "learned"
                  "adept"
                  "expert"
                  "virtuoso"])

(def max-age 50)
(def adulthood 20)
(def optimal-pops-per-stage 25)
(def max-hunger 4)
(def max-buildings 4)
(def max-skill (dec (count skill-ranks)))
(def max-fulfillment 100)
(def max-passions 3)
(def experience-rate 50)
(def passion-rate 10)
(def fulfillment-rate 2)
(def fulfillment-decay 1)
(def carry-modifier 3)
(def org-threshold 10)
(def org-multiplier 2)
(def hunger-rate 1/3)
(def sickness-rate 1/4)
(def contact-rate 2)
(def max-flora 4)
(def giftright-rate 20)
(def vote-weight 2)

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
(s/def ::age int?)

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
(s/def ::uses (s/coll-of skills :distinct true))
(s/def ::trait traits)
(s/def ::traits (s/coll-of ::trait :kind set?))
(s/def ::fulfillment (s/int-in 0 (inc max-fulfillment)))

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
  :ret ::age)

(defn becomes-passionate?
  [used {:keys [passions]}]
  (when (> max-passions (count passions))
    (when-let [candidates (seq (filter #(false? (contains? passions %)) used))]
      (when (zero? (rand-int passion-rate))
        (rand-nth candidates)))))

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
                           (= (rand-int 3) 0))
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
      (s/gen (s/int-in 0 (inc (rand-int (* 12 max-age))))))))

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
  (let [weight (inc (get-in individual [:skills skill] 0))]
    (if (contains? (:passions individual) skill)
      (* weight vote-weight)
      weight)))

(s/fdef calculate-vote
  :args (s/cat :individual (s/keys :req-un [::skills
                                            ::passions])
               :skill ::skill)
  :ret nat-int?)

(defn tally-votes [individuals]
  (->> (map
        #(->> skills
              (reduce
               (fn [all skill]
                 (assoc all skill
                        (calculate-vote % skill)))
               {})
              (sort-by second >)
              (take 3))
        individuals)
       (reduce concat [])
       (reduce
        (fn [all [skill vote]]
          (update all skill + vote))
        (reduce #(assoc %1 %2 0) {} skills))
       (sort-by second >)
       (map first)))

(s/fdef tally-votes
  :args (s/cat :individuals (s/coll-of
                             (s/keys :req-un [::skills
                                              ::passions])))
  :ret (s/coll-of ::skill :distinct true))

(defn rank-candidates [votes]
  (let [leader (first votes)]
    (if-let [runner (second votes)]
      (cons
       #{leader runner}
       (lazy-seq
        (rank-candidates (rest votes))))
      [])))

(s/fdef rank-candidates
  :args (s/cat :votes (s/coll-of ::skill :distinct true))
  :ret (s/coll-of ::syndicate))

(defn select-candidate [syndicates candidates]
  (if (contains? syndicates (first candidates))
    (select-candidate syndicates (rest candidates))
    (first candidates)))

(s/fdef select-candidate
  :args (s/cat :syndicates ::syndicates
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
(s/def ::flora (s/int-in 0 (inc max-flora)))
(s/def ::depleted? boolean?)
(s/def ::power nat-int?)

(defn name-location [terrain]
  (let [prefix (string/join
                "-"
                (for [_ (range (inc (rand-int 2)))]
                  (rand-nth location-names)))]
    (str prefix " " (string/capitalize (name terrain)))))

(defn init-location
  [terrain]
  (let [name* (name-location terrain)
        stores (if (not= terrain :steppe)
                 (reduce #(assoc %1 %2 0) {} resources)
                 {})]
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
       :ready? false
       :power 0
       :stores stores}
      :forest
      {:name name*
       :terrain :forest
       :infra #{}
       :flora 1
       :depleted? false
       :power 0
       :stores stores}
      :mountain
      {:name name*
       :terrain :mountain
       :infra #{}
       :power 0
       :stores stores}
      :steppe
      {:name name*
       :terrain :steppe}
      :swamp
      {:name name*
       :terrain :swamp
       :infra #{}
       :depleted? false
       :power 0
       :stores stores}
      :jungle
      {:name name*
       :terrain :jungle
       :infra #{}
       :power 0
       :stores stores})))

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
                               ::stores
                               ::power])
      :forest (s/keys :req-un [::infra
                               ::flora
                               ::depleted?
                               ::stores
                               ::power])
      :swamp (s/keys :req-un [::infra
                              ::depleted?
                              ::stores
                               ::power])
      :basic  (s/keys :req-un [::infra
                               ::stores
                               ::power])
      :shortcut (s/keys :req-un [])))
    #(g/fmap init-location
             (s/gen terrains))))

(s/fdef init-location
  :args (s/cat :terrain terrains)
  :ret ::location)

(s/def ::spirit string?)
(s/def ::new-adults (s/coll-of ::individual))
(s/def ::new-dead (s/coll-of ::individual))
(s/def ::projects (s/coll-of keyword?))
(s/def ::contact contacts)
(s/def ::contacts (s/coll-of ::contact :kind set?))
(s/def ::space-infra space-infra)
(s/def ::space (s/coll-of ::space-infra :kind set?))
(s/def ::resource resources)
(s/def ::stores (s/map-of ::resource nat-int?))
(s/def ::locations (s/coll-of ::location :min-count 1))
(s/def ::path (s/coll-of ::locations
                         :kind vector?
                         :min-count 1
                         :max-count 12))
(s/def ::hunger (s/int-in 0 (inc max-hunger)))
(s/def ::sickness nat-int?)
(s/def ::index nat-int?)
(s/def ::month nat-int?)

(defn gen-herd
  ([& {:keys [spirit name hunger sickness month individuals syndicates]
       :or {spirit "Longtime"
            name (rand-nth herd-names)
            hunger 0
            sickness 0
            month 0}}]
   (let [herd {:name name
               :spirit spirit
               :hunger hunger
               :sickness sickness
               :month month}
         individuals (or individuals
                         (for [_ (range (+ 40 (rand-int 20)))]
                           (gen-adult herd)))
         syndicates (or syndicates
                        (-> {:individuals individuals
                             :syndicates #{}}
                            (update :syndicates conj
                                    (set (take 2 (shuffle (vec skills)))))
                            add-syndicate
                            :syndicates))]
     (merge herd
            {:individuals individuals
             :syndicates syndicates
             :stores (reduce
                      (fn [all resource]
                        (assoc all resource 0))
                      {}
                      resources)
             :new-adults []
             :new-dead []
             :projects []
             :contacts #{}
             :space #{}
             :index 0
             :path [[(init-location :plains)]
                    [(init-location :forest)]
                    [(init-location :mountain)]
                    [(init-location :steppe)]]}))))

(s/def ::herd
  (s/with-gen
    (s/keys :req-un [::name
                     ::spirit
                     ::new-adults
                     ::new-dead
                     ::projects
                     ::contacts
                     ::space
                     ::individuals
                     ::syndicates
                     ::stores
                     ::hunger
                     ::sickness
                     ::index
                     ::month
                     ::path])
    (let [gen-herd* (memoize gen-herd)]
      #(g/fmap (fn [_] (gen-herd*))
               (g/return 0)))))

(s/fdef gen-herd
  :args (s/keys* :opt-un [::name
                          ::hunger
                          ::sickness
                          ::month
                          ::individuals
                          ::syndicates])
  :ret ::herd)

(defn update-individuals
  [herd f & args]
  (update herd :individuals
          (fn [individuals]
            (vec (map #(apply f % args) individuals)))))

(s/fdef update-individuals
  :args (s/cat :herd ::herd
               :f (s/fspec
                   :args (s/cat :individual ::individual
                                :* (s/* any?))
                   :ret ::individual)
               :rest (s/* any?))
  :ret ::herd)

(defn update-individual
  [herd individual f & args]
  (update-individuals
   herd
   #(if (= % individual)
      (apply f % args)
      %)))

(s/fdef update-individual
  :args (s/cat :herd ::herd
               :individual ::individual
               :f (s/fspec
                   :args (s/cat :individual ::individual
                                :* (s/* any?))
                   :ret ::individual)
               :rest (s/* any?))
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

(defn update-current-location
  [herd f & args]
  (let [location (current-location herd)
        location* (apply f location args)]
    (assoc-location herd location*)))

(s/fdef update-current-location
  :args (s/cat :herd ::herd
               :f (s/fspec
                   :args (s/cat :location ::location
                                :* (s/* any?))
                   :ret ::location)
               :rest (s/* any?))
  :ret ::herd)

(defn calc-optimal-population
  [{:keys [hunger sickness path individuals]}]
  (int (* optimal-pops-per-stage
          (count path)
          (- 1 (/ hunger max-hunger))
          (- 1 (/ sickness (count individuals))))))

(s/fdef calc-optimal-population
  :args (s/cat :herd ::herd)
  :ret nat-int?)

(defn shift-population
  [herd]
  (let [population (-> herd :individuals count)
        optimal (calc-optimal-population herd)
        delta (- optimal population)
        n (inc (int (Math/abs (Math/log delta))))]
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
    (seq new-dead)
    (update :individuals
            #(vec (remove (partial contains? new-dead) %)))
    (seq new-adults)
    (update :individuals
            (comp vec concat) new-adults)))

(s/fdef apply-pop-changes
  :args (s/cat :herd ::herd
               :new-adults ::individuals
               :new-dead ::individuals)
  :ret ::herd)

(defn perish [herd individual]
  (-> (update herd :new-dead conj individual)
      (update :individuals
              #(vec (remove (partial = individual) %)))))

(s/fdef perish
  :args (s/cat :herd ::herd
               :individual ::individual)
  :ret ::herd)

(defn begin-month
  [herd]
  (let [[journeyings deaths] (shift-population herd)
        [new-adults new-dead] (calc-pop-changes herd journeyings deaths)]
    (-> (apply-pop-changes herd new-adults new-dead)
        (assoc :new-adults new-adults
               :new-dead new-dead
               :event nil
               :projects []))))

(s/fdef begin-month
  :args (s/cat :herd ::herd)
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

(s/fdef must-leave-some?
  :args (s/cat :herd ::herd)
  :ret boolean?)

(defn keep-and-leave-behind
  [herd carrying]
  (let [leaving (merge-with - (:stores herd) carrying)]
    (-> (update herd :stores merge carrying)
        (update-current-location
         #(update % :stores (partial merge-with +) leaving)))))

(s/fdef keep-and-leave-behind
  :args (s/cat :herd ::herd
               :carrying ::stores)
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
         sickness? (update :sickness + poultice-deficit)
         (not sickness?) (assoc :sickness 0)))))

(s/fdef apply-herd-upkeep
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn map-locations
  [{:keys [path] :as herd} f & args]
  (assoc herd :path
         (vec
          (for [stage path]
            (vec
             (for [location stage]
               (apply f location args)))))))

(s/fdef map-locations
  :args (s/cat :herd (s/keys :req-un [::path])
               :f (s/fspec
                   :args (s/cat :location ::location)
                   :ret ::location))
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
                (s/int-in 1 3)))

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

(defn plains-enters-summer
  [location]
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
    ;; crop stays wild
    (true? (:wild? location))
    (let [[nutrients amount] (crop-info (:crop location))]
      (update-nutrients nutrients amount location))
    :else
    location))

(defn port-cove-giftright
  [location]
  (let [rate (/ 1 (+ giftright-rate (rand-int giftright-rate)))]
    (update location :stores
            (fn [stores]
              (reduce
               (fn [stores [resource amount]]
                 (assoc stores resource (int (* (inc rate) amount))))
               {}
               stores)))))

(defn enter-summer
  [location]
  (cond-> location
    (contains? (:infra location) :port-cove)
    port-cove-giftright
    (= :plains (:terrain location))
    plains-enters-summer
    (contains? (:infra location) :chargepot-generator)
    (update :power inc)))

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
  (cond
    (and (= :forest (:terrain location))
         (contains? (:infra location) :eldermothertree))
    (update location :flora (comp (partial min max-flora) inc))
    (= :plains (:terrain location))
    (if (and (some? (:crop location))
             (true? (:ready? location))
             (false? (:wild? location)))
      ;; crop goes wild in winter
      (assoc location
             :wild? true
             :ready? false)
      location)
    :else
    location))

(s/fdef enter-winter
  :args (s/cat :location ::location)
  :ret ::location)

(defn inc-atomic-reactors
  [location]
  (if (contains? (:infra location) :atomic-reactor)
    (update location :power inc)
    location))

(defn inc-season
  [herd old-season]
  (let [new-season (get-season herd)]
    (if (not= new-season old-season)
      (case new-season
        0 (map-locations herd enter-spring)
        1 (map-locations herd enter-summer)
        2 (map-locations herd enter-fall)
        3 (map-locations herd enter-winter))
      herd)))

(s/fdef inc-season
  :args (s/cat :herd ::herd
               :season ::season)
  :ret ::herd)

(defn age-individuals
  [herd]
  (update-individuals herd (partial age-individual herd)))

(s/fdef age-individuals
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn update-power
  [herd]
  (map-locations
   herd
   (fn [location]
     (cond-> location
       (not (contains? (:infra location) :stonetower-batteries))
       (assoc :power 0)
       (and (= 1 (get-season herd))
            (contains? (:infra location) :chargepot-generator))
       (update :power inc)))))

(defn end-month [herd]
  (let [old-season (get-season herd)]
    (-> herd
        (update :month inc)
        (inc-season old-season)
        age-individuals
        (map-locations inc-atomic-reactors)
        update-power)))

(s/fdef inc-month
  :args (s/cat :herd ::herd)
  :ret ::herd)

(defn gains-experience?
  [{:keys [syndicates] :as herd} used {:keys [passions skills]}]
  (let [used* (filter #(> max-skill (get skills %)) used)
        syndicate-counts (frequencies (reduce into syndicates []))
        syndicate-bonus #(get syndicate-counts % 0)
        passion-bonus #(if (contains? passions %) 2 0)
        versity-bonus (if (local-infra? herd :pluriversity) 2 0)]
    (first
     (filter
      (fn [skill]
        (let [bonus (+ 1 (syndicate-bonus skill) (passion-bonus skill) versity-bonus)
              roll (rand-int experience-rate)]
          (>= bonus roll)))
      used*))))

(s/fdef gains-experience?
  :args (s/cat :herd ::herd
               :used ::uses
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
    (let [amount (int (/ fulfillment-rate (count uses)))]
      (inc-fulfillment individual (reduce
                                   +
                                   0
                                   (for [used uses
                                         :when (contains? passions used)]
                                     amount))))
    individual))

(s/fdef update-individual-fulfillment
  :args (s/cat :uses ::uses
               :individual ::individual)
  :ret ::individual)

(defn consolidate-stores
  [herd]
  (let [location (current-location herd)
        stores (merge-with +
                           (:stores herd)
                           (:stores location {}))]
    (-> herd
        (assoc :stores stores)
        (update-current-location
         assoc :stores (reduce #(assoc %1 %2 0) {} resources)))))

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

(defn herd-has-resource? [herd resource n]
  (<= n (get-in herd [:stores resource] 0)))

(s/fdef herd-has-resource?
  :args (s/cat :herd ::herd
               :resource resources
               :n pos-int?)
  :ret boolean?)

(defn herd-has-skill? [herd skill n]
  (<= n (collective-skill herd skill)))

(s/fdef herd-has-skill?
  :args (s/cat :herd ::herd
               :skill skills
               :n pos-int?)
  :ret boolean?)

(defn count-infra
  [herd infra]
  (let [infra-count
        (for [stage (:path herd)]
          (for [location stage
                :when (contains? (:infra location) infra)]
            1))]
    (reduce (partial reduce +) 0 infra-count)))

(s/fdef count-infra
  :args (s/cat :herd ::herd
               :infra ::building)
  :ret nat-int?)

(defn new-contact?
  [herd]
  (let [n (count (:contacts herd))]
    (> (count-infra herd :lodge)
       (+ n contact-rate
          (Math/pow n contact-rate)))))

(s/fdef new-contact?
  :args (s/cat :herd ::herd)
  :ret boolean?)

;; 0 => 2
;; 1 => (1 + 2 + 1^2) => 4
;; 2 => (2 + 2 + 2^2) => 8
;; 3 => (2 + 2 + 3^2) => 13
;; 4 => (4 + 2 + 4^2) => 22
;; 5 => (7 + 25) => 32
;; 6 => (8 + 36) => 44
;; 7 => (9 + 49) => 58
;; 8 => (10 + 64) => 74
;; 9 => (11 + 81) => 92

(defn get-next-contact
  [herd]
  (let [n (count (:contacts herd))]
    (cond
      (< n (count early-contacts))
      (rand-nth (vec (reduce disj early-contacts (:contacts herd))))
      (< n (+ (count early-contacts)
              (count mid-contacts)))
      (rand-nth (vec (reduce disj mid-contacts (:contacts herd))))
      (< n (+ (count early-contacts)
              (count mid-contacts)
              (count late-contacts)))
      (rand-nth (vec (reduce disj late-contacts (:contacts herd)))))))

(s/fdef get-next-contact
  :args (s/cat :herd ::herd)
  :ret (s/nilable ::contact))

(defn herd-has-nutrition?
  [herd n]
  (>= (+ (get-in herd [:stores :food] 0)
         (get-in herd [:stores :rations] 0))
      (if (> 1 n 0)
        (int (* (count (:individuals herd)) n))
        n)))

(s/fdef herd-has-nutrition?
  :args (s/cat :herd ::herd
               :n number?)
  :ret boolean?)

(defn consume-nutrition
  [herd n]
  (let [n (if (< 0 n 1)
            (int (* (count (:individuals herd)) n))
            n)
        remaining-food (- (get-in herd [:stores :food] 0) n)
        remaining-rations
        (if (< remaining-food 0)
          (+ (get-in herd [:stores :rations] 0)
             remaining-food)
          (get-in herd [:stores :rations]))]
    (-> herd
        (assoc-in [:stores :food] (max 0 remaining-food))
        (assoc-in [:stores :rations] (max 0 remaining-rations)))))

(s/fdef consume-nutrition
  :args (s/cat :herd ::herd
               :n nat-int?)
  :ret ::herd)
