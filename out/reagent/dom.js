// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('reagent.dom');
goog.require('cljs.core');
goog.require('reagent.impl.util');
goog.require('reagent.impl.template');
goog.require('reagent.impl.batching');
goog.require('reagent.impl.protocols');
goog.require('reagent.ratom');
reagent.dom.node$module$react_dom = require('react-dom');
if((typeof reagent !== 'undefined') && (typeof reagent.dom !== 'undefined') && (typeof reagent.dom.roots !== 'undefined')){
} else {
reagent.dom.roots = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.dissoc,container);

return reagent.dom.node$module$react_dom.unmountComponentAtNode(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__3311 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__3312 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__3312);

try{return reagent.dom.node$module$react_dom.render(comp.call(null),container,(function (){
var _STAR_always_update_STAR__orig_val__3313 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__3314 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__3314);

try{cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.assoc,container,comp);

reagent.impl.batching.flush_after_render.call(null);

if((!((callback == null)))){
return callback.call(null);
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__3313);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__3311);
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp.call(null,comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var G__3316 = arguments.length;
switch (G__3316) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.call(null,comp,container,reagent.impl.template._STAR_current_default_compiler_STAR_);
}));

(reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback_or_compiler){
reagent.ratom.flush_BANG_.call(null);

var vec__3317 = ((cljs.core.map_QMARK_.call(null,callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compiler","compiler",-267926731).cljs$core$IFn$_invoke$arity$1(callback_or_compiler),new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null):((cljs.core.fn_QMARK_.call(null,callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template._STAR_current_default_compiler_STAR_,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,null], null)
));
var compiler = cljs.core.nth.call(null,vec__3317,(0),null);
var callback = cljs.core.nth.call(null,vec__3317,(1),null);
var f = (function (){
return reagent.impl.protocols.as_element.call(null,compiler,((cljs.core.fn_QMARK_.call(null,comp))?comp.call(null):comp));
});
return reagent.dom.render_comp.call(null,f,container,callback);
}));

(reagent.dom.render.cljs$lang$maxFixedArity = 3);

/**
 * Remove a component from the given DOM node.
 */
reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp.call(null,container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return reagent.dom.node$module$react_dom.findDOMNode(this$);
});
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_.call(null);

var seq__3321_3337 = cljs.core.seq.call(null,cljs.core.deref.call(null,reagent.dom.roots));
var chunk__3322_3338 = null;
var count__3323_3339 = (0);
var i__3324_3340 = (0);
while(true){
if((i__3324_3340 < count__3323_3339)){
var vec__3331_3341 = cljs.core._nth.call(null,chunk__3322_3338,i__3324_3340);
var container_3342 = cljs.core.nth.call(null,vec__3331_3341,(0),null);
var comp_3343 = cljs.core.nth.call(null,vec__3331_3341,(1),null);
reagent.dom.re_render_component.call(null,comp_3343,container_3342);


var G__3344 = seq__3321_3337;
var G__3345 = chunk__3322_3338;
var G__3346 = count__3323_3339;
var G__3347 = (i__3324_3340 + (1));
seq__3321_3337 = G__3344;
chunk__3322_3338 = G__3345;
count__3323_3339 = G__3346;
i__3324_3340 = G__3347;
continue;
} else {
var temp__5804__auto___3348 = cljs.core.seq.call(null,seq__3321_3337);
if(temp__5804__auto___3348){
var seq__3321_3349__$1 = temp__5804__auto___3348;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3321_3349__$1)){
var c__5568__auto___3350 = cljs.core.chunk_first.call(null,seq__3321_3349__$1);
var G__3351 = cljs.core.chunk_rest.call(null,seq__3321_3349__$1);
var G__3352 = c__5568__auto___3350;
var G__3353 = cljs.core.count.call(null,c__5568__auto___3350);
var G__3354 = (0);
seq__3321_3337 = G__3351;
chunk__3322_3338 = G__3352;
count__3323_3339 = G__3353;
i__3324_3340 = G__3354;
continue;
} else {
var vec__3334_3355 = cljs.core.first.call(null,seq__3321_3349__$1);
var container_3356 = cljs.core.nth.call(null,vec__3334_3355,(0),null);
var comp_3357 = cljs.core.nth.call(null,vec__3334_3355,(1),null);
reagent.dom.re_render_component.call(null,comp_3357,container_3356);


var G__3358 = cljs.core.next.call(null,seq__3321_3349__$1);
var G__3359 = null;
var G__3360 = (0);
var G__3361 = (0);
seq__3321_3337 = G__3358;
chunk__3322_3338 = G__3359;
count__3323_3339 = G__3360;
i__3324_3340 = G__3361;
continue;
}
} else {
}
}
break;
}

return reagent.impl.batching.flush_after_render.call(null);
});

//# sourceMappingURL=dom.js.map
