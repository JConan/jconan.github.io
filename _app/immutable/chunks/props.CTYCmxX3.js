import{T as p,a7 as K,a8 as M,a9 as _,aa as U,C as w,ab as v,ac as D,E as c,y as j,ad as Y,a4 as C,a2 as Z,ae as $,af as z,a1 as L,ag as G,J,ah as N,ai as V,aj as q,ak as F,al as H,am as Q,an as W,O as X}from"./runtime.CB-r9ogf.js";function S(e,a=null,o){if(typeof e!="object"||e===null||p in e)return e;const y=C(e);if(y!==K&&y!==M)return e;var s=new Map,P=Z(e),g=_(0);P&&s.set("length",_(e.length));var I;return new Proxy(e,{defineProperty(i,r,n){(!("value"in n)||n.configurable===!1||n.enumerable===!1||n.writable===!1)&&U();var t=s.get(r);return t===void 0?(t=_(n.value),s.set(r,t)):w(t,S(n.value,I)),!0},deleteProperty(i,r){var n=s.get(r);return n===void 0?r in i&&s.set(r,_(v)):(w(n,v),T(g)),!0},get(i,r,n){var l;if(r===p)return e;var t=s.get(r),u=r in i;if(t===void 0&&(!u||(l=D(i,r))!=null&&l.writable)&&(t=_(S(u?i[r]:v,I)),s.set(r,t)),t!==void 0){var f=c(t);return f===v?void 0:f}return Reflect.get(i,r,n)},getOwnPropertyDescriptor(i,r){var n=Reflect.getOwnPropertyDescriptor(i,r);if(n&&"value"in n){var t=s.get(r);t&&(n.value=c(t))}else if(n===void 0){var u=s.get(r),f=u==null?void 0:u.v;if(u!==void 0&&f!==v)return{enumerable:!0,configurable:!0,value:f,writable:!0}}return n},has(i,r){var f;if(r===p)return!0;var n=s.get(r),t=n!==void 0&&n.v!==v||Reflect.has(i,r);if(n!==void 0||j!==null&&(!t||(f=D(i,r))!=null&&f.writable)){n===void 0&&(n=_(t?S(i[r],I):v),s.set(r,n));var u=c(n);if(u===v)return!1}return t},set(i,r,n,t){var b;var u=s.get(r),f=r in i;if(P&&r==="length")for(var l=n;l<u.v;l+=1){var h=s.get(l+"");h!==void 0?w(h,v):l in i&&(h=_(v),s.set(l+"",h))}u===void 0?(!f||(b=D(i,r))!=null&&b.writable)&&(u=_(void 0),w(u,S(n,I)),s.set(r,u)):(f=u.v!==v,w(u,S(n,I)));var x=Reflect.getOwnPropertyDescriptor(i,r);if(x!=null&&x.set&&x.set.call(t,n),!f){if(P&&typeof r=="string"){var R=s.get("length"),m=Number(r);Number.isInteger(m)&&m>=R.v&&w(R,m+1)}T(g)}return!0},ownKeys(i){c(g);var r=Reflect.ownKeys(i).filter(u=>{var f=s.get(u);return f===void 0||f.v!==v});for(var[n,t]of s)t.v!==v&&!(n in i)&&r.push(n);return r},setPrototypeOf(){Y()}})}function T(e,a=1){w(e,e.v+a)}const k={get(e,a){if(!e.exclude.includes(a))return c(e.version),a in e.special?e.special[a]():e.props[a]},set(e,a,o){return a in e.special||(e.special[a]=ee({get[a](){return e.props[a]}},a,q)),e.special[a](o),L(e.version),!0},getOwnPropertyDescriptor(e,a){if(!e.exclude.includes(a)&&a in e.props)return{enumerable:!0,configurable:!0,value:e.props[a]}},deleteProperty(e,a){return e.exclude.includes(a)||(e.exclude.push(a),L(e.version)),!0},has(e,a){return e.exclude.includes(a)?!1:a in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(a=>!e.exclude.includes(a))}};function ne(e,a){return new Proxy({props:e,exclude:a,special:{},version:_(0)},k)}function ee(e,a,o,y){var A;var s=(o&H)!==0,P=(o&G)!==0,g=(o&Q)!==0,I=(o&W)!==0,i=e[a],r=(A=D(e,a))==null?void 0:A.set,n=y,t=!0,u=!1,f=()=>(u=!0,t&&(t=!1,I?n=J(y):n=y),n);i===void 0&&y!==void 0&&(r&&P&&$(),i=f(),r&&r(i));var l;if(P)l=()=>{var d=e[a];return d===void 0?f():(t=!0,u=!1,d)};else{var h=(s?N:V)(()=>e[a]);h.f|=z,l=()=>{var d=c(h);return d!==void 0&&(n=void 0),d===void 0?n:d}}if(!(o&q))return l;if(r){var x=e.$$legacy;return function(d,O){return arguments.length>0?((!P||!O||x)&&r(O?l():d),d):l()}}var R=!1,m=X(i),b=N(()=>{var d=l(),O=c(m);return R?(R=!1,O):m.v=d});return s||(b.equals=F),function(d,O){var B=c(b);if(arguments.length>0){const E=O?c(b):P&&g?S(d):d;return b.equals(E)||(R=!0,w(m,E),u&&n!==void 0&&(n=E),c(b)),d}return B}}export{S as a,ne as l,ee as p};