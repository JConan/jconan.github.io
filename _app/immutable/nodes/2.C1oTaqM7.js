import{w as pe,g as ve}from"../chunks/entry.Cc7CZcmt.js";import{p as de}from"../chunks/stores.Cdz48d0k.js";import{r as P}from"../chunks/ROUTES.Zx98zETW.js";import{i as be,s as Ee,b as Ce,u as Ie,g as je,d as we,c as ce}from"../chunks/scheduler.C0O8tqc2.js";import{S as Le,i as De,e as _,s as O,t as W,k as ke,c as d,a as p,u as ye,f as G,d as f,b as q,l as Se,r as l,g as ge,h as a,m as Te,n as ue,o as fe,B as Pe,p as Ae}from"../chunks/index.BMWywO3N.js";import{e as me}from"../chunks/Icon.UHdEU2QT.js";import{G as Je}from"../chunks/github.LKQX2Hyl.js";const te=[{name:"Memory Game",slug:"fm-memory-game-challenge",shortDescription:"",demoLink:"https://jconan.github.io/fm-memory-game-challenge/",descriptionLink:"https://raw.githubusercontent.com/JConan/fm-memory-game-challenge/main/DESCRIPTION.md",source:"https://github.com/JConan/fm-memory-game-challenge/"},{name:"Tic Tac Toe",slug:"fm-tic-tac-toe",shortDescription:"Game Tic Tac Toe built with svelte",demoLink:"https://jconan.github.io/fm-tic-tac-toe/",descriptionLink:"https://raw.githubusercontent.com/JConan/fm-tic-tac-toe/main/DESCRIPTION.md",source:"https://github.com/JConan/fm-tic-tac-toe/"},{name:"Connect Four",slug:"fm-connect-four",shortDescription:"Connect Four is a two-player game where the goal is to align four discs in a row",demoLink:"https://jconan.github.io/fm-connect-four",descriptionLink:"https://raw.githubusercontent.com/JConan/fm-connect-four/main/DESCRIPTION.md",source:"https://github.com/JConan/fm-connect-four"}],ee=pe(te[0]);de.subscribe(t=>{var s,o;if((o=(s=t.route)==null?void 0:s.id)!=null&&o.startsWith("/portfolio/[slug]")){const r=te.filter(c=>c.slug===t.params.slug)[0];ee.set(r)}});const Oe=async({url:{pathname:t}})=>(t===P("/portfolio")&&ve(P("/portfolio/[slug]",{slug:be(ee).slug})),{projects:te,selectedProject:ee}),qe=Object.freeze(Object.defineProperty({__proto__:null,load:Oe},Symbol.toStringTag,{value:"Module"}));function he(t,s,o){const r=t.slice();return r[9]=s[o].name,r[10]=s[o].slug,r}function _e(t){let s,o,r=t[9]+"",c,C,I;return{c(){s=_("li"),o=_("a"),c=W(r),I=O(),this.h()},l(i){s=d(i,"LI",{});var v=p(s);o=d(v,"A",{class:!0,href:!0});var g=p(o);c=q(g,r),g.forEach(f),I=G(v),v.forEach(f),this.h()},h(){l(o,"class",C=t[1].slug===t[10]?"is-selected":""),l(o,"href",P("/portfolio/[slug]",{slug:t[10]}))},m(i,v){ge(i,s,v),a(s,o),a(o,c),a(s,I)},p(i,v){v&2&&C!==(C=i[1].slug===i[10]?"is-selected":"")&&l(o,"class",C)},d(i){i&&f(s)}}}function Ge(t){let s,o,r,c,C="Frontend Mentor",I,i,v,g,L,E,m,D,B,F,M,H,k,y,K,N,R,Q,V,w,S,X,z,Y,j,A=me(t[2]),u=[];for(let e=0;e<A.length;e+=1)u[e]=_e(he(t,A,e));S=new Je({props:{size:"18"}});const Z=t[8].default,b=Ce(Z,t,t[7],null);return{c(){s=_("div"),o=_("div"),r=_("aside"),c=_("a"),c.textContent=C,I=O(),i=_("ul");for(let e=0;e<u.length;e+=1)u[e].c();v=O(),g=_("div"),L=_("div"),E=_("ul"),m=_("li"),D=_("a"),B=W("description"),H=O(),k=_("li"),y=_("a"),K=W("demo"),Q=O(),V=_("li"),w=_("a"),ke(S.$$.fragment),X=W("github"),Y=O(),b&&b.c(),this.h()},l(e){s=d(e,"DIV",{class:!0});var h=p(s);o=d(h,"DIV",{class:!0});var n=p(o);r=d(n,"ASIDE",{class:!0});var T=p(r);c=d(T,"A",{href:!0,class:!0,"data-svelte-h":!0}),ye(c)!=="svelte-r71exl"&&(c.textContent=C),I=G(T),i=d(T,"UL",{class:!0});var se=p(i);for(let x=0;x<u.length;x+=1)u[x].l(se);se.forEach(f),T.forEach(f),n.forEach(f),v=G(h),g=d(h,"DIV",{class:!0});var U=p(g);L=d(U,"DIV",{class:!0});var oe=p(L);E=d(oe,"UL",{});var J=p(E);m=d(J,"LI",{class:!0});var ae=p(m);D=d(ae,"A",{href:!0});var le=p(D);B=q(le,"description"),le.forEach(f),ae.forEach(f),H=G(J),k=d(J,"LI",{class:!0});var re=p(k);y=d(re,"A",{href:!0});var ne=p(y);K=q(ne,"demo"),ne.forEach(f),re.forEach(f),Q=G(J),V=d(J,"LI",{});var ie=p(V);w=d(ie,"A",{href:!0,target:!0});var $=p(w);Se(S.$$.fragment,$),X=q($,"github"),$.forEach(f),ie.forEach(f),J.forEach(f),oe.forEach(f),Y=G(U),b&&b.l(U),U.forEach(f),h.forEach(f),this.h()},h(){l(c,"href","https://www.frontendmentor.io"),l(c,"class","menu-label"),l(i,"class","menu-list"),l(r,"class","menu"),l(o,"class","column is-one-fifth"),l(D,"href",F=P("/portfolio/[slug]",{slug:t[1].slug})),l(m,"class",M=t[0]?"":"is-active"),l(y,"href",N=P("/portfolio/[slug]/demo",{slug:t[1].slug})),l(k,"class",R=t[0]?"is-active":""),l(w,"href",z=t[1].source),l(w,"target","_blank"),l(L,"class","tabs svelte-1i8veou"),l(g,"class","column is-four-fifths"),l(s,"class","columns")},m(e,h){ge(e,s,h),a(s,o),a(o,r),a(r,c),a(r,I),a(r,i);for(let n=0;n<u.length;n+=1)u[n]&&u[n].m(i,null);a(s,v),a(s,g),a(g,L),a(L,E),a(E,m),a(m,D),a(D,B),a(E,H),a(E,k),a(k,y),a(y,K),a(E,Q),a(E,V),a(V,w),Te(S,w,null),a(w,X),a(g,Y),b&&b.m(g,null),j=!0},p(e,[h]){if(h&6){A=me(e[2]);let n;for(n=0;n<A.length;n+=1){const T=he(e,A,n);u[n]?u[n].p(T,h):(u[n]=_e(T),u[n].c(),u[n].m(i,null))}for(;n<u.length;n+=1)u[n].d(1);u.length=A.length}(!j||h&2&&F!==(F=P("/portfolio/[slug]",{slug:e[1].slug})))&&l(D,"href",F),(!j||h&1&&M!==(M=e[0]?"":"is-active"))&&l(m,"class",M),(!j||h&2&&N!==(N=P("/portfolio/[slug]/demo",{slug:e[1].slug})))&&l(y,"href",N),(!j||h&1&&R!==(R=e[0]?"is-active":""))&&l(k,"class",R),(!j||h&2&&z!==(z=e[1].source))&&l(w,"href",z),b&&b.p&&(!j||h&128)&&Ie(b,Z,e,e[7],j?we(Z,e[7],h,null):je(e[7]),null)},i(e){j||(ue(S.$$.fragment,e),ue(b,e),j=!0)},o(e){fe(S.$$.fragment,e),fe(b,e),j=!1},d(e){e&&f(s),Pe(u,e),Ae(S),b&&b.d(e)}}}function Ve(t,s,o){let r,c,C,I;ce(t,de,m=>o(5,C=m));let{$$slots:i={},$$scope:v}=s,{data:g}=s;const{projects:L,selectedProject:E}=g;return ce(t,E,m=>o(6,I=m)),t.$$set=m=>{"data"in m&&o(4,g=m.data),"$$scope"in m&&o(7,v=m.$$scope)},t.$$.update=()=>{t.$$.dirty&64&&o(1,r=I),t.$$.dirty&32&&o(0,c=C.url.pathname.endsWith("/demo"))},[c,r,L,E,g,C,I,v,i]}class Be extends Le{constructor(s){super(),De(this,s,Ve,Ge,Ee,{data:4})}}export{Be as component,qe as universal};