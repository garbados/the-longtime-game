// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('the_longtime_game.text');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('clojure.string');
the_longtime_game.text.default_width = (80);
the_longtime_game.text.normalize_name = (function the_longtime_game$text$normalize_name(x){
if((x instanceof cljs.core.Keyword)){
return clojure.string.join.call(null," ",cljs.core.map.call(null,clojure.string.capitalize,clojure.string.split.call(null,cljs.core.name.call(null,x),/-/)));
} else {
if(((typeof x === 'number') && (((((0) < x)) && ((x < (1))))))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((((100) * x) | (0))),"%"].join('');
} else {
if(typeof x === 'string'){
return x;
} else {
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(x);

}
}
}
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","normalize-name","the-longtime-game.text/normalize-name",1312252009,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.any_QMARK_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_,null,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),null,null,null));
the_longtime_game.text.match_prefix = (function the_longtime_game$text$match_prefix(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2391 = arguments.length;
var i__5770__auto___2392 = (0);
while(true){
if((i__5770__auto___2392 < len__5769__auto___2391)){
args__5775__auto__.push((arguments[i__5770__auto___2392]));

var G__2393 = (i__5770__auto___2392 + (1));
i__5770__auto___2392 = G__2393;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return the_longtime_game.text.match_prefix.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(the_longtime_game.text.match_prefix.cljs$core$IFn$_invoke$arity$variadic = (function (l,p__2389){
var map__2390 = p__2389;
var map__2390__$1 = cljs.core.__destructure_map.call(null,map__2390);
var mid_char = cljs.core.get.call(null,map__2390__$1,new cljs.core.Keyword(null,"mid-char","mid-char",-434572293),"\u251C");
var end_char = cljs.core.get.call(null,map__2390__$1,new cljs.core.Keyword(null,"end-char","end-char",912903586),"\u2514");
return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.constantly.call(null,mid_char),cljs.core.range.call(null,(cljs.core.count.call(null,l) - (1)))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [end_char], null));
}));

(the_longtime_game.text.match_prefix.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(the_longtime_game.text.match_prefix.cljs$lang$applyTo = (function (seq2387){
var G__2388 = cljs.core.first.call(null,seq2387);
var seq2387__$1 = cljs.core.next.call(null,seq2387);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2388,seq2387__$1);
}));

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","match-prefix","the-longtime-game.text/match-prefix",-236676174,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"l","l",1395893423),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"l","l",1395893423),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"l","l",1395893423)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"any?","any?",-318999933,null),cljs.core.any_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2394){
return cljs.core.coll_QMARK_.call(null,G__2394);
})], null),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"l","l",1395893423),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"string?","string?",-1129175764,null),cljs.core.string_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2395){
return cljs.core.coll_QMARK_.call(null,G__2395);
})], null),null),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),null,null,null));
the_longtime_game.text.join_text = (function the_longtime_game$text$join_text(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2398 = arguments.length;
var i__5770__auto___2399 = (0);
while(true){
if((i__5770__auto___2399 < len__5769__auto___2398)){
args__5775__auto__.push((arguments[i__5770__auto___2399]));

var G__2400 = (i__5770__auto___2399 + (1));
i__5770__auto___2399 = G__2400;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return the_longtime_game.text.join_text.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(the_longtime_game.text.join_text.cljs$core$IFn$_invoke$arity$variadic = (function (s){
return clojure.string.join.call(null," ",cljs.core.filter.call(null,(function (p1__2396_SHARP_){
return cljs.core.pos_int_QMARK_.call(null,cljs.core.count.call(null,p1__2396_SHARP_));
}),cljs.core.map.call(null,clojure.string.trim,clojure.string.split_lines.call(null,clojure.string.join.call(null," ",s)))));
}));

(the_longtime_game.text.join_text.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(the_longtime_game.text.join_text.cljs$lang$applyTo = (function (seq2397){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq2397));
}));

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","join-text","the-longtime-game.text/join-text",-1241104482,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"*","*",-1294732318),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","*","cljs.spec.alpha/*",-1238084288,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"fn","fn",-1175266204),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ret","ret",1172308713,null)], null)], null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","nil?","cljs.core/nil?",945071861,null),cljs.core.list(new cljs.core.Symbol("cljs.core","re-find","cljs.core/re-find",745076500,null),/\n/,new cljs.core.Symbol(null,"ret","ret",1172308713,null))))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"*","*",-1294732318),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","*","cljs.spec.alpha/*",-1238084288,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Keyword(null,"*","*",-1294732318)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_,cljs.spec.alpha.rep_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","*","cljs.spec.alpha/*",-1238084288,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"*","*",-1294732318),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","*","cljs.spec.alpha/*",-1238084288,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_,null,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ret","ret",1172308713,null)], null)], null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","nil?","cljs.core/nil?",945071861,null),cljs.core.list(new cljs.core.Symbol("cljs.core","re-find","cljs.core/re-find",745076500,null),/\n/,new cljs.core.Symbol(null,"ret","ret",1172308713,null)))),(function (p__2401){
var map__2402 = p__2401;
var map__2402__$1 = cljs.core.__destructure_map.call(null,map__2402);
var ret = cljs.core.get.call(null,map__2402__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
return (cljs.core.re_find.call(null,/\n/,ret) == null);
}),null,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ret","ret",1172308713,null)], null)], null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","nil?","cljs.core/nil?",945071861,null),cljs.core.list(new cljs.core.Symbol("cljs.core","re-find","cljs.core/re-find",745076500,null),/\n/,new cljs.core.Symbol(null,"ret","ret",1172308713,null)))),null));
the_longtime_game.text.collect_text = (function the_longtime_game$text$collect_text(s){
var iter__5523__auto__ = (function the_longtime_game$text$collect_text_$_iter__2403(s__2404){
return (new cljs.core.LazySeq(null,(function (){
var s__2404__$1 = s__2404;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__2404__$1);
if(temp__5804__auto__){
var s__2404__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2404__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2404__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2406 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2405 = (0);
while(true){
if((i__2405 < size__5522__auto__)){
var p = cljs.core._nth.call(null,c__5521__auto__,i__2405);
cljs.core.chunk_append.call(null,b__2406,clojure.string.join.call(null,"\n",cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.pos_int_QMARK_,cljs.core.count),cljs.core.map.call(null,clojure.string.trim,clojure.string.split_lines.call(null,p)))));

var G__2407 = (i__2405 + (1));
i__2405 = G__2407;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2406),the_longtime_game$text$collect_text_$_iter__2403.call(null,cljs.core.chunk_rest.call(null,s__2404__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2406),null);
}
} else {
var p = cljs.core.first.call(null,s__2404__$2);
return cljs.core.cons.call(null,clojure.string.join.call(null,"\n",cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.pos_int_QMARK_,cljs.core.count),cljs.core.map.call(null,clojure.string.trim,clojure.string.split_lines.call(null,p)))),the_longtime_game$text$collect_text_$_iter__2403.call(null,cljs.core.rest.call(null,s__2404__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,clojure.string.split.call(null,s,/\n\n/));
});
cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","collect-text","the-longtime-game.text/collect-text",1319082618,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"string?","string?",-1129175764,null),cljs.core.string_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2408){
return cljs.core.coll_QMARK_.call(null,G__2408);
})], null),null),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),null,null,null));
the_longtime_game.text.wrap_text = (function the_longtime_game$text$wrap_text(var_args){
var G__2411 = arguments.length;
switch (G__2411) {
case 1:
return the_longtime_game.text.wrap_text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return the_longtime_game.text.wrap_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(the_longtime_game.text.wrap_text.cljs$core$IFn$_invoke$arity$1 = (function (s){
return the_longtime_game.text.wrap_text.call(null,s,the_longtime_game.text.default_width);
}));

(the_longtime_game.text.wrap_text.cljs$core$IFn$_invoke$arity$2 = (function (s,width){
return cljs.core.map.call(null,(function (p1__2409_SHARP_){
return clojure.string.join.call(null," ",p1__2409_SHARP_);
}),cljs.core.reduce.call(null,(function (lines,line){
return cljs.core.reduce.call(null,(function (segment,word){
var line__$1 = cljs.core.last.call(null,segment);
var line_STAR_ = clojure.string.join.call(null," ",cljs.core.concat.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [word], null)));
var line_width = ((line_STAR_).length);
if((line_width > width)){
return cljs.core.conj.call(null,segment,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [word], null));
} else {
return cljs.core.conj.call(null,cljs.core.pop.call(null,segment),cljs.core.conj.call(null,line__$1,word));
}
}),lines,clojure.string.split.call(null,line,/ /));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null),clojure.string.split_lines.call(null,s)));
}));

(the_longtime_game.text.wrap_text.cljs$lang$maxFixedArity = 2);

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","wrap-text","the-longtime-game.text/wrap-text",-1828012328,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"default","default",-1987822328),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword(null,"custom","custom",340151948),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null))),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"default","default",-1987822328),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword(null,"custom","custom",340151948),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null))),cljs.spec.alpha.or_spec_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword(null,"custom","custom",340151948)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)], null)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Keyword(null,"width","width",-384071477)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_,cljs.core.pos_int_QMARK_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null)], null))], null),null),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"default","default",-1987822328),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword(null,"custom","custom",340151948),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null))),cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"string?","string?",-1129175764,null),cljs.core.string_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2413){
return cljs.core.coll_QMARK_.call(null,G__2413);
})], null),null),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),null,null,null));
the_longtime_game.text.quote_sections = (function the_longtime_game$text$quote_sections(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2430 = arguments.length;
var i__5770__auto___2431 = (0);
while(true){
if((i__5770__auto___2431 < len__5769__auto___2430)){
args__5775__auto__.push((arguments[i__5770__auto___2431]));

var G__2432 = (i__5770__auto___2431 + (1));
i__5770__auto___2431 = G__2432;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return the_longtime_game.text.quote_sections.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(the_longtime_game.text.quote_sections.cljs$core$IFn$_invoke$arity$variadic = (function (sections,p__2416){
var map__2417 = p__2416;
var map__2417__$1 = cljs.core.__destructure_map.call(null,map__2417);
var prefix = cljs.core.get.call(null,map__2417__$1,new cljs.core.Keyword(null,"prefix","prefix",-265908465),">");
return clojure.string.join.call(null,["\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),"\n"].join(''),(function (){var iter__5523__auto__ = (function the_longtime_game$text$iter__2418(s__2419){
return (new cljs.core.LazySeq(null,(function (){
var s__2419__$1 = s__2419;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__2419__$1);
if(temp__5804__auto__){
var s__2419__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2419__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2419__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2421 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2420 = (0);
while(true){
if((i__2420 < size__5522__auto__)){
var section = cljs.core._nth.call(null,c__5521__auto__,i__2420);
cljs.core.chunk_append.call(null,b__2421,clojure.string.join.call(null,"\n",(function (){var iter__5523__auto__ = ((function (i__2420,section,c__5521__auto__,size__5522__auto__,b__2421,s__2419__$2,temp__5804__auto__,map__2417,map__2417__$1,prefix){
return (function the_longtime_game$text$iter__2418_$_iter__2422(s__2423){
return (new cljs.core.LazySeq(null,((function (i__2420,section,c__5521__auto__,size__5522__auto__,b__2421,s__2419__$2,temp__5804__auto__,map__2417,map__2417__$1,prefix){
return (function (){
var s__2423__$1 = s__2423;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__2423__$1);
if(temp__5804__auto____$1){
var s__2423__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2423__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first.call(null,s__2423__$2);
var size__5522__auto____$1 = cljs.core.count.call(null,c__5521__auto____$1);
var b__2425 = cljs.core.chunk_buffer.call(null,size__5522__auto____$1);
if((function (){var i__2424 = (0);
while(true){
if((i__2424 < size__5522__auto____$1)){
var line = cljs.core._nth.call(null,c__5521__auto____$1,i__2424);
cljs.core.chunk_append.call(null,b__2425,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''));

var G__2433 = (i__2424 + (1));
i__2424 = G__2433;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2425),the_longtime_game$text$iter__2418_$_iter__2422.call(null,cljs.core.chunk_rest.call(null,s__2423__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2425),null);
}
} else {
var line = cljs.core.first.call(null,s__2423__$2);
return cljs.core.cons.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''),the_longtime_game$text$iter__2418_$_iter__2422.call(null,cljs.core.rest.call(null,s__2423__$2)));
}
} else {
return null;
}
break;
}
});})(i__2420,section,c__5521__auto__,size__5522__auto__,b__2421,s__2419__$2,temp__5804__auto__,map__2417,map__2417__$1,prefix))
,null,null));
});})(i__2420,section,c__5521__auto__,size__5522__auto__,b__2421,s__2419__$2,temp__5804__auto__,map__2417,map__2417__$1,prefix))
;
return iter__5523__auto__.call(null,section);
})()));

var G__2434 = (i__2420 + (1));
i__2420 = G__2434;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2421),the_longtime_game$text$iter__2418.call(null,cljs.core.chunk_rest.call(null,s__2419__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2421),null);
}
} else {
var section = cljs.core.first.call(null,s__2419__$2);
return cljs.core.cons.call(null,clojure.string.join.call(null,"\n",(function (){var iter__5523__auto__ = ((function (section,s__2419__$2,temp__5804__auto__,map__2417,map__2417__$1,prefix){
return (function the_longtime_game$text$iter__2418_$_iter__2426(s__2427){
return (new cljs.core.LazySeq(null,(function (){
var s__2427__$1 = s__2427;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__2427__$1);
if(temp__5804__auto____$1){
var s__2427__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2427__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2427__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2429 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2428 = (0);
while(true){
if((i__2428 < size__5522__auto__)){
var line = cljs.core._nth.call(null,c__5521__auto__,i__2428);
cljs.core.chunk_append.call(null,b__2429,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''));

var G__2435 = (i__2428 + (1));
i__2428 = G__2435;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2429),the_longtime_game$text$iter__2418_$_iter__2426.call(null,cljs.core.chunk_rest.call(null,s__2427__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2429),null);
}
} else {
var line = cljs.core.first.call(null,s__2427__$2);
return cljs.core.cons.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''),the_longtime_game$text$iter__2418_$_iter__2426.call(null,cljs.core.rest.call(null,s__2427__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(section,s__2419__$2,temp__5804__auto__,map__2417,map__2417__$1,prefix))
;
return iter__5523__auto__.call(null,section);
})()),the_longtime_game$text$iter__2418.call(null,cljs.core.rest.call(null,s__2419__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,sections);
})());
}));

(the_longtime_game.text.quote_sections.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(the_longtime_game.text.quote_sections.cljs$lang$applyTo = (function (seq2414){
var G__2415 = cljs.core.first.call(null,seq2414);
var seq2414__$1 = cljs.core.next.call(null,seq2414);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2415,seq2414__$1);
}));

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","quote-sections","the-longtime-game.text/quote-sections",200105788,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sections","sections",-886710106)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.alpha.every_impl.call(null,cljs.core.list(new cljs.core.Symbol("s","coll-of","s/coll-of",-1705285349,null),new cljs.core.Symbol(null,"string?","string?",-1129175764,null)),cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"string?","string?",-1129175764,null),cljs.core.string_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2437){
return cljs.core.coll_QMARK_.call(null,G__2437);
})], null),null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2436){
return cljs.core.coll_QMARK_.call(null,G__2436);
})], null),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_,null,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),null,null,null));
the_longtime_game.text.quote_text = (function the_longtime_game$text$quote_text(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2443 = arguments.length;
var i__5770__auto___2444 = (0);
while(true){
if((i__5770__auto___2444 < len__5769__auto___2443)){
args__5775__auto__.push((arguments[i__5770__auto___2444]));

var G__2445 = (i__5770__auto___2444 + (1));
i__5770__auto___2444 = G__2445;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return the_longtime_game.text.quote_text.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(the_longtime_game.text.quote_text.cljs$core$IFn$_invoke$arity$variadic = (function (s,p__2441){
var map__2442 = p__2441;
var map__2442__$1 = cljs.core.__destructure_map.call(null,map__2442);
var prefix = cljs.core.get.call(null,map__2442__$1,new cljs.core.Keyword(null,"prefix","prefix",-265908465),">");
var width = cljs.core.get.call(null,map__2442__$1,new cljs.core.Keyword(null,"width","width",-384071477),the_longtime_game.text.default_width);
var width_STAR_ = (width - cljs.core.count.call(null,prefix));
var sections = cljs.core.map.call(null,(function (p1__2438_SHARP_){
return the_longtime_game.text.wrap_text.call(null,p1__2438_SHARP_,width_STAR_);
}),the_longtime_game.text.collect_text.call(null,s));
return the_longtime_game.text.quote_sections.call(null,sections,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix);
}));

(the_longtime_game.text.quote_text.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(the_longtime_game.text.quote_text.cljs$lang$applyTo = (function (seq2439){
var G__2440 = cljs.core.first.call(null,seq2439);
var seq2439__$1 = cljs.core.next.call(null,seq2439);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2440,seq2439__$1);
}));

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","quote-text","the-longtime-game.text/quote-text",-826585039,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_,null,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),null,null,null));
the_longtime_game.text.wrap_quote_text = (function the_longtime_game$text$wrap_quote_text(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2450 = arguments.length;
var i__5770__auto___2451 = (0);
while(true){
if((i__5770__auto___2451 < len__5769__auto___2450)){
args__5775__auto__.push((arguments[i__5770__auto___2451]));

var G__2452 = (i__5770__auto___2451 + (1));
i__5770__auto___2451 = G__2452;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return the_longtime_game.text.wrap_quote_text.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(the_longtime_game.text.wrap_quote_text.cljs$core$IFn$_invoke$arity$variadic = (function (s,p__2448){
var map__2449 = p__2448;
var map__2449__$1 = cljs.core.__destructure_map.call(null,map__2449);
var prefix = cljs.core.get.call(null,map__2449__$1,new cljs.core.Keyword(null,"prefix","prefix",-265908465),"\u2502");
var header = cljs.core.get.call(null,map__2449__$1,new cljs.core.Keyword(null,"header","header",119441134),"\u250C\u2500\u2500\u2500\u2500");
var footer = cljs.core.get.call(null,map__2449__$1,new cljs.core.Keyword(null,"footer","footer",1606445390),"\u2514\u2500\u2500\u2500\u2500");
var width = cljs.core.get.call(null,map__2449__$1,new cljs.core.Keyword(null,"width","width",-384071477),the_longtime_game.text.default_width);
var text = the_longtime_game.text.quote_text.call(null,s,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix,new cljs.core.Keyword(null,"width","width",-384071477),width);
return clojure.string.join.call(null,"\n",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [header,text,footer], null));
}));

(the_longtime_game.text.wrap_quote_text.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(the_longtime_game.text.wrap_quote_text.cljs$lang$applyTo = (function (seq2446){
var G__2447 = cljs.core.first.call(null,seq2446);
var seq2446__$1 = cljs.core.next.call(null,seq2446);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2447,seq2446__$1);
}));

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","wrap-quote-text","the-longtime-game.text/wrap-quote-text",2060577163,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"s","s",1705939918)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_,null,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),null,null,null));
the_longtime_game.text.wrap_quote_sections = (function the_longtime_game$text$wrap_quote_sections(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2457 = arguments.length;
var i__5770__auto___2458 = (0);
while(true){
if((i__5770__auto___2458 < len__5769__auto___2457)){
args__5775__auto__.push((arguments[i__5770__auto___2458]));

var G__2459 = (i__5770__auto___2458 + (1));
i__5770__auto___2458 = G__2459;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return the_longtime_game.text.wrap_quote_sections.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(the_longtime_game.text.wrap_quote_sections.cljs$core$IFn$_invoke$arity$variadic = (function (sections,p__2455){
var map__2456 = p__2455;
var map__2456__$1 = cljs.core.__destructure_map.call(null,map__2456);
var prefix = cljs.core.get.call(null,map__2456__$1,new cljs.core.Keyword(null,"prefix","prefix",-265908465),"\u2502");
var header = cljs.core.get.call(null,map__2456__$1,new cljs.core.Keyword(null,"header","header",119441134),"\u250C\u2500\u2500\u2500\u2500");
var footer = cljs.core.get.call(null,map__2456__$1,new cljs.core.Keyword(null,"footer","footer",1606445390),"\u2514\u2500\u2500\u2500\u2500");
var text = the_longtime_game.text.quote_sections.call(null,sections,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix);
return clojure.string.join.call(null,"\n",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [header,text,footer], null));
}));

(the_longtime_game.text.wrap_quote_sections.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(the_longtime_game.text.wrap_quote_sections.cljs$lang$applyTo = (function (seq2453){
var G__2454 = cljs.core.first.call(null,seq2453);
var seq2453__$1 = cljs.core.next.call(null,seq2453);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2454,seq2453__$1);
}));

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","wrap-quote-sections","the-longtime-game.text/wrap-quote-sections",-2028958263,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sections","sections",-886710106)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.alpha.every_impl.call(null,cljs.core.list(new cljs.core.Symbol("s","coll-of","s/coll-of",-1705285349,null),new cljs.core.Symbol(null,"string?","string?",-1129175764,null)),cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"string?","string?",-1129175764,null),cljs.core.string_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2461){
return cljs.core.coll_QMARK_.call(null,G__2461);
})], null),null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null))),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2460){
return cljs.core.coll_QMARK_.call(null,G__2460);
})], null),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)))),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_,null,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),null,null,null));
the_longtime_game.text.wrap_options = (function the_longtime_game$text$wrap_options(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2479 = arguments.length;
var i__5770__auto___2480 = (0);
while(true){
if((i__5770__auto___2480 < len__5769__auto___2479)){
args__5775__auto__.push((arguments[i__5770__auto___2480]));

var G__2481 = (i__5770__auto___2480 + (1));
i__5770__auto___2480 = G__2481;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return the_longtime_game.text.wrap_options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(the_longtime_game.text.wrap_options.cljs$core$IFn$_invoke$arity$variadic = (function (header,options,p__2465){
var map__2466 = p__2465;
var map__2466__$1 = cljs.core.__destructure_map.call(null,map__2466);
var prefix = cljs.core.get.call(null,map__2466__$1,new cljs.core.Keyword(null,"prefix","prefix",-265908465),"\u251C\u2500");
var prefix_h = cljs.core.get.call(null,map__2466__$1,new cljs.core.Keyword(null,"prefix-h","prefix-h",-1143656661),"\u250C");
var footer = cljs.core.get.call(null,map__2466__$1,new cljs.core.Keyword(null,"footer","footer",1606445390),"\u2514\u2500\u2500\u2500\u2500");
return clojure.string.join.call(null,"\n",cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix_h)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(header)].join(''),(function (){var iter__5523__auto__ = (function the_longtime_game$text$iter__2467(s__2468){
return (new cljs.core.LazySeq(null,(function (){
var s__2468__$1 = s__2468;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__2468__$1);
if(temp__5804__auto__){
var s__2468__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2468__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2468__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2470 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2469 = (0);
while(true){
if((i__2469 < size__5522__auto__)){
var option = cljs.core._nth.call(null,c__5521__auto__,i__2469);
cljs.core.chunk_append.call(null,b__2470,(function (){var iter__5523__auto__ = ((function (i__2469,option,c__5521__auto__,size__5522__auto__,b__2470,s__2468__$2,temp__5804__auto__,map__2466,map__2466__$1,prefix,prefix_h,footer){
return (function the_longtime_game$text$iter__2467_$_iter__2471(s__2472){
return (new cljs.core.LazySeq(null,((function (i__2469,option,c__5521__auto__,size__5522__auto__,b__2470,s__2468__$2,temp__5804__auto__,map__2466,map__2466__$1,prefix,prefix_h,footer){
return (function (){
var s__2472__$1 = s__2472;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__2472__$1);
if(temp__5804__auto____$1){
var s__2472__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2472__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first.call(null,s__2472__$2);
var size__5522__auto____$1 = cljs.core.count.call(null,c__5521__auto____$1);
var b__2474 = cljs.core.chunk_buffer.call(null,size__5522__auto____$1);
if((function (){var i__2473 = (0);
while(true){
if((i__2473 < size__5522__auto____$1)){
var line = cljs.core._nth.call(null,c__5521__auto____$1,i__2473);
cljs.core.chunk_append.call(null,b__2474,clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prefix,line], null)));

var G__2482 = (i__2473 + (1));
i__2473 = G__2482;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2474),the_longtime_game$text$iter__2467_$_iter__2471.call(null,cljs.core.chunk_rest.call(null,s__2472__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2474),null);
}
} else {
var line = cljs.core.first.call(null,s__2472__$2);
return cljs.core.cons.call(null,clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prefix,line], null)),the_longtime_game$text$iter__2467_$_iter__2471.call(null,cljs.core.rest.call(null,s__2472__$2)));
}
} else {
return null;
}
break;
}
});})(i__2469,option,c__5521__auto__,size__5522__auto__,b__2470,s__2468__$2,temp__5804__auto__,map__2466,map__2466__$1,prefix,prefix_h,footer))
,null,null));
});})(i__2469,option,c__5521__auto__,size__5522__auto__,b__2470,s__2468__$2,temp__5804__auto__,map__2466,map__2466__$1,prefix,prefix_h,footer))
;
return iter__5523__auto__.call(null,the_longtime_game.text.wrap_text.call(null,the_longtime_game.text.normalize_name.call(null,option)));
})());

var G__2483 = (i__2469 + (1));
i__2469 = G__2483;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2470),the_longtime_game$text$iter__2467.call(null,cljs.core.chunk_rest.call(null,s__2468__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2470),null);
}
} else {
var option = cljs.core.first.call(null,s__2468__$2);
return cljs.core.cons.call(null,(function (){var iter__5523__auto__ = ((function (option,s__2468__$2,temp__5804__auto__,map__2466,map__2466__$1,prefix,prefix_h,footer){
return (function the_longtime_game$text$iter__2467_$_iter__2475(s__2476){
return (new cljs.core.LazySeq(null,(function (){
var s__2476__$1 = s__2476;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__2476__$1);
if(temp__5804__auto____$1){
var s__2476__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2476__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2476__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2478 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2477 = (0);
while(true){
if((i__2477 < size__5522__auto__)){
var line = cljs.core._nth.call(null,c__5521__auto__,i__2477);
cljs.core.chunk_append.call(null,b__2478,clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prefix,line], null)));

var G__2484 = (i__2477 + (1));
i__2477 = G__2484;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2478),the_longtime_game$text$iter__2467_$_iter__2475.call(null,cljs.core.chunk_rest.call(null,s__2476__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2478),null);
}
} else {
var line = cljs.core.first.call(null,s__2476__$2);
return cljs.core.cons.call(null,clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prefix,line], null)),the_longtime_game$text$iter__2467_$_iter__2475.call(null,cljs.core.rest.call(null,s__2476__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(option,s__2468__$2,temp__5804__auto__,map__2466,map__2466__$1,prefix,prefix_h,footer))
;
return iter__5523__auto__.call(null,the_longtime_game.text.wrap_text.call(null,the_longtime_game.text.normalize_name.call(null,option)));
})(),the_longtime_game$text$iter__2467.call(null,cljs.core.rest.call(null,s__2468__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,options);
})(),footer], null)));
}));

(the_longtime_game.text.wrap_options.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(the_longtime_game.text.wrap_options.cljs$lang$applyTo = (function (seq2462){
var G__2463 = cljs.core.first.call(null,seq2462);
var seq2462__$1 = cljs.core.next.call(null,seq2462);
var G__2464 = cljs.core.first.call(null,seq2462__$1);
var seq2462__$2 = cljs.core.next.call(null,seq2462__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2463,G__2464,seq2462__$2);
}));

cljs.spec.alpha.def_impl.call(null,new cljs.core.Symbol("the-longtime-game.text","wrap-options","the-longtime-game.text/wrap-options",-1193446034,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"header","header",119441134),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"options","options",99638489),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)))),cljs.spec.alpha.fspec_impl.call(null,cljs.spec.alpha.spec_impl.call(null,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"header","header",119441134),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"options","options",99638489),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))),cljs.spec.alpha.cat_impl.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"header","header",119441134),new cljs.core.Keyword(null,"options","options",99638489)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_,cljs.spec.alpha.every_impl.call(null,new cljs.core.Symbol(null,"any?","any?",-318999933,null),cljs.core.any_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__2485){
return cljs.core.coll_QMARK_.call(null,G__2485);
})], null),null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"header","header",119441134),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Keyword(null,"options","options",99638489),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null))),cljs.spec.alpha.spec_impl.call(null,new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.any_QMARK_,null,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),null,null,null));
the_longtime_game.text.match_section_prefixes = (function the_longtime_game$text$match_section_prefixes(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2490 = arguments.length;
var i__5770__auto___2491 = (0);
while(true){
if((i__5770__auto___2491 < len__5769__auto___2490)){
args__5775__auto__.push((arguments[i__5770__auto___2491]));

var G__2492 = (i__5770__auto___2491 + (1));
i__5770__auto___2491 = G__2492;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return the_longtime_game.text.match_section_prefixes.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(the_longtime_game.text.match_section_prefixes.cljs$core$IFn$_invoke$arity$variadic = (function (lines,p__2488){
var map__2489 = p__2488;
var map__2489__$1 = cljs.core.__destructure_map.call(null,map__2489);
var one_char = cljs.core.get.call(null,map__2489__$1,new cljs.core.Keyword(null,"one-char","one-char",-340968611),"\u2500");
var first_char = cljs.core.get.call(null,map__2489__$1,new cljs.core.Keyword(null,"first-char","first-char",1251551296),"\u252C");
var mid_char = cljs.core.get.call(null,map__2489__$1,new cljs.core.Keyword(null,"mid-char","mid-char",-434572293),"\u2502");
var end_char = cljs.core.get.call(null,map__2489__$1,new cljs.core.Keyword(null,"end-char","end-char",912903586),"\u2514");
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,lines))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [one_char], null);
} else {
if(((1) < cljs.core.count.call(null,lines))){
return cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [first_char], null),the_longtime_game.text.match_prefix.call(null,cljs.core.rest.call(null,lines),new cljs.core.Keyword(null,"mid-char","mid-char",-434572293),mid_char,new cljs.core.Keyword(null,"end-char","end-char",912903586),end_char));
} else {
return null;
}
}
}));

(the_longtime_game.text.match_section_prefixes.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(the_longtime_game.text.match_section_prefixes.cljs$lang$applyTo = (function (seq2486){
var G__2487 = cljs.core.first.call(null,seq2486);
var seq2486__$1 = cljs.core.next.call(null,seq2486);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2487,seq2486__$1);
}));

the_longtime_game.text.wrap_section = (function the_longtime_game$text$wrap_section(var_args){
var args__5775__auto__ = [];
var len__5769__auto___2507 = arguments.length;
var i__5770__auto___2508 = (0);
while(true){
if((i__5770__auto___2508 < len__5769__auto___2507)){
args__5775__auto__.push((arguments[i__5770__auto___2508]));

var G__2509 = (i__5770__auto___2508 + (1));
i__5770__auto___2508 = G__2509;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return the_longtime_game.text.wrap_section.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(the_longtime_game.text.wrap_section.cljs$core$IFn$_invoke$arity$variadic = (function (s,p__2495){
var map__2496 = p__2495;
var map__2496__$1 = cljs.core.__destructure_map.call(null,map__2496);
var width = cljs.core.get.call(null,map__2496__$1,new cljs.core.Keyword(null,"width","width",-384071477),the_longtime_game.text.default_width);
var one_char = cljs.core.get.call(null,map__2496__$1,new cljs.core.Keyword(null,"one-char","one-char",-340968611),"\u2500");
var first_char = cljs.core.get.call(null,map__2496__$1,new cljs.core.Keyword(null,"first-char","first-char",1251551296),"\u252C");
var mid_char = cljs.core.get.call(null,map__2496__$1,new cljs.core.Keyword(null,"mid-char","mid-char",-434572293),"\u2502");
var end_char = cljs.core.get.call(null,map__2496__$1,new cljs.core.Keyword(null,"end-char","end-char",912903586),"\u2514");
var lines = the_longtime_game.text.wrap_text.call(null,s,width);
var prefixes = the_longtime_game.text.match_section_prefixes.call(null,lines,new cljs.core.Keyword(null,"one-char","one-char",-340968611),one_char,new cljs.core.Keyword(null,"first-char","first-char",1251551296),first_char,new cljs.core.Keyword(null,"mid-char","mid-char",-434572293),mid_char,new cljs.core.Keyword(null,"end-char","end-char",912903586),end_char);
return clojure.string.join.call(null,"\n",(function (){var iter__5523__auto__ = (function the_longtime_game$text$iter__2497(s__2498){
return (new cljs.core.LazySeq(null,(function (){
var s__2498__$1 = s__2498;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__2498__$1);
if(temp__5804__auto__){
var s__2498__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__2498__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__2498__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__2500 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__2499 = (0);
while(true){
if((i__2499 < size__5522__auto__)){
var vec__2501 = cljs.core._nth.call(null,c__5521__auto__,i__2499);
var prefix = cljs.core.nth.call(null,vec__2501,(0),null);
var line = cljs.core.nth.call(null,vec__2501,(1),null);
cljs.core.chunk_append.call(null,b__2500,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''));

var G__2510 = (i__2499 + (1));
i__2499 = G__2510;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2500),the_longtime_game$text$iter__2497.call(null,cljs.core.chunk_rest.call(null,s__2498__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__2500),null);
}
} else {
var vec__2504 = cljs.core.first.call(null,s__2498__$2);
var prefix = cljs.core.nth.call(null,vec__2504,(0),null);
var line = cljs.core.nth.call(null,vec__2504,(1),null);
return cljs.core.cons.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''),the_longtime_game$text$iter__2497.call(null,cljs.core.rest.call(null,s__2498__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.map.call(null,cljs.core.vector,prefixes,lines));
})());
}));

(the_longtime_game.text.wrap_section.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(the_longtime_game.text.wrap_section.cljs$lang$applyTo = (function (seq2493){
var G__2494 = cljs.core.first.call(null,seq2493);
var seq2493__$1 = cljs.core.next.call(null,seq2493);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__2494,seq2493__$1);
}));


//# sourceMappingURL=text.js.map
