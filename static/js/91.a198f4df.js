(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{"../core/dist/esm-es5/ac-toggle.entry.js":function(e,t,o){"use strict";o.r(t),o.d(t,"ac_toggle",(function(){return s}));var n=o("../core/dist/esm-es5/index-9253740e.js"),a=(o("../core/dist/esm-es5/component-behavior-a1704b91.js"),o("../core/dist/esm-es5/bind-43838568.js")),r=(o("../core/dist/esm-es5/_commonjsHelpers-97e6d7b1.js"),o("../core/dist/esm-es5/browser-c2ce94f2.js"),o("../core/dist/esm-es5/index-5c7685cc.js")),l=function(e,t,o,n){return new(o||(o=Promise))((function(a,r){function l(e){try{i(n.next(e))}catch(t){r(t)}}function c(e){try{i(n.throw(e))}catch(t){r(t)}}function i(e){var t;e.done?a(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(l,c)}i((n=n.apply(e,t||[])).next())}))},c=function(e,t){var o,n,a,r,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function c(r){return function(c){return function(r){if(o)throw new TypeError("Generator is already executing.");for(;l;)try{if(o=1,n&&(a=2&r[0]?n.return:r[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,r[1])).done)return a;switch(n=0,a&&(r=[2&r[0],a.value]),r[0]){case 0:case 1:a=r;break;case 4:return l.label++,{value:r[1],done:!1};case 5:l.label++,n=r[1],r=[0];continue;case 7:r=l.ops.pop(),l.trys.pop();continue;default:if(!(a=(a=l.trys).length>0&&a[a.length-1])&&(6===r[0]||2===r[0])){l=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){l.label=r[1];break}if(6===r[0]&&l.label<a[1]){l.label=a[1],a=r;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(r);break}a[2]&&l.ops.pop(),l.trys.pop();continue}r=t.call(e,l)}catch(c){r=[6,c],n=0}finally{o=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,c])}}},i=function(e,t,o,n){var a,r=arguments.length,l=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(l=(r<3?a(l):r>3?a(t,o,l):a(t,o))||l);return r>3&&l&&Object.defineProperty(t,o,l),l},s=function(){function e(e){Object(n.g)(this,e),this.formFieldBehavior=new r.a(this),this.direction="right",this.checked=!1}return e.prototype.handleChange=function(){this.checked=!this.checked},e.prototype.componentDidLoad=function(){},e.prototype.componentDidUnload=function(){},e.prototype.componentWillLoad=function(){},e.prototype.getFormFieldBehavior=function(){return l(this,void 0,void 0,(function(){return c(this,(function(e){return[2,this.formFieldBehavior]}))}))},e.prototype.render=function(){var e,t=this;return Object(n.f)(n.a,{class:(e={},e["ac-toggle--label-"+this.direction]=void 0!==this.direction,e["ac-toggle--disabled"]=this.disabled,e)},Object(n.f)("label",{class:"ac-toggle__container"},Object(n.f)("input",{ref:function(e){return t.nativeInput=e},class:"ac-toggle__native",type:"checkbox",name:this.name,value:this.value,disabled:this.disabled,onChange:this.handleChange,checked:this.checked}),Object(n.f)("div",{class:"ac-toggle__custom"}),this.label&&Object(n.f)("div",{class:"ac-toggle__label"},this.label)))},Object.defineProperty(e.prototype,"host",{get:function(){return Object(n.e)(this)},enumerable:!0,configurable:!0}),e}();i([a.a],s.prototype,"handleChange",null),s.style='ac-toggle{display:inline-block}ac-toggle .ac-toggle__container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ac-toggle .ac-toggle__container .ac-toggle__label{margin:0;padding:0 0 0 8px;color:var(--color-neutral-darker, #646464);font-size:16px;line-height:1;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ac-toggle .ac-toggle__native{display:none}ac-toggle .ac-toggle__custom{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;min-width:40px;max-width:40px;height:20px;-webkit-transition:ease-in-out 0.05s;transition:ease-in-out 0.05s;border-radius:10px;background-color:var(--color-neutral-light, #E6E6E6);cursor:pointer}ac-toggle .ac-toggle__custom:before{content:"";position:absolute;width:12px;height:12px;margin:0 4px;-webkit-transition:ease-in-out 0.05s;transition:ease-in-out 0.05s;border-radius:100%;background-color:var(--color-neutral-contrast, #FFFFFF)}ac-toggle .ac-toggle__native:checked+.ac-toggle__custom{background-color:var(--color-primary-normal, #00466F)}ac-toggle .ac-toggle__native:checked+.ac-toggle__custom:before{-webkit-transform:translateX(20px);transform:translateX(20px)}ac-toggle .ac-toggle__native:checked+.ac-toggle__custom+.ac-toggle__label{color:var(--color-primary-normal, #00466F)}ac-toggle.ac-toggle--disabled{cursor:not-allowed}ac-toggle.ac-toggle--disabled .ac-toggle__container{pointer-events:none}ac-toggle.ac-toggle--disabled .ac-toggle__label{color:var(--color-neutral-normal, #C8C8C8)}ac-toggle.ac-toggle--disabled .ac-toggle__custom{border-color:var(--color-neutral-light, #E6E6E6);background:var(--color-neutral-lighter, #F5F5F5)}ac-toggle.ac-toggle--disabled .ac-toggle__native:checked+.ac-toggle__custom{border-color:var(--color-neutral-normal, #C8C8C8);background:var(--color-neutral-normal, #C8C8C8)}ac-toggle.ac-toggle--disabled .ac-toggle__native:checked+.ac-toggle__custom+.ac-toggle__label{color:var(--color-neutral-dark, #A0A0A0)}ac-toggle.ac-toggle--label-left .ac-toggle__container{-ms-flex-direction:row-reverse;flex-direction:row-reverse}ac-toggle.ac-toggle--label-left .ac-toggle__label{padding-right:8px}ac-toggle.ac-toggle--label-left .ac-toggle__helper-text{padding-right:24px;padding-left:0;text-align:right}'}}]);
//# sourceMappingURL=91.47b1e1b46c4288dc3674.js.map