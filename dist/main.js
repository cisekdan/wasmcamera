!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const n=async e=>{const t=e.data.length/4;for(let a=0;a<t;a++){const t=4*a,n=(e.data[t]+e.data[t+1]+e.data[t+2])/3;e.data[t]=n,e.data[t+1]=n,e.data[t+2]=n}return e};n.toString=()=>"[JS] Greyscale";var r=n;const i=async e=>{const{width:t,data:a}=e,n=4*t,r=a.length-4*t;for(let i=n;i<r;i+=4){let n=0,r=0,o=0;n=a[i]+a[i-4]+a[i+4]+a[i-4*t]+a[i-4*t-4]+a[i-4*t+4]+a[i+4*t-4]+a[i+4*t]+a[i+4*t+4],r=a[i+1]+a[i-3]+a[i+5]+a[i-4*t+1]+a[i-4*t-3]+a[i-4*t+5]+a[i+4*t-3]+a[i+4*t+1]+a[i+4*t+5],o=a[i+2]+a[i-2]+a[i+6]+a[i-4*t+2]+a[i-4*t-2]+a[i-4*t+6]+a[i+4*t-2]+a[i+4*t+2]+a[i+4*t+6],n/=9,r/=9,o/=9,e.data[i]=n,e.data[i+1]=r,e.data[i+2]=o}return e};i.toString=()=>"[JS] Mean filter";var o=i;const s=async e=>{const{data:t}=e,a=new Uint32Array(t);a.set(t);for(let e=0;e<a.length;e+=4){let t=a[e],n=a[e+1],r=a[e+2];t=Math.min(255,t+40),n=Math.min(255,n+20),a[e]=t,a[e+1]=n,a[e+2]=r}return new ImageData(new Uint8ClampedArray(a),e.width,e.height)};s.toString=()=>"[JS] Sepia";var c={greyscale:r,meanFilter:o,sepia:s};const l={};var d=async(e,t)=>{if(e in l)return l[e];const a=await fetch(e),n=await a.arrayBuffer();return l[e]=await WebAssembly.instantiate(n,t),l[e]};let m=new WebAssembly.Memory({initial:75});const u=async e=>{const{data:t}=e,a=((e,t=null)=>{const a=new Uint32Array(t||e.length);return a.set(e),a})(t,m.buffer),n={js:{memory:m}},{instance:r}=await d("./dist/greyscale.wasm",n);return r.exports.effect(0,t.length),((e,{width:t,height:a})=>new ImageData(new Uint8ClampedArray(e),t,a))(a,e)};u.toString=()=>"[WAT] Greyscale";var y=u;let f=new WebAssembly.Memory({initial:75});const g=async e=>{const{data:t}=e,a=new Uint32Array(f.buffer);a.set(t);const n={js:{memory:f}},{instance:r}=await d("./dist/meanFilter.wasm",n);return r.exports.effect(0,t.length,e.width),new ImageData(new Uint8ClampedArray(a),e.width,e.height)};g.toString=()=>"[WAT] Mean filter";var p=g;let w=new WebAssembly.Memory({initial:75});const h=async e=>{const{data:t}=e,a=new Uint32Array(w.buffer);a.set(t);const n={js:{memory:w}},{instance:r}=await d("./dist/sepia.wasm",n);return r.exports.effect(0,t.length,20),new ImageData(new Uint8ClampedArray(a),e.width,e.height)};h.toString=()=>"[WAT] Sepia";const b={width:640,height:480},v=(e,t,a=t.toString())=>{let n=0,r=0;const i=document.createElement("canvas");Object.entries(b).map(([e,t])=>i[e]=t);const o=document.createElement("div");o.className="display",o.appendChild(document.createTextNode(a)),o.appendChild(i);const s=document.createElement("time");o.appendChild(s),document.querySelector("#displays").appendChild(o),((e,t,a,n)=>{const r=t.getContext("2d"),i={timerCallback:()=>{i.process(),setTimeout(()=>i.timerCallback(),1e3/60)},process:async()=>{r.drawImage(e,0,0,640,480);const t=r.getImageData(0,0,e.width,e.height),i=performance.now(),o=await a(t),s=performance.now()-i;n(s),r.putImageData(o,0,0)}};i.timerCallback()})(e,i,t,e=>{n+=e,r++,s.textContent=`x̄  = ${Math.round(n/r)} ms`})},S={greyscale:[c.greyscale,{greyscale:y,meanFilter:p,sepia:h}.greyscale]};window.onload=()=>{(async()=>{const e=(e=>new URL(document.location).searchParams.get("filter")||e)("greyscale"),t=document.querySelector("video");await(async e=>{if(!navigator.mediaDevices.getUserMedia)throw new Error("No camera available");e.srcObject=await navigator.mediaDevices.getUserMedia({video:!0})})(t),S[e].forEach(e=>v(t,e))})()}}]);