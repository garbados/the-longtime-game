// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('the_longtime_game.moment');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('clojure.string');
goog.require('the_longtime_game.core');
goog.require('the_longtime_game.scene');
the_longtime_game.moment.basic_moments = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"wounded","wounded",-1496249886),new cljs.core.Keyword(null,"dancer","dancer",1858902435),new cljs.core.Keyword(null,"fierce","fierce",1314118154),new cljs.core.Keyword(null,"weary","weary",-1954742582),new cljs.core.Keyword(null,"attentive","attentive",1825756045),new cljs.core.Keyword(null,"poet","poet",-1154798706),new cljs.core.Keyword(null,"absent-minded","absent-minded",647626895),new cljs.core.Keyword(null,"sickly","sickly",304845331),new cljs.core.Keyword(null,"pessimistic","pessimistic",-1380698124),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"mystical","mystical",993807414),new cljs.core.Keyword(null,"depressed","depressed",1363801238),new cljs.core.Keyword(null,"optimistic","optimistic",1326863703),new cljs.core.Keyword(null,"pensive","pensive",-2084272581),new cljs.core.Keyword(null,"devoted","devoted",-1320576034),new cljs.core.Keyword(null,"angry","angry",1114596831),new cljs.core.Keyword(null,"loving","loving",-1055002625)],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3232_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3232_SHARP_)," limps on crutches as their wound heals."].join('');
}),(function (p1__3233_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3233_SHARP_)," rests on the ground, drifting between sleep and fever-dream."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3254_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3254_SHARP_)," whirls and flourishes about the camp, impressing nuance into each motion."].join('');
}),(function (p1__3255_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3255_SHARP_)," pulls another minot into a twirl, eliciting a beaming grin."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3226_SHARP_){
return ["Determined ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3226_SHARP_)," imprints wood and stone with honed force."].join('');
}),(function (p1__3227_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3227_SHARP_)," persists in strenuous effort, grunting to overcome their body's complaints."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3243_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3243_SHARP_)," collapses on their rump at day's end, relishing relaxation."].join('');
}),(function (p1__3244_SHARP_){
return ["Huffing with exertion, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3244_SHARP_)," struggles with their duties."].join('');
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3234_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3234_SHARP_)," scans the horizon for strangeness and opportunity."].join('');
}),(function (p1__3235_SHARP_){
return ["Ants pass industriously under ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3235_SHARP_),"'s watchful gaze."].join('');
}),(function (p1__3236_SHARP_){
return ["Watching a flower too closely, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3236_SHARP_)," cannot avoid a sneeze."].join('');
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3251_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3251_SHARP_)," can hardly find the words for their feelings, try as they might."].join('');
}),(function (p1__3252_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3252_SHARP_)," reflects on the stories they have heard, and that they might tell."].join('');
}),(function (p1__3253_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3253_SHARP_)," excitedly presses marks into clay, recording careful and decisive words."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3237_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3237_SHARP_)," peacefully watches the sky move overhead."].join('');
}),(function (p1__3238_SHARP_){
return ["Idleness bouys ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3238_SHARP_),"'s wandering spirit."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3230_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3230_SHARP_)," coughs heavily, worryingly."].join('');
}),(function (p1__3231_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3231_SHARP_)," shivers from a phantom chill."].join('');
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3248_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3248_SHARP_)," examines the ground underhoof and finds it wanting."].join('');
}),(function (p1__3249_SHARP_){
return ["Seasoned ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3249_SHARP_)," predicts foul weather."].join('');
}),(function (p1__3250_SHARP_){
return ["Nursing a wizened hesitance, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3250_SHARP_)," grumbles in disagreement."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3219_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3219_SHARP_)," feeds grass-apple bits to a gaggle of gossiping corvids."].join('');
}),(function (p1__3220_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3220_SHARP_)," whispers kind words to flora and fauna, tender hands evoking growth."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3241_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3241_SHARP_)," speaks to no-one in an unknown tongue."].join('');
}),(function (p1__3242_SHARP_){
return ["With unfocused eyes, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3242_SHARP_)," beseeches something nameless."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3239_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3239_SHARP_)," wonders with a silent sigh if life is worth it."].join('');
}),(function (p1__3240_SHARP_){
return ["Struggling to regain joy, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3240_SHARP_)," pursues idle hobbies."].join('');
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3245_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3245_SHARP_)," looks to the horizon and sees a bright tomorrow glimmering."].join('');
}),(function (p1__3246_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3246_SHARP_)," smiles at the sky, thankful for the day."].join('');
}),(function (p1__3247_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3247_SHARP_)," thinks things will work out this time."].join('');
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3221_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3221_SHARP_)," considers the stars above and wonders how they consider them in turn."].join('');
}),(function (p1__3222_SHARP_){
return ["Curious ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3222_SHARP_)," piles shaped rocks, only to watch them fall apart."].join('');
}),(function (p1__3223_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3223_SHARP_)," measures the alignment of the heavens."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3228_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3228_SHARP_)," rubs beads in their palm and prays to the Longtime intently."].join('');
}),(function (p1__3229_SHARP_){
return ["Tirelessly ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3229_SHARP_)," assists their brethren about the day."].join('');
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3216_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3216_SHARP_)," fumes at the hubris of the uncaring stars."].join('');
}),(function (p1__3217_SHARP_){
return ["Too angry to eat, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3217_SHARP_)," refuses an evening ration."].join('');
}),(function (p1__3218_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3218_SHARP_)," sits alone with their anger, wrestling in silence with the ineffable."].join('');
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__3224_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3224_SHARP_)," regales younglings with tales of adventure."].join('');
}),(function (p1__3225_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__3225_SHARP_)," consoles a grieving cousin for love found and lost."].join('');
})], null)]);
the_longtime_game.moment.moment_scenes = cljs.core.flatten.call(null,(function (){var iter__5523__auto__ = (function the_longtime_game$moment$iter__3256(s__3257){
return (new cljs.core.LazySeq(null,(function (){
var s__3257__$1 = s__3257;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3257__$1);
if(temp__5804__auto__){
var s__3257__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3257__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3257__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3259 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3258 = (0);
while(true){
if((i__3258 < size__5522__auto__)){
var vec__3260 = cljs.core._nth.call(null,c__5521__auto__,i__3258);
var trait = cljs.core.nth.call(null,vec__3260,(0),null);
var moments = cljs.core.nth.call(null,vec__3260,(1),null);
cljs.core.chunk_append.call(null,b__3259,(function (){var iter__5523__auto__ = ((function (i__3258,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__){
return (function the_longtime_game$moment$iter__3256_$_iter__3263(s__3264){
return (new cljs.core.LazySeq(null,((function (i__3258,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__){
return (function (){
var s__3264__$1 = s__3264;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__3264__$1);
if(temp__5804__auto____$1){
var s__3264__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3264__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first.call(null,s__3264__$2);
var size__5522__auto____$1 = cljs.core.count.call(null,c__5521__auto____$1);
var b__3266 = cljs.core.chunk_buffer.call(null,size__5522__auto____$1);
if((function (){var i__3265 = (0);
while(true){
if((i__3265 < size__5522__auto____$1)){
var text_fn = cljs.core._nth.call(null,c__5521__auto____$1,i__3265);
cljs.core.chunk_append.call(null,b__3266,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),((function (i__3265,i__3258,text_fn,c__5521__auto____$1,size__5522__auto____$1,b__3266,s__3264__$2,temp__5804__auto____$1,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__){
return (function() { 
var G__3290__delegate = function (_,p__3267,___$1){
var vec__3268 = p__3267;
var individual = cljs.core.nth.call(null,vec__3268,(0),null);
return text_fn.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(individual));
};
var G__3290 = function (_,p__3267,var_args){
var ___$1 = null;
if (arguments.length > 2) {
var G__3291__i = 0, G__3291__a = new Array(arguments.length -  2);
while (G__3291__i < G__3291__a.length) {G__3291__a[G__3291__i] = arguments[G__3291__i + 2]; ++G__3291__i;}
  ___$1 = new cljs.core.IndexedSeq(G__3291__a,0,null);
} 
return G__3290__delegate.call(this,_,p__3267,___$1);};
G__3290.cljs$lang$maxFixedArity = 2;
G__3290.cljs$lang$applyTo = (function (arglist__3292){
var _ = cljs.core.first(arglist__3292);
arglist__3292 = cljs.core.next(arglist__3292);
var p__3267 = cljs.core.first(arglist__3292);
var ___$1 = cljs.core.rest(arglist__3292);
return G__3290__delegate(_,p__3267,___$1);
});
G__3290.cljs$core$IFn$_invoke$arity$variadic = G__3290__delegate;
return G__3290;
})()
;})(i__3265,i__3258,text_fn,c__5521__auto____$1,size__5522__auto____$1,b__3266,s__3264__$2,temp__5804__auto____$1,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__))
,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),trait], null)], null)], null));

var G__3293 = (i__3265 + (1));
i__3265 = G__3293;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3266),the_longtime_game$moment$iter__3256_$_iter__3263.call(null,cljs.core.chunk_rest.call(null,s__3264__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3266),null);
}
} else {
var text_fn = cljs.core.first.call(null,s__3264__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),((function (i__3258,text_fn,s__3264__$2,temp__5804__auto____$1,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__){
return (function() { 
var G__3294__delegate = function (_,p__3271,___$1){
var vec__3272 = p__3271;
var individual = cljs.core.nth.call(null,vec__3272,(0),null);
return text_fn.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(individual));
};
var G__3294 = function (_,p__3271,var_args){
var ___$1 = null;
if (arguments.length > 2) {
var G__3295__i = 0, G__3295__a = new Array(arguments.length -  2);
while (G__3295__i < G__3295__a.length) {G__3295__a[G__3295__i] = arguments[G__3295__i + 2]; ++G__3295__i;}
  ___$1 = new cljs.core.IndexedSeq(G__3295__a,0,null);
} 
return G__3294__delegate.call(this,_,p__3271,___$1);};
G__3294.cljs$lang$maxFixedArity = 2;
G__3294.cljs$lang$applyTo = (function (arglist__3296){
var _ = cljs.core.first(arglist__3296);
arglist__3296 = cljs.core.next(arglist__3296);
var p__3271 = cljs.core.first(arglist__3296);
var ___$1 = cljs.core.rest(arglist__3296);
return G__3294__delegate(_,p__3271,___$1);
});
G__3294.cljs$core$IFn$_invoke$arity$variadic = G__3294__delegate;
return G__3294;
})()
;})(i__3258,text_fn,s__3264__$2,temp__5804__auto____$1,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__))
,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),trait], null)], null)], null),the_longtime_game$moment$iter__3256_$_iter__3263.call(null,cljs.core.rest.call(null,s__3264__$2)));
}
} else {
return null;
}
break;
}
});})(i__3258,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__))
,null,null));
});})(i__3258,vec__3260,trait,moments,c__5521__auto__,size__5522__auto__,b__3259,s__3257__$2,temp__5804__auto__))
;
return iter__5523__auto__.call(null,moments);
})());

var G__3297 = (i__3258 + (1));
i__3258 = G__3297;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3259),the_longtime_game$moment$iter__3256.call(null,cljs.core.chunk_rest.call(null,s__3257__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3259),null);
}
} else {
var vec__3275 = cljs.core.first.call(null,s__3257__$2);
var trait = cljs.core.nth.call(null,vec__3275,(0),null);
var moments = cljs.core.nth.call(null,vec__3275,(1),null);
return cljs.core.cons.call(null,(function (){var iter__5523__auto__ = ((function (vec__3275,trait,moments,s__3257__$2,temp__5804__auto__){
return (function the_longtime_game$moment$iter__3256_$_iter__3278(s__3279){
return (new cljs.core.LazySeq(null,(function (){
var s__3279__$1 = s__3279;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__3279__$1);
if(temp__5804__auto____$1){
var s__3279__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3279__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3279__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3281 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3280 = (0);
while(true){
if((i__3280 < size__5522__auto__)){
var text_fn = cljs.core._nth.call(null,c__5521__auto__,i__3280);
cljs.core.chunk_append.call(null,b__3281,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),((function (i__3280,text_fn,c__5521__auto__,size__5522__auto__,b__3281,s__3279__$2,temp__5804__auto____$1,vec__3275,trait,moments,s__3257__$2,temp__5804__auto__){
return (function() { 
var G__3298__delegate = function (_,p__3282,___$1){
var vec__3283 = p__3282;
var individual = cljs.core.nth.call(null,vec__3283,(0),null);
return text_fn.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(individual));
};
var G__3298 = function (_,p__3282,var_args){
var ___$1 = null;
if (arguments.length > 2) {
var G__3299__i = 0, G__3299__a = new Array(arguments.length -  2);
while (G__3299__i < G__3299__a.length) {G__3299__a[G__3299__i] = arguments[G__3299__i + 2]; ++G__3299__i;}
  ___$1 = new cljs.core.IndexedSeq(G__3299__a,0,null);
} 
return G__3298__delegate.call(this,_,p__3282,___$1);};
G__3298.cljs$lang$maxFixedArity = 2;
G__3298.cljs$lang$applyTo = (function (arglist__3300){
var _ = cljs.core.first(arglist__3300);
arglist__3300 = cljs.core.next(arglist__3300);
var p__3282 = cljs.core.first(arglist__3300);
var ___$1 = cljs.core.rest(arglist__3300);
return G__3298__delegate(_,p__3282,___$1);
});
G__3298.cljs$core$IFn$_invoke$arity$variadic = G__3298__delegate;
return G__3298;
})()
;})(i__3280,text_fn,c__5521__auto__,size__5522__auto__,b__3281,s__3279__$2,temp__5804__auto____$1,vec__3275,trait,moments,s__3257__$2,temp__5804__auto__))
,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),trait], null)], null)], null));

var G__3301 = (i__3280 + (1));
i__3280 = G__3301;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3281),the_longtime_game$moment$iter__3256_$_iter__3278.call(null,cljs.core.chunk_rest.call(null,s__3279__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3281),null);
}
} else {
var text_fn = cljs.core.first.call(null,s__3279__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text-fn","text-fn",1202470087),((function (text_fn,s__3279__$2,temp__5804__auto____$1,vec__3275,trait,moments,s__3257__$2,temp__5804__auto__){
return (function() { 
var G__3302__delegate = function (_,p__3286,___$1){
var vec__3287 = p__3286;
var individual = cljs.core.nth.call(null,vec__3287,(0),null);
return text_fn.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(individual));
};
var G__3302 = function (_,p__3286,var_args){
var ___$1 = null;
if (arguments.length > 2) {
var G__3303__i = 0, G__3303__a = new Array(arguments.length -  2);
while (G__3303__i < G__3303__a.length) {G__3303__a[G__3303__i] = arguments[G__3303__i + 2]; ++G__3303__i;}
  ___$1 = new cljs.core.IndexedSeq(G__3303__a,0,null);
} 
return G__3302__delegate.call(this,_,p__3286,___$1);};
G__3302.cljs$lang$maxFixedArity = 2;
G__3302.cljs$lang$applyTo = (function (arglist__3304){
var _ = cljs.core.first(arglist__3304);
arglist__3304 = cljs.core.next(arglist__3304);
var p__3286 = cljs.core.first(arglist__3304);
var ___$1 = cljs.core.rest(arglist__3304);
return G__3302__delegate(_,p__3286,___$1);
});
G__3302.cljs$core$IFn$_invoke$arity$variadic = G__3302__delegate;
return G__3302;
})()
;})(text_fn,s__3279__$2,temp__5804__auto____$1,vec__3275,trait,moments,s__3257__$2,temp__5804__auto__))
,new cljs.core.Keyword(null,"selects","selects",-402693929),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"traits","traits",1778193407),trait], null)], null)], null),the_longtime_game$moment$iter__3256_$_iter__3278.call(null,cljs.core.rest.call(null,s__3279__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(vec__3275,trait,moments,s__3257__$2,temp__5804__auto__))
;
return iter__5523__auto__.call(null,moments);
})(),the_longtime_game$moment$iter__3256.call(null,cljs.core.rest.call(null,s__3257__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,the_longtime_game.moment.basic_moments);
})());
the_longtime_game.moment.gen_moments = (function the_longtime_game$moment$gen_moments(herd){
return clojure.string.join.call(null," ",cljs.core.take.call(null,(2),cljs.core.map.call(null,(function (p__3305){
var vec__3306 = p__3305;
var text_fn = cljs.core.nth.call(null,vec__3306,(0),null);
var _ = cljs.core.nth.call(null,vec__3306,(1),null);
return text_fn.call(null);
}),cljs.core.map.call(null,cljs.core.partial.call(null,the_longtime_game.scene.marshal_scene,herd),cljs.core.filter.call(null,cljs.core.partial.call(null,the_longtime_game.scene.scene_may_occur_QMARK_,herd),cljs.core.shuffle.call(null,the_longtime_game.moment.moment_scenes))))));
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.moment","gen-moments","the-longtime-game.moment/gen-moments",-587239554,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"herd","herd",783636970)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"herd","herd",783636970),new cljs.core.Keyword("the-longtime-game.core","herd","the-longtime-game.core/herd",604656391)),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_,null,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),null,null,null));

//# sourceMappingURL=moment.js.map
