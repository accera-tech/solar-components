(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{"../core/dist/esm-es5/_commonjsHelpers-97e6d7b1.js":function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r}));var o="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof e?e:"undefined"!==typeof self?self:{};function r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function a(e,t){return e(t={exports:{}},t.exports),t.exports}}).call(this,n("./node_modules/webpack/buildin/global.js"))},"../core/dist/esm-es5/ac-layout.entry.js":function(e,t,n){"use strict";n.r(t),n.d(t,"ac_layout",(function(){return c}));var o=n("../core/dist/esm-es5/index-9253740e.js"),r=(n("../core/dist/esm-es5/component-behavior-a1704b91.js"),n("../core/dist/esm-es5/bind-43838568.js")),a=(n("../core/dist/esm-es5/_commonjsHelpers-97e6d7b1.js"),n("../core/dist/esm-es5/browser-c2ce94f2.js"),n("../core/dist/esm-es5/focus-behavior-ee11cb33.js")),s=function(e,t,n,o){var r,a=arguments.length,s=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(s=(a<3?r(s):a>3?r(t,n,s):r(t,n))||s);return a>3&&s&&Object.defineProperty(t,n,s),s},c=function(){function e(e){Object(o.g)(this,e),this.focusBehavior=new a.a(this),this.contentScroll=Object(o.d)(this,"contentScroll",7)}return e.prototype.collapsedDidUpdate=function(){this.hasFocus=!!this.collapsed},e.prototype.componentDidLoad=function(){this.focusTarget=this.host.querySelector(".ac-layout__nav-left-container ac-navdrawer")},e.prototype.componentDidUnload=function(){},e.prototype.whenBlur=function(e){console.log(e,e.dataset),!e.dataset.navdrawer&&this.collapsed&&(this.collapsed=null)},e.prototype.handleContentScroll=function(){this.contentScroll.emit({top:this.contentElt.scrollTop,left:this.contentElt.scrollLeft})},e.prototype.render=function(){var e,t=this;return Object(o.f)(o.a,{class:(e={},e["ac-layout--"+this.collapsed+"-collapsed"]=!!this.collapsed,e)},Object(o.f)("div",{class:"ac-layout__nav-left-container"},Object(o.f)("slot",{name:"nav-left"})),Object(o.f)("div",{class:"ac-layout__content-container"},Object(o.f)("slot",{name:"header"}),Object(o.f)("div",{ref:function(e){return t.contentElt=e},class:"ac-layout__content-scroll",onScroll:this.handleContentScroll},Object(o.f)("slot",{name:"content"}))))},Object.defineProperty(e.prototype,"host",{get:function(){return Object(o.e)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{collapsed:["collapsedDidUpdate"]}},enumerable:!0,configurable:!0}),e}();s([r.a],c.prototype,"handleContentScroll",null),c.style="ac-layout{display:-ms-flexbox;display:flex;background:var(--color-neutral-lighter, #F5F5F5)}ac-layout .ac-layout__nav-left-container{height:100vh;border:0}ac-layout .ac-layout__nav-left-container ac-navdrawer{border-radius:0 8px 8px 0}ac-layout .ac-layout__content-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100vh;overflow:auto;-webkit-transition:-webkit-filter ease-in-out 0.1s;transition:-webkit-filter ease-in-out 0.1s;transition:filter ease-in-out 0.1s;transition:filter ease-in-out 0.1s, -webkit-filter ease-in-out 0.1s;background:var(--color-neutral-lighter, #F5F5F5)}ac-layout .ac-layout__content-scroll{position:relative}@media (max-width: 768px){ac-layout .ac-layout__content-scroll{height:100%;max-height:100%;overflow:auto}ac-layout .ac-layout__nav-left-container{position:absolute;z-index:4;-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-transition:-webkit-transform ease-in-out 0.1s;transition:-webkit-transform ease-in-out 0.1s;transition:transform ease-in-out 0.1s;transition:transform ease-in-out 0.1s, -webkit-transform ease-in-out 0.1s}}@media (max-width: 768px){ac-layout.ac-layout--nav-left-collapsed .ac-layout__nav-left-container{position:absolute;-webkit-transform:translateX(0);transform:translateX(0)}ac-layout.ac-layout--nav-left-collapsed .ac-layout__content-container{-webkit-filter:brightness(0.4);filter:brightness(0.4)}ac-layout.ac-layout--nav-left-collapsed ac-navdrawer{-webkit-box-shadow:16px 0px 32px rgba(0, 0, 0, 0.08);box-shadow:16px 0px 32px rgba(0, 0, 0, 0.08)}}ac-layout .ac-layout__content-container::-webkit-scrollbar{width:8px;height:8px}ac-layout .ac-layout__content-container::-webkit-scrollbar-track{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.2)}ac-layout .ac-layout__content-container::-webkit-scrollbar-thumb{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.3)}ac-layout .ac-layout__content-container::-webkit-scrollbar-thumb:hover{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.4)}ac-layout .ac-layout__content-scroll::-webkit-scrollbar{width:8px;height:8px}ac-layout .ac-layout__content-scroll::-webkit-scrollbar-track{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.2)}ac-layout .ac-layout__content-scroll::-webkit-scrollbar-thumb{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.3)}ac-layout .ac-layout__content-scroll::-webkit-scrollbar-thumb:hover{background:rgba(var(--color-theme-contrast-rgb, 17, 17, 17), 0.4)}"},"../core/dist/esm-es5/bind-43838568.js":function(e,t,n){"use strict";function o(e,t,n){return{get:function(){var e=n.value.bind(this);return Object.defineProperty(this,t,{value:e}),e}}}n.d(t,"a",(function(){return o}))},"../core/dist/esm-es5/browser-c2ce94f2.js":function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return d}));var o=n("../core/dist/esm-es5/_commonjsHelpers-97e6d7b1.js"),r=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var o=Array(e),r=0;for(t=0;t<n;t++)for(var a=arguments[t],s=0,c=a.length;s<c;s++,r++)o[r]=a[s];return o},a=1e3,s=6e4,c=60*s,i=24*c,l=function(e,t){t=t||{};var n=typeof e;if("string"===n&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!t)return;var n=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*n;case"weeks":case"week":case"w":return 6048e5*n;case"days":case"day":case"d":return n*i;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*s;case"seconds":case"second":case"secs":case"sec":case"s":return n*a;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}(e);if("number"===n&&isFinite(e))return t.long?function(e){var t=Math.abs(e);if(t>=i)return u(e,t,i,"day");if(t>=c)return u(e,t,c,"hour");if(t>=s)return u(e,t,s,"minute");if(t>=a)return u(e,t,a,"second");return e+" ms"}(e):function(e){var t=Math.abs(e);if(t>=i)return Math.round(e/i)+"d";if(t>=c)return Math.round(e/c)+"h";if(t>=s)return Math.round(e/s)+"m";if(t>=a)return Math.round(e/a)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function u(e,t,n,o){var r=t>=1.5*n;return Math.round(e/n)+" "+o+(r?"s":"")}var f=function(e){function t(e){for(var t=0,o=0;o<e.length;o++)t=(t<<5)-t+e.charCodeAt(o),t|=0;return n.colors[Math.abs(t)%n.colors.length]}function n(e){var r;function s(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];if(s.enabled){var o=s,a=Number(new Date),c=a-(r||a);o.diff=c,o.prev=r,o.curr=a,r=a,e[0]=n.coerce(e[0]),"string"!==typeof e[0]&&e.unshift("%O");var i=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(function(t,r){if("%%"===t)return t;i++;var a=n.formatters[r];if("function"===typeof a){var s=e[i];t=a.call(o,s),e.splice(i,1),i--}return t})),n.formatArgs.call(o,e);var l=o.log||n.log;l.apply(o,e)}}return s.namespace=e,s.enabled=n.enabled(e),s.useColors=n.useColors(),s.color=t(e),s.destroy=o,s.extend=a,"function"===typeof n.init&&n.init(s),n.instances.push(s),s}function o(){var e=n.instances.indexOf(this);return-1!==e&&(n.instances.splice(e,1),!0)}function a(e,t){var o=n(this.namespace+("undefined"===typeof t?":":t)+e);return o.log=this.log,o}function s(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return n.debug=n,n.default=n,n.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},n.disable=function(){var e=r(n.names.map(s),n.skips.map(s).map((function(e){return"-"+e}))).join(",");return n.enable(""),e},n.enable=function(e){var t;n.save(e),n.names=[],n.skips=[];var o=("string"===typeof e?e:"").split(/[\s,]+/),r=o.length;for(t=0;t<r;t++)o[t]&&("-"===(e=o[t].replace(/\*/g,".*?"))[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")));for(t=0;t<n.instances.length;t++){var a=n.instances[t];a.enabled=n.enabled(a.namespace)}},n.enabled=function(e){if("*"===e[e.length-1])return!0;var t,o;for(t=0,o=n.skips.length;t<o;t++)if(n.skips[t].test(e))return!1;for(t=0,o=n.names.length;t<o;t++)if(n.names[t].test(e))return!0;return!1},n.humanize=l,Object.keys(e).forEach((function(t){n[t]=e[t]})),n.instances=[],n.names=[],n.skips=[],n.formatters={},n.selectColor=t,n.enable(n.load()),n},d=Object(o.b)((function(t,n){n.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return"object"===typeof console&&console.log&&console.log.apply(console,e)},n.formatArgs=function(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+t.exports.humanize(this.diff),!this.useColors)return;var n="color: "+this.color;e.splice(1,0,n,"color: inherit");var o=0,r=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(o++,"%c"===e&&(r=o))})),e.splice(r,0,n)},n.save=function(e){try{e?n.storage.setItem("debug",e):n.storage.removeItem("debug")}catch(t){}},n.load=function(){var t;try{t=n.storage.getItem("debug")}catch(o){}!t&&"undefined"!==typeof e&&"env"in e&&(t=Object({NODE_ENV:"production",PUBLIC_URL:"/solar-components/",npm_package_dependencies_docz_theme_default:"^1.2.0"}).DEBUG);return t},n.useColors=function(){if("undefined"!==typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!==typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!==typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},n.storage=function(){try{return localStorage}catch(e){}}(),n.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.exports=f(n),t.exports.formatters.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}}))}).call(this,n("./node_modules/process/browser.js"))},"../core/dist/esm-es5/component-behavior-a1704b91.js":function(e,t,n){"use strict";function o(e,t,n){var o=e[t];e["__"+t+"__patch_list"]=e["__"+t+"__patches"]||[];var r=e["__"+t+"__patch_list"];r.push(n),e[t]=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];for(var a=0,s=r;a<s.length;a++){var c=s[a];e=c.bind(this)(o?o.bind(this):null,t)}return e}}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var r=function(e){var t=this;this.component=e,this.beforeAttach&&this.beforeAttach(),this.component.native&&(console.warn("Attaching a behavior to a native element",this.component),this.component.host.remove=function(){t.component.componentDidUnload(),Element.prototype.remove.apply(t.component.host)},setTimeout((function(){return t.component.componentDidLoad()}),0)),o(this.component,"componentDidLoad",(function(e){e&&e(),t.attach&&t.attach()})),o(this.component,"componentDidUnload",(function(e){e&&e(),t.detach&&t.detach()}))}},"../core/dist/esm-es5/focus-behavior-ee11cb33.js":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o,r=n("../core/dist/esm-es5/component-behavior-a1704b91.js"),a=n("../core/dist/esm-es5/browser-c2ce94f2.js"),s=(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),c=Object(a.a)("solar:FocusBehavior"),i=function(e){function t(){var n=e.apply(this,arguments)||this;return n.handleBodyClick=function(e){if(n.component.hasFocus){var o=n.component.focusTarget||n.component.host;e.target.closest(o.tagName.toLowerCase())!==o&&!t.checkBypassNode(o,e.target)&&(c("Clicked outside",o),n.component.whenBlur(e.target))}},n}return s(t,e),t.checkBypassNode=function(e,t){var n=!1;if(e.id){var o=document.body.querySelector('[data-toggle="'+e.id+'"]');n=!!o&&o.contains(t)}return n},t.prototype.attach=function(){document.body.addEventListener("click",this.handleBodyClick)},t.prototype.detach=function(){document.body.removeEventListener("click",this.handleBodyClick)},t}(r.a)}}]);
//# sourceMappingURL=55.2954bfa94898105f7d03.js.map