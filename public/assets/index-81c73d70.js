import{r as p,j as e,u as W,a as te,c as ne,g as se,P as re}from"./index-a353b1f6.js";import{useSocket as B}from"./index-dd51bb7c.js";const ie=({participants:s,userId:t})=>{if(s=s.filter(i=>i._id!==t),s.length===0)return e.jsx("div",{className:"card",children:e.jsx("h3",{children:"No other participants in this room."})});const d=s.length>1,f=s.slice(0,4);return e.jsx("div",{className:"card",children:d?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"group-pictures-container",children:f.map((i,o)=>e.jsx("div",{className:"profile",children:e.jsx("img",{src:i.avatar,alt:"img",className:"group-profile-picture"})},o))}),e.jsxs("div",{className:"profile-names",children:[f.length>0&&e.jsx("h3",{children:f.map(i=>i.fullname).join(", ")}),s.length>4&&e.jsxs("p",{className:"group-members-count",children:["+",s.length-4," more"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:s[0].avatar,alt:"img",className:"profile-picture"}),e.jsxs("h3",{children:[s[0].fullname+"  ",e.jsx("span",{className:s[0].isOnline?"online":"offline",children:"•"})]}),s[0].bio&&e.jsx("p",{children:s[0].bio})]})})},X=p.memo(ie);const oe=({roomId:s,handleAction:t})=>e.jsxs("div",{className:"opts-wrapper",children:[e.jsx("input",{className:"checkbox",type:"checkbox",id:`${s}_opts`}),e.jsx("label",{className:"checkbox_label",htmlFor:`${s}_opts`,children:e.jsx("i",{className:"bx bx-dots-vertical-rounded"})}),e.jsxs("div",{className:"chat-room_opts",children:[e.jsx("button",{className:"chat-room_opts_btn leave",onClick:()=>t("leave",s),children:"Leave"}),e.jsx("button",{className:"chat-room_opts_btn delete",onClick:()=>t("delete",s),children:"Delete"})]})]});const H=s=>new Promise((t,d)=>{fetch("/api/v1/rooms",{method:"GET",headers:{"content-type":"application/json",authorization:"Bearer "+s}}).then(f=>{if(f.ok)return f.json().then(i=>{t(i)});if(f.status==401)throw alert("Token expired"),sessionStorage.removeItem("token"),new Error}).catch(f=>{d(f)})}),ae=({userId:s,currentRoomIndex:t,token:d,onRoomChange:f,onUpdateStatus:i})=>{const[o,r]=p.useState([]),n=B(),l=W(),v=a=>{const g=a;r(x=>x&&x.map(O=>{const M=O.participants.map(S=>S._id===g?{...S,isOnline:!0}:S);return{...O,participants:M}}))},b=a=>{const g=a;r(x=>x&&x.map(O=>{const M=O.participants.map(S=>S._id===g?{...S,isOnline:!1}:S);return{...O,participants:M}}))},_=a=>{r(g=>g&&g.map(x=>x._id===a[1]?{...x,isMeeting:!0,meeting_uuid:a[2]}:x))},c=a=>{r(g=>g&&g.map(x=>x._id===a[0]&&x.isMeeting?{...x,isMeeting:!1,meeting_uuid:null}:x))},m=()=>{H(d).then(a=>{r(a)}).catch(()=>{l("/auth")})},w=a=>{var x,O;const g=document.querySelectorAll(".chat-room");g==null||g.forEach(M=>{var S;(S=M.classList)==null||S.remove("active")}),(O=(x=g[a])==null?void 0:x.classList)==null||O.add("active"),f(a)},E=a=>{r(g=>g&&g.map(x=>x._id===a[1]?{...x,latestMessage:{sender:a[0],content:a[2],timestamp:a[3],urls:a[4]}}:x))},y=a=>{a[1]===s&&r(g=>g.map(x=>x._id===a[0]?{...x,lastReadTimeStamp:a[2]}:x))};p.useEffect(()=>{o.length>0&&i(o)},[o]),p.useEffect(()=>{if(n)return n.on("onl",v),n.on("off",b),n.on("meet",_),n.on("end_meet",c),n.on("room",m),n.on("msg",E),n.on("seen",y),()=>{n.off("onl",v),n.off("off",b),n.off("meet",_),n.off("end_meet",c),n.off("room",m),n.off("msg",E),n.off("seen",y)}},[n]),p.useEffect(()=>{H(d).then(a=>{r(a)}).catch(()=>{l("/auth")})},[]);const h=async(a,g)=>{switch(a){case"leave":return fetch(`/api/v1/rooms/${g}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+d},body:JSON.stringify({action:a})});case"delete":return fetch(`/api/v1/rooms/${g}`,{method:"DELETE",headers:{"content-type":"application/json",authorization:"Bearer "+d}})}},T=p.useMemo(()=>o.map((a,g)=>{var A,z;const x=a==null?void 0:a.lastReadTimeStamp,O=(A=a==null?void 0:a.latestMessage)==null?void 0:A.content,M=(z=a==null?void 0:a.latestMessage)==null?void 0:z.timestamp,S=M&&x&&new Date(M)>new Date(x)&&g!==t;return e.jsxs("div",{className:`chat-room ${g==t?"active":""}`,onClick:()=>w(g),children:[e.jsxs("div",{className:"chat-room_info",children:[e.jsx(X,{userId:s,participants:a.participants}),e.jsx("p",{className:`last-msg ${S?"unread":""}`,children:O})]}),e.jsx(oe,{handleAction:h,roomId:a._id})]},a._id)}),[o]);return e.jsx("div",{id:"rooms-nav",children:o&&o.length>0?e.jsx("div",{children:T}):e.jsx("p",{children:"No rooms to display"})})};const G=({onChange:s,accept:t,id:d,icon:f})=>{const i=p.useRef(null),o=r=>{if(r.target.files){const n=r.target.files[0];s(n)}};return e.jsxs("label",{id:`btn_${d}`,className:"btn_fileinput",htmlFor:d,children:[f,e.jsx("input",{id:d,className:"fileinput",type:"file",accept:t,ref:i,onChange:o,style:{display:"none"}})]})};const le=({token:s,userId:t,roomId:d,onJustSent:f})=>{const[i,o]=p.useState(""),[r,n]=p.useState([]),[l,v]=p.useState([]),b=B(),_=async y=>{try{const h=new FormData;return y.forEach(g=>{h.append(`file${y.length>1?"s":""}`,g)}),await(await fetch(`/media/${t}/${d}?token=${s}&count=${y.length}`,{method:"POST",body:h})).json()}catch(h){throw h}},c=y=>{o(y.target.value),console.log("typing ...")},m=async()=>{let y=[],h=[];if(r.length>0&&(console.log(r.length),y=r,n([])),l.length>0&&(console.log(l.length),y=[...y,...l],v([])),y.length>0)try{const T=await _(y);T.urls&&(h=T.urls)}catch(T){return alert("error uploading files: "+T.message)}(i.trim()!==""||h.length!==0)&&(console.log(h),b==null||b.emit("msg",[d,i,new Date,h]),f(),o(""))},w=y=>{v(h=>[...h,y])},E=y=>{n(h=>[...h,y])};return e.jsxs("div",{id:"chat-box_input-container",children:[e.jsx(G,{accept:"image/*",onChange:w,id:"chatbox_upload-img",icon:e.jsx("i",{className:"bx bx-image-add"})}),e.jsx(G,{accept:"*",onChange:E,id:"chatbox_upload-file",icon:e.jsx("i",{className:"bx bx-paperclip"})}),l.length>0&&e.jsx("div",{children:l.map((y,h)=>e.jsx("span",{children:y.name},h))}),r.length>0&&e.jsx("div",{children:r.map((y,h)=>e.jsx("span",{children:y.name},h))}),e.jsx("input",{type:"text",value:i,id:"input_message",onChange:c,onKeyDown:y=>{y.key=="Enter"&&m()}}),e.jsx("button",{onClick:m,className:"btn",children:e.jsx("i",{className:"bx bxs-send"})})]})},ce=p.memo(le);const D=(s,t,d)=>{const f=`/meet/${t}?token=${s}&room=${d}`;window.open(f)},ue=({token:s,room:t,userId:d})=>{const f=B(),i=()=>{f==null||f.emit("meet",[t._id,new Date])},o=r=>{if(console.log(r),r[0]==d)return r[3]?void 0:D(s,r[2],r[1]);Notification.permission==="granted"?new Notification("Incoming Call",{body:"You have an incoming call. Do you want to join?",icon:"path/to/notification-icon.png",requireInteraction:!0}).addEventListener("click",()=>{D(s,r[2],r[1])}):Notification.permission!=="denied"&&Notification.requestPermission().then(n=>{n==="granted"&&o(r)})};return p.useEffect(()=>{if(t&&f)return f.on("meet",o),()=>{f.off("meet",o)}},[f,t]),e.jsx("div",{id:"chat-box_topbar",className:"flex",children:t&&e.jsxs("div",{id:"chat-box_topbar_left",children:[e.jsx(X,{userId:d,participants:t.participants}),t.isMeeting&&t.meeting_uuid?e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"This room is in a meeting"}),e.jsx("button",{onClick:()=>D(s,t.meeting_uuid,t._id),children:"Join"})]}):e.jsx("button",{className:"btn",onClick:i,children:e.jsx("i",{className:"bx bxs-video"})})]})})},de=p.memo(ue);var Z={exports:{}};(function(s,t){(function(f,i){s.exports=i(p,te)})(ne,function(d,f){return function(i){var o={};function r(n){if(o[n])return o[n].exports;var l=o[n]={i:n,l:!1,exports:{}};return i[n].call(l.exports,l,l.exports,r),l.l=!0,l.exports}return r.m=i,r.c=o,r.d=function(n,l,v){r.o(n,l)||Object.defineProperty(n,l,{enumerable:!0,get:v})},r.r=function(n){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,l){if(l&1&&(n=r(n)),l&8||l&4&&typeof n=="object"&&n&&n.__esModule)return n;var v=Object.create(null);if(r.r(v),Object.defineProperty(v,"default",{enumerable:!0,value:n}),l&2&&typeof n!="string")for(var b in n)r.d(v,b,(function(_){return n[_]}).bind(null,b));return v},r.n=function(n){var l=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(l,"a",l),l},r.o=function(n,l){return Object.prototype.hasOwnProperty.call(n,l)},r.p="",r(r.s=4)}([function(i,o,r){i.exports=r(5)()},function(i,o){i.exports=d},function(i,o){i.exports=f},function(i,o){i.exports=function(r,n,l){var v=r.direction,b=r.value;switch(v){case"top":return l.top+b<n.top&&l.bottom>n.bottom&&l.left<n.left&&l.right>n.right;case"left":return l.left+b<n.left&&l.bottom>n.bottom&&l.top<n.top&&l.right>n.right;case"bottom":return l.bottom-b>n.bottom&&l.left<n.left&&l.right>n.right&&l.top<n.top;case"right":return l.right-b>n.right&&l.left<n.left&&l.top<n.top&&l.bottom>n.bottom}}},function(i,o,r){r.r(o),r.d(o,"default",function(){return z});var n=r(1),l=r.n(n),v=r(2),b=r.n(v),_=r(0),c=r.n(_),m=r(3),w=r.n(m);function E(j){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?E=function(N){return typeof N}:E=function(N){return N&&typeof Symbol=="function"&&N.constructor===Symbol&&N!==Symbol.prototype?"symbol":typeof N},E(j)}function y(j,C){if(!(j instanceof C))throw new TypeError("Cannot call a class as a function")}function h(j,C){for(var N=0;N<C.length;N++){var u=C[N];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(j,u.key,u)}}function T(j,C,N){return C&&h(j.prototype,C),N&&h(j,N),j}function a(j,C){return C&&(E(C)==="object"||typeof C=="function")?C:x(j)}function g(j){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(N){return N.__proto__||Object.getPrototypeOf(N)},g(j)}function x(j){if(j===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return j}function O(j,C){if(typeof C!="function"&&C!==null)throw new TypeError("Super expression must either be null or a function");j.prototype=Object.create(C&&C.prototype,{constructor:{value:j,writable:!0,configurable:!0}}),C&&M(j,C)}function M(j,C){return M=Object.setPrototypeOf||function(u,R){return u.__proto__=R,u},M(j,C)}function S(j,C,N){return C in j?Object.defineProperty(j,C,{value:N,enumerable:!0,configurable:!0,writable:!0}):j[C]=N,j}function A(j){return j.width===void 0&&(j.width=j.right-j.left),j.height===void 0&&(j.height=j.bottom-j.top),j}var z=function(j){O(C,j);function C(N){var u;return y(this,C),u=a(this,g(C).call(this,N)),S(x(u),"getContainer",function(){return u.props.containment||window}),S(x(u),"addEventListener",function(R,P,k,U){u.debounceCheck||(u.debounceCheck={});var L,F,I=function(){L=null,u.check()};U>-1?F=function(){L||(L=setTimeout(I,U||0))}:F=function(){clearTimeout(L),L=setTimeout(I,k||0)};var V={target:R,fn:F,getLastTimeout:function(){return L}};R.addEventListener(P,V.fn),u.debounceCheck[P]=V}),S(x(u),"startWatching",function(){u.debounceCheck||u.interval||(u.props.intervalCheck&&(u.interval=setInterval(u.check,u.props.intervalDelay)),u.props.scrollCheck&&u.addEventListener(u.getContainer(),"scroll",u.props.scrollDelay,u.props.scrollThrottle),u.props.resizeCheck&&u.addEventListener(window,"resize",u.props.resizeDelay,u.props.resizeThrottle),!u.props.delayedCall&&u.check())}),S(x(u),"stopWatching",function(){if(u.debounceCheck){for(var R in u.debounceCheck)if(u.debounceCheck.hasOwnProperty(R)){var P=u.debounceCheck[R];clearTimeout(P.getLastTimeout()),P.target.removeEventListener(R,P.fn),u.debounceCheck[R]=null}}u.debounceCheck=null,u.interval&&(u.interval=clearInterval(u.interval))}),S(x(u),"check",function(){var R=u.node,P,k;if(!R)return u.state;if(P=A(u.roundRectDown(R.getBoundingClientRect())),u.props.containment){var U=u.props.containment.getBoundingClientRect();k={top:U.top,left:U.left,bottom:U.bottom,right:U.right}}else k={top:0,left:0,bottom:window.innerHeight||document.documentElement.clientHeight,right:window.innerWidth||document.documentElement.clientWidth};var L=u.props.offset||{},F=E(L)==="object";F&&(k.top+=L.top||0,k.left+=L.left||0,k.bottom-=L.bottom||0,k.right-=L.right||0);var I={top:P.top>=k.top,left:P.left>=k.left,bottom:P.bottom<=k.bottom,right:P.right<=k.right},V=P.height>0&&P.width>0,$=V&&I.top&&I.left&&I.bottom&&I.right;if(V&&u.props.partialVisibility){var J=P.top<=k.bottom&&P.bottom>=k.top&&P.left<=k.right&&P.right>=k.left;typeof u.props.partialVisibility=="string"&&(J=I[u.props.partialVisibility]),$=u.props.minTopValue?J&&P.top<=k.bottom-u.props.minTopValue:J}typeof L.direction=="string"&&typeof L.value=="number"&&(console.warn("[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }",L.direction,L.value),$=w()(L,P,k));var K=u.state;return u.state.isVisible!==$&&(K={isVisible:$,visibilityRect:I},u.setState(K),u.props.onChange&&u.props.onChange($)),K}),u.state={isVisible:null,visibilityRect:{}},u}return T(C,[{key:"componentDidMount",value:function(){this.node=b.a.findDOMNode(this),this.props.active&&this.startWatching()}},{key:"componentWillUnmount",value:function(){this.stopWatching()}},{key:"componentDidUpdate",value:function(u){this.node=b.a.findDOMNode(this),this.props.active&&!u.active?(this.setState({isVisible:null,visibilityRect:{}}),this.startWatching()):this.props.active||this.stopWatching()}},{key:"roundRectDown",value:function(u){return{top:Math.floor(u.top),left:Math.floor(u.left),bottom:Math.floor(u.bottom),right:Math.floor(u.right)}}},{key:"render",value:function(){return this.props.children instanceof Function?this.props.children({isVisible:this.state.isVisible,visibilityRect:this.state.visibilityRect}):l.a.Children.only(this.props.children)}}]),C}(l.a.Component);S(z,"defaultProps",{active:!0,partialVisibility:!1,minTopValue:0,scrollCheck:!1,scrollDelay:250,scrollThrottle:-1,resizeCheck:!1,resizeDelay:250,resizeThrottle:-1,intervalCheck:!0,intervalDelay:100,delayedCall:!1,offset:{},containment:null,children:l.a.createElement("span",null)}),S(z,"propTypes",{onChange:c.a.func,active:c.a.bool,partialVisibility:c.a.oneOfType([c.a.bool,c.a.oneOf(["top","right","bottom","left"])]),delayedCall:c.a.bool,offset:c.a.oneOfType([c.a.shape({top:c.a.number,left:c.a.number,bottom:c.a.number,right:c.a.number}),c.a.shape({direction:c.a.oneOf(["top","right","bottom","left"]),value:c.a.number})]),scrollCheck:c.a.bool,scrollDelay:c.a.number,scrollThrottle:c.a.number,resizeCheck:c.a.bool,resizeDelay:c.a.number,resizeThrottle:c.a.number,intervalCheck:c.a.bool,intervalDelay:c.a.number,containment:typeof window<"u"?c.a.instanceOf(window.Element):c.a.any,children:c.a.oneOfType([c.a.element,c.a.func]),minTopValue:c.a.number})},function(i,o,r){var n=r(6);function l(){}function v(){}v.resetWarningCache=l,i.exports=function(){function b(m,w,E,y,h,T){if(T!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}b.isRequired=b;function _(){return b}var c={array:b,bool:b,func:b,number:b,object:b,string:b,symbol:b,any:b,arrayOf:_,element:b,elementType:b,instanceOf:_,node:b,objectOf:_,oneOf:_,oneOfType:_,shape:_,exact:_,checkPropTypes:v,resetWarningCache:l};return c.PropTypes=c,c}},function(i,o,r){var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";i.exports=n}])})})(Z);var fe=Z.exports;const he=se(fe);const pe=({src:s,alt:t})=>{const[d,f]=p.useState(!1);return p.useEffect(()=>{const i=new IntersectionObserver(r=>{r.forEach(n=>{n.isIntersecting&&(f(!0),i.unobserve(n.target))})}),o=document.getElementById(`lazyload-element-${s}`);return o&&i.observe(o),()=>{o&&i.unobserve(o)}},[s]),e.jsx("video",{id:`lazyload-element-${s}`,controls:!0,autoPlay:!1,playsInline:!0,src:d?s:"",children:t})},me=({src:s,alt:t})=>{const[d,f]=p.useState(!1);return p.useEffect(()=>{const i=new IntersectionObserver(r=>{r.forEach(n=>{n.isIntersecting&&(f(!0),i.unobserve(n.target))})}),o=document.getElementById(`lazyload-element-${s}`);return o&&i.observe(o),()=>{o&&i.unobserve(o)}},[s]),e.jsx("img",{id:`lazyload-element-${s}`,src:d?s:"",loading:"lazy",alt:t})},ee=({url:s,token:t})=>{var n;const[d,f]=p.useState(!1),[i,o]=p.useState(!1),r=((n=s.split("/").pop())==null?void 0:n.substring(23))||"File";return p.useEffect(()=>{var v;const l=(v=s.split(".").pop())==null?void 0:v.toLowerCase();f(["jpg","jpeg","png","gif","bmp","svg"].includes(l||"")),o(["mp4","webm","ogg"].includes(l||""))},[s]),d?e.jsx(me,{src:s+"?token="+t,alt:r}):i?e.jsx(pe,{src:s+"?token="+t,alt:r}):e.jsx("a",{href:s+"?token="+t,target:"_blank",rel:"noopener noreferrer",children:r})},ge=({token:s,content:t,timestamp:d,urls:f,seenList:i})=>e.jsxs("div",{className:"message out",children:[e.jsx("div",{className:"message_wrapper",children:e.jsx("p",{children:t})}),e.jsx("p",{className:"message_timestamp",children:d}),f&&f.length>0&&f.map((o,r)=>e.jsx(ee,{token:s,url:o},d+r)),i&&i.length>0&&e.jsxs("p",{className:"message_seenby",children:["Seen by:",i.map((o,r)=>e.jsx("span",{children:" "+o},r))]})]}),be=({token:s,avatarSRC:t,content:d,timestamp:f,urls:i,seenList:o})=>e.jsxs("div",{className:"message in",children:[e.jsxs("div",{className:"message_wrapper",children:[e.jsx("img",{className:"inchat-avatar",src:t,alt:"Sender Avatar"}),e.jsx("p",{children:d}),i&&i.length>0&&i.map((r,n)=>e.jsx(ee,{token:s,url:r},f+n))]}),e.jsx("p",{className:"message_timestamp",children:f}),o&&o.length>0&&e.jsxs("p",{className:"message_seenby",children:["Seen by:",o.map((r,n)=>e.jsx("span",{children:r},n))]})]}),xe=({readCursors:s,token:t,messages:d,roomId:f,userId:i,participants:o})=>{const[r,n]=p.useState({}),l=p.useRef(d.length),v=B(),b=p.useMemo(()=>Object.fromEntries(o.map(m=>[m._id,m])),[o]),_=p.useMemo(()=>(m,w)=>{const E=w[m];return E?E.avatar:""},[]),c=p.useCallback(m=>{m[0]===f&&n(w=>({...w,[m[1]]:l.current-1}))},[f]);return p.useEffect(()=>{l.current=d.length},[d.length]),p.useEffect(()=>{if(v)return v.on("seen",c),()=>{v.off("seen",c)}},[v,f]),p.useEffect(()=>{const m={};s.filter(w=>w._id!==i).forEach(w=>{const E=new Date(w.lastReadTimeStamp).getTime();let y=0,h=d.length-1,T=-1;for(;y<=h;){const a=Math.floor((y+h)/2);new Date(d[a].timestamp).getTime()<=E?(T=a,y=a+1):h=a-1}T!==-1&&(m[w._id]=T)}),n(m)},[s]),e.jsx(e.Fragment,{children:d.map((m,w)=>{const E=o.filter(y=>r[y._id]===w).map(y=>y.fullname);return m.sender&&m.sender===i?e.jsx(ge,{token:t,content:m.content,timestamp:m.timestamp,urls:m.urls,seenList:E},w):e.jsx(be,{token:t,avatarSRC:_(m.sender,b),content:m.content,timestamp:m.timestamp,urls:m.urls,seenList:E},w)})})},ye=p.memo(xe);const Y=(s,t,d,f)=>fetch(`/api/v1/rooms/${s}?limit=${d}&skip=${f}`,{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+t}}).then(i=>{if(i.status===304)throw new Error("Already got this");if(i.ok)return i.json();throw i.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch messages")}),q=30,ve=({token:s,room:t,userId:d,justSent:f})=>{const[i,o]=p.useState([]),[r,n]=p.useState(0),[l,v]=p.useState([]),b=p.useRef(null),_=p.useRef(null),c=p.useRef(null),m=p.useRef(null),w=B(),E=W(),y=a=>{if(a[1]===t._id){const g=a[0];if(g!==d&&!t.participants.some(S=>S._id===g))return;c.current&&(c.current.style.display="block");const x=a[2],O=a[3],M=a[4];w==null||w.emit("seen",[t._id,new Date]),n(S=>S++),o(S=>S!==null?[...S,{sender:g,content:x,timestamp:O,urls:M}]:[{sender:g,content:x,timestamp:O,urls:M}])}},h=()=>{_.current&&(_.current.scrollIntoView({behavior:"smooth"}),c.current&&(c.current.style.display="none"))},T=a=>{if(!a||!i||i.length==0)return;if(i.length>=r){b.current&&(b.current.style.display="none");return}let g,x=q;g=r-i.length-x,g<0&&(x+=g,g=0),Y(t._id,s,`${x}`,`${g}`).then(O=>{m.current&&(m.current.scrollTop=300),o(M=>M?O.messages.concat(M):O.messages),O.conversationLength&&n(O.conversationLength),O.readCursors&&v(O.readCursors)}).catch(()=>{E("/auth")})};return p.useEffect(()=>{try{if(!s||!t)return;Y(t._id,s).then(a=>{a.messages&&o(a.messages),a.conversationLength&&n(a.conversationLength),a.readCursors&&v(a.readCursors)}).catch(()=>{E("/auth")})}catch(a){console.error(a)}},[s,t._id]),p.useEffect(()=>{if(w)return w.on("msg",y),()=>{w.off("msg",y)}},[w,t]),p.useEffect(()=>{b.current&&(b.current.style.display="none");const a=setTimeout(()=>{b.current&&m.current&&m.current.scrollHeight>m.current.clientHeight&&(b.current.style.display="flex")},1e3);return()=>{clearTimeout(a)}},[t._id]),p.useEffect(()=>{if(!(!m.current||!i)){if(i.length<=q||Math.abs(m.current.scrollHeight-m.current.scrollTop-m.current.clientHeight)<300)return h();if(i[i.length-1].sender==d&&f)return f=!1,h()}},[i]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:m,id:"messages-container",children:[e.jsx(he,{onChange:T,children:e.jsx("div",{ref:b,id:"topRef",children:e.jsx(re,{size:50})})}),i&&e.jsx(ye,{readCursors:l,token:s,messages:i,roomId:t._id,userId:d,participants:t.participants}),e.jsx("div",{ref:_})]}),e.jsxs("button",{id:"btn_scroll",ref:c,onClick:()=>{h()},children:[Array.isArray(i)&&i.length>1&&i[i.length-1].content,e.jsx("i",{className:"bx bx-down-arrow-alt"})]})]})};const je=({room:s,token:t,profile:d})=>{const[f,i]=p.useState(!1),o=p.useCallback(()=>{i(!0)},[]);return e.jsxs("div",{id:"chat-box",children:[e.jsx(de,{token:t,userId:d._id,room:s}),s&&e.jsx(ve,{justSent:f,room:s,token:t,userId:d._id}),s&&e.jsx(ce,{token:t,userId:d._id,roomId:s._id,onJustSent:o})]})},_e=s=>new Promise(async(t,d)=>{if(!window.confirm("Are you sure you want to delete your account?"))return d("Account deletion canceled");const i=window.prompt("Enter your password:");if(!i)return d("Password input canceled");try{const o={password:i},r=await fetch("/api/v1/users/",{method:"DELETE",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify(o)});if(r.ok)return sessionStorage.removeItem("token"),t("Account deletion successful");const n=await r.json();if(n.message)return d(n.message);d("Wrong password")}catch(o){d(o)}});const we=({token:s,profileData:t,onRefresh:d})=>{const[f,i]=p.useState(!1),[o,r]=p.useState(!1),n=p.useRef(null),l=p.useRef(null),v=W(),b=B();p.useEffect(()=>{if(b)return b.on("inv",d),()=>{b.off("inv",d)}},[b]);const _=()=>{sessionStorage.removeItem("token"),v("/auth")},c=h=>{fetch(`/api/v1/rooms/${h}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify({action:"join"})})},m=h=>{fetch(`/api/v1/rooms/${h}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify({action:"refuse"})})},w=async()=>{if(!l.current)return;let h={};if(l.current.bio.value&&(h.bio=l.current.bio.value),l.current.fullname.value&&(h.fullname=l.current.fullname.value),l.current.password.value)if(h.password=l.current.password.value,l.current.current_password.value)h.current_password=l.current.current_password.value;else return alert("Please enter current password");if(n.current&&(h.avatar=n.current),!h.bio&&!h.fullname&&!h.password&&!h.avatar)return alert("Empty form");const T=await fetch("/api/v1/users/",{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify(h)});if(r(!1),T.ok)return alert("Updated successfully!"),d();const a=await T.json();if(a.message)return alert(a.message);alert("Error updating profile")},E=async h=>{const T=new FormData;T.append("file",h);const a=await fetch(`/media/${t==null?void 0:t._id}/public?token=${s}&count=1`,{method:"POST",body:T}),g=await a.json();!a.ok&&g.message&&alert(g.message),g.urls&&(n.current=g.urls[0],w())},y=async()=>{try{const h=await _e(s);alert(h),v("/auth")}catch(h){alert(h)}};return e.jsxs("div",{id:"profile",children:[e.jsxs("div",{id:"profile_topbar",children:[e.jsx("img",{src:t==null?void 0:t.avatar,alt:"Profile",id:"profile_img",className:"cover"}),o?e.jsx(G,{accept:"image/*",onChange:E,id:"upload-img",icon:e.jsx("i",{className:"bx bxs-camera"})}):e.jsxs("div",{children:[e.jsx("h3",{children:t==null?void 0:t.fullname}),(t==null?void 0:t.bio)&&e.jsx("p",{children:t==null?void 0:t.bio})]}),e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"btn",onClick:()=>{i(!1),r(h=>!h)},children:o?e.jsx("i",{className:"bx bxs-message-square-x"}):e.jsx("i",{className:"bx bxs-pencil"})}),e.jsx("button",{className:"btn",onClick:()=>{r(!1),i(h=>!h)},children:f?e.jsx("i",{className:"bx bxs-message-square-x"}):e.jsxs("div",{id:"bell",children:[e.jsx("i",{className:"bx bxs-bell"}),t!=null&&t.invitations.length&&(t==null?void 0:t.invitations.length)>0?e.jsx("span",{id:"nofcount",children:t==null?void 0:t.invitations.length}):null]})}),e.jsx("button",{id:"logout-btn",className:"btn",onClick:_,children:e.jsx("i",{className:"bx bx-log-in"})})]})]}),e.jsx("div",{id:"notify-container",className:`profile_dropdown ${f?"active":""}`,children:t&&t.invitations.length>0?t.invitations.map(h=>e.jsxs("div",{children:[e.jsx("p",{children:h}),e.jsx("button",{onClick:()=>c(h),children:"Accept"}),e.jsx("button",{onClick:()=>m(h),children:"Refuse"})]},h)):e.jsx("p",{children:"No invitations"})}),e.jsxs("div",{className:`profile_dropdown ${o?"active":""}`,id:"profile_editor",children:[e.jsxs("form",{id:"profile_form",ref:l,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"fullname",children:"Your name:"}),e.jsx("input",{type:"text",id:"fullname",name:"fullname",placeholder:t==null?void 0:t.fullname})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bio",children:"Bio:"}),e.jsx("input",{type:"text",id:"bio",name:"bio",placeholder:t==null?void 0:t.bio})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"current_password",children:"Current password:"}),e.jsx("input",{type:"password",id:"current_password",name:"current_password"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",children:"New password:"}),e.jsx("input",{type:"password",id:"password",name:"password"})]})]}),e.jsxs("div",{className:"flex",children:[e.jsx("button",{id:"btn_delete-account",onClick:y,children:"Delete account"}),e.jsx("button",{id:"btn_submit-edit",onClick:w,children:"Save"})]})]})]})},Ce=p.memo(we);const Ee=({token:s})=>{const[t,d]=p.useState([]),[f,i]=p.useState([]),o=p.useRef(null),r=c=>{if(t.some(m=>m._id==c._id))return alert("already selected this user");d(m=>[...m,c])},n=c=>{console.log("remove user from users list"),c>=0&&c<t.length&&d(m=>m.filter((E,y)=>y!==c))},l=async()=>{if(t.length==0)return alert("Please select a user");const c=t.map(m=>m._id);try{(await fetch("/api/v1/rooms",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify({invited:c})})).ok?d([]):alert("deo biet sao bug luon")}catch(m){console.error(m)}},v=()=>{var m;const c=(m=o.current)==null?void 0:m.value;c&&fetch(`/api/v1/search/${c}`,{headers:{"content-type":"application/json",authorization:"Bearer "+s}}).then(w=>{if(w.ok)return w.json().then(E=>{i(E)});console.log(w.status)})},b=c=>{c.key==="Enter"&&v()},_=c=>{o.current&&!o.current.contains(c.target)&&(i([]),o.current.value="")};return p.useEffect(()=>(document.addEventListener("click",_),()=>{document.removeEventListener("click",_)}),[]),e.jsxs("div",{id:"room-maker",className:`${f.length>0?"focus":""}`,children:[e.jsx("div",{id:"search-bar-wrapper",className:"flex",children:e.jsxs("div",{id:"search-bar",children:[e.jsxs("div",{id:"chosenList",className:"flex",children:[t.map((c,m)=>e.jsxs("div",{className:"chosenUser flex",children:[e.jsxs("p",{children:[" ",c.fullname]}),e.jsx("span",{onClick:()=>n(m),children:e.jsx("i",{className:"bx bx-x-circle"})})]},c.fullname)),t.length>0&&e.jsx("div",{className:"flex",children:e.jsx("button",{className:"btn",onClick:l,children:e.jsx("i",{className:"bx bxs-message-square-add ",id:"btn_createroom"})})})]}),e.jsx("input",{type:"text",placeholder:"Search for users...",ref:o,onKeyPress:b})]})}),f.length>0&&e.jsx("div",{id:"search_dropdown",children:f.map(c=>e.jsxs("div",{className:"search_dropdown_opts",onClick:()=>{r({_id:c._id,fullname:c.fullname})},children:[e.jsx("img",{className:"profile-picture",src:c.avatar,alt:"Avatar"}),e.jsx("h3",{children:c.fullname})]},c._id))})]})},Q=s=>fetch("/api/v1/users/",{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+s}}).then(t=>{if(t.ok)return t.json();throw t.status==401&&(alert("Token expired"),sessionStorage.removeItem("token"),window.location.reload()),new Error("Failed to fetch user profile")}),Se=({token:s})=>{const[t,d]=p.useState(null),[f,i]=p.useState([]),[o,r]=p.useState(0);console.log("render main");const n=W(),l=async()=>{try{console.log("Loading profile again...");const _=await Q(s);d(_)}catch{n("/auth")}},v=p.useCallback(_=>{r(_)},[]),b=p.useCallback(_=>{i(_)},[]);return p.useEffect(()=>{s&&Q(s).then(_=>{d(_)}).catch(_=>{console.error(_),n("/auth")})},[s]),e.jsx("div",{id:"main-page",className:"flex",children:t?e.jsx(e.Fragment,{children:e.jsxs("div",{id:"main-page_container",children:[e.jsxs("section",{id:"section-left",children:[e.jsx(Ce,{token:s,profileData:t,onRefresh:l}),e.jsx(Ee,{token:s}),e.jsx(ae,{userId:t._id,currentRoomIndex:o,token:s,onRoomChange:v,onUpdateStatus:b})]}),e.jsx("section",{id:"section-right",children:e.jsx(je,{profile:t,token:s,room:f[o]})})]})}):e.jsx("div",{children:"Loading skeleton ..."})})},Oe=p.memo(Se);export{Oe as default,Q as getProfile};
