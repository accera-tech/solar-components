(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{"../core/dist/esm-es5/ac-text-editor.entry.js":function(o,e,r){"use strict";r.r(e),r.d(e,"ac_text_editor",(function(){return n}));var t=r("../core/dist/esm-es5/index-9253740e.js"),i=(r("../core/dist/esm-es5/component-behavior-a1704b91.js"),r("../core/dist/esm-es5/bind-43838568.js")),a=(r("../core/dist/esm-es5/_commonjsHelpers-97e6d7b1.js"),r("../core/dist/esm-es5/browser-c2ce94f2.js"),r("../core/dist/esm-es5/index-5c7685cc.js")),d=function(o,e,r,t){var i,a=arguments.length,d=a<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,r):t;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)d=Reflect.decorate(o,e,r,t);else for(var n=o.length-1;n>=0;n--)(i=o[n])&&(d=(a<3?i(d):a>3?i(e,r,d):i(e,r))||d);return a>3&&d&&Object.defineProperty(e,r,d),d},n=function(){function o(o){Object(t.g)(this,o),this.formFieldBehavior=new a.a(this),this.value="",this.placeholder=""}return o.prototype.componentDidLoad=function(){var o=this;this.loadMedium().then((function(e){o.mediumEditor=new e(".ac-text-editor__editable",{toolbar:{buttons:["bold","italic","underline","anchor","h2","h3"]},placeholder:{text:o.placeholder},anchor:{placeholderText:"Link"}}),o.mediumEditor.subscribe("editableInput",(function(){o.handleChange()}))})),this.mediumRef.innerHTML=this.value},o.prototype.componentDidUnload=function(){},o.prototype.loadMedium=function(){return new Promise((function(o){var e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src","https://cdn.jsdelivr.net/npm/medium-editor@5.23.3/dist/js/medium-editor.min.js"),e.onload=function(){return o(window.MediumEditor)},e.onreadystatechange=function(){return o(window.MediumEditor)},document.head.appendChild(e)}))},o.prototype.handleFocus=function(){this.hasFocus=!0},o.prototype.handleBlur=function(){this.hasFocus=!1},o.prototype.handleChange=function(){this.value=this.mediumRef.innerHTML},o.prototype.render=function(){var o=this;return Object(t.f)(t.a,{class:{"ac-text-editor--focus":this.hasFocus}},Object(t.f)("div",{ref:function(e){return o.mediumRef=e},class:"ac-text-editor__editable",onFocus:this.handleFocus,onBlur:this.handleBlur,onChange:this.handleChange}),Object(t.f)("input",{name:this.name,value:this.value,type:"hidden"}))},Object.defineProperty(o.prototype,"host",{get:function(){return Object(t.e)(this)},enumerable:!0,configurable:!0}),o}();d([i.a],n.prototype,"handleFocus",null),d([i.a],n.prototype,"handleBlur",null),d([i.a],n.prototype,"handleChange",null),n.style='@-webkit-keyframes medium-editor-image-loading{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes medium-editor-image-loading{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes medium-editor-pop-upwards{0%{opacity:0;-webkit-transform:matrix(0.97, 0, 0, 1, 0, 12);transform:matrix(0.97, 0, 0, 1, 0, 12)}20%{opacity:0.7;-webkit-transform:matrix(0.99, 0, 0, 1, 0, 2);transform:matrix(0.99, 0, 0, 1, 0, 2)}40%{opacity:1;-webkit-transform:matrix(1, 0, 0, 1, 0, -1);transform:matrix(1, 0, 0, 1, 0, -1)}100%{-webkit-transform:matrix(1, 0, 0, 1, 0, 0);transform:matrix(1, 0, 0, 1, 0, 0)}}@keyframes medium-editor-pop-upwards{0%{opacity:0;-webkit-transform:matrix(0.97, 0, 0, 1, 0, 12);transform:matrix(0.97, 0, 0, 1, 0, 12)}20%{opacity:0.7;-webkit-transform:matrix(0.99, 0, 0, 1, 0, 2);transform:matrix(0.99, 0, 0, 1, 0, 2)}40%{opacity:1;-webkit-transform:matrix(1, 0, 0, 1, 0, -1);transform:matrix(1, 0, 0, 1, 0, -1)}100%{-webkit-transform:matrix(1, 0, 0, 1, 0, 0);transform:matrix(1, 0, 0, 1, 0, 0)}}.medium-editor-anchor-preview{font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;font-size:16px;left:0;line-height:1.4;max-width:280px;position:absolute;text-align:center;top:0;word-break:break-all;word-wrap:break-word;visibility:hidden;z-index:2000}.medium-editor-anchor-preview a{color:#fff;display:inline-block;margin:5px 5px 10px}.medium-editor-anchor-preview-active{visibility:visible}.medium-editor-dragover{background:#ddd}.medium-editor-image-loading{-webkit-animation:medium-editor-image-loading 1s infinite ease-in-out;animation:medium-editor-image-loading 1s infinite ease-in-out;background-color:#333;border-radius:100%;display:inline-block;height:40px;width:40px}.medium-editor-placeholder{position:relative}.medium-editor-placeholder:after{content:attr(data-placeholder) !important;font-style:italic;position:absolute;left:0;top:0;white-space:pre;padding:inherit;margin:inherit}.medium-editor-placeholder-relative{position:relative}.medium-editor-placeholder-relative:after{content:attr(data-placeholder) !important;font-style:italic;position:relative;white-space:pre;padding:inherit;margin:inherit}.medium-toolbar-arrow-under:after,.medium-toolbar-arrow-over:before{border-style:solid;content:"";display:block;height:0;left:50%;margin-left:-8px;position:absolute;width:0}.medium-toolbar-arrow-under:after{border-width:8px 8px 0 8px}.medium-toolbar-arrow-over:before{border-width:0 8px 8px 8px;top:-8px}.medium-editor-toolbar{font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;font-size:16px;left:0;position:absolute;top:0;visibility:hidden;z-index:2000}.medium-editor-toolbar ul{margin:0;padding:0}.medium-editor-toolbar li{float:left;list-style:none;margin:0;padding:0}.medium-editor-toolbar li button{-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;display:block;font-size:14px;line-height:1.33;margin:0;padding:15px;text-decoration:none}.medium-editor-toolbar li button:focus{outline:none}.medium-editor-toolbar li .medium-editor-action-underline{text-decoration:underline}.medium-editor-toolbar li .medium-editor-action-pre{font-family:Consolas, "Liberation Mono", Menlo, Courier, monospace;font-size:12px;font-weight:100;padding:15px 0}.medium-editor-toolbar-active{visibility:visible}.medium-editor-sticky-toolbar{position:fixed;top:1px}.medium-editor-relative-toolbar{position:relative}.medium-editor-toolbar-active.medium-editor-stalker-toolbar{-webkit-animation:medium-editor-pop-upwards 160ms forwards linear;animation:medium-editor-pop-upwards 160ms forwards linear}.medium-editor-action-bold{font-weight:bolder}.medium-editor-action-italic{font-style:italic}.medium-editor-toolbar-form{display:none}.medium-editor-toolbar-form input,.medium-editor-toolbar-form a{font-family:"Helvetica Neue", Helvetica, Arial, sans-serif}.medium-editor-toolbar-form .medium-editor-toolbar-form-row{line-height:14px;margin-left:5px;padding-bottom:5px}.medium-editor-toolbar-form .medium-editor-toolbar-input,.medium-editor-toolbar-form label{border:none;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:14px;margin:0;padding:6px;width:316px;display:inline-block}.medium-editor-toolbar-form .medium-editor-toolbar-input:focus,.medium-editor-toolbar-form label:focus{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;-webkit-box-shadow:none;box-shadow:none;outline:0}.medium-editor-toolbar-form a{display:inline-block;font-size:24px;font-weight:bolder;margin:0 10px;text-decoration:none}.medium-editor-toolbar-form-active{display:block}.medium-editor-toolbar-actions:after{clear:both;content:"";display:table}.medium-editor-element{word-wrap:break-word;min-height:30px}.medium-editor-element img{max-width:100%}.medium-editor-element sub{vertical-align:sub}.medium-editor-element sup{vertical-align:super}.medium-editor-hidden{display:none}.medium-toolbar-arrow-under:after{border-color:#000 transparent transparent transparent;top:40px}.medium-toolbar-arrow-over:before{border-color:transparent transparent #000 transparent}.medium-editor-toolbar{background-color:#000;border:none;border-radius:50px}.medium-editor-toolbar li button{background-color:transparent;border:none;-webkit-box-sizing:border-box;box-sizing:border-box;color:#ccc;height:40px;min-width:40px;padding:5px 12px;-webkit-transition:background-color 0.2s ease-in, color 0.2s ease-in;transition:background-color 0.2s ease-in, color 0.2s ease-in}.medium-editor-toolbar li button:hover{background-color:#000;color:#a2d7c7}.medium-editor-toolbar li .medium-editor-button-first{border-bottom-left-radius:50px;border-top-left-radius:50px;padding-left:24px}.medium-editor-toolbar li .medium-editor-button-last{border-bottom-right-radius:50px;border-right:none;border-top-right-radius:50px;padding-right:24px}.medium-editor-toolbar li .medium-editor-button-active{background-color:#000;color:#a2d7c7}.medium-editor-toolbar-form{background:#000;border-radius:50px;color:#ccc;overflow:hidden}.medium-editor-toolbar-form .medium-editor-toolbar-input{background:#000;-webkit-box-sizing:border-box;box-sizing:border-box;color:#ccc;height:40px;padding-left:16px;width:220px}.medium-editor-toolbar-form .medium-editor-toolbar-input::-webkit-input-placeholder{color:#f8f5f3;color:rgba(248, 245, 243, 0.8)}.medium-editor-toolbar-form .medium-editor-toolbar-input:-moz-placeholder{color:#f8f5f3;color:rgba(248, 245, 243, 0.8)}.medium-editor-toolbar-form .medium-editor-toolbar-input::-moz-placeholder{color:#f8f5f3;color:rgba(248, 245, 243, 0.8)}.medium-editor-toolbar-form .medium-editor-toolbar-input:-ms-input-placeholder{color:#f8f5f3;color:rgba(248, 245, 243, 0.8)}.medium-editor-toolbar-form a{color:#ccc;-webkit-transform:translateY(2px);transform:translateY(2px)}.medium-editor-toolbar-form .medium-editor-toolbar-close{margin-right:16px}.medium-editor-toolbar-anchor-preview{background:#000;border-radius:50px;padding:5px 12px}.medium-editor-anchor-preview a{color:#ccc;text-decoration:none}.medium-editor-toolbar-actions li,.medium-editor-toolbar-actions button{border-radius:50px}.medium-editor-toolbar{background-color:var(--color-primary-normal, #00466F);border-radius:4px}.medium-toolbar-arrow-under:after{border-color:var(--color-primary-normal, #00466F) transparent transparent transparent}.medium-editor-toolbar li button{border-radius:0}.medium-editor-toolbar li button:hover{background-color:var(--color-primary-dark, #00263c) !important}.medium-editor-toolbar li button.medium-editor-button-active{background-color:var(--color-primary-dark, #00263c) !important}.medium-editor-toolbar li button.medium-editor-button-first{border-bottom-left-radius:4px;border-top-left-radius:4px}.medium-editor-toolbar li button.medium-editor-button-last{border-bottom-right-radius:4px;border-top-right-radius:4px}.medium-editor-toolbar-form{background:var(--color-primary-normal, #00466F);border-radius:4px}.medium-editor-toolbar-form .medium-editor-toolbar-input{background:var(--color-primary-normal, #00466F) !important}.medium-editor-placeholder:after{font-style:normal;color:var(--color-neutral-dark, #A0A0A0)}ac-text-editor{display:block;max-height:300px;min-height:300px;width:100%;border:2px solid var(--color-neutral-light, #E6E6E6);border-radius:4px;background-color:var(--color-neutral-contrast, #FFFFFF)}ac-text-editor:focus{outline:none;border-color:var(--color-primary-normal, #00466F)}ac-text-editor .ac-text-editor__editable{width:100%;max-height:300px;min-height:300px;padding:8px}ac-text-editor .ac-text-editor__editable p{-webkit-margin-before:0;margin-block-start:0}ac-text-editor .ac-text-editor__editable:focus{outline:none}ac-text-editor.ac-text-editor--focus{border-color:var(--color-primary-normal, #00466F)}'}}]);
//# sourceMappingURL=90.38d1bf7bd17d43e76449.js.map