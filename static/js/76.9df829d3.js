(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{"../core/dist/esm-es5/ac-toast-controller.entry.js":function(t,e,n){"use strict";n.r(e),n.d(e,"ac_toast_controller",(function(){return s}));var o=n("../core/dist/esm-es5/index-142de159.js"),r=(n("../core/dist/esm-es5/component-behavior-a1704b91.js"),n("../core/dist/esm-es5/controller-behavior-1ade6e5f.js")),i=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function c(t){try{a(o.next(t))}catch(e){i(e)}}function s(t){try{a(o.throw(t))}catch(e){i(e)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,s)}a((o=o.apply(t,e||[])).next())}))},c=function(t,e){var n,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(r=(r=c.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(s){i=[6,s],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},s=function(){function t(t){Object(o.k)(this,t),this.controllerBehavior=new r.a(this),this.target="ac-toast",this.toastList=[]}return t.prototype.create=function(t){return i(this,void 0,void 0,(function(){var e,n;return c(this,(function(o){switch(o.label){case 0:return(e=document.createElement("ac-overlay")).noLayer=!0,e.position="flex-end flex-end",t.wrapper=e,[4,this.controllerBehavior.create(t)];case 1:return(n=o.sent()).addEventListener("close",(function(){e.remove()})),this.toastList.push(n),setTimeout((function(){e.remove()}),t.time||3e3),[2,n]}}))}))},t.prototype.dismiss=function(t){return i(this,void 0,void 0,(function(){return c(this,(function(e){return[2,this.toastList.pop().dismiss(t)]}))}))},t.prototype.componentDidUnload=function(){},Object.defineProperty(t.prototype,"host",{get:function(){return Object(o.h)(this)},enumerable:!1,configurable:!0}),t}()},"../core/dist/esm-es5/component-behavior-a1704b91.js":function(t,e,n){"use strict";function o(t,e,n){var o=t[e];t["__"+e+"__patch_list"]=t["__"+e+"__patches"]||[];var r=t["__"+e+"__patch_list"];r.push(n),t[e]=function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];for(var i=0,c=r;i<c.length;i++){var s=c[i];t=s.bind(this)(o?o.bind(this):null,e)}return t}}n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));var r=function(t){var e=this;this.component=t,this.beforeAttach&&this.beforeAttach(),this.component.native&&(console.warn("Attaching a behavior to a native element",this.component),this.component.host.remove=function(){e.component.componentDidUnload(),Element.prototype.remove.apply(e.component.host)},setTimeout((function(){return e.component.componentDidLoad()}),0)),o(this.component,"componentDidLoad",(function(t){t&&t(),e.attach&&e.attach()})),o(this.component,"componentDidUnload",(function(t){t&&t(),e.detach&&e.detach()}))}},"../core/dist/esm-es5/controller-behavior-1ade6e5f.js":function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var o,r=n("../core/dist/esm-es5/component-behavior-a1704b91.js"),i=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),c=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function c(t){try{a(o.next(t))}catch(e){i(e)}}function s(t){try{a(o.throw(t))}catch(e){i(e)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,s)}a((o=o.apply(t,e||[])).next())}))},s=function(t,e){var n,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(r=(r=c.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(s){i=[6,s],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},a=function(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(t);r<o.length;r++)e.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(t,o[r])&&(n[o[r]]=t[o[r]])}return n},u=new(function(){function t(){}return t.prototype.createComponent=function(t,e){var n=e.component,o=e.componentProps,r=a(e,["component","componentProps"]),i=document.createElement(t);return r&&Object.keys(r).forEach((function(t){"string"===typeof r[t]?i.setAttribute(t,r[t]):i[t]=r[t]})),n&&("string"===typeof n?i.innerHTML=n:(o&&Object.assign(n,o),i.appendChild(n))),i},t.prototype.attachViewToDom=function(t,e){return c(this,void 0,void 0,(function(){return s(this,(function(n){switch(n.label){case 0:return t.appendChild(e),[4,e.componentOnReady()];case 1:return n.sent(),[2]}}))}))},t.prototype.detachViewFromDom=function(t,e){return t.remove()},t}()),l=function(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(t);r<o.length;r++)e.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(t,o[r])&&(n[o[r]]=t[o[r]])}return n},p=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.attach=function(){this.root=document.querySelector(this.component.bound)||this.component.host.parentElement},e.prototype.detach=function(){return this.component.dismissAll?this.component.dismissAll():null},e.prototype.create=function(t,e){return c(this,void 0,void 0,(function(){var n,o,r,i,a,p=this;return s(this,(function(f){switch(f.label){case 0:return n=t.wrapper,o=t.render,r=l(t,["wrapper","render"]),i=e||u,o?[2,new Promise((function(t){n.vchildren=o({ref:t,Tag:p.component.target}),p.root.appendChild(n)}))]:[3,1];case 1:return[4,i.createComponent(this.component.target,r)];case 2:return(a=f.sent()).controller=this.component,a._resolveDismiss=null,a._resolveWillDismiss=null,a.onDidDismiss=function(){return new Promise((function(t){return a._resolveDismiss=t}))},a.onWillDismiss=function(){return new Promise((function(t){return a._resolveWillDismiss=t}))},a.dismiss=function(t){return c(p,void 0,void 0,(function(){var e;return s(this,(function(o){switch(o.label){case 0:return e=!0,this.component.willDismissComponent?[4,this.component.willDismissComponent(a,t)]:[3,2];case 1:e=o.sent(),o.label=2;case 2:return e?a._resolveWillDismiss?[4,a._resolveWillDismiss(t)]:[3,4]:[3,10];case 3:o.sent(),o.label=4;case 4:return n?[4,i.detachViewFromDom(n,r)]:[3,6];case 5:return o.sent(),[3,8];case 6:return[4,i.detachViewFromDom(a,r)];case 7:o.sent(),o.label=8;case 8:return a._resolveDismiss?[4,a._resolveDismiss(t)]:[3,10];case 9:o.sent(),o.label=10;case 10:return[2]}}))}))},n?(n.appendChild(a),[4,i.attachViewToDom(this.root,n)]):[3,4];case 3:return f.sent(),[3,6];case 4:return[4,i.attachViewToDom(this.root,a)];case 5:f.sent(),f.label=6;case 6:return[2,a]}}))}))},e}(r.a)}}]);
//# sourceMappingURL=76.7604d932f38d69a73cd7.js.map