import{j as e,P as S,r as l,u as _}from"./index-2bfd7438.js";import{g as L}from"./getSocket-8aa47fbe.js";const $=({roomData:t,userId:r})=>{t=t.filter(d=>d._id!==r);const n=t.length>1,o=t.slice(0,4);return e.jsx("div",{className:"user-card",children:n?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"group-pictures-container",children:o.map((d,h)=>e.jsx("div",{className:"profile",children:d.avatar?e.jsx("img",{src:d.avatar,alt:"Profile",className:"group-profile-picture"}):e.jsx(S,{size:5})},h))}),e.jsxs("div",{className:"profile-names",children:[o.length>0&&e.jsx("h3",{children:o.map(d=>d.fullname).join(", ")}),t.length>4&&e.jsxs("p",{className:"group-members-count",children:["+",t.length-4," more"]})]})]}):e.jsxs(e.Fragment,{children:[t[0]&&t[0].avatar?e.jsx("img",{src:t[0].avatar,alt:"Profile",className:"profile-picture"}):e.jsx(S,{size:30}),e.jsxs("div",{className:"user-info",children:[t[0]&&t[0].fullname?e.jsx("h3",{children:t[0].fullname}):e.jsx(S,{size:30}),t[0]&&t[0].isOnline!==void 0?e.jsx("p",{className:t[0].isOnline?"online":"offline",children:t[0].isOnline?"Online":"Offline"}):e.jsx(S,{size:15})]})]})})};const O=({token:t,onChoose:r})=>{const n=l.useRef(null),[o,d]=l.useState([]),h=()=>{var u;const i=(u=n.current)==null?void 0:u.value;i&&fetch(`/api/v1/search/${i}`,{headers:{"content-type":"application/json",authorization:"Bearer "+t}}).then(y=>{if(y.ok)return y.json().then(f=>{d(f)});console.log(y.status)})},x=i=>{i.key==="Enter"&&h()},p=i=>{n.current&&!n.current.contains(i.target)&&(d([]),n.current.value="")};return l.useEffect(()=>(document.addEventListener("click",p),()=>{document.removeEventListener("click",p)}),[]),e.jsxs("div",{id:"search",children:[e.jsx("input",{type:"text",placeholder:"Search for users...",ref:n,onKeyPress:x}),e.jsx("button",{onClick:h,children:"Search"}),o.length>0&&e.jsx("div",{className:"search_dropdown",children:o.map(i=>e.jsxs("div",{onClick:()=>{r({_id:i._id,fullname:i.fullname})},children:[e.jsx("img",{src:i.avatar,alt:"Avatar"}),i.fullname]},i._id))})]})};const A=({token:t})=>{const[r,n]=l.useState(!0),[o,d]=l.useState([]),h=i=>{if(o.some(u=>u._id==i._id))return alert("already selected this user");d(u=>[...u,i])},x=i=>{console.log("remove user from users list"),i>=0&&i<o.length&&d(u=>u.filter((f,N)=>N!==i))},p=async()=>{if(o.length==0)return alert("Please select a user");const i=o.map(u=>u._id);try{(await fetch("/api/v1/rooms",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+t},body:JSON.stringify({invited:i})})).ok?(d([]),n(!1)):alert("deo biet sao bug luon")}catch(u){console.error(u)}};return e.jsxs("div",{id:"featuresBox",children:[r&&e.jsxs(e.Fragment,{children:[e.jsx(O,{token:t,onChoose:h}),o.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"chosenList",className:"flex",children:o.map((i,u)=>e.jsxs("div",{className:"chosenUser flex",children:[e.jsxs("p",{children:[" ",i.fullname]}),e.jsx("span",{onClick:()=>x(u),children:"X"})]},i.fullname))}),e.jsx("button",{onClick:p,children:"Create"})]})]}),e.jsx("button",{onClick:()=>n(i=>!i),children:r?"X":"Create new room"})]})},B=t=>new Promise((r,n)=>{fetch("/api/v1/rooms",{method:"GET",headers:{"content-type":"application/json",authorization:"Bearer "+t}}).then(o=>{if(o.ok)return o.json().then(d=>{r(d)});throw o.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch rooms information")}).catch(o=>{n(o)})}),M=({userId:t,currentRoomIndex:r,token:n,onRoomChange:o,onUpdateStatus:d})=>{const[h,x]=l.useState([]),p=l.useRef(""),i=l.useRef(null),u=_(),y=a=>{const c=a;"onl"+c!=p.current&&(p.current="onl"+c,x(m=>m&&m.map(g=>{const w=g.participants.map(j=>j._id===c?{...j,isOnline:!0}:j);return{...g,participants:w}})))},f=a=>{const c=a;"off"+c!=p.current&&(p.current="off"+c,x(m=>m&&m.map(g=>{const w=g.participants.map(j=>j._id===c?{...j,isOnline:!1}:j);return{...g,participants:w}})))},N=()=>{B(n).then(a=>{console.log(a),x(a)}).catch(()=>{u("/auth")})},R=a=>{var m,g;const c=document.querySelectorAll(".chat-room");c==null||c.forEach(w=>{var j;(j=w.classList)==null||j.remove("active")}),(g=(m=c[a])==null?void 0:m.classList)==null||g.add("active"),o(a)};l.useEffect(()=>{h.length>0&&d(h)},[h]),l.useEffect(()=>(n&&B(n).then(a=>{x(a);const c=L(n);c.on("onl",y),c.on("off",f),c.on("room",N),i.current=c}).catch(()=>{u("/auth")}),()=>{var a;(a=i.current)==null||a.disconnect()}),[n]);const s=l.useMemo(()=>h.map((a,c)=>e.jsx("div",{className:`chat-room ${c==r?"active":""}`,onClick:()=>R(c),children:e.jsx($,{userId:t,roomData:a.participants})},a._id)),[h]);return e.jsxs("div",{id:"SideBar",children:[e.jsx(A,{token:n}),h&&h.length>0?e.jsx("div",{children:s}):e.jsx("p",{children:"No rooms to display"})]})};const q=(t,r)=>fetch(`/api/v1/rooms/${t}`,{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+r}}).then(n=>{if(n.ok)return n.json();throw n.status==401&&(alert("Token expired"),sessionStorage.removeItem("token")),new Error("Failed to fetch messages")});let v;const J=({room:t,token:r,profile:n})=>{const[o,d]=l.useState(""),[h,x]=l.useState(null),p=l.useRef(t._id),i=_(),u=s=>{d(s.target.value),console.log("typing ...")},y=()=>{o.trim()!==""&&(v==null||v.emit("msg",[t._id,o,new Date]),d(""))},f=s=>{if(s[1]===p.current){const a=s[0];if(a!==(n==null?void 0:n._id)&&!t.participants.some(g=>g._id===a))return;const c=s[2],m=s[3];x(g=>g!==null?[...g,{sender:a,content:c,timestamp:m}]:[{sender:a,content:c,timestamp:m}])}else console.log("New message, room: "+s[1])},N=()=>{v==null||v.emit("call",[t._id,new Date])},R=s=>{console.log("Receive call"),console.log(s);const a=`/call/${s[1]}?token=${r}`;if(s[0]==(n==null?void 0:n._id))return window.open(a);Notification.permission==="granted"?new Notification("Incoming Call",{body:"You have an incoming call. Do you want to join?",icon:"path/to/notification-icon.png",requireInteraction:!0}).addEventListener("click",()=>{window.open(a)}):Notification.permission!=="denied"&&Notification.requestPermission().then(c=>{c==="granted"&&R(s)})};return l.useEffect(()=>{try{if(!r||!t)return;q(t._id,r).then(s=>{x(s.messages)}).catch(()=>{i("/auth")})}catch(s){console.error(s)}},[r,t._id]),l.useEffect(()=>{r&&(v=L(r),v==null||v.on("msg",f),v==null||v.on("call",R))},[r]),l.useEffect(()=>{p.current=t._id},[t._id]),e.jsxs("div",{className:"chat-box",children:[e.jsx("button",{onClick:N,children:"Make call"}),e.jsx("div",{className:"message-container",children:Array.isArray(h)&&h.map((s,a)=>{let c;if(s.sender&&s.sender==(n==null?void 0:n._id))c=n.avatar;else{const m=t.participants.find(g=>g._id===s.sender);c=m?m.avatar:""}return e.jsxs("div",{className:`message ${s.sender==(n==null?void 0:n._id)?"own":""}`,children:[c&&e.jsx("img",{className:"inchat-avatar",src:c,alt:"Sender Avatar"}),e.jsx("span",{children:s.content}),e.jsx("span",{children:s.timestamp})]},a)})}),e.jsxs("div",{className:"input-container flex",children:[e.jsx("input",{type:"text",value:o,onChange:u,className:"input-field"}),e.jsx("button",{onClick:y,className:"send-button",children:"Send"})]})]})};const F={text:"#000",bg:"#ffffff"},z={text:"#ffffff",bg:"#000"},G=()=>{const[t,r]=l.useState(sessionStorage.getItem("theme")==="light"),n=()=>{r(!t)};return l.useEffect(()=>{var o,d;t?(sessionStorage.setItem("theme","light"),(o=document.querySelector(".switcher-label"))==null||o.classList.remove("active"),document.documentElement.style.setProperty("--text-color",z.text),document.documentElement.style.setProperty("--background-color",z.bg)):(sessionStorage.setItem("theme","dark"),(d=document.querySelector(".switcher-label"))==null||d.classList.add("active"),document.documentElement.style.setProperty("--text-color",F.text),document.documentElement.style.setProperty("--background-color",F.bg))},[t]),e.jsxs("div",{className:"theme-switch-container",children:[e.jsx("input",{type:"checkbox",id:"switcher-input",checked:t,onChange:n}),e.jsxs("label",{className:"switcher-label",htmlFor:"switcher-input",children:[e.jsx("i",{className:"fas fa-solid fa-sun"}),e.jsx("span",{className:"switcher-toggler"}),e.jsx("i",{className:"fas fa-solid fa-moon"})]})]})};const X=({token:t,profileData:r,onRefresh:n})=>{const[o,d]=l.useState(!1),h=l.useRef(null),x=l.useRef(null),p=l.useRef(null),i=_();l.useEffect(()=>{if(t){const s=L(t);s.on("inv",n),p.current=s}return()=>{var s;(s=p.current)==null||s.disconnect()}},[t]);const u=()=>{sessionStorage.removeItem("token"),i("/auth")},y=async s=>{try{console.log("Accepted invitation:",s),(await fetch(`/api/v1/rooms/${s}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+t},body:JSON.stringify({accept:!0})})).ok&&alert("ok")}catch(a){console.error(a)}},f=async s=>{try{console.log("Refused invitation:",s),(await fetch(`/api/v1/rooms/${s}`,{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+t},body:JSON.stringify({accept:!1})})).ok&&alert("ok")}catch(a){console.error(a)}},N=async()=>{var s;try{const a=(s=x.current)==null?void 0:s.value;(await fetch("/api/v1/users/",{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+t},body:JSON.stringify({fullname:a})})).ok&&n()}catch(a){console.error(a)}},R=()=>{var s;if((s=h.current)!=null&&s.files&&h.current.files.length>0){const a=h.current.files[0],c=new FileReader;c.onload=async m=>{var g;if((g=m.target)!=null&&g.result){const w=new Image;w.onload=async()=>{const j=document.createElement("canvas"),E=200,I=200;let b=w.width,C=w.height;b>E&&(C*=E/b,b=E),C>I&&(b*=I/C,C=I),j.width=b,j.height=C;const P=j.getContext("2d");P==null||P.drawImage(w,0,0,b,C);const U=j.toDataURL("image/jpeg");try{(await fetch("/api/v1/users/",{method:"PUT",headers:{"content-type":"application/json",authorization:"Bearer "+t},body:JSON.stringify({avatar:U})})).ok&&n()}catch(k){console.error(k)}},w.src=m.target.result}},c.readAsDataURL(a)}};return e.jsx(e.Fragment,{children:e.jsxs("header",{children:[e.jsxs("div",{id:"profile",children:[r&&r.avatar?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:r.avatar,alt:"Profile",id:"profile_img"}),e.jsx("input",{type:"file",accept:"image/*",ref:h,onChange:R})]}):e.jsx(S,{size:30}),e.jsx("div",{id:"profile_info",children:r&&r.fullname?e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:r.fullname}),e.jsx("input",{type:"text",ref:x}),e.jsx("button",{onClick:N,children:"Change Fullname"})]}):e.jsx(S,{size:30})})]}),e.jsx("button",{onClick:()=>d(s=>!s),children:o?"X":`Show invitations (${r==null?void 0:r.invitations.length})`}),o&&e.jsx("div",{children:r&&r.invitations.length>0?r.invitations.map(s=>e.jsxs("div",{children:[e.jsx("p",{children:s}),e.jsx("button",{onClick:()=>y(s),children:"Accept"}),e.jsx("button",{onClick:()=>f(s),children:"Refuse"})]},s)):e.jsx("p",{children:"No invitations"})}),e.jsxs("div",{className:"flex",children:[e.jsx(G,{}),e.jsx("button",{id:"logout-btn",onClick:u,children:"Logout"})]})]})})},K=l.memo(X),T=t=>fetch("/api/v1/users/",{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer "+t}}).then(r=>{if(r.ok)return r.json();throw r.status==401&&(alert("Token expired"),sessionStorage.removeItem("token"),window.location.reload()),new Error("Failed to fetch user profile")}),W=({token:t})=>{const[r,n]=l.useState(null),[o,d]=l.useState([]),[h,x]=l.useState(0),p=_(),i=async()=>{try{const f=await T(t);n(f)}catch{p("/auth")}},u=f=>{x(f)},y=f=>{d(f)};return l.useEffect(()=>{t&&T(t).then(f=>{n(f)}).catch(f=>{console.error(f),p("/auth")})},[t]),e.jsxs(e.Fragment,{children:[r?e.jsx(K,{token:t,profileData:r,onRefresh:i}):e.jsx(S,{size:100}),r?e.jsxs("main",{className:"flex",children:[e.jsx(M,{userId:r._id,currentRoomIndex:h,token:t,onRoomChange:u,onUpdateStatus:y}),o.length>0&&e.jsx(J,{profile:r,token:t,room:o[h]})]}):e.jsx(S,{size:500}),e.jsx("footer",{style:{display:"none"},children:e.jsx("p",{children:"© 2023 Messaging App. All rights reserved."})})]})};export{W as default,T as getProfile};
