(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{"../core/dist/esm-es5/ac-header.entry.js":function(e,t,a){"use strict";a.r(t),a.d(t,"ac_header",(function(){return i}));var r=a("../core/dist/esm-es5/index-9253740e.js"),n=a("../core/dist/esm-es5/bind-43838568.js"),o=function(e){return Object(r.f)("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"20",height:"15",viewBox:"0 0 20 15"},e),Object(r.f)("g",{transform:"translate(-16 -15)"},Object(r.f)("rect",{width:"16",height:"3",rx:"1.5",transform:"translate(16 15)"}),Object(r.f)("rect",{width:"20",height:"3",rx:"1.5",transform:"translate(16 21)"}),Object(r.f)("rect",{width:"12",height:"3",rx:"1.5",transform:"translate(16 27)"})))},c=function(e,t,a,r){var n,o=arguments.length,c=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(e,t,a,r);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(o<3?n(c):o>3?n(t,a,c):n(t,a))||c);return o>3&&c&&Object.defineProperty(t,a,c),c},i=function(){function e(e){Object(r.g)(this,e),this.theme="primary"}return e.prototype.componentDidLoad=function(){var e="AC-LAYOUT"===this.host.parentElement.tagName?this.host.parentElement:"AC-LAYOUT"===this.host.parentElement.parentElement.tagName?this.host.parentElement.parentElement:null;e&&(this.parentLayout=e,this.hasNavdrawer=!!this.parentLayout.querySelector("ac-navdrawer"))},e.prototype.handleLayoutContentScroll=function(e){this.scrolled=e.detail.top>0},e.prototype.handleMenuClick=function(){this.parentLayout.collapsed="nav-left"},e.prototype.render=function(){var e;return Object(r.f)(r.a,{class:(e={},e["ac-header--"+this.theme]=void 0!==this.theme,e["ac-header--scrolled"]=this.scrolled,e)},Object(r.f)("header",{class:"ac-header__header-container"},this.hasNavdrawer?Object(r.f)("ac-button",{class:"ac-header__menu-button",shape:"round",fill:"clear","data-toggle":"mainNavdrawer","icon-only":!0,onClick:this.handleMenuClick},Object(r.f)(o,null)):Object(r.f)("span",null),Object(r.f)("div",{class:"ac-header__content"},Object(r.f)("slot",null)),Object(r.f)("div",{class:"ac-header__actions"},Object(r.f)("slot",{name:"actions"}))),Object(r.f)("slot",{name:"sub-header"}))},Object.defineProperty(e.prototype,"host",{get:function(){return Object(r.e)(this)},enumerable:!0,configurable:!0}),e}();c([n.a],i.prototype,"handleMenuClick",null),i.style="ac-header{display:block;position:relative;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-align:center;align-items:center;width:100%;-webkit-transition:background ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.25s;transition:background ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.25s;transition:background ease-in-out 0.25s, box-shadow ease-in-out 0.25s;transition:background ease-in-out 0.25s, box-shadow ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.25s}ac-header .ac-header__header-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%}ac-header .ac-header__header-container .ac-header__menu-button{display:none}@media (max-width: 768px){ac-header .ac-header__header-container .ac-header__menu-button{display:block}}ac-header .ac-header__header-container .ac-header__content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;min-height:64px;padding:0 40px}ac-header .ac-header__header-container .ac-header__actions{padding-right:40px}@media (max-width: 768px){ac-header .ac-header__header-container{min-height:52px}ac-header .ac-header__header-container .ac-header__content{position:absolute;z-index:-1;-ms-flex-pack:center;justify-content:center;padding:0 16px}ac-header .ac-header__header-container .ac-header__actions{padding-right:16px}}ac-header>ac-tabs[slot=sub-header]{border-width:0}@media (min-width: 768px){ac-header>ac-tabs[slot=sub-header]{padding:0 24px;border-width:1px}}ac-header.ac-header--scrolled{-webkit-box-shadow:0 4px 8px rgba(0, 0, 0, 0.08);box-shadow:0 4px 8px rgba(0, 0, 0, 0.08)}@media (max-width: 768px){ac-header.ac-header--primary{--color-theme-contrast:var(--color-primary-contrast, #FFFFFF);--color-theme-contrast-rgb:var(--color-primary-contrast-rgb,\n      255, 255, 255);background:var(--color-primary-normal, #00466F);color:var(--color-primary-contrast, #FFFFFF)}}@media (max-width: 768px){ac-header.ac-header--secondary{--color-theme-contrast:var(--color-secondary-contrast, #FFFFFF);--color-theme-contrast-rgb:var(--color-secondary-contrast-rgb,\n      255, 255, 255);background:var(--color-secondary-normal, #F0000A);color:var(--color-secondary-contrast, #FFFFFF)}}"},"../core/dist/esm-es5/bind-43838568.js":function(e,t,a){"use strict";function r(e,t,a){return{get:function(){var e=a.value.bind(this);return Object.defineProperty(this,t,{value:e}),e}}}a.d(t,"a",(function(){return r}))}}]);
//# sourceMappingURL=78.1ecec3c89af35341185b.js.map