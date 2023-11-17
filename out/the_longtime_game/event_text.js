// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('the_longtime_game.event_text');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('the_longtime_game.core');
goog.require('the_longtime_game.text');
the_longtime_game.event_text._trait__GT_adj = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"angry","angry",1114596831),"strong",new cljs.core.Keyword(null,"kind","kind",-717265803),"loving",new cljs.core.Keyword(null,"attentive","attentive",1825756045),"detailed",new cljs.core.Keyword(null,"mystical","mystical",993807414),"mysterious",new cljs.core.Keyword(null,"optimistic","optimistic",1326863703),"hopeful",new cljs.core.Keyword(null,"poet","poet",-1154798706),"eloquent"], null);
the_longtime_game.event_text._journeying_remarks = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["camping in the woods","stampeding with another herd","seeing distant lands"], null);
the_longtime_game.event_text._offshoot_reasons = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["followed the trail","augured the stars","stumbled half-starved"], null);
/**
 * @param {...*} var_args
 */
the_longtime_game.event_text.crossed_paths = (function() { 
var the_longtime_game$event_text$crossed_paths__delegate = function (herd,p__2868,_){
var vec__2869 = p__2868;
var orgcow = cljs.core.nth.call(null,vec__2869,(0),null);
var other_herd_name = cljs.core.rand_nth.call(null,the_longtime_game.core.herd_names);
return clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 19, 5, cljs.core.PersistentVector.EMPTY_NODE, ["It takes a fair bit of planning for herds to safely cross paths,","as",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(orgcow),"well knows.","Their coming and going changes the land;","delicate landscapes turn quickly to stamped mush.","So today they pass nearby, and a festival is held between.","Apples and haysweets, honored effigies, music and dancing;","A mutual celebration of life!","The next morning,",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(orgcow),"clasps their counterpart's hand.","Perhaps",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(herd),"and",other_herd_name,"will meet again in their lifetimes.","Perhaps they will only know each other once more","in the folds of eternity."], null));
};
var the_longtime_game$event_text$crossed_paths = function (herd,p__2868,var_args){
var _ = null;
if (arguments.length > 2) {
var G__2872__i = 0, G__2872__a = new Array(arguments.length -  2);
while (G__2872__i < G__2872__a.length) {G__2872__a[G__2872__i] = arguments[G__2872__i + 2]; ++G__2872__i;}
  _ = new cljs.core.IndexedSeq(G__2872__a,0,null);
} 
return the_longtime_game$event_text$crossed_paths__delegate.call(this,herd,p__2868,_);};
the_longtime_game$event_text$crossed_paths.cljs$lang$maxFixedArity = 2;
the_longtime_game$event_text$crossed_paths.cljs$lang$applyTo = (function (arglist__2873){
var herd = cljs.core.first(arglist__2873);
arglist__2873 = cljs.core.next(arglist__2873);
var p__2868 = cljs.core.first(arglist__2873);
var _ = cljs.core.rest(arglist__2873);
return the_longtime_game$event_text$crossed_paths__delegate(herd,p__2868,_);
});
the_longtime_game$event_text$crossed_paths.cljs$core$IFn$_invoke$arity$variadic = the_longtime_game$event_text$crossed_paths__delegate;
return the_longtime_game$event_text$crossed_paths;
})()
;
/**
 * @param {...*} var_args
 */
