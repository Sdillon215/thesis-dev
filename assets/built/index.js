!function(){"use strict";const{pvs:e}=window;e&&(e.initDarkMode(),e.initLightbox({zIndex:9999}),e.initScrollProgress(),e.initFilter(),e.initPagination(),e.initDropdown(),e.initNavigation());const{on:t}=window.ivent;t(document,"click","[data-copy-link]",(async e=>{e.preventDefault();try{await navigator.clipboard.writeText(e.delegateTarget.getAttribute("data-copy-link"))}catch(e){console.error(e)}})),window.ivent.on(document,"click",".scroll-progress-button",(e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})})),document.querySelectorAll(".nav-category").forEach((e=>{e.textContent=e.textContent.replace(/^-\s?/,"")}));const{on:n}=window.ivent;n(document,"pvs.navigation.content-rendered pvs.pagination.rendered",(()=>{const e=location.origin+location.pathname+location.search;document.querySelectorAll(".sidebar-posts .card-link, .popup-content-posts .card-link").forEach((t=>{const n=t.parentNode;t.href===e?n.classList.add("card-post-active"):n.classList.remove("card-post-active")}))}));const{on:o}=window.ivent,r=document.querySelector(".sidebar-posts");let i=document.querySelector(".card-post-active");function a(){const{scrollHeight:e,clientHeight:t,scrollTop:n}=r;if(!i||e<=t)return;const o=i.offsetTop,a=i.clientHeight;(n>o||n<o-t+a)&&r.scroll({top:o-t/2+a/2,behavior:"smooth"})}function c(e,t,n){var o,r=n||{},i=r.noTrailing,a=void 0!==i&&i,c=r.noLeading,u=void 0!==c&&c,s=r.debounceMode,l=void 0===s?void 0:s,d=!1,p=0;function f(){o&&clearTimeout(o)}function v(){for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];var c=this,s=Date.now()-p;function v(){p=Date.now(),t.apply(c,r)}function b(){o=void 0}d||(u||!l||o||v(),f(),void 0===l&&s>e?u?(p=Date.now(),a||(o=setTimeout(l?b:v,e))):v():!0!==a&&(o=setTimeout(l?b:v,void 0===l?e-s:e)))}return v.cancel=function(e){var t=(e||{}).upcomingOnly,n=void 0!==t&&t;f(),d=!n},v}a(),o(document,"pvs.navigation.content-rendered",(()=>{i=document.querySelector(".card-post-active"),a()})),o(document,"pvs.pagination.rendered",(()=>{i=document.querySelector(".card-post-active")}));const{on:u}=window.ivent,s=[],l=function(e,t,n){var o=(n||{}).atBegin;return c(e,t,{debounceMode:!1!==(void 0!==o&&o)})}(100,(()=>{if(s.length)for(let e=0;e<s.length;e+=1)s[e]()}));u(window,"load",l),u(window,"resize",l),u(window,"orientationchange",l),l();const{on:d}=window.ivent,{getComputedStyle:p}=window,{body:f}=document;function v(){const e=window.innerWidth-f.offsetWidth||parseFloat(p(f).paddingRight);f.style.setProperty("--scrollbar-width",`${e}px`)}var b;d(document,"pvs.navigation.content-rendered",(()=>{v()})),d(document,"pvs.pagination.rendered",(e=>{"section-posts"===e.section&&v()})),"function"==typeof(b=()=>{v()})?s.push(b):window.dispatchEvent(new Event("resize"));const{on:h}=window.ivent,m=[];let w=0;const g=()=>{if(!m.length)return;const e=window.pageYOffset;let t="";t=e>w?"down":e<w?"up":"none",0===e?t="start":window.innerHeight+window.scrollY>=document.body.scrollHeight&&(t="end"),m.forEach((n=>{"function"==typeof n&&n(t,e,w,window)})),w=e};h(window,"scroll",c(200,g)),h(window,"load",g),h(window,"orientationchange",g);const{documentElement:y}=document,N=document.querySelector(".scroll-progress");var E;N&&(E=(e,t)=>{const n=y.scrollHeight-y.clientHeight;n<500&&N.classList.remove("scroll-progress-show"),t>100&&n>500?N.classList.add("scroll-progress-show"):N.classList.remove("scroll-progress-show")},m.push(E));
/*!
	* tabbable 6.2.0
	* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
	*/var T=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],S=T.join(","),D="undefined"==typeof Element,O=D?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,F=!D&&Element.prototype.getRootNode?function(e){var t;return null==e||null===(t=e.getRootNode)||void 0===t?void 0:t.call(e)}:function(e){return null==e?void 0:e.ownerDocument},k=function e(t,n){var o;void 0===n&&(n=!0);var r=null==t||null===(o=t.getAttribute)||void 0===o?void 0:o.call(t,"inert");return""===r||"true"===r||n&&t&&e(t.parentNode)},P=function(e,t,n){if(k(e))return[];var o=Array.prototype.slice.apply(e.querySelectorAll(S));return t&&O.call(e,S)&&o.unshift(e),o=o.filter(n)},R=function e(t,n,o){for(var r=[],i=Array.from(t);i.length;){var a=i.shift();if(!k(a,!1))if("SLOT"===a.tagName){var c=a.assignedElements(),u=e(c.length?c:a.children,!0,o);o.flatten?r.push.apply(r,u):r.push({scopeParent:a,candidates:u})}else{O.call(a,S)&&o.filter(a)&&(n||!t.includes(a))&&r.push(a);var s=a.shadowRoot||"function"==typeof o.getShadowRoot&&o.getShadowRoot(a),l=!k(s,!1)&&(!o.shadowRootFilter||o.shadowRootFilter(a));if(s&&l){var d=e(!0===s?a.children:s.children,!0,o);o.flatten?r.push.apply(r,d):r.push({scopeParent:a,candidates:d})}else i.unshift.apply(i,a.children)}}return r},x=function(e){return!isNaN(parseInt(e.getAttribute("tabindex"),10))},L=function(e){if(!e)throw new Error("No node provided");return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||function(e){var t,n=null==e||null===(t=e.getAttribute)||void 0===t?void 0:t.call(e,"contenteditable");return""===n||"true"===n}(e))&&!x(e)?0:e.tabIndex},I=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},A=function(e){return"INPUT"===e.tagName},C=function(e){return function(e){return A(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,n=e.form||F(e),o=function(e){return n.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=o(window.CSS.escape(e.name));else try{t=o(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var r=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}(t,e.form);return!r||r===e}(e)},G=function(e){var t=e.getBoundingClientRect(),n=t.width,o=t.height;return 0===n&&0===o},j=function(e,t){var n=t.displayCheck,o=t.getShadowRoot;if("hidden"===getComputedStyle(e).visibility)return!0;var r=O.call(e,"details>summary:first-of-type")?e.parentElement:e;if(O.call(r,"details:not([open]) *"))return!0;if(n&&"full"!==n&&"legacy-full"!==n){if("non-zero-area"===n)return G(e)}else{if("function"==typeof o){for(var i=e;e;){var a=e.parentElement,c=F(e);if(a&&!a.shadowRoot&&!0===o(a))return G(e);e=e.assignedSlot?e.assignedSlot:a||c===e.ownerDocument?a:c.host}e=i}if(function(e){var t,n,o,r,i=e&&F(e),a=null===(t=i)||void 0===t?void 0:t.host,c=!1;if(i&&i!==e)for(c=!!(null!==(n=a)&&void 0!==n&&null!==(o=n.ownerDocument)&&void 0!==o&&o.contains(a)||null!=e&&null!==(r=e.ownerDocument)&&void 0!==r&&r.contains(e));!c&&a;){var u,s,l;c=!(null===(s=a=null===(u=i=F(a))||void 0===u?void 0:u.host)||void 0===s||null===(l=s.ownerDocument)||void 0===l||!l.contains(a))}return c}(e))return!e.getClientRects().length;if("legacy-full"!==n)return!0}return!1},B=function(e,t){return!(t.disabled||k(t)||function(e){return A(e)&&"hidden"===e.type}(t)||j(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var n=0;n<t.children.length;n++){var o=t.children.item(n);if("LEGEND"===o.tagName)return!!O.call(t,"fieldset[disabled] *")||!o.contains(e)}return!0}t=t.parentElement}return!1}(t))},q=function(e,t){return!(C(t)||L(t)<0||!B(e,t))},H=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(t)||t>=0)},M=function e(t){var n=[],o=[];return t.forEach((function(t,r){var i=!!t.scopeParent,a=i?t.scopeParent:t,c=function(e,t){var n=L(e);return n<0&&t&&!x(e)?0:n}(a,i),u=i?e(t.candidates):a;0===c?i?n.push.apply(n,u):n.push(a):o.push({documentOrder:r,tabIndex:c,item:t,isScope:i,content:u})})),o.sort(I).reduce((function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e}),[]).concat(n)},K=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==O.call(e,S)&&q(t,e)},z=T.concat("iframe").join(","),U=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==O.call(e,z)&&B(t,e)};
/*!
	* focus-trap 7.5.4
	* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
	*/
function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(n),!0).forEach((function(t){W(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function W(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var V=function(e,t){if(e.length>0){var n=e[e.length-1];n!==t&&n.pause()}var o=e.indexOf(t);-1===o||e.splice(o,1),e.push(t)},X=function(e,t){var n=e.indexOf(t);-1!==n&&e.splice(n,1),e.length>0&&e[e.length-1].unpause()},J=function(e){return"Tab"===(null==e?void 0:e.key)||9===(null==e?void 0:e.keyCode)},Q=function(e){return J(e)&&!e.shiftKey},Z=function(e){return J(e)&&e.shiftKey},_=function(e){return setTimeout(e,0)},ee=function(e,t){var n=-1;return e.every((function(e,o){return!t(e)||(n=o,!1)})),n},te=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return"function"==typeof e?e.apply(void 0,n):e},ne=function(e){return e.target.shadowRoot&&"function"==typeof e.composedPath?e.composedPath()[0]:e.target},oe=[],re=function(e,t){var n,o=(null==t?void 0:t.document)||document,r=(null==t?void 0:t.trapStack)||oe,i=$({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0,isKeyForward:Q,isKeyBackward:Z},t),a={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0,recentNavEvent:void 0},c=function(e,t,n){return e&&void 0!==e[t]?e[t]:i[n||t]},u=function(e,t){var n="function"==typeof(null==t?void 0:t.composedPath)?t.composedPath():void 0;return a.containerGroups.findIndex((function(t){var o=t.container,r=t.tabbableNodes;return o.contains(e)||(null==n?void 0:n.includes(o))||r.find((function(t){return t===e}))}))},s=function(e){var t=i[e];if("function"==typeof t){for(var n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];t=t.apply(void 0,r)}if(!0===t&&(t=void 0),!t){if(void 0===t||!1===t)return t;throw new Error("`".concat(e,"` was specified but was not a node, or did not return a node"))}var c=t;if("string"==typeof t&&!(c=o.querySelector(t)))throw new Error("`".concat(e,"` as selector refers to no known node"));return c},l=function(){var e=s("initialFocus");if(!1===e)return!1;if(void 0===e||!U(e,i.tabbableOptions))if(u(o.activeElement)>=0)e=o.activeElement;else{var t=a.tabbableGroups[0];e=t&&t.firstTabbableNode||s("fallbackFocus")}if(!e)throw new Error("Your focus-trap needs to have at least one focusable element");return e},d=function(){if(a.containerGroups=a.containers.map((function(e){var t=function(e,t){var n;return n=(t=t||{}).getShadowRoot?R([e],t.includeContainer,{filter:q.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:H}):P(e,t.includeContainer,q.bind(null,t)),M(n)}(e,i.tabbableOptions),n=function(e,t){return(t=t||{}).getShadowRoot?R([e],t.includeContainer,{filter:B.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):P(e,t.includeContainer,B.bind(null,t))}(e,i.tabbableOptions),o=t.length>0?t[0]:void 0,r=t.length>0?t[t.length-1]:void 0,a=n.find((function(e){return K(e)})),c=n.slice().reverse().find((function(e){return K(e)})),u=!!t.find((function(e){return L(e)>0}));return{container:e,tabbableNodes:t,focusableNodes:n,posTabIndexesFound:u,firstTabbableNode:o,lastTabbableNode:r,firstDomTabbableNode:a,lastDomTabbableNode:c,nextTabbableNode:function(e){var o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=t.indexOf(e);return r<0?o?n.slice(n.indexOf(e)+1).find((function(e){return K(e)})):n.slice(0,n.indexOf(e)).reverse().find((function(e){return K(e)})):t[r+(o?1:-1)]}}})),a.tabbableGroups=a.containerGroups.filter((function(e){return e.tabbableNodes.length>0})),a.tabbableGroups.length<=0&&!s("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");if(a.containerGroups.find((function(e){return e.posTabIndexesFound}))&&a.containerGroups.length>1)throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.")},p=function e(t){var n=t.activeElement;if(n)return n.shadowRoot&&null!==n.shadowRoot.activeElement?e(n.shadowRoot):n},f=function e(t){!1!==t&&t!==p(document)&&(t&&t.focus?(t.focus({preventScroll:!!i.preventScroll}),a.mostRecentlyFocusedNode=t,function(e){return e.tagName&&"input"===e.tagName.toLowerCase()&&"function"==typeof e.select}(t)&&t.select()):e(l()))},v=function(e){var t=s("setReturnFocus",e);return t||!1!==t&&e},b=function(e){var t=e.target,n=e.event,o=e.isBackward,r=void 0!==o&&o;t=t||ne(n),d();var c=null;if(a.tabbableGroups.length>0){var l=u(t,n),p=l>=0?a.containerGroups[l]:void 0;if(l<0)c=r?a.tabbableGroups[a.tabbableGroups.length-1].lastTabbableNode:a.tabbableGroups[0].firstTabbableNode;else if(r){var f=ee(a.tabbableGroups,(function(e){var n=e.firstTabbableNode;return t===n}));if(f<0&&(p.container===t||U(t,i.tabbableOptions)&&!K(t,i.tabbableOptions)&&!p.nextTabbableNode(t,!1))&&(f=l),f>=0){var v=0===f?a.tabbableGroups.length-1:f-1,b=a.tabbableGroups[v];c=L(t)>=0?b.lastTabbableNode:b.lastDomTabbableNode}else J(n)||(c=p.nextTabbableNode(t,!1))}else{var h=ee(a.tabbableGroups,(function(e){var n=e.lastTabbableNode;return t===n}));if(h<0&&(p.container===t||U(t,i.tabbableOptions)&&!K(t,i.tabbableOptions)&&!p.nextTabbableNode(t))&&(h=l),h>=0){var m=h===a.tabbableGroups.length-1?0:h+1,w=a.tabbableGroups[m];c=L(t)>=0?w.firstTabbableNode:w.firstDomTabbableNode}else J(n)||(c=p.nextTabbableNode(t))}}else c=s("fallbackFocus");return c},h=function(e){var t=ne(e);u(t,e)>=0||(te(i.clickOutsideDeactivates,e)?n.deactivate({returnFocus:i.returnFocusOnDeactivate}):te(i.allowOutsideClick,e)||e.preventDefault())},m=function(e){var t=ne(e),n=u(t,e)>=0;if(n||t instanceof Document)n&&(a.mostRecentlyFocusedNode=t);else{var o;e.stopImmediatePropagation();var r=!0;if(a.mostRecentlyFocusedNode)if(L(a.mostRecentlyFocusedNode)>0){var c=u(a.mostRecentlyFocusedNode),s=a.containerGroups[c].tabbableNodes;if(s.length>0){var d=s.findIndex((function(e){return e===a.mostRecentlyFocusedNode}));d>=0&&(i.isKeyForward(a.recentNavEvent)?d+1<s.length&&(o=s[d+1],r=!1):d-1>=0&&(o=s[d-1],r=!1))}}else a.containerGroups.some((function(e){return e.tabbableNodes.some((function(e){return L(e)>0}))}))||(r=!1);else r=!1;r&&(o=b({target:a.mostRecentlyFocusedNode,isBackward:i.isKeyBackward(a.recentNavEvent)})),f(o||(a.mostRecentlyFocusedNode||l()))}a.recentNavEvent=void 0},w=function(e){if(!(t=e,"Escape"!==(null==t?void 0:t.key)&&"Esc"!==(null==t?void 0:t.key)&&27!==(null==t?void 0:t.keyCode)||!1===te(i.escapeDeactivates,e)))return e.preventDefault(),void n.deactivate();var t;(i.isKeyForward(e)||i.isKeyBackward(e))&&function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];a.recentNavEvent=e;var n=b({event:e,isBackward:t});n&&(J(e)&&e.preventDefault(),f(n))}(e,i.isKeyBackward(e))},g=function(e){var t=ne(e);u(t,e)>=0||te(i.clickOutsideDeactivates,e)||te(i.allowOutsideClick,e)||(e.preventDefault(),e.stopImmediatePropagation())},y=function(){if(a.active)return V(r,n),a.delayInitialFocusTimer=i.delayInitialFocus?_((function(){f(l())})):f(l()),o.addEventListener("focusin",m,!0),o.addEventListener("mousedown",h,{capture:!0,passive:!1}),o.addEventListener("touchstart",h,{capture:!0,passive:!1}),o.addEventListener("click",g,{capture:!0,passive:!1}),o.addEventListener("keydown",w,{capture:!0,passive:!1}),n},N=function(){if(a.active)return o.removeEventListener("focusin",m,!0),o.removeEventListener("mousedown",h,!0),o.removeEventListener("touchstart",h,!0),o.removeEventListener("click",g,!0),o.removeEventListener("keydown",w,!0),n},E="undefined"!=typeof window&&"MutationObserver"in window?new MutationObserver((function(e){e.some((function(e){return Array.from(e.removedNodes).some((function(e){return e===a.mostRecentlyFocusedNode}))}))&&f(l())})):void 0,T=function(){E&&(E.disconnect(),a.active&&!a.paused&&a.containers.map((function(e){E.observe(e,{subtree:!0,childList:!0})})))};return(n={get active(){return a.active},get paused(){return a.paused},activate:function(e){if(a.active)return this;var t=c(e,"onActivate"),n=c(e,"onPostActivate"),r=c(e,"checkCanFocusTrap");r||d(),a.active=!0,a.paused=!1,a.nodeFocusedBeforeActivation=o.activeElement,null==t||t();var i=function(){r&&d(),y(),T(),null==n||n()};return r?(r(a.containers.concat()).then(i,i),this):(i(),this)},deactivate:function(e){if(!a.active)return this;var t=$({onDeactivate:i.onDeactivate,onPostDeactivate:i.onPostDeactivate,checkCanReturnFocus:i.checkCanReturnFocus},e);clearTimeout(a.delayInitialFocusTimer),a.delayInitialFocusTimer=void 0,N(),a.active=!1,a.paused=!1,T(),X(r,n);var o=c(t,"onDeactivate"),u=c(t,"onPostDeactivate"),s=c(t,"checkCanReturnFocus"),l=c(t,"returnFocus","returnFocusOnDeactivate");null==o||o();var d=function(){_((function(){l&&f(v(a.nodeFocusedBeforeActivation)),null==u||u()}))};return l&&s?(s(v(a.nodeFocusedBeforeActivation)).then(d,d),this):(d(),this)},pause:function(e){if(a.paused||!a.active)return this;var t=c(e,"onPause"),n=c(e,"onPostPause");return a.paused=!0,null==t||t(),N(),T(),null==n||n(),this},unpause:function(e){if(!a.paused||!a.active)return this;var t=c(e,"onUnpause"),n=c(e,"onPostUnpause");return a.paused=!1,null==t||t(),d(),y(),T(),null==n||n(),this},updateContainerElements:function(e){var t=[].concat(e).filter(Boolean);return a.containers=t.map((function(e){return"string"==typeof e?o.querySelector(e):e})),a.active&&d(),T(),this}}).updateContainerElements(e),n};const{body:ie}=document;function ae(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0]?(ie.style.setProperty("overflow","hidden"),ie.style.setProperty("padding-right","var(--scrollbar-width)")):(ie.style.setProperty("overflow",""),ie.style.setProperty("padding-right",""))}const{body:ce}=document,{on:ue,trigger:se}=window.ivent,{getComputedStyle:le}=window,de=new Map;let pe=0,fe=!0;function ve(e,t,n){const o=le(e);de.set(t,{popupId:t,popup:e,popupDuration:1e3*parseFloat(o.transitionDuration),popupIndex:parseFloat(o.zIndex),hasOverflow:e.getAttribute("data-popup-overflow")||!0,content:n,focusTrap:re(e),focusTimeout:null,hideTimeout:null,hasShow:!0})}function be(e){const t=de.get(e),{popup:n,popupDuration:o,focusTrap:r,popupIndex:i,hideTimeout:a,hasOverflow:c}=t;se(document,"thesis.popup.show",{data:t}),n.classList.remove("popup-hide"),n.offsetHeight,n.classList.add("popup-open");const u=setTimeout((()=>{r?.activate()}),o/2);clearTimeout(a),pe+=1,n.style.setProperty("z-index",i+pe),t.show=!0,t.focusTimeout=u,"false"!==c&&ae()}function he(e,t){const{popup:n,popupDuration:o,focusTrap:r,focusTimeout:i}=t;se(document,"thesis.popup.hide",{data:t}),n.classList.remove("popup-open"),n.offsetHeight,n.classList.add("popup-hide"),clearTimeout(i),r?.deactivate(),t.show=!1,t.hideTimeout=setTimeout((()=>{n.style.setProperty("z-index",""),n.classList.remove("popup-hide")}),o)}function me(e){de.size&&(fe=!1,e?(he(0,de.get(e)),de.forEach((e=>{let{show:t}=e;t&&(fe=!0)}))):de.forEach(((e,t)=>{he(0,e)})),fe||(ae(!1),pe=0))}ue(document,"click",'[href^="#popup"]',(e=>{e.preventDefault();const t=e.delegateTarget.getAttribute("href"),n=t.slice(1);if(!de.has(n)){const e=document.querySelector(`.popup[data-id="${n}"]`);if(e)return ve(e,n,e.children[0]),void be(n);const o=document.createElement("div");o.dataset.id=n,o.classList.add("popup",n);const r=document.querySelector(t),i=document.createElement("div");i.className=r.className,i.innerHTML=r.innerHTML,o.append(i),ce.append(o),o.offsetHeight,ve(o,n,i)}be(n)})),ue(document,"click",".popup-close",(e=>{e.preventDefault();const t=e.delegateTarget.closest(".popup");t?me(t.getAttribute("data-id")):me()})),ue(document,"keyup",(e=>{"Escape"===e.key&&me()})),ue(document,"pvs.navigation.loading pvs.navigation.content-render",(()=>{me()}))}();
//# sourceMappingURL=index.js.map
