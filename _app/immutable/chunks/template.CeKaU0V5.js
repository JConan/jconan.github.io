import{b as d,g as _,y as m,ao as p,ap as h,h as u,m as f,S as g,k as T,l as E}from"./runtime.CB-r9ogf.js";function v(e){var r=document.createElement("template");return r.innerHTML=e,r.content}function o(e,r){var t=m;t.nodes_start===null&&(t.nodes_start=e,t.nodes_end=r)}function y(e,r){var t=(r&p)!==0,i=(r&h)!==0,a,n=!e.startsWith("<!>");return()=>{if(u)return o(f,null),f;a===void 0&&(a=v(n?e:"<!>"+e),t||(a=_(a)));var s=i?document.importNode(a,!0):a.cloneNode(!0);if(t){var c=_(s),l=s.lastChild;o(c,l)}else o(s,s);return s}}function N(e,r){var t=!0,i=y(e,r);return()=>{if(u)return i();var a=i();return t&&(t=!1,C(a)),a}}function b(e,r,t="svg"){var i=!e.startsWith("<!>"),a=`<${t}>${i?e:"<!>"+e}</${t}>`,n;return()=>{if(u)return o(f,null),f;if(!n){var s=v(a),c=_(s);n=_(c)}var l=n.cloneNode(!0);return o(l,l),l}}function C(e){if(u)return;const r=e.nodeType===11,t=e.tagName==="SCRIPT"?[e]:e.querySelectorAll("script"),i=m;for(const n of t){const s=document.createElement("script");for(var a of n.attributes)s.setAttribute(a.name,a.value);s.textContent=n.textContent;const c=()=>{(r?e.firstChild===n:e===n)&&(i.nodes_start=s),(r?e.lastChild===n:e===n)&&(i.nodes_end=s),n.replaceWith(s)};n===e?g(c):c()}}function A(e=""){if(!u){var r=d(e+"");return o(r,r),r}var t=f;return t.nodeType!==3&&(t.before(t=d()),T(t)),o(t,t),t}function M(){if(u)return o(f,null),f;var e=document.createDocumentFragment(),r=document.createComment(""),t=d();return e.append(r,t),o(r,t),e}function P(e,r){if(u){m.nodes_end=f,E();return}e!==null&&e.before(r)}export{P as a,o as b,v as c,M as d,A as e,N as f,b as n,y as t};