the_longtime_game.event_text.depression_ends = (function() { 
var the_longtime_game$event_text$depression_ends__delegate = function (_,p__2874,___$1){
var vec__2875 = p__2874;
var sadcow = cljs.core.nth.call(null,vec__2875,(0),null);
var healcow = cljs.core.nth.call(null,vec__2875,(1),null);
var therapy_adj = (function (){var or__5045__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.some_QMARK_,cljs.core.map.call(null,the_longtime_game.event_text._trait__GT_adj,new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(healcow))));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "thoughtful";
}
})();
return clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 24, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(sadcow),"has been talking with",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(healcow),"lately.","Much has troubled the former,","about their life, their experiences, their place.","It has sabotaged their ability to feel joy; to feel at all.","What once fueled their passions has grown mundane and meaningless.","But",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(healcow),"has had ",therapy_adj,"words for them,","and open ears for them to speak and be heard.","In sitting with these words,",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(healcow),"has come to a new comprehension.","Habits and routines evolve, slowly but surely, to satisfy one's opaque needs.","A novel peace blossoms over the mind's rough terrain,","and old devotions return like a dawn, ray by sunborn ray.","Thanks are insufficient. A gift is made, and refused, and shared.","\"No gift is necessary. We do this for each other,\" ",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(healcow),"asserts, \"Now and always.\""], null));
};
var the_longtime_game$event_text$depression_ends = function (_,p__2874,var_args){
var ___$1 = null;
if (arguments.length > 2) {
var G__2878__i = 0, G__2878__a = new Array(arguments.length -  2);
while (G__2878__i < G__2878__a.length) {G__2878__a[G__2878__i] = arguments[G__2878__i + 2]; ++G__2878__i;}
  ___$1 = new cljs.core.IndexedSeq(G__2878__a,0,null);
} 
return the_longtime_game$event_text$depression_ends__delegate.call(this,_,p__2874,___$1);};
the_longtime_game$event_text$depression_ends.cljs$lang$maxFixedArity = 2;
the_longtime_game$event_text$depression_ends.cljs$lang$applyTo = (function (arglist__2879){
var _ = cljs.core.first(arglist__2879);
arglist__2879 = cljs.core.next(arglist__2879);
var p__2874 = cljs.core.first(arglist__2879);
var ___$1 = cljs.core.rest(arglist__2879);
return the_longtime_game$event_text$depression_ends__delegate(_,p__2874,___$1);
});
the_longtime_game$event_text$depression_ends.cljs$core$IFn$_invoke$arity$variadic = the_longtime_game$event_text$depression_ends__delegate;
return the_longtime_game$event_text$depression_ends;
})()
;
the_longtime_game.event_text.fire_BANG_ = (function the_longtime_game$event_text$fire_BANG_(_,p__2880,infra){
var vec__2881 = p__2880;
var eepycow = cljs.core.nth.call(null,vec__2881,(0),null);
if((infra instanceof cljs.core.Keyword)){
return clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 22, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(eepycow),"awakens with a start from a frightening dream.","A great fire spirit slipped from their exhausted limbs","and swept about the earthen-thatch dwelling.","It is not easy for fire to catch that moist matter;","the spirit must have been motivated.","In the waking world,",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(eepycow),"witnesses the conflagration","bake the hovel around them.","They rush out as the smoke thickens, and coughing they watch it spread.","A water brigade forms while sparks spread from roof to roof.","Most of the camp is saved, but the",cljs.core.name.call(null,infra),"emerges little more than ash and ruin.",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(eepycow),"finds the tipped-over oil lamp that started it all,","that must still have been burning when they fell asleep.","They have been so tired lately, something deep in their bones dragging them down.","Perhaps it was that spirit, they wonder.","Perhaps now it is gone.","A lightness enters their step; a burden, flown away."], null));
} else {
return "";
}
});
the_longtime_game.event_text.gruxnis_attack_BANG_ = (function the_longtime_game$event_text$gruxnis_attack_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2891 = arguments.length;
var i__5770__auto___2892 = (0);
while(true){
if((i__5770__auto___2892 < len__5769__auto___2891)){
args__5775__auto__.push((arguments[i__5770__auto___2892]));

var G__2893 = (i__5770__auto___2892 + (1));
i__5770__auto___2892 = G__2893;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return the_longtime_game.event_text.gruxnis_attack_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(the_longtime_game.event_text.gruxnis_attack_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (_herd,p__2887,_){
var vec__2888 = p__2887;
var victim = cljs.core.nth.call(null,vec__2888,(0),null);
var ibba = cljs.core.nth.call(null,vec__2888,(1),null);
return the_longtime_game.text.join_text.call(null,"A Grux'nis is a great beast,\n   a glorious testament to the fecund murk\n   of the Yuliak Range's swampy base.\n   Tough and shiny scales,\n   quick and vicious beak,\n   and toesome flippers that flop on land\n   but fly in water.\n   They eat the bottom-feeders of the upland bogs,\n   but can be drawn by chance down the riverfloes\n   to the paths of the herds.",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(victim),"was attacked on the beach,","where",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ibba),"fought it off with adroit hand and crushing arm.","The beast was only scared back into the water, but not to end its ways.\n   So the threat remained.",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ibba),"traveled out lonesome to riddle with other herds","of how to pacify a Grux'nis.\n    In their heart they could not accept killing the animal outright,\n    though some argued easily for the necessity.\n    Facile, they thought.\n    But still they took a spear and went to kill the thing.\n    They goaded it with caught fish,\n    but recognized in its rampaging eye a worm --\n    a worm that aggravates the temper,\n    and elicits rampant violence,\n    that can be driven out with a tincture.\n    Deftly they fought with the beast, as the sun rose and fell,\n    nipping it with a blade bathed in sleeping poison.\n    Blow by blow, the Grux'nis staggered,\n    until it felt, and slept!\n    Asleep,",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ibba),"could treat it.","It awoke bound but clear-eyed.",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ibba),"would not take chances,","not more than this chance of knowing a Grux'nis in peace,\n    and though it struggled she watched it.\n    It was nervous now more than hungry, more than vicious.\n    So after a time they brought it to the river's edge and undid the bonds.\n    It fled, disappearing into the river with all the sound of a single droplet.\n    After that there were no more attacks.\n    The relief at violence averted brought great celebration.","But",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ibba),"wondered still, where that creature","would go now. Back to the upland bogs, perhaps?\n    Or perhaps... to stay near,\n    to protect the one that saved its mind.");
}));

