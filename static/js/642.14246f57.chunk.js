"use strict";(self.webpackChunkgoit_react_hw_05_movies=self.webpackChunkgoit_react_hw_05_movies||[]).push([[642],{642:function(e,r,t){t.r(r);var n=t(861),s=t(439),a=t(757),c=t.n(a),i=t(791),o=t(689),u=t(776),l=t(243),h=t(474),v=t(596),f=(t(462),t(666)),p=t(184);r.default=function(){var e=(0,o.UO)().movieId,r=(0,i.useState)(null),t=(0,s.Z)(r,2),a=t[0],d=t[1],x=(0,i.useState)(!1),m=(0,s.Z)(x,2),j=m[0],w=m[1];return(0,i.useEffect)((function(){var r=function(){var r=(0,n.Z)(c().mark((function r(){var t;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e){r.next=2;break}return r.abrupt("return");case 2:return w(!0),r.prev=3,r.next=6,l.Z.get("".concat(u.T,"movie/").concat(e,"/reviews"),{headers:{Authorization:"Bearer ".concat(u.$),accept:"application/json"}});case 6:if(0!==(t=r.sent).length){r.next=9;break}throw v.Am.error("No results.");case 9:d(t.data),console.log(t.data),r.next=16;break;case 13:r.prev=13,r.t0=r.catch(3),v.Am.error(r.t0.message);case 16:return r.prev=16,w(!1),r.finish(16);case 19:case"end":return r.stop()}}),r,null,[[3,13,16,19]])})));return function(){return r.apply(this,arguments)}}();r()}),[e]),console.log(a),(0,p.jsx)("div",{children:null!==a&&(0,p.jsxs)("div",{children:[0===a.results.length?(0,p.jsx)("p",{children:"There are no reviews available for this movie."}):(0,p.jsx)("ul",{className:f.Z.reviews_list,children:a.results.map((function(e){return(0,p.jsxs)("li",{className:f.Z.list_item,children:[(0,p.jsx)("h3",{children:e.author}),(0,p.jsx)("p",{children:e.content})]},e.id)}))}),j&&(0,p.jsx)(h.Z,{}),(0,p.jsx)(v.Ix,{autoClose:5e3,theme:"dark"})]})})}}}]);
//# sourceMappingURL=642.14246f57.chunk.js.map