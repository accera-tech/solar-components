(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{"../core/dist/esm-es5/ac-layout.entry.js":function(t,e,o){"use strict";o.r(e),o.d(e,"ac_layout",(function(){return c}));var a=o("../core/dist/esm-es5/index-182a4039.js"),n=o("../core/dist/esm-es5/bind-43838568.js"),r=function(t,e,o,a){var n,r=arguments.length,c=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,o):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,o,a);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(c=(r<3?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c},c=function(){function t(t){Object(a.g)(this,t),this.contentScroll=Object(a.d)(this,"contentScroll",7)}return t.prototype.collapsedDidUpdate=function(){this.hasFocus=!!this.collapsed},t.prototype.componentDidLoad=function(){this.focusTarget=this.host.querySelector(".ac-layout__nav-left-container ac-navdrawer")},t.prototype.componentDidUnload=function(){},t.prototype.handleContentScroll=function(){this.contentScroll.emit({top:this.contentElt.scrollTop,left:this.contentElt.scrollLeft})},t.prototype.render=function(){var t,e=this;return Object(a.f)(a.a,{class:(t={},t["ac-layout--"+this.collapsed+"-collapsed"]=!!this.collapsed,t)},Object(a.f)("div",{class:"ac-layout__nav-left-container"},Object(a.f)("slot",{name:"nav-left"})),Object(a.f)("div",{class:"ac-layout__content-container"},Object(a.f)("slot",{name:"header"}),Object(a.f)("div",{ref:function(t){return e.contentElt=t},class:"ac-layout__content-scroll",onScroll:this.handleContentScroll},Object(a.f)("slot",{name:"content"}))))},Object.defineProperty(t.prototype,"host",{get:function(){return Object(a.e)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{collapsed:["collapsedDidUpdate"]}},enumerable:!0,configurable:!0}),t}();r([n.a],c.prototype,"handleContentScroll",null),c.style="ac-layout{display:-ms-flexbox;display:flex;background:var(--color-neutral-lighter, #F5F5F5)}ac-layout .ac-layout__nav-left-container{height:100vh;border:0}ac-layout .ac-layout__nav-left-container ac-navdrawer{border-radius:0 8px 8px 0}ac-layout .ac-layout__content-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100vh;overflow:auto;-webkit-transition:-webkit-filter ease-in-out 0.1s;transition:-webkit-filter ease-in-out 0.1s;transition:filter ease-in-out 0.1s;transition:filter ease-in-out 0.1s, -webkit-filter ease-in-out 0.1s;background:var(--color-neutral-lighter, #F5F5F5)}ac-layout .ac-layout__content-scroll{position:relative}@media (max-width: 768px){ac-layout .ac-layout__content-scroll{height:100%;max-height:100%;overflow:auto}ac-layout .ac-layout__nav-left-container{position:absolute;z-index:4;-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-transition:-webkit-transform ease-in-out 0.1s;transition:-webkit-transform ease-in-out 0.1s;transition:transform ease-in-out 0.1s;transition:transform ease-in-out 0.1s, -webkit-transform ease-in-out 0.1s}}@media (max-width: 768px){ac-layout.ac-layout--nav-left-collapsed .ac-layout__nav-left-container{position:absolute;-webkit-transform:translateX(0);transform:translateX(0)}ac-layout.ac-layout--nav-left-collapsed .ac-layout__content-container{-webkit-filter:brightness(0.4);filter:brightness(0.4)}ac-layout.ac-layout--nav-left-collapsed ac-navdrawer{-webkit-box-shadow:16px 0px 32px rgba(0, 0, 0, 0.08);box-shadow:16px 0px 32px rgba(0, 0, 0, 0.08)}}ac-layout .ac-layout__content-container::-webkit-scrollbar{width:8px;height:8px}ac-layout .ac-layout__content-container::-webkit-scrollbar-track{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.2)}ac-layout .ac-layout__content-container::-webkit-scrollbar-thumb{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.3)}ac-layout .ac-layout__content-container::-webkit-scrollbar-thumb:hover{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.4)}ac-layout .ac-layout__content-scroll::-webkit-scrollbar{width:8px;height:8px}ac-layout .ac-layout__content-scroll::-webkit-scrollbar-track{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.2)}ac-layout .ac-layout__content-scroll::-webkit-scrollbar-thumb{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.3)}ac-layout .ac-layout__content-scroll::-webkit-scrollbar-thumb:hover{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.4)}"},"../core/dist/esm-es5/bind-43838568.js":function(t,e,o){"use strict";function a(t,e,o){return{get:function(){var t=o.value.bind(this);return Object.defineProperty(this,e,{value:t}),t}}}o.d(e,"a",(function(){return a}))}}]);
//# sourceMappingURL=61.16968a3a51ae40b9be32.js.map