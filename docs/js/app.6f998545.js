(function(e){function t(t){for(var a,o,i=t[0],c=t[1],l=t[2],f=0,p=[];f<i.length;f++)o=i[f],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&p.push(r[o][0]),r[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(p.length)p.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(a=!1)}a&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},r={app:0},s=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/e2j-api-web/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"334c":function(e,t,n){e.exports={nowrap:"MameTan_nowrap_3mCT7"}},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-content",[n("MameTan")],1)],1)},s=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",{staticClass:"text-center"},[n("v-col",{attrs:{cols:"12"}},[n("v-toolbar",{attrs:{dark:"",color:"light-blue darken-3"}},[n("v-toolbar-title",[e._v("E2J まめ単 API")]),n("v-autocomplete",{staticClass:"mx-4",attrs:{loading:e.loading,items:e.items,"search-input":e.search,label:e.randome,clearable:"","cache-items":"",filled:"",flat:"","hide-no-data":"","hide-details":"","solo-inverted":"","data-element":"autocomplete-element"},on:{"update:searchInput":function(t){e.search=t},"update:search-input":function(t){e.search=t},blur:e.onblur},model:{value:e.select,callback:function(t){e.select=t},expression:"select"}})],1)],1)],1),n("v-timeline",{attrs:{dense:""}},e._l(e.results,(function(t,a){return n("v-timeline-item",{key:a,attrs:{small:""},scopedSlots:e._u([{key:"opposite",fn:function(){},proxy:!0}],null,!0)},[n("v-card",{staticClass:"elevation-2"},[n("v-card-title",{staticClass:"headline"},e._l(t.release,(function(t){return n("v-btn",{key:t.version,staticClass:"ma-2",attrs:{color:"primary",href:"https://www.e2j.net/?s="+t.version,target:"_blank"}},[e._v(" "+e._s(e._f("dateFormat")(new Date(t.date),"YYYY-MM-DD"))+" ("+e._s(t.version)+") ")])})),1),n("v-card-text",[n("blockquote",{staticClass:"blockquote"},[n("p",[n("small",[e._v(e._s(t.filename))])]),n("pre",{class:e.$style.nowrap,domProps:{innerHTML:e._s(e.$options.filters.highlight(t.content,e.searchb))}})])])],1)],1)})),1)],1)},i=[],c=(n("99af"),n("4de4"),n("7db0"),n("4160"),n("c975"),n("4d63"),n("ac1f"),n("25f0"),n("466d"),n("5319"),n("841c"),n("1276"),n("159b"),n("96cf"),n("1da1")),l=n("bc3a"),u=n.n(l),f=n("04ef"),p=n.n(f),d="https://api.e2j.net",h="/v1/mametan",m="/v1/release",v="/v1/whatsnewj",b={name:"MameTan",data:function(){return{loading:!1,randome:"Now loading dictionary. Please wait..",items:[],search:null,select:null,searchb:null,results:[],resultsCashe:{},memetan:[],releases:[]}},filters:{highlight:function(e,t){var n=p()(e);return n.replace(new RegExp(t,"ig"),'<span class="blue-grey lighten-5">'.concat(t,"</span>"))}},watch:{search:function(e){e&&e!==this.select&&this.querySelections(e),this.queryWhatsNewJ(e)}},methods:{querySelections:function(e){this.items=this.memetan.filter((function(t){return(t||"").toLowerCase().indexOf((e||"").toLowerCase())>-1}))},queryWhatsNewJ:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.searchb!==e){n.next=2;break}return n.abrupt("return");case 2:if(-1!==t.memetan.indexOf(e)){n.next=4;break}return n.abrupt("return");case 4:if(!t.loading){n.next=6;break}return n.abrupt("return");case 6:if(t.searchb=e,t.randome=e,!(e in t.resultsCashe)){n.next=12;break}return console.log("cache"),t.results=t.resultsCashe[e],n.abrupt("return");case 12:return n.prev=12,t.loading=!0,n.next=16,u.a.get("".concat(d).concat(v),{params:{q:e}});case 16:a=n.sent,t.results=[],a.data.forEach((function(e){var n=t.getMameVersion(e.filename);t.results.push({filename:e.filename,release:n.release,content:e.content,line:e.line})})),t.results.sort((function(e,t){return e.release.date-t.release.date})),t.resultsCashe[e]=t.results;case 21:return n.prev=21,t.loading=!1,n.finish(21);case 24:case"end":return n.stop()}}),n,null,[[12,,21,24]])})))()},onblur:function(){this.queryWhatsNewJ(this.search)},keyboardEvent:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=document.activeElement,13===e.which&&"autocomplete-element"==a.getAttribute("data-element")){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,t.queryWhatsNewJ(t.search);case 5:case"end":return n.stop()}}),n)})))()},getMameVersion:function(e){var t=this,n=e.match(/^whatsnewJ_(.+)\.txt$/),a=[];if(n){var r=n[1].split("-");r.forEach((function(e){var n="0."+e.replace(".","").substring(1,e.length);a.push({version:n,date:t.findReleaseDate("mame",n)})}))}return{release:a}},findReleaseDate:function(e,t){var n=this.releases[e].find((function(e){return e.version.replace(" Final","")==t})),a="1999-07-19T00:00:00.000Z";return n&&(a=n.date),Date.parse(a)},getRandomInt:function(e){return Math.floor(Math.random()*Math.floor(e))}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,t.next=4,u.a.get("".concat(d).concat(h));case 4:return n=t.sent,e.memetan=n.data,t.next=8,u.a.get("".concat(d).concat(m));case 8:a=t.sent,e.releases=a.data,e.randome=e.memetan[e.getRandomInt(e.memetan.length)],t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](1),console.log(t.t0);case 16:return t.prev=16,e.loading=!1,t.finish(16);case 19:case"end":return t.stop()}}),t,null,[[1,13,16,19]])})))()},created:function(){window.addEventListener("keyup",this.keyboardEvent)},beforeDestroy:function(){window.removeEventListener("keyup",this.keyboardEvent)}},g=b,w=n("a2b3"),y=n("2877"),x=n("6544"),k=n.n(x),_=n("c6a6"),C=n("8336"),j=n("b0af"),O=n("99d9"),T=n("62ad"),M=n("a523"),V=n("0fd9"),E=n("8414"),R=n("1e06"),P=n("71d9"),q=n("2a7f");function J(e){this["$style"]=w["default"].locals||w["default"]}var S=Object(y["a"])(g,o,i,!1,J,null,null),D=S.exports;k()(S,{VAutocomplete:_["a"],VBtn:C["a"],VCard:j["a"],VCardText:O["a"],VCardTitle:O["b"],VCol:T["a"],VContainer:M["a"],VRow:V["a"],VTimeline:E["a"],VTimelineItem:R["a"],VToolbar:P["a"],VToolbarTitle:q["a"]});var $={name:"App",components:{MameTan:D},data:function(){return{}}},A=$,I=n("7496"),L=n("a75b"),N=Object(y["a"])(A,r,s,!1,null,null,null),W=N.exports;k()(N,{VApp:I["a"],VContent:L["a"]});var Y=n("f309"),F=n("11c8");a["a"].use(Y["a"]),a["a"].use(F["a"]);var B=new Y["a"]({});a["a"].config.productionTip=!1,new a["a"]({vuetify:B,render:function(e){return e(W)}}).$mount("#app")},a2b3:function(e,t,n){"use strict";var a=n("334c"),r=n.n(a);t["default"]=r.a}});
//# sourceMappingURL=app.6f998545.js.map