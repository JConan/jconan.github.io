import{w as fe,g as ve,a as de}from"../chunks/entry.Oa_UteFQ.js";import{p as ae}from"../chunks/stores.COrsbsVm.js";import"../chunks/disclose-version.Bg9kRutz.js";import{b as me,A as he,h as w,k as J,l as re,a2 as pe,v as se,U as ge,V as z,j as F,m as A,W as ne,x as oe,X as _e,at as be,y as B,C as G,au as ye,av as Ee,O as Te,a9 as K,aw as we,ax as Ce,u as Ie,ay as Se,F as xe,g as ke,n as Ae,d as De,p as Ne,_ as Z,$ as Oe,t as D,a as Pe,s as N,c as y,r as g,E as T,Z as Re,D as q}from"../chunks/runtime.CB-r9ogf.js";import{s as je}from"../chunks/render.Cv9ph0k2.js";import{a as Q,t as le}from"../chunks/template.CeKaU0V5.js";import{a as R}from"../chunks/attributes.CQpQLy5s.js";import{s as H}from"../chunks/class.BaWgIXK-.js";import{i as Le}from"../chunks/lifecycle.Fe7m_UBG.js";import{p as Me}from"../chunks/props.CTYCmxX3.js";import{s as $e,a as ee}from"../chunks/store.wQXM-nkN.js";import{I as Je}from"../chunks/Icon.DUqoUe-e.js";let V=null;function Fe(t,e){return e}function He(t,e,a,i){for(var v=[],c=e.length,o=0;o<c;o++)Ce(e[o].e,v,!0);var h=c>0&&v.length===0&&a!==null;if(h){var p=a.parentNode;Ie(p),p.append(a),i.clear(),C(t,e[0].prev,e[c-1].next)}Se(v,()=>{for(var r=0;r<c;r++){var l=e[r];h||(i.delete(l.k),C(t,l.prev,l.next)),xe(l.e,!h)}})}function Ve(t,e,a,i,v,c=null){var o=t,h={flags:e,items:new Map,first:null};{var p=t;o=w?J(ke(p)):p.appendChild(me())}w&&re();var r=null;he(()=>{var l=a(),s=pe(l)?l:l==null?[]:se(l),u=s.length;let m=!1;if(w){var f=o.data===ge;f!==(u===0)&&(o=z(),J(o),F(!1),m=!0)}if(w){for(var _=null,n,d=0;d<u;d++){if(A.nodeType===8&&A.data===Ae){o=A,m=!0,F(!1);break}var S=s[d],b=i(S,d);n=ie(A,h,_,null,S,b,d,v,e),h.items.set(b,n),_=n}u>0&&J(z())}w||Ge(s,h,o,v,e,i),c!==null&&(u===0?r?ne(r):r=oe(()=>c(o)):r!==null&&_e(r,()=>{r=null})),m&&F(!0)}),w&&(o=A)}function Ge(t,e,a,i,v,c){var o=t.length,h=e.items,p=e.first,r=p,l,s=null,u=[],m=[],f,_,n,d;for(d=0;d<o;d+=1){if(f=t[d],_=c(f,d),n=h.get(_),n===void 0){var S=r?r.e.nodes_start:a;s=ie(S,e,s,s===null?e.first:s.next,f,_,d,i,v),h.set(_,s),u=[],m=[],r=s.next;continue}if(We(n,f,d),n.e.f&be&&ne(n.e),n!==r){if(l!==void 0&&l.has(n)){if(u.length<m.length){var b=m[0],E;s=b.prev;var x=u[0],I=u[u.length-1];for(E=0;E<u.length;E+=1)te(u[E],b,a);for(E=0;E<m.length;E+=1)l.delete(m[E]);C(e,x.prev,I.next),C(e,s,x),C(e,I,b),r=b,s=I,d-=1,u=[],m=[]}else l.delete(n),te(n,r,a),C(e,n.prev,n.next),C(e,n,s===null?e.first:s.next),C(e,s,n),s=n;continue}for(u=[],m=[];r!==null&&r.k!==_;)(l??(l=new Set)).add(r),m.push(r),r=r.next;if(r===null)continue;n=r}u.push(n),s=n,r=n.next}if(r!==null||l!==void 0){for(var k=l===void 0?[]:se(l);r!==null;)k.push(r),r=r.next;var L=k.length;if(L>0){var M=o===0?a:null;He(e,k,M,h)}}B.first=e.first&&e.first.e,B.last=s&&s.e}function We(t,e,a,i){G(t.v,e),t.i=a}function ie(t,e,a,i,v,c,o,h,p){var r=V;try{var l=(p&ye)!==0,s=(p&Ee)===0,u=l?s?Te(v):K(v):v,m=p&we?K(o):o,f={i:m,v:u,k:c,a:null,e:null,prev:a,next:i};return V=f,f.e=oe(()=>h(t,u,m),w),f.e.prev=a&&a.e,f.e.next=i&&i.e,a===null?e.first=f:(a.next=f,a.e.next=f.e),i!==null&&(i.prev=f,i.e.prev=f.e),f}finally{V=r}}function te(t,e,a){for(var i=t.next?t.next.e.nodes_start:a,v=e?e.e.nodes_start:a,c=t.e.nodes_start;c!==i;){var o=De(c);v.before(c),c=o}}function C(t,e,a){e===null?t.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}function Ue(t,e,a,i){w&&re(),e===void 0||e(t,a)}function Xe(t){var a;var e=(a=t.$$slots)==null?void 0:a.default;return e===!0?t.children:e}const Ye={"/":"/","/contact":"/contact","/cv":"/cv","/portfolio":"/portfolio","/portfolio/[slug]":t=>`/portfolio/${t.slug}`,"/portfolio/[slug]/demo":t=>`/portfolio/${t.slug}/demo`},ze={},Be={},Ke={},j={...Ye,...Be,...ze,...Ke};[...new Set(Object.keys(j).map(t=>{var e;return((e=/^\/.*|[^ ]?\/.*$/.exec(t))==null?void 0:e[0])??t}))];function O(t,...e){if(j[t]instanceof Function){const a=j[t];return a(...e)}else return j[t]}const U=[{name:"Memory Game",slug:"fm-memory-game-challenge",shortDescription:"",demoLink:"https://jconan.github.io/fm-memory-game-challenge/",descriptionLink:"https://raw.githubusercontent.com/JConan/fm-memory-game-challenge/main/DESCRIPTION.md",source:"https://github.com/JConan/fm-memory-game-challenge/"},{name:"Tic Tac Toe",slug:"fm-tic-tac-toe",shortDescription:"Game Tic Tac Toe built with svelte",demoLink:"https://jconan.github.io/fm-tic-tac-toe/",descriptionLink:"https://raw.githubusercontent.com/JConan/fm-tic-tac-toe/main/DESCRIPTION.md",source:"https://github.com/JConan/fm-tic-tac-toe/"},{name:"Connect Four",slug:"fm-connect-four",shortDescription:"Connect Four is a two-player game where the goal is to align four discs in a row",demoLink:"https://jconan.github.io/fm-connect-four",descriptionLink:"https://raw.githubusercontent.com/JConan/fm-connect-four/main/DESCRIPTION.md",source:"https://github.com/JConan/fm-connect-four"}],W=fe(U[0]);ae.subscribe(t=>{var e,a;if((a=(e=t.route)==null?void 0:e.id)!=null&&a.startsWith("/portfolio/[slug]")){const i=U.filter(v=>v.slug===t.params.slug)[0];W.set(i)}});const Ze=async({url:{pathname:t}})=>(t===O("/portfolio")&&ve(O("/portfolio/[slug]",{slug:de(W).slug})),{projects:U,selectedProject:W}),vt=Object.freeze(Object.defineProperty({__proto__:null,load:Ze},Symbol.toStringTag,{value:"Module"}));var qe=le("<li><a> </a></li>"),Qe=le('<div class="columns"><div class="column is-one-fifth"><aside class="menu"><a href="https://www.frontendmentor.io" class="menu-label">Frontend Mentor</a> <ul class="menu-list"></ul></aside></div> <div class="column is-four-fifths"><div class="tabs svelte-1i8veou"><ul><li><a>description</a></li> <li><a>demo</a></li> <li class="svelte-1i8veou"><a target="_blank"><!>github</a></li></ul></div> <!></div></div>');function dt(t,e){Ne(e,!1);const a=$e(),i=()=>ee(r,"$selectedProjectStore",a),v=()=>ee(ae,"$page",a),c=q(),o=q();let h=Me(e,"data",8);const{projects:p,selectedProject:r}=h();Z(()=>i(),()=>{G(c,i())}),Z(()=>v(),()=>{G(o,v().url.pathname.endsWith("/demo"))}),Oe(),Le();var l=Qe(),s=y(l),u=y(s),m=N(y(u),2);Ve(m,5,()=>p,Fe,(M,X)=>{let ce=()=>T(X).name,Y=()=>T(X).slug;var $=qe(),P=y($);D(()=>R(P,"href",O("/portfolio/[slug]",{slug:Y()})));var ue=y(P);g(P),g($),D(()=>{H(P,T(c).slug===Y()?"is-selected":""),je(ue,ce())}),Q(M,$)}),g(m),g(u),g(s);var f=N(s,2),_=y(f),n=y(_),d=y(n),S=y(d);D(()=>R(S,"href",O("/portfolio/[slug]",{slug:T(c).slug}))),g(d);var b=N(d,2),E=y(b);D(()=>R(E,"href",O("/portfolio/[slug]/demo",{slug:T(c).slug}))),g(b);var x=N(b,2),I=y(x),k=y(I);Je(k,{icon:"mynaui:brand-github",height:"18"}),Re(),g(I),g(x),g(n),g(_);var L=N(_,2);Ue(L,Xe(e),{}),g(f),g(l),D(()=>{H(d,`${(T(o)?"":"is-active")??""} svelte-1i8veou`),H(b,`${(T(o)?"is-active":"")??""} svelte-1i8veou`),R(I,"href",T(c).source)}),Q(t,l),Pe()}export{dt as component,vt as universal};
