(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{"../core/dist/esm-es5/ac-overlay.entry.js":function(t,e,n){"use strict";n.r(e),n.d(e,"ac_overlay",(function(){return l}));var o=n("../core/dist/esm-es5/index-9253740e.js"),r=(n("../core/dist/esm-es5/component-behavior-a1704b91.js"),n("../core/dist/esm-es5/bind-43838568.js")),i=(n("../core/dist/esm-es5/animation-2e084e7f.js"),n("../core/dist/esm-es5/transition-behavior-96cd0909.js")),c=n("../core/dist/esm-es5/portal-behavior-2601058d.js"),a=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function c(t){try{s(o.next(t))}catch(e){i(e)}}function a(t){try{s(o.throw(t))}catch(e){i(e)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,a)}s((o=o.apply(t,e||[])).next())}))},s=function(t,e){var n,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(r=(r=c.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(a){i=[6,a],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},u=function(t,e,n,o){var r,i=arguments.length,c=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(c=(i<3?r(c):i>3?r(e,n,c):r(e,n))||c);return i>3&&c&&Object.defineProperty(e,n,c),c},l=function(){function t(t){Object(o.g)(this,t),this.portalBehavior=new c.a(this),this.transitionBehavior=new i.a(this),this.backdrop="dark",this.position="center center",this.backDropClick=Object(o.d)(this,"backDropClick",7)}return t.prototype.componentWillLoad=function(){},t.prototype.componentDidUnload=function(){},t.prototype.handleBackDropClick=function(){return a(this,void 0,void 0,(function(){return s(this,(function(t){return this.backDropClick.emit(),[2]}))}))},t.prototype.render=function(){var t;return Object(o.f)(o.a,{class:(t={},t["ac-overlay--backdrop-"+this.backdrop]=!!this.backdrop,t["ac-overlay--no-layer"]=this.noLayer,t),style:{justifyContent:this.position.split(" ")[0],alignItems:this.position.split(" ")[1]}},!this.noLayer&&Object(o.f)("div",{class:"ac-overlay--layer",onClick:this.handleBackDropClick}),Object(o.f)("slot",null))},Object.defineProperty(t.prototype,"host",{get:function(){return Object(o.e)(this)},enumerable:!0,configurable:!0}),t}();u([r.a],l.prototype,"handleBackDropClick",null),l.style="ac-overlay{display:-ms-flexbox;display:flex;position:fixed;z-index:7;top:0;left:0;width:100%;height:100%}ac-overlay .ac-overlay--layer{position:absolute;top:0;left:0;width:100%;height:100%}ac-overlay.ac-overlay--backdrop-dark .ac-overlay--layer{-webkit-transition:opacity ease-in-out 0.1s;transition:opacity ease-in-out 0.1s;background-color:rgba(0, 0, 0, 0.5)}ac-overlay.ac-overlay--backdrop-dark.transition--before-enter .ac-overlay--layer{opacity:0}ac-overlay.ac-overlay--backdrop-dark.transition--before-leave .ac-overlay--layer{opacity:0}ac-overlay.ac-overlay--no-layer{pointer-events:none}ac-overlay.ac-overlay--no-layer>*{pointer-events:auto}"},"../core/dist/esm-es5/animation-2e084e7f.js":function(t,e,n){"use strict";function o(t){var e=window.getComputedStyle(t).transition.match(/\.?\d[ms]/g);if(!e)return new Promise((function(e){return e({element:t,duration:0})}));var n=0;return e.forEach((function(t){var e=function(t){var e=t.startsWith(".")?"0"+t:t;return e.endsWith("ms")?parseInt(e):1e3*parseFloat(e)}(t);n=n<e?e:n})),new Promise((function(e){return e({element:t,duration:n})}))}function r(t){return function(e){var n=e.element,o=e.duration;return Object.assign(n.style,t),new Promise((function(t){return t({element:n,duration:o})}))}}function i(t){return void 0===t&&(t=0),function(e){var n=e.element,o=e.duration;return new Promise((function(e){return setTimeout((function(){return e({element:n,duration:o})}),o+t)}))}}n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i}))},"../core/dist/esm-es5/bind-43838568.js":function(t,e,n){"use strict";function o(t,e,n){return{get:function(){var t=n.value.bind(this);return Object.defineProperty(this,e,{value:t}),t}}}n.d(e,"a",(function(){return o}))},"../core/dist/esm-es5/component-behavior-a1704b91.js":function(t,e,n){"use strict";function o(t,e,n){var o=t[e];t["__"+e+"__patch_list"]=t["__"+e+"__patches"]||[];var r=t["__"+e+"__patch_list"];r.push(n),t[e]=function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];for(var i=0,c=r;i<c.length;i++){var a=c[i];t=a.bind(this)(o?o.bind(this):null,e)}return t}}n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));var r=function(t){var e=this;this.component=t,this.beforeAttach&&this.beforeAttach(),this.component.native&&(console.warn("Attaching a behavior to a native element",this.component),this.component.host.remove=function(){e.component.componentDidUnload(),Element.prototype.remove.apply(e.component.host)},setTimeout((function(){return e.component.componentDidLoad()}),0)),o(this.component,"componentDidLoad",(function(t){t&&t(),e.attach&&e.attach()})),o(this.component,"componentDidUnload",(function(t){t&&t(),e.detach&&e.detach()}))}},"../core/dist/esm-es5/portal-behavior-2601058d.js":function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var o,r=n("../core/dist/esm-es5/component-behavior-a1704b91.js"),i=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),c=function(t){function e(e){var n=t.call(this,e)||this;return Object(r.b)(e,"render",(function(t){return e.customRender?e.customRender(e.vchildren):e.vchildren||t()})),n}return i(e,t),e}(r.a)},"../core/dist/esm-es5/transition-behavior-96cd0909.js":function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var o,r=n("../core/dist/esm-es5/component-behavior-a1704b91.js"),i=n("../core/dist/esm-es5/animation-2e084e7f.js"),c=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function c(t){try{s(o.next(t))}catch(e){i(e)}}function a(t){try{s(o.throw(t))}catch(e){i(e)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,a)}s((o=o.apply(t,e||[])).next())}))},s=function(t,e){var n,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(r=(r=c.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(a){i=[6,a],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},u=function(t){function e(){var e=t.apply(this,arguments)||this;return e.removeIsQueued=!1,e}return c(e,t),e.prototype.beforeAttach=function(){var t=this;Object(r.b)(this.component,"componentWillLoad",(function(e){return a(t,void 0,void 0,(function(){return s(this,(function(t){switch(t.label){case 0:return this.component.host.classList.add("transition--before-enter"),[4,Object(i.a)(this.component.host).then(Object(i.c)())];case 1:return t.sent(),e?[2,e()]:[2]}}))}))}))},e.prototype.attach=function(){return a(this,void 0,void 0,(function(){return s(this,(function(t){switch(t.label){case 0:return this.component.componentWillEnter?[4,this.component.componentWillEnter()]:[3,2];case 1:t.sent(),t.label=2;case 2:return this.component.host.classList.replace("transition--before-enter","transition--after-enter"),this.component.host.remove=this.customRemoveFn.bind(this),[2]}}))}))},e.prototype.detach=function(){},e.prototype.customRemoveFn=function(){return a(this,void 0,void 0,(function(){var t;return s(this,(function(e){switch(e.label){case 0:return this.removeIsQueued?[3,5]:(this.removeIsQueued=!0,t=this.component.host.getElementsByClassName("transition--after-enter"),[4,Promise.all(Array.from(t).map((function(t){return t.remove()})))]);case 1:return e.sent(),this.component.host.classList.add("transition--before-leave"),this.component.componentWillLeave?[4,this.component.componentWillLeave()]:[3,3];case 2:e.sent(),e.label=3;case 3:return[4,Object(i.a)(this.component.host).then(Object(i.c)())];case 4:e.sent(),Element.prototype.remove.apply(this.component.host),e.label=5;case 5:return[2]}}))}))},e}(r.a)}}]);
//# sourceMappingURL=56.2954bfa94898105f7d03.js.map