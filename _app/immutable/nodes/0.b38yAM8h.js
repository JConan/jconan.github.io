import{s as Q,b as Z,u as G,g as H,d as J,c as he,a as K,e as ae,r as Ee}from"../chunks/scheduler.C0O8tqc2.js";import{S as X,i as Y,e as v,c as b,a as k,d as c,r as m,g as M,n as p,o as h,k as V,l as D,m as O,p as B,s as A,f as C,h as _,w as ie,z as Ne,y as Se,F as Te,u as Ie,t as ne,b as se}from"../chunks/index.BMWywO3N.js";import{p as we}from"../chunks/stores.DXiJpmYL.js";import{w as Ae}from"../chunks/entry.Dc9iEjyZ.js";import{I as ge,g as ve,a as be}from"../chunks/Icon.UHdEU2QT.js";const Ce=!0,Me=async()=>({}),ut=Object.freeze(Object.defineProperty({__proto__:null,load:Me,prerender:Ce},Symbol.toStringTag,{value:"Module"}));function Pe(s){let e,n,t;const l=s[5].default,a=Z(l,s,s[4],null);return{c(){e=v("a"),a&&a.c(),this.h()},l(r){e=b(r,"A",{"data-sveltekit-preload-data":!0,class:!0,href:!0});var i=k(e);a&&a.l(i),i.forEach(c),this.h()},h(){m(e,"data-sveltekit-preload-data",s[1]),m(e,"class",n="navbar-item "+(s[0]==="/"&&s[0]===s[2]||s[0]!=="/"&&s[2].startsWith(s[0])?"is-selected":"")),m(e,"href",s[0])},m(r,i){M(r,e,i),a&&a.m(e,null),t=!0},p(r,[i]){a&&a.p&&(!t||i&16)&&G(a,l,r,r[4],t?J(l,r[4],i,null):H(r[4]),null),(!t||i&2)&&m(e,"data-sveltekit-preload-data",r[1]),(!t||i&5&&n!==(n="navbar-item "+(r[0]==="/"&&r[0]===r[2]||r[0]!=="/"&&r[2].startsWith(r[0])?"is-selected":"")))&&m(e,"class",n),(!t||i&1)&&m(e,"href",r[0])},i(r){t||(p(a,r),t=!0)},o(r){h(a,r),t=!1},d(r){r&&c(e),a&&a.d(r)}}}function Ve(s,e,n){let t,l;he(s,we,o=>n(3,l=o));let{$$slots:a={},$$scope:r}=e,{href:i}=e,{preload:d="hover"}=e;return s.$$set=o=>{"href"in o&&n(0,i=o.href),"preload"in o&&n(1,d=o.preload),"$$scope"in o&&n(4,r=o.$$scope)},s.$$.update=()=>{s.$$.dirty&8&&n(2,t=l.url.pathname)},[i,d,t,l,r,a]}class te extends X{constructor(e){super(),Y(this,e,Ve,Pe,Q,{href:0,preload:1})}}const{subscribe:De,set:Oe,update:Be}=Ae(void 0),ke={subscribe:De,toggle:()=>{Be(s=>{const e=s==="dark"?"light":"dark";return localStorage.setItem("theme",e),document.documentElement.setAttribute("data-theme",e),e})}};{const s=document.documentElement.getAttribute("data-theme")??window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",e=localStorage.getItem("theme");Oe(e??s)}function je(s){let e;const n=s[2].default,t=Z(n,s,s[3],null);return{c(){t&&t.c()},l(l){t&&t.l(l)},m(l,a){t&&t.m(l,a),e=!0},p(l,a){t&&t.p&&(!e||a&8)&&G(t,n,l,l[3],e?J(n,l[3],a,null):H(l[3]),null)},i(l){e||(p(t,l),e=!0)},o(l){h(t,l),e=!1},d(l){t&&t.d(l)}}}function ze(s){let e,n;const t=[{name:"moon"},s[1],{iconNode:s[0]}];let l={$$slots:{default:[je]},$$scope:{ctx:s}};for(let a=0;a<t.length;a+=1)l=K(l,t[a]);return e=new ge({props:l}),{c(){V(e.$$.fragment)},l(a){D(e.$$.fragment,a)},m(a,r){O(e,a,r),n=!0},p(a,[r]){const i=r&3?ve(t,[t[0],r&2&&be(a[1]),r&1&&{iconNode:a[0]}]):{};r&8&&(i.$$scope={dirty:r,ctx:a}),e.$set(i)},i(a){n||(p(e.$$.fragment,a),n=!0)},o(a){h(e.$$.fragment,a),n=!1},d(a){B(e,a)}}}function Le(s,e,n){let{$$slots:t={},$$scope:l}=e;const a=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]];return s.$$set=r=>{n(1,e=K(K({},e),ae(r))),"$$scope"in r&&n(3,l=r.$$scope)},e=ae(e),[a,e,t,l]}class Ue extends X{constructor(e){super(),Y(this,e,Le,ze,Q,{})}}function We(s){let e;const n=s[2].default,t=Z(n,s,s[3],null);return{c(){t&&t.c()},l(l){t&&t.l(l)},m(l,a){t&&t.m(l,a),e=!0},p(l,a){t&&t.p&&(!e||a&8)&&G(t,n,l,l[3],e?J(n,l[3],a,null):H(l[3]),null)},i(l){e||(p(t,l),e=!0)},o(l){h(t,l),e=!1},d(l){t&&t.d(l)}}}function qe(s){let e,n;const t=[{name:"sun"},s[1],{iconNode:s[0]}];let l={$$slots:{default:[We]},$$scope:{ctx:s}};for(let a=0;a<t.length;a+=1)l=K(l,t[a]);return e=new ge({props:l}),{c(){V(e.$$.fragment)},l(a){D(e.$$.fragment,a)},m(a,r){O(e,a,r),n=!0},p(a,[r]){const i=r&3?ve(t,[t[0],r&2&&be(a[1]),r&1&&{iconNode:a[0]}]):{};r&8&&(i.$$scope={dirty:r,ctx:a}),e.$set(i)},i(a){n||(p(e.$$.fragment,a),n=!0)},o(a){h(e.$$.fragment,a),n=!1},d(a){B(e,a)}}}function Fe(s,e,n){let{$$slots:t={},$$scope:l}=e;const a=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];return s.$$set=r=>{n(1,e=K(K({},e),ae(r))),"$$scope"in r&&n(3,l=r.$$scope)},e=ae(e),[a,e,t,l]}class Re extends X{constructor(e){super(),Y(this,e,Fe,qe,Q,{})}}const Ze=s=>({}),pe=s=>({});function Ge(s){let e,n;return e=new Ue({}),{c(){V(e.$$.fragment)},l(t){D(e.$$.fragment,t)},m(t,l){O(e,t,l),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function He(s){let e,n;return e=new Re({}),{c(){V(e.$$.fragment)},l(t){D(e.$$.fragment,t)},m(t,l){O(e,t,l),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function Je(s){let e,n,t,l,a,r,i,d,o,u,$,g,U,q,T,F,le,R,j,I,w,y,P,re,fe;const oe=s[4].brand,E=Z(oe,s,s[3],pe),ue=s[4].default,N=Z(ue,s,s[3],null),ce=[He,Ge],W=[];function me(f,S){return f[1]==="dark"?0:1}return I=me(s),w=W[I]=ce[I](s),{c(){e=v("section"),n=v("nav"),t=v("div"),E&&E.c(),l=A(),a=v("button"),r=v("span"),i=A(),d=v("span"),o=A(),u=v("span"),$=A(),g=v("span"),q=A(),T=v("div"),F=v("div"),N&&N.c(),le=A(),R=v("div"),j=v("button"),w.c(),this.h()},l(f){e=b(f,"SECTION",{class:!0});var S=k(e);n=b(S,"NAV",{class:!0,"aria-label":!0});var z=k(n);t=b(z,"DIV",{class:!0});var x=k(t);E&&E.l(x),l=C(x),a=b(x,"BUTTON",{class:!0,"aria-label":!0,"aria-expanded":!0,"data-target":!0});var L=k(a);r=b(L,"SPAN",{"aria-hidden":!0}),k(r).forEach(c),i=C(L),d=b(L,"SPAN",{"aria-hidden":!0}),k(d).forEach(c),o=C(L),u=b(L,"SPAN",{"aria-hidden":!0}),k(u).forEach(c),$=C(L),g=b(L,"SPAN",{"aria-hidden":!0}),k(g).forEach(c),L.forEach(c),x.forEach(c),q=C(z),T=b(z,"DIV",{id:!0,class:!0});var ee=k(T);F=b(ee,"DIV",{class:!0});var de=k(F);N&&N.l(de),de.forEach(c),le=C(ee),R=b(ee,"DIV",{class:!0});var _e=k(R);j=b(_e,"BUTTON",{class:!0});var $e=k(j);w.l($e),$e.forEach(c),_e.forEach(c),ee.forEach(c),z.forEach(c),S.forEach(c),this.h()},h(){m(r,"aria-hidden","true"),m(d,"aria-hidden","true"),m(u,"aria-hidden","true"),m(g,"aria-hidden","true"),m(a,"class",U="navbar-burger "+s[0]),m(a,"aria-label","menu"),m(a,"aria-expanded","false"),m(a,"data-target","navbar-items"),m(t,"class","navbar-brand"),m(F,"class","navbar-start"),m(j,"class","button is-ghost is-small navbar-item"),m(R,"class","navbar-end"),m(T,"id","navbar-items"),m(T,"class",y="navbar-menu "+s[0]),m(n,"class","navbar"),m(n,"aria-label","main navigation"),m(e,"class","svelte-1a02re3")},m(f,S){M(f,e,S),_(e,n),_(n,t),E&&E.m(t,null),_(t,l),_(t,a),_(a,r),_(a,i),_(a,d),_(a,o),_(a,u),_(a,$),_(a,g),_(n,q),_(n,T),_(T,F),N&&N.m(F,null),_(T,le),_(T,R),_(R,j),W[I].m(j,null),P=!0,re||(fe=[ie(a,"click",s[2]),ie(j,"click",ke.toggle),ie(T,"click",s[2])],re=!0)},p(f,[S]){E&&E.p&&(!P||S&8)&&G(E,oe,f,f[3],P?J(oe,f[3],S,Ze):H(f[3]),pe),(!P||S&1&&U!==(U="navbar-burger "+f[0]))&&m(a,"class",U),N&&N.p&&(!P||S&8)&&G(N,ue,f,f[3],P?J(ue,f[3],S,null):H(f[3]),null);let z=I;I=me(f),I!==z&&(Ne(),h(W[z],1,1,()=>{W[z]=null}),Se(),w=W[I],w||(w=W[I]=ce[I](f),w.c()),p(w,1),w.m(j,null)),(!P||S&1&&y!==(y="navbar-menu "+f[0]))&&m(T,"class",y)},i(f){P||(p(E,f),p(N,f),p(w),P=!0)},o(f){h(E,f),h(N,f),h(w),P=!1},d(f){f&&c(e),E&&E.d(f),N&&N.d(f),W[I].d(),re=!1,Ee(fe)}}}function Ke(s,e,n){let t;he(s,ke,d=>n(1,t=d));let{$$slots:l={},$$scope:a}=e,r="";function i(){n(0,r=r===""?"is-active":"")}return s.$$set=d=>{"$$scope"in d&&n(3,a=d.$$scope)},[r,t,i,a,l]}class Qe extends X{constructor(e){super(),Y(this,e,Ke,Je,Q,{})}}function Xe(s){let e;return{c(){e=ne("Blog")},l(n){e=se(n,"Blog")},m(n,t){M(n,e,t)},d(n){n&&c(e)}}}function Ye(s){let e;return{c(){e=ne("Portfolio")},l(n){e=se(n,"Portfolio")},m(n,t){M(n,e,t)},d(n){n&&c(e)}}}function ye(s){let e;return{c(){e=ne("Contact")},l(n){e=se(n,"Contact")},m(n,t){M(n,e,t)},d(n){n&&c(e)}}}function xe(s){let e;return{c(){e=ne("CV")},l(n){e=se(n,"CV")},m(n,t){M(n,e,t)},d(n){n&&c(e)}}}function et(s){let e,n,t,l,a,r,i,d;return e=new te({props:{href:"/",$$slots:{default:[Xe]},$$scope:{ctx:s}}}),t=new te({props:{href:"/portfolio",preload:"off",$$slots:{default:[Ye]},$$scope:{ctx:s}}}),a=new te({props:{href:"/contact",$$slots:{default:[ye]},$$scope:{ctx:s}}}),i=new te({props:{href:"/cv",$$slots:{default:[xe]},$$scope:{ctx:s}}}),{c(){V(e.$$.fragment),n=A(),V(t.$$.fragment),l=A(),V(a.$$.fragment),r=A(),V(i.$$.fragment)},l(o){D(e.$$.fragment,o),n=C(o),D(t.$$.fragment,o),l=C(o),D(a.$$.fragment,o),r=C(o),D(i.$$.fragment,o)},m(o,u){O(e,o,u),M(o,n,u),O(t,o,u),M(o,l,u),O(a,o,u),M(o,r,u),O(i,o,u),d=!0},p(o,u){const $={};u&2&&($.$$scope={dirty:u,ctx:o}),e.$set($);const g={};u&2&&(g.$$scope={dirty:u,ctx:o}),t.$set(g);const U={};u&2&&(U.$$scope={dirty:u,ctx:o}),a.$set(U);const q={};u&2&&(q.$$scope={dirty:u,ctx:o}),i.$set(q)},i(o){d||(p(e.$$.fragment,o),p(t.$$.fragment,o),p(a.$$.fragment,o),p(i.$$.fragment,o),d=!0)},o(o){h(e.$$.fragment,o),h(t.$$.fragment,o),h(a.$$.fragment,o),h(i.$$.fragment,o),d=!1},d(o){o&&(c(n),c(l),c(r)),B(e,o),B(t,o),B(a,o),B(i,o)}}}function tt(s){let e,n=`const dataTheme = localStorage.getItem('theme');
		if (dataTheme) document.documentElement.setAttribute('data-theme', dataTheme);`,t,l,a,r,i;a=new Qe({props:{$$slots:{default:[et]},$$scope:{ctx:s}}});const d=s[0].default,o=Z(d,s,s[1],null);return{c(){e=v("script"),e.textContent=n,t=A(),l=v("main"),V(a.$$.fragment),r=A(),o&&o.c(),this.h()},l(u){const $=Te("svelte-1wp8ckk",document.head);e=b($,"SCRIPT",{"data-svelte-h":!0}),Ie(e)!=="svelte-1725hv0"&&(e.textContent=n),$.forEach(c),t=C(u),l=b(u,"MAIN",{class:!0});var g=k(l);D(a.$$.fragment,g),r=C(g),o&&o.l(g),g.forEach(c),this.h()},h(){m(l,"class","container svelte-1nvtitu")},m(u,$){_(document.head,e),M(u,t,$),M(u,l,$),O(a,l,null),_(l,r),o&&o.m(l,null),i=!0},p(u,[$]){const g={};$&2&&(g.$$scope={dirty:$,ctx:u}),a.$set(g),o&&o.p&&(!i||$&2)&&G(o,d,u,u[1],i?J(d,u[1],$,null):H(u[1]),null)},i(u){i||(p(a.$$.fragment,u),p(o,u),i=!0)},o(u){h(a.$$.fragment,u),h(o,u),i=!1},d(u){u&&(c(t),c(l)),c(e),B(a),o&&o.d(u)}}}function at(s,e,n){let{$$slots:t={},$$scope:l}=e;return s.$$set=a=>{"$$scope"in a&&n(1,l=a.$$scope)},[t,l]}class it extends X{constructor(e){super(),Y(this,e,at,tt,Q,{})}}export{it as component,ut as universal};
