import"../chunks/disclose-version.Bg9kRutz.js";import{p,a as m,C as n,D as c,c as d,E as f,r as l}from"../chunks/utils.DEJZ0pd8.js";import{a as u,t as v}from"../chunks/store.DCzN0y5u.js";import{h}from"../chunks/html.njPgmEKw.js";import{i as b}from"../chunks/lifecycle.Bfd-4hc7.js";import{p as w}from"../chunks/props.De3aUAHp.js";import{o as g}from"../chunks/index-client.BT8qc0bH.js";import{m as k}from"../chunks/marked.esm.CupyhQa1.js";var x=v('<div class="content prose"><!></div>');function P(o,t){p(t,!1);let r=w(t,"data",8),e=c("");g(()=>r().selectedProject.subscribe(async i=>{n(e,await k.parse(await(await fetch(i.descriptionLink)).text()))})),b();var a=x(),s=d(a);h(s,()=>f(e),!1,!1),l(a),u(o,a),m()}export{P as component};
