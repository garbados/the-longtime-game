// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__611__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__611 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__612__i = 0, G__612__a = new Array(arguments.length -  0);
while (G__612__i < G__612__a.length) {G__612__a[G__612__i] = arguments[G__612__i + 0]; ++G__612__i;}
  args = new cljs.core.IndexedSeq(G__612__a,0,null);
} 
return G__611__delegate.call(this,args);};
G__611.cljs$lang$maxFixedArity = 0;
G__611.cljs$lang$applyTo = (function (arglist__613){
var args = cljs.core.seq(arglist__613);
return G__611__delegate(args);
});
G__611.cljs$core$IFn$_invoke$arity$variadic = G__611__delegate;
return G__611;
})()
);

(o.error = (function() { 
var G__614__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__614 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__615__i = 0, G__615__a = new Array(arguments.length -  0);
while (G__615__i < G__615__a.length) {G__615__a[G__615__i] = arguments[G__615__i + 0]; ++G__615__i;}
  args = new cljs.core.IndexedSeq(G__615__a,0,null);
} 
return G__614__delegate.call(this,args);};
G__614.cljs$lang$maxFixedArity = 0;
G__614.cljs$lang$applyTo = (function (arglist__616){
var args = cljs.core.seq(arglist__616);
return G__614__delegate(args);
});
G__614.cljs$core$IFn$_invoke$arity$variadic = G__614__delegate;
return G__614;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceMappingURL=debug.js.map
