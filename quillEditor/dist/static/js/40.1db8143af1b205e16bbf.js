webpackJsonp([40],{302:function(n,e,t){t(383);var i=t(89)(t(374),t(381),null,null);i.options.__file="/Users/JU53/Documents/website/b2b4.0/b2b-seller4.0/src/views/systemSetting/systemIndex.vue",i.esModule&&Object.keys(i.esModule).some(function(n){return"default"!==n&&"__esModule"!==n}),i.options.functional,n.exports=i.exports},374:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"systemIndex",data:function(){return{serverLevel:"1"}},components:{},methods:{},created:function(){this.serverLevel=window.localStorage.serverLevel}}},376:function(n,e,t){e=n.exports=t(49)(),e.push([n.i,'/**\n * common list start by\n */\n/*下拉样式*/\nselect {\n  /*Chrome和Firefox显示不一致，重写样式*/\n  /*将将默认的select选择框样式清除；支持高级版浏览器  I9以下不支持*/\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  /*在选择框的最右侧中间显示小箭头图片*/\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAzklEQVQoU5WRuxGCQBCGd2HE1BIs4WZo4Ax8hBrKGGAHWoEtaAckXGwKBlwDHNKBJRifg+vcjTiKJLfZPr59/IvgaOhYD+5AOFsvAfDQ6GBylcm9byKbRsz3sCqzFO2EcB6dgYDKXKy6gCn2EAsg2quLSCzAeDzygocEpEplYttCNj7UFQCeVJYeTfxzg0n6gb4Rwc50evsFANZlnsZtk5+j7a4I0kCIyAlorHLBv9f8U4ktNtwnKoigfuoB7wrRK6tRrtFD2aea+x9cP/0COOxPDbZ9xqoAAAAASUVORK5CYII=") no-repeat scroll 88% center transparent;\n  /*为下拉小箭头留出一点位置，避免被文字覆盖*/\n  padding-right: 24px;\n}\n/*输入框 下拉框默认文字颜色，边框颜色 start*/\ninput::-webkit-input-placeholder {\n  /* WebKit browsers */\n  color: #CBD6E2;\n}\ninput:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #CBD6E2;\n}\ninput::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #CBD6E2;\n}\ninput:-ms-input-placeholder {\n  /* Internet Explorer 10+ */\n  color: #CBD6E2;\n}\ninput,\nselect {\n  border: 1px solid #cbd6e3;\n  border-radius: 4px;\n}\n/*输入框 下拉框默认文字颜色，边框颜色 end*/\n/*订单物流 顶部菜单*/\n.whitebg-blackfc-btn {\n  background: #fff;\n  border: 1px solid #dfe3eb;\n  border-radius: 4px;\n}\n.bluebg-whitefc-btn {\n  background: #5488F9;\n  color: #fff;\n  border-radius: 4px;\n}\n.gray-btn {\n  background: #EAF0F6;\n  border: 1px solid #DFE3EB;\n  border-radius: 4px;\n  color: #B0C1D4;\n}\n.input-caveat {\n  border: 1px solid #FF3B6E;\n}\n.ft-green {\n  color: #5488F9;\n}\n.ft-red {\n  color: #F86563;\n}\n.bg-red {\n  background: #FF3B6E;\n}\n.bg-blue {\n  background: #5488F9;\n}\n.margintop16 {\n  margin-top: 16px;\n}\n/*展示模块*/\n.display-module {\n  background: #F5F8FA;\n  /*  margin-left:7.1%;\n  margin-right:7.1%;*/\n  padding: 16px 20px;\n  overflow: hidden;\n}\n.display-module .statistics:first-child {\n  margin-left: 0;\n}\n.display-module .statistics {\n  display: inline-block;\n  margin-left: 5.5%;\n}\n.display-module .statistics .desc {\n  line-height: 17px;\n}\n.display-module .statistics .money {\n  line-height: 25px;\n  font-size: 18px;\n}\n.display-module .right-btn {\n  display: inline-block;\n  float: right;\n  width: 120px;\n  padding: 7px 0;\n  text-align: center;\n  color: #fff;\n  border-radius: 4px;\n  font-size: 14px;\n  line-height: 20px;\n  cursor: pointer;\n}\n.display-module .right-btn:hover {\n  opacity: 0.7;\n}\n/*搜索模块*/\n.select-keyword {\n  height: 35px;\n  line-height: 35px;\n  padding-left: 5px;\n  color: #33475B;\n  border: 1px solid #cbd6e3;\n  outline: none;\n}\n.select-time {\n  display: inline-block;\n}\n.select-time .el-input__inner {\n  border: 1px solid #cbd6e3;\n  float: left;\n}\n.select-time .el-input__inner::-webkit-input-placeholder {\n  /* WebKit browsers */\n  color: #CBD6E2;\n}\n.select-time .el-input__inner:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #CBD6E2;\n}\n.select-time .el-input__inner::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #CBD6E2;\n}\n.select-time .el-input__inner:-ms-input-placeholder {\n  /* Internet Explorer 10+ */\n  color: #CBD6E2;\n}\n.select-time .el-date-editor .el-picker-panel {\n  right: 0px;\n}\n.search {\n  display: inline-block;\n  border-radius: 4px;\n  float: left;\n  height: 34px;\n  line-height: 34px;\n  overflow: hidden;\n}\n.search .select-keyword {\n  border: none;\n  outline: none;\n}\n.search .search-input {\n  padding-left: 5px;\n  border-radius: 5px;\n  border: none;\n  border-left: 1px solid #cbd6e3;\n  border-radius: 0 5px 5px 0;\n  outline: none;\n}\n.search-module {\n  /*  margin-left:7.1%;\n  margin-right:7.1%;*/\n  background: #fff;\n  padding: 16px 20px;\n}\n.search-module .title {\n  display: inline-block;\n  font-size: 16px;\n  line-height: 33px;\n  font-weight: 600;\n}\n.search-module .right-module {\n  float: right;\n}\n.search-module .right-module .export {\n  display: inline-block;\n  vertical-align: top;\n  border: 1px solid #cbd6e3;\n  border-radius: 4px;\n  margin-left: 8px;\n  line-height: 34px;\n  cursor: pointer;\n  width: 30px;\n  text-align: center;\n}\n.search-module .right-module .export i {\n  font-size: 14px;\n}\n.vertical-line {\n  display: inline-block;\n  margin: 6px 16px;\n  width: 2px;\n  height: 24px;\n  background: #cbd6e3;\n}\n.data-list-seven .el-table {\n  /*    margin-left:7.1%;\n    margin-right:7.1%;*/\n  width: 85.8%;\n}\n.data-list-seven .list-title {\n  background: #F5F8FA;\n  border-bottom: 1px solid #dfe3eb;\n  border-top: 1px solid #dfe3eb;\n  /*      margin-left:7.1%;\n      margin-right:7.1%;*/\n  padding: 13px 20px;\n  overflow: hidden;\n}\n.data-list-seven .list-title li {\n  display: inline-block;\n  float: left;\n}\n.data-list-seven .list-data {\n  background: #fff;\n  /*    margin-left:7.1%;\n    margin-right:7.1%;*/\n  overflow: hidden;\n  padding: 0 20px;\n  height: 484px;\n}\n.data-list-seven .list-data li p {\n  display: inline-block;\n  float: left;\n  padding: 16px 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  border-bottom: 1px solid #dfe3eb;\n}\n.data-list-seven .list-data .createtime {\n  width: 16.3%;\n}\n.data-list-seven .list-data .ordercode {\n  width: 16.2%;\n}\n.data-list-seven .list-data .type {\n  width: 11%;\n}\n.data-list-seven .list-data .source {\n  width: 12.5%;\n}\n.data-list-seven .list-data .otheraccount {\n  width: 14.2%;\n}\n.data-list-seven .list-data .ownaccount {\n  width: 17.2%;\n}\n.data-list-seven .list-data .amount {\n  width: 12.6%;\n}\n.paging-column {\n  padding: 16px 0 30px 0;\n  overflow: hidden;\n  background: #fff;\n}\n.paging-column .el-pagination {\n  float: right;\n}\n/*无数据*/\n.center {\n  text-align: center;\n}\n.n-bindAccount {\n  background: #fff;\n  /*  margin-left:7.1%;\n  margin-right:7.1%;*/\n  overflow: hidden;\n  padding: 168px 0;\n}\n.n-bindAccount .title_desc {\n  font-size: 18px;\n  line-height: 25px ;\n}\n.n-bindAccount .bind_account {\n  font-size: 14px;\n  line-height: 20px ;\n}\n.n-bindAccount .display-img img {\n  width: 350px;\n}\n.n-bindAccount .btn {\n  display: inline-block;\n  width: 140px;\n  font-size: 14px;\n  line-height: 21px;\n  padding: 9px 0;\n  cursor: pointer;\n}\n/*左侧菜单*/\n.left-menu-small {\n  left: 7.1%;\n  width: 200px;\n  top: 51px;\n  position: fixed;\n}\n.left-menu-small .big-title {\n  font-size: 20px;\n  line-height: 28px;\n  padding-top: 18px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #dfe3eb;\n}\n.left-menu-small .menu {\n  margin-top: 10px;\n}\n.left-menu-small .menu .option {\n  padding: 10px 19px;\n  display: block;\n  font-size: 14px;\n  color: #33475B;\n  letter-spacing: 0;\n  line-height: 20px;\n}\n.left-menu-small .menu .router-link-active {\n  color: #5488F9;\n  border-left: 2px solid #5488F9;\n  background: rgba(84, 136, 249, 0.06);\n}\n/*右侧内容菜单*/\n.margintop31 {\n  margin-top: 31px;\n}\n.right-content {\n  margin-left: 7.1%;\n  margin-right: 7.1%;\n  padding-left: 220px;\n  margin-top: 64px;\n}\n.right-content .u-right {\n  border: 1px solid #dfe3eb;\n  border-radius: 4px;\n  background: #fff;\n  padding: 15px 0px;\n  min-height: 668px;\n}\n.right-content .u-right .set-bottm-module {\n  padding: 10px 25px;\n}\n.right-content .u-right .set-bottm-module .systemsetting {\n  margin-top: 22px;\n}\n.right-content .u-right .top-info {\n  padding: 0 25px;\n}\n.right-content .u-right .top-info .left-image {\n  width: 80px;\n  height: 80px;\n  border-radius: 40px;\n  display: inline-block;\n}\n.right-content .u-right .top-info .right-desc {\n  margin-left: 16px;\n  display: inline-block;\n  vertical-align: top;\n  margin-top: 10px;\n}\n.right-content .u-right .top-info .right-desc .nickname {\n  font-size: 18px;\n  line-height: 25px;\n}\n.right-content .u-right .top-info .right-desc .company-name {\n  margin-top: 8px;\n  font-size: 14px;\n  color: #7C98B6;\n  letter-spacing: 0;\n}\n.right-content .u-right .set-module {\n  padding: 20px 25px;\n  border-bottom: 1px solid #dfe3eb;\n}\n.right-content .u-right .systemsetting {\n  font-size: 14px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.right-content .u-right .systemsetting i {\n  font-style: normal;\n}\n.right-content .u-right .systemsetting .display-desc {\n  vertical-align: -webkit-baseline-middle;\n  display: inline-block;\n}\n.right-content .u-right .systemsetting .display-desc .label {\n  width: 60px;\n  text-align: right;\n  display: inline-block;\n}\n.right-content .u-right .systemsetting .display-desc .display-data {\n  margin-left: 16px;\n  color: #4F6D95;\n}\n.right-content .u-right .systemsetting .btn {\n  float: right;\n  color: #fff;\n  width: 100px;\n  text-align: center;\n  padding: 8px 0;\n  background: #5488F9;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.right-content .u-right .systemsetting .btn:hover {\n  opacity: 0.7;\n}\n.time-sel {\n  display: inline-block;\n  position: relative;\n  width: 321px;\n  border: 1px solid #cbd6e3;\n  border-radius: 4px;\n  vertical-align: middle;\n}\n.time-sel .select-keyword {\n  position: absolute;\n  left: 0;\n  width: 100px;\n  border: 0;\n}\n.time-sel .select-time {\n  padding-left: 100px;\n  height: 34px;\n  line-height: 34px;\n}\n.time-sel .select-time .el-date-editor .el-picker-panel {\n  left: 0;\n  right: auto;\n}\n.time-sel .select-time .el-input__inner {\n  height: 17px;\n  border: 0;\n  border-left: 1px solid #cbd6e3;\n  border-radius: 0;\n}\n/*搜索*/\n.u-search {\n  padding: 5px 8px 6px 6px;\n  border-left: 1px solid #cbd6e3;\n  color: #CBD6E2;\n  background-color: #f5f8fa;\n  font-size: 20px;\n  border-radius: 0 4px 4px 0;\n}\n/*弹框*/\n.el-dialog__header {\n  border: 1px solid #DFE3EB;\n  padding-bottom: 13px;\n}\n/*输入框警告提示*/\n.input-verify {\n  border: 1px solid #cbd6e3;\n  border-radius: 4px;\n}\n.input-is-danger {\n  border: 1px solid #FF3B6E;\n  border-radius: 4px;\n}\n.input-is-danger .is-show {\n  display: block;\n}\n.input-is-danger .input-bottom-remid {\n  font-size: 12px;\n  color: #FF3B6E;\n  line-height: 16px;\n  padding: 5px 0 7px 10px;\n  background: #ffebf0;\n}\n.input-is-danger .input-bottom-remid i {\n  margin-right: 7px;\n}\n.input-bottom-remid {\n  display: none;\n}\n',""])},381:function(n,e,t){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"left-menu-small"},[t("div",{staticClass:"big-title"},[n._v("设置")]),n._v(" "),t("div",{staticClass:"menu"},[t("router-link",{staticClass:"option",attrs:{to:{path:"/setAccount"}}},[t("p",[n._v("账号设置")])]),n._v(" "),"0"!==n.serverLevel?t("router-link",{staticClass:"option",attrs:{to:{path:"/setKeyword"}}},[t("p",[n._v("关键字设置")])]):n._e(),n._v(" "),t("router-link",{staticClass:"option",attrs:{to:{path:"/channelList"}}},[t("p",[n._v("绑定账号")])])],1)])},staticRenderFns:[]},n.exports.render._withStripped=!0},383:function(n,e,t){var i=t(376);"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t(88)("6dd9dba6",i,!1)}});
//# sourceMappingURL=40.1db8143af1b205e16bbf.js.map