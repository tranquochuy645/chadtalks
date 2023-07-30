import{r as m,j as e,u as W,a as ee,c as te,g as ne,P as se}from"./index-98ecba01.js";import{u as B,S as re}from"./index-4f348819.js";const ie=({participants:s,userId:n})=>{if(s=s.filter(r=>r._id!==n),s.length===0)return e.jsx("div",{className:"card",children:e.jsx("h3",{children:"No other participants in this room."})});const c=s.length>1,f=s.slice(0,4);return e.jsx("div",{className:"card",children:c?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"group-pictures-container",children:f.map((r,a)=>e.jsx("div",{className:"profile",children:e.jsx("img",{src:r.avatar,alt:"Profile",className:"group-profile-picture"})},a))}),e.jsxs("div",{className:"profile-names",children:[f.length>0&&e.jsx("h3",{children:f.map(r=>r.fullname).join(", ")}),s.length>4&&e.jsxs("p",{className:"group-members-count",children:["+",s.length-4," more"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:s[0].avatar,alt:"Profile",className:"profile-picture"}),e.jsxs("h3",{children:[s[0].fullname+"  ",e.jsx("span",{className:s[0].isOnline?"online":"offline",children:"•"})]}),s[0].bio&&e.jsx("p",{children:s[0].bio})]})})},q=m.memo(ie),oe=({roomId:s,handleAction:n})=>e.jsxs(e.Fragment,{children:[e.jsx("input",{className:"checkbox",type:"checkbox",id:`${s}_opts`}),e.jsx("label",{className:"checkbox_label",htmlFor:`${s}_opts`,children:e.jsx("i",{className:"bx bx-dots-vertical-rounded"})}),e.jsxs("div",{className:"chat-room_opts",children:[e.jsx("button",{onClick:()=>n("leave",s),children:"Leave"}),e.jsx("button",{onClick:()=>n("delete",s),children:"Delete"})]})]});const D=s=>new Promise((n,c)=>{fetch("/api/v1/rooms",{method:"GET",headers:{"content-type":"application/json",authorization:"Bearer "+s}}).then(f=>{if(f.ok)return f.json().then(r=>{n(r)});if(f.status==401)throw alert("Token expired"),sessionStorage.removeItem("token"),new Error}).catch(f=>{c(f)})}),ae=({userId:s,currentRoomIndex:n,token:c,onRoomChange:f,onUpdateStatus:r})=>{const[a,i]=m.useState([]),t=B(),o=W(),j=u=>{const x=u;i(b=>b&&b.map(N=>{const M=N.participants.map(S=>S._id===x?{...S,isOnline:!0}:S);return{...N,participants:M}}))},g=u=>{const x=u;i(b=>b&&b.map(N=>{const M=N.participants.map(S=>S._id===x?{...S,isOnline:!1}:S);return{...N,participants:M}}))},_=u=>{console.log("set meet"),i(x=>x&&x.map(b=>b._id===u[1]?{...b,isMeeting:!0,meeting_uuid:u[2]}:b))},l=u=>{console.log("set end meet"),i(x=>x&&x.map(b=>b._id===u[0]&&b.isMeeting?{...b,isMeeting:!1,meeting_uuid:null}:b))},p=()=>{D(c).then(u=>{i(u)}).catch(()=>{o("/auth")})},w=u=>{var b,N;const x=document.querySelectorAll(".chat-room");x==null||x.forEach(M=>{var S;(S=M.classList)==null||S.remove("active")}),(N=(b=x[u])==null?void 0:b.classList)==null||N.add("active"),f(u)},T=u=>{console.log(u),i(x=>x&&x.map(b=>b._id===u[1]?{...b,latestMessage:{sender:u[0],content:u[2],timestamp:u[3],urls:u[4]}}:b))},v=u=>{u[1]===s&&i(x=>x.map(b=>b._id===u[0]?{...b,lastReadTimeStamp:u[2]}:b))};m.useEffect(()=>{a.length>0&&r(a)},[a]),m.useEffect(()=>{if(t)return t.on("onl",j),t.on("off",g),t.on("meet",_),t.on("end_meet",l),t.on("room",p),t.on("msg",T),t.on("seen",v),()=>{t.off("onl",j),t.off("off",g),t.off("meet",_),t.off("end_meet",l),t.off("room",p),t.off("msg",T),t.off("seen",v)}},[t]),m.useEffect(()=>{D(c).then(u=>{i(u)}).catch(()=>{o("/auth")})},[]);const h=async(u,x)=>{switch(u){case"leave":return fetch(`/api/v1/rooms/${x}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+c},body:JSON.stringify({action:u})});case"delete":return fetch(`/api/v1/rooms/${x}`,{method:"DELETE",headers:{"content-type":"application/json",authorization:"Bearer "+c}})}},L=m.useMemo(()=>a.map((u,x)=>{var V,U;const b=u==null?void 0:u.lastReadTimeStamp,N=(V=u==null?void 0:u.latestMessage)==null?void 0:V.content,M=(U=u==null?void 0:u.latestMessage)==null?void 0:U.timestamp,S=M&&b&&new Date(M)>new Date(b)&&x!==n;return e.jsxs("div",{className:`chat-room ${x==n?"active":""}`,children:[e.jsxs("div",{onClick:()=>w(x),children:[e.jsx(q,{userId:s,participants:u.participants}),e.jsx("p",{children:N}),e.jsx("p",{children:S?"Unread":"All Read"})]}),e.jsx(oe,{handleAction:h,roomId:u._id})]},u._id)}),[a]);return e.jsx("div",{id:"rooms-list",children:a&&a.length>0?e.jsx("div",{children:L}):e.jsx("p",{children:"No rooms to display"})})};const K=({onChange:s,accept:n,id:c,icon:f})=>{const r=m.useRef(null),a=i=>{if(i.target.files){const t=i.target.files[0];s(t)}};return e.jsxs("label",{id:`btn_${c}`,className:"btn_fileinput",htmlFor:c,children:[f,e.jsx("input",{id:c,className:"fileinput",type:"file",accept:n,ref:r,onChange:a,style:{display:"none"}})]})};const le=({token:s,userId:n,roomId:c,onJustSent:f})=>{const[r,a]=m.useState(""),[i,t]=m.useState([]),[o,j]=m.useState([]),g=B(),_=async v=>{try{const h=new FormData;return v.forEach(x=>{h.append(`file${v.length>1?"s":""}`,x)}),await(await fetch(`/media/${n}/${c}?token=${s}&count=${v.length}`,{method:"POST",body:h})).json()}catch(h){throw h}},l=v=>{a(v.target.value),console.log("typing ...")},p=async()=>{let v=[],h=[];if(i.length>0&&(console.log(i.length),v=i,t([])),o.length>0&&(console.log(o.length),v=[...v,...o],j([])),v.length>0)try{const L=await _(v);L.urls&&(h=L.urls)}catch(L){return alert("error uploading files: "+L.message)}(r.trim()!==""||h.length!==0)&&(console.log(h),g==null||g.emit("msg",[c,r,new Date,h]),f(),a(""))},w=v=>{j(h=>[...h,v])},T=v=>{t(h=>[...h,v])};return e.jsxs("div",{id:"chat-box_input-container",children:[e.jsx(K,{accept:"image/*",onChange:w,id:"chatbox_upload-img",icon:e.jsx("i",{className:"bx bx-image-add"})}),e.jsx(K,{accept:"*",onChange:T,id:"chatbox_upload-file",icon:e.jsx("i",{className:"bx bx-paperclip"})}),o.length>0&&e.jsx("div",{children:o.map((v,h)=>e.jsx("span",{children:v.name},h))}),i.length>0&&e.jsx("div",{children:i.map((v,h)=>e.jsx("span",{children:v.name},h))}),e.jsx("input",{type:"text",value:r,id:"input_message",onChange:l,onKeyDown:v=>{v.key=="Enter"&&p()}}),e.jsx("button",{onClick:p,className:"btn",children:e.jsx("i",{className:"bx bxs-send"})})]})},ce=m.memo(le);const ue={light:{text:"#000",background:"#fff",theme:"#009688"},dark:{text:"#ffffff",background:"#000",theme:"#240063"}},de=()=>{const[s,n]=m.useState(sessionStorage.getItem("theme")||"light");return m.useEffect(()=>{const c=ue[s];Object.entries(c).forEach(([f,r])=>{document.documentElement.style.setProperty(`--${f}-color`,r)}),sessionStorage.setItem("theme",s)},[s]),[s,n]},fe=()=>{const[s,n]=de(),c=s==="light",f=()=>{n(c?"dark":"light")};return e.jsxs("div",{className:"theme-switch-container",children:[e.jsx("input",{type:"checkbox",id:"switcher-input",checked:c,onChange:f}),e.jsxs("label",{className:`switcher-label ${c?"":"active"}`,htmlFor:"switcher-input",children:[e.jsx("i",{className:"fas fa-solid fa-sun"}),e.jsx("span",{className:"switcher-toggler"}),e.jsx("i",{className:"fas fa-solid fa-moon"})]})]})};const he=({token:s,room:n,userId:c})=>{const f=B(),r=()=>{f.emit("meet",[n._id,new Date])},a=t=>{const o=`/meet/${t}?token=${s}&room=${n._id}`;window.open(o)},i=t=>{if(console.log(t),t[0]==c)return t[3]?void 0:a(t[2]);Notification.permission==="granted"?new Notification("Incoming Call",{body:"You have an incoming call. Do you want to join?",icon:"path/to/notification-icon.png",requireInteraction:!0}).addEventListener("click",()=>{a(t[2])}):Notification.permission!=="denied"&&Notification.requestPermission().then(o=>{o==="granted"&&i(t)})};return n&&m.useEffect(()=>{if(f)return f.on("meet",i),()=>{f.off("meet",i)}},[f,n._id]),e.jsxs("div",{id:"chat-box_topbar",className:"flex",children:[n&&e.jsxs("div",{id:"chat-box_topbar_left",children:[e.jsx(q,{userId:c,participants:n.participants}),n.isMeeting&&n.meeting_uuid?e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"This room is in a meeting"}),e.jsx("button",{onClick:()=>a(n.meeting_uuid),children:"Join"})]}):e.jsx("button",{className:"btn",onClick:r,children:e.jsx("i",{className:"bx bxs-video"})})]}),e.jsx(fe,{})]})},pe=m.memo(he);var Q={exports:{}};(function(s,n){(function(f,r){s.exports=r(m,ee)})(te,function(c,f){return function(r){var a={};function i(t){if(a[t])return a[t].exports;var o=a[t]={i:t,l:!1,exports:{}};return r[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=r,i.c=a,i.d=function(t,o,j){i.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:j})},i.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,o){if(o&1&&(t=i(t)),o&8||o&4&&typeof t=="object"&&t&&t.__esModule)return t;var j=Object.create(null);if(i.r(j),Object.defineProperty(j,"default",{enumerable:!0,value:t}),o&2&&typeof t!="string")for(var g in t)i.d(j,g,(function(_){return t[_]}).bind(null,g));return j},i.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(o,"a",o),o},i.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},i.p="",i(i.s=4)}([function(r,a,i){r.exports=i(5)()},function(r,a){r.exports=c},function(r,a){r.exports=f},function(r,a){r.exports=function(i,t,o){var j=i.direction,g=i.value;switch(j){case"top":return o.top+g<t.top&&o.bottom>t.bottom&&o.left<t.left&&o.right>t.right;case"left":return o.left+g<t.left&&o.bottom>t.bottom&&o.top<t.top&&o.right>t.right;case"bottom":return o.bottom-g>t.bottom&&o.left<t.left&&o.right>t.right&&o.top<t.top;case"right":return o.right-g>t.right&&o.left<t.left&&o.top<t.top&&o.bottom>t.bottom}}},function(r,a,i){i.r(a),i.d(a,"default",function(){return U});var t=i(1),o=i.n(t),j=i(2),g=i.n(j),_=i(0),l=i.n(_),p=i(3),w=i.n(p);function T(y){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?T=function(C){return typeof C}:T=function(C){return C&&typeof Symbol=="function"&&C.constructor===Symbol&&C!==Symbol.prototype?"symbol":typeof C},T(y)}function v(y,E){if(!(y instanceof E))throw new TypeError("Cannot call a class as a function")}function h(y,E){for(var C=0;C<E.length;C++){var d=E[C];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(y,d.key,d)}}function L(y,E,C){return E&&h(y.prototype,E),C&&h(y,C),y}function u(y,E){return E&&(T(E)==="object"||typeof E=="function")?E:b(y)}function x(y){return x=Object.setPrototypeOf?Object.getPrototypeOf:function(C){return C.__proto__||Object.getPrototypeOf(C)},x(y)}function b(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}function N(y,E){if(typeof E!="function"&&E!==null)throw new TypeError("Super expression must either be null or a function");y.prototype=Object.create(E&&E.prototype,{constructor:{value:y,writable:!0,configurable:!0}}),E&&M(y,E)}function M(y,E){return M=Object.setPrototypeOf||function(d,R){return d.__proto__=R,d},M(y,E)}function S(y,E,C){return E in y?Object.defineProperty(y,E,{value:C,enumerable:!0,configurable:!0,writable:!0}):y[E]=C,y}function V(y){return y.width===void 0&&(y.width=y.right-y.left),y.height===void 0&&(y.height=y.bottom-y.top),y}var U=function(y){N(E,y);function E(C){var d;return v(this,E),d=u(this,x(E).call(this,C)),S(b(d),"getContainer",function(){return d.props.containment||window}),S(b(d),"addEventListener",function(R,k,O,z){d.debounceCheck||(d.debounceCheck={});var P,F,I=function(){P=null,d.check()};z>-1?F=function(){P||(P=setTimeout(I,z||0))}:F=function(){clearTimeout(P),P=setTimeout(I,O||0)};var A={target:R,fn:F,getLastTimeout:function(){return P}};R.addEventListener(k,A.fn),d.debounceCheck[k]=A}),S(b(d),"startWatching",function(){d.debounceCheck||d.interval||(d.props.intervalCheck&&(d.interval=setInterval(d.check,d.props.intervalDelay)),d.props.scrollCheck&&d.addEventListener(d.getContainer(),"scroll",d.props.scrollDelay,d.props.scrollThrottle),d.props.resizeCheck&&d.addEventListener(window,"resize",d.props.resizeDelay,d.props.resizeThrottle),!d.props.delayedCall&&d.check())}),S(b(d),"stopWatching",function(){if(d.debounceCheck){for(var R in d.debounceCheck)if(d.debounceCheck.hasOwnProperty(R)){var k=d.debounceCheck[R];clearTimeout(k.getLastTimeout()),k.target.removeEventListener(R,k.fn),d.debounceCheck[R]=null}}d.debounceCheck=null,d.interval&&(d.interval=clearInterval(d.interval))}),S(b(d),"check",function(){var R=d.node,k,O;if(!R)return d.state;if(k=V(d.roundRectDown(R.getBoundingClientRect())),d.props.containment){var z=d.props.containment.getBoundingClientRect();O={top:z.top,left:z.left,bottom:z.bottom,right:z.right}}else O={top:0,left:0,bottom:window.innerHeight||document.documentElement.clientHeight,right:window.innerWidth||document.documentElement.clientWidth};var P=d.props.offset||{},F=T(P)==="object";F&&(O.top+=P.top||0,O.left+=P.left||0,O.bottom-=P.bottom||0,O.right-=P.right||0);var I={top:k.top>=O.top,left:k.left>=O.left,bottom:k.bottom<=O.bottom,right:k.right<=O.right},A=k.height>0&&k.width>0,$=A&&I.top&&I.left&&I.bottom&&I.right;if(A&&d.props.partialVisibility){var G=k.top<=O.bottom&&k.bottom>=O.top&&k.left<=O.right&&k.right>=O.left;typeof d.props.partialVisibility=="string"&&(G=I[d.props.partialVisibility]),$=d.props.minTopValue?G&&k.top<=O.bottom-d.props.minTopValue:G}typeof P.direction=="string"&&typeof P.value=="number"&&(console.warn("[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }",P.direction,P.value),$=w()(P,k,O));var J=d.state;return d.state.isVisible!==$&&(J={isVisible:$,visibilityRect:I},d.setState(J),d.props.onChange&&d.props.onChange($)),J}),d.state={isVisible:null,visibilityRect:{}},d}return L(E,[{key:"componentDidMount",value:function(){this.node=g.a.findDOMNode(this),this.props.active&&this.startWatching()}},{key:"componentWillUnmount",value:function(){this.stopWatching()}},{key:"componentDidUpdate",value:function(d){this.node=g.a.findDOMNode(this),this.props.active&&!d.active?(this.setState({isVisible:null,visibilityRect:{}}),this.startWatching()):this.props.active||this.stopWatching()}},{key:"roundRectDown",value:function(d){return{top:Math.floor(d.top),left:Math.floor(d.left),bottom:Math.floor(d.bottom),right:Math.floor(d.right)}}},{key:"render",value:function(){return this.props.children instanceof Function?this.props.children({isVisible:this.state.isVisible,visibilityRect:this.state.visibilityRect}):o.a.Children.only(this.props.children)}}]),E}(o.a.Component);S(U,"defaultProps",{active:!0,partialVisibility:!1,minTopValue:0,scrollCheck:!1,scrollDelay:250,scrollThrottle:-1,resizeCheck:!1,resizeDelay:250,resizeThrottle:-1,intervalCheck:!0,intervalDelay:100,delayedCall:!1,offset:{},containment:null,children:o.a.createElement("span",null)}),S(U,"propTypes",{onChange:l.a.func,active:l.a.bool,partialVisibility:l.a.oneOfType([l.a.bool,l.a.oneOf(["top","right","bottom","left"])]),delayedCall:l.a.bool,offset:l.a.oneOfType([l.a.shape({top:l.a.number,left:l.a.number,bottom:l.a.number,right:l.a.number}),l.a.shape({direction:l.a.oneOf(["top","right","bottom","left"]),value:l.a.number})]),scrollCheck:l.a.bool,scrollDelay:l.a.number,scrollThrottle:l.a.number,resizeCheck:l.a.bool,resizeDelay:l.a.number,resizeThrottle:l.a.number,intervalCheck:l.a.bool,intervalDelay:l.a.number,containment:typeof window<"u"?l.a.instanceOf(window.Element):l.a.any,children:l.a.oneOfType([l.a.element,l.a.func]),minTopValue:l.a.number})},function(r,a,i){var t=i(6);function o(){}function j(){}j.resetWarningCache=o,r.exports=function(){function g(p,w,T,v,h,L){if(L!==t){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}g.isRequired=g;function _(){return g}var l={array:g,bool:g,func:g,number:g,object:g,string:g,symbol:g,any:g,arrayOf:_,element:g,elementType:g,instanceOf:_,node:g,objectOf:_,oneOf:_,oneOfType:_,shape:_,exact:_,checkPropTypes:j,resetWarningCache:o};return l.PropTypes=l,l}},function(r,a,i){var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";r.exports=t}])})})(Q);var me=Q.exports;const ge=ne(me);const xe=({src:s,alt:n})=>{const[c,f]=m.useState(!1);return m.useEffect(()=>{const r=new IntersectionObserver(i=>{i.forEach(t=>{t.isIntersecting&&(f(!0),r.unobserve(t.target))})}),a=document.getElementById(`lazyload-element-${s}`);return a&&r.observe(a),()=>{a&&r.unobserve(a)}},[s]),e.jsx("video",{id:`lazyload-element-${s}`,controls:!0,autoPlay:!1,playsInline:!0,src:c?s:"",children:n})},be=({src:s,alt:n})=>{const[c,f]=m.useState(!1);return m.useEffect(()=>{const r=new IntersectionObserver(i=>{i.forEach(t=>{t.isIntersecting&&(f(!0),r.unobserve(t.target))})}),a=document.getElementById(`lazyload-element-${s}`);return a&&r.observe(a),()=>{a&&r.unobserve(a)}},[s]),e.jsx("img",{id:`lazyload-element-${s}`,src:c?s:"",loading:"lazy",alt:n})},Z=({url:s,token:n})=>{var t;const[c,f]=m.useState(!1),[r,a]=m.useState(!1),i=((t=s.split("/").pop())==null?void 0:t.substring(23))||"File";return m.useEffect(()=>{var j;const o=(j=s.split(".").pop())==null?void 0:j.toLowerCase();f(["jpg","jpeg","png","gif","bmp","svg"].includes(o||"")),a(["mp4","webm","ogg"].includes(o||""))},[s]),c?e.jsx(be,{src:s+"?token="+n,alt:i}):r?e.jsx(xe,{src:s+"?token="+n,alt:i}):e.jsx("a",{href:s+"?token="+n,target:"_blank",rel:"noopener noreferrer",children:i})},ve=({token:s,content:n,timestamp:c,urls:f,seenList:r})=>e.jsxs("div",{className:"message out",children:[e.jsx("div",{className:"message_wrapper",children:e.jsx("p",{children:n})}),e.jsx("p",{className:"message_timestamp",children:c}),f&&f.length>0&&f.map((a,i)=>e.jsx(Z,{token:s,url:a},c+i)),r&&r.length>0&&e.jsxs("p",{children:["Seen by:",r.map(a=>e.jsx("span",{children:a}))]})]}),ye=({token:s,avatarSRC:n,content:c,timestamp:f,urls:r,seenList:a})=>e.jsxs("div",{className:"message in",children:[e.jsxs("div",{className:"message_wrapper",children:[e.jsx("img",{className:"inchat-avatar",src:n,alt:"Sender Avatar"}),e.jsx("p",{children:c}),r&&r.length>0&&r.map((i,t)=>e.jsx(Z,{token:s,url:i},f+t))]}),e.jsx("p",{className:"message_timestamp",children:f}),a&&a.length>0&&e.jsxs("p",{children:["Seen by:",a.map(i=>e.jsx("span",{children:i}))]})]}),je=({readCursors:s,token:n,messages:c,roomId:f,userId:r,participants:a})=>{const[i,t]=m.useState({}),o={},j=m.useRef(c.length),g=B();a.forEach(p=>{o[p._id]=p});const _=p=>{const w=o[p];return w?w.avatar:""},l=p=>{p[0]===f&&t(w=>({...w,[p[1]]:j.current-1}))};return m.useEffect(()=>{j.current=c.length},[c]),m.useEffect(()=>{if(g)return g.on("seen",l),()=>{g.off("seen",l)}},[g,f]),m.useEffect(()=>{const p={};s.filter(w=>w._id!==r).forEach(w=>{const T=new Date(w.lastReadTimeStamp).getTime();for(let v=c.length-1;v>=0;v--)if(new Date(c[v].timestamp).getTime()<=T){p[w._id]=v;break}}),t(p)},[s]),e.jsx(e.Fragment,{children:Array.isArray(c)&&c.map((p,w)=>{let T=[];return a.forEach(v=>{i[v._id]==w&&T.push(v.fullname)}),p.sender&&p.sender===r?e.jsx(ve,{token:n,content:p.content,timestamp:p.timestamp,urls:p.urls,seenList:T},w):e.jsx(ye,{token:n,avatarSRC:_(p.sender),content:p.content,timestamp:p.timestamp,urls:p.urls,seenList:T},w)})})},_e=m.memo(je);const H=(s,n,c,f)=>fetch(`/api/v1/rooms/${s}?limit=${c}&skip=${f}`,{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+n}}).then(r=>{if(r.status===304)throw new Error("Already got this");if(r.ok)return r.json();throw r.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch messages")}),Y=30,we=({token:s,room:n,userId:c,justSent:f})=>{const[r,a]=m.useState([]),[i,t]=m.useState(0),[o,j]=m.useState([]),g=m.useRef(null),_=m.useRef(null),l=m.useRef(null),p=m.useRef(null),w=B(),T=W();console.log("Render container");const v=u=>{if(u[1]===n._id){const x=u[0];if(x!==c&&!n.participants.some(S=>S._id===x))return;l.current&&(l.current.style.display="block");const b=u[2],N=u[3],M=u[4];w.emit("seen",[n._id,new Date]),t(S=>S++),a(S=>S!==null?[...S,{sender:x,content:b,timestamp:N,urls:M}]:[{sender:x,content:b,timestamp:N,urls:M}])}},h=()=>{_.current&&(_.current.scrollIntoView({behavior:"smooth"}),l.current&&(l.current.style.display="none"))},L=u=>{if(!u||!r||r.length==0)return;if(r.length>=i){g.current&&(g.current.style.display="none");return}let x,b=Y;x=i-r.length-b,x<0&&(b+=x,x=0),H(n._id,s,`${b}`,`${x}`).then(N=>{p.current&&(p.current.scrollTop=300),a(M=>M?N.messages.concat(M):N.messages),N.conversationLength&&t(N.conversationLength),N.readCursors&&j(N.readCursors)}).catch(()=>{T("/auth")})};return m.useEffect(()=>{try{if(!s||!n)return;H(n._id,s).then(u=>{u.messages&&a(u.messages),u.conversationLength&&t(u.conversationLength),u.readCursors&&j(u.readCursors)}).catch(()=>{T("/auth")})}catch(u){console.error(u)}},[s,n._id]),m.useEffect(()=>{if(w)return w.on("msg",v),()=>{w.off("msg",v)}},[w,n._id]),m.useEffect(()=>{g.current&&(g.current.style.display="none");const u=setTimeout(()=>{g.current&&p.current&&p.current.scrollHeight>p.current.clientHeight&&(g.current.style.display="flex")},1e3);return()=>{clearTimeout(u)}},[n._id]),m.useEffect(()=>{if(!(!p.current||!r)){if(r.length<=Y)return h();if(Math.abs(p.current.scrollHeight-p.current.scrollTop-p.current.clientHeight)<300)return console.log("bottom"),h();if(r[r.length-1].sender==c&&f)return f=!1,h()}},[r]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:p,id:"messages-container",children:[e.jsx(ge,{onChange:L,children:e.jsx("div",{ref:g,id:"topRef",children:e.jsx(se,{size:50})})}),r&&e.jsx(_e,{readCursors:o,token:s,messages:r,roomId:n._id,userId:c,participants:n.participants}),e.jsx("div",{ref:_})]}),e.jsxs("button",{id:"btn_scroll",ref:l,onClick:()=>{h()},children:[Array.isArray(r)&&r.length>1&&r[r.length-1].content,e.jsx("i",{className:"bx bx-down-arrow-alt"})]})]})};const Ee=({room:s,token:n,profile:c})=>{const[f,r]=m.useState(!1),a=m.useCallback(()=>{r(!0)},[]);return e.jsxs("div",{id:"chat-box",children:[e.jsx(pe,{token:n,userId:c._id,room:s}),s&&e.jsx(we,{justSent:f,room:s,token:n,userId:c._id}),s&&e.jsx(ce,{token:n,userId:c._id,roomId:s._id,onJustSent:a})]})},Se=s=>new Promise(async(n,c)=>{if(!window.confirm("Are you sure you want to delete your account?"))return c("Account deletion canceled");const r=window.prompt("Enter your password:");if(!r)return c("Password input canceled");try{const a={password:r},i=await fetch("/api/v1/users/",{method:"DELETE",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify(a)});if(i.ok)return sessionStorage.removeItem("token"),n("Account deletion successful");const t=await i.json();if(t.message)return c(t.message);c("Wrong password")}catch(a){c(a)}});const Ce=({token:s,profileData:n,onRefresh:c})=>{const[f,r]=m.useState(!1),[a,i]=m.useState(!1),t=m.useRef(null),o=m.useRef(null),j=W(),g=B();m.useEffect(()=>{if(g)return g.on("inv",c),()=>{g.off("inv",c)}},[g]);const _=()=>{sessionStorage.removeItem("token"),j("/auth")},l=h=>{fetch(`/api/v1/rooms/${h}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify({action:"join"})})},p=h=>{fetch(`/api/v1/rooms/${h}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify({action:"refuse"})})},w=async()=>{if(!o.current)return;let h={};if(o.current.bio.value&&(h.bio=o.current.bio.value),o.current.fullname.value&&(h.fullname=o.current.fullname.value),o.current.password.value)if(h.password=o.current.password.value,o.current.current_password.value)h.current_password=o.current.current_password.value;else return alert("Please enter current password");if(t.current&&(h.avatar=t.current),!h.bio&&!h.fullname&&!h.password&&!h.avatar)return alert("Empty form");const L=await fetch("/api/v1/users/",{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify(h)});if(i(!1),L.ok)return alert("Updated successfully!"),c();const u=await L.json();if(u.message)return alert(u.message);alert("Error updating profile")},T=async h=>{const L=new FormData;L.append("file",h);const u=await fetch(`/media/${n==null?void 0:n._id}/public?token=${s}&count=1`,{method:"POST",body:L}),x=await u.json();!u.ok&&x.message&&alert(x.message),x.urls&&(t.current=x.urls[0],w())},v=async()=>{try{const h=await Se(s);alert(h),j("/auth")}catch(h){alert(h)}};return e.jsxs("div",{id:"profile",children:[e.jsxs("div",{id:"profile_topbar",children:[e.jsx("img",{src:n==null?void 0:n.avatar,alt:"Profile",id:"profile_img",className:"cover"}),a?e.jsx(K,{accept:"image/*",onChange:T,id:"upload-img",icon:e.jsx("i",{className:"bx bxs-camera"})}):e.jsxs("div",{children:[e.jsx("h3",{children:n==null?void 0:n.fullname}),(n==null?void 0:n.bio)&&e.jsx("p",{children:n==null?void 0:n.bio})]}),e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"btn",onClick:()=>{r(!1),i(h=>!h)},children:a?e.jsx("i",{className:"bx bxs-message-square-x"}):e.jsx("i",{className:"bx bxs-pencil"})}),e.jsx("button",{className:"btn",onClick:()=>{i(!1),r(h=>!h)},children:f?e.jsx("i",{className:"bx bxs-message-square-x"}):e.jsxs("div",{id:"bell",children:[e.jsx("i",{className:"bx bxs-bell"}),n!=null&&n.invitations.length&&(n==null?void 0:n.invitations.length)>0?e.jsx("span",{id:"nofcount",children:n==null?void 0:n.invitations.length}):null]})}),e.jsx("button",{id:"logout-btn",className:"btn",onClick:_,children:e.jsx("i",{className:"bx bx-log-in"})})]})]}),e.jsx("div",{id:"notify-container",className:`profile_dropdown ${f?"active":""}`,children:n&&n.invitations.length>0?n.invitations.map(h=>e.jsxs("div",{children:[e.jsx("p",{children:h}),e.jsx("button",{onClick:()=>l(h),children:"Accept"}),e.jsx("button",{onClick:()=>p(h),children:"Refuse"})]},h)):e.jsx("p",{children:"No invitations"})}),e.jsxs("div",{className:`profile_dropdown ${a?"active":""}`,id:"profile_editor",children:[e.jsxs("form",{id:"profile_form",ref:o,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"fullname",children:"Your name:"}),e.jsx("input",{type:"text",id:"fullname",name:"fullname",placeholder:n==null?void 0:n.fullname})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bio",children:"Bio:"}),e.jsx("input",{type:"text",id:"bio",name:"bio",placeholder:n==null?void 0:n.bio})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"current_password",children:"Current password:"}),e.jsx("input",{type:"password",id:"current_password",name:"current_password"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",children:"New password:"}),e.jsx("input",{type:"password",id:"password",name:"password"})]})]}),e.jsxs("div",{className:"flex",children:[e.jsx("button",{id:"btn_delete-account",onClick:v,children:"Delete account"}),e.jsx("button",{id:"btn_submit-edit",onClick:w,children:"Save"})]})]})]})},Te=m.memo(Ce);const Ne=({token:s})=>{const[n,c]=m.useState([]),[f,r]=m.useState([]),a=m.useRef(null),i=l=>{if(n.some(p=>p._id==l._id))return alert("already selected this user");c(p=>[...p,l])},t=l=>{console.log("remove user from users list"),l>=0&&l<n.length&&c(p=>p.filter((T,v)=>v!==l))},o=async()=>{if(n.length==0)return alert("Please select a user");const l=n.map(p=>p._id);try{(await fetch("/api/v1/rooms",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+s},body:JSON.stringify({invited:l})})).ok?c([]):alert("deo biet sao bug luon")}catch(p){console.error(p)}},j=()=>{var p;const l=(p=a.current)==null?void 0:p.value;l&&fetch(`/api/v1/search/${l}`,{headers:{"content-type":"application/json",authorization:"Bearer "+s}}).then(w=>{if(w.ok)return w.json().then(T=>{r(T)});console.log(w.status)})},g=l=>{l.key==="Enter"&&j()},_=l=>{a.current&&!a.current.contains(l.target)&&(r([]),a.current.value="")};return m.useEffect(()=>(document.addEventListener("click",_),()=>{document.removeEventListener("click",_)}),[]),e.jsxs("div",{id:"room-maker",children:[e.jsxs("div",{className:"flex",children:[e.jsxs("div",{id:"search-bar",children:[e.jsx("button",{className:"btn",onClick:j,children:e.jsx("i",{className:"bx bx-search"})}),e.jsx("div",{id:"chosenList",className:"flex",children:n.map((l,p)=>e.jsxs("div",{className:"chosenUser flex",children:[e.jsxs("p",{children:[" ",l.fullname]}),e.jsx("span",{onClick:()=>t(p),children:"X"})]},l.fullname))}),e.jsx("input",{type:"text",placeholder:"Search for users...",ref:a,onKeyPress:g})]}),n.length>0&&e.jsx("div",{className:"flex",children:e.jsx("button",{className:"btn",onClick:o,children:e.jsx("i",{className:"bx bxs-message-square-add"})})})]}),f.length>0&&e.jsx("div",{id:"search_dropdown",children:f.map(l=>e.jsxs("div",{onClick:()=>{i({_id:l._id,fullname:l.fullname})},children:[e.jsx("img",{className:"profile-picture",src:l.avatar,alt:"Avatar"}),l.fullname]},l._id))})]})};function ke(){return e.jsxs("svg",{id:"bgrn-svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 700 700",preserveAspectRatio:"none",children:[e.jsxs("g",{mask:'url("#SvgjsMask1020")',fill:"none",children:[e.jsx("rect",{width:"700",height:"700",x:"0",y:"0",fill:'url("#SvgjsLinearGradient1021")'}),e.jsx("path",{d:"M700 0L426.65 0L700 81.54z",fill:"rgba(255, 255, 255, 0.2)"}),e.jsx("path",{d:"M426.65 0L700 81.54L700 267.52L414.62 0z",fill:"rgba(255, 255, 255, .13)"}),e.jsx("path",{d:"M414.62 0L700 267.52L700 452.46L156.39 0z",fill:"rgba(255, 255, 255, .1)"}),e.jsx("path",{d:"M156.39 0L700 452.46L700 490.96L83.34999999999998 0z",fill:"rgba(255, 255, 255, .1)"}),e.jsx("path",{d:"M0 700L154.99 700L0 376.93z",fill:"rgba(0, 0, 0, .1)"}),e.jsx("path",{d:"M0 376.93L154.99 700L303.17 700L0 371.8z",fill:"rgba(0, 0, 0, .175)"}),e.jsx("path",{d:"M0 371.8L303.17 700L525.89 700L0 229.98000000000002z",fill:"rgba(0, 0, 0, .25)"}),e.jsx("path",{d:"M0 229.98000000000002L525.89 700L592.96 700L0 184.46z",fill:"rgba(0, 0, 0, .325)"})]}),e.jsxs("defs",{children:[e.jsx("mask",{id:"SvgjsMask1020",children:e.jsx("rect",{width:"700",height:"700",fill:"#ffffff"})}),e.jsxs("linearGradient",{x1:"0%",y1:"0%",x2:"100%",y2:"100%",gradientUnits:"userSpaceOnUse",id:"SvgjsLinearGradient1021",children:[e.jsx("stop",{id:"stop_1",offset:"0"}),e.jsx("stop",{id:"stop_2",offset:"1"})]})]})]})}const X=s=>fetch("/api/v1/users/",{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+s}}).then(n=>{if(n.ok)return n.json();throw n.status==401&&(alert("Token expired"),sessionStorage.removeItem("token"),window.location.reload()),new Error("Failed to fetch user profile")}),Le=({token:s})=>{const[n,c]=m.useState(null),[f,r]=m.useState([]),[a,i]=m.useState(0),t=W(),o=async()=>{try{console.log("Loading profile again...");const _=await X(s);c(_)}catch{t("/auth")}},j=_=>{i(_)},g=_=>{r(_)};return m.useEffect(()=>{s&&X(s).then(_=>{c(_)}).catch(_=>{console.error(_),t("/auth")})},[s]),e.jsx("div",{id:"main-page",className:"flex",children:n?e.jsxs(re,{token:s,children:[e.jsxs("div",{id:"main-page_container",children:[e.jsxs("section",{id:"section-left",children:[e.jsx(Te,{token:s,profileData:n,onRefresh:o}),e.jsx(Ne,{token:s}),e.jsx(ae,{userId:n._id,currentRoomIndex:a,token:s,onRoomChange:j,onUpdateStatus:g})]}),e.jsx("section",{id:"section-right",children:e.jsx(Ee,{profile:n,token:s,room:f[a]})})]}),e.jsx(ke,{})]}):e.jsx("div",{children:"Loading skeleton ..."})})},Pe=m.memo(Le);export{Pe as default,X as getProfile};
