import{s as c,n as r,o as l}from"../chunks/scheduler.C0O8tqc2.js";import{S as m,i as d,e as f,H as h,c as u,a as p,q as _,d as o,r as g,g as v}from"../chunks/index.BMWywO3N.js";import{m as w}from"../chunks/marked.esm.B7pka19H.js";function x(n){let t,s;return{c(){t=f("div"),s=new h(!1),this.h()},l(a){t=u(a,"DIV",{class:!0});var e=p(t);s=_(e,!1),e.forEach(o),this.h()},h(){s.a=null,g(t,"class","content")},m(a,e){v(a,t,e),s.m(n[0],t)},p(a,[e]){e&1&&s.p(a[0])},i:r,o:r,d(a){a&&o(t)}}}function y(n,t,s){let{data:a}=t,e="";return l(()=>a.selectedProject.subscribe(async i=>{s(0,e=await w.parse(await(await fetch(i.descriptionLink)).text()))})),n.$$set=i=>{"data"in i&&s(1,a=i.data)},[e,a]}class q extends m{constructor(t){super(),d(this,t,y,x,c,{data:1})}}export{q as component};
