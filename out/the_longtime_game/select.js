// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('the_longtime_game.select');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('cljs.spec.gen.alpha');
goog.require('the_longtime_game.core');
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","skills","the-longtime-game.select/skills",938790306),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),new cljs.core.Symbol("cljs.core","nat-int?","cljs.core/nat-int?",-164364171,null)),cljs.spec.alpha.every_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),new cljs.core.Symbol(null,"nat-int?","nat-int?",-1879663400,null)),cljs.spec.alpha.tuple_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),new cljs.core.Symbol("cljs.core","nat-int?","cljs.core/nat-int?",-164364171,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),cljs.core.nat_int_QMARK_], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__371__auto__,v__372__auto__){
return cljs.core.nth.call(null,v__372__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),new cljs.core.Symbol("cljs.core","nat-int?","cljs.core/nat-int?",-164364171,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2736){
return cljs.core.map_QMARK_.call(null,G__2736);
})], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","contacts","the-longtime-game.select/contacts",330347830),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Keyword("the-longtime-game.core","contact","the-longtime-game.core/contact",1370942959),new cljs.core.Keyword(null,"many","many",1092119164),new cljs.core.Keyword("the-longtime-game.core","contacts","the-longtime-game.core/contacts",4723287)),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Keyword(null,"many","many",1092119164)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","contact","the-longtime-game.core/contact",1370942959),new cljs.core.Keyword("the-longtime-game.core","contacts","the-longtime-game.core/contacts",4723287)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","contact","the-longtime-game.core/contact",1370942959),new cljs.core.Keyword("the-longtime-game.core","contacts","the-longtime-game.core/contacts",4723287)], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","space","the-longtime-game.select/space",345039411),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Symbol("the-longtime-game.core","space-infra","the-longtime-game.core/space-infra",689581966,null),new cljs.core.Keyword(null,"many","many",1092119164),new cljs.core.Keyword("the-longtime-game.core","space","the-longtime-game.core/space",-1541471342)),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Keyword(null,"many","many",1092119164)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("the-longtime-game.core","space-infra","the-longtime-game.core/space-infra",689581966,null),new cljs.core.Keyword("the-longtime-game.core","space","the-longtime-game.core/space",-1541471342)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.core.space_infra,new cljs.core.Keyword("the-longtime-game.core","space","the-longtime-game.core/space",-1541471342)], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","infra","the-longtime-game.select/infra",-2117846195),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Symbol("the-longtime-game.core","buildings","the-longtime-game.core/buildings",1356426835,null),new cljs.core.Keyword(null,"many","many",1092119164),new cljs.core.Keyword("the-longtime-game.core","infra","the-longtime-game.core/infra",-1116612052)),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Keyword(null,"many","many",1092119164)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("the-longtime-game.core","buildings","the-longtime-game.core/buildings",1356426835,null),new cljs.core.Keyword("the-longtime-game.core","infra","the-longtime-game.core/infra",-1116612052)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.core.buildings,new cljs.core.Keyword("the-longtime-game.core","infra","the-longtime-game.core/infra",-1116612052)], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","power","the-longtime-game.select/power",-957660831),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),cljs.core.pos_int_QMARK_);
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","stores","the-longtime-game.select/stores",1192325223),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),cljs.core.list(new cljs.core.Symbol("cljs.core","conj","cljs.core/conj",-460750931,null),new cljs.core.Symbol("the-longtime-game.core","resources","the-longtime-game.core/resources",-797698991,null),new cljs.core.Keyword(null,"nutrition","nutrition",928000668)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Symbol("cljs.core","number?","cljs.core/number?",-811857295,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null),(0),new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null),(1)))))),cljs.spec.alpha.every_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),cljs.core.list(new cljs.core.Symbol(null,"conj","conj",-1127293942,null),new cljs.core.Symbol("core","resources","core/resources",-1026695675,null),new cljs.core.Keyword(null,"nutrition","nutrition",928000668)),cljs.core.list(new cljs.core.Symbol("s","or","s/or",1876282981,null),new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Symbol(null,"pos-int?","pos-int?",-1205815015,null),new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.list(new cljs.core.Symbol("s","and","s/and",668634387,null),new cljs.core.Symbol(null,"number?","number?",-1747282210,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null)], null),cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),(0),new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null),(1)))))),cljs.spec.alpha.tuple_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","conj","cljs.core/conj",-460750931,null),new cljs.core.Symbol("the-longtime-game.core","resources","the-longtime-game.core/resources",-797698991,null),new cljs.core.Keyword(null,"nutrition","nutrition",928000668)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Symbol("cljs.core","number?","cljs.core/number?",-811857295,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null),(0),new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null),(1)))))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.call(null,the_longtime_game.core.resources,new cljs.core.Keyword(null,"nutrition","nutrition",928000668)),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Keyword(null,"x","x",2099068185)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Symbol("cljs.core","number?","cljs.core/number?",-811857295,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null),(0),new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null),(1))))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.pos_int_QMARK_,cljs.spec.alpha.and_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","number?","cljs.core/number?",-811857295,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null),(0),new cljs.core.Symbol(null,"%","%",-950237169,null),(1)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.number_QMARK_,(function (p1__2737_SHARP_){
return ((((0) < p1__2737_SHARP_)) && ((p1__2737_SHARP_ < (1))));
})], null),null)], null),null)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__371__auto__,v__372__auto__){
return cljs.core.nth.call(null,v__372__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),cljs.core.list(new cljs.core.Symbol("cljs.core","conj","cljs.core/conj",-460750931,null),new cljs.core.Symbol("the-longtime-game.core","resources","the-longtime-game.core/resources",-797698991,null),new cljs.core.Keyword(null,"nutrition","nutrition",928000668)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Symbol("cljs.core","number?","cljs.core/number?",-811857295,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null),(0),new cljs.core.Symbol(null,"p1__2737#","p1__2737#",-981502260,null),(1)))))),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2738){
return cljs.core.map_QMARK_.call(null,G__2738);
})], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","filter","the-longtime-game.select/filter",-962220350),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","skills","the-longtime-game.select/skills",938790306),new cljs.core.Keyword("the-longtime-game.select","stores","the-longtime-game.select/stores",1192325223),new cljs.core.Keyword("the-longtime-game.core","season","the-longtime-game.core/season",1096971174),new cljs.core.Keyword("the-longtime-game.core","terrain","the-longtime-game.core/terrain",920224484),new cljs.core.Keyword("the-longtime-game.select","contacts","the-longtime-game.select/contacts",330347830),new cljs.core.Keyword("the-longtime-game.select","space","the-longtime-game.select/space",345039411),new cljs.core.Keyword("the-longtime-game.select","infra","the-longtime-game.select/infra",-2117846195),new cljs.core.Keyword("the-longtime-game.select","power","the-longtime-game.select/power",-957660831)], null)),cljs.spec.alpha.map_spec_impl.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","skills","the-longtime-game.select/skills",938790306),new cljs.core.Keyword("the-longtime-game.select","stores","the-longtime-game.select/stores",1192325223),new cljs.core.Keyword("the-longtime-game.core","season","the-longtime-game.core/season",1096971174),new cljs.core.Keyword("the-longtime-game.core","terrain","the-longtime-game.core/terrain",920224484),new cljs.core.Keyword("the-longtime-game.select","contacts","the-longtime-game.select/contacts",330347830),new cljs.core.Keyword("the-longtime-game.select","space","the-longtime-game.select/space",345039411),new cljs.core.Keyword("the-longtime-game.select","infra","the-longtime-game.select/infra",-2117846195),new cljs.core.Keyword("the-longtime-game.select","power","the-longtime-game.select/power",-957660831)], null),null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__2739){
return cljs.core.map_QMARK_.call(null,G__2739);
})], null),(function (G__2739){
return cljs.core.map_QMARK_.call(null,G__2739);
}),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"season","season",851675697),new cljs.core.Keyword(null,"terrain","terrain",704966005),new cljs.core.Keyword(null,"contacts","contacts",333503174),new cljs.core.Keyword(null,"space","space",348133475),new cljs.core.Keyword(null,"infra","infra",-2137779843),new cljs.core.Keyword(null,"power","power",-937852079)], null),cljs.core.PersistentVector.EMPTY,null,cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","skills","the-longtime-game.select/skills",938790306),new cljs.core.Keyword("the-longtime-game.select","stores","the-longtime-game.select/stores",1192325223),new cljs.core.Keyword("the-longtime-game.core","season","the-longtime-game.core/season",1096971174),new cljs.core.Keyword("the-longtime-game.core","terrain","the-longtime-game.core/terrain",920224484),new cljs.core.Keyword("the-longtime-game.select","contacts","the-longtime-game.select/contacts",330347830),new cljs.core.Keyword("the-longtime-game.select","space","the-longtime-game.select/space",345039411),new cljs.core.Keyword("the-longtime-game.select","infra","the-longtime-game.select/infra",-2117846195),new cljs.core.Keyword("the-longtime-game.select","power","the-longtime-game.select/power",-957660831)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))], null),null])));
the_longtime_game.select.passes_filter_QMARK_ = (function the_longtime_game$select$passes_filter_QMARK_(herd,p__2740){
var map__2741 = p__2740;
var map__2741__$1 = cljs.core.__destructure_map.call(null,map__2741);
var skills = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"skills","skills",958701426));
var stores = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"stores","stores",1203804823));
var season = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"season","season",851675697));
var terrain = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"terrain","terrain",704966005));
var contacts = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"contacts","contacts",333503174));
var space = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"space","space",348133475));
var infra = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"infra","infra",-2137779843));
var power = cljs.core.get.call(null,map__2741__$1,new cljs.core.Keyword(null,"power","power",-937852079));
var and__5043__auto__ = (cljs.core.truth_(terrain)?cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"terrain","terrain",704966005).cljs$core$IFn$_invoke$arity$1(the_longtime_game.core.current_location.call(null,herd)),terrain):true);
if(and__5043__auto__){
var and__5043__auto____$1 = (cljs.core.truth_(season)?cljs.core._EQ_.call(null,the_longtime_game.core.get_season.call(null,herd),season):true);
if(and__5043__auto____$1){
var and__5043__auto____$2 = cljs.core.every_QMARK_.call(null,(function (p__2742){
var vec__2743 = p__2742;
var resource = cljs.core.nth.call(null,vec__2743,(0),null);
var required = cljs.core.nth.call(null,vec__2743,(1),null);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"nutrition","nutrition",928000668),resource)){
return the_longtime_game.core.herd_has_nutrition_QMARK_.call(null,herd,required);
} else {
return (cljs.core.get_in.call(null,herd,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),resource], null),(0)) >= ((((((1) > required)) && ((required > (0)))))?((required * cljs.core.count.call(null,new cljs.core.Keyword(null,"individuals","individuals",600504845).cljs$core$IFn$_invoke$arity$1(herd))) | (0)):required));
}
}),(function (){var or__5045__auto__ = stores;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
if(and__5043__auto____$2){
var and__5043__auto____$3 = (cljs.core.truth_((function (){var and__5043__auto____$3 = contacts;
if(cljs.core.truth_(and__5043__auto____$3)){
return cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("the-longtime-game.select","contacts","the-longtime-game.select/contacts",330347830),contacts);
} else {
return and__5043__auto____$3;
}
})())?(function (){var vec__2746 = cljs.spec.alpha.conform.call(null,new cljs.core.Keyword("the-longtime-game.select","contacts","the-longtime-game.select/contacts",330347830),contacts);
var kind = cljs.core.nth.call(null,vec__2746,(0),null);
var x = cljs.core.nth.call(null,vec__2746,(1),null);
var G__2749 = kind;
var G__2749__$1 = (((G__2749 instanceof cljs.core.Keyword))?G__2749.fqn:null);
switch (G__2749__$1) {
case "one":
return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"contacts","contacts",333503174).cljs$core$IFn$_invoke$arity$1(herd),x);

break;
case "many":
return (cljs.core.seq.call(null,cljs.core.reduce.call(null,cljs.core.disj,x,new cljs.core.Keyword(null,"contacts","contacts",333503174).cljs$core$IFn$_invoke$arity$1(herd))) == null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__2749__$1)].join('')));

}
})():true);
if(cljs.core.truth_(and__5043__auto____$3)){
var and__5043__auto____$4 = (cljs.core.truth_((function (){var and__5043__auto____$4 = infra;
if(cljs.core.truth_(and__5043__auto____$4)){
return cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("the-longtime-game.select","infra","the-longtime-game.select/infra",-2117846195),infra);
} else {
return and__5043__auto____$4;
}
})())?(function (){var vec__2750 = cljs.spec.alpha.conform.call(null,new cljs.core.Keyword("the-longtime-game.select","infra","the-longtime-game.select/infra",-2117846195),infra);
var kind = cljs.core.nth.call(null,vec__2750,(0),null);
var x = cljs.core.nth.call(null,vec__2750,(1),null);
var location__$1 = the_longtime_game.core.current_location.call(null,herd);
var G__2753 = kind;
var G__2753__$1 = (((G__2753 instanceof cljs.core.Keyword))?G__2753.fqn:null);
switch (G__2753__$1) {
case "one":
return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(location__$1),x);

break;
case "many":
return (cljs.core.seq.call(null,cljs.core.reduce.call(null,cljs.core.disj,x,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(location__$1))) == null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__2753__$1)].join('')));

}
})():true);
if(cljs.core.truth_(and__5043__auto____$4)){
var and__5043__auto____$5 = (cljs.core.truth_((function (){var and__5043__auto____$5 = space;
if(cljs.core.truth_(and__5043__auto____$5)){
return cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("the-longtime-game.select","space","the-longtime-game.select/space",345039411),space);
} else {
return and__5043__auto____$5;
}
})())?(function (){var vec__2754 = cljs.spec.alpha.conform.call(null,new cljs.core.Keyword("the-longtime-game.select","space","the-longtime-game.select/space",345039411),space);
var kind = cljs.core.nth.call(null,vec__2754,(0),null);
var x = cljs.core.nth.call(null,vec__2754,(1),null);
var G__2757 = kind;
var G__2757__$1 = (((G__2757 instanceof cljs.core.Keyword))?G__2757.fqn:null);
switch (G__2757__$1) {
case "one":
return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"space","space",348133475).cljs$core$IFn$_invoke$arity$1(herd),x);

break;
case "many":
return (cljs.core.seq.call(null,cljs.core.reduce.call(null,cljs.core.disj,cljs.core.set.call(null,x),new cljs.core.Keyword(null,"space","space",348133475).cljs$core$IFn$_invoke$arity$1(herd))) == null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__2757__$1)].join('')));

}
})():true);
if(cljs.core.truth_(and__5043__auto____$5)){
var and__5043__auto____$6 = (cljs.core.truth_(power)?(function (){var location__$1 = the_longtime_game.core.current_location.call(null,herd);
return (new cljs.core.Keyword(null,"power","power",-937852079).cljs$core$IFn$_invoke$arity$1(location__$1) >= power);
})():true);
if(and__5043__auto____$6){
return cljs.core.reduce.call(null,(function (ok_QMARK_,p__2758){
var vec__2759 = p__2758;
var skill = cljs.core.nth.call(null,vec__2759,(0),null);
var required = cljs.core.nth.call(null,vec__2759,(1),null);
var and__5043__auto____$7 = ok_QMARK_;
if(cljs.core.truth_(and__5043__auto____$7)){
return (the_longtime_game.core.collective_skill.call(null,herd,skill) >= required);
} else {
return and__5043__auto____$7;
}
}),true,(function (){var or__5045__auto__ = skills;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
} else {
return and__5043__auto____$6;
}
} else {
return and__5043__auto____$5;
}
} else {
return and__5043__auto____$4;
}
} else {
return and__5043__auto____$3;
}
} else {
return and__5043__auto____$2;
}
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.select","passes-filter?","the-longtime-game.select/passes-filter?",-2077368196,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"filter","filter",-948537934),new cljs.core.Keyword("the-longtime-game.select","filter","the-longtime-game.select/filter",-962220350)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","boolean?","cljs.core/boolean?",1400713761,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"filter","filter",-948537934),new cljs.core.Keyword("the-longtime-game.select","filter","the-longtime-game.select/filter",-962220350)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword(null,"filter","filter",-948537934)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.select","filter","the-longtime-game.select/filter",-962220350)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.select","filter","the-longtime-game.select/filter",-962220350)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"filter","filter",-948537934),new cljs.core.Keyword("the-longtime-game.select","filter","the-longtime-game.select/filter",-962220350)),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","boolean?","cljs.core/boolean?",1400713761,null),cljs.core.boolean_QMARK_,null,null),new cljs.core.Symbol("cljs.core","boolean?","cljs.core/boolean?",1400713761,null),null,null,null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.gen.alpha","return","cljs.spec.gen.alpha/return",1565518169,null),new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null)))),cljs.spec.alpha.with_gen.call(null,cljs.core.ifn_QMARK_,(function (){
return cljs.spec.gen.alpha.return$.call(null,cljs.core._LT_);
})));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","set-comp?","the-longtime-game.select/set-comp?",949839517),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.gen.alpha","return","cljs.spec.gen.alpha/return",1565518169,null),new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null)))),cljs.spec.alpha.with_gen.call(null,cljs.core.ifn_QMARK_,(function (){
return cljs.spec.gen.alpha.return$.call(null,cljs.core.contains_QMARK_);
})));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","fulfillment","the-longtime-game.select/fulfillment",2037371780),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Keyword("the-longtime-game.core","fulfillment","the-longtime-game.core/fulfillment",1293562663),new cljs.core.Keyword(null,"comp","comp",1191953630),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),new cljs.core.Keyword("the-longtime-game.core","fulfillment","the-longtime-game.core/fulfillment",1293562663))),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Keyword(null,"comp","comp",1191953630)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","fulfillment","the-longtime-game.core/fulfillment",1293562663),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),new cljs.core.Keyword("the-longtime-game.core","fulfillment","the-longtime-game.core/fulfillment",1293562663))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","fulfillment","the-longtime-game.core/fulfillment",1293562663),cljs.spec.alpha.tuple_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),new cljs.core.Keyword("the-longtime-game.core","fulfillment","the-longtime-game.core/fulfillment",1293562663)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),new cljs.core.Keyword("the-longtime-game.core","fulfillment","the-longtime-game.core/fulfillment",1293562663)], null))], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","passions","the-longtime-game.select/passions",696940541),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"passion","passion",1426452826),new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword("the-longtime-game.core","uses","the-longtime-game.core/uses",924260321),new cljs.core.Keyword(null,"comp","comp",1191953630),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("the-longtime-game.select","set-comp?","the-longtime-game.select/set-comp?",949839517),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"passion","passion",1426452826),new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword(null,"comp","comp",1191953630)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),new cljs.core.Keyword("the-longtime-game.core","uses","the-longtime-game.core/uses",924260321),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("the-longtime-game.select","set-comp?","the-longtime-game.select/set-comp?",949839517),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","skill","the-longtime-game.core/skill",82266007),new cljs.core.Keyword("the-longtime-game.core","uses","the-longtime-game.core/uses",924260321),cljs.spec.alpha.tuple_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","set-comp?","the-longtime-game.select/set-comp?",949839517),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","set-comp?","the-longtime-game.select/set-comp?",949839517),cljs.core.any_QMARK_], null))], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","traits","the-longtime-game.select/traits",1724620239),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Symbol("the-longtime-game.core","traits","the-longtime-game.core/traits",1029866737,null),new cljs.core.Keyword(null,"many","many",1092119164),new cljs.core.Keyword("the-longtime-game.core","traits","the-longtime-game.core/traits",-610664790)),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"one","one",935007904),new cljs.core.Keyword(null,"many","many",1092119164)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("the-longtime-game.core","traits","the-longtime-game.core/traits",1029866737,null),new cljs.core.Keyword("the-longtime-game.core","traits","the-longtime-game.core/traits",-610664790)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.core.traits,new cljs.core.Keyword("the-longtime-game.core","traits","the-longtime-game.core/traits",-610664790)], null),null));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","age","the-longtime-game.select/age",-800372620),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),new cljs.core.Keyword("the-longtime-game.core","age","the-longtime-game.core/age",-858003503)),cljs.spec.alpha.tuple_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),new cljs.core.Keyword("the-longtime-game.core","age","the-longtime-game.core/age",-858003503)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","comp?","the-longtime-game.select/comp?",-1575251126),new cljs.core.Keyword("the-longtime-game.core","age","the-longtime-game.core/age",-858003503)], null)));
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","traits","the-longtime-game.select/traits",1724620239),new cljs.core.Keyword("the-longtime-game.core","skills","the-longtime-game.core/skills",863745519),new cljs.core.Keyword("the-longtime-game.select","fulfillment","the-longtime-game.select/fulfillment",2037371780),new cljs.core.Keyword("the-longtime-game.select","passions","the-longtime-game.select/passions",696940541),new cljs.core.Keyword("the-longtime-game.select","age","the-longtime-game.select/age",-800372620)], null)),cljs.spec.alpha.map_spec_impl.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","traits","the-longtime-game.select/traits",1724620239),new cljs.core.Keyword("the-longtime-game.core","skills","the-longtime-game.core/skills",863745519),new cljs.core.Keyword("the-longtime-game.select","fulfillment","the-longtime-game.select/fulfillment",2037371780),new cljs.core.Keyword("the-longtime-game.select","passions","the-longtime-game.select/passions",696940541),new cljs.core.Keyword("the-longtime-game.select","age","the-longtime-game.select/age",-800372620)], null),null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__2765){
return cljs.core.map_QMARK_.call(null,G__2765);
})], null),(function (G__2765){
return cljs.core.map_QMARK_.call(null,G__2765);
}),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"traits","traits",1778193407),new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260),new cljs.core.Keyword(null,"passions","passions",706358765),new cljs.core.Keyword(null,"age","age",-604307804)], null),cljs.core.PersistentVector.EMPTY,null,cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.select","traits","the-longtime-game.select/traits",1724620239),new cljs.core.Keyword("the-longtime-game.core","skills","the-longtime-game.core/skills",863745519),new cljs.core.Keyword("the-longtime-game.select","fulfillment","the-longtime-game.select/fulfillment",2037371780),new cljs.core.Keyword("the-longtime-game.select","passions","the-longtime-game.select/passions",696940541),new cljs.core.Keyword("the-longtime-game.select","age","the-longtime-game.select/age",-800372620)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))], null),null])));
the_longtime_game.select.passes_select_QMARK_ = (function the_longtime_game$select$passes_select_QMARK_(herd,individual,p__2766){
var map__2767 = p__2766;
var map__2767__$1 = cljs.core.__destructure_map.call(null,map__2767);
var traits = cljs.core.get.call(null,map__2767__$1,new cljs.core.Keyword(null,"traits","traits",1778193407));
var skills = cljs.core.get.call(null,map__2767__$1,new cljs.core.Keyword(null,"skills","skills",958701426));
var fulfillment = cljs.core.get.call(null,map__2767__$1,new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260));
var passions = cljs.core.get.call(null,map__2767__$1,new cljs.core.Keyword(null,"passions","passions",706358765));
var age = cljs.core.get.call(null,map__2767__$1,new cljs.core.Keyword(null,"age","age",-604307804));
var and__5043__auto__ = (cljs.core.truth_((function (){var and__5043__auto__ = traits;
if(cljs.core.truth_(and__5043__auto__)){
return cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("the-longtime-game.select","traits","the-longtime-game.select/traits",1724620239),traits);
} else {
return and__5043__auto__;
}
})())?(function (){var vec__2768 = cljs.spec.alpha.conform.call(null,new cljs.core.Keyword("the-longtime-game.select","traits","the-longtime-game.select/traits",1724620239),traits);
var kind = cljs.core.nth.call(null,vec__2768,(0),null);
var x = cljs.core.nth.call(null,vec__2768,(1),null);
var G__2771 = kind;
var G__2771__$1 = (((G__2771 instanceof cljs.core.Keyword))?G__2771.fqn:null);
switch (G__2771__$1) {
case "one":
return (!((x.call(null,new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(individual)) == null)));

break;
case "many":
return cljs.core.every_QMARK_.call(null,cljs.core.some_QMARK_,(function (){var iter__5523__auto__ = (function the_longtime_game$select$passes_select_QMARK__$_iter__2772(s__2773){
return (new cljs.core.LazySeq(null,(function (){
var s__2773__$1 = s__2773;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__2773__$1);
if(temp__5804__auto__){
var s__2773__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2773__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2773__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2775 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2774 = (0);
while(true){
if((i__2774 < size__5522__auto__)){
var trait = cljs.core._nth.call(null,c__5521__auto__,i__2774);
cljs.core.chunk_append.call(null,b__2775,trait.call(null,new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(individual)));

var G__2798 = (i__2774 + (1));
i__2774 = G__2798;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2775),the_longtime_game$select$passes_select_QMARK__$_iter__2772.call(null,cljs.core.chunk_rest.call(null,s__2773__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2775),null);
}
} else {
var trait = cljs.core.first.call(null,s__2773__$2);
return cljs.core.cons.call(null,trait.call(null,new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(individual)),the_longtime_game$select$passes_select_QMARK__$_iter__2772.call(null,cljs.core.rest.call(null,s__2773__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,x);
})());

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__2771__$1)].join('')));

}
})():true);
if(cljs.core.truth_(and__5043__auto__)){
var and__5043__auto____$1 = (cljs.core.truth_(skills)?cljs.core.every_QMARK_.call(null,cljs.core.true_QMARK_,(function (){var iter__5523__auto__ = (function the_longtime_game$select$passes_select_QMARK__$_iter__2776(s__2777){
return (new cljs.core.LazySeq(null,(function (){
var s__2777__$1 = s__2777;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__2777__$1);
if(temp__5804__auto__){
var s__2777__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2777__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2777__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2779 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2778 = (0);
while(true){
if((i__2778 < size__5522__auto__)){
var vec__2780 = cljs.core._nth.call(null,c__5521__auto__,i__2778);
var skill = cljs.core.nth.call(null,vec__2780,(0),null);
var value = cljs.core.nth.call(null,vec__2780,(1),null);
cljs.core.chunk_append.call(null,b__2779,(skill.call(null,new cljs.core.Keyword(null,"skills","skills",958701426).cljs$core$IFn$_invoke$arity$1(individual)) >= value));

var G__2799 = (i__2778 + (1));
i__2778 = G__2799;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2779),the_longtime_game$select$passes_select_QMARK__$_iter__2776.call(null,cljs.core.chunk_rest.call(null,s__2777__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2779),null);
}
} else {
var vec__2783 = cljs.core.first.call(null,s__2777__$2);
var skill = cljs.core.nth.call(null,vec__2783,(0),null);
var value = cljs.core.nth.call(null,vec__2783,(1),null);
return cljs.core.cons.call(null,(skill.call(null,new cljs.core.Keyword(null,"skills","skills",958701426).cljs$core$IFn$_invoke$arity$1(individual)) >= value),the_longtime_game$select$passes_select_QMARK__$_iter__2776.call(null,cljs.core.rest.call(null,s__2777__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,skills);
})()):true);
if(and__5043__auto____$1){
var and__5043__auto____$2 = (function (){var temp__5802__auto__ = age;
if(cljs.core.truth_(temp__5802__auto__)){
var vec__2786 = temp__5802__auto__;
var comp = cljs.core.nth.call(null,vec__2786,(0),null);
var n = cljs.core.nth.call(null,vec__2786,(1),null);
return comp.call(null,the_longtime_game.core.get_age.call(null,herd,individual),n);
} else {
return true;
}
})();
if(cljs.core.truth_(and__5043__auto____$2)){
var and__5043__auto____$3 = (cljs.core.truth_((function (){var and__5043__auto____$3 = fulfillment;
if(cljs.core.truth_(and__5043__auto____$3)){
return cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("the-longtime-game.select","fulfillment","the-longtime-game.select/fulfillment",2037371780),fulfillment);
} else {
return and__5043__auto____$3;
}
})())?(function (){var vec__2789 = cljs.spec.alpha.conform.call(null,new cljs.core.Keyword("the-longtime-game.select","fulfillment","the-longtime-game.select/fulfillment",2037371780),fulfillment);
var kind = cljs.core.nth.call(null,vec__2789,(0),null);
var x = cljs.core.nth.call(null,vec__2789,(1),null);
var G__2792 = kind;
var G__2792__$1 = (((G__2792 instanceof cljs.core.Keyword))?G__2792.fqn:null);
switch (G__2792__$1) {
case "n":
return (new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual) > x);

break;
case "comp":
return cljs.core.first.call(null,x).call(null,new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual),cljs.core.second.call(null,x));

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__2792__$1)].join('')));

}
})():true);
if(cljs.core.truth_(and__5043__auto____$3)){
if(cljs.core.truth_((function (){var and__5043__auto____$4 = passions;
if(cljs.core.truth_(and__5043__auto____$4)){
return cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("the-longtime-game.select","passions","the-longtime-game.select/passions",696940541),passions);
} else {
return and__5043__auto____$4;
}
})())){
var vec__2793 = cljs.spec.alpha.conform.call(null,new cljs.core.Keyword("the-longtime-game.select","passions","the-longtime-game.select/passions",696940541),passions);
var kind = cljs.core.nth.call(null,vec__2793,(0),null);
var x = cljs.core.nth.call(null,vec__2793,(1),null);
var G__2796 = kind;
var G__2796__$1 = (((G__2796 instanceof cljs.core.Keyword))?G__2796.fqn:null);
switch (G__2796__$1) {
case "passion":
return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"passions","passions",706358765).cljs$core$IFn$_invoke$arity$1(individual),x);

break;
case "set":
return cljs.core.empty_QMARK_.call(null,cljs.core.reduce.call(null,cljs.core.disj,cljs.core.set.call(null,x),new cljs.core.Keyword(null,"passions","passions",706358765).cljs$core$IFn$_invoke$arity$1(individual)));

break;
case "comp":
return cljs.core.first.call(null,x).call(null,new cljs.core.Keyword(null,"passions","passions",706358765).cljs$core$IFn$_invoke$arity$1(individual),cljs.core.second.call(null,x));

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__2796__$1)].join('')));

}
} else {
return true;
}
} else {
return and__5043__auto____$3;
}
} else {
return and__5043__auto____$2;
}
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.select","passes-select?","the-longtime-game.select/passes-select?",-600227152,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"individual","individual",-1643964808),new cljs.core.Keyword("the-longtime-game.core","individual","the-longtime-game.core/individual",-1997922619),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","boolean?","cljs.core/boolean?",1400713761,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"individual","individual",-1643964808),new cljs.core.Keyword("the-longtime-game.core","individual","the-longtime-game.core/individual",-1997922619),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword(null,"individual","individual",-1643964808),new cljs.core.Keyword(null,"select","select",1147833503)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.core","individual","the-longtime-game.core/individual",-1997922619),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.core","individual","the-longtime-game.core/individual",-1997922619),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"individual","individual",-1643964808),new cljs.core.Keyword("the-longtime-game.core","individual","the-longtime-game.core/individual",-1997922619),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","boolean?","cljs.core/boolean?",1400713761,null),cljs.core.boolean_QMARK_,null,null),new cljs.core.Symbol("cljs.core","boolean?","cljs.core/boolean?",1400713761,null),null,null,null));
the_longtime_game.select.find_individuals = (function the_longtime_game$select$find_individuals(herd,select){
return cljs.core.seq.call(null,cljs.core.filter.call(null,(function (p1__2802_SHARP_){
return the_longtime_game.select.passes_select_QMARK_.call(null,herd,p1__2802_SHARP_,select);
}),new cljs.core.Keyword(null,"individuals","individuals",600504845).cljs$core$IFn$_invoke$arity$1(herd)));
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.select","find-individuals","the-longtime-game.select/find-individuals",-1725459569,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword(null,"select","select",1147833503)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450)),cljs.spec.alpha.nilable_impl.call(null,new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450),null),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450)),null,null,null));
the_longtime_game.select.get_cast = (function the_longtime_game$select$get_cast(herd,selects){
return cljs.core.seq.call(null,cljs.core.reduce.call(null,(function (selected,select){
var temp__5802__auto__ = cljs.core.seq.call(null,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.partial.call(null,cljs.core.contains_QMARK_,selected)),the_longtime_game.select.find_individuals.call(null,herd,select)));
if(temp__5802__auto__){
var individuals = temp__5802__auto__;
return cljs.core.conj.call(null,selected,cljs.core.rand_nth.call(null,individuals));
} else {
return cljs.core.reduced.call(null,null);
}
}),cljs.core.PersistentHashSet.EMPTY,selects));
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.select","get-cast","the-longtime-game.select/get-cast",-814861149,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"selects","selects",-402693929),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527))),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"selects","selects",-402693929),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527))),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword(null,"selects","selects",-402693929)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),cljs.spec.alpha.every_impl.call(null,new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2803){
return cljs.core.coll_QMARK_.call(null,G__2803);
})], null),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527))], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"selects","selects",-402693929),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("the-longtime-game.select","select","the-longtime-game.select/select",1132156527))),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450)),cljs.spec.alpha.nilable_impl.call(null,new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450),null),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),new cljs.core.Keyword("the-longtime-game.core","individuals","the-longtime-game.core/individuals",948236450)),null,null,null));

//# sourceMappingURL=select.js.map