(the_longtime_game.event_text.gruxnis_attack_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(the_longtime_game.event_text.gruxnis_attack_BANG_.cljs$lang$applyTo = (function (seq2884){
var G__2885 = cljs.core.first.call(null,seq2884);
var seq2884__$1 = cljs.core.next.call(null,seq2884);
var G__2886 = cljs.core.first.call(null,seq2884__$1);
var seq2884__$2 = cljs.core.next.call(null,seq2884__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2885,G__2886,seq2884__$2);
}));

/**
 * @param {...*} var_args
 */
the_longtime_game.event_text.journeying_ends = (function() { 
var the_longtime_game$event_text$journeying_ends__delegate = function (herd,_){
var journeycow = cljs.core.first.call(null,new cljs.core.Keyword(null,"new-adults","new-adults",614990126).cljs$core$IFn$_invoke$arity$1(herd));
var spent_time = cljs.core.rand_nth.call(null,the_longtime_game.event_text._journeying_remarks);
return clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(journeycow),"has come in from their journey.","A year ago, they set out from this very herd, to live apart from it","and understand the absence of its warmth.","The growing adult spent that time",spent_time,"but admits, after many glasses of mulled wine,","that",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(herd),"has the greener grass underhoof."], null));
};
var the_longtime_game$event_text$journeying_ends = function (herd,var_args){
var _ = null;
if (arguments.length > 1) {
var G__2894__i = 0, G__2894__a = new Array(arguments.length -  1);
while (G__2894__i < G__2894__a.length) {G__2894__a[G__2894__i] = arguments[G__2894__i + 1]; ++G__2894__i;}
  _ = new cljs.core.IndexedSeq(G__2894__a,0,null);
} 
return the_longtime_game$event_text$journeying_ends__delegate.call(this,herd,_);};
the_longtime_game$event_text$journeying_ends.cljs$lang$maxFixedArity = 1;
the_longtime_game$event_text$journeying_ends.cljs$lang$applyTo = (function (arglist__2895){
var herd = cljs.core.first(arglist__2895);
var _ = cljs.core.rest(arglist__2895);
return the_longtime_game$event_text$journeying_ends__delegate(herd,_);
});
the_longtime_game$event_text$journeying_ends.cljs$core$IFn$_invoke$arity$variadic = the_longtime_game$event_text$journeying_ends__delegate;
return the_longtime_game$event_text$journeying_ends;
})()
;
/**
 * @param {...*} var_args
 */
the_longtime_game.event_text.offshoot_joins = (function() { 
var the_longtime_game$event_text$offshoot_joins__delegate = function (herd,_){
var reason = cljs.core.rand_nth.call(null,the_longtime_game.event_text._offshoot_reasons);
return clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Herds crumble to bits. Scared and hungry people factionalize.","Even vast herds can splinter into bands of half a dozen,","a flood of hooves that disappears like a ripple across the continent.","A fair few today have found",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(herd),"and committed to its Longtime.","They have",reason,"to the herd's embrace.","With fire and wine, the many dance and celebrate.","May this plenitude persist!","May their faith be true."], null));
};
var the_longtime_game$event_text$offshoot_joins = function (herd,var_args){
var _ = null;
if (arguments.length > 1) {
var G__2896__i = 0, G__2896__a = new Array(arguments.length -  1);
while (G__2896__i < G__2896__a.length) {G__2896__a[G__2896__i] = arguments[G__2896__i + 1]; ++G__2896__i;}
  _ = new cljs.core.IndexedSeq(G__2896__a,0,null);
} 
return the_longtime_game$event_text$offshoot_joins__delegate.call(this,herd,_);};
the_longtime_game$event_text$offshoot_joins.cljs$lang$maxFixedArity = 1;
the_longtime_game$event_text$offshoot_joins.cljs$lang$applyTo = (function (arglist__2897){
var herd = cljs.core.first(arglist__2897);
var _ = cljs.core.rest(arglist__2897);
return the_longtime_game$event_text$offshoot_joins__delegate(herd,_);
});
the_longtime_game$event_text$offshoot_joins.cljs$core$IFn$_invoke$arity$variadic = the_longtime_game$event_text$offshoot_joins__delegate;
return the_longtime_game$event_text$offshoot_joins;
})()
;
the_longtime_game.event_text.plague = (function the_longtime_game$event_text$plague(_,p__2898,passed_QMARK_){
var vec__2899 = p__2898;
var individual = cljs.core.nth.call(null,vec__2899,(0),null);
return clojure.string.join.call(null," ",(cljs.core.truth_(passed_QMARK_)?new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["An ill wind seizes the people.","Many fall sick; healers leap into action.","They draw from plentiful reserves","of medicines and expertise,","preserving the lives of those afflicted.","Slowly but surely, they recover,","returning to the daily business of the herd","bit by bit, gently, day by day.","A season of loss, averted!"], null):new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["An ill wind seizes the people.","Many fall sick; healers leap into action,","though they are too little. Too late.",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(individual),"is not strong enough.","For want of experts and remedies,","they perish in simmering agony.","With hollow, shallow breath, last words slip out.","\"Live on,\" they beg, \"For me. For everyone.\""], null)));
});
the_longtime_game.event_text.ration_rot = (function the_longtime_game$event_text$ration_rot(_,___$1,sanitarian){
return clojure.string.join.call(null," ",(cljs.core.truth_(sanitarian)?new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, ["The wrong sort of bug got the scent of our stores,","and they buggered right in there overnight.","What a mess.","But",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(sanitarian),"spotted it right away.","First thing in the morning, they threw the lot in sacks","and queued them for the pyre.","By then others were disinfecting the earthen-cellar","with tenderfire and incense.","We've lost a fair few meals from the ordeal,","but we'll live.","That was never in doubt."], null):new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, ["The wrong sort of bug got the scent of our stores,","and they buggered right in there overnight.","What a mess.","Novice medicinairs even distributed rations","before we noticed what had happened.","The illness now spreading is only temporary,","and never fatal. It's just pain and gas.","Still, the whole camp will smell","like burnt grasshoppers","all week,","and a great many meals went to the pyre","to stop the rot's spread.","But, we'll live.","That was never in doubt."], null)));
});
/**
 * @param {...*} var_args
 */
the_longtime_game.event_text.wound_healed = (function() { 
var the_longtime_game$event_text$wound_healed__delegate = function (_,p__2902,___$1){
var vec__2903 = p__2902;
var sadcow = cljs.core.nth.call(null,vec__2903,(0),null);
var healcow = cljs.core.nth.call(null,vec__2903,(1),null);
return clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Disability is produced by inaccessibility.","An order which excludes by design, limits its own potential.","Such an order can prevail even silently,","imagining no such barrier could exist.","It must be rooted out,",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(healcow),"knows.","Accommodations call for quality of craft and heartful vision.","Some wounds never really heal, mental or physical,","but we can make the changes we need,","as long as we devote the effort and expertise.","Only in so doing can we live up to our values.",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(sadcow),"offers a small thanks,","but their eyes go to the horizon,","the world open to them unfettered."], null));
};
var the_longtime_game$event_text$wound_healed = function (_,p__2902,var_args){
var ___$1 = null;
if (arguments.length > 2) {
var G__2906__i = 0, G__2906__a = new Array(arguments.length -  2);
while (G__2906__i < G__2906__a.length) {G__2906__a[G__2906__i] = arguments[G__2906__i + 2]; ++G__2906__i;}
  ___$1 = new cljs.core.IndexedSeq(G__2906__a,0,null);
} 
return the_longtime_game$event_text$wound_healed__delegate.call(this,_,p__2902,___$1);};
the_longtime_game$event_text$wound_healed.cljs$lang$maxFixedArity = 2;
the_longtime_game$event_text$wound_healed.cljs$lang$applyTo = (function (arglist__2907){
var _ = cljs.core.first(arglist__2907);
arglist__2907 = cljs.core.next(arglist__2907);
var p__2902 = cljs.core.first(arglist__2907);
var ___$1 = cljs.core.rest(arglist__2907);
return the_longtime_game$event_text$wound_healed__delegate(_,p__2902,___$1);
});
the_longtime_game$event_text$wound_healed.cljs$core$IFn$_invoke$arity$variadic = the_longtime_game$event_text$wound_healed__delegate;
return the_longtime_game$event_text$wound_healed;
})()
;
the_longtime_game.event_text.funeral = (function the_longtime_game$event_text$funeral(_herd,p__2908,deadcow){
var vec__2909 = p__2908;
var mourncow = cljs.core.nth.call(null,vec__2909,(0),null);
return the_longtime_game.text.join_text.call(null,"All living things return to soil.\n      Life comes from life through death.\n      That is the cycle.\n      For the dead, the soil is turned over,\n      so that they lie deep beneath it,\n      and a sapling is placed over them.\n      What remains to mark their passing\n      is a mound in the earth\n      that becomes a limb of the land.",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(deadcow),"was a friend of",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(mourncow),";","they will try to remember them fondly,\n      however bitterly their absence tastes.\n      They leave a complex legacy, a hole in the tapestry of the herd\n      that will take generations to scar over.\n      A friend heaps dirt on a hole in the ground\n      where their confidant will remain forever,\n      until the pieces of them return,\n      spoken by the tongues of the wind.\n      Life goes on,\n      differently.");
});

//# sourceMappingURL=event_text.js.map
