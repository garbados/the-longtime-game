// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('the_longtime_game.event');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('cljs.spec.gen.alpha');
goog.require('the_longtime_game.core');
goog.require('the_longtime_game.event_text');
goog.require('the_longtime_game.scene');
goog.require('the_longtime_game.select');
the_longtime_game.event.crossed_paths = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Crossed Paths",new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"organizing","organizing",1714077651),(4)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"organizing","organizing",1714077651),(3)], null)], null)], null),new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.crossed_paths,new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),(function() { 
var G__2915__delegate = function (_,herd,___$1){
var n = ((((1) / (8)) * cljs.core.count.call(null,new cljs.core.Keyword(null,"individuals","individuals",600504845).cljs$core$IFn$_invoke$arity$1(herd))) | (0));
return cljs.core.reduce.call(null,(function (all,resource){
return cljs.core.assoc.call(null,all,resource,cljs.core.rand_int.call(null,n));
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.take.call(null,cljs.core.rand_int.call(null,cljs.core.count.call(null,the_longtime_game.core.carryable)),cljs.core.vec.call(null,the_longtime_game.core.carryable)));
};
var G__2915 = function (_,herd,var_args){
var ___$1 = null;
if (arguments.length > 2) {
var G__2916__i = 0, G__2916__a = new Array(arguments.length -  2);
while (G__2916__i < G__2916__a.length) {G__2916__a[G__2916__i] = arguments[G__2916__i + 2]; ++G__2916__i;}
  ___$1 = new cljs.core.IndexedSeq(G__2916__a,0,null);
} 
return G__2915__delegate.call(this,_,herd,___$1);};
G__2915.cljs$lang$maxFixedArity = 2;
G__2915.cljs$lang$applyTo = (function (arglist__2917){
var _ = cljs.core.first(arglist__2917);
arglist__2917 = cljs.core.next(arglist__2917);
var herd = cljs.core.first(arglist__2917);
var ___$1 = cljs.core.rest(arglist__2917);
return G__2915__delegate(_,herd,___$1);
});
G__2915.cljs$core$IFn$_invoke$arity$variadic = G__2915__delegate;
return G__2915;
})()
,new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,_,gift){
return the_longtime_game.core.update_individuals.call(null,cljs.core.update.call(null,herd,new cljs.core.Keyword(null,"stores","stores",1203804823),cljs.core.partial.call(null,cljs.core.merge_with,cljs.core._PLUS_),gift),(function (p1__2914_SHARP_){
return the_longtime_game.core.inc_fulfillment.call(null,p1__2914_SHARP_,(5));
}));
})], null);
the_longtime_game.event.depression_ends = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),"Depression Ends",new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),new cljs.core.Keyword(null,"depressed","depressed",1363801238)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"medicine","medicine",892236478),(4)], null)], null)], null),new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.depression_ends,new cljs.core.Keyword(null,"effect","effect",347343289),(function() { 
var G__2924__delegate = function (herd,p__2920,_){
var vec__2921 = p__2920;
var sadcow = cljs.core.nth.call(null,vec__2921,(0),null);
var healcow = cljs.core.nth.call(null,vec__2921,(1),null);
return the_longtime_game.core.update_individual.call(null,the_longtime_game.core.update_individual.call(null,herd,sadcow,(function (p1__2918_SHARP_){
return cljs.core.update.call(null,p1__2918_SHARP_,new cljs.core.Keyword(null,"traits","traits",1778193407),cljs.core.disj,new cljs.core.Keyword(null,"depressed","depressed",1363801238));
})),healcow,(function (p1__2919_SHARP_){
return the_longtime_game.core.inc_fulfillment.call(null,p1__2919_SHARP_,(10));
}));
};
var G__2924 = function (herd,p__2920,var_args){
var _ = null;
if (arguments.length > 2) {
var G__2925__i = 0, G__2925__a = new Array(arguments.length -  2);
while (G__2925__i < G__2925__a.length) {G__2925__a[G__2925__i] = arguments[G__2925__i + 2]; ++G__2925__i;}
  _ = new cljs.core.IndexedSeq(G__2925__a,0,null);
} 
return G__2924__delegate.call(this,herd,p__2920,_);};
G__2924.cljs$lang$maxFixedArity = 2;
G__2924.cljs$lang$applyTo = (function (arglist__2926){
var herd = cljs.core.first(arglist__2926);
arglist__2926 = cljs.core.next(arglist__2926);
var p__2920 = cljs.core.first(arglist__2926);
var _ = cljs.core.rest(arglist__2926);
return G__2924__delegate(herd,p__2920,_);
});
G__2924.cljs$core$IFn$_invoke$arity$variadic = G__2924__delegate;
return G__2924;
})()
], null);
the_longtime_game.event.fire_BANG_ = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1843675177),"Fire!",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.fire_BANG_,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),new cljs.core.Keyword(null,"weary","weary",-1954742582)], null)], null),new cljs.core.Keyword(null,"filter-fn","filter-fn",1689475675),(function (herd){
var location__$1 = the_longtime_game.core.current_location.call(null,herd);
return cljs.core.pos_int_QMARK_.call(null,cljs.core.count.call(null,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(location__$1)));
}),new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),(function() { 
var G__2932__delegate = function (herd,_){
var temp__5804__auto__ = cljs.core.seq.call(null,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(the_longtime_game.core.current_location.call(null,herd)));
if(temp__5804__auto__){
var infra = temp__5804__auto__;
return cljs.core.rand_nth.call(null,infra);
} else {
return null;
}
};
var G__2932 = function (herd,var_args){
var _ = null;
if (arguments.length > 1) {
var G__2933__i = 0, G__2933__a = new Array(arguments.length -  1);
while (G__2933__i < G__2933__a.length) {G__2933__a[G__2933__i] = arguments[G__2933__i + 1]; ++G__2933__i;}
  _ = new cljs.core.IndexedSeq(G__2933__a,0,null);
} 
return G__2932__delegate.call(this,herd,_);};
G__2932.cljs$lang$maxFixedArity = 1;
G__2932.cljs$lang$applyTo = (function (arglist__2934){
var herd = cljs.core.first(arglist__2934);
var _ = cljs.core.rest(arglist__2934);
return G__2932__delegate(herd,_);
});
G__2932.cljs$core$IFn$_invoke$arity$variadic = G__2932__delegate;
return G__2932;
})()
,new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,p__2928,infra){
var vec__2929 = p__2928;
var individual = cljs.core.nth.call(null,vec__2929,(0),null);
return the_longtime_game.core.update_individual.call(null,the_longtime_game.core.update_current_location.call(null,herd,cljs.core.update,new cljs.core.Keyword(null,"infra","infra",-2137779843),cljs.core.disj,infra),individual,(function (p1__2927_SHARP_){
return cljs.core.update.call(null,p1__2927_SHARP_,new cljs.core.Keyword(null,"traits","traits",1778193407),cljs.core.disj,new cljs.core.Keyword(null,"weary","weary",-1954742582));
}));
})], null);
the_longtime_game.event.funeral = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1843675177),"Funeral",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.funeral,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY], null),new cljs.core.Keyword(null,"filter-fn","filter-fn",1689475675),(function (p1__2935_SHARP_){
return ((1) < cljs.core.count.call(null,new cljs.core.Keyword(null,"new-dead","new-dead",-1359909787).cljs$core$IFn$_invoke$arity$1(p1__2935_SHARP_)));
}),new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),(function() { 
var G__2936__delegate = function (herd,_){
return cljs.core.first.call(null,new cljs.core.Keyword(null,"new-dead","new-dead",-1359909787).cljs$core$IFn$_invoke$arity$1(herd));
};
var G__2936 = function (herd,var_args){
var _ = null;
if (arguments.length > 1) {
var G__2937__i = 0, G__2937__a = new Array(arguments.length -  1);
while (G__2937__i < G__2937__a.length) {G__2937__a[G__2937__i] = arguments[G__2937__i + 1]; ++G__2937__i;}
  _ = new cljs.core.IndexedSeq(G__2937__a,0,null);
} 
return G__2936__delegate.call(this,herd,_);};
G__2936.cljs$lang$maxFixedArity = 1;
G__2936.cljs$lang$applyTo = (function (arglist__2938){
var herd = cljs.core.first(arglist__2938);
var _ = cljs.core.rest(arglist__2938);
return G__2936__delegate(herd,_);
});
G__2936.cljs$core$IFn$_invoke$arity$variadic = G__2936__delegate;
return G__2936;
})()
,new cljs.core.Keyword(null,"effect","effect",347343289),(function() { 
var G__2939__delegate = function (herd,_){
return herd;
};
var G__2939 = function (herd,var_args){
var _ = null;
if (arguments.length > 1) {
var G__2940__i = 0, G__2940__a = new Array(arguments.length -  1);
while (G__2940__i < G__2940__a.length) {G__2940__a[G__2940__i] = arguments[G__2940__i + 1]; ++G__2940__i;}
  _ = new cljs.core.IndexedSeq(G__2940__a,0,null);
} 
return G__2939__delegate.call(this,herd,_);};
G__2939.cljs$lang$maxFixedArity = 1;
G__2939.cljs$lang$applyTo = (function (arglist__2941){
var herd = cljs.core.first(arglist__2941);
var _ = cljs.core.rest(arglist__2941);
return G__2939__delegate(herd,_);
});
G__2939.cljs$core$IFn$_invoke$arity$variadic = G__2939__delegate;
return G__2939;
})()
], null);
the_longtime_game.event.gruxnis_attack_BANG_ = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),"Grux'nis attack",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.gruxnis_attack_BANG_,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"medicine","medicine",892236478),(4),new cljs.core.Keyword(null,"athletics","athletics",-1841803663),(4)], null)], null)], null),new cljs.core.Keyword(null,"effect","effect",347343289),(function() { 
var G__2948__delegate = function (herd,p__2944,_){
var vec__2945 = p__2944;
var victim = cljs.core.nth.call(null,vec__2945,(0),null);
var ibba = cljs.core.nth.call(null,vec__2945,(1),null);
return the_longtime_game.core.update_individual.call(null,the_longtime_game.core.update_individual.call(null,herd,victim,(function (p1__2942_SHARP_){
return cljs.core.update.call(null,p1__2942_SHARP_,new cljs.core.Keyword(null,"traits","traits",1778193407),cljs.core.conj,new cljs.core.Keyword(null,"wounded","wounded",-1496249886));
})),ibba,(function (p1__2943_SHARP_){
return cljs.core.update_in.call(null,cljs.core.update_in.call(null,p1__2943_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.Keyword(null,"medicine","medicine",892236478)], null),cljs.core.inc),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.Keyword(null,"athletics","athletics",-1841803663)], null),cljs.core.inc);
}));
};
var G__2948 = function (herd,p__2944,var_args){
var _ = null;
if (arguments.length > 2) {
var G__2949__i = 0, G__2949__a = new Array(arguments.length -  2);
while (G__2949__i < G__2949__a.length) {G__2949__a[G__2949__i] = arguments[G__2949__i + 2]; ++G__2949__i;}
  _ = new cljs.core.IndexedSeq(G__2949__a,0,null);
} 
return G__2948__delegate.call(this,herd,p__2944,_);};
G__2948.cljs$lang$maxFixedArity = 2;
G__2948.cljs$lang$applyTo = (function (arglist__2950){
var herd = cljs.core.first(arglist__2950);
arglist__2950 = cljs.core.next(arglist__2950);
var p__2944 = cljs.core.first(arglist__2950);
var _ = cljs.core.rest(arglist__2950);
return G__2948__delegate(herd,p__2944,_);
});
G__2948.cljs$core$IFn$_invoke$arity$variadic = G__2948__delegate;
return G__2948;
})()
], null);
the_longtime_game.event.journeying_ends = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"Journeying Ends",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.journeying_ends,new cljs.core.Keyword(null,"filter-fn","filter-fn",1689475675),(function (herd){
return (cljs.core.count.call(null,new cljs.core.Keyword(null,"new-adults","new-adults",614990126).cljs$core$IFn$_invoke$arity$1(herd)) > (0));
})], null);
the_longtime_game.event.offshoot_joins = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"Offshoot Joins",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.offshoot_joins,new cljs.core.Keyword(null,"filter-fn","filter-fn",1689475675),(function (herd){
return (cljs.core.count.call(null,new cljs.core.Keyword(null,"new-adults","new-adults",614990126).cljs$core$IFn$_invoke$arity$1(herd)) > (4));
})], null);
the_longtime_game.event.plague = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Plague!",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.plague,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY], null),new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),(function() { 
var G__2955__delegate = function (herd,_){
var population = cljs.core.count.call(null,new cljs.core.Keyword(null,"individuals","individuals",600504845).cljs$core$IFn$_invoke$arity$1(herd));
return ((the_longtime_game.core.herd_has_resource_QMARK_.call(null,herd,new cljs.core.Keyword(null,"poultices","poultices",-616779013),(((1) / (3)) * population))) && (the_longtime_game.core.herd_has_skill_QMARK_.call(null,herd,new cljs.core.Keyword(null,"medicine","medicine",892236478),(((1) / (4)) * population))));
};
var G__2955 = function (herd,var_args){
var _ = null;
if (arguments.length > 1) {
var G__2956__i = 0, G__2956__a = new Array(arguments.length -  1);
while (G__2956__i < G__2956__a.length) {G__2956__a[G__2956__i] = arguments[G__2956__i + 1]; ++G__2956__i;}
  _ = new cljs.core.IndexedSeq(G__2956__a,0,null);
} 
return G__2955__delegate.call(this,herd,_);};
G__2955.cljs$lang$maxFixedArity = 1;
G__2955.cljs$lang$applyTo = (function (arglist__2957){
var herd = cljs.core.first(arglist__2957);
var _ = cljs.core.rest(arglist__2957);
return G__2955__delegate(herd,_);
});
G__2955.cljs$core$IFn$_invoke$arity$variadic = G__2955__delegate;
return G__2955;
})()
,new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,p__2951,passed_QMARK_){
var vec__2952 = p__2951;
var individual = cljs.core.nth.call(null,vec__2952,(0),null);
if(cljs.core.truth_(passed_QMARK_)){
return cljs.core.update_in.call(null,herd,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"poultices","poultices",-616779013)], null),cljs.core.comp.call(null,cljs.core.int$,cljs.core._STAR_),((2) / (3)));
} else {
return the_longtime_game.core.perish.call(null,herd,individual);
}
})], null);
the_longtime_game.event.ration_rot = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Ration Rot",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.ration_rot,new cljs.core.Keyword(null,"filter","filter",-948537934),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rations","rations",-354188495),(50)], null)], null),new cljs.core.Keyword(null,"marshal-fn","marshal-fn",-1286178931),(function() { 
var G__2958__delegate = function (herd,_){
return cljs.core.first.call(null,the_longtime_game.select.find_individuals.call(null,herd,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"medicine","medicine",892236478),(3)], null)], null)));
};
var G__2958 = function (herd,var_args){
var _ = null;
if (arguments.length > 1) {
var G__2959__i = 0, G__2959__a = new Array(arguments.length -  1);
while (G__2959__i < G__2959__a.length) {G__2959__a[G__2959__i] = arguments[G__2959__i + 1]; ++G__2959__i;}
  _ = new cljs.core.IndexedSeq(G__2959__a,0,null);
} 
return G__2958__delegate.call(this,herd,_);};
G__2958.cljs$lang$maxFixedArity = 1;
G__2958.cljs$lang$applyTo = (function (arglist__2960){
var herd = cljs.core.first(arglist__2960);
var _ = cljs.core.rest(arglist__2960);
return G__2958__delegate(herd,_);
});
G__2958.cljs$core$IFn$_invoke$arity$variadic = G__2958__delegate;
return G__2958;
})()
,new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,_,sanitarian){
if(cljs.core.truth_(sanitarian)){
return cljs.core.update_in.call(null,herd,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"rations","rations",-354188495)], null),cljs.core.comp.call(null,cljs.core.int$,cljs.core._STAR_),((2) / (3)));
} else {
return the_longtime_game.core.update_individuals.call(null,cljs.core.update_in.call(null,herd,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"rations","rations",-354188495)], null),cljs.core.comp.call(null,cljs.core.int$,cljs.core._STAR_),((1) / (2))),the_longtime_game.core.inc_fulfillment,(-5));
}
})], null);
the_longtime_game.event.wound_healed = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Wound Healed",new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),the_longtime_game.event_text.wound_healed,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),new cljs.core.Keyword(null,"wounded","wounded",-1496249886)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skills","skills",958701426),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"medicine","medicine",892236478),(3),new cljs.core.Keyword(null,"craftwork","craftwork",-905870327),(3)], null)], null)], null),new cljs.core.Keyword(null,"filter","filter",-948537934),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"poultices","poultices",-616779013),(5),new cljs.core.Keyword(null,"tools","tools",-1241731990),(5)], null)], null),new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,p__2963,_){
var vec__2964 = p__2963;
var hurtcow = cljs.core.nth.call(null,vec__2964,(0),null);
var healcow = cljs.core.nth.call(null,vec__2964,(1),null);
return the_longtime_game.core.update_individual.call(null,the_longtime_game.core.update_individual.call(null,herd,hurtcow,(function (p1__2961_SHARP_){
return cljs.core.update.call(null,p1__2961_SHARP_,new cljs.core.Keyword(null,"traits","traits",1778193407),cljs.core.disj,new cljs.core.Keyword(null,"wounded","wounded",-1496249886));
})),healcow,(function (p1__2962_SHARP_){
return cljs.core.update.call(null,p1__2962_SHARP_,new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260),cljs.core._PLUS_,(10));
}));
})], null);
the_longtime_game.event.critical_events = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.event.depression_ends,the_longtime_game.event.fire_BANG_,the_longtime_game.event.gruxnis_attack_BANG_,the_longtime_game.event.ration_rot,the_longtime_game.event.plague,the_longtime_game.event.wound_healed,the_longtime_game.event.crossed_paths], null);
the_longtime_game.event.general_events = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.event.journeying_ends,the_longtime_game.event.offshoot_joins,the_longtime_game.event.funeral], null);
cljs.spec.alpha.def_impl.call(null,new cljs.core.Keyword("the-longtime-game.event","event","the-longtime-game.event/event",983981804),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Keyword("the-longtime-game.scene","scene","the-longtime-game.scene/scene",-1212107977),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.gen.alpha","elements","cljs.spec.gen.alpha/elements",749148929,null),cljs.core.list(new cljs.core.Symbol("cljs.core","concat","cljs.core/concat",-1133584918,null),new cljs.core.Symbol("the-longtime-game.event","critical-events","the-longtime-game.event/critical-events",866522389,null),new cljs.core.Symbol("the-longtime-game.event","general-events","the-longtime-game.event/general-events",-53910905,null))))),cljs.spec.alpha.with_gen.call(null,new cljs.core.Keyword("the-longtime-game.scene","scene","the-longtime-game.scene/scene",-1212107977),(function (){
return cljs.spec.gen.alpha.elements.call(null,cljs.core.concat.call(null,the_longtime_game.event.critical_events,the_longtime_game.event.general_events));
})));
the_longtime_game.event.pick_event = (function the_longtime_game$event$pick_event(herd){
var event_may_occur_QMARK_ = cljs.core.partial.call(null,the_longtime_game.scene.scene_may_occur_QMARK_,herd);
var event = (function (){var or__5045__auto__ = (function (){var and__5043__auto__ = cljs.core._EQ_.call(null,(0),cljs.core.rand_int.call(null,(2)));
if(and__5043__auto__){
return cljs.core.first.call(null,cljs.core.shuffle.call(null,cljs.core.filter.call(null,event_may_occur_QMARK_,the_longtime_game.event.critical_events)));
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.first.call(null,cljs.core.shuffle.call(null,cljs.core.filter.call(null,event_may_occur_QMARK_,the_longtime_game.event.general_events)));
}
})();
if(cljs.core.truth_(event)){
return cljs.core.vec.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(event)], null),the_longtime_game.scene.marshal_scene.call(null,herd,event)));
} else {
return null;
}
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.event","pick-event","the-longtime-game.event/pick-event",773426761,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null)))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null))),cljs.spec.alpha.nilable_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null)),cljs.spec.alpha.tuple_impl.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_,cljs.core.ifn_QMARK_,cljs.core.ifn_QMARK_], null)),null),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null))),null,null,null));

//# sourceMappingURL=event.js.map
