webpackJsonp([47],{304:function(n,e,t){t(933);var o=t(89)(t(497),t(841),null,null);o.options.__file="/Users/JU53/Documents/website/b2b4.0/b2b-seller4.0/src/components/subNavBars/ContactBar.vue",o.esModule&&Object.keys(o.esModule).some(function(n){return"default"!==n&&"__esModule"!==n}),o.options.functional,n.exports=o.exports},497:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{selectedSubNav:0,menuList:[{title:'<i class="icon-contact-person"></i>联系人',url:"/contact",type:0},{title:'<i class="icon-gongsi1"></i>公司',url:"/contact",type:1}]}},mounted:function(){this.$store.dispatch("setNavIndex",4),1===parseInt(this.$route.query.type)?this.selectedSubNav=1:this.selectedSubNav=0},watch:{$route:function(){1===parseInt(this.$route.query.type)?this.selectedSubNav=1:this.selectedSubNav=0}},methods:{changeMenu:function(n,e){this.selectedSubNav=n,this.$store.commit("CONTACT_TYPE",{contactType:e})}}}},656:function(n,e,t){e=n.exports=t(49)(),e.push([n.i,'/**\n * 二级菜单样式\n */\n.topMenu {\n  width: 1200px;\n  margin: 0 auto;\n  border-bottom: 1px solid #dfe3eb;\n  margin-bottom: 16px;\n}\n.topMenu .top-title {\n  font-size: 20px;\n  line-height: 28px;\n  color: #33475B;\n  margin-top: 18px;\n}\n.topMenu .menu {\n  margin-top: 4px;\n}\n.topMenu .menu a {\n  margin-left: 2.8%;\n}\n.topMenu .menu li {\n  display: inline-block;\n  font-size: 13px;\n  padding: 16px 0;\n  position: relative;\n  cursor: pointer;\n  color: #7C98B6;\n}\n.topMenu .menu li .icon-active {\n  display: none;\n}\n.topMenu .menu a:first-child {\n  margin-left: 0;\n}\n.topMenu .menu .icon,\n.topMenu .menu [class^="icon"] {\n  margin-right: 5px;\n}\n.topMenu .menu .curr {\n  border-bottom: 4px solid #5488F9;\n  color: #5488F9;\n}\n.topMenu .menu .curr .icon-unactive {\n  display: none;\n}\n.topMenu .menu .curr .icon-active {\n  display: inline-block;\n}\n.router-view {\n  width: 1200px;\n  margin: 0 auto;\n}\n',""])},841:function(n,e,t){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"topMenu"},[t("div",{staticClass:"top-title"},[n._v("联系人管理")]),n._v(" "),t("ul",{staticClass:"menu"},n._l(n.menuList,function(e,o){return t("router-link",{key:o,attrs:{to:{path:e.url,query:{type:e.type}}}},[t("li",{class:{curr:o===n.selectedSubNav},domProps:{innerHTML:n._s(e.title)},on:{click:function(t){n.changeMenu(o,e.type)}}})])}))]),n._v(" "),t("div",{staticClass:"router-view"},[t("router-view")],1)])},staticRenderFns:[]},n.exports.render._withStripped=!0},933:function(n,e,t){var o=t(656);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t(88)("9bf4c4fa",o,!1)}});
//# sourceMappingURL=47.ab502e7fc81b3498d780.js.map