(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{"../core/dist/esm-es5/ac-overlay.entry.js":function(t,e,n){"use strict";n.r(e),n.d(e,"ac_overlay",(function(){return u}));var o=n("../core/dist/esm-es5/index-182a4039.js"),r=n("../core/dist/esm-es5/bind-43838568.js"),i=(n("../core/dist/esm-es5/component-behavior-a1704b91.js"),n("../core/dist/esm-es5/animation-2e084e7f.js"),n("../core/dist/esm-es5/transition-behavior-96cd0909.js")),a=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function a(t){try{c(o.next(t))}catch(e){i(e)}}function s(t){try{c(o.throw(t))}catch(e){i(e)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}c((o=o.apply(t,e||[])).next())}))},s=function(t,e){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(s){i=[6,s],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},c=function(t,e,n,o){var r,i=arguments.length,a=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(i<3?r(a):i>3?r(e,n,a):r(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a},u=function(){function t(t){Object(o.g)(this,t),this.transitionBehavior=new i.a(this),this.backdrop="dark",this.position="center center"}return t.prototype.componentWillLoad=function(){},t.prototype.componentDidUnload=function(){},t.prototype.handleClose=function(t){this.dismiss(t.detail)},t.prototype.present=function(){return a(this,void 0,void 0,(function(){return s(this,(function(t){switch(t.label){case 0:return this.component?[4,this.delegate.attachViewToDom(this.host,this.component,this.componentProps)]:[3,2];case 1:t.sent(),t.label=2;case 2:return this.resolveDidPresent(),this.presented=!0,[2]}}))}))},t.prototype.dismiss=function(t){return a(this,void 0,void 0,(function(){return s(this,(function(e){switch(e.label){case 0:return this.component?[4,this.delegate.removeViewFromDom(this.host,this.component)]:[3,2];case 1:e.sent(),e.label=2;case 2:return this.resolveDidDismiss(t),this.presented=!1,[2]}}))}))},t.prototype.render=function(){var t,e=this.position.split(" "),n=this.innerComponent;return Object(o.f)(o.a,{class:(t={},t["ac-overlay--backdrop-"+this.backdrop]=!!this.backdrop,t["ac-overlay--hidden"]=!this.presented,t),style:{justifyContent:e[0],alignItems:e[1]}},Object(o.f)("div",{class:"ac-overlay--layer"}),this.innerComponent?Object(o.f)(n,Object.assign({},this.innerComponentProps,{onClose:this.handleClose}),this.vchildren||Object(o.f)("slot",null)):this.vchildren||Object(o.f)("slot",null))},Object.defineProperty(t.prototype,"host",{get:function(){return Object(o.e)(this)},enumerable:!0,configurable:!0}),t}();c([r.a],u.prototype,"handleClose",null),u.style="ac-overlay{display:-ms-flexbox;display:flex;position:fixed;z-index:7;top:0;left:0;width:100%;height:100%}ac-overlay .ac-overlay--layer{position:absolute;top:0;left:0;width:100%;height:100%}ac-overlay.ac-overlay--backdrop-dark .ac-overlay--layer{-webkit-transition:opacity ease-in-out 0.1s;transition:opacity ease-in-out 0.1s;background-color:rgba(0, 0, 0, 0.5)}ac-overlay.ac-overlay--backdrop-dark.transition--before-enter .ac-overlay--layer{opacity:0}ac-overlay.ac-overlay--backdrop-dark.transition--before-leave .ac-overlay--layer{opacity:0}ac-overlay.ac-overlay--no-layer{pointer-events:none}ac-overlay.ac-overlay--no-layer>*{pointer-events:auto}ac-overlay.ac-overlay--hidden{display:none;opacity:0}"},"../core/dist/esm-es5/animation-2e084e7f.js":function(t,e,n){"use strict";function o(t){var e=window.getComputedStyle(t).transition.match(/\.?\d[ms]/g);if(!e)return new Promise((function(e){return e({element:t,duration:0})}));var n=0;return e.forEach((function(t){var e=function(t){var e=t.startsWith(".")?"0"+t:t;return e.endsWith("ms")?parseInt(e):1e3*parseFloat(e)}(t);n=n<e?e:n})),new Promise((function(e){return e({element:t,duration:n})}))}function r(t){return function(e){var n=e.element,o=e.duration;return Object.assign(n.style,t),new Promise((function(t){return t({element:n,duration:o})}))}}function i(t){return void 0===t&&(t=0),function(e){var n=e.element,o=e.duration;return new Promise((function(e){return setTimeout((function(){return e({element:n,duration:o})}),o+t)}))}}n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i}))},"../core/dist/esm-es5/bind-43838568.js":function(t,e,n){"use strict";function o(t,e,n){return{get:function(){var t=n.value.bind(this);return Object.defineProperty(this,e,{value:t}),t}}}n.d(e,"a",(function(){return o}))},"../core/dist/esm-es5/component-behavior-a1704b91.js":function(t,e,n){"use strict";function o(t,e,n){var o=t[e];t["__"+e+"__patch_list"]=t["__"+e+"__patches"]||[];var r=t["__"+e+"__patch_list"];r.push(n),t[e]=function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];for(var i=0,a=r;i<a.length;i++){var s=a[i];t=s.bind(this)(o?o.bind(this):null,e)}return t}}n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));var r=function(t){var e=this;this.component=t,this.beforeAttach&&this.beforeAttach(),this.component.native&&(console.warn("Attaching a behavior to a native element",this.component),this.component.host.remove=function(){e.component.componentDidUnload(),Element.prototype.remove.apply(e.component.host)},setTimeout((function(){return e.component.componentDidLoad()}),0)),o(this.component,"componentDidLoad",(function(t){t&&t(),e.attach&&e.attach()})),o(this.component,"componentDidUnload",(function(t){t&&t(),e.detach&&e.detach()}))}},"../core/dist/esm-es5/transition-behavior-96cd0909.js":function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var o,r=n("../core/dist/esm-es5/component-behavior-a1704b91.js"),i=n("../core/dist/esm-es5/animation-2e084e7f.js"),a=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function a(t){try{c(o.next(t))}catch(e){i(e)}}function s(t){try{c(o.throw(t))}catch(e){i(e)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}c((o=o.apply(t,e||[])).next())}))},c=function(t,e){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(s){i=[6,s],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},u=function(t){function e(){var e=t.apply(this,arguments)||this;return e.removeIsQueued=!1,e}return a(e,t),e.prototype.beforeAttach=function(){var t=this;Object(r.b)(this.component,"componentWillLoad",(function(e){return s(t,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return this.component.host.classList.add("transition--before-enter"),[4,Object(i.a)(this.component.host).then(Object(i.c)())];case 1:return t.sent(),e?[2,e()]:[2]}}))}))}))},e.prototype.attach=function(){return s(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return this.component.componentWillEnter?[4,this.component.componentWillEnter()]:[3,2];case 1:t.sent(),t.label=2;case 2:return this.component.host.classList.replace("transition--before-enter","transition--after-enter"),this.component.host.remove=this.customRemoveFn.bind(this),[2]}}))}))},e.prototype.detach=function(){},e.prototype.customRemoveFn=function(){return s(this,void 0,void 0,(function(){var t;return c(this,(function(e){switch(e.label){case 0:return this.removeIsQueued?[3,5]:(this.removeIsQueued=!0,t=this.component.host.getElementsByClassName("transition--after-enter"),[4,Promise.all(Array.from(t).map((function(t){return t.remove()})))]);case 1:return e.sent(),this.component.host.classList.add("transition--before-leave"),this.component.componentWillLeave?[4,this.component.componentWillLeave()]:[3,3];case 2:e.sent(),e.label=3;case 3:return[4,Object(i.a)(this.component.host).then(Object(i.c)())];case 4:e.sent(),Element.prototype.remove.apply(this.component.host),e.label=5;case 5:return[2]}}))}))},e}(r.a)}}]);
//# sourceMappingURL=45.16968a3a51ae40b9be32.js.map