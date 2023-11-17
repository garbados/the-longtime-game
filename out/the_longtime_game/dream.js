// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('the_longtime_game.dream');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('cljs.spec.alpha');
goog.require('cljs.spec.gen.alpha');
goog.require('the_longtime_game.core');
goog.require('the_longtime_game.dream_text');
goog.require('the_longtime_game.scene');
goog.require('the_longtime_game.select');
the_longtime_game.dream.catharsis = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Catharsis",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.dream_text.catharsis,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core._LT__EQ_,(30)], null)], null)], null),new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),(function (_herd,p__2819){
var vec__2820 = p__2819;
var sadcow = cljs.core.nth.call(null,vec__2820,(0),null);
return new cljs.core.Keyword(null,"depressed","depressed",1363801238).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(sadcow));
}),new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,p__2823,depressed_QMARK_){
var vec__2824 = p__2823;
var sadcow = cljs.core.nth.call(null,vec__2824,(0),null);
return the_longtime_game.core.update_individual.call(null,herd,sadcow,(cljs.core.truth_(depressed_QMARK_)?(function (p1__2817_SHARP_){
return the_longtime_game.core.inc_fulfillment.call(null,cljs.core.update.call(null,p1__2817_SHARP_,new cljs.core.Keyword(null,"traits","traits",1778193407),cljs.core.conj,new cljs.core.Keyword(null,"depressed","depressed",1363801238)),(20));
}):(function (p1__2818_SHARP_){
return the_longtime_game.core.inc_fulfillment.call(null,p1__2818_SHARP_,(5));
})));
})], null);
the_longtime_game.dream.doubt = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Doubt",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.dream_text.doubt,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),new cljs.core.Keyword(null,"depressed","depressed",1363801238)], null)], null),new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),(function (_herd,p__2829){
var vec__2830 = p__2829;
var sadcow = cljs.core.nth.call(null,vec__2830,(0),null);
return cljs.core.rand_nth.call(null,cljs.core.vec.call(null,new cljs.core.Keyword(null,"passions","passions",706358765).cljs$core$IFn$_invoke$arity$1(sadcow)));
}),new cljs.core.Keyword(null,"effect","effect",347343289),(function() { 
var G__2837__delegate = function (herd,p__2833,dispassion,_){
var vec__2834 = p__2833;
var sadcow = cljs.core.nth.call(null,vec__2834,(0),null);
if(cljs.core.truth_(dispassion)){
return the_longtime_game.core.update_individual.call(null,herd,sadcow,(function (p1__2827_SHARP_){
return cljs.core.update.call(null,p1__2827_SHARP_,new cljs.core.Keyword(null,"passions","passions",706358765),cljs.core.disj,dispassion);
}));
} else {
return the_longtime_game.core.update_individual.call(null,herd,sadcow,(function (p1__2828_SHARP_){
return the_longtime_game.core.inc_fulfillment.call(null,p1__2828_SHARP_,(-5));
}));
}
};
var G__2837 = function (herd,p__2833,dispassion,var_args){
var _ = null;
if (arguments.length > 3) {
var G__2838__i = 0, G__2838__a = new Array(arguments.length -  3);
while (G__2838__i < G__2838__a.length) {G__2838__a[G__2838__i] = arguments[G__2838__i + 3]; ++G__2838__i;}
  _ = new cljs.core.IndexedSeq(G__2838__a,0,null);
} 
return G__2837__delegate.call(this,herd,p__2833,dispassion,_);};
G__2837.cljs$lang$maxFixedArity = 3;
G__2837.cljs$lang$applyTo = (function (arglist__2839){
var herd = cljs.core.first(arglist__2839);
arglist__2839 = cljs.core.next(arglist__2839);
var p__2833 = cljs.core.first(arglist__2839);
arglist__2839 = cljs.core.next(arglist__2839);
var dispassion = cljs.core.first(arglist__2839);
var _ = cljs.core.rest(arglist__2839);
return G__2837__delegate(herd,p__2833,dispassion,_);
});
G__2837.cljs$core$IFn$_invoke$arity$variadic = G__2837__delegate;
return G__2837;
})()
], null);
the_longtime_game.dream.gratitude = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),"Gratitude",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.dream_text.gratitude,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260),(70)], null)], null),new cljs.core.Keyword(null,"effect","effect",347343289),(function() { 
var G__2847__delegate = function (herd,p__2843,_){
var vec__2844 = p__2843;
var happycow = cljs.core.nth.call(null,vec__2844,(0),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"depressed","depressed",1363801238).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(happycow)))){
return the_longtime_game.core.update_individual.call(null,herd,happycow,(function (p1__2840_SHARP_){
return cljs.core.update.call(null,p1__2840_SHARP_,new cljs.core.Keyword(null,"traits","traits",1778193407),cljs.core.disj,new cljs.core.Keyword(null,"depressed","depressed",1363801238));
}));
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"weary","weary",-1954742582).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(happycow)))){
return the_longtime_game.core.update_individual.call(null,herd,happycow,(function (p1__2841_SHARP_){
return cljs.core.update.call(null,p1__2841_SHARP_,new cljs.core.Keyword(null,"traits","traits",1778193407),cljs.core.disj,new cljs.core.Keyword(null,"weary","weary",-1954742582));
}));
} else {
return cljs.core.update.call(null,herd,new cljs.core.Keyword(null,"individuals","individuals",600504845),(function (individuals){
return cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__2842_SHARP_){
return the_longtime_game.core.inc_fulfillment.call(null,p1__2842_SHARP_,(2));
}),individuals));
}));

}
}
};
var G__2847 = function (herd,p__2843,var_args){
var _ = null;
if (arguments.length > 2) {
var G__2848__i = 0, G__2848__a = new Array(arguments.length -  2);
while (G__2848__i < G__2848__a.length) {G__2848__a[G__2848__i] = arguments[G__2848__i + 2]; ++G__2848__i;}
  _ = new cljs.core.IndexedSeq(G__2848__a,0,null);
} 
return G__2847__delegate.call(this,herd,p__2843,_);};
G__2847.cljs$lang$maxFixedArity = 2;
G__2847.cljs$lang$applyTo = (function (arglist__2849){
var herd = cljs.core.first(arglist__2849);
arglist__2849 = cljs.core.next(arglist__2849);
var p__2843 = cljs.core.first(arglist__2849);
var _ = cljs.core.rest(arglist__2849);
return G__2847__delegate(herd,p__2843,_);
});
G__2847.cljs$core$IFn$_invoke$arity$variadic = G__2847__delegate;
return G__2847;
})()
], null);
the_longtime_game.dream.purpose = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Purpose",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.dream_text.purpose,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-passions","max-passions",780217738),(2)], null)], null),new cljs.core.Keyword(null,"choices-fn","choices-fn",-1035964330),(function (_herd,p__2851,_){
var vec__2852 = p__2851;
var dreamer = cljs.core.nth.call(null,vec__2852,(0),null);
return cljs.core.take.call(null,(2),cljs.core.shuffle.call(null,cljs.core.vec.call(null,clojure.set.difference.call(null,the_longtime_game.core.skills,new cljs.core.Keyword(null,"passions","passions",706358765).cljs$core$IFn$_invoke$arity$1(dreamer)))));
}),new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,p__2855,_,skill){
var vec__2856 = p__2855;
var dreamer = cljs.core.nth.call(null,vec__2856,(0),null);
return the_longtime_game.core.update_individual.call(null,herd,dreamer,(function (p1__2850_SHARP_){
return cljs.core.update.call(null,p1__2850_SHARP_,new cljs.core.Keyword(null,"passions","passions",706358765),cljs.core.conj,skill);
}));
})], null);
the_longtime_game.dream.dreams = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.dream.catharsis,the_longtime_game.dream.doubt,the_longtime_game.dream.gratitude,the_longtime_game.dream.purpose], null);
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.dream","choices-fn","the-longtime-game.dream/choices-fn",679868453),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.dream","post-text-fn","the-longtime-game.dream/post-text-fn",174396489),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Keyword("the-longtime-game.scene","scene","the-longtime-game.scene/scene",-1212107977),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","text-fn","the-longtime-game.dream/text-fn",-1452683624),new cljs.core.Keyword("the-longtime-game.dream","choices-fn","the-longtime-game.dream/choices-fn",679868453)], null),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","post-text-fn","the-longtime-game.dream/post-text-fn",174396489)], null)),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__2859#","p1__2859#",893193467,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),cljs.core.list(new cljs.core.Symbol("cljs.core","count","cljs.core/count",-921270233,null),cljs.core.list(new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.Symbol(null,"p1__2859#","p1__2859#",893193467,null)))))),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.gen.alpha","elements","cljs.spec.gen.alpha/elements",749148929,null),new cljs.core.Symbol("the-longtime-game.dream","dreams","the-longtime-game.dream/dreams",-1414928060,null)))),cljs.spec.alpha.with_gen.call(null,cljs.spec.alpha.and_spec_impl.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.scene","scene","the-longtime-game.scene/scene",-1212107977),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","text-fn","the-longtime-game.dream/text-fn",-1452683624),new cljs.core.Keyword("the-longtime-game.dream","choices-fn","the-longtime-game.dream/choices-fn",679868453)], null),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","post-text-fn","the-longtime-game.dream/post-text-fn",174396489)], null)),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),cljs.core.list(new cljs.core.Symbol("cljs.core","count","cljs.core/count",-921270233,null),cljs.core.list(new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.Symbol(null,"%","%",-950237169,null)))))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.scene","scene","the-longtime-game.scene/scene",-1212107977),cljs.spec.alpha.map_spec_impl.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","text-fn","the-longtime-game.dream/text-fn",-1452683624),new cljs.core.Keyword("the-longtime-game.dream","choices-fn","the-longtime-game.dream/choices-fn",679868453)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","post-text-fn","the-longtime-game.dream/post-text-fn",174396489)], null),null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__2860){
return cljs.core.map_QMARK_.call(null,G__2860);
}),(function (G__2860){
return cljs.core.contains_QMARK_.call(null,G__2860,new cljs.core.Keyword(null,"text-fn","text-fn",1202470087));
}),(function (G__2860){
return cljs.core.contains_QMARK_.call(null,G__2860,new cljs.core.Keyword(null,"choices-fn","choices-fn",-1035964330));
})], null),(function (G__2860){
return ((cljs.core.map_QMARK_.call(null,G__2860)) && (((cljs.core.contains_QMARK_.call(null,G__2860,new cljs.core.Keyword(null,"text-fn","text-fn",1202470087))) && (cljs.core.contains_QMARK_.call(null,G__2860,new cljs.core.Keyword(null,"choices-fn","choices-fn",-1035964330))))));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"post-text-fn","post-text-fn",-1600004680)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","text-fn","the-longtime-game.dream/text-fn",-1452683624),new cljs.core.Keyword("the-longtime-game.dream","choices-fn","the-longtime-game.dream/choices-fn",679868453)], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),new cljs.core.Keyword(null,"choices-fn","choices-fn",-1035964330)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.dream","post-text-fn","the-longtime-game.dream/post-text-fn",174396489)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"text-fn","text-fn",1202470087))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"choices-fn","choices-fn",-1035964330)))], null),null])),(function (p1__2859_SHARP_){
return cljs.core.pos_int_QMARK_.call(null,cljs.core.count.call(null,new cljs.core.Keyword(null,"selects","selects",-402693929).cljs$core$IFn$_invoke$arity$1(p1__2859_SHARP_)));
})], null),null),(function (){
return cljs.spec.gen.alpha.elements.call(null,the_longtime_game.dream.dreams);
})));
the_longtime_game.dream.pick_dream = (function the_longtime_game$dream$pick_dream(herd){
return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,the_longtime_game.scene.scene_may_occur_QMARK_,herd),cljs.core.shuffle.call(null,the_longtime_game.dream.dreams)));
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.dream","pick-dream","the-longtime-game.dream/pick-dream",-617209923,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579),null,null),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579),null,null,null));
the_longtime_game.dream.marshal_dream = (function the_longtime_game$dream$marshal_dream(herd,p__2863){
var map__2864 = p__2863;
var map__2864__$1 = cljs.core.__destructure_map.call(null,map__2864);
var selects = cljs.core.get.call(null,map__2864__$1,new cljs.core.Keyword(null,"selects","selects",-402693929));
var marshal_fn = cljs.core.get.call(null,map__2864__$1,new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),cljs.core.constantly.call(null,null));
var choices_fn = cljs.core.get.call(null,map__2864__$1,new cljs.core.Keyword(null,"choices-fn","choices-fn",-1035964330),cljs.core.constantly.call(null,cljs.core.PersistentVector.EMPTY));
var text_fn = cljs.core.get.call(null,map__2864__$1,new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),cljs.core.constantly.call(null,null));
var post_text_fn = cljs.core.get.call(null,map__2864__$1,new cljs.core.Keyword(null,"post-text-fn","post-text-fn",-1600004680),cljs.core.constantly.call(null,null));
var effect = cljs.core.get.call(null,map__2864__$1,new cljs.core.Keyword(null,"effect","effect",347343289),cljs.core.constantly.call(null,herd));
var individuals = the_longtime_game.select.get_cast.call(null,herd,selects);
var args = marshal_fn.call(null,herd,individuals);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [choices_fn.call(null,herd,individuals,args),cljs.core.partial.call(null,text_fn,herd,individuals,args),(function (p1__2861_SHARP_,p2__2862_SHARP_){
return post_text_fn.call(null,p1__2861_SHARP_,individuals,args,p2__2862_SHARP_);
}),cljs.core.partial.call(null,effect,herd,individuals,args)], null);
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.dream","marshal-dream","the-longtime-game.dream/marshal-dream",1634648456,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"dream","dream",-1318050380),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579)),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"dream","dream",-1318050380),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword(null,"dream","dream",-1318050380)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391),new cljs.core.Keyword(null,"dream","dream",-1318050380),new cljs.core.Keyword("the-longtime-game.dream","dream","the-longtime-game.dream/dream",1337236579)),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null)),cljs.spec.alpha.tuple_impl.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"any?","any?",-318999933,null),cljs.core.any_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2865){
return cljs.core.coll_QMARK_.call(null,G__2865);
})], null),null),cljs.core.ifn_QMARK_,cljs.core.ifn_QMARK_,cljs.core.ifn_QMARK_], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null)),null,null,null));

//# sourceMappingURL=dream.js.map
