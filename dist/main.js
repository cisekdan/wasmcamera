!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const n=async e=>{const t=e.data.length/4;for(let a=0;a<t;a++){const t=4*a,n=(e.data[t]+e.data[t+1]+e.data[t+2])/3;e.data[t]=n,e.data[t+1]=n,e.data[t+2]=n}return e};n.toString=()=>"[JS] Greyscale";const r=async e=>{const{width:t,data:a}=e,n=4*t,r=a.length-4*t;for(let i=n;i<r;i+=4){let n=0,r=0,o=0;n=a[i]+a[i-4]+a[i+4]+a[i-4*t]+a[i-4*t-4]+a[i-4*t+4]+a[i+4*t-4]+a[i+4*t]+a[i+4*t+4],r=a[i+1]+a[i-3]+a[i+5]+a[i-4*t+1]+a[i-4*t-3]+a[i-4*t+5]+a[i+4*t-3]+a[i+4*t+1]+a[i+4*t+5],o=a[i+2]+a[i-2]+a[i+6]+a[i-4*t+2]+a[i-4*t-2]+a[i-4*t+6]+a[i+4*t-2]+a[i+4*t+2]+a[i+4*t+6],n/=9,r/=9,o/=9,e.data[i]=n,e.data[i+1]=r,e.data[i+2]=o}return e};r.toString=()=>"[JS] Mean filter";let i=null,o=new WebAssembly.Memory({initial:75});const c=async e=>{const{data:t}=e,a=new Uint32Array(o.buffer);a.set(t);const n={js:{memory:o}},{instance:r}=await(async(e,t)=>{if(i)return i;const a=await fetch(e),n=await a.arrayBuffer();return i=await WebAssembly.instantiate(n,t)})("./dist/greyscale.wasm",n);return r.exports.effect(0,t.length),new ImageData(new Uint8ClampedArray(a),e.width,e.height)};c.toString=()=>"[WAT] Greyscale";let s=null,l=new WebAssembly.Memory({initial:75});const d=async e=>{const{data:t}=e,a=new Uint32Array(l.buffer);a.set(t);const n={js:{memory:l}},{instance:r}=await(async(e,t)=>{if(s)return s;const a=await fetch(e),n=await a.arrayBuffer();return s=await WebAssembly.instantiate(n,t)})("./dist/meanFilter.wasm",n);return r.exports.effect(0,t.length,e.width),new ImageData(new Uint8ClampedArray(a),e.width,e.height)};d.toString=()=>"[WAT] Mean filter";const u={width:640,height:480},f=(e,t,a=t.toString())=>{const n=document.createElement("canvas");Object.entries(u).map(([e,t])=>n[e]=t);const r=document.createElement("div");r.className="display",r.appendChild(document.createTextNode(a)),r.appendChild(n);const i=document.createElement("time");r.appendChild(i),document.querySelector("#displays").appendChild(r),((e,t,a,n)=>{const r=t.getContext("2d"),i={timerCallback:()=>{i.process(),setTimeout(()=>i.timerCallback(),1e3/60)},process:async()=>{r.drawImage(e,0,0,640,480);const t=r.getImageData(0,0,e.width,e.height),i=performance.now(),o=await a(t),c=performance.now()-i;n(c),r.putImageData(o,0,0)}};i.timerCallback()})(e,n,t,e=>{i.textContent=`${1e3/e} FPS`})};window.onload=()=>{(async()=>{const e=document.querySelector("video");await(async e=>{if(!navigator.mediaDevices.getUserMedia)throw new Error("No camera available");e.srcObject=await navigator.mediaDevices.getUserMedia({video:!0})})(e),f(e,void 0)})()}}]);