import{r as m,j as e,u as F,a as Z,c as D,g as ee,P as te}from"./index-629afac7.js";import{u as B,S as ne}from"./index-4e3a35ad.js";const se=({participants:o,userId:n})=>{if(o=o.filter(a=>a._id!==n),o.length==0)return null;const c=o.length>1,u=o.slice(0,4);return e.jsx("div",{className:"card",children:c?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"group-pictures-container",children:u.map((a,d)=>e.jsx("div",{className:"profile",children:e.jsx("img",{src:a.avatar,alt:"Profile",className:"group-profile-picture"})},d))}),e.jsxs("div",{className:"profile-names",children:[u.length>0&&e.jsx("h3",{children:u.map(a=>a.fullname).join(", ")}),o.length>4&&e.jsxs("p",{className:"group-members-count",children:["+",o.length-4," more"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:o[0].avatar,alt:"Profile",className:"profile-picture"}),e.jsxs("h3",{children:[o[0].fullname+"  ",e.jsx("span",{className:o[0].isOnline?"online":"offline",children:"•"})]}),o[0].bio&&e.jsx("p",{children:o[0].bio})]})})},X=m.memo(se);const K=o=>new Promise((n,c)=>{fetch("/api/v1/rooms",{method:"GET",headers:{"content-type":"application/json",authorization:"Bearer "+o}}).then(u=>{if(u.ok)return u.json().then(a=>{n(a)});throw u.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch rooms information")}).catch(u=>{c(u)})}),re=({userId:o,currentRoomIndex:n,token:c,onRoomChange:u,onUpdateStatus:a})=>{const[d,r]=m.useState([]),t=B(),s=F(),x=E=>{const g=E;r(l=>l&&l.map(_=>{const y=_.participants.map(j=>j._id===g?{...j,isOnline:!0}:j);return{..._,participants:y}}))},f=E=>{const g=E;r(l=>l&&l.map(_=>{const y=_.participants.map(j=>j._id===g?{...j,isOnline:!1}:j);return{..._,participants:y}}))},h=E=>{console.log("set meet"),r(g=>g&&g.map(l=>l._id===E[1]?{...l,isMeeting:!0,meeting_uuid:E[2]}:l))},p=E=>{console.log("set end meet"),r(g=>g&&g.map(l=>l._id===E[0]&&l.isMeeting?{...l,isMeeting:!1,meeting_uuid:null}:l))},O=()=>{K(c).then(E=>{r(E)}).catch(()=>{s("/auth")})},P=E=>{var l,_;const g=document.querySelectorAll(".chat-room");g==null||g.forEach(y=>{var j;(j=y.classList)==null||j.remove("active")}),(_=(l=g[E])==null?void 0:l.classList)==null||_.add("active"),u(E)};m.useEffect(()=>{d.length>0&&a(d)},[d]),m.useEffect(()=>{if(t)return t.on("onl",x),t.on("off",f),t.on("meet",h),t.on("end_meet",p),t.on("room",O),()=>{t.off("onl",x),t.off("off",f),t.off("meet",h),t.off("end_meet",p),t.off("room",O)}},[t]),m.useEffect(()=>{K(c).then(E=>{r(E)}).catch(()=>{s("/auth")})},[]);const k=m.useMemo(()=>d.map((E,g)=>e.jsx("div",{className:`chat-room ${g==n?"active":""}`,onClick:()=>P(g),children:e.jsx(X,{userId:o,participants:E.participants})},E._id)),[d]);return e.jsx("div",{id:"rooms-list",children:d&&d.length>0?e.jsx("div",{children:k}):e.jsx("p",{children:"No rooms to display"})})};const ie=({roomId:o,onJustSent:n})=>{const[c,u]=m.useState(""),a=B(),d=t=>{u(t.target.value),console.log("typing ...")},r=()=>{c.trim()!==""&&(a==null||a.emit("msg",[o,c,new Date]),n(),u(""))};return e.jsxs("div",{id:"chat-box_input-container",children:[e.jsx("input",{type:"text",value:c,id:"input_message",onChange:d,onKeyDown:t=>{t.key=="Enter"&&r()}}),e.jsx("button",{onClick:r,className:"btn",children:e.jsx("i",{className:"bx bxs-send"})})]})},oe=m.memo(ie);const ae={light:{text:"#000",background:"#fff",theme:"#009688"},dark:{text:"#ffffff",background:"#000",theme:"#240063"}},le=()=>{const[o,n]=m.useState(sessionStorage.getItem("theme")||"light");return m.useEffect(()=>{const c=ae[o];Object.entries(c).forEach(([u,a])=>{document.documentElement.style.setProperty(`--${u}-color`,a)}),sessionStorage.setItem("theme",o)},[o]),[o,n]},ce=()=>{const[o,n]=le(),c=o==="light",u=()=>{n(c?"dark":"light")};return e.jsxs("div",{className:"theme-switch-container",children:[e.jsx("input",{type:"checkbox",id:"switcher-input",checked:c,onChange:u}),e.jsxs("label",{className:`switcher-label ${c?"":"active"}`,htmlFor:"switcher-input",children:[e.jsx("i",{className:"fas fa-solid fa-sun"}),e.jsx("span",{className:"switcher-toggler"}),e.jsx("i",{className:"fas fa-solid fa-moon"})]})]})};const ue=({token:o,room:n,userId:c})=>{const u=B(),a=()=>{u.emit("meet",[n._id,new Date])},d=t=>{const s=`/meet/${t}?token=${o}&room=${n._id}`;window.open(s)},r=t=>{if(console.log(t),t[0]==c)return t[3]?void 0:d(t[2]);Notification.permission==="granted"?new Notification("Incoming Call",{body:"You have an incoming call. Do you want to join?",icon:"path/to/notification-icon.png",requireInteraction:!0}).addEventListener("click",()=>{d(t[2])}):Notification.permission!=="denied"&&Notification.requestPermission().then(s=>{s==="granted"&&r(t)})};return m.useEffect(()=>{if(u)return u.on("meet",r),()=>{u.off("meet",r)}},[u,n._id]),e.jsxs("div",{id:"chat-box_topbar",className:"flex",children:[e.jsxs("div",{id:"chat-box_topbar_left",children:[e.jsx(X,{userId:c,participants:n.participants}),e.jsx("button",{className:"btn",onClick:a,children:e.jsx("i",{className:"bx bxs-video"})}),n.isMeeting&&n.meeting_uuid&&e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"This room is in a meeting"}),e.jsx("button",{onClick:()=>d(n.meeting_uuid),children:"Join"})]})]}),e.jsx(ce,{})]})},de=m.memo(ue);var q={exports:{}};(function(o,n){(function(u,a){o.exports=a(m,Z)})(D,function(c,u){return function(a){var d={};function r(t){if(d[t])return d[t].exports;var s=d[t]={i:t,l:!1,exports:{}};return a[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=a,r.c=d,r.d=function(t,s,x){r.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:x})},r.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,s){if(s&1&&(t=r(t)),s&8||s&4&&typeof t=="object"&&t&&t.__esModule)return t;var x=Object.create(null);if(r.r(x),Object.defineProperty(x,"default",{enumerable:!0,value:t}),s&2&&typeof t!="string")for(var f in t)r.d(x,f,(function(h){return t[h]}).bind(null,f));return x},r.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(s,"a",s),s},r.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},r.p="",r(r.s=4)}([function(a,d,r){a.exports=r(5)()},function(a,d){a.exports=c},function(a,d){a.exports=u},function(a,d){a.exports=function(r,t,s){var x=r.direction,f=r.value;switch(x){case"top":return s.top+f<t.top&&s.bottom>t.bottom&&s.left<t.left&&s.right>t.right;case"left":return s.left+f<t.left&&s.bottom>t.bottom&&s.top<t.top&&s.right>t.right;case"bottom":return s.bottom-f>t.bottom&&s.left<t.left&&s.right>t.right&&s.top<t.top;case"right":return s.right-f>t.right&&s.left<t.left&&s.top<t.top&&s.bottom>t.bottom}}},function(a,d,r){r.r(d),r.d(d,"default",function(){return V});var t=r(1),s=r.n(t),x=r(2),f=r.n(x),h=r(0),p=r.n(h),O=r(3),P=r.n(O);function k(b){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?k=function(w){return typeof w}:k=function(w){return w&&typeof Symbol=="function"&&w.constructor===Symbol&&w!==Symbol.prototype?"symbol":typeof w},k(b)}function E(b,v){if(!(b instanceof v))throw new TypeError("Cannot call a class as a function")}function g(b,v){for(var w=0;w<v.length;w++){var i=v[w];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(b,i.key,i)}}function l(b,v,w){return v&&g(b.prototype,v),w&&g(b,w),b}function _(b,v){return v&&(k(v)==="object"||typeof v=="function")?v:j(b)}function y(b){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(w){return w.__proto__||Object.getPrototypeOf(w)},y(b)}function j(b){if(b===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return b}function z(b,v){if(typeof v!="function"&&v!==null)throw new TypeError("Super expression must either be null or a function");b.prototype=Object.create(v&&v.prototype,{constructor:{value:b,writable:!0,configurable:!0}}),v&&A(b,v)}function A(b,v){return A=Object.setPrototypeOf||function(i,L){return i.__proto__=L,i},A(b,v)}function R(b,v,w){return v in b?Object.defineProperty(b,v,{value:w,enumerable:!0,configurable:!0,writable:!0}):b[v]=w,b}function Q(b){return b.width===void 0&&(b.width=b.right-b.left),b.height===void 0&&(b.height=b.bottom-b.top),b}var V=function(b){z(v,b);function v(w){var i;return E(this,v),i=_(this,y(v).call(this,w)),R(j(i),"getContainer",function(){return i.props.containment||window}),R(j(i),"addEventListener",function(L,C,S,I){i.debounceCheck||(i.debounceCheck={});var T,U,N=function(){T=null,i.check()};I>-1?U=function(){T||(T=setTimeout(N,I||0))}:U=function(){clearTimeout(T),T=setTimeout(N,S||0)};var $={target:L,fn:U,getLastTimeout:function(){return T}};L.addEventListener(C,$.fn),i.debounceCheck[C]=$}),R(j(i),"startWatching",function(){i.debounceCheck||i.interval||(i.props.intervalCheck&&(i.interval=setInterval(i.check,i.props.intervalDelay)),i.props.scrollCheck&&i.addEventListener(i.getContainer(),"scroll",i.props.scrollDelay,i.props.scrollThrottle),i.props.resizeCheck&&i.addEventListener(window,"resize",i.props.resizeDelay,i.props.resizeThrottle),!i.props.delayedCall&&i.check())}),R(j(i),"stopWatching",function(){if(i.debounceCheck){for(var L in i.debounceCheck)if(i.debounceCheck.hasOwnProperty(L)){var C=i.debounceCheck[L];clearTimeout(C.getLastTimeout()),C.target.removeEventListener(L,C.fn),i.debounceCheck[L]=null}}i.debounceCheck=null,i.interval&&(i.interval=clearInterval(i.interval))}),R(j(i),"check",function(){var L=i.node,C,S;if(!L)return i.state;if(C=Q(i.roundRectDown(L.getBoundingClientRect())),i.props.containment){var I=i.props.containment.getBoundingClientRect();S={top:I.top,left:I.left,bottom:I.bottom,right:I.right}}else S={top:0,left:0,bottom:window.innerHeight||document.documentElement.clientHeight,right:window.innerWidth||document.documentElement.clientWidth};var T=i.props.offset||{},U=k(T)==="object";U&&(S.top+=T.top||0,S.left+=T.left||0,S.bottom-=T.bottom||0,S.right-=T.right||0);var N={top:C.top>=S.top,left:C.left>=S.left,bottom:C.bottom<=S.bottom,right:C.right<=S.right},$=C.height>0&&C.width>0,M=$&&N.top&&N.left&&N.bottom&&N.right;if($&&i.props.partialVisibility){var W=C.top<=S.bottom&&C.bottom>=S.top&&C.left<=S.right&&C.right>=S.left;typeof i.props.partialVisibility=="string"&&(W=N[i.props.partialVisibility]),M=i.props.minTopValue?W&&C.top<=S.bottom-i.props.minTopValue:W}typeof T.direction=="string"&&typeof T.value=="number"&&(console.warn("[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }",T.direction,T.value),M=P()(T,C,S));var G=i.state;return i.state.isVisible!==M&&(G={isVisible:M,visibilityRect:N},i.setState(G),i.props.onChange&&i.props.onChange(M)),G}),i.state={isVisible:null,visibilityRect:{}},i}return l(v,[{key:"componentDidMount",value:function(){this.node=f.a.findDOMNode(this),this.props.active&&this.startWatching()}},{key:"componentWillUnmount",value:function(){this.stopWatching()}},{key:"componentDidUpdate",value:function(i){this.node=f.a.findDOMNode(this),this.props.active&&!i.active?(this.setState({isVisible:null,visibilityRect:{}}),this.startWatching()):this.props.active||this.stopWatching()}},{key:"roundRectDown",value:function(i){return{top:Math.floor(i.top),left:Math.floor(i.left),bottom:Math.floor(i.bottom),right:Math.floor(i.right)}}},{key:"render",value:function(){return this.props.children instanceof Function?this.props.children({isVisible:this.state.isVisible,visibilityRect:this.state.visibilityRect}):s.a.Children.only(this.props.children)}}]),v}(s.a.Component);R(V,"defaultProps",{active:!0,partialVisibility:!1,minTopValue:0,scrollCheck:!1,scrollDelay:250,scrollThrottle:-1,resizeCheck:!1,resizeDelay:250,resizeThrottle:-1,intervalCheck:!0,intervalDelay:100,delayedCall:!1,offset:{},containment:null,children:s.a.createElement("span",null)}),R(V,"propTypes",{onChange:p.a.func,active:p.a.bool,partialVisibility:p.a.oneOfType([p.a.bool,p.a.oneOf(["top","right","bottom","left"])]),delayedCall:p.a.bool,offset:p.a.oneOfType([p.a.shape({top:p.a.number,left:p.a.number,bottom:p.a.number,right:p.a.number}),p.a.shape({direction:p.a.oneOf(["top","right","bottom","left"]),value:p.a.number})]),scrollCheck:p.a.bool,scrollDelay:p.a.number,scrollThrottle:p.a.number,resizeCheck:p.a.bool,resizeDelay:p.a.number,resizeThrottle:p.a.number,intervalCheck:p.a.bool,intervalDelay:p.a.number,containment:typeof window<"u"?p.a.instanceOf(window.Element):p.a.any,children:p.a.oneOfType([p.a.element,p.a.func]),minTopValue:p.a.number})},function(a,d,r){var t=r(6);function s(){}function x(){}x.resetWarningCache=s,a.exports=function(){function f(O,P,k,E,g,l){if(l!==t){var _=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw _.name="Invariant Violation",_}}f.isRequired=f;function h(){return f}var p={array:f,bool:f,func:f,number:f,object:f,string:f,symbol:f,any:f,arrayOf:h,element:f,elementType:f,instanceOf:h,node:f,objectOf:h,oneOf:h,oneOfType:h,shape:h,exact:h,checkPropTypes:x,resetWarningCache:s};return p.PropTypes=p,p}},function(a,d,r){var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";a.exports=t}])})})(q);var fe=q.exports;const he=ee(fe);const pe=({content:o,timestamp:n})=>e.jsxs("div",{className:"message own",children:[e.jsx("div",{className:"message_wrapper",children:e.jsx("p",{children:o})}),e.jsx("p",{className:"message_timestamp",children:n})]}),me=({avatarSRC:o,content:n,timestamp:c})=>e.jsxs("div",{className:"message guest",children:[e.jsxs("div",{className:"message_wrapper",children:[e.jsx("img",{className:"inchat-avatar",src:o,alt:"Sender Avatar"}),e.jsx("p",{children:n})]}),e.jsx("p",{className:"message_timestamp",children:c})]}),ge=({messages:o,userId:n,participants:c})=>e.jsx(e.Fragment,{children:Array.isArray(o)&&o.map((u,a)=>{if(u.sender&&u.sender==n)return e.jsx(pe,{content:u.content,timestamp:u.timestamp},a);{const d=c.find(t=>t._id===u.sender),r=d?d.avatar:"";return e.jsx(me,{avatarSRC:r,content:u.content,timestamp:u.timestamp},a)}})}),xe=m.memo(ge);const J=(o,n,c,u)=>fetch(`/api/v1/rooms/${o}?limit=${c}&skip=${u}`,{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+n}}).then(a=>{if(a.status===304)throw new Error("Already got this");if(a.ok)return a.json();throw a.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch messages")}),H=30,be=({token:o,room:n,userId:c,justSent:u})=>{const[a,d]=m.useState(null),[r,t]=m.useState(0),s=m.useRef(null),x=m.useRef(null),f=m.useRef(null),h=m.useRef(null),p=B(),O=F();console.log("Render container");const P=g=>{if(g[1]===n._id){const l=g[0];if(l!==c&&!n.participants.some(j=>j._id===l))return;f.current&&(f.current.style.display="block");const _=g[2],y=g[3];t(j=>j++),d(j=>j!==null?[...j,{sender:l,content:_,timestamp:y}]:[{sender:l,content:_,timestamp:y}])}},k=()=>{x.current&&(x.current.scrollIntoView({behavior:"smooth"}),f.current&&(f.current.style.display="none"))},E=g=>{if(!g||!a||a.length==0)return;if(a.length>=r){s.current&&(s.current.style.display="none");return}let l,_=H;l=r-a.length-_,l<0&&(_+=l,l=0),J(n._id,o,`${_}`,`${l}`).then(y=>{h.current&&(h.current.scrollTop=300),d(j=>j?y.messages.concat(j):y.messages),y.conversationLength&&t(y.conversationLength)}).catch(()=>{O("/auth")})};return m.useEffect(()=>{try{if(!o||!n)return;J(n._id,o).then(g=>{d(g.messages),g.conversationLength&&t(g.conversationLength)}).catch(()=>{O("/auth")})}catch(g){console.error(g)}},[o,n._id]),m.useEffect(()=>{if(p)return p.on("msg",P),()=>{p.off("msg",P)}},[p,n._id]),m.useEffect(()=>{s.current&&(s.current.style.display="none");const g=setTimeout(()=>{s.current&&h.current&&h.current.scrollHeight>h.current.clientHeight&&(s.current.style.display="flex")},1e3);return()=>{clearTimeout(g)}},[n._id]),m.useEffect(()=>{if(!(!h.current||!a)){if(a.length<=H)return k();if(Math.abs(h.current.scrollHeight-h.current.scrollTop-h.current.clientHeight)<300)return console.log("bottom"),k();if(a[a.length-1].sender==c&&u)return u=!1,k()}},[a]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:h,id:"messages-container",children:[e.jsx(he,{onChange:E,children:e.jsx("div",{ref:s,id:"topRef",children:e.jsx(te,{size:50})})}),a&&e.jsx(xe,{messages:a,userId:c,participants:n.participants}),e.jsx("div",{ref:x})]}),e.jsxs("button",{id:"btn_scroll",ref:f,onClick:()=>{k()},children:[Array.isArray(a)&&a.length>1&&a[a.length-1].content,e.jsx("i",{className:"bx bx-down-arrow-alt"})]})]})};const ve=({room:o,token:n,profile:c})=>{const[u,a]=m.useState(!1);return e.jsxs("div",{id:"chat-box",children:[e.jsx(de,{token:n,userId:c._id,room:o}),e.jsx(be,{justSent:u,room:o,token:n,userId:c._id}),e.jsx(oe,{roomId:o._id,onJustSent:()=>{a(!0)}})]})},ye=({onChange:o,accept:n,id:c,icon:u})=>{const a=m.useRef(null),d=r=>{if(r.target.files){const t=r.target.files[0];o(t)}};return e.jsxs("label",{id:`btn_${c}`,htmlFor:c,children:[u,e.jsx("input",{id:c,type:"file",accept:n,ref:a,onChange:d,style:{display:"none"}})]})};const je=({token:o,profileData:n,onRefresh:c})=>{const[u,a]=m.useState(!1),[d,r]=m.useState(!1),t=m.useRef(null),s=m.useRef(null),x=m.useRef(null),f=F(),h=B();m.useEffect(()=>{if(h)return h.on("inv",c),()=>{h.off("inv",c)}},[h]),m.useEffect(()=>{s.current&&(d?s.current.classList.add("active"):s.current.classList.remove("active"))},[d]);const p=()=>{sessionStorage.removeItem("token"),f("/auth")},O=l=>{fetch(`/api/v1/rooms/${l}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify({accept:!0})})},P=l=>{fetch(`/api/v1/rooms/${l}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify({accept:!1})})},k=async()=>{if(!x.current)return;let l={};if(x.current.bio.value&&(l.bio=x.current.bio.value),x.current.fullname.value&&(l.fullname=x.current.fullname.value),x.current.password.value)if(l.password=x.current.password.value,x.current.current_password.value)l.current_password=x.current.current_password.value;else return alert("Please enter current password");if(t.current&&(l.avatar=t.current),!l.bio&&!l.fullname&&!l.password&&!l.avatar)return alert("Empty form");const _=await fetch("/api/v1/users/",{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify(l)});if(r(!1),_.ok)return alert("Updated successfully!"),c();const y=await _.json();if(y.message)return alert(y.message);alert("Error updating profile")},E=async()=>{if(window.confirm("Are you sure you want to delete your account?")){const _=window.prompt("Enter your password:");if(_!==null)try{const y={password:_},j=await fetch("/api/v1/users/",{method:"DELETE",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify(y)});if(j.ok)sessionStorage.removeItem("token"),alert("You deleted your account successfully"),f("/auth");else{const z=await j.json();z.message?alert(z.message):alert("Wrong password!")}}catch(y){console.error("Error deleting account:",y)}}},g=l=>{const _=new FormData;_.append("file",l),fetch(`/media/${n==null?void 0:n._id}/public?token=${o}`,{method:"POST",body:_}).then(y=>y.json()).then(y=>{console.log("File upload response:",y),t.current=y.url,k()}).catch(y=>{console.error("Error uploading file:",y)})};return e.jsxs("div",{id:"profile",children:[e.jsxs("div",{id:"profile_topbar",children:[e.jsx("img",{src:n==null?void 0:n.avatar,alt:"Profile",id:"profile_img",className:"cover"}),d?e.jsx(ye,{accept:"image/*",onChange:g,id:"upload-img",icon:e.jsx("i",{className:"bx bxs-camera"})}):e.jsxs("div",{children:[e.jsx("h3",{children:n==null?void 0:n.fullname}),(n==null?void 0:n.bio)&&e.jsx("p",{children:n==null?void 0:n.bio})]}),e.jsxs("div",{className:"flex",children:[d?e.jsx("button",{className:"btn",onClick:()=>r(!1),children:e.jsx("i",{className:"bx bxs-message-square-x"})}):e.jsx("button",{className:"btn",onClick:()=>r(!0),children:e.jsx("i",{className:"bx bxs-pencil"})}),e.jsx("button",{className:"btn",onClick:()=>a(l=>!l),children:u?e.jsx("i",{className:"bx bxs-message-square-x"}):e.jsxs("div",{id:"bell",children:[e.jsx("i",{className:"bx bxs-bell"}),n!=null&&n.invitations.length&&(n==null?void 0:n.invitations.length)>0?e.jsx("span",{id:"nofcount",children:n==null?void 0:n.invitations.length}):null]})}),u&&e.jsx("div",{id:"notify-container",children:n&&n.invitations.length>0?n.invitations.map(l=>e.jsxs("div",{children:[e.jsx("p",{children:l}),e.jsx("button",{onClick:()=>O(l),children:"Accept"}),e.jsx("button",{onClick:()=>P(l),children:"Refuse"})]},l)):e.jsx("p",{children:"No invitations"})}),e.jsx("button",{id:"logout-btn",className:"btn",onClick:p,children:e.jsx("i",{className:"bx bx-log-in"})})]})]}),e.jsxs("div",{ref:s,id:"profile_editor",children:[e.jsxs("form",{id:"profile_form",ref:x,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"fullname",children:"Your name:"}),e.jsx("input",{type:"text",id:"fullname",name:"fullname",placeholder:n==null?void 0:n.fullname})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bio",children:"Bio:"}),e.jsx("input",{type:"text",id:"bio",name:"bio",placeholder:n==null?void 0:n.bio})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"current_password",children:"Current password:"}),e.jsx("input",{type:"password",id:"current_password",name:"current_password"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",children:"New password:"}),e.jsx("input",{type:"password",id:"password",name:"password"})]})]}),e.jsxs("div",{className:"flex",children:[e.jsx("button",{id:"btn_delete-account",onClick:E,children:"Delete account"}),e.jsx("button",{id:"btn_submit-edit",onClick:k,children:"Save"})]})]})]})},_e=m.memo(je);const we=({token:o,onChoose:n})=>{const c=m.useRef(null),[u,a]=m.useState([]),d=()=>{var x;const s=(x=c.current)==null?void 0:x.value;s&&fetch(`/api/v1/search/${s}`,{headers:{"content-type":"application/json",authorization:"Bearer "+o}}).then(f=>{if(f.ok)return f.json().then(h=>{a(h)});console.log(f.status)})},r=s=>{s.key==="Enter"&&d()},t=s=>{c.current&&!c.current.contains(s.target)&&(a([]),c.current.value="")};return m.useEffect(()=>(document.addEventListener("click",t),()=>{document.removeEventListener("click",t)}),[]),e.jsxs("div",{id:"search-bar",children:[e.jsx("input",{type:"text",placeholder:"Search for users...",ref:c,onKeyPress:r}),e.jsx("button",{className:"btn",onClick:d,children:e.jsx("i",{className:"bx bx-search"})}),u.length>0&&e.jsx("div",{id:"search_dropdown",children:u.map(s=>e.jsxs("div",{onClick:()=>{n({_id:s._id,fullname:s.fullname})},children:[e.jsx("img",{className:"profile-picture",src:s.avatar,alt:"Avatar"}),s.fullname]},s._id))})]})};const Ee=({token:o})=>{const[n,c]=m.useState([]),u=r=>{if(n.some(t=>t._id==r._id))return alert("already selected this user");c(t=>[...t,r])},a=r=>{console.log("remove user from users list"),r>=0&&r<n.length&&c(t=>t.filter((x,f)=>f!==r))},d=async()=>{if(n.length==0)return alert("Please select a user");const r=n.map(t=>t._id);try{(await fetch("/api/v1/rooms",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+o},body:JSON.stringify({invited:r})})).ok?c([]):alert("deo biet sao bug luon")}catch(t){console.error(t)}};return e.jsxs("div",{id:"room-maker",children:[e.jsx(we,{token:o,onChoose:u}),n.length>0&&e.jsxs("div",{className:"flex",children:[e.jsx("div",{id:"chosenList",className:"flex",children:n.map((r,t)=>e.jsxs("div",{className:"chosenUser flex",children:[e.jsxs("p",{children:[" ",r.fullname]}),e.jsx("span",{onClick:()=>a(t),children:"X"})]},r.fullname))}),e.jsx("button",{className:"btn",onClick:d,children:e.jsx("i",{className:"bx bxs-message-square-add"})})]})]})};function Ce(){return e.jsxs("svg",{id:"bgrn-svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 700 700",preserveAspectRatio:"none",children:[e.jsxs("g",{mask:'url("#SvgjsMask1020")',fill:"none",children:[e.jsx("rect",{width:"700",height:"700",x:"0",y:"0",fill:'url("#SvgjsLinearGradient1021")'}),e.jsx("path",{d:"M700 0L426.65 0L700 81.54z",fill:"rgba(255, 255, 255, 0.2)"}),e.jsx("path",{d:"M426.65 0L700 81.54L700 267.52L414.62 0z",fill:"rgba(255, 255, 255, .13)"}),e.jsx("path",{d:"M414.62 0L700 267.52L700 452.46L156.39 0z",fill:"rgba(255, 255, 255, .1)"}),e.jsx("path",{d:"M156.39 0L700 452.46L700 490.96L83.34999999999998 0z",fill:"rgba(255, 255, 255, .1)"}),e.jsx("path",{d:"M0 700L154.99 700L0 376.93z",fill:"rgba(0, 0, 0, .1)"}),e.jsx("path",{d:"M0 376.93L154.99 700L303.17 700L0 371.8z",fill:"rgba(0, 0, 0, .175)"}),e.jsx("path",{d:"M0 371.8L303.17 700L525.89 700L0 229.98000000000002z",fill:"rgba(0, 0, 0, .25)"}),e.jsx("path",{d:"M0 229.98000000000002L525.89 700L592.96 700L0 184.46z",fill:"rgba(0, 0, 0, .325)"})]}),e.jsxs("defs",{children:[e.jsx("mask",{id:"SvgjsMask1020",children:e.jsx("rect",{width:"700",height:"700",fill:"#ffffff"})}),e.jsxs("linearGradient",{x1:"0%",y1:"0%",x2:"100%",y2:"100%",gradientUnits:"userSpaceOnUse",id:"SvgjsLinearGradient1021",children:[e.jsx("stop",{id:"stop_1",offset:"0"}),e.jsx("stop",{id:"stop_2",offset:"1"})]})]})]})}const Y=o=>fetch("/api/v1/users/",{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+o}}).then(n=>{if(n.ok)return n.json();throw n.status==401&&(alert("Token expired"),sessionStorage.removeItem("token"),window.location.reload()),new Error("Failed to fetch user profile")}),ke=({token:o})=>{const[n,c]=m.useState(null),[u,a]=m.useState([]),[d,r]=m.useState(0),t=F(),s=async()=>{try{const h=await Y(o);c(h)}catch{t("/auth")}},x=h=>{r(h)},f=h=>{a(h)};return m.useEffect(()=>{o&&Y(o).then(h=>{c(h)}).catch(h=>{console.error(h),t("/auth")})},[o]),e.jsx("div",{id:"main-page",className:"flex",children:n?e.jsxs(ne,{token:o,children:[e.jsxs("div",{id:"main-page_container",children:[e.jsxs("section",{id:"section-left",children:[e.jsx(_e,{token:o,profileData:n,onRefresh:s}),e.jsx(Ee,{token:o}),e.jsx(re,{userId:n._id,currentRoomIndex:d,token:o,onRoomChange:x,onUpdateStatus:f})]}),e.jsx("section",{id:"section-right",children:u.length>0&&e.jsx(ve,{profile:n,token:o,room:u[d]})})]}),e.jsx(Ce,{})]}):e.jsx("div",{children:"Loading skeleton ..."})})};export{ke as default,Y as getProfile};
