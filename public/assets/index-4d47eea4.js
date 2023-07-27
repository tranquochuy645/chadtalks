import{j as t,r as a,b as T,u as b}from"./index-bd247350.js";import{u as v,S as _}from"./index-abf9f9a9.js";const E=({onReady:s})=>{const g=async()=>{const l=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});if(l)s(l);else throw new Error("Can not get user media")};return t.jsxs(t.Fragment,{children:[t.jsx("p",{children:" You need to allow access to camera and mic"}),t.jsx("button",{onClick:()=>g(),children:"Allow"})]})};const S={iceServers:[{urls:"stun:stun.relay.metered.ca:80"}],iceCandidatePoolSize:10},I=({peerId:s,offer:g,answer:l,ice:u,localStream:n})=>{console.log("render remote video screen");const r=a.useRef(null),f=a.useRef(null),i=a.useRef(null),m=a.useRef(null),k=v(),[j,p]=a.useState(!1),e=async h=>{if(r.current=new RTCPeerConnection(S),r.current.onconnectionstatechange=()=>{var o;switch((o=r.current)==null?void 0:o.connectionState){case"connected":console.log("connected");break;case"disconnected":console.log("disconnected");break;case"failed":console.log("failed");break;case"closed":console.log("closed");break;default:console.log("connecting")}},f.current=new MediaStream,i.current)i.current.srcObject=f.current;else throw new Error("41");n==null||n.getTracks().forEach(o=>{var w;(w=r.current)==null||w.addTrack(o,n)}),r.current.ontrack=o=>{o.streams[0].getTracks().forEach(w=>{var x;(x=f.current)==null||x.addTrack(w)})},r.current.onicecandidate=async o=>{o.candidate&&k.emit("ice_candidate",[h,o.candidate])}},c=async h=>{var o,w;await e(h),m.current=await((o=r.current)==null?void 0:o.createOffer()),await((w=r.current)==null?void 0:w.setLocalDescription(m.current)),k.emit("offer",[h,m.current])},d=async(h,o)=>{var w,x,R;await e(h),await((w=r.current)==null?void 0:w.setRemoteDescription(o)),m.current=await((x=r.current)==null?void 0:x.createAnswer()),await((R=r.current)==null?void 0:R.setLocalDescription(m.current)),k.emit("answer",[h,m.current])},y=async h=>{var o;await((o=r.current)==null?void 0:o.setRemoteDescription(h))},P=async h=>{var o;(o=r.current)==null||o.addIceCandidate(h)};a.useEffect(()=>{g?d(s,g):c(s)},[]),a.useEffect(()=>{l&&y(l)},[l]),a.useEffect(()=>{u&&(console.log(u),P(u))},[u]);const C=()=>{i.current&&(i.current.muted=!i.current.muted,p(i.current.muted))};return t.jsxs(t.Fragment,{children:[t.jsxs("p",{children:["Peer ID: ",s]}),t.jsx("div",{className:"flex meeting-page_ctrl",children:t.jsx("button",{onClick:C,children:j?"Unmute":"Mute"})}),t.jsx("video",{className:"remote-video",ref:i,autoPlay:!0,playsInline:!0})]})},L=a.memo(I);const M=({localStream:s})=>{const g=a.useRef(null),[l,u]=a.useState([]),n=v();a.useEffect(()=>{g.current&&(g.current.srcObject=s)},[s]),a.useEffect(()=>{if(n)return n.on("new_peer",m),n.on("off_peer",i),n.on("offer",k),n.on("answer",j),n.on("ice_candidate",p),()=>{n.off("new_peer",m),n.off("off_peer",i),n.off("offer",k),n.off("answer",j),n.off("ice_candidate",p)}},[n]);const r=()=>{s&&s.getVideoTracks().forEach(c=>{c.enabled=!c.enabled})},f=()=>{s&&s.getAudioTracks().forEach(c=>{c.enabled=!c.enabled})},i=e=>{u(c=>c.filter(y=>y.id!==e))},m=e=>{u(c=>{const d={id:e};return[...c,d]})},k=async e=>{u(c=>{const d={id:e[0],offer:e[1]};return[...c,d]})},j=async e=>{u(c=>c.map(d=>d.id===e[0]?{...d,answer:e[1]}:d))},p=async e=>{u(c=>c.map(d=>d.id===e[0]?{...d,ice:e[1]}:d))};return t.jsxs(t.Fragment,{children:[t.jsxs("section",{id:"meeting-page_section_local",className:`${l.length>0?" aside":""}`,children:[t.jsxs("div",{className:"flex meeting-page_ctrl",children:[t.jsx("button",{onClick:r,children:"Toggle camera"}),t.jsx("button",{onClick:f,children:"Toggle sound"})]}),t.jsx("video",{id:"local-video",ref:g,autoPlay:!0,playsInline:!0,muted:!0})]}),l.length>0&&t.jsx("section",{id:"meeting-page_section_remote",className:`${l.length>1?"stacked":""}`,children:l.map(e=>t.jsx("div",{className:`remote-peer-container ${e.id}`,children:t.jsx(L,{peerId:e.id,localStream:s,offer:e.offer,answer:e.answer,ice:e.ice},e.id)}))})]})};const N=()=>{const{meetId:s}=T(),[g,l]=a.useState(null),u=b();let n=sessionStorage.getItem("token"),r=sessionStorage.getItem("room");return a.useEffect(()=>{if(!s)return u("/auth");if(!n||!r){const f=new URLSearchParams(window.location.search),i=f.get("token"),m=f.get("room");if(!i||!m)return u("/auth");f.delete("token"),f.delete("room");const k=`${window.location.pathname}?${f.toString()}`;window.history.replaceState({},"",k),n=i,r=m,sessionStorage.setItem("token",i),sessionStorage.setItem("room",m)}console.log("render")},[]),t.jsx("div",{id:"meeting-page",children:n&&r&&s&&g?t.jsx(_,{token:n,joinMeet:{roomId:r,meetId:s},children:t.jsx(M,{localStream:g})}):t.jsx(E,{onReady:f=>{l(f)}})})};export{N as default};