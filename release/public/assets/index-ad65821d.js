import{r as h,j as e}from"./index-d3df8d87.js";const p=a=>{const i=/[A-Z]/,c=/[a-z]/,l=/[0-9]/;return a.length<8||!i.test(a)||!c.test(a)||!l.test(a)},m=({onLogin:a})=>{const[n,i]=h.useState(!0),c=()=>{i(t=>!t)},l=t=>{if(t.preventDefault(),n){const d=t.target.logUsername.value,o=t.target.logPassword.value;fetch("/api/v1/auth/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username:d,password:o})}).then(r=>{r.ok?r.json().then(s=>{s.access_token&&a(s.access_token)}):r.json().then(s=>{s.message&&alert(s.message)})}).catch(r=>{alert(r)})}else{const d=t.target.regUsername.value,o=t.target.regPassword.value,r=t.target.reRegPassword.value;if(o!=r)return alert("Passwords do not match");if(p(o))return alert("weak password");fetch("/api/v1/auth/register",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username:d,password:o})}).then(s=>{s.json().then(u=>{u.message&&alert(u.message)})}).catch(s=>{alert(s)})}};return e.jsx("div",{id:"auth-page",children:e.jsxs("div",{className:"wrapper",children:[e.jsx("h2",{children:n?"Login":"Register"}),e.jsxs("form",{onSubmit:l,children:[n?e.jsxs("div",{children:[e.jsxs("div",{className:"input-box",children:[e.jsx("input",{type:"text",placeholder:"Username",name:"logUsername",required:!0}),e.jsx("i",{className:"bx bxs-user"})]}),e.jsxs("div",{className:"input-box",children:[e.jsx("input",{type:"password",placeholder:"Password",name:"logPassword",required:!0}),e.jsx("i",{className:"bx bxs-lock-alt"})]})]}):e.jsxs("div",{children:[e.jsx("div",{className:"input-box",children:e.jsx("input",{type:"text",placeholder:"Username",name:"regUsername",required:!0})}),e.jsx("div",{className:"input-box",children:e.jsx("input",{type:"password",placeholder:"Password",name:"regPassword",required:!0})}),e.jsx("div",{className:"input-box",children:e.jsx("input",{type:"password",placeholder:"Repeat Password",name:"reRegPassword",required:!0})})]}),e.jsx("button",{className:"btn",type:"submit",children:n?"Login":"Register"})]}),e.jsxs("button",{className:"btn",onClick:c,children:["Switch to ",n?"Register":"Login"]})]})})};export{m as default};
