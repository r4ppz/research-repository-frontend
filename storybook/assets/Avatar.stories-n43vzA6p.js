import{j as _}from"./jsx-runtime-u17CrQMm.js";import{c as b}from"./compiler-runtime-CZt2xmuh.js";import{c as x}from"./clsx-B-dksMZM.js";import"./iframe-C3upt2aV.js";import"./preload-helper-PPVm8Dsz.js";const z="_avatar_jdkid_1",J="_image_jdkid_12",j="_initials_jdkid_18",y="_sm_jdkid_25",S="_md_jdkid_31",A="_lg_jdkid_37",i={avatar:z,image:J,initials:j,sm:y,md:S,lg:A};function I(d){const e=d.trim().split(/\s+/);return e.length===0||e[0]===""?"?":e.length===1?e[0].charAt(0).toUpperCase():(e[0].charAt(0)+e[e.length-1].charAt(0)).toUpperCase()}function N(d){const e=b.c(12),{src:r,alt:p,fallbackName:g,size:v,className:u}=d,k=v===void 0?"md":v;let t;e[0]!==g?(t=I(g),e[0]=g,e[1]=t):t=e[1];const f=t,h=i[k];let a;e[2]!==u||e[3]!==h?(a=x(i.avatar,h,u),e[2]=u,e[3]=h,e[4]=a):a=e[4];let s;e[5]!==p||e[6]!==f||e[7]!==r?(s=r?_.jsx("img",{src:r,alt:p,className:i.image,referrerPolicy:"no-referrer"}):_.jsx("span",{className:i.initials,children:f}),e[5]=p,e[6]=f,e[7]=r,e[8]=s):s=e[8];let n;return e[9]!==a||e[10]!==s?(n=_.jsx("div",{className:a,children:s}),e[9]=a,e[10]=s,e[11]=n):n=e[11],n}N.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},alt:{required:!0,tsType:{name:"string"},description:""},fallbackName:{required:!0,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const W={component:N,argTypes:{src:{control:"text"},alt:{control:"text"},fallbackName:{control:"text"},size:{control:{type:"select"},options:["sm","md","lg"]}}},o={args:{src:void 0,alt:"John Doe",fallbackName:"John Doe",size:"md"}},l={args:{src:void 0,alt:"Jane Smith",fallbackName:"Jane Smith",size:"sm"}},c={args:{src:void 0,alt:"Bob Johnson",fallbackName:"Bob Johnson",size:"lg"}},m={args:{src:"https://i.pravatar.cc/150?img=1",alt:"User Avatar",fallbackName:"User Name",size:"md"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    src: undefined,
    alt: "John Doe",
    fallbackName: "John Doe",
    size: "md"
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    src: undefined,
    alt: "Jane Smith",
    fallbackName: "Jane Smith",
    size: "sm"
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    src: undefined,
    alt: "Bob Johnson",
    fallbackName: "Bob Johnson",
    size: "lg"
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User Avatar",
    fallbackName: "User Name",
    size: "md"
  }
}`,...m.parameters?.docs?.source}}};const E=["WithInitials","Small","Large","WithImage"];export{c as Large,l as Small,m as WithImage,o as WithInitials,E as __namedExportsOrder,W as default};
