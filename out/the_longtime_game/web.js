// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('the_longtime_game.web');
goog.require('cljs.core');
goog.require('clojure.edn');
goog.require('clojure.string');
goog.require('reagent.core');
goog.require('reagent.dom');
goog.require('the_longtime_game.contact_text');
goog.require('the_longtime_game.core');
goog.require('the_longtime_game.dream');
goog.require('the_longtime_game.event');
goog.require('the_longtime_game.meta_text');
goog.require('the_longtime_game.moment');
goog.require('the_longtime_game.project');
goog.require('the_longtime_game.remark');
goog.require('the_longtime_game.text');
the_longtime_game.web.node$module$pouchdb = require('pouchdb');
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.db !== 'undefined')){
} else {
the_longtime_game.web.db = the_longtime_game.web.node$module$pouchdb.default("longtime");
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.state !== 'undefined')){
} else {
the_longtime_game.web.state = reagent.core.atom.call(null,new cljs.core.Keyword(null,"loading","loading",-737050189));
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.games !== 'undefined')){
} else {
the_longtime_game.web.games = reagent.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.game !== 'undefined')){
} else {
the_longtime_game.web.game = reagent.core.atom.call(null,null);
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.herd !== 'undefined')){
} else {
the_longtime_game.web.herd = reagent.core.atom.call(null,null);
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.gamestate !== 'undefined')){
} else {
the_longtime_game.web.gamestate = reagent.core.atom.call(null,new cljs.core.Keyword(null,"intro","intro",-886090599));
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.monthstep !== 'undefined')){
} else {
the_longtime_game.web.monthstep = reagent.core.atom.call(null,new cljs.core.Keyword(null,"event","event",301435442));
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.dream !== 'undefined')){
} else {
the_longtime_game.web.dream = reagent.core.atom.call(null,null);
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.extra_QMARK_ !== 'undefined')){
} else {
the_longtime_game.web.extra_QMARK_ = reagent.core.atom.call(null,false);
}
if((typeof the_longtime_game !== 'undefined') && (typeof the_longtime_game.web !== 'undefined') && (typeof the_longtime_game.web.extrachoice !== 'undefined')){
} else {
the_longtime_game.web.extrachoice = reagent.core.atom.call(null,null);
}
the_longtime_game.web.dismantle_infra = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),"Dismantle infrastructue",new cljs.core.Keyword(null,"uses","uses",232664692),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"craftwork","craftwork",-905870327)], null),new cljs.core.Keyword(null,"filter-fn","filter-fn",1689475675),(function (herd){
return cljs.core.seq.call(null,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(the_longtime_game.core.current_location.call(null,herd)));
}),new cljs.core.Keyword(null,"effect","effect",347343289),(function (herd,location){
return the_longtime_game.core.assoc_location.call(null,herd,cljs.core.disj.call(null,location,new cljs.core.Keyword(null,"infra","infra",-2137779843),cljs.core.deref.call(null,the_longtime_game.web.extrachoice)));
})], null);
the_longtime_game.web.web_projects = cljs.core.conj.call(null,the_longtime_game.project.projects,the_longtime_game.web.dismantle_infra);
the_longtime_game.web.find_games = (function the_longtime_game$web$find_games(){
return the_longtime_game.web.db.allDocs().then((function (rows){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.games,cljs.core.vec.call(null,cljs.core.map.call(null,(function (p1__3366_SHARP_){
return p1__3366_SHARP_.id;
}),rows.rows)));
}));
});
the_longtime_game.web.save_doc = (function the_longtime_game$web$save_doc(id,value){
return the_longtime_game.web.db.put((function (){var obj3368 = ({"_id":id,"value":cljs.core.pr_str.call(null,value)});
return obj3368;
})()).catch((function (){
return the_longtime_game.web.db.get(id).then((function (doc){
var doc_STAR_ = cljs.core.clj__GT_js.call(null,cljs.core.assoc.call(null,cljs.core.js__GT_clj.call(null,doc),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,value)));
return the_longtime_game.web.db.put(doc_STAR_);
}));
}));
});
the_longtime_game.web.fetch_doc = (function the_longtime_game$web$fetch_doc(id){
return the_longtime_game.web.db.get(id).then((function (doc){
return clojure.edn.read_string.call(null,doc.value);
}));
});
the_longtime_game.web.delete_doc = (function the_longtime_game$web$delete_doc(id){
return the_longtime_game.web.db.get(id).then((function (p1__3369_SHARP_){
return the_longtime_game.web.db.remove(p1__3369_SHARP_);
}));
});
the_longtime_game.web.save_game = (function the_longtime_game$web$save_game(){
return the_longtime_game.web.save_doc.call(null,cljs.core.deref.call(null,the_longtime_game.web.game),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"herd","herd",783636970),cljs.core.deref.call(null,the_longtime_game.web.herd),new cljs.core.Keyword(null,"monthstep","monthstep",-1523050272),cljs.core.deref.call(null,the_longtime_game.web.monthstep)], null));
});
the_longtime_game.web.load_game = (function the_longtime_game$web$load_game(name){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.game,name);

return the_longtime_game.web.fetch_doc.call(null,name).then((function (doc){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,new cljs.core.Keyword(null,"herd","herd",783636970).cljs$core$IFn$_invoke$arity$1(doc));

cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"playing","playing",70013335));

cljs.core.reset_BANG_.call(null,the_longtime_game.web.gamestate,new cljs.core.Keyword(null,"playing","playing",70013335));

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"monthstep","monthstep",-1523050272).cljs$core$IFn$_invoke$arity$1(doc));
}));
});
the_longtime_game.web.new_game = (function the_longtime_game$web$new_game(name){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,the_longtime_game.core.gen_herd.call(null,new cljs.core.Keyword(null,"spirit","spirit",-1214645658),name));

cljs.core.reset_BANG_.call(null,the_longtime_game.web.game,name);

the_longtime_game.web.save_game.call(null);

the_longtime_game.web.find_games.call(null);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"playing","playing",70013335));
});
the_longtime_game.web.setup = (function the_longtime_game$web$setup(){
return the_longtime_game.web.find_games.call(null).then((function (){
var n = cljs.core.count.call(null,cljs.core.deref.call(null,the_longtime_game.web.games));
if((n === (0))){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"new-game","new-game",167241648));
} else {
if(cljs.core._EQ_.call(null,(1),n)){
return the_longtime_game.web.load_game.call(null,cljs.core.first.call(null,cljs.core.deref.call(null,the_longtime_game.web.games)));
} else {
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"list-games","list-games",-1662727466));

}
}
}));
});
the_longtime_game.web.delete_game = (function the_longtime_game$web$delete_game(name){
return the_longtime_game.web.delete_doc.call(null,name).then((function (){
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,the_longtime_game.web.game),name)){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.game,null);

cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,null);

cljs.core.reset_BANG_.call(null,the_longtime_game.web.gamestate,new cljs.core.Keyword(null,"intro","intro",-886090599));

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"event","event",301435442));
} else {
return null;
}
})).then(the_longtime_game.web.find_games).then((function (){
if((cljs.core.count.call(null,cljs.core.deref.call(null,the_longtime_game.web.games)) === (0))){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"new-game","new-game",167241648));
} else {
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"list-games","list-games",-1662727466));
}
}));
});
the_longtime_game.web.prompt_text = (function the_longtime_game$web$prompt_text(value,on_submit){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.input","input.input",-850828147),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,value),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__3370_SHARP_){
return cljs.core.reset_BANG_.call(null,value,p1__3370_SHARP_.target.value);
}),new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765),(function (e){
if(cljs.core._EQ_.call(null,(13),e.which)){
return on_submit.call(null,cljs.core.deref.call(null,value));
} else {
return null;
}
})], null)], null);
});
the_longtime_game.web.prompt_int = (function the_longtime_game$web$prompt_int(value,maximum){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.input","input.input",-850828147),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"number",new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),maximum,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,value),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__3371_SHARP_){
return cljs.core.reset_BANG_.call(null,value,p1__3371_SHARP_.target.value);
})], null)], null);
});
the_longtime_game.web.init_new_game = (function the_longtime_game$web$init_new_game(){
var value = reagent.core.atom.call(null,"");
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container","div.container",72419955),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box","div.box",2023391427),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.content","div.content",-298042649),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),the_longtime_game.meta_text.intro_text], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.field","div.field",1089355414),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.label","label.label",725637336),"What shall the herd call you?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control","div.control",1957951243),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.prompt_text,value,the_longtime_game.web.new_game], null)], null)], null)], null);
});
the_longtime_game.web.list_games = (function the_longtime_game$web$list_games(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container>div.box>div.content","div.container>div.box>div.content",882917951),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Select a game to play:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5523__auto__ = (function the_longtime_game$web$list_games_$_iter__3372(s__3373){
return (new cljs.core.LazySeq(null,(function (){
var s__3373__$1 = s__3373;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3373__$1);
if(temp__5804__auto__){
var s__3373__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3373__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3373__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3375 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3374 = (0);
while(true){
if((i__3374 < size__5522__auto__)){
var game = cljs.core._nth.call(null,c__5521__auto__,i__3374);
cljs.core.chunk_append.call(null,b__3375,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.block","div.block",1082647483),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.columns","div.columns",-437221213),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.column","div.column",-1380853326),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-link.is-fullwidth","button.button.is-link.is-fullwidth",-765224669),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__3374,game,c__5521__auto__,size__5522__auto__,b__3375,s__3373__$2,temp__5804__auto__){
return (function (){
return the_longtime_game.web.load_game.call(null,game);
});})(i__3374,game,c__5521__auto__,size__5522__auto__,b__3375,s__3373__$2,temp__5804__auto__))
], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(game)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.column.is-narrow","div.column.is-narrow",-1214583650),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-danger","button.button.is-danger",-948547713),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__3374,game,c__5521__auto__,size__5522__auto__,b__3375,s__3373__$2,temp__5804__auto__){
return (function (){
return the_longtime_game.web.delete_game.call(null,game);
});})(i__3374,game,c__5521__auto__,size__5522__auto__,b__3375,s__3373__$2,temp__5804__auto__))
], null),"X"], null)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),game], null)));

var G__3376 = (i__3374 + (1));
i__3374 = G__3376;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3375),the_longtime_game$web$list_games_$_iter__3372.call(null,cljs.core.chunk_rest.call(null,s__3373__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3375),null);
}
} else {
var game = cljs.core.first.call(null,s__3373__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.block","div.block",1082647483),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.columns","div.columns",-437221213),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.column","div.column",-1380853326),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-link.is-fullwidth","button.button.is-link.is-fullwidth",-765224669),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (game,s__3373__$2,temp__5804__auto__){
return (function (){
return the_longtime_game.web.load_game.call(null,game);
});})(game,s__3373__$2,temp__5804__auto__))
], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(game)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.column.is-narrow","div.column.is-narrow",-1214583650),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-danger","button.button.is-danger",-948547713),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (game,s__3373__$2,temp__5804__auto__){
return (function (){
return the_longtime_game.web.delete_game.call(null,game);
});})(game,s__3373__$2,temp__5804__auto__))
], null),"X"], null)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),game], null)),the_longtime_game$web$list_games_$_iter__3372.call(null,cljs.core.rest.call(null,s__3373__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.deref.call(null,the_longtime_game.web.games));
})()], null)], null);
});
the_longtime_game.web.loading = (function the_longtime_game$web$loading(){
the_longtime_game.web.setup.call(null);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container>div.box>div.content","div.container>div.box>div.content",882917951),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Loading..."], null)], null);
});
the_longtime_game.web.credits = (function the_longtime_game$web$credits(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container>div.box>div.content","div.container>div.box>div.content",882917951),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Credits"], null),(function (){var lines = clojure.string.split_lines.call(null,the_longtime_game.meta_text.credits_description);
var iter__5523__auto__ = (function the_longtime_game$web$credits_$_iter__3377(s__3378){
return (new cljs.core.LazySeq(null,(function (){
var s__3378__$1 = s__3378;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3378__$1);
if(temp__5804__auto__){
var s__3378__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3378__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3378__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3380 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3379 = (0);
while(true){
if((i__3379 < size__5522__auto__)){
var i = cljs.core._nth.call(null,c__5521__auto__,i__3379);
var line = cljs.core.nth.call(null,lines,i);
cljs.core.chunk_append.call(null,b__3380,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),line], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)));

var G__3381 = (i__3379 + (1));
i__3379 = G__3381;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3380),the_longtime_game$web$credits_$_iter__3377.call(null,cljs.core.chunk_rest.call(null,s__3378__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3380),null);
}
} else {
var i = cljs.core.first.call(null,s__3378__$2);
var line = cljs.core.nth.call(null,lines,i);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),line], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)),the_longtime_game$web$credits_$_iter__3377.call(null,cljs.core.rest.call(null,s__3378__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,lines)));
})()], null);
});
the_longtime_game.web.navbar = (function the_longtime_game$web$navbar(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level","div.level",-1180372721),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-left","div.level-left",1700565044),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.title","h1.title",-2139952071),"The Longtime"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-primary","button.button.is-primary",-883309392),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"new-game","new-game",167241648));
})], null),"New Game"], null)], null),((cljs.core.pos_int_QMARK_.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,the_longtime_game.web.games))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-link","button.button.is-link",510779944),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"list-games","list-games",-1662727466));
})], null),"List Games"], null)], null):null),(((!((cljs.core.deref.call(null,the_longtime_game.web.herd) == null))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info","button.button.is-info",1928556393),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"playing","playing",70013335));

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.gamestate,new cljs.core.Keyword(null,"playing","playing",70013335));
})], null),"Play Game"], null)], null):null),(((!((cljs.core.deref.call(null,the_longtime_game.web.herd) == null))))?(function (){var iter__5523__auto__ = (function the_longtime_game$web$navbar_$_iter__3382(s__3383){
return (new cljs.core.LazySeq(null,(function (){
var s__3383__$1 = s__3383;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3383__$1);
if(temp__5804__auto__){
var s__3383__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3383__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3383__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3385 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3384 = (0);
while(true){
if((i__3384 < size__5522__auto__)){
var state_STAR_ = cljs.core._nth.call(null,c__5521__auto__,i__3384);
cljs.core.chunk_append.call(null,b__3385,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info","button.button.is-info",1928556393),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__3384,state_STAR_,c__5521__auto__,size__5522__auto__,b__3385,s__3383__$2,temp__5804__auto__){
return (function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"playing","playing",70013335));

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.gamestate,state_STAR_);
});})(i__3384,state_STAR_,c__5521__auto__,size__5522__auto__,b__3385,s__3383__$2,temp__5804__auto__))
], null),the_longtime_game.text.normalize_name.call(null,state_STAR_)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),state_STAR_], null)));

var G__3386 = (i__3384 + (1));
i__3384 = G__3386;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3385),the_longtime_game$web$navbar_$_iter__3382.call(null,cljs.core.chunk_rest.call(null,s__3383__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3385),null);
}
} else {
var state_STAR_ = cljs.core.first.call(null,s__3383__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info","button.button.is-info",1928556393),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (state_STAR_,s__3383__$2,temp__5804__auto__){
return (function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"playing","playing",70013335));

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.gamestate,state_STAR_);
});})(state_STAR_,s__3383__$2,temp__5804__auto__))
], null),the_longtime_game.text.normalize_name.call(null,state_STAR_)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),state_STAR_], null)),the_longtime_game$web$navbar_$_iter__3382.call(null,cljs.core.rest.call(null,s__3383__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"intro","intro",-886090599),new cljs.core.Keyword(null,"projects","projects",-364845983),new cljs.core.Keyword(null,"individuals","individuals",600504845),new cljs.core.Keyword(null,"path","path",-188191168)], null));
})():null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-right","div.level-right",-216046623),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-light","button.button.is-info.is-light",-703847383),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.state,new cljs.core.Keyword(null,"credits","credits",785860820));
})], null),"Credits"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.button.is-info.is-light","a.button.is-info.is-light",-1229619015),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"https://github.com/garbados/the-longtime-game",new cljs.core.Keyword(null,"target","target",253001721),"_blank"], null),"Source"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.level-item","div.level-item",-68610818),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.subtitle","p.subtitle",1220832976),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"A game by ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"https://www.patreon.com/garbados",new cljs.core.Keyword(null,"target","target",253001721),"_blank"], null),"DFB"], null)], null)], null)], null)], null)], null);
});
the_longtime_game.web.print_location = (function the_longtime_game$web$print_location(location){
var strings = cljs.core.filter.call(null,cljs.core.some_QMARK_,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core.pos_int_QMARK_.call(null,new cljs.core.Keyword(null,"power","power",-937852079).cljs$core$IFn$_invoke$arity$1(location)))?["Power: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"power","power",-937852079).cljs$core$IFn$_invoke$arity$1(location))].join(''):null),(((!((new cljs.core.Keyword(null,"flora","flora",1421964825).cljs$core$IFn$_invoke$arity$1(location) == null))))?["Flora: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"flora","flora",1421964825).cljs$core$IFn$_invoke$arity$1(location))].join(''):null),(((!((new cljs.core.Keyword(null,"depleted?","depleted?",346115752).cljs$core$IFn$_invoke$arity$1(location) == null))))?["Depleted? ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"depleted?","depleted?",346115752).cljs$core$IFn$_invoke$arity$1(location))].join(''):null),((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"plains","plains",208589091),new cljs.core.Keyword(null,"terrain","terrain",704966005).cljs$core$IFn$_invoke$arity$1(location)))?["Nutrients: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,(function (nutrient){
return clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.text.normalize_name.call(null,nutrient),cljs.core.get.call(null,location,nutrient)], null));
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"n","n",562130025),new cljs.core.Keyword(null,"k","k",-2146297393),new cljs.core.Keyword(null,"p","p",151049309)], null)))].join(''):null),(((!((new cljs.core.Keyword(null,"crop","crop",793731643).cljs$core$IFn$_invoke$arity$1(location) == null))))?["Crop: ",the_longtime_game.text.normalize_name.call(null,new cljs.core.Keyword(null,"crop","crop",793731643).cljs$core$IFn$_invoke$arity$1(location))].join(''):null),(((!((new cljs.core.Keyword(null,"ready?","ready?",-105765697).cljs$core$IFn$_invoke$arity$1(location) == null))))?["Ready? ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ready?","ready?",-105765697).cljs$core$IFn$_invoke$arity$1(location))].join(''):null),(((!((new cljs.core.Keyword(null,"wild?","wild?",1762788558).cljs$core$IFn$_invoke$arity$1(location) == null))))?["Wild? ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"wild?","wild?",1762788558).cljs$core$IFn$_invoke$arity$1(location))].join(''):null),(function (){var temp__5804__auto__ = cljs.core.seq.call(null,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(location));
if(temp__5804__auto__){
var infra = temp__5804__auto__;
return ["Infra: ",clojure.string.join.call(null,", ",cljs.core.sort.call(null,cljs.core.map.call(null,the_longtime_game.text.normalize_name,infra)))].join('');
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.seq.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.pos_int_QMARK_,cljs.core.second),new cljs.core.Keyword(null,"stores","stores",1203804823).cljs$core$IFn$_invoke$arity$1(location)));
if(temp__5804__auto__){
var stores = temp__5804__auto__;
return ["Stores: ",clojure.string.join.call(null,", ",(function (){var iter__5523__auto__ = (function the_longtime_game$web$print_location_$_iter__3397(s__3398){
return (new cljs.core.LazySeq(null,(function (){
var s__3398__$1 = s__3398;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__3398__$1);
if(temp__5804__auto____$1){
var s__3398__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3398__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3398__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3400 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3399 = (0);
while(true){
if((i__3399 < size__5522__auto__)){
var vec__3401 = cljs.core._nth.call(null,c__5521__auto__,i__3399);
var resource = cljs.core.nth.call(null,vec__3401,(0),null);
var amount = cljs.core.nth.call(null,vec__3401,(1),null);
cljs.core.chunk_append.call(null,b__3400,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(amount)," ",the_longtime_game.text.normalize_name.call(null,resource)].join(''));

var G__3411 = (i__3399 + (1));
i__3399 = G__3411;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3400),the_longtime_game$web$print_location_$_iter__3397.call(null,cljs.core.chunk_rest.call(null,s__3398__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3400),null);
}
} else {
var vec__3404 = cljs.core.first.call(null,s__3398__$2);
var resource = cljs.core.nth.call(null,vec__3404,(0),null);
var amount = cljs.core.nth.call(null,vec__3404,(1),null);
return cljs.core.cons.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(amount)," ",the_longtime_game.text.normalize_name.call(null,resource)].join(''),the_longtime_game$web$print_location_$_iter__3397.call(null,cljs.core.rest.call(null,s__3398__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.sort_by.call(null,cljs.core.first,stores));
})())].join('');
} else {
return null;
}
})()], null));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),["Location: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(location))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5523__auto__ = (function the_longtime_game$web$print_location_$_iter__3407(s__3408){
return (new cljs.core.LazySeq(null,(function (){
var s__3408__$1 = s__3408;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3408__$1);
if(temp__5804__auto__){
var s__3408__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3408__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3408__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3410 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3409 = (0);
while(true){
if((i__3409 < size__5522__auto__)){
var i = cljs.core._nth.call(null,c__5521__auto__,i__3409);
var s = cljs.core.nth.call(null,strings,i);
cljs.core.chunk_append.call(null,b__3410,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),s], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)));

var G__3412 = (i__3409 + (1));
i__3409 = G__3412;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3410),the_longtime_game$web$print_location_$_iter__3407.call(null,cljs.core.chunk_rest.call(null,s__3408__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3410),null);
}
} else {
var i = cljs.core.first.call(null,s__3408__$2);
var s = cljs.core.nth.call(null,strings,i);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),s], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)),the_longtime_game$web$print_location_$_iter__3407.call(null,cljs.core.rest.call(null,s__3408__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,strings)));
})()], null)], null);
});
the_longtime_game.web.print_location_brief = (function the_longtime_game$web$print_location_brief(location){
var infra = cljs.core.seq.call(null,cljs.core.map.call(null,the_longtime_game.text.normalize_name,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(location)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(location)),((infra)?[": ",clojure.string.join.call(null,", ",infra)].join(''):"")].join('')], null);
});
the_longtime_game.web.print_herd = (function the_longtime_game$web$print_herd(){
var map__3413 = cljs.core.deref.call(null,the_longtime_game.web.herd);
var map__3413__$1 = cljs.core.__destructure_map.call(null,map__3413);
var herd_STAR_ = map__3413__$1;
var individuals = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"individuals","individuals",600504845));
var syndicates = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"syndicates","syndicates",-1258749316));
var spirit = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"spirit","spirit",-1214645658));
var month = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"month","month",-1960248533));
var hunger = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"hunger","hunger",-1187183907));
var sickness = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"sickness","sickness",-1713502058));
var stores = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"stores","stores",1203804823));
var path = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var population = cljs.core.count.call(null,individuals);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(herd_STAR_)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),["Shepherded by the ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(spirit)].join('')], null),new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),(function (){var month__$1 = (cljs.core.rem.call(null,month,(12)) + (1));
var year = (((month__$1 / (12)) | (0)) + (1));
var season = the_longtime_game.core.int__GT_season.call(null,the_longtime_game.core.get_season.call(null,herd_STAR_));
return ["Year ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(year),", month ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(month__$1)," (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(season),")"].join('');
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Population: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(population)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Syndicates: ",clojure.string.join.call(null,", ",cljs.core.sort.call(null,cljs.core.map.call(null,the_longtime_game.core.syndicate_name,syndicates)))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),(function (){var need = the_longtime_game.core.calc_food_need.call(null,population);
var ok_QMARK_ = the_longtime_game.core.herd_has_nutrition_QMARK_.call(null,herd_STAR_,need);
var _BANG_ = ((ok_QMARK_)?"":"!");
return ["Hunger: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hunger)," (-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(need),_BANG_,")"].join('');
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),(function (){var need = the_longtime_game.core.calc_meds_need.call(null,population);
var ok_QMARK_ = (cljs.core.get_in.call(null,herd_STAR_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"poultices","poultices",-616779013)], null),(0)) >= need);
var value = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((((sickness / population) * (100)) | (0))),"%"].join('');
var _BANG_ = ((ok_QMARK_)?"":"!");
return ["Sickness: ",value," (-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(need),_BANG_,")"].join('');
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),(function (){var fulfillments = cljs.core.map.call(null,new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260),individuals);
var average = (cljs.core.reduce.call(null,cljs.core._PLUS_,(0),fulfillments) / population);
var minimum = cljs.core.reduce.call(null,cljs.core.min,fulfillments);
var maximum = cljs.core.reduce.call(null,cljs.core.max,fulfillments);
return ["Fulfillment: ","avg ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((average | (0))),"%; ","min ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(minimum),"%; ","max ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(maximum),"%"].join('');
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Skills:"], null),(function (){var skills = cljs.core.sort.call(null,cljs.core.map.call(null,(function (skill){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [skill,the_longtime_game.core.collective_skill.call(null,herd_STAR_,skill)], null);
}),the_longtime_game.core.skills));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.table","table.table",-538258781),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = (function the_longtime_game$web$print_herd_$_iter__3414(s__3415){
return (new cljs.core.LazySeq(null,(function (){
var s__3415__$1 = s__3415;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3415__$1);
if(temp__5804__auto__){
var s__3415__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3415__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3415__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3417 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3416 = (0);
while(true){
if((i__3416 < size__5522__auto__)){
var vec__3418 = cljs.core._nth.call(null,c__5521__auto__,i__3416);
var skill = cljs.core.nth.call(null,vec__3418,(0),null);
var _ = cljs.core.nth.call(null,vec__3418,(1),null);
cljs.core.chunk_append.call(null,b__3417,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,skill)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)));

var G__3458 = (i__3416 + (1));
i__3416 = G__3458;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3417),the_longtime_game$web$print_herd_$_iter__3414.call(null,cljs.core.chunk_rest.call(null,s__3415__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3417),null);
}
} else {
var vec__3421 = cljs.core.first.call(null,s__3415__$2);
var skill = cljs.core.nth.call(null,vec__3421,(0),null);
var _ = cljs.core.nth.call(null,vec__3421,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,skill)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)),the_longtime_game$web$print_herd_$_iter__3414.call(null,cljs.core.rest.call(null,s__3415__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,skills);
})()], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = (function the_longtime_game$web$print_herd_$_iter__3424(s__3425){
return (new cljs.core.LazySeq(null,(function (){
var s__3425__$1 = s__3425;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3425__$1);
if(temp__5804__auto__){
var s__3425__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3425__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3425__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3427 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3426 = (0);
while(true){
if((i__3426 < size__5522__auto__)){
var vec__3428 = cljs.core._nth.call(null,c__5521__auto__,i__3426);
var skill = cljs.core.nth.call(null,vec__3428,(0),null);
var amount = cljs.core.nth.call(null,vec__3428,(1),null);
cljs.core.chunk_append.call(null,b__3427,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)));

var G__3459 = (i__3426 + (1));
i__3426 = G__3459;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3427),the_longtime_game$web$print_herd_$_iter__3424.call(null,cljs.core.chunk_rest.call(null,s__3425__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3427),null);
}
} else {
var vec__3431 = cljs.core.first.call(null,s__3425__$2);
var skill = cljs.core.nth.call(null,vec__3431,(0),null);
var amount = cljs.core.nth.call(null,vec__3431,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)),the_longtime_game$web$print_herd_$_iter__3424.call(null,cljs.core.rest.call(null,s__3425__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,skills);
})()], null)], null)], null);
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Stores:"], null),(function (){var stores_STAR_ = cljs.core.sort.call(null,cljs.core.seq.call(null,stores));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.table","table.table",-538258781),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = (function the_longtime_game$web$print_herd_$_iter__3434(s__3435){
return (new cljs.core.LazySeq(null,(function (){
var s__3435__$1 = s__3435;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3435__$1);
if(temp__5804__auto__){
var s__3435__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3435__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3435__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3437 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3436 = (0);
while(true){
if((i__3436 < size__5522__auto__)){
var vec__3438 = cljs.core._nth.call(null,c__5521__auto__,i__3436);
var resource = cljs.core.nth.call(null,vec__3438,(0),null);
var _ = cljs.core.nth.call(null,vec__3438,(1),null);
cljs.core.chunk_append.call(null,b__3437,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,resource)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),resource], null)));

var G__3460 = (i__3436 + (1));
i__3436 = G__3460;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3437),the_longtime_game$web$print_herd_$_iter__3434.call(null,cljs.core.chunk_rest.call(null,s__3435__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3437),null);
}
} else {
var vec__3441 = cljs.core.first.call(null,s__3435__$2);
var resource = cljs.core.nth.call(null,vec__3441,(0),null);
var _ = cljs.core.nth.call(null,vec__3441,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,resource)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),resource], null)),the_longtime_game$web$print_herd_$_iter__3434.call(null,cljs.core.rest.call(null,s__3435__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,stores_STAR_);
})()], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = (function the_longtime_game$web$print_herd_$_iter__3444(s__3445){
return (new cljs.core.LazySeq(null,(function (){
var s__3445__$1 = s__3445;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3445__$1);
if(temp__5804__auto__){
var s__3445__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3445__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3445__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3447 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3446 = (0);
while(true){
if((i__3446 < size__5522__auto__)){
var vec__3448 = cljs.core._nth.call(null,c__5521__auto__,i__3446);
var resource = cljs.core.nth.call(null,vec__3448,(0),null);
var amount = cljs.core.nth.call(null,vec__3448,(1),null);
cljs.core.chunk_append.call(null,b__3447,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),resource], null)));

var G__3461 = (i__3446 + (1));
i__3446 = G__3461;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3447),the_longtime_game$web$print_herd_$_iter__3444.call(null,cljs.core.chunk_rest.call(null,s__3445__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3447),null);
}
} else {
var vec__3451 = cljs.core.first.call(null,s__3445__$2);
var resource = cljs.core.nth.call(null,vec__3451,(0),null);
var amount = cljs.core.nth.call(null,vec__3451,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),resource], null)),the_longtime_game$web$print_herd_$_iter__3444.call(null,cljs.core.rest.call(null,s__3445__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,stores_STAR_);
})()], null)], null)], null);
})()], null),(function (){var temp__5804__auto__ = cljs.core.seq.call(null,new cljs.core.Keyword(null,"contacts","contacts",333503174).cljs$core$IFn$_invoke$arity$1(herd_STAR_));
if(temp__5804__auto__){
var contacts = temp__5804__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Contacts: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,contacts))].join('')], null)], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.seq.call(null,new cljs.core.Keyword(null,"space","space",348133475).cljs$core$IFn$_invoke$arity$1(herd_STAR_));
if(temp__5804__auto__){
var space = temp__5804__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Space: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,space))].join('')], null)], null);
} else {
return null;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.print_location,the_longtime_game.core.current_location.call(null,herd_STAR_)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Next Stage:",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5523__auto__ = (function the_longtime_game$web$print_herd_$_iter__3454(s__3455){
return (new cljs.core.LazySeq(null,(function (){
var s__3455__$1 = s__3455;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3455__$1);
if(temp__5804__auto__){
var s__3455__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3455__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3455__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3457 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3456 = (0);
while(true){
if((i__3456 < size__5522__auto__)){
var location__$1 = cljs.core._nth.call(null,c__5521__auto__,i__3456);
cljs.core.chunk_append.call(null,b__3457,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.print_location_brief,location__$1], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"terrain","terrain",704966005).cljs$core$IFn$_invoke$arity$1(location__$1)], null)));

var G__3462 = (i__3456 + (1));
i__3456 = G__3462;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3457),the_longtime_game$web$print_herd_$_iter__3454.call(null,cljs.core.chunk_rest.call(null,s__3455__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3457),null);
}
} else {
var location__$1 = cljs.core.first.call(null,s__3455__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.print_location_brief,location__$1], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"terrain","terrain",704966005).cljs$core$IFn$_invoke$arity$1(location__$1)], null)),the_longtime_game$web$print_herd_$_iter__3454.call(null,cljs.core.rest.call(null,s__3455__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.second.call(null,path));
})()], null)], null)], null)], null)], null);
});
the_longtime_game.web.intro = (function the_longtime_game$web$intro(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Welcome to ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em","em",707813035),"The Longtime"], null)], null),(function (){var lines = clojure.string.split_lines.call(null,the_longtime_game.meta_text.tutorial_text.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd)));
var iter__5523__auto__ = (function the_longtime_game$web$intro_$_iter__3463(s__3464){
return (new cljs.core.LazySeq(null,(function (){
var s__3464__$1 = s__3464;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3464__$1);
if(temp__5804__auto__){
var s__3464__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3464__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3464__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3466 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3465 = (0);
while(true){
if((i__3465 < size__5522__auto__)){
var i = cljs.core._nth.call(null,c__5521__auto__,i__3465);
var line = cljs.core.nth.call(null,lines,i);
cljs.core.chunk_append.call(null,b__3466,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),line], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)));

var G__3467 = (i__3465 + (1));
i__3465 = G__3467;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3466),the_longtime_game$web$intro_$_iter__3463.call(null,cljs.core.chunk_rest.call(null,s__3464__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3466),null);
}
} else {
var i = cljs.core.first.call(null,s__3464__$2);
var line = cljs.core.nth.call(null,lines,i);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),line], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)),the_longtime_game$web$intro_$_iter__3463.call(null,cljs.core.rest.call(null,s__3464__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,lines)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-fullwidth.is-primary","button.button.is-fullwidth.is-primary",2132348121),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.gamestate,new cljs.core.Keyword(null,"playing","playing",70013335));
})], null),"Then let us begin!"], null)], null);
});
the_longtime_game.web.explain_map = (function the_longtime_game$web$explain_map(map_STAR_){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5523__auto__ = (function the_longtime_game$web$explain_map_$_iter__3468(s__3469){
return (new cljs.core.LazySeq(null,(function (){
var s__3469__$1 = s__3469;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3469__$1);
if(temp__5804__auto__){
var s__3469__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3469__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3469__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3471 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3470 = (0);
while(true){
if((i__3470 < size__5522__auto__)){
var vec__3472 = cljs.core._nth.call(null,c__5521__auto__,i__3470);
var x = cljs.core.nth.call(null,vec__3472,(0),null);
var y = cljs.core.nth.call(null,vec__3472,(1),null);
cljs.core.chunk_append.call(null,b__3471,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),[the_longtime_game.text.normalize_name.call(null,x),": ",the_longtime_game.text.normalize_name.call(null,y)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),x], null)));

var G__3478 = (i__3470 + (1));
i__3470 = G__3478;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3471),the_longtime_game$web$explain_map_$_iter__3468.call(null,cljs.core.chunk_rest.call(null,s__3469__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3471),null);
}
} else {
var vec__3475 = cljs.core.first.call(null,s__3469__$2);
var x = cljs.core.nth.call(null,vec__3475,(0),null);
var y = cljs.core.nth.call(null,vec__3475,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),[the_longtime_game.text.normalize_name.call(null,x),": ",the_longtime_game.text.normalize_name.call(null,y)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),x], null)),the_longtime_game$web$explain_map_$_iter__3468.call(null,cljs.core.rest.call(null,s__3469__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,map_STAR_);
})()], null);
});
the_longtime_game.web.explain_filter = (function the_longtime_game$web$explain_filter(p__3479){
var map__3480 = p__3479;
var map__3480__$1 = cljs.core.__destructure_map.call(null,map__3480);
var stores = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"stores","stores",1203804823));
var skills = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"skills","skills",958701426));
var terrain = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"terrain","terrain",704966005));
var season = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"season","season",851675697));
var infra = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"infra","infra",-2137779843));
var space = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"space","space",348133475));
var contacts = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"contacts","contacts",333503174));
var power = cljs.core.get.call(null,map__3480__$1,new cljs.core.Keyword(null,"power","power",-937852079));
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(cljs.core.truth_(stores)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Required resources:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.explain_map,stores], null)], null):null),(cljs.core.truth_(skills)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Required skills:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.explain_map,skills], null)], null):null),(cljs.core.truth_(terrain)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Only in ",the_longtime_game.text.normalize_name.call(null,terrain)].join('')], null):null),(cljs.core.truth_(season)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Only during ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(the_longtime_game.core.int__GT_season.call(null,season))].join('')], null):null),(cljs.core.truth_(infra)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Needs ",((cljs.core.seq_QMARK_.call(null,infra))?clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,infra)):the_longtime_game.text.normalize_name.call(null,infra)
)].join('')], null):null),(cljs.core.truth_(space)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Needs in orbit: ",((cljs.core.seq_QMARK_.call(null,space))?clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,space)):the_longtime_game.text.normalize_name.call(null,space)
)].join('')], null):null),(cljs.core.truth_(contacts)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Requires relations with ",((cljs.core.seq_QMARK_.call(null,contacts))?clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,contacts)):the_longtime_game.text.normalize_name.call(null,contacts)
)].join('')], null):null),(cljs.core.truth_(power)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Requires ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(power)," energy"].join('')], null):null)], null);
});
the_longtime_game.web.projects = (function the_longtime_game$web$projects(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Projects"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),the_longtime_game.meta_text.projects_description], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),(function (){var iter__5523__auto__ = (function the_longtime_game$web$projects_$_iter__3481(s__3482){
return (new cljs.core.LazySeq(null,(function (){
var s__3482__$1 = s__3482;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3482__$1);
if(temp__5804__auto__){
var s__3482__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3482__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3482__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3484 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3483 = (0);
while(true){
if((i__3483 < size__5522__auto__)){
var project = cljs.core._nth.call(null,c__5521__auto__,i__3483);
cljs.core.chunk_append.call(null,b__3484,cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box","div.box",2023391427),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(project)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(project)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em","em",707813035),[" ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"detail","detail",-1545345025).cljs$core$IFn$_invoke$arity$1(project))].join('')], null)], null),(function (){var temp__5804__auto____$1 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"uses","uses",232664692).cljs$core$IFn$_invoke$arity$1(project));
if(temp__5804__auto____$1){
var uses = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Uses ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,uses)),"."].join('')], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto____$1 = new cljs.core.Keyword(null,"filter","filter",-948537934).cljs$core$IFn$_invoke$arity$1(project);
if(cljs.core.truth_(temp__5804__auto____$1)){
var filter_STAR_ = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.explain_filter,filter_STAR_], null);
} else {
return null;
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(project)], null)));

var G__3485 = (i__3483 + (1));
i__3483 = G__3485;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3484),the_longtime_game$web$projects_$_iter__3481.call(null,cljs.core.chunk_rest.call(null,s__3482__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3484),null);
}
} else {
var project = cljs.core.first.call(null,s__3482__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box","div.box",2023391427),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(project)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(project)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em","em",707813035),[" ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"detail","detail",-1545345025).cljs$core$IFn$_invoke$arity$1(project))].join('')], null)], null),(function (){var temp__5804__auto____$1 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"uses","uses",232664692).cljs$core$IFn$_invoke$arity$1(project));
if(temp__5804__auto____$1){
var uses = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Uses ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,uses)),"."].join('')], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto____$1 = new cljs.core.Keyword(null,"filter","filter",-948537934).cljs$core$IFn$_invoke$arity$1(project);
if(cljs.core.truth_(temp__5804__auto____$1)){
var filter_STAR_ = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.explain_filter,filter_STAR_], null);
} else {
return null;
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(project)], null)),the_longtime_game$web$projects_$_iter__3481.call(null,cljs.core.rest.call(null,s__3482__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),the_longtime_game.project.projects));
})()], null);
});
the_longtime_game.web.individuals = (function the_longtime_game$web$individuals(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Individuals"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),the_longtime_game.meta_text.individuals_description], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),(function (){var herd_STAR_ = cljs.core.deref.call(null,the_longtime_game.web.herd);
var iter__5523__auto__ = (function the_longtime_game$web$individuals_$_iter__3486(s__3487){
return (new cljs.core.LazySeq(null,(function (){
var s__3487__$1 = s__3487;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3487__$1);
if(temp__5804__auto__){
var s__3487__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3487__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3487__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3489 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3488 = (0);
while(true){
if((i__3488 < size__5522__auto__)){
var individual = cljs.core._nth.call(null,c__5521__auto__,i__3488);
var smiley = (((new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual) > (the_longtime_game.core.max_fulfillment * ((2) / (3)))))?"\uD83D\uDE04":(((new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual) > (the_longtime_game.core.max_fulfillment * ((1) / (2)))))?"\uD83D\uDE00":(((new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual) > (the_longtime_game.core.max_fulfillment * ((1) / (3)))))?"\uD83D\uDE41":"\uD83D\uDE22"
)));
cljs.core.chunk_append.call(null,b__3489,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box","div.box",2023391427),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(individual)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(the_longtime_game.core.get_age.call(null,herd_STAR_,individual)),", ",smiley].join('')], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var temp__5804__auto____$1 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"passions","passions",706358765).cljs$core$IFn$_invoke$arity$1(individual));
if(temp__5804__auto____$1){
var passions = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Passions: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,passions))].join('')], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto____$1 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(individual));
if(temp__5804__auto____$1){
var traits = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Traits: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,traits))].join('')], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto____$1 = cljs.core.sort_by.call(null,cljs.core.first,cljs.core.seq.call(null,new cljs.core.Keyword(null,"skills","skills",958701426).cljs$core$IFn$_invoke$arity$1(individual)));
if(cljs.core.truth_(temp__5804__auto____$1)){
var skills = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Skills:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.table","table.table",-538258781),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = ((function (i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_){
return (function the_longtime_game$web$individuals_$_iter__3486_$_iter__3490(s__3491){
return (new cljs.core.LazySeq(null,((function (i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_){
return (function (){
var s__3491__$1 = s__3491;
while(true){
var temp__5804__auto____$2 = cljs.core.seq.call(null,s__3491__$1);
if(temp__5804__auto____$2){
var s__3491__$2 = temp__5804__auto____$2;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3491__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first.call(null,s__3491__$2);
var size__5522__auto____$1 = cljs.core.count.call(null,c__5521__auto____$1);
var b__3493 = cljs.core.chunk_buffer.call(null,size__5522__auto____$1);
if((function (){var i__3492 = (0);
while(true){
if((i__3492 < size__5522__auto____$1)){
var vec__3494 = cljs.core._nth.call(null,c__5521__auto____$1,i__3492);
var skill = cljs.core.nth.call(null,vec__3494,(0),null);
var _ = cljs.core.nth.call(null,vec__3494,(1),null);
cljs.core.chunk_append.call(null,b__3493,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,skill)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)));

var G__3530 = (i__3492 + (1));
i__3492 = G__3530;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3493),the_longtime_game$web$individuals_$_iter__3486_$_iter__3490.call(null,cljs.core.chunk_rest.call(null,s__3491__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3493),null);
}
} else {
var vec__3497 = cljs.core.first.call(null,s__3491__$2);
var skill = cljs.core.nth.call(null,vec__3497,(0),null);
var _ = cljs.core.nth.call(null,vec__3497,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,skill)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)),the_longtime_game$web$individuals_$_iter__3486_$_iter__3490.call(null,cljs.core.rest.call(null,s__3491__$2)));
}
} else {
return null;
}
break;
}
});})(i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_))
,null,null));
});})(i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_))
;
return iter__5523__auto__.call(null,skills);
})()], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = ((function (i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_){
return (function the_longtime_game$web$individuals_$_iter__3486_$_iter__3500(s__3501){
return (new cljs.core.LazySeq(null,((function (i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_){
return (function (){
var s__3501__$1 = s__3501;
while(true){
var temp__5804__auto____$2 = cljs.core.seq.call(null,s__3501__$1);
if(temp__5804__auto____$2){
var s__3501__$2 = temp__5804__auto____$2;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3501__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first.call(null,s__3501__$2);
var size__5522__auto____$1 = cljs.core.count.call(null,c__5521__auto____$1);
var b__3503 = cljs.core.chunk_buffer.call(null,size__5522__auto____$1);
if((function (){var i__3502 = (0);
while(true){
if((i__3502 < size__5522__auto____$1)){
var vec__3504 = cljs.core._nth.call(null,c__5521__auto____$1,i__3502);
var skill = cljs.core.nth.call(null,vec__3504,(0),null);
var amount = cljs.core.nth.call(null,vec__3504,(1),null);
cljs.core.chunk_append.call(null,b__3503,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)));

var G__3531 = (i__3502 + (1));
i__3502 = G__3531;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3503),the_longtime_game$web$individuals_$_iter__3486_$_iter__3500.call(null,cljs.core.chunk_rest.call(null,s__3501__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3503),null);
}
} else {
var vec__3507 = cljs.core.first.call(null,s__3501__$2);
var skill = cljs.core.nth.call(null,vec__3507,(0),null);
var amount = cljs.core.nth.call(null,vec__3507,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)),the_longtime_game$web$individuals_$_iter__3486_$_iter__3500.call(null,cljs.core.rest.call(null,s__3501__$2)));
}
} else {
return null;
}
break;
}
});})(i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_))
,null,null));
});})(i__3488,skills,temp__5804__auto____$1,smiley,individual,c__5521__auto__,size__5522__auto__,b__3489,s__3487__$2,temp__5804__auto__,herd_STAR_))
;
return iter__5523__auto__.call(null,skills);
})()], null)], null)], null)], null);
} else {
return null;
}
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(individual)], null)));

var G__3532 = (i__3488 + (1));
i__3488 = G__3532;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3489),the_longtime_game$web$individuals_$_iter__3486.call(null,cljs.core.chunk_rest.call(null,s__3487__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3489),null);
}
} else {
var individual = cljs.core.first.call(null,s__3487__$2);
var smiley = (((new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual) > (the_longtime_game.core.max_fulfillment * ((2) / (3)))))?"\uD83D\uDE04":(((new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual) > (the_longtime_game.core.max_fulfillment * ((1) / (2)))))?"\uD83D\uDE00":(((new cljs.core.Keyword(null,"fulfillment","fulfillment",2042830260).cljs$core$IFn$_invoke$arity$1(individual) > (the_longtime_game.core.max_fulfillment * ((1) / (3)))))?"\uD83D\uDE41":"\uD83D\uDE22"
)));
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box","div.box",2023391427),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(individual)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(the_longtime_game.core.get_age.call(null,herd_STAR_,individual)),", ",smiley].join('')], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var temp__5804__auto____$1 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"passions","passions",706358765).cljs$core$IFn$_invoke$arity$1(individual));
if(temp__5804__auto____$1){
var passions = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Passions: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,passions))].join('')], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto____$1 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"traits","traits",1778193407).cljs$core$IFn$_invoke$arity$1(individual));
if(temp__5804__auto____$1){
var traits = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),["Traits: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,the_longtime_game.text.normalize_name,traits))].join('')], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto____$1 = cljs.core.sort_by.call(null,cljs.core.first,cljs.core.seq.call(null,new cljs.core.Keyword(null,"skills","skills",958701426).cljs$core$IFn$_invoke$arity$1(individual)));
if(cljs.core.truth_(temp__5804__auto____$1)){
var skills = temp__5804__auto____$1;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Skills:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.table","table.table",-538258781),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = ((function (skills,temp__5804__auto____$1,smiley,individual,s__3487__$2,temp__5804__auto__,herd_STAR_){
return (function the_longtime_game$web$individuals_$_iter__3486_$_iter__3510(s__3511){
return (new cljs.core.LazySeq(null,(function (){
var s__3511__$1 = s__3511;
while(true){
var temp__5804__auto____$2 = cljs.core.seq.call(null,s__3511__$1);
if(temp__5804__auto____$2){
var s__3511__$2 = temp__5804__auto____$2;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3511__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3511__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3513 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3512 = (0);
while(true){
if((i__3512 < size__5522__auto__)){
var vec__3514 = cljs.core._nth.call(null,c__5521__auto__,i__3512);
var skill = cljs.core.nth.call(null,vec__3514,(0),null);
var _ = cljs.core.nth.call(null,vec__3514,(1),null);
cljs.core.chunk_append.call(null,b__3513,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,skill)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)));

var G__3533 = (i__3512 + (1));
i__3512 = G__3533;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3513),the_longtime_game$web$individuals_$_iter__3486_$_iter__3510.call(null,cljs.core.chunk_rest.call(null,s__3511__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3513),null);
}
} else {
var vec__3517 = cljs.core.first.call(null,s__3511__$2);
var skill = cljs.core.nth.call(null,vec__3517,(0),null);
var _ = cljs.core.nth.call(null,vec__3517,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),the_longtime_game.text.normalize_name.call(null,skill)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)),the_longtime_game$web$individuals_$_iter__3486_$_iter__3510.call(null,cljs.core.rest.call(null,s__3511__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(skills,temp__5804__auto____$1,smiley,individual,s__3487__$2,temp__5804__auto__,herd_STAR_))
;
return iter__5523__auto__.call(null,skills);
})()], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__5523__auto__ = ((function (skills,temp__5804__auto____$1,smiley,individual,s__3487__$2,temp__5804__auto__,herd_STAR_){
return (function the_longtime_game$web$individuals_$_iter__3486_$_iter__3520(s__3521){
return (new cljs.core.LazySeq(null,(function (){
var s__3521__$1 = s__3521;
while(true){
var temp__5804__auto____$2 = cljs.core.seq.call(null,s__3521__$1);
if(temp__5804__auto____$2){
var s__3521__$2 = temp__5804__auto____$2;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3521__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3521__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3523 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3522 = (0);
while(true){
if((i__3522 < size__5522__auto__)){
var vec__3524 = cljs.core._nth.call(null,c__5521__auto__,i__3522);
var skill = cljs.core.nth.call(null,vec__3524,(0),null);
var amount = cljs.core.nth.call(null,vec__3524,(1),null);
cljs.core.chunk_append.call(null,b__3523,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)));

var G__3534 = (i__3522 + (1));
i__3522 = G__3534;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3523),the_longtime_game$web$individuals_$_iter__3486_$_iter__3520.call(null,cljs.core.chunk_rest.call(null,s__3521__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3523),null);
}
} else {
var vec__3527 = cljs.core.first.call(null,s__3521__$2);
var skill = cljs.core.nth.call(null,vec__3527,(0),null);
var amount = cljs.core.nth.call(null,vec__3527,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),amount], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),skill], null)),the_longtime_game$web$individuals_$_iter__3486_$_iter__3520.call(null,cljs.core.rest.call(null,s__3521__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(skills,temp__5804__auto____$1,smiley,individual,s__3487__$2,temp__5804__auto__,herd_STAR_))
;
return iter__5523__auto__.call(null,skills);
})()], null)], null)], null)], null);
} else {
return null;
}
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(individual)], null)),the_longtime_game$web$individuals_$_iter__3486.call(null,cljs.core.rest.call(null,s__3487__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"individuals","individuals",600504845).cljs$core$IFn$_invoke$arity$1(herd_STAR_)));
})()], null);
});
the_longtime_game.web.path = (function the_longtime_game$web$path(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"The Path"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),the_longtime_game.meta_text.path_description], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),(function (){var herd_STAR_ = cljs.core.deref.call(null,the_longtime_game.web.herd);
var iter__5523__auto__ = (function the_longtime_game$web$path_$_iter__3535(s__3536){
return (new cljs.core.LazySeq(null,(function (){
var s__3536__$1 = s__3536;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3536__$1);
if(temp__5804__auto__){
var s__3536__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3536__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3536__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3538 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3537 = (0);
while(true){
if((i__3537 < size__5522__auto__)){
var i = cljs.core._nth.call(null,c__5521__auto__,i__3537);
var stage = cljs.core.nth.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(herd_STAR_),i);
cljs.core.chunk_append.call(null,b__3538,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box","div.box",2023391427),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),(((i === (0)))?["Stage ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i + (1)))," (current)"].join(''):((cljs.core._EQ_.call(null,(1),i))?["Stage ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i + (1)))," (next)"].join(''):["Stage ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i + (1)))].join('')
))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5523__auto__ = ((function (i__3537,stage,i,c__5521__auto__,size__5522__auto__,b__3538,s__3536__$2,temp__5804__auto__,herd_STAR_){
return (function the_longtime_game$web$path_$_iter__3535_$_iter__3539(s__3540){
return (new cljs.core.LazySeq(null,((function (i__3537,stage,i,c__5521__auto__,size__5522__auto__,b__3538,s__3536__$2,temp__5804__auto__,herd_STAR_){
return (function (){
var s__3540__$1 = s__3540;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__3540__$1);
if(temp__5804__auto____$1){
var s__3540__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3540__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first.call(null,s__3540__$2);
var size__5522__auto____$1 = cljs.core.count.call(null,c__5521__auto____$1);
var b__3542 = cljs.core.chunk_buffer.call(null,size__5522__auto____$1);
if((function (){var i__3541 = (0);
while(true){
if((i__3541 < size__5522__auto____$1)){
var location__$1 = cljs.core._nth.call(null,c__5521__auto____$1,i__3541);
cljs.core.chunk_append.call(null,b__3542,the_longtime_game.web.print_location.call(null,location__$1));

var G__3547 = (i__3541 + (1));
i__3541 = G__3547;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3542),the_longtime_game$web$path_$_iter__3535_$_iter__3539.call(null,cljs.core.chunk_rest.call(null,s__3540__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3542),null);
}
} else {
var location__$1 = cljs.core.first.call(null,s__3540__$2);
return cljs.core.cons.call(null,the_longtime_game.web.print_location.call(null,location__$1),the_longtime_game$web$path_$_iter__3535_$_iter__3539.call(null,cljs.core.rest.call(null,s__3540__$2)));
}
} else {
return null;
}
break;
}
});})(i__3537,stage,i,c__5521__auto__,size__5522__auto__,b__3538,s__3536__$2,temp__5804__auto__,herd_STAR_))
,null,null));
});})(i__3537,stage,i,c__5521__auto__,size__5522__auto__,b__3538,s__3536__$2,temp__5804__auto__,herd_STAR_))
;
return iter__5523__auto__.call(null,stage);
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)));

var G__3548 = (i__3537 + (1));
i__3537 = G__3548;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3538),the_longtime_game$web$path_$_iter__3535.call(null,cljs.core.chunk_rest.call(null,s__3536__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3538),null);
}
} else {
var i = cljs.core.first.call(null,s__3536__$2);
var stage = cljs.core.nth.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(herd_STAR_),i);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box","div.box",2023391427),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),(((i === (0)))?["Stage ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i + (1)))," (current)"].join(''):((cljs.core._EQ_.call(null,(1),i))?["Stage ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i + (1)))," (next)"].join(''):["Stage ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i + (1)))].join('')
))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5523__auto__ = ((function (stage,i,s__3536__$2,temp__5804__auto__,herd_STAR_){
return (function the_longtime_game$web$path_$_iter__3535_$_iter__3543(s__3544){
return (new cljs.core.LazySeq(null,(function (){
var s__3544__$1 = s__3544;
while(true){
var temp__5804__auto____$1 = cljs.core.seq.call(null,s__3544__$1);
if(temp__5804__auto____$1){
var s__3544__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3544__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3544__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3546 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3545 = (0);
while(true){
if((i__3545 < size__5522__auto__)){
var location__$1 = cljs.core._nth.call(null,c__5521__auto__,i__3545);
cljs.core.chunk_append.call(null,b__3546,the_longtime_game.web.print_location.call(null,location__$1));

var G__3549 = (i__3545 + (1));
i__3545 = G__3549;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3546),the_longtime_game$web$path_$_iter__3535_$_iter__3543.call(null,cljs.core.chunk_rest.call(null,s__3544__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3546),null);
}
} else {
var location__$1 = cljs.core.first.call(null,s__3544__$2);
return cljs.core.cons.call(null,the_longtime_game.web.print_location.call(null,location__$1),the_longtime_game$web$path_$_iter__3535_$_iter__3543.call(null,cljs.core.rest.call(null,s__3544__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(stage,i,s__3536__$2,temp__5804__auto__,herd_STAR_))
;
return iter__5523__auto__.call(null,stage);
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)),the_longtime_game$web$path_$_iter__3535.call(null,cljs.core.rest.call(null,s__3536__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(herd_STAR_))));
})()], null);
});
the_longtime_game.web.handle_steppe = (function the_longtime_game$web$handle_steppe(herd_STAR_,location){
var remarks = the_longtime_game.remark.gen_remarks.call(null,herd_STAR_);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Entering ",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(location),"..."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),remarks], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"The herd rushes unfettered across the steppe."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-fullwidth.is-primary","button.button.is-fullwidth.is-primary",2132348121),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,herd_STAR_);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"next","next",-117701485));
})], null),"Proceed to select next location"], null)], null)], null);
});
the_longtime_game.web.handle_new_month = (function the_longtime_game$web$handle_new_month(herd_STAR_,location){
var herd_STAR___$1 = the_longtime_game.core.consolidate_stores.call(null,the_longtime_game.core.begin_month.call(null,herd_STAR_));
var event = (((cljs.core.rand_int.call(null,(3)) === (0)))?the_longtime_game.event.pick_event.call(null,herd_STAR___$1):null);
var herd_STAR___$2 = (function (){var temp__5802__auto__ = event;
if(cljs.core.truth_(temp__5802__auto__)){
var vec__3550 = temp__5802__auto__;
var name_STAR_ = cljs.core.nth.call(null,vec__3550,(0),null);
var _text_fn = cljs.core.nth.call(null,vec__3550,(1),null);
var effect = cljs.core.nth.call(null,vec__3550,(2),null);
return cljs.core.assoc.call(null,effect.call(null),new cljs.core.Keyword(null,"event","event",301435442),name_STAR_);
} else {
return herd_STAR___$1;
}
})();
var remarks = clojure.string.join.call(null," ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.remark.gen_remarks.call(null,herd_STAR___$2),the_longtime_game.moment.gen_moments.call(null,herd_STAR___$2)], null));
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Entering ",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(location),"..."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),remarks], null),(function (){var temp__5804__auto__ = cljs.core.seq.call(null,new cljs.core.Keyword(null,"new-adults","new-adults",614990126).cljs$core$IFn$_invoke$arity$1(herd_STAR___$2));
if(temp__5804__auto__){
var new_adults = temp__5804__auto__;
var plural_QMARK_ = ((1) < cljs.core.count.call(null,new_adults));
var verb = ((plural_QMARK_)?"minots have":"minot has");
var s_QMARK_ = ((plural_QMARK_)?"s":"");
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new_adults))," ",verb," come in from their journey",s_QMARK_,": ",clojure.string.join.call(null,", ",cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1843675177),new_adults))].join('')], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.seq.call(null,new cljs.core.Keyword(null,"new-dead","new-dead",-1359909787).cljs$core$IFn$_invoke$arity$1(herd_STAR___$2));
if(temp__5804__auto__){
var new_dead = temp__5804__auto__;
var plural_QMARK_ = ((1) > cljs.core.count.call(null,new_dead));
var verb = ((plural_QMARK_)?"minots have":"minot has");
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new_dead))," ",verb," returned to soil: ",clojure.string.join.call(null,", ",cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1843675177),new_dead))].join('')], null);
} else {
return null;
}
})(),(cljs.core.truth_(event)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),the_longtime_game.text.normalize_name.call(null,cljs.core.first.call(null,event))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),cljs.core.second.call(null,event).call(null)], null)], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-fullwidth.is-primary","button.button.is-fullwidth.is-primary",2132348121),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,herd_STAR___$2);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"projects","projects",-364845983));
})], null),"Proceed to select projects"], null)], null);
});
the_longtime_game.web.handle_event = (function the_longtime_game$web$handle_event(){
the_longtime_game.web.save_game.call(null);

cljs.core.reset_BANG_.call(null,the_longtime_game.web.dream,null);

var herd_STAR_ = cljs.core.deref.call(null,the_longtime_game.web.herd);
var location__$1 = the_longtime_game.core.current_location.call(null,herd_STAR_);
var steppe_QMARK_ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"steppe","steppe",387208310),new cljs.core.Keyword(null,"terrain","terrain",704966005).cljs$core$IFn$_invoke$arity$1(location__$1));
if(steppe_QMARK_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_steppe,herd_STAR_,location__$1], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_new_month,herd_STAR_,location__$1], null);
}
});
the_longtime_game.web.enact_project = (function the_longtime_game$web$enact_project(proj){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(proj),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(the_longtime_game.web.dismantle_infra))){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.extra_QMARK_,true);
} else {
var herd_STAR_ = cljs.core.update.call(null,the_longtime_game.project.do_project.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd),proj),new cljs.core.Keyword(null,"projects","projects",-364845983),cljs.core.conj,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(proj));
cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,herd_STAR_);

if(cljs.core._EQ_.call(null,(3),cljs.core.count.call(null,new cljs.core.Keyword(null,"projects","projects",-364845983).cljs$core$IFn$_invoke$arity$1(herd_STAR_)))){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"dream","dream",-1318050380));
} else {
return null;
}
}
});
the_longtime_game.web.handle_projects = (function the_longtime_game$web$handle_projects(){
var herd_STAR_ = cljs.core.deref.call(null,the_longtime_game.web.herd);
var i = (cljs.core.count.call(null,new cljs.core.Keyword(null,"projects","projects",-364845983).cljs$core$IFn$_invoke$arity$1(herd_STAR_)) + (1));
var candidates = cljs.core.filter.call(null,cljs.core.partial.call(null,the_longtime_game.project.can_enact_QMARK_,herd_STAR_),the_longtime_game.web.web_projects);
if(cljs.core.truth_(cljs.core.deref.call(null,the_longtime_game.web.extra_QMARK_))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Select what to dismantle:"], null),(function (){var iter__5523__auto__ = (function the_longtime_game$web$handle_projects_$_iter__3553(s__3554){
return (new cljs.core.LazySeq(null,(function (){
var s__3554__$1 = s__3554;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3554__$1);
if(temp__5804__auto__){
var s__3554__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3554__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3554__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3556 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3555 = (0);
while(true){
if((i__3555 < size__5522__auto__)){
var infra = cljs.core._nth.call(null,c__5521__auto__,i__3555);
cljs.core.chunk_append.call(null,b__3556,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-fullwidth","button.button.is-info.is-fullwidth",827117595),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__3555,infra,c__5521__auto__,size__5522__auto__,b__3556,s__3554__$2,temp__5804__auto__,herd_STAR_,i,candidates){
return (function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.extrachoice,infra);

the_longtime_game.web.enact_project.call(null,the_longtime_game.web.dismantle_infra);

cljs.core.reset_BANG_.call(null,the_longtime_game.web.extra_QMARK_,false);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.extrachoice,null);
});})(i__3555,infra,c__5521__auto__,size__5522__auto__,b__3556,s__3554__$2,temp__5804__auto__,herd_STAR_,i,candidates))
], null),the_longtime_game.text.normalize_name.call(null,infra)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),infra], null)));

var G__3563 = (i__3555 + (1));
i__3555 = G__3563;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3556),the_longtime_game$web$handle_projects_$_iter__3553.call(null,cljs.core.chunk_rest.call(null,s__3554__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3556),null);
}
} else {
var infra = cljs.core.first.call(null,s__3554__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-fullwidth","button.button.is-info.is-fullwidth",827117595),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (infra,s__3554__$2,temp__5804__auto__,herd_STAR_,i,candidates){
return (function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.extrachoice,infra);

the_longtime_game.web.enact_project.call(null,the_longtime_game.web.dismantle_infra);

cljs.core.reset_BANG_.call(null,the_longtime_game.web.extra_QMARK_,false);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.extrachoice,null);
});})(infra,s__3554__$2,temp__5804__auto__,herd_STAR_,i,candidates))
], null),the_longtime_game.text.normalize_name.call(null,infra)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),infra], null)),the_longtime_game$web$handle_projects_$_iter__3553.call(null,cljs.core.rest.call(null,s__3554__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,new cljs.core.Keyword(null,"infra","infra",-2137779843).cljs$core$IFn$_invoke$arity$1(the_longtime_game.core.current_location.call(null,herd_STAR_)));
})()], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),["Select project ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)," of 3:"].join('')], null),(function (){var iter__5523__auto__ = (function the_longtime_game$web$handle_projects_$_iter__3557(s__3558){
return (new cljs.core.LazySeq(null,(function (){
var s__3558__$1 = s__3558;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3558__$1);
if(temp__5804__auto__){
var s__3558__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3558__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3558__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3560 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3559 = (0);
while(true){
if((i__3559 < size__5522__auto__)){
var map__3561 = cljs.core._nth.call(null,c__5521__auto__,i__3559);
var map__3561__$1 = cljs.core.__destructure_map.call(null,map__3561);
var proj = map__3561__$1;
var name = cljs.core.get.call(null,map__3561__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.chunk_append.call(null,b__3560,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-fullwidth","button.button.is-info.is-fullwidth",827117595),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__3559,map__3561,map__3561__$1,proj,name,c__5521__auto__,size__5522__auto__,b__3560,s__3558__$2,temp__5804__auto__,herd_STAR_,i,candidates){
return (function (){
return the_longtime_game.web.enact_project.call(null,proj);
});})(i__3559,map__3561,map__3561__$1,proj,name,c__5521__auto__,size__5522__auto__,b__3560,s__3558__$2,temp__5804__auto__,herd_STAR_,i,candidates))
], null),name], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),name], null)));

var G__3564 = (i__3559 + (1));
i__3559 = G__3564;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3560),the_longtime_game$web$handle_projects_$_iter__3557.call(null,cljs.core.chunk_rest.call(null,s__3558__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3560),null);
}
} else {
var map__3562 = cljs.core.first.call(null,s__3558__$2);
var map__3562__$1 = cljs.core.__destructure_map.call(null,map__3562);
var proj = map__3562__$1;
var name = cljs.core.get.call(null,map__3562__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-fullwidth","button.button.is-info.is-fullwidth",827117595),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (map__3562,map__3562__$1,proj,name,s__3558__$2,temp__5804__auto__,herd_STAR_,i,candidates){
return (function (){
return the_longtime_game.web.enact_project.call(null,proj);
});})(map__3562,map__3562__$1,proj,name,s__3558__$2,temp__5804__auto__,herd_STAR_,i,candidates))
], null),name], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),name], null)),the_longtime_game$web$handle_projects_$_iter__3557.call(null,cljs.core.rest.call(null,s__3558__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),candidates));
})()], null);
}
});
the_longtime_game.web.handle_specific_dream = (function the_longtime_game$web$handle_specific_dream(choice){
var vec__3565 = cljs.core.deref.call(null,the_longtime_game.web.dream);
var options = cljs.core.nth.call(null,vec__3565,(0),null);
var text_fn = cljs.core.nth.call(null,vec__3565,(1),null);
var post_text_fn = cljs.core.nth.call(null,vec__3565,(2),null);
var effect = cljs.core.nth.call(null,vec__3565,(3),null);
var blurb = text_fn.call(null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"A dreamer visits you..."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),blurb], null),(((((cljs.core.deref.call(null,choice) == null)) && (cljs.core.seq.call(null,options))))?(function (){
new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"How do you counsel?"], null)], null);

var iter__5523__auto__ = (function the_longtime_game$web$handle_specific_dream_$_iter__3568(s__3569){
return (new cljs.core.LazySeq(null,(function (){
var s__3569__$1 = s__3569;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3569__$1);
if(temp__5804__auto__){
var s__3569__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3569__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3569__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3571 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3570 = (0);
while(true){
if((i__3570 < size__5522__auto__)){
var option = cljs.core._nth.call(null,c__5521__auto__,i__3570);
cljs.core.chunk_append.call(null,b__3571,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-fullwidth.is-primary.is-light","button.button.is-fullwidth.is-primary.is-light",1478250182),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__3570,option,c__5521__auto__,size__5522__auto__,b__3571,s__3569__$2,temp__5804__auto__,vec__3565,options,text_fn,post_text_fn,effect,blurb){
return (function (){
return cljs.core.reset_BANG_.call(null,choice,option);
});})(i__3570,option,c__5521__auto__,size__5522__auto__,b__3571,s__3569__$2,temp__5804__auto__,vec__3565,options,text_fn,post_text_fn,effect,blurb))
], null),the_longtime_game.text.normalize_name.call(null,option)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),option], null)));

var G__3572 = (i__3570 + (1));
i__3570 = G__3572;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3571),the_longtime_game$web$handle_specific_dream_$_iter__3568.call(null,cljs.core.chunk_rest.call(null,s__3569__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3571),null);
}
} else {
var option = cljs.core.first.call(null,s__3569__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-fullwidth.is-primary.is-light","button.button.is-fullwidth.is-primary.is-light",1478250182),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (option,s__3569__$2,temp__5804__auto__,vec__3565,options,text_fn,post_text_fn,effect,blurb){
return (function (){
return cljs.core.reset_BANG_.call(null,choice,option);
});})(option,s__3569__$2,temp__5804__auto__,vec__3565,options,text_fn,post_text_fn,effect,blurb))
], null),the_longtime_game.text.normalize_name.call(null,option)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),option], null)),the_longtime_game$web$handle_specific_dream_$_iter__3568.call(null,cljs.core.rest.call(null,s__3569__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,options);
})()
:null),(((((!((cljs.core.deref.call(null,choice) == null)))) || ((cljs.core.seq.call(null,options) == null))))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),(function (){var temp__5804__auto__ = post_text_fn.call(null,cljs.core.deref.call(null,choice));
if(cljs.core.truth_(temp__5804__auto__)){
var post_blurb = temp__5804__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),post_blurb], null);
} else {
return null;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-fullwidth.is-primary","button.button.is-fullwidth.is-primary",2132348121),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,effect.call(null,cljs.core.deref.call(null,choice)));

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"upkeep","upkeep",-959123993));
})], null),"The dreamer returns to their rest..."], null)], null)], null):null)], null);
});
the_longtime_game.web.handle_dream = (function the_longtime_game$web$handle_dream(){
if((cljs.core.deref.call(null,the_longtime_game.web.dream) == null)){
if((cljs.core.rand_int.call(null,(3)) === (0))){
var temp__5804__auto___3573 = the_longtime_game.dream.pick_dream.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd));
if(cljs.core.truth_(temp__5804__auto___3573)){
var dream_STAR__3574 = temp__5804__auto___3573;
cljs.core.reset_BANG_.call(null,the_longtime_game.web.dream,the_longtime_game.dream.marshal_dream.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd),dream_STAR__3574));
} else {
}
} else {
}
} else {
}

if((!((cljs.core.deref.call(null,the_longtime_game.web.dream) == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_specific_dream,reagent.core.atom.call(null,null)], null);
} else {
cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"upkeep","upkeep",-959123993));

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Loading..."], null);
}
});
the_longtime_game.web.handle_upkeep = (function the_longtime_game$web$handle_upkeep(){
cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,the_longtime_game.core.apply_herd_upkeep);

if(the_longtime_game.core.has_lost_QMARK_.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd))){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Game over!"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),the_longtime_game.meta_text.gameover_text], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-primary.is-fullwidth","button.button.is-primary.is-fullwidth",-375206250),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return the_longtime_game.web.delete_game.call(null,cljs.core.deref.call(null,the_longtime_game.web.game));
})], null),"Try again!"], null)], null);
} else {
var herd_STAR_ = cljs.core.deref.call(null,the_longtime_game.web.herd);
var announcements = cljs.core.filter.call(null,cljs.core.some_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var temp__5804__auto__ = (function (){var and__5043__auto__ = the_longtime_game.core.new_contact_QMARK_.call(null,herd_STAR_);
if(and__5043__auto__){
return the_longtime_game.core.get_next_contact.call(null,herd_STAR_);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var contact = temp__5804__auto__;
cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,cljs.core.update,new cljs.core.Keyword(null,"contacts","contacts",333503174),cljs.core.conj,contact);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["A new People has made contact!",the_longtime_game.contact_text.contact__GT_blurb.call(null,contact)], null);
} else {
return null;
}
})(),((the_longtime_game.core.should_add_syndicate_QMARK_.call(null,herd_STAR_))?(function (){var votes = the_longtime_game.core.tally_votes.call(null,new cljs.core.Keyword(null,"individuals","individuals",600504845).cljs$core$IFn$_invoke$arity$1(herd_STAR_));
var candidates = the_longtime_game.core.rank_candidates.call(null,votes);
var temp__5804__auto__ = the_longtime_game.core.select_candidate.call(null,new cljs.core.Keyword(null,"syndicates","syndicates",-1258749316).cljs$core$IFn$_invoke$arity$1(herd_STAR_),candidates);
if(cljs.core.truth_(temp__5804__auto__)){
var candidate = temp__5804__auto__;
cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,cljs.core.update,new cljs.core.Keyword(null,"syndicates","syndicates",-1258749316),cljs.core.conj,candidate);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["A new syndicate organizes!",the_longtime_game.meta_text.announce_syndicate.call(null,candidate)], null);
} else {
return null;
}
})():null)], null));
if(cljs.core.empty_QMARK_.call(null,announcements)){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"leave","leave",1022579443));
} else {
}

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"End of the month"], null),(function (){var iter__5523__auto__ = (function the_longtime_game$web$handle_upkeep_$_iter__3575(s__3576){
return (new cljs.core.LazySeq(null,(function (){
var s__3576__$1 = s__3576;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3576__$1);
if(temp__5804__auto__){
var s__3576__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3576__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3576__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3578 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3577 = (0);
while(true){
if((i__3577 < size__5522__auto__)){
var i = cljs.core._nth.call(null,c__5521__auto__,i__3577);
var vec__3579 = cljs.core.nth.call(null,announcements,i);
var title = cljs.core.nth.call(null,vec__3579,(0),null);
var announcement = cljs.core.nth.call(null,vec__3579,(1),null);
cljs.core.chunk_append.call(null,b__3578,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),title], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),announcement], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)));

var G__3585 = (i__3577 + (1));
i__3577 = G__3585;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3578),the_longtime_game$web$handle_upkeep_$_iter__3575.call(null,cljs.core.chunk_rest.call(null,s__3576__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3578),null);
}
} else {
var i = cljs.core.first.call(null,s__3576__$2);
var vec__3582 = cljs.core.nth.call(null,announcements,i);
var title = cljs.core.nth.call(null,vec__3582,(0),null);
var announcement = cljs.core.nth.call(null,vec__3582,(1),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),title], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),announcement], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)),the_longtime_game$web$handle_upkeep_$_iter__3575.call(null,cljs.core.rest.call(null,s__3576__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,announcements)));
})(),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-primary.is-fullwidth","button.button.is-primary.is-fullwidth",-375206250),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"leave","leave",1022579443));
})], null),"Proceed to leaving behind resources"], null)], null);
}
});
the_longtime_game.web.prompt_leave_behind = (function the_longtime_game$web$prompt_leave_behind(resource,amount,value){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.field","div.field",1089355414),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.label","label.label",725637336),the_longtime_game.text.normalize_name.call(null,resource)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control","div.control",1957951243),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.prompt_int,value,amount], null)], null)], null);
});
the_longtime_game.web.render_leave_heind = (function the_longtime_game$web$render_leave_heind(herd_STAR_,stores){
var carry_limit = the_longtime_game.core.carry_limit.call(null,herd_STAR_);
var carrying = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5523__auto__ = (function the_longtime_game$web$render_leave_heind_$_iter__3586(s__3587){
return (new cljs.core.LazySeq(null,(function (){
var s__3587__$1 = s__3587;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3587__$1);
if(temp__5804__auto__){
var s__3587__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3587__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3587__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3589 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3588 = (0);
while(true){
if((i__3588 < size__5522__auto__)){
var vec__3590 = cljs.core._nth.call(null,c__5521__auto__,i__3588);
var resource = cljs.core.nth.call(null,vec__3590,(0),null);
var _ = cljs.core.nth.call(null,vec__3590,(1),null);
var value = cljs.core.nth.call(null,vec__3590,(2),null);
cljs.core.chunk_append.call(null,b__3589,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [resource,(cljs.core.deref.call(null,value) | (0))], null));

var G__3606 = (i__3588 + (1));
i__3588 = G__3606;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3589),the_longtime_game$web$render_leave_heind_$_iter__3586.call(null,cljs.core.chunk_rest.call(null,s__3587__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3589),null);
}
} else {
var vec__3593 = cljs.core.first.call(null,s__3587__$2);
var resource = cljs.core.nth.call(null,vec__3593,(0),null);
var _ = cljs.core.nth.call(null,vec__3593,(1),null);
var value = cljs.core.nth.call(null,vec__3593,(2),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [resource,(cljs.core.deref.call(null,value) | (0))], null),the_longtime_game$web$render_leave_heind_$_iter__3586.call(null,cljs.core.rest.call(null,s__3587__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,stores);
})());
var disabled_QMARK_ = (carry_limit < cljs.core.reduce.call(null,cljs.core._PLUS_,(0),cljs.core.vals.call(null,carrying)));
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Leave things behind?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Can carry up to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(carry_limit)," goods."].join('')], null),((the_longtime_game.core.must_leave_some_QMARK_.call(null,herd_STAR_))?(function (){var total = cljs.core.reduce.call(null,cljs.core._PLUS_,(0),cljs.core.map.call(null,cljs.core.second,stores));
var too_many = (total - carry_limit);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em","em",707813035),["Carrying ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total),". ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(too_many)," too many!"].join('')], null)], null);
})():null),cljs.core.doall.call(null,(function (){var iter__5523__auto__ = (function the_longtime_game$web$render_leave_heind_$_iter__3596(s__3597){
return (new cljs.core.LazySeq(null,(function (){
var s__3597__$1 = s__3597;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3597__$1);
if(temp__5804__auto__){
var s__3597__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3597__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3597__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3599 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3598 = (0);
while(true){
if((i__3598 < size__5522__auto__)){
var vec__3600 = cljs.core._nth.call(null,c__5521__auto__,i__3598);
var resource = cljs.core.nth.call(null,vec__3600,(0),null);
var amount = cljs.core.nth.call(null,vec__3600,(1),null);
var value = cljs.core.nth.call(null,vec__3600,(2),null);
cljs.core.chunk_append.call(null,b__3599,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.prompt_leave_behind,resource,amount,value], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),resource], null)));

var G__3607 = (i__3598 + (1));
i__3598 = G__3607;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3599),the_longtime_game$web$render_leave_heind_$_iter__3596.call(null,cljs.core.chunk_rest.call(null,s__3597__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3599),null);
}
} else {
var vec__3603 = cljs.core.first.call(null,s__3597__$2);
var resource = cljs.core.nth.call(null,vec__3603,(0),null);
var amount = cljs.core.nth.call(null,vec__3603,(1),null);
var value = cljs.core.nth.call(null,vec__3603,(2),null);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.prompt_leave_behind,resource,amount,value], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),resource], null)),the_longtime_game$web$render_leave_heind_$_iter__3596.call(null,cljs.core.rest.call(null,s__3597__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,stores);
})()),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-fullwidth","button.button.is-info.is-fullwidth",827117595),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_.call(null,the_longtime_game.web.herd,herd_STAR_);

cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,the_longtime_game.core.keep_and_leave_behind,carrying);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"next","next",-117701485));
}),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK_], null),"Carry this!"], null)], null);
});
the_longtime_game.web.handle_leave_behind = (function the_longtime_game$web$handle_leave_behind(){
var leftovers = cljs.core.get_in.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"food","food",1842183121)], null),(0));
var herd_STAR_ = cljs.core.assoc_in.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"food","food",1842183121)], null),(0));
var location__$1 = the_longtime_game.core.current_location.call(null,herd_STAR_);
var location__$2 = ((the_longtime_game.core.local_infra_QMARK_.call(null,herd_STAR_,new cljs.core.Keyword(null,"granary","granary",1909896837)))?cljs.core.update_in.call(null,location__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stores","stores",1203804823),new cljs.core.Keyword(null,"food","food",1842183121)], null),cljs.core._PLUS_,leftovers):location__$1);
var herd_STAR___$1 = the_longtime_game.core.assoc_location.call(null,herd_STAR_,location__$2);
var stores = cljs.core.map.call(null,(function (p1__3608_SHARP_){
return cljs.core.conj.call(null,p1__3608_SHARP_,reagent.core.atom.call(null,cljs.core.second.call(null,p1__3608_SHARP_)));
}),cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.pos_int_QMARK_,cljs.core.second),cljs.core.seq.call(null,new cljs.core.Keyword(null,"stores","stores",1203804823).cljs$core$IFn$_invoke$arity$1(herd_STAR___$1))));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.render_leave_heind,herd_STAR___$1,stores], null);
});
the_longtime_game.web.handle_next_location = (function the_longtime_game$web$handle_next_location(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.box>div.content","div.box>div.content",2014896660),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Choose your next location"], null),(function (){var stage = cljs.core.second.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,the_longtime_game.web.herd)));
return cljs.core.doall.call(null,(function (){var iter__5523__auto__ = (function the_longtime_game$web$handle_next_location_$_iter__3609(s__3610){
return (new cljs.core.LazySeq(null,(function (){
var s__3610__$1 = s__3610;
while(true){
var temp__5804__auto__ = cljs.core.seq.call(null,s__3610__$1);
if(temp__5804__auto__){
var s__3610__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3610__$2)){
var c__5521__auto__ = cljs.core.chunk_first.call(null,s__3610__$2);
var size__5522__auto__ = cljs.core.count.call(null,c__5521__auto__);
var b__3612 = cljs.core.chunk_buffer.call(null,size__5522__auto__);
if((function (){var i__3611 = (0);
while(true){
if((i__3611 < size__5522__auto__)){
var i = cljs.core._nth.call(null,c__5521__auto__,i__3611);
var location__$1 = cljs.core.get_in.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),(1),i], null));
cljs.core.chunk_append.call(null,b__3612,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-fullwidth","button.button.is-info.is-fullwidth",827117595),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__3611,location__$1,i,c__5521__auto__,size__5522__auto__,b__3612,s__3610__$2,temp__5804__auto__,stage){
return (function (){
cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,the_longtime_game.core.next_location,i);

cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,the_longtime_game.core.end_month);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"event","event",301435442));
});})(i__3611,location__$1,i,c__5521__auto__,size__5522__auto__,b__3612,s__3610__$2,temp__5804__auto__,stage))
], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(location__$1)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)));

var G__3613 = (i__3611 + (1));
i__3611 = G__3613;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3612),the_longtime_game$web$handle_next_location_$_iter__3609.call(null,cljs.core.chunk_rest.call(null,s__3610__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3612),null);
}
} else {
var i = cljs.core.first.call(null,s__3610__$2);
var location__$1 = cljs.core.get_in.call(null,cljs.core.deref.call(null,the_longtime_game.web.herd),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),(1),i], null));
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.button.is-info.is-fullwidth","button.button.is-info.is-fullwidth",827117595),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (location__$1,i,s__3610__$2,temp__5804__auto__,stage){
return (function (){
cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,the_longtime_game.core.next_location,i);

cljs.core.swap_BANG_.call(null,the_longtime_game.web.herd,the_longtime_game.core.end_month);

return cljs.core.reset_BANG_.call(null,the_longtime_game.web.monthstep,new cljs.core.Keyword(null,"event","event",301435442));
});})(location__$1,i,s__3610__$2,temp__5804__auto__,stage))
], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(location__$1)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)),the_longtime_game$web$handle_next_location_$_iter__3609.call(null,cljs.core.rest.call(null,s__3610__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,stage)));
})());
})()], null);
});
the_longtime_game.web.playing = (function the_longtime_game$web$playing(){
var G__3614 = cljs.core.deref.call(null,the_longtime_game.web.monthstep);
var G__3614__$1 = (((G__3614 instanceof cljs.core.Keyword))?G__3614.fqn:null);
switch (G__3614__$1) {
case "event":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_event], null);

break;
case "projects":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_projects], null);

break;
case "dream":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_dream], null);

break;
case "upkeep":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_upkeep], null);

break;
case "leave":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_leave_behind], null);

break;
case "next":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.handle_next_location], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__3614__$1)].join('')));

}
});
the_longtime_game.web.app = (function the_longtime_game$web$app(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section.section","section.section",-416807119),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.navbar], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.block","div.block",1082647483),(function (){var G__3616 = cljs.core.deref.call(null,the_longtime_game.web.state);
var G__3616__$1 = (((G__3616 instanceof cljs.core.Keyword))?G__3616.fqn:null);
switch (G__3616__$1) {
case "loading":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.loading], null);

break;
case "new-game":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.init_new_game], null);

break;
case "list-games":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.list_games], null);

break;
case "credits":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.credits], null);

break;
case "playing":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.columns","div.columns",-437221213),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.column.is-half-desktop","div.column.is-half-desktop",-890326351),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.print_herd], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.column.is-half-desktop","div.column.is-half-desktop",-890326351),(function (){var G__3617 = cljs.core.deref.call(null,the_longtime_game.web.gamestate);
var G__3617__$1 = (((G__3617 instanceof cljs.core.Keyword))?G__3617.fqn:null);
switch (G__3617__$1) {
case "intro":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.intro], null);

break;
case "projects":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.projects], null);

break;
case "individuals":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.individuals], null);

break;
case "path":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.path], null);

break;
case "playing":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.playing], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__3617__$1)].join('')));

}
})()], null)], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__3616__$1)].join('')));

}
})()], null)], null);
});
reagent.dom.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [the_longtime_game.web.app], null),document.getElementById("app"));

//# sourceMappingURL=web.js.map
