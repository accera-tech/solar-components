(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{"../core/dist/esm-es5/ac-autocomplete.entry.js":function(e,t,i){"use strict";i.r(t),i.d(t,"ac_autocomplete",(function(){return b}));var n=i("../core/dist/esm-es5/index-9253740e.js"),s=i("../core/dist/esm-es5/reactivity-405a1945.js"),o=(i("../core/dist/esm-es5/component-behavior-a1704b91.js"),i("../core/dist/esm-es5/async-data-behavior-1c123f7e.js")),r=i("../core/dist/esm-es5/ensure-controller-bfdb024b.js"),a=(i("../core/dist/esm-es5/index-5a65ff45.js"),i("../core/dist/esm-es5/bind-43838568.js")),c=(i("../core/dist/esm-es5/_commonjsHelpers-97e6d7b1.js"),i("../core/dist/esm-es5/browser-c2ce94f2.js"),i("../core/dist/esm-es5/focus-behavior-ee11cb33.js")),l=i("../core/dist/esm-es5/index-5c7685cc.js"),u=i("../core/dist/esm-es5/ac-fa-icon-01afc19d.js"),h=i("../core/dist/esm-es5/index.es-652be552.js"),p=function(e,t,i,n){return new(i||(i=Promise))((function(s,o){function r(e){try{c(n.next(e))}catch(t){o(t)}}function a(e){try{c(n.throw(e))}catch(t){o(t)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,a)}c((n=n.apply(e,t||[])).next())}))},f=function(e,t){var i,n,s,o,r={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(i)throw new TypeError("Generator is already executing.");for(;r;)try{if(i=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return r.label++,{value:o[1],done:!1};case 5:r.label++,n=o[1],o=[0];continue;case 7:o=r.ops.pop(),r.trys.pop();continue;default:if(!(s=(s=r.trys).length>0&&s[s.length-1])&&(6===o[0]||2===o[0])){r=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){r.label=o[1];break}if(6===o[0]&&r.label<s[1]){r.label=s[1],s=o;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(o);break}s[2]&&r.ops.pop(),r.trys.pop();continue}o=t.call(e,r)}catch(a){o=[6,a],n=0}finally{i=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},d=function(e,t,i,n){var s,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o<3?s(r):o>3?s(t,i,r):s(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r},b=function(){function e(e){Object(n.g)(this,e),this.noResultsLabel="No results for",this.options=[],this.isPanelOpen=!1,this.asyncDataBehavior=new o.a(this),this.formFieldBehavior=new l.a(this),this.requestCheckValidity=!1,this.SelectPanel=Object(r.a)(Object(r.b)("ac-panel-controller")),this.focusBehavior=new c.a(this),this.selectChange=Object(n.d)(this,"selectChange",7)}return e.prototype.errorDidUpdate=function(e){e?(this.acInputBase.error=!0,this.formFieldBehavior.setInvalid()):(this.acInputBase.error=!1,this.formFieldBehavior.setValid())},e.prototype.getFormFieldBehavior=function(){return p(this,void 0,void 0,(function(){return f(this,(function(e){return[2,this.formFieldBehavior]}))}))},e.prototype.handleSelected=function(e){this.selectedText=e.title,this.value=e.value,this.requestCheckValidity=!0,this.formFieldBehavior.setDirty(),this.filter=null,this.isPanelOpen=!1},e.prototype.handleDebouncedKeyUp=function(e){return p(this,void 0,void 0,(function(){var t;return f(this,(function(i){return t=e.target.value,this.filter=t,this.asyncDataBehavior.executeFetch(),[2]}))}))},e.prototype.getFetchParams=function(){return{filter:this.filter}},e.prototype.isShowingPanelDidUpdate=function(){this.hasFocus=this.isPanelOpen},e.prototype.whenReceiveData=function(e){this.options=e.data,this.isPanelOpen=!0},e.prototype.componentDidUpdate=function(){this.requestCheckValidity&&(this.formFieldBehavior.checkValidity(this.value),this.requestCheckValidity=!1,this.selectChange.emit(this.value))},e.prototype.whenBlur=function(e){var t=this;this.selectPanel.contains(e)||(this.isPanelOpen&&(this.isPanelOpen=!this.isPanelOpen),!1===this.requestCheckValidity&&!1===this.isPanelOpen&&(this.options.some((function(e){return e.title.toString().toUpperCase().includes(t.acInputBase.value.toUpperCase())}))||(this.acInputBase.value="")),this.formFieldBehavior.setTouched())},e.prototype.componentDidUnload=function(){this.isPanelOpen=!1},e.prototype.render=function(){var e=this,t=this.SelectPanel;return Object(n.f)(n.a,{class:"ac-autocomplete"},Object(n.f)("ac-input-base",{ref:function(t){return e.acInputBase=t},class:"ac-autocomplete__input",name:this.name,disabled:this.disabled,type:"text",label:this.label,value:this.selectedText,onKeyUp:this.handleDebouncedKeyUp,size:this.size},this.loading&&Object(n.f)(u.a,{slot:"item-end",class:"ac-autocomplete__icon",icon:h.f,size:14,anim:"spin"})),Object(n.f)(t,{ref:function(t){return e.selectPanel=t},class:"ac-autocomplete__panel",popperPivot:this.host,reset:!this.isPanelOpen},Object(n.f)("ul",{class:"ac-autocomplete__list ac-list"},0===this.options.length?Object(n.f)("li",{class:"ac-list__item"},this.noResultsLabel," ",this.filter):this.options.map((function(t,i){return Object(n.f)("li",{class:"ac-list__item",key:i,tabIndex:i,value:t.value,onClick:function(){return e.handleSelected(t)}},t.title)})))))},Object.defineProperty(e.prototype,"host",{get:function(){return Object(n.e)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{error:["errorDidUpdate"],isPanelOpen:["isShowingPanelDidUpdate"]}},enumerable:!0,configurable:!0}),e}();d([a.a],b.prototype,"handleSelected",null),d([a.a,Object(s.a)(200)],b.prototype,"handleDebouncedKeyUp",null),b.style=".ac-autocomplete{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column}.ac-autocomplete .ac-autocomplete__icon{margin:8px}"}}]);
//# sourceMappingURL=82.38d1bf7bd17d43e76449.js.map