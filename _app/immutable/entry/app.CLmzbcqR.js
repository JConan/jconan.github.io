const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.CG-O9hO4.js","../chunks/disclose-version.Bg9kRutz.js","../chunks/runtime.CB-r9ogf.js","../chunks/svelte-head.Cn_UYDxL.js","../chunks/template.CeKaU0V5.js","../chunks/attributes.CQpQLy5s.js","../chunks/utils.CZhtWnhR.js","../chunks/class.BaWgIXK-.js","../chunks/props.CTYCmxX3.js","../chunks/store.wQXM-nkN.js","../chunks/utils.B2v8NRLC.js","../chunks/stores.COrsbsVm.js","../chunks/entry.Oa_UteFQ.js","../chunks/if.T-llzyWG.js","../chunks/Icon.DUqoUe-e.js","../chunks/html.B_wnlZjd.js","../chunks/lifecycle.Fe7m_UBG.js","../chunks/index-client.hnNoclHA.js","../assets/0.Td2tyh4o.css","../nodes/1.D-X-BdAQ.js","../chunks/render.Cv9ph0k2.js","../nodes/2.CzxcdJ-8.js","../assets/2.idMKlLfl.css","../nodes/3.CbkFIByk.js","../assets/3.DQaPhboV.css","../nodes/4.C_WSxujv.js","../assets/4.xwoV8_rg.css","../nodes/5.D0xr5QbJ.js","../chunks/5.DKiXNq8A.js","../chunks/marked.esm.B6Q0NRz_.js","../chunks/this.D2DnX5xr.js","../chunks/preload-helper.C1FmrZbK.js","../assets/5.CPcWMPVS.css","../nodes/6.RBcn971s.js","../nodes/7.h-72COF5.js","../nodes/8.BsTCdkgI.js","../assets/8.DTPlqJx7.css"])))=>i.map(i=>d[i]);
var J=r=>{throw TypeError(r)};var K=(r,t,e)=>t.has(r)||J("Cannot "+e);var i=(r,t,e)=>(K(r,t,"read from private field"),e?e.call(r):t.get(r)),G=(r,t,e)=>t.has(r)?J("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(r):t.set(r,e),S=(r,t,e,s)=>(K(r,t,"write to private field"),s?s.call(r,e):t.set(r,e),e);import{_ as h}from"../chunks/preload-helper.C1FmrZbK.js";import{h as N,l as et,A as rt,x as at,X as ot,m as st,E as m,C as k,aq as nt,a6 as it,O as ct,p as ut,G as _t,I as mt,ar as dt,f as E,s as lt,a as ft,as as X,ah as A,c as ht,t as vt,r as gt}from"../chunks/runtime.CB-r9ogf.js";import{h as yt,m as Et,u as Pt,s as bt}from"../chunks/render.Cv9ph0k2.js";import"../chunks/disclose-version.Bg9kRutz.js";import{i as T}from"../chunks/if.T-llzyWG.js";import{d as b,a as v,t as Q,e as Rt}from"../chunks/template.CeKaU0V5.js";import{p as V,a as xt}from"../chunks/props.CTYCmxX3.js";import{b as I}from"../chunks/this.D2DnX5xr.js";import{o as Ot}from"../chunks/index-client.hnNoclHA.js";function D(r,t,e){N&&et();var s=r,n,d;rt(()=>{n!==(n=t())&&(d&&(ot(d),d=null),n&&(d=at(()=>e(s,n))))}),N&&(s=st)}function At(r){return class extends It{constructor(t){super({component:r,...t})}}}var g,c;class It{constructor(t){G(this,g);G(this,c);var d;var e=new Map,s=(a,o)=>{var l=ct(o);return e.set(a,l),l};const n=new Proxy({...t.props||{},$$events:{}},{get(a,o){return m(e.get(o)??s(o,Reflect.get(a,o)))},has(a,o){return m(e.get(o)??s(o,Reflect.get(a,o))),Reflect.has(a,o)},set(a,o,l){return k(e.get(o)??s(o,l),l),Reflect.set(a,o,l)}});S(this,c,(t.hydrate?yt:Et)(t.component,{target:t.target,props:n,context:t.context,intro:t.intro??!1,recover:t.recover})),(!((d=t==null?void 0:t.props)!=null&&d.$$host)||t.sync===!1)&&nt(),S(this,g,n.$$events);for(const a of Object.keys(i(this,c)))a==="$set"||a==="$destroy"||a==="$on"||it(this,a,{get(){return i(this,c)[a]},set(o){i(this,c)[a]=o},enumerable:!0});i(this,c).$set=a=>{Object.assign(n,a)},i(this,c).$destroy=()=>{Pt(i(this,c))}}$set(t){i(this,c).$set(t)}$on(t,e){i(this,g)[t]=i(this,g)[t]||[];const s=(...n)=>e.call(this,...n);return i(this,g)[t].push(s),()=>{i(this,g)[t]=i(this,g)[t].filter(n=>n!==s)}}$destroy(){i(this,c).$destroy()}}g=new WeakMap,c=new WeakMap;const Bt={};var Dt=Q('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),Lt=Q("<!> <!>",1);function Tt(r,t){ut(t,!0);let e=V(t,"components",23,()=>[]),s=V(t,"data_0",3,null),n=V(t,"data_1",3,null),d=V(t,"data_2",3,null);_t(()=>t.stores.page.set(t.page)),mt(()=>{t.stores,t.page,t.constructors,e(),t.form,s(),n(),d(),t.stores.page.notify()});let a=X(!1),o=X(!1),l=X(null);Ot(()=>{const y=t.stores.page.subscribe(()=>{m(a)&&(k(o,!0),dt().then(()=>{k(l,xt(document.title||"untitled page"))}))});return k(a,!0),y});const U=A(()=>t.constructors[2]);var z=Lt(),B=E(z);T(B,()=>t.constructors[1],y=>{var f=b();const R=A(()=>t.constructors[0]);var x=E(f);D(x,()=>m(R),(P,p)=>{I(p(P,{get data(){return s()},get form(){return t.form},children:(u,Vt)=>{var F=b(),Y=E(F);T(Y,()=>t.constructors[2],w=>{var O=b();const C=A(()=>t.constructors[1]);var j=E(O);D(j,()=>m(C),(M,q)=>{I(q(M,{get data(){return n()},get form(){return t.form},children:(_,kt)=>{var H=b(),Z=E(H);D(Z,()=>m(U),($,tt)=>{I(tt($,{get data(){return d()},get form(){return t.form}}),L=>e()[2]=L,()=>{var L;return(L=e())==null?void 0:L[2]})}),v(_,H)},$$slots:{default:!0}}),_=>e()[1]=_,()=>{var _;return(_=e())==null?void 0:_[1]})}),v(w,O)},w=>{var O=b();const C=A(()=>t.constructors[1]);var j=E(O);D(j,()=>m(C),(M,q)=>{I(q(M,{get data(){return n()},get form(){return t.form}}),_=>e()[1]=_,()=>{var _;return(_=e())==null?void 0:_[1]})}),v(w,O)}),v(u,F)},$$slots:{default:!0}}),u=>e()[0]=u,()=>{var u;return(u=e())==null?void 0:u[0]})}),v(y,f)},y=>{var f=b();const R=A(()=>t.constructors[0]);var x=E(f);D(x,()=>m(R),(P,p)=>{I(p(P,{get data(){return s()},get form(){return t.form}}),u=>e()[0]=u,()=>{var u;return(u=e())==null?void 0:u[0]})}),v(y,f)});var W=lt(B,2);T(W,()=>m(a),y=>{var f=Dt(),R=ht(f);T(R,()=>m(o),x=>{var P=Rt();vt(()=>bt(P,m(l))),v(x,P)}),gt(f),v(y,f)}),v(r,z),ft()}const Ft=At(Tt),Ht=[()=>h(()=>import("../nodes/0.CG-O9hO4.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]),import.meta.url),()=>h(()=>import("../nodes/1.D-X-BdAQ.js"),__vite__mapDeps([19,1,2,20,6,3,4,16,9,10,11,12]),import.meta.url),()=>h(()=>import("../nodes/2.CzxcdJ-8.js"),__vite__mapDeps([21,12,2,10,11,1,20,6,3,4,5,7,16,8,9,14,13,15,17,22]),import.meta.url),()=>h(()=>import("../nodes/3.CbkFIByk.js"),__vite__mapDeps([23,1,2,4,5,6,14,13,15,16,8,17,24]),import.meta.url),()=>h(()=>import("../nodes/4.C_WSxujv.js"),__vite__mapDeps([25,1,2,4,14,13,15,5,6,16,8,17,26]),import.meta.url),()=>h(()=>import("../nodes/5.D0xr5QbJ.js"),__vite__mapDeps([27,28,29,1,2,6,4,13,15,30,16,8,14,5,17,31,32]),import.meta.url),()=>h(()=>import("../nodes/6.RBcn971s.js"),__vite__mapDeps([33,1]),import.meta.url),()=>h(()=>import("../nodes/7.h-72COF5.js"),__vite__mapDeps([34,1,2,4,15,16,8,29,17]),import.meta.url),()=>h(()=>import("../nodes/8.BsTCdkgI.js"),__vite__mapDeps([35,1,2,4,13,5,6,30,8,9,10,36]),import.meta.url)],Jt=[],Kt={"/":[3],"/contact":[4],"/cv":[5],"/portfolio":[6,[2]],"/portfolio/[slug]":[7,[2]],"/portfolio/[slug]/demo":[8,[2]]},Nt={handleError:({error:r})=>{console.error(r)},reroute:()=>{}};export{Kt as dictionary,Nt as hooks,Bt as matchers,Ht as nodes,Ft as root,Jt as server_loads};
