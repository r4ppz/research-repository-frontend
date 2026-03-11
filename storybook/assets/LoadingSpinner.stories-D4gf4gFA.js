import{j as i}from"./jsx-runtime-u17CrQMm.js";import{c as d}from"./compiler-runtime-BauNitn0.js";import"./iframe-GlY_d23z.js";import"./preload-helper-PPVm8Dsz.js";const g="_container_1p23n_1",l="_spinner_1p23n_9",u="_message_1p23n_18",c={container:g,spinner:l,message:u},m=p=>{const e=d.c(5),{message:n}=p;let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r=i.jsx("div",{className:c.spinner}),e[0]=r):r=e[0];let s;e[1]!==n?(s=n&&i.jsx("p",{className:c.message,children:n}),e[1]=n,e[2]=s):s=e[2];let t;return e[3]!==s?(t=i.jsxs("div",{className:c.container,children:[r,s]}),e[3]=s,e[4]=t):t=e[4],t};m.__docgenInfo={description:"",methods:[],displayName:"LoadingSpinner",props:{message:{required:!1,tsType:{name:"string"},description:""}}};const v={component:m,parameters:{layout:"centered"},argTypes:{message:{control:"text"}}},a={args:{message:void 0}},o={args:{message:"Everything you have ever done has led you to this spinning circle. Was it worth it?"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    message: undefined
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Everything you have ever done has led you to this spinning circle. Was it worth it?"
  }
}`,...o.parameters?.docs?.source}}};const x=["Default","WithMessage"];export{a as Default,o as WithMessage,x as __namedExportsOrder,v as default};
