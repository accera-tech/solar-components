(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{"../core/dist/esm-es5/ac-check.entry.js":function(e,c,t){"use strict";t.r(c),t.d(c,"ac_check",(function(){return s}));var r=t("../core/dist/esm-es5/index-9253740e.js"),o=(t("../core/dist/esm-es5/component-behavior-a1704b91.js"),t("../core/dist/esm-es5/bind-43838568.js")),a=(t("../core/dist/esm-es5/_commonjsHelpers-97e6d7b1.js"),t("../core/dist/esm-es5/browser-c2ce94f2.js"),t("../core/dist/esm-es5/index-5c7685cc.js")),n=function(e,c,t,r){return new(t||(t=Promise))((function(o,a){function n(e){try{l(r.next(e))}catch(c){a(c)}}function i(e){try{l(r.throw(e))}catch(c){a(c)}}function l(e){var c;e.done?o(e.value):(c=e.value,c instanceof t?c:new t((function(e){e(c)}))).then(n,i)}l((r=r.apply(e,c||[])).next())}))},i=function(e,c){var t,r,o,a,n={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;n;)try{if(t=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return n.label++,{value:a[1],done:!1};case 5:n.label++,r=a[1],a=[0];continue;case 7:a=n.ops.pop(),n.trys.pop();continue;default:if(!(o=(o=n.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){n=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){n.label=a[1];break}if(6===a[0]&&n.label<o[1]){n.label=o[1],o=a;break}if(o&&n.label<o[2]){n.label=o[2],n.ops.push(a);break}o[2]&&n.ops.pop(),n.trys.pop();continue}a=c.call(e,n)}catch(i){a=[6,i],r=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}},l=function(e,c,t,r){var o,a=arguments.length,n=a<3?c:null===r?r=Object.getOwnPropertyDescriptor(c,t):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,c,t,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(n=(a<3?o(n):a>3?o(c,t,n):o(c,t))||n);return a>3&&n&&Object.defineProperty(c,t,n),n},s=function(){function e(e){Object(r.g)(this,e),this.formFieldBehavior=new a.a(this),this.direction="right",this.type="checkbox"}return e.prototype.componentDidLoad=function(){},e.prototype.componentDidUnload=function(){},e.prototype.componentWillLoad=function(){},e.prototype.checkedDidUpdate=function(){var e=this;this.checked&&"radio"===this.type&&Array.from(document.querySelectorAll('ac-check[name="'+this.name+'"]')).forEach((function(c){c.value!==e.value&&c.checked&&(c.checked=!1)}))},e.prototype.getNativeFormField=function(){return n(this,void 0,void 0,(function(){return i(this,(function(e){return[2,this.nativeInput]}))}))},e.prototype.getFormFieldBehavior=function(){return n(this,void 0,void 0,(function(){return i(this,(function(e){return[2,this.formFieldBehavior]}))}))},e.prototype.handleChange=function(){this.checked=this.nativeInput.checked,this.formFieldBehavior.setDirty(),this.formFieldBehavior.checkValidity()},e.prototype.render=function(){var e,c=this;return Object(r.f)(r.a,{class:(e={},e["ac-check--label-"+this.direction]=void 0!==this.direction,e["ac-check--"+this.type]=void 0!==this.type,e["ac-check--disabled"]=this.disabled,e["ac-check--error"]=!!this.error,e)},Object(r.f)("label",{class:"ac-check__container"},Object(r.f)("input",{ref:function(e){return c.nativeInput=e},class:"ac-check__native",type:this.type,name:this.name,value:this.value,onChange:this.handleChange,disabled:this.disabled,checked:this.checked}),Object(r.f)("div",{class:"ac-check__custom"}),this.label&&Object(r.f)("div",{class:"ac-check__label"},this.label)||Object(r.f)("div",{class:"ac-check__label"},Object(r.f)("slot",{name:"label"}))),this.error&&"string"===typeof this.error||this.helperText&&"string"===typeof this.helperText&&Object(r.f)("label",{class:"ac-check__helper-text"},this.error||this.helperText))},Object.defineProperty(e.prototype,"host",{get:function(){return Object(r.e)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{checked:["checkedDidUpdate"]}},enumerable:!0,configurable:!0}),e}();l([o.a],s.prototype,"handleChange",null),s.style='ac-check{display:inline-block}ac-check .ac-check__container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ac-check .ac-check__container .ac-check__label{margin:0;padding:0 0 0 8px;color:var(--color-neutral-darker, #646464);font-size:16px;line-height:1;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ac-check .ac-check__native{display:none}ac-check .ac-check__custom{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:20px;height:20px;margin:0;padding:0;border:2px solid var(--color-neutral-light, #E6E6E6);outline:none;background:var(--color-neutral-contrast, #FFFFFF);cursor:pointer}ac-check .ac-check__helper-text{display:block;margin-top:8px;padding-left:28px;color:var(--color-neutral-darker, #646464);font-size:12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ac-check.ac-check--checkbox .ac-check__custom{border-radius:4px}ac-check.ac-check--checkbox .ac-check__custom:before{content:"";position:absolute;z-index:1;top:3px;left:3px;-webkit-box-sizing:initial;box-sizing:initial;width:8px;-webkit-transition:all ease-in-out 0.1s;transition:all ease-in-out 0.1s;border:2px solid transparent;border-top-style:none;border-right-style:none}ac-check.ac-check--radio .ac-check__custom{border-radius:100%}ac-check.ac-check--radio .ac-check__custom:before{content:"";position:absolute;top:4px;left:4px;-webkit-box-sizing:initial;box-sizing:initial;width:8px;height:8px;-webkit-transform:scale(2);transform:scale(2);-webkit-transition:-webkit-transform ease-in-out 0.1s;transition:-webkit-transform ease-in-out 0.1s;transition:transform ease-in-out 0.1s;transition:transform ease-in-out 0.1s, -webkit-transform ease-in-out 0.1s;border-radius:100%;background-color:transparent}ac-check .ac-check__native:checked+.ac-check__custom{border-color:var(--color-primary-normal, #00466F);background:var(--color-primary-normal, #00466F)}ac-check .ac-check__native:checked+.ac-check__custom+.ac-check__label{color:var(--color-primary-normal, #00466F)}ac-check.ac-check--checkbox .ac-check__native:checked+.ac-check__custom:before{height:5px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);border-color:var(--color-neutral-contrast, #FFFFFF)}ac-check.ac-check--radio .ac-check__native:checked+.ac-check__custom:before{-webkit-transform:scale(1);transform:scale(1);background-color:var(--color-neutral-contrast, #FFFFFF)}ac-check.ac-check--disabled{cursor:not-allowed}ac-check.ac-check--disabled .ac-check__container{pointer-events:none}ac-check.ac-check--disabled .ac-check__label{color:var(--color-neutral-normal, #C8C8C8)}ac-check.ac-check--disabled .ac-check__custom{border-color:var(--color-neutral-light, #E6E6E6);background:var(--color-neutral-lighter, #F5F5F5)}ac-check.ac-check--disabled .ac-check__native:checked+.ac-check__custom{border-color:var(--color-neutral-normal, #C8C8C8);background:var(--color-neutral-normal, #C8C8C8)}ac-check.ac-check--disabled .ac-check__native:checked+.ac-check__custom+.ac-check__label{color:var(--color-neutral-dark, #A0A0A0)}ac-check.ac-check--error .ac-check__label{color:var(--color-alert-normal, #F0000A)}ac-check.ac-check--error .ac-check__custom{border-color:var(--color-alert-normal, #F0000A)}ac-check.ac-check--error .ac-check__helper-text{color:var(--color-alert-normal, #F0000A)}ac-check.ac-check--error .ac-check__native:checked+.ac-check__custom{border-color:var(--color-alert-normal, #F0000A);background:var(--color-alert-normal, #F0000A)}ac-check.ac-check--error .ac-check__native:checked+.ac-check__custom+.ac-check__label{color:var(--color-alert-normal, #F0000A)}ac-check.ac-check--label-left .ac-check__container{-ms-flex-direction:row-reverse;flex-direction:row-reverse}ac-check.ac-check--label-left .ac-check__label{padding-right:8px}ac-check.ac-check--label-left .ac-check__helper-text{padding-right:24px;padding-left:0;text-align:right}'}}]);
//# sourceMappingURL=86.684a803deddfeb4996ea.js.map