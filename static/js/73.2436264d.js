(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{"../core/dist/esm-es5/ac-header.entry.js":function(e,a,t){"use strict";t.r(a),t.d(a,"ac_header",(function(){return i}));var r=t("../core/dist/esm-es5/core-15293804.js"),n=t("../core/dist/esm-es5/bind-6a1eab48.js"),o=function(e){return Object(r.g)("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"20",height:"15",viewBox:"0 0 20 15"},e),Object(r.g)("g",{transform:"translate(-16 -15)"},Object(r.g)("rect",{width:"16",height:"3",rx:"1.5",transform:"translate(16 15)"}),Object(r.g)("rect",{width:"20",height:"3",rx:"1.5",transform:"translate(16 21)"}),Object(r.g)("rect",{width:"12",height:"3",rx:"1.5",transform:"translate(16 27)"})))},c=function(e,a,t,r){var n,o=arguments.length,c=o<3?a:null===r?r=Object.getOwnPropertyDescriptor(a,t):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(e,a,t,r);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(o<3?n(c):o>3?n(a,t,c):n(a,t))||c);return o>3&&c&&Object.defineProperty(a,t,c),c},i=function(){function e(e){Object(r.h)(this,e),this.theme="primary"}return e.prototype.componentDidLoad=function(){var e="AC-LAYOUT"===this.host.parentElement.tagName?this.host.parentElement:"AC-LAYOUT"===this.host.parentElement.parentElement.tagName?this.host.parentElement.parentElement:null;e&&(this.parentLayout=e,this.hasNavdrawer=!!this.parentLayout.querySelector("ac-navdrawer"))},e.prototype.handleLayoutContentScroll=function(e){this.scrolled=e.detail.top>0},e.prototype.handleMenuClick=function(){this.parentLayout.collapsed="nav-left"},e.prototype.render=function(){var e;return Object(r.g)(r.b,{class:(e={},e["ac-header--"+this.theme]=void 0!==this.theme,e["ac-header--scrolled"]=this.scrolled,e)},Object(r.g)("header",{class:"ac-header__header-container"},this.hasNavdrawer?Object(r.g)("ac-button",{class:"ac-header__menu-button",shape:"round",fill:"clear","data-toggle":"mainNavdrawer","icon-only":!0,onClick:this.handleMenuClick},Object(r.g)(o,null)):Object(r.g)("span",null),Object(r.g)("div",{class:"ac-header__content"},Object(r.g)("slot",null)),Object(r.g)("div",{class:"ac-header__actions"},Object(r.g)("slot",{name:"actions"}))),Object(r.g)("slot",{name:"sub-header"}))},Object.defineProperty(e.prototype,"host",{get:function(){return Object(r.f)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ac-header{display:block;position:relative;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background .25s ease-in-out,-webkit-box-shadow .25s ease-in-out;transition:background .25s ease-in-out,-webkit-box-shadow .25s ease-in-out;transition:background .25s ease-in-out,box-shadow .25s ease-in-out;transition:background .25s ease-in-out,box-shadow .25s ease-in-out,-webkit-box-shadow .25s ease-in-out}ac-header,ac-header .ac-header__header-container{-ms-flex-align:center;align-items:center;width:100%}ac-header .ac-header__header-container{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}ac-header .ac-header__header-container .ac-header__menu-button{display:none}@media (max-width:768px){ac-header .ac-header__header-container .ac-header__menu-button{display:block}}ac-header .ac-header__header-container .ac-header__content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;min-height:64px;padding:0 40px}ac-header .ac-header__header-container .ac-header__actions{padding-right:40px}@media (max-width:768px){ac-header .ac-header__header-container{min-height:52px}ac-header .ac-header__header-container .ac-header__content{position:absolute;z-index:-1;-ms-flex-pack:center;justify-content:center;padding:0 16px}ac-header .ac-header__header-container .ac-header__actions{padding-right:16px}}ac-header>ac-tabs[slot=sub-header]{border-width:0}@media (min-width:768px){ac-header>ac-tabs[slot=sub-header]{padding:0 24px;border-width:1px}}ac-header.ac-header--scrolled{-webkit-box-shadow:0 4px 8px rgba(0,0,0,.08);box-shadow:0 4px 8px rgba(0,0,0,.08)}@media (max-width:768px){ac-header.ac-header--primary{--color-theme-contrast:var(--color-primary-contrast,#fff);--color-theme-contrast-rgb:var(--color-primary-contrast-rgb,255,255,255);background:var(--color-primary-normal,#00466f);color:var(--color-primary-contrast,#fff)}}@media (max-width:768px){ac-header.ac-header--secondary{--color-theme-contrast:var(--color-secondary-contrast,#fff);--color-theme-contrast-rgb:var(--color-secondary-contrast-rgb,255,255,255);background:var(--color-secondary-normal,#f0000a);color:var(--color-secondary-contrast,#fff)}}"},enumerable:!0,configurable:!0}),e}();c([n.a],i.prototype,"handleMenuClick",null)},"../core/dist/esm-es5/bind-6a1eab48.js":function(e,a,t){"use strict";function r(e,a,t){return{get:function(){var e=t.value.bind(this);return Object.defineProperty(this,a,{value:e}),e}}}t.d(a,"a",(function(){return r}))}}]);
//# sourceMappingURL=73.d022eec71cf98254ebc7.js.map