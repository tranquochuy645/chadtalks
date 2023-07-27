import{r as g,j as e,u as F,a as Z,c as ee,g as te,P as ne}from"./index-bd247350.js";import{u as z,S as se}from"./index-abf9f9a9.js";const re=({participants:o,userId:n})=>{if(o=o.filter(s=>s._id!==n),o.length==0)return null;const c=o.length>1,d=o.slice(0,4);return e.jsx("div",{className:"card",children:c?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"group-pictures-container",children:d.map((s,u)=>e.jsx("div",{className:"profile",children:e.jsx("img",{src:s.avatar,alt:"Profile",className:"group-profile-picture"})},u))}),e.jsxs("div",{className:"profile-names",children:[d.length>0&&e.jsx("h3",{children:d.map(s=>s.fullname).join(", ")}),o.length>4&&e.jsxs("p",{className:"group-members-count",children:["+",o.length-4," more"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:o[0].avatar,alt:"Profile",className:"profile-picture"}),e.jsxs("h3",{children:[o[0].fullname+"  ",e.jsx("span",{className:o[0].isOnline?"online":"offline",children:"•"})]}),o[0].bio&&e.jsx("p",{children:o[0].bio})]})})},X=g.memo(re);const J=o=>new Promise((n,c)=>{fetch("/api/v1/rooms",{method:"GET",headers:{"content-type":"application/json",authorization:"Bearer "+o}}).then(d=>{if(d.ok)return d.json().then(s=>{n(s)});throw d.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch rooms information")}).catch(d=>{c(d)})}),ie=({userId:o,currentRoomIndex:n,token:c,onRoomChange:d,onUpdateStatus:s})=>{const[u,i]=g.useState([]),t=z(),r=F(),b=x=>{const f=x;i(l=>l&&l.map(_=>{const C=_.participants.map(j=>j._id===f?{...j,isOnline:!0}:j);return{..._,participants:C}}))},h=x=>{const f=x;i(l=>l&&l.map(_=>{const C=_.participants.map(j=>j._id===f?{...j,isOnline:!1}:j);return{..._,participants:C}}))},p=x=>{console.log("set meet"),i(f=>f&&f.map(l=>l._id===x[1]?{...l,isMeeting:!0,meeting_uuid:x[2]}:l))},m=x=>{console.log("set end meet"),i(f=>f&&f.map(l=>l._id===x[0]&&l.isMeeting?{...l,isMeeting:!1,meeting_uuid:null}:l))},P=()=>{J(c).then(x=>{i(x)}).catch(()=>{r("/auth")})},O=x=>{var l,_;const f=document.querySelectorAll(".chat-room");f==null||f.forEach(C=>{var j;(j=C.classList)==null||j.remove("active")}),(_=(l=f[x])==null?void 0:l.classList)==null||_.add("active"),d(x)};g.useEffect(()=>{u.length>0&&s(u)},[u]),g.useEffect(()=>{if(t)return t.on("onl",b),t.on("off",h),t.on("meet",p),t.on("end_meet",m),t.on("room",P),()=>{t.off("onl",b),t.off("off",h),t.off("meet",p),t.off("end_meet",m),t.off("room",P)}},[t]),g.useEffect(()=>{J(c).then(x=>{i(x)}).catch(()=>{r("/auth")})},[]);const S=g.useMemo(()=>u.map((x,f)=>e.jsx("div",{className:`chat-room ${f==n?"active":""}`,onClick:()=>O(f),children:e.jsx(X,{userId:o,participants:x.participants})},x._id)),[u]);return e.jsx("div",{id:"rooms-list",children:u&&u.length>0?e.jsx("div",{children:S}):e.jsx("p",{children:"No rooms to display"})})};const K=({onChange:o,accept:n,id:c,icon:d})=>{const s=g.useRef(null),u=i=>{if(i.target.files){const t=i.target.files[0];o(t)}};return e.jsxs("label",{id:`btn_${c}`,className:"btn_fileinput",htmlFor:c,children:[d,e.jsx("input",{id:c,className:"fileinput",type:"file",accept:n,ref:s,onChange:u,style:{display:"none"}})]})};const oe=({token:o,userId:n,roomId:c,onJustSent:d})=>{const[s,u]=g.useState(""),[i,t]=g.useState([]),[r,b]=g.useState([]),h=z(),p=async x=>{try{const f=new FormData;return x.forEach(C=>{f.append(`file${x.length>1?"s":""}`,C)}),await(await fetch(`/media/${n}/${c}?token=${o}&count=${x.length}`,{method:"POST",body:f})).json()}catch(f){throw f}},m=x=>{u(x.target.value),console.log("typing ...")},P=async()=>{let x=[],f=[];if(i.length>0&&(console.log(i.length),x=i,t([])),r.length>0&&(console.log(r.length),x=[...x,...r],b([])),x.length>0)try{const l=await p(x);l.urls&&(f=l.urls)}catch(l){return alert("error uploading files: "+l.message)}(s.trim()!==""||f.length!==0)&&(console.log(f),h==null||h.emit("msg",[c,s,new Date,f]),d(),u(""))},O=x=>{b(f=>[...f,x])},S=x=>{t(f=>[...f,x])};return e.jsxs("div",{id:"chat-box_input-container",children:[e.jsx(K,{accept:"image/*",onChange:O,id:"chatbox_upload-img",icon:e.jsx("i",{className:"bx bx-image-add"})}),e.jsx(K,{accept:"*",onChange:S,id:"chatbox_upload-file",icon:e.jsx("i",{className:"bx bx-paperclip"})}),e.jsx("input",{type:"text",value:s,id:"input_message",onChange:m,onKeyDown:x=>{x.key=="Enter"&&P()}}),e.jsx("button",{onClick:P,className:"btn",children:e.jsx("i",{className:"bx bxs-send"})})]})},ae=g.memo(oe);const le={light:{text:"#000",background:"#fff",theme:"#009688"},dark:{text:"#ffffff",background:"#000",theme:"#240063"}},ce=()=>{const[o,n]=g.useState(sessionStorage.getItem("theme")||"light");return g.useEffect(()=>{const c=le[o];Object.entries(c).forEach(([d,s])=>{document.documentElement.style.setProperty(`--${d}-color`,s)}),sessionStorage.setItem("theme",o)},[o]),[o,n]},ue=()=>{const[o,n]=ce(),c=o==="light",d=()=>{n(c?"dark":"light")};return e.jsxs("div",{className:"theme-switch-container",children:[e.jsx("input",{type:"checkbox",id:"switcher-input",checked:c,onChange:d}),e.jsxs("label",{className:`switcher-label ${c?"":"active"}`,htmlFor:"switcher-input",children:[e.jsx("i",{className:"fas fa-solid fa-sun"}),e.jsx("span",{className:"switcher-toggler"}),e.jsx("i",{className:"fas fa-solid fa-moon"})]})]})};const de=({token:o,room:n,userId:c})=>{const d=z(),s=()=>{d.emit("meet",[n._id,new Date])},u=t=>{const r=`/meet/${t}?token=${o}&room=${n._id}`;window.open(r)},i=t=>{if(console.log(t),t[0]==c)return t[3]?void 0:u(t[2]);Notification.permission==="granted"?new Notification("Incoming Call",{body:"You have an incoming call. Do you want to join?",icon:"path/to/notification-icon.png",requireInteraction:!0}).addEventListener("click",()=>{u(t[2])}):Notification.permission!=="denied"&&Notification.requestPermission().then(r=>{r==="granted"&&i(t)})};return g.useEffect(()=>{if(d)return d.on("meet",i),()=>{d.off("meet",i)}},[d,n._id]),e.jsxs("div",{id:"chat-box_topbar",className:"flex",children:[e.jsxs("div",{id:"chat-box_topbar_left",children:[e.jsx(X,{userId:c,participants:n.participants}),e.jsx("button",{className:"btn",onClick:s,children:e.jsx("i",{className:"bx bxs-video"})}),n.isMeeting&&n.meeting_uuid&&e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"This room is in a meeting"}),e.jsx("button",{onClick:()=>u(n.meeting_uuid),children:"Join"})]})]}),e.jsx(ue,{})]})},fe=g.memo(de);var q={exports:{}};(function(o,n){(function(d,s){o.exports=s(g,Z)})(ee,function(c,d){return function(s){var u={};function i(t){if(u[t])return u[t].exports;var r=u[t]={i:t,l:!1,exports:{}};return s[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=s,i.c=u,i.d=function(t,r,b){i.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:b})},i.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,r){if(r&1&&(t=i(t)),r&8||r&4&&typeof t=="object"&&t&&t.__esModule)return t;var b=Object.create(null);if(i.r(b),Object.defineProperty(b,"default",{enumerable:!0,value:t}),r&2&&typeof t!="string")for(var h in t)i.d(b,h,(function(p){return t[p]}).bind(null,h));return b},i.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(r,"a",r),r},i.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},i.p="",i(i.s=4)}([function(s,u,i){s.exports=i(5)()},function(s,u){s.exports=c},function(s,u){s.exports=d},function(s,u){s.exports=function(i,t,r){var b=i.direction,h=i.value;switch(b){case"top":return r.top+h<t.top&&r.bottom>t.bottom&&r.left<t.left&&r.right>t.right;case"left":return r.left+h<t.left&&r.bottom>t.bottom&&r.top<t.top&&r.right>t.right;case"bottom":return r.bottom-h>t.bottom&&r.left<t.left&&r.right>t.right&&r.top<t.top;case"right":return r.right-h>t.right&&r.left<t.left&&r.top<t.top&&r.bottom>t.bottom}}},function(s,u,i){i.r(u),i.d(u,"default",function(){return V});var t=i(1),r=i.n(t),b=i(2),h=i.n(b),p=i(0),m=i.n(p),P=i(3),O=i.n(P);function S(y){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?S=function(w){return typeof w}:S=function(w){return w&&typeof Symbol=="function"&&w.constructor===Symbol&&w!==Symbol.prototype?"symbol":typeof w},S(y)}function x(y,v){if(!(y instanceof v))throw new TypeError("Cannot call a class as a function")}function f(y,v){for(var w=0;w<v.length;w++){var a=v[w];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(y,a.key,a)}}function l(y,v,w){return v&&f(y.prototype,v),w&&f(y,w),y}function _(y,v){return v&&(S(v)==="object"||typeof v=="function")?v:j(y)}function C(y){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(w){return w.__proto__||Object.getPrototypeOf(w)},C(y)}function j(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}function R(y,v){if(typeof v!="function"&&v!==null)throw new TypeError("Super expression must either be null or a function");y.prototype=Object.create(v&&v.prototype,{constructor:{value:y,writable:!0,configurable:!0}}),v&&A(y,v)}function A(y,v){return A=Object.setPrototypeOf||function(a,k){return a.__proto__=k,a},A(y,v)}function I(y,v,w){return v in y?Object.defineProperty(y,v,{value:w,enumerable:!0,configurable:!0,writable:!0}):y[v]=w,y}function Q(y){return y.width===void 0&&(y.width=y.right-y.left),y.height===void 0&&(y.height=y.bottom-y.top),y}var V=function(y){R(v,y);function v(w){var a;return x(this,v),a=_(this,C(v).call(this,w)),I(j(a),"getContainer",function(){return a.props.containment||window}),I(j(a),"addEventListener",function(k,E,T,$){a.debounceCheck||(a.debounceCheck={});var N,U,L=function(){N=null,a.check()};$>-1?U=function(){N||(N=setTimeout(L,$||0))}:U=function(){clearTimeout(N),N=setTimeout(L,T||0)};var B={target:k,fn:U,getLastTimeout:function(){return N}};k.addEventListener(E,B.fn),a.debounceCheck[E]=B}),I(j(a),"startWatching",function(){a.debounceCheck||a.interval||(a.props.intervalCheck&&(a.interval=setInterval(a.check,a.props.intervalDelay)),a.props.scrollCheck&&a.addEventListener(a.getContainer(),"scroll",a.props.scrollDelay,a.props.scrollThrottle),a.props.resizeCheck&&a.addEventListener(window,"resize",a.props.resizeDelay,a.props.resizeThrottle),!a.props.delayedCall&&a.check())}),I(j(a),"stopWatching",function(){if(a.debounceCheck){for(var k in a.debounceCheck)if(a.debounceCheck.hasOwnProperty(k)){var E=a.debounceCheck[k];clearTimeout(E.getLastTimeout()),E.target.removeEventListener(k,E.fn),a.debounceCheck[k]=null}}a.debounceCheck=null,a.interval&&(a.interval=clearInterval(a.interval))}),I(j(a),"check",function(){var k=a.node,E,T;if(!k)return a.state;if(E=Q(a.roundRectDown(k.getBoundingClientRect())),a.props.containment){var $=a.props.containment.getBoundingClientRect();T={top:$.top,left:$.left,bottom:$.bottom,right:$.right}}else T={top:0,left:0,bottom:window.innerHeight||document.documentElement.clientHeight,right:window.innerWidth||document.documentElement.clientWidth};var N=a.props.offset||{},U=S(N)==="object";U&&(T.top+=N.top||0,T.left+=N.left||0,T.bottom-=N.bottom||0,T.right-=N.right||0);var L={top:E.top>=T.top,left:E.left>=T.left,bottom:E.bottom<=T.bottom,right:E.right<=T.right},B=E.height>0&&E.width>0,M=B&&L.top&&L.left&&L.bottom&&L.right;if(B&&a.props.partialVisibility){var W=E.top<=T.bottom&&E.bottom>=T.top&&E.left<=T.right&&E.right>=T.left;typeof a.props.partialVisibility=="string"&&(W=L[a.props.partialVisibility]),M=a.props.minTopValue?W&&E.top<=T.bottom-a.props.minTopValue:W}typeof N.direction=="string"&&typeof N.value=="number"&&(console.warn("[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }",N.direction,N.value),M=O()(N,E,T));var G=a.state;return a.state.isVisible!==M&&(G={isVisible:M,visibilityRect:L},a.setState(G),a.props.onChange&&a.props.onChange(M)),G}),a.state={isVisible:null,visibilityRect:{}},a}return l(v,[{key:"componentDidMount",value:function(){this.node=h.a.findDOMNode(this),this.props.active&&this.startWatching()}},{key:"componentWillUnmount",value:function(){this.stopWatching()}},{key:"componentDidUpdate",value:function(a){this.node=h.a.findDOMNode(this),this.props.active&&!a.active?(this.setState({isVisible:null,visibilityRect:{}}),this.startWatching()):this.props.active||this.stopWatching()}},{key:"roundRectDown",value:function(a){return{top:Math.floor(a.top),left:Math.floor(a.left),bottom:Math.floor(a.bottom),right:Math.floor(a.right)}}},{key:"render",value:function(){return this.props.children instanceof Function?this.props.children({isVisible:this.state.isVisible,visibilityRect:this.state.visibilityRect}):r.a.Children.only(this.props.children)}}]),v}(r.a.Component);I(V,"defaultProps",{active:!0,partialVisibility:!1,minTopValue:0,scrollCheck:!1,scrollDelay:250,scrollThrottle:-1,resizeCheck:!1,resizeDelay:250,resizeThrottle:-1,intervalCheck:!0,intervalDelay:100,delayedCall:!1,offset:{},containment:null,children:r.a.createElement("span",null)}),I(V,"propTypes",{onChange:m.a.func,active:m.a.bool,partialVisibility:m.a.oneOfType([m.a.bool,m.a.oneOf(["top","right","bottom","left"])]),delayedCall:m.a.bool,offset:m.a.oneOfType([m.a.shape({top:m.a.number,left:m.a.number,bottom:m.a.number,right:m.a.number}),m.a.shape({direction:m.a.oneOf(["top","right","bottom","left"]),value:m.a.number})]),scrollCheck:m.a.bool,scrollDelay:m.a.number,scrollThrottle:m.a.number,resizeCheck:m.a.bool,resizeDelay:m.a.number,resizeThrottle:m.a.number,intervalCheck:m.a.bool,intervalDelay:m.a.number,containment:typeof window<"u"?m.a.instanceOf(window.Element):m.a.any,children:m.a.oneOfType([m.a.element,m.a.func]),minTopValue:m.a.number})},function(s,u,i){var t=i(6);function r(){}function b(){}b.resetWarningCache=r,s.exports=function(){function h(P,O,S,x,f,l){if(l!==t){var _=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw _.name="Invariant Violation",_}}h.isRequired=h;function p(){return h}var m={array:h,bool:h,func:h,number:h,object:h,string:h,symbol:h,any:h,arrayOf:p,element:h,elementType:h,instanceOf:p,node:h,objectOf:p,oneOf:p,oneOfType:p,shape:p,exact:p,checkPropTypes:b,resetWarningCache:r};return m.PropTypes=m,m}},function(s,u,i){var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";s.exports=t}])})})(q);var he=q.exports;const pe=te(he);const me=({token:o,content:n,timestamp:c,urls:d})=>e.jsxs("div",{className:"message own",children:[e.jsx("div",{className:"message_wrapper",children:e.jsx("p",{children:n})}),e.jsx("p",{className:"message_timestamp",children:c}),d&&d.length>0&&d.map((s,u)=>e.jsx("img",{className:"file",src:s+"?token="+o},u))]}),ge=({token:o,avatarSRC:n,content:c,timestamp:d,urls:s})=>e.jsxs("div",{className:"message guest",children:[e.jsxs("div",{className:"message_wrapper",children:[e.jsx("img",{className:"inchat-avatar",src:n,alt:"Sender Avatar"}),e.jsx("p",{children:c}),s&&s.length>0&&s.map((u,i)=>e.jsx("img",{className:"file",src:u+"?token="+o},i))]}),e.jsx("p",{className:"message_timestamp",children:d})]}),xe=({token:o,messages:n,userId:c,participants:d})=>e.jsx(e.Fragment,{children:Array.isArray(n)&&n.map((s,u)=>{if(s.sender&&s.sender==c)return e.jsx(me,{token:o,content:s.content,timestamp:s.timestamp,urls:s.urls},u);{const i=d.find(r=>r._id===s.sender),t=i?i.avatar:"";return e.jsx(ge,{token:o,avatarSRC:t,content:s.content,timestamp:s.timestamp,urls:s.urls},u)}})}),be=g.memo(xe);const H=(o,n,c,d)=>fetch(`/api/v1/rooms/${o}?limit=${c}&skip=${d}`,{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+n}}).then(s=>{if(s.status===304)throw new Error("Already got this");if(s.ok)return s.json();throw s.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch messages")}),Y=30,ye=({token:o,room:n,userId:c,justSent:d})=>{const[s,u]=g.useState([]),[i,t]=g.useState(0),r=g.useRef(null),b=g.useRef(null),h=g.useRef(null),p=g.useRef(null),m=z(),P=F();console.log("Render container");const O=f=>{if(f[1]===n._id){const l=f[0];if(l!==c&&!n.participants.some(R=>R._id===l))return;h.current&&(h.current.style.display="block");const _=f[2],C=f[3],j=f[4];t(R=>R++),u(R=>R!==null?[...R,{sender:l,content:_,timestamp:C,urls:j}]:[{sender:l,content:_,timestamp:C,urls:j}])}},S=()=>{b.current&&(b.current.scrollIntoView({behavior:"smooth"}),h.current&&(h.current.style.display="none"))},x=f=>{if(!f||!s||s.length==0)return;if(s.length>=i){r.current&&(r.current.style.display="none");return}let l,_=Y;l=i-s.length-_,l<0&&(_+=l,l=0),H(n._id,o,`${_}`,`${l}`).then(C=>{p.current&&(p.current.scrollTop=300),u(j=>j?C.messages.concat(j):C.messages),C.conversationLength&&t(C.conversationLength)}).catch(()=>{P("/auth")})};return g.useEffect(()=>{try{if(!o||!n)return;H(n._id,o).then(f=>{u(f.messages),f.conversationLength&&t(f.conversationLength)}).catch(()=>{P("/auth")})}catch(f){console.error(f)}},[o,n._id]),g.useEffect(()=>{if(m)return m.on("msg",O),()=>{m.off("msg",O)}},[m,n._id]),g.useEffect(()=>{r.current&&(r.current.style.display="none");const f=setTimeout(()=>{r.current&&p.current&&p.current.scrollHeight>p.current.clientHeight&&(r.current.style.display="flex")},1e3);return()=>{clearTimeout(f)}},[n._id]),g.useEffect(()=>{if(!(!p.current||!s)){if(s.length<=Y)return S();if(Math.abs(p.current.scrollHeight-p.current.scrollTop-p.current.clientHeight)<300)return console.log("bottom"),S();if(s[s.length-1].sender==c&&d)return d=!1,S()}},[s]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:p,id:"messages-container",children:[e.jsx(pe,{onChange:x,children:e.jsx("div",{ref:r,id:"topRef",children:e.jsx(ne,{size:50})})}),s&&e.jsx(be,{token:o,messages:s,userId:c,participants:n.participants}),e.jsx("div",{ref:b})]}),e.jsxs("button",{id:"btn_scroll",ref:h,onClick:()=>{S()},children:[Array.isArray(s)&&s.length>1&&s[s.length-1].content,e.jsx("i",{className:"bx bx-down-arrow-alt"})]})]})};const ve=({room:o,token:n,profile:c})=>{const[d,s]=g.useState(!1);return e.jsxs("div",{id:"chat-box",children:[e.jsx(fe,{token:n,userId:c._id,room:o}),e.jsx(ye,{justSent:d,room:o,token:n,userId:c._id}),e.jsx(ae,{token:n,userId:c._id,roomId:o._id,onJustSent:()=>{s(!0)}})]})},je=o=>new Promise(async(n,c)=>{if(!window.confirm("Are you sure you want to delete your account?"))return c("Account deletion canceled");const s=window.prompt("Enter your password:");if(!s)return c("Password input canceled");try{const u={password:s},i=await fetch("/api/v1/users/",{method:"DELETE",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify(u)});if(i.ok)return sessionStorage.removeItem("token"),n("Account deletion successful");const t=await i.json();if(t.message)return c(t.message);c("Wrong password")}catch(u){c(u)}});const _e=({token:o,profileData:n,onRefresh:c})=>{const[d,s]=g.useState(!1),[u,i]=g.useState(!1),t=g.useRef(null),r=g.useRef(null),b=g.useRef(null),h=F(),p=z();g.useEffect(()=>{if(p)return p.on("inv",c),()=>{p.off("inv",c)}},[p]),g.useEffect(()=>{r.current&&(u?r.current.classList.add("active"):r.current.classList.remove("active"))},[u]);const m=()=>{sessionStorage.removeItem("token"),h("/auth")},P=l=>{fetch(`/api/v1/rooms/${l}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify({accept:!0})})},O=l=>{fetch(`/api/v1/rooms/${l}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify({accept:!1})})},S=async()=>{if(!b.current)return;let l={};if(b.current.bio.value&&(l.bio=b.current.bio.value),b.current.fullname.value&&(l.fullname=b.current.fullname.value),b.current.password.value)if(l.password=b.current.password.value,b.current.current_password.value)l.current_password=b.current.current_password.value;else return alert("Please enter current password");if(t.current&&(l.avatar=t.current),!l.bio&&!l.fullname&&!l.password&&!l.avatar)return alert("Empty form");const _=await fetch("/api/v1/users/",{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify(l)});if(i(!1),_.ok)return alert("Updated successfully!"),c();const C=await _.json();if(C.message)return alert(C.message);alert("Error updating profile")},x=async l=>{const _=new FormData;_.append("file",l);const C=await fetch(`/media/${n==null?void 0:n._id}/public?token=${o}&count=1`,{method:"POST",body:_}),j=await C.json();!C.ok&&j.message&&alert(j.message),j.urls&&(t.current=j.urls[0],S())},f=async()=>{try{const l=await je(o);alert(l),h("/auth")}catch(l){alert(l)}};return e.jsxs("div",{id:"profile",children:[e.jsxs("div",{id:"profile_topbar",children:[e.jsx("img",{src:n==null?void 0:n.avatar,alt:"Profile",id:"profile_img",className:"cover"}),u?e.jsx(K,{accept:"image/*",onChange:x,id:"upload-img",icon:e.jsx("i",{className:"bx bxs-camera"})}):e.jsxs("div",{children:[e.jsx("h3",{children:n==null?void 0:n.fullname}),(n==null?void 0:n.bio)&&e.jsx("p",{children:n==null?void 0:n.bio})]}),e.jsxs("div",{className:"flex",children:[u?e.jsx("button",{className:"btn",onClick:()=>i(!1),children:e.jsx("i",{className:"bx bxs-message-square-x"})}):e.jsx("button",{className:"btn",onClick:()=>i(!0),children:e.jsx("i",{className:"bx bxs-pencil"})}),e.jsx("button",{className:"btn",onClick:()=>s(l=>!l),children:d?e.jsx("i",{className:"bx bxs-message-square-x"}):e.jsxs("div",{id:"bell",children:[e.jsx("i",{className:"bx bxs-bell"}),n!=null&&n.invitations.length&&(n==null?void 0:n.invitations.length)>0?e.jsx("span",{id:"nofcount",children:n==null?void 0:n.invitations.length}):null]})}),d&&e.jsx("div",{id:"notify-container",children:n&&n.invitations.length>0?n.invitations.map(l=>e.jsxs("div",{children:[e.jsx("p",{children:l}),e.jsx("button",{onClick:()=>P(l),children:"Accept"}),e.jsx("button",{onClick:()=>O(l),children:"Refuse"})]},l)):e.jsx("p",{children:"No invitations"})}),e.jsx("button",{id:"logout-btn",className:"btn",onClick:m,children:e.jsx("i",{className:"bx bx-log-in"})})]})]}),e.jsxs("div",{ref:r,id:"profile_editor",children:[e.jsxs("form",{id:"profile_form",ref:b,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"fullname",children:"Your name:"}),e.jsx("input",{type:"text",id:"fullname",name:"fullname",placeholder:n==null?void 0:n.fullname})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bio",children:"Bio:"}),e.jsx("input",{type:"text",id:"bio",name:"bio",placeholder:n==null?void 0:n.bio})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"current_password",children:"Current password:"}),e.jsx("input",{type:"password",id:"current_password",name:"current_password"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",children:"New password:"}),e.jsx("input",{type:"password",id:"password",name:"password"})]})]}),e.jsxs("div",{className:"flex",children:[e.jsx("button",{id:"btn_delete-account",onClick:f,children:"Delete account"}),e.jsx("button",{id:"btn_submit-edit",onClick:S,children:"Save"})]})]})]})},we=g.memo(_e);const Ce=({token:o,onChoose:n})=>{const c=g.useRef(null),[d,s]=g.useState([]),u=()=>{var b;const r=(b=c.current)==null?void 0:b.value;r&&fetch(`/api/v1/search/${r}`,{headers:{"content-type":"application/json",authorization:"Bearer "+o}}).then(h=>{if(h.ok)return h.json().then(p=>{s(p)});console.log(h.status)})},i=r=>{r.key==="Enter"&&u()},t=r=>{c.current&&!c.current.contains(r.target)&&(s([]),c.current.value="")};return g.useEffect(()=>(document.addEventListener("click",t),()=>{document.removeEventListener("click",t)}),[]),e.jsxs("div",{id:"search-bar",children:[e.jsx("input",{type:"text",placeholder:"Search for users...",ref:c,onKeyPress:i}),e.jsx("button",{className:"btn",onClick:u,children:e.jsx("i",{className:"bx bx-search"})}),d.length>0&&e.jsx("div",{id:"search_dropdown",children:d.map(r=>e.jsxs("div",{onClick:()=>{n({_id:r._id,fullname:r.fullname})},children:[e.jsx("img",{className:"profile-picture",src:r.avatar,alt:"Avatar"}),r.fullname]},r._id))})]})};const Ee=({token:o})=>{const[n,c]=g.useState([]),d=i=>{if(n.some(t=>t._id==i._id))return alert("already selected this user");c(t=>[...t,i])},s=i=>{console.log("remove user from users list"),i>=0&&i<n.length&&c(t=>t.filter((b,h)=>h!==i))},u=async()=>{if(n.length==0)return alert("Please select a user");const i=n.map(t=>t._id);try{(await fetch("/api/v1/rooms",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify({invited:i})})).ok?c([]):alert("deo biet sao bug luon")}catch(t){console.error(t)}};return e.jsxs("div",{id:"room-maker",children:[e.jsx(Ce,{token:o,onChoose:d}),n.length>0&&e.jsxs("div",{className:"flex",children:[e.jsx("div",{id:"chosenList",className:"flex",children:n.map((i,t)=>e.jsxs("div",{className:"chosenUser flex",children:[e.jsxs("p",{children:[" ",i.fullname]}),e.jsx("span",{onClick:()=>s(t),children:"X"})]},i.fullname))}),e.jsx("button",{className:"btn",onClick:u,children:e.jsx("i",{className:"bx bxs-message-square-add"})})]})]})};function Se(){return e.jsxs("svg",{id:"bgrn-svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 700 700",preserveAspectRatio:"none",children:[e.jsxs("g",{mask:'url("#SvgjsMask1020")',fill:"none",children:[e.jsx("rect",{width:"700",height:"700",x:"0",y:"0",fill:'url("#SvgjsLinearGradient1021")'}),e.jsx("path",{d:"M700 0L426.65 0L700 81.54z",fill:"rgba(255, 255, 255, 0.2)"}),e.jsx("path",{d:"M426.65 0L700 81.54L700 267.52L414.62 0z",fill:"rgba(255, 255, 255, .13)"}),e.jsx("path",{d:"M414.62 0L700 267.52L700 452.46L156.39 0z",fill:"rgba(255, 255, 255, .1)"}),e.jsx("path",{d:"M156.39 0L700 452.46L700 490.96L83.34999999999998 0z",fill:"rgba(255, 255, 255, .1)"}),e.jsx("path",{d:"M0 700L154.99 700L0 376.93z",fill:"rgba(0, 0, 0, .1)"}),e.jsx("path",{d:"M0 376.93L154.99 700L303.17 700L0 371.8z",fill:"rgba(0, 0, 0, .175)"}),e.jsx("path",{d:"M0 371.8L303.17 700L525.89 700L0 229.98000000000002z",fill:"rgba(0, 0, 0, .25)"}),e.jsx("path",{d:"M0 229.98000000000002L525.89 700L592.96 700L0 184.46z",fill:"rgba(0, 0, 0, .325)"})]}),e.jsxs("defs",{children:[e.jsx("mask",{id:"SvgjsMask1020",children:e.jsx("rect",{width:"700",height:"700",fill:"#ffffff"})}),e.jsxs("linearGradient",{x1:"0%",y1:"0%",x2:"100%",y2:"100%",gradientUnits:"userSpaceOnUse",id:"SvgjsLinearGradient1021",children:[e.jsx("stop",{id:"stop_1",offset:"0"}),e.jsx("stop",{id:"stop_2",offset:"1"})]})]})]})}const D=o=>fetch("/api/v1/users/",{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+o}}).then(n=>{if(n.ok)return n.json();throw n.status==401&&(alert("Token expired"),sessionStorage.removeItem("token"),window.location.reload()),new Error("Failed to fetch user profile")}),Pe=({token:o})=>{const[n,c]=g.useState(null),[d,s]=g.useState([]),[u,i]=g.useState(0),t=F(),r=async()=>{try{const p=await D(o);c(p)}catch{t("/auth")}},b=p=>{i(p)},h=p=>{s(p)};return g.useEffect(()=>{o&&D(o).then(p=>{c(p)}).catch(p=>{console.error(p),t("/auth")})},[o]),e.jsx("div",{id:"main-page",className:"flex",children:n?e.jsxs(se,{token:o,children:[e.jsxs("div",{id:"main-page_container",children:[e.jsxs("section",{id:"section-left",children:[e.jsx(we,{token:o,profileData:n,onRefresh:r}),e.jsx(Ee,{token:o}),e.jsx(ie,{userId:n._id,currentRoomIndex:u,token:o,onRoomChange:b,onUpdateStatus:h})]}),e.jsx("section",{id:"section-right",children:d.length>0&&e.jsx(ve,{profile:n,token:o,room:d[u]})})]}),e.jsx(Se,{})]}):e.jsx("div",{children:"Loading skeleton ..."})})};export{Pe as default,D as getProfile};