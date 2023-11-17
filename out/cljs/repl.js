// Compiled by ClojureScript 1.11.60 {:target :nodejs, :nodejs-rt false, :optimizations :none}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__3690){
var map__3691 = p__3690;
var map__3691__$1 = cljs.core.__destructure_map.call(null,map__3691);
var m = map__3691__$1;
var n = cljs.core.get.call(null,map__3691__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__3691__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return [(function (){var temp__5804__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})());

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__3692_3720 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__3693_3721 = null;
var count__3694_3722 = (0);
var i__3695_3723 = (0);
while(true){
if((i__3695_3723 < count__3694_3722)){
var f_3724 = cljs.core._nth.call(null,chunk__3693_3721,i__3695_3723);
cljs.core.println.call(null,"  ",f_3724);


var G__3725 = seq__3692_3720;
var G__3726 = chunk__3693_3721;
var G__3727 = count__3694_3722;
var G__3728 = (i__3695_3723 + (1));
seq__3692_3720 = G__3725;
chunk__3693_3721 = G__3726;
count__3694_3722 = G__3727;
i__3695_3723 = G__3728;
continue;
} else {
var temp__5804__auto___3729 = cljs.core.seq.call(null,seq__3692_3720);
if(temp__5804__auto___3729){
var seq__3692_3730__$1 = temp__5804__auto___3729;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3692_3730__$1)){
var c__5568__auto___3731 = cljs.core.chunk_first.call(null,seq__3692_3730__$1);
var G__3732 = cljs.core.chunk_rest.call(null,seq__3692_3730__$1);
var G__3733 = c__5568__auto___3731;
var G__3734 = cljs.core.count.call(null,c__5568__auto___3731);
var G__3735 = (0);
seq__3692_3720 = G__3732;
chunk__3693_3721 = G__3733;
count__3694_3722 = G__3734;
i__3695_3723 = G__3735;
continue;
} else {
var f_3736 = cljs.core.first.call(null,seq__3692_3730__$1);
cljs.core.println.call(null,"  ",f_3736);


var G__3737 = cljs.core.next.call(null,seq__3692_3730__$1);
var G__3738 = null;
var G__3739 = (0);
var G__3740 = (0);
seq__3692_3720 = G__3737;
chunk__3693_3721 = G__3738;
count__3694_3722 = G__3739;
i__3695_3723 = G__3740;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_3741 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_3741);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_3741)))?cljs.core.second.call(null,arglists_3741):arglists_3741));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__3696_3742 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__3697_3743 = null;
var count__3698_3744 = (0);
var i__3699_3745 = (0);
while(true){
if((i__3699_3745 < count__3698_3744)){
var vec__3708_3746 = cljs.core._nth.call(null,chunk__3697_3743,i__3699_3745);
var name_3747 = cljs.core.nth.call(null,vec__3708_3746,(0),null);
var map__3711_3748 = cljs.core.nth.call(null,vec__3708_3746,(1),null);
var map__3711_3749__$1 = cljs.core.__destructure_map.call(null,map__3711_3748);
var doc_3750 = cljs.core.get.call(null,map__3711_3749__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_3751 = cljs.core.get.call(null,map__3711_3749__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_3747);

cljs.core.println.call(null," ",arglists_3751);

if(cljs.core.truth_(doc_3750)){
cljs.core.println.call(null," ",doc_3750);
} else {
}


var G__3752 = seq__3696_3742;
var G__3753 = chunk__3697_3743;
var G__3754 = count__3698_3744;
var G__3755 = (i__3699_3745 + (1));
seq__3696_3742 = G__3752;
chunk__3697_3743 = G__3753;
count__3698_3744 = G__3754;
i__3699_3745 = G__3755;
continue;
} else {
var temp__5804__auto___3756 = cljs.core.seq.call(null,seq__3696_3742);
if(temp__5804__auto___3756){
var seq__3696_3757__$1 = temp__5804__auto___3756;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3696_3757__$1)){
var c__5568__auto___3758 = cljs.core.chunk_first.call(null,seq__3696_3757__$1);
var G__3759 = cljs.core.chunk_rest.call(null,seq__3696_3757__$1);
var G__3760 = c__5568__auto___3758;
var G__3761 = cljs.core.count.call(null,c__5568__auto___3758);
var G__3762 = (0);
seq__3696_3742 = G__3759;
chunk__3697_3743 = G__3760;
count__3698_3744 = G__3761;
i__3699_3745 = G__3762;
continue;
} else {
var vec__3712_3763 = cljs.core.first.call(null,seq__3696_3757__$1);
var name_3764 = cljs.core.nth.call(null,vec__3712_3763,(0),null);
var map__3715_3765 = cljs.core.nth.call(null,vec__3712_3763,(1),null);
var map__3715_3766__$1 = cljs.core.__destructure_map.call(null,map__3715_3765);
var doc_3767 = cljs.core.get.call(null,map__3715_3766__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_3768 = cljs.core.get.call(null,map__3715_3766__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_3764);

cljs.core.println.call(null," ",arglists_3768);

if(cljs.core.truth_(doc_3767)){
cljs.core.println.call(null," ",doc_3767);
} else {
}


var G__3769 = cljs.core.next.call(null,seq__3696_3757__$1);
var G__3770 = null;
var G__3771 = (0);
var G__3772 = (0);
seq__3696_3742 = G__3769;
chunk__3697_3743 = G__3770;
count__3698_3744 = G__3771;
i__3699_3745 = G__3772;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5804__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.call(null,"Spec");

var seq__3716 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__3717 = null;
var count__3718 = (0);
var i__3719 = (0);
while(true){
if((i__3719 < count__3718)){
var role = cljs.core._nth.call(null,chunk__3717,i__3719);
var temp__5804__auto___3773__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5804__auto___3773__$1)){
var spec_3774 = temp__5804__auto___3773__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_3774));
} else {
}


var G__3775 = seq__3716;
var G__3776 = chunk__3717;
var G__3777 = count__3718;
var G__3778 = (i__3719 + (1));
seq__3716 = G__3775;
chunk__3717 = G__3776;
count__3718 = G__3777;
i__3719 = G__3778;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq.call(null,seq__3716);
if(temp__5804__auto____$1){
var seq__3716__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3716__$1)){
var c__5568__auto__ = cljs.core.chunk_first.call(null,seq__3716__$1);
var G__3779 = cljs.core.chunk_rest.call(null,seq__3716__$1);
var G__3780 = c__5568__auto__;
var G__3781 = cljs.core.count.call(null,c__5568__auto__);
var G__3782 = (0);
seq__3716 = G__3779;
chunk__3717 = G__3780;
count__3718 = G__3781;
i__3719 = G__3782;
continue;
} else {
var role = cljs.core.first.call(null,seq__3716__$1);
var temp__5804__auto___3783__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5804__auto___3783__$2)){
var spec_3784 = temp__5804__auto___3783__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_3784));
} else {
}


var G__3785 = cljs.core.next.call(null,seq__3716__$1);
var G__3786 = null;
var G__3787 = (0);
var G__3788 = (0);
seq__3716 = G__3785;
chunk__3717 = G__3786;
count__3718 = G__3787;
i__3719 = G__3788;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.call(null,"js",t.name):null
))], null),(function (){var temp__5804__auto__ = cljs.core.ex_message.call(null,t);
if(cljs.core.truth_(temp__5804__auto__)){
var msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data.call(null,t);
if(cljs.core.truth_(temp__5804__auto__)){
var ed = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})());
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__3789 = cljs.core.conj.call(null,via,t);
var G__3790 = cljs.core.ex_cause.call(null,t);
via = G__3789;
t = G__3790;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek.call(null,via);
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec.call(null,cljs.core.map.call(null,base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5804__auto__ = cljs.core.ex_message.call(null,root);
if(cljs.core.truth_(temp__5804__auto__)){
var root_msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data.call(null,root);
if(cljs.core.truth_(temp__5804__auto__)){
var data = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data.call(null,o));
if(cljs.core.truth_(temp__5804__auto__)){
var phase = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})());
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__3793 = datafied_throwable;
var map__3793__$1 = cljs.core.__destructure_map.call(null,map__3793);
var via = cljs.core.get.call(null,map__3793__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.call(null,map__3793__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.call(null,map__3793__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__3794 = cljs.core.last.call(null,via);
var map__3794__$1 = cljs.core.__destructure_map.call(null,map__3794);
var type = cljs.core.get.call(null,map__3794__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__3794__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.call(null,map__3794__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__3795 = data;
var map__3795__$1 = cljs.core.__destructure_map.call(null,map__3795);
var problems = cljs.core.get.call(null,map__3795__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.call(null,map__3795__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.call(null,map__3795__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__3796 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,via));
var map__3796__$1 = cljs.core.__destructure_map.call(null,map__3796);
var top_data = map__3796__$1;
var source = cljs.core.get.call(null,map__3796__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.call(null,(function (){var G__3797 = phase;
var G__3797__$1 = (((G__3797 instanceof cljs.core.Keyword))?G__3797.fqn:null);
switch (G__3797__$1) {
case "read-source":
var map__3798 = data;
var map__3798__$1 = cljs.core.__destructure_map.call(null,map__3798);
var line = cljs.core.get.call(null,map__3798__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__3798__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__3799 = cljs.core.merge.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,via)),top_data);
var G__3799__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__3799,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__3799);
var G__3799__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__3799__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__3799__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__3799__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__3799__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__3800 = top_data;
var G__3800__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__3800,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__3800);
var G__3800__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__3800__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__3800__$1);
var G__3800__$3 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__3800__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__3800__$2);
var G__3800__$4 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__3800__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__3800__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__3800__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__3800__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__3801 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__3801,(0),null);
var method = cljs.core.nth.call(null,vec__3801,(1),null);
var file = cljs.core.nth.call(null,vec__3801,(2),null);
var line = cljs.core.nth.call(null,vec__3801,(3),null);
var G__3804 = top_data;
var G__3804__$1 = (cljs.core.truth_(line)?cljs.core.assoc.call(null,G__3804,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__3804);
var G__3804__$2 = (cljs.core.truth_(file)?cljs.core.assoc.call(null,G__3804__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__3804__$1);
var G__3804__$3 = (cljs.core.truth_((function (){var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
})())?cljs.core.assoc.call(null,G__3804__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__3804__$2);
var G__3804__$4 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__3804__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__3804__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__3804__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__3804__$4;
}

break;
case "execution":
var vec__3805 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__3805,(0),null);
var method = cljs.core.nth.call(null,vec__3805,(1),null);
var file = cljs.core.nth.call(null,vec__3805,(2),null);
var line = cljs.core.nth.call(null,vec__3805,(3),null);
var file__$1 = cljs.core.first.call(null,cljs.core.remove.call(null,(function (p1__3792_SHARP_){
var or__5045__auto__ = (p1__3792_SHARP_ == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,p1__3792_SHARP_);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return line;
}
})();
var G__3808 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__3808__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.call(null,G__3808,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__3808);
var G__3808__$2 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__3808__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__3808__$1);
var G__3808__$3 = (cljs.core.truth_((function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
}
})())?cljs.core.assoc.call(null,G__3808__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__3808__$2);
var G__3808__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.call(null,G__3808__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__3808__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__3808__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__3808__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__3797__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__3812){
var map__3813 = p__3812;
var map__3813__$1 = cljs.core.__destructure_map.call(null,map__3813);
var triage_data = map__3813__$1;
var phase = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.call(null,map__3813__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = source;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = line;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name.call(null,(function (){var or__5045__auto__ = class$;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__3814 = phase;
var G__3814__$1 = (((G__3814 instanceof cljs.core.Keyword))?G__3814.fqn:null);
switch (G__3814__$1) {
case "read-source":
return format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause);

break;
case "macro-syntax-check":
return format.call(null,"Syntax error macroexpanding %sat (%s).\n%s",(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,(cljs.core.truth_(spec)?(function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__3815_3824 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__3816_3825 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__3817_3826 = true;
var _STAR_print_fn_STAR__temp_val__3818_3827 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__3817_3826);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__3818_3827);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__3810_SHARP_){
return cljs.core.dissoc.call(null,p1__3810_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__3816_3825);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__3815_3824);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})():format.call(null,"%s\n",cause)));

break;
case "macroexpansion":
return format.call(null,"Unexpected error%s macroexpanding %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compile-syntax-check":
return format.call(null,"Syntax error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compilation":
return format.call(null,"Unexpected error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "read-eval-result":
return format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "print-eval-result":
return format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "execution":
if(cljs.core.truth_(spec)){
return format.call(null,"Execution error - invalid arguments to %s at (%s).\n%s",symbol,loc,(function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__3819_3828 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__3820_3829 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__3821_3830 = true;
var _STAR_print_fn_STAR__temp_val__3822_3831 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__3821_3830);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__3822_3831);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__3811_SHARP_){
return cljs.core.dissoc.call(null,p1__3811_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__3820_3829);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__3819_3828);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})());
} else {
return format.call(null,"Execution error%s at %s(%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__3814__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str.call(null,cljs.repl.ex_triage.call(null,cljs.repl.Error__GT_map.call(null,error)));
});

//# sourceMappingURL=repl.js.map
