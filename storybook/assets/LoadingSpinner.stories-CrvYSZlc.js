import{j as c}from"./jsx-runtime-u17CrQMm.js";import{c as d}from"./compiler-runtime-CZt2xmuh.js";import"./iframe-C3upt2aV.js";import"./preload-helper-PPVm8Dsz.js";const g="_container_1tbhn_1",l="_spinner_1tbhn_9",u="_message_1tbhn_18",i={container:g,spinner:l,message:u},m=p=>{const e=d.c(5),{message:a}=p;let n;e[0]===Symbol.for("react.memo_cache_sentinel")?(n=c.jsx("div",{className:i.spinner}),e[0]=n):n=e[0];let s;e[1]!==a?(s=a&&c.jsx("p",{className:i.message,children:a}),e[1]=a,e[2]=s):s=e[2];let r;return e[3]!==s?(r=c.jsxs("div",{className:i.container,children:[n,s]}),e[3]=s,e[4]=r):r=e[4],r};m.__docgenInfo={description:"",methods:[],displayName:"LoadingSpinner",props:{message:{required:!1,tsType:{name:"string"},description:""}}};const y={component:m,parameters:{layout:"centered"},argTypes:{message:{control:"text"}}},t={args:{message:void 0}},o={args:{message:"Loading data..."}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    message: undefined
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Loading data..."
  }
}`,...o.parameters?.docs?.source}}};const j=["Default","WithMessage"];export{t as Default,o as WithMessage,j as __namedExportsOrder,y as default};
