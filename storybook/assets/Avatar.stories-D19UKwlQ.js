import{j as N}from"./jsx-runtime-u17CrQMm.js";import{c as k}from"./compiler-runtime-CDKfanJ6.js";import{c as A}from"./clsx-B-dksMZM.js";import{r as E}from"./iframe-DHu2a9OZ.js";import"./preload-helper-PPVm8Dsz.js";const I="_avatar_142h6_1",T="_sm_142h6_13",U="_md_142h6_19",j="_lg_142h6_25",q="_image_142h6_31",B="_initials_142h6_37",i={avatar:I,sm:T,md:U,lg:j,image:q,initials:B};function D(p){const e=p.trim().split(/\s+/);return e.length===0||e[0]===""?"?":e.length===1?e[0].charAt(0).toUpperCase():(e[0].charAt(0)+e[e.length-1].charAt(0)).toUpperCase()}function x(p){const e=k.c(14),{src:r,alt:u,fallbackName:g,size:b,className:f}=p,y=b===void 0?"md":b,[z,J]=E.useState(!1),h=r&&!z;let t;e[0]!==g?(t=D(g),e[0]=g,e[1]=t):t=e[1];const _=t;let n;e[2]===Symbol.for("react.memo_cache_sentinel")?(n=()=>{J(!0)},e[2]=n):n=e[2];const S=n,v=i[y];let a;e[3]!==f||e[4]!==v?(a=A(i.avatar,v,f),e[3]=f,e[4]=v,e[5]=a):a=e[5];let s;e[6]!==u||e[7]!==_||e[8]!==h||e[9]!==r?(s=h?N.jsx("img",{src:r,alt:u,className:i.image,onError:S,referrerPolicy:"no-referrer"}):N.jsx("span",{className:i.initials,children:_}),e[6]=u,e[7]=_,e[8]=h,e[9]=r,e[10]=s):s=e[10];let o;return e[11]!==a||e[12]!==s?(o=N.jsx("div",{className:a,children:s}),e[11]=a,e[12]=s,e[13]=o):o=e[13],o}x.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},alt:{required:!0,tsType:{name:"string"},description:""},fallbackName:{required:!0,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const H={component:x,title:"Common/Avatar",parameters:{layout:"centered"},argTypes:{src:{control:"text"},alt:{control:"text"},fallbackName:{control:"text"},size:{control:{type:"select"},options:["sm","md","lg"]}}},l={args:{src:void 0,alt:"John Doe",fallbackName:"John Doe",size:"md"}},c={args:{src:void 0,alt:"Jane Smith",fallbackName:"Jane Smith",size:"sm"}},m={args:{src:void 0,alt:"Bob Johnson",fallbackName:"Bob Johnson",size:"lg"}},d={args:{src:"https://i.pravatar.cc/150?img=1",alt:"User Avatar",fallbackName:"User Name",size:"md"}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    src: undefined,
    alt: "John Doe",
    fallbackName: "John Doe",
    size: "md"
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    src: undefined,
    alt: "Jane Smith",
    fallbackName: "Jane Smith",
    size: "sm"
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    src: undefined,
    alt: "Bob Johnson",
    fallbackName: "Bob Johnson",
    size: "lg"
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User Avatar",
    fallbackName: "User Name",
    size: "md"
  }
}`,...d.parameters?.docs?.source}}};const O=["WithInitials","Small","Large","WithImage"];export{m as Large,c as Small,d as WithImage,l as WithInitials,O as __namedExportsOrder,H as default};
