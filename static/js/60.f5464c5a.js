(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{"../core/dist/esm-es5/ac-portal.entry.js":function(t,n,e){"use strict";e.r(n),e.d(n,"ac_portal",(function(){return c}));var o=e("../core/dist/esm-es5/index-9253740e.js"),r=(e("../core/dist/esm-es5/component-behavior-a1704b91.js"),e("../core/dist/esm-es5/animation-2e084e7f.js"),e("../core/dist/esm-es5/transition-behavior-96cd0909.js")),i=e("../core/dist/esm-es5/portal-behavior-2601058d.js"),c=function(){function t(t){Object(o.g)(this,t),this.portalBehavior=new i.a(this),this.transitionBehavior=new r.a(this)}return t.prototype.componentWillLoad=function(){},t.prototype.componentDidUnload=function(){},Object.defineProperty(t.prototype,"host",{get:function(){return Object(o.e)(this)},enumerable:!0,configurable:!0}),t}()},"../core/dist/esm-es5/animation-2e084e7f.js":function(t,n,e){"use strict";function o(t){var n=window.getComputedStyle(t).transition.match(/\.?\d[ms]/g);if(!n)return new Promise((function(n){return n({element:t,duration:0})}));var e=0;return n.forEach((function(t){var n=function(t){var n=t.startsWith(".")?"0"+t:t;return n.endsWith("ms")?parseInt(n):1e3*parseFloat(n)}(t);e=e<n?n:e})),new Promise((function(n){return n({element:t,duration:e})}))}function r(t){return function(n){var e=n.element,o=n.duration;return Object.assign(e.style,t),new Promise((function(t){return t({element:e,duration:o})}))}}function i(t){return void 0===t&&(t=0),function(n){var e=n.element,o=n.duration;return new Promise((function(n){return setTimeout((function(){return n({element:e,duration:o})}),o+t)}))}}e.d(n,"a",(function(){return o})),e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return i}))},"../core/dist/esm-es5/component-behavior-a1704b91.js":function(t,n,e){"use strict";function o(t,n,e){var o=t[n];t["__"+n+"__patch_list"]=t["__"+n+"__patches"]||[];var r=t["__"+n+"__patch_list"];r.push(e),t[n]=function(){for(var t,n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];for(var i=0,c=r;i<c.length;i++){var s=c[i];t=s.bind(this)(o?o.bind(this):null,n)}return t}}e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return o}));var r=function(t){var n=this;this.component=t,this.beforeAttach&&this.beforeAttach(),this.component.native&&(console.warn("Attaching a behavior to a native element",this.component),this.component.host.remove=function(){n.component.componentDidUnload(),Element.prototype.remove.apply(n.component.host)},setTimeout((function(){return n.component.componentDidLoad()}),0)),o(this.component,"componentDidLoad",(function(t){t&&t(),n.attach&&n.attach()})),o(this.component,"componentDidUnload",(function(t){t&&t(),n.detach&&n.detach()}))}},"../core/dist/esm-es5/portal-behavior-2601058d.js":function(t,n,e){"use strict";e.d(n,"a",(function(){return c}));var o,r=e("../core/dist/esm-es5/component-behavior-a1704b91.js"),i=(o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)},function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),c=function(t){function n(n){var e=t.call(this,n)||this;return Object(r.b)(n,"render",(function(t){return n.customRender?n.customRender(n.vchildren):n.vchildren||t()})),e}return i(n,t),n}(r.a)},"../core/dist/esm-es5/transition-behavior-96cd0909.js":function(t,n,e){"use strict";e.d(n,"a",(function(){return u}));var o,r=e("../core/dist/esm-es5/component-behavior-a1704b91.js"),i=e("../core/dist/esm-es5/animation-2e084e7f.js"),c=(o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)},function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),s=function(t,n,e,o){return new(e||(e=Promise))((function(r,i){function c(t){try{a(o.next(t))}catch(n){i(n)}}function s(t){try{a(o.throw(t))}catch(n){i(n)}}function a(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(c,s)}a((o=o.apply(t,n||[])).next())}))},a=function(t,n){var e,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(e)throw new TypeError("Generator is already executing.");for(;c;)try{if(e=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(r=(r=c.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=n.call(t,c)}catch(s){i=[6,s],o=0}finally{e=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},u=function(t){function n(){var n=t.apply(this,arguments)||this;return n.removeIsQueued=!1,n}return c(n,t),n.prototype.beforeAttach=function(){var t=this;Object(r.b)(this.component,"componentWillLoad",(function(n){return s(t,void 0,void 0,(function(){return a(this,(function(t){switch(t.label){case 0:return this.component.host.classList.add("transition--before-enter"),[4,Object(i.a)(this.component.host).then(Object(i.c)())];case 1:return t.sent(),n?[2,n()]:[2]}}))}))}))},n.prototype.attach=function(){return s(this,void 0,void 0,(function(){return a(this,(function(t){switch(t.label){case 0:return this.component.componentWillEnter?[4,this.component.componentWillEnter()]:[3,2];case 1:t.sent(),t.label=2;case 2:return this.component.host.classList.replace("transition--before-enter","transition--after-enter"),this.component.host.remove=this.customRemoveFn.bind(this),[2]}}))}))},n.prototype.detach=function(){},n.prototype.customRemoveFn=function(){return s(this,void 0,void 0,(function(){var t;return a(this,(function(n){switch(n.label){case 0:return this.removeIsQueued?[3,5]:(this.removeIsQueued=!0,t=this.component.host.getElementsByClassName("transition--after-enter"),[4,Promise.all(Array.from(t).map((function(t){return t.remove()})))]);case 1:return n.sent(),this.component.host.classList.add("transition--before-leave"),this.component.componentWillLeave?[4,this.component.componentWillLeave()]:[3,3];case 2:n.sent(),n.label=3;case 3:return[4,Object(i.a)(this.component.host).then(Object(i.c)())];case 4:n.sent(),Element.prototype.remove.apply(this.component.host),n.label=5;case 5:return[2]}}))}))},n}(r.a)}}]);
//# sourceMappingURL=60.2954bfa94898105f7d03.js.map