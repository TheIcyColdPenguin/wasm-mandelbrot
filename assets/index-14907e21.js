(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();let s;const f=new Array(32).fill(void 0);f.push(void 0,null,!0,!1);function w(t){return f[t]}let d=f.length;function R(t){t<36||(f[t]=d,d=t)}function W(t){const e=w(t);return R(t),e}const M=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});M.decode();let _=new Uint8Array;function p(){return _.byteLength===0&&(_=new Uint8Array(s.memory.buffer)),_}function I(t,e){return M.decode(p().subarray(t,t+e))}let y=32;function j(t){if(y==1)throw new Error("out of js stack");return f[--y]=t,y}let g=new Int32Array;function m(){return g.byteLength===0&&(g=new Int32Array(s.memory.buffer)),g}function S(){s.initialise()}function x(t,e){const n=s.create_app_state(t,e);return A.__wrap(n)}let h=new Uint8ClampedArray;function T(){return h.byteLength===0&&(h=new Uint8ClampedArray(s.memory.buffer)),h}function N(t,e){return T().subarray(t/1,t/1+e)}function L(t){d===f.length&&f.push(f.length+1);const e=d;return d=f[e],f[e]=t,e}function O(t,e){try{return t.apply(this,e)}catch(n){s.__wbindgen_exn_store(L(n))}}let k=0;const b=new TextEncoder("utf-8"),z=typeof b.encodeInto=="function"?function(t,e){return b.encodeInto(t,e)}:function(t,e){const n=b.encode(t);return e.set(n),{read:t.length,written:n.length}};function F(t,e,n){if(n===void 0){const c=b.encode(t),u=e(c.length);return p().subarray(u,u+c.length).set(c),k=c.length,u}let r=t.length,o=e(r);const a=p();let i=0;for(;i<r;i++){const c=t.charCodeAt(i);if(c>127)break;a[o+i]=c}if(i!==r){i!==0&&(t=t.slice(i)),o=n(o,r,r=i+t.length*3);const c=p().subarray(o+i,o+r),u=z(t,c);i+=u.written}return k=i,o}class A{static __wrap(e){const n=Object.create(A.prototype);return n.ptr=e,n}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();s.__wbg_appstate_free(e)}static new(e,n){const r=s.appstate_new(e,n);return A.__wrap(r)}set_scale(e){s.appstate_set_scale(this.ptr,e)}inc_pow(e){s.appstate_inc_pow(this.ptr,e)}toggle_fast(){s.appstate_toggle_fast(this.ptr)}draw(e){try{const o=s.__wbindgen_add_to_stack_pointer(-16);s.appstate_draw(o,this.ptr,j(e));var n=m()[o/4+0],r=m()[o/4+1];if(r)throw W(n)}finally{s.__wbindgen_add_to_stack_pointer(16),f[y++]=void 0}}zoom(e){s.appstate_zoom(this.ptr,e)}pan(e,n,r,o){s.appstate_pan(this.ptr,e,n,r,o)}}async function q(t,e){if(typeof Response=="function"&&t instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,e)}catch(r){if(t.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}else{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}function D(){const t={};return t.wbg={},t.wbg.__wbindgen_object_drop_ref=function(e){W(e)},t.wbg.__wbg_newwithu8clampedarrayandsh_f7ef3a8f3fd04c8a=function(){return O(function(e,n,r,o){const a=new ImageData(N(e,n),r>>>0,o>>>0);return L(a)},arguments)},t.wbg.__wbg_putImageData_23e0cc41d4fabcde=function(){return O(function(e,n,r,o){w(e).putImageData(w(n),r,o)},arguments)},t.wbg.__wbg_new_abda76e883ba8a5f=function(){const e=new Error;return L(e)},t.wbg.__wbg_stack_658279fe44541cf6=function(e,n){const r=w(n).stack,o=F(r,s.__wbindgen_malloc,s.__wbindgen_realloc),a=k;m()[e/4+1]=a,m()[e/4+0]=o},t.wbg.__wbg_error_f851667af71bcfc6=function(e,n){try{console.error(I(e,n))}finally{s.__wbindgen_free(e,n)}},t.wbg.__wbindgen_throw=function(e,n){throw new Error(I(e,n))},t}function H(t,e){return s=t.exports,C.__wbindgen_wasm_module=e,g=new Int32Array,_=new Uint8Array,h=new Uint8ClampedArray,s}async function C(t){typeof t>"u"&&(t="/assets/innards_bg.wasm");const e=D();(typeof t=="string"||typeof Request=="function"&&t instanceof Request||typeof URL=="function"&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:r}=await q(await t,e);return H(n,r)}C().then(B);let E=!1,l={x:0,y:0},U=1,v=0;window.addEventListener("mousedown",()=>{E=!0});window.addEventListener("mouseup",()=>{E=!1});function B(){function t(i){r.set_scale(2),i(),v&&clearTimeout(v),v=setTimeout(()=>r.set_scale(U),500)}S();const e=document.querySelector("canvas"),n=e.getContext("2d");e.width=window.innerWidth,e.height=window.innerHeight;let r=x(e.width,e.height);window.addEventListener("resize",o),a();function o(){e.width=window.innerWidth,e.height=window.innerHeight,r.free(),r=x(e.width,e.height)}window.addEventListener("keypress",i=>{if(i.key===" "){r.toggle_fast();return}if(i.key=="="||i.key=="+"){r.inc_pow(.1);return}(i.key=="-"||i.key=="_")&&r.inc_pow(-.1);const c=Number(i.key);isNaN(c)||c===0||(U=c,r.set_scale(c))}),e.addEventListener("mousemove",i=>{E&&t(()=>r.pan(l.x,l.y,i.x,i.y)),l.x=i.x,l.y=i.y}),e.addEventListener("wheel",i=>{t(()=>r.zoom(i.deltaY))});function a(){r.draw(n),requestAnimationFrame(a)}}
