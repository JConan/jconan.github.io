import{s as H,n as w,c as L,e as C}from"../chunks/scheduler.CKelR0j7.js";import{S as j,i as I,e as g,s as q,c as p,a as _,k as D,d as h,f as M,n as c,q as y,g as b,h as k,p as S}from"../chunks/index.Cq81iXBA.js";import{p as T}from"../chunks/stores.1kvBvMVW.js";function V(n){let r,e,f="<= back",l,i,t,d,u;return{c(){r=g("div"),e=g("button"),e.textContent=f,l=q(),i=g("div"),t=g("iframe"),this.h()},l(s){r=p(s,"DIV",{class:!0});var o=_(r);e=p(o,"BUTTON",{class:!0,"data-svelte-h":!0}),D(e)!=="svelte-gtnpel"&&(e.textContent=f),o.forEach(h),l=M(s),i=p(s,"DIV",{style:!0,class:!0});var m=_(i);t=p(m,"IFRAME",{title:!0,frameborder:!0,class:!0,height:!0}),_(t).forEach(h),m.forEach(h),this.h()},h(){c(e,"class","button is-info is-outlined"),c(r,"class","buttons is-right svelte-dw1wj4"),c(t,"title","tic-tac-toe"),c(t,"frameborder","0"),c(t,"class","container"),c(t,"height",n[1]),y(i,"opacity",n[2]?1:0),c(i,"class","svelte-dw1wj4")},m(s,o){b(s,r,o),k(r,e),b(s,l,o),b(s,i,o),k(i,t),n[5](t),d||(u=S(e,"click",n[4]),d=!0)},p(s,[o]){o&2&&c(t,"height",s[1]),o&4&&y(i,"opacity",s[2]?1:0)},i:w,o:w,d(s){s&&(h(r),h(l),h(i)),n[5](null),d=!1,u()}}}function A(n,r,e){var v;let f;L(n,T,a=>e(6,f=a));let{data:l}=r,i=(v=l.projects.filter(a=>a.slug===f.params.slug)[0])==null?void 0:v.demoLink,t,d=400,u=!1;function s(a){a.data.type==="getHeight"&&(e(1,d=a.data.height+10),e(2,u=!0))}function o(){var a;e(2,u=!0),(a=t.contentWindow)==null||a.postMessage("getHeight","*")}const m=()=>{history.back()};function E(a){C[a?"unshift":"push"](()=>{t=a,e(0,t),e(7,i)})}return n.$$set=a=>{"data"in a&&e(3,l=a.data)},n.$$.update=()=>{n.$$.dirty&1&&t&&(window.addEventListener("message",s),t.addEventListener("load",o),e(0,t.src=i,t),window.removeEventListener("message",s))},[t,d,u,l,m,E]}class O extends j{constructor(r){super(),I(this,r,A,V,H,{data:3})}}export{O as component};
