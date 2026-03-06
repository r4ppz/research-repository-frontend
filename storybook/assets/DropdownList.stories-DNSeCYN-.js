import{j as a}from"./jsx-runtime-u17CrQMm.js";import{c as m}from"./compiler-runtime-D1KiVyG2.js";import{e as x}from"./utils-CdiN4tcq.js";import{$ as f,L as g}from"./ListBox-B26ZSnJE.js";import{T as u}from"./Content-DWxh6TeA.js";import{c as h}from"./createLucideIcon-B5AdACLt.js";import"./iframe-DYl7-ztJ.js";import"./preload-helper-PPVm8Dsz.js";import"./clsx-B-dksMZM.js";import"./index-CW34gakq.js";import"./index-C1pOtCbM.js";import"./Hidden-DNYMZ2aV.js";import"./index-lqw9kLae.js";const w=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],_=h("check",w),D="_checkIcon_imzcy_14",k="_label_imzcy_28",y="_dropdownListBox_imzcy_61",d={checkIcon:D,label:k,dropdownListBox:y};function c(o){const e=m.c(2);let n;return e[0]!==o?(n=a.jsx(f,{...o,className:d.dropdownListBox}),e[0]=o,e[1]=n):n=e[1],n}function l(o){const e=m.c(6),n=o.textValue??(typeof o.children=="string"?o.children:void 0);let t;e[0]!==o.children?(t=x(o.children,I),e[0]=o.children,e[1]=t):t=e[1];let i;return e[2]!==o||e[3]!==t||e[4]!==n?(i=a.jsx(g,{...o,textValue:n,children:t}),e[2]=o,e[3]=t,e[4]=n,e[5]=i):i=e[5],i}function I(o,e){const{isSelected:n}=e;return a.jsxs(a.Fragment,{children:[typeof o=="string"?a.jsx(u,{className:d.label,slot:"label",children:o}):o,n&&a.jsx(_,{className:d.checkIcon})]})}c.__docgenInfo={description:"",methods:[],displayName:"DropdownListBox"};l.__docgenInfo={description:"",methods:[],displayName:"DropdownItem"};const C={component:c,argTypes:{selectionMode:{control:{type:"select"},options:["none","single","multiple"]},autoFocus:{control:"boolean"},disallowEmptySelection:{control:"boolean"}}},p=[{id:"aardvark",name:"Aardvark"},{id:"cat",name:"Cat"},{id:"dog",name:"Dog"},{id:"kangaroo",name:"Kangaroo"},{id:"panda",name:"Panda"},{id:"snake",name:"Snake"}],s={args:{"aria-label":"Favorite animal",selectionMode:"single",autoFocus:!1,disallowEmptySelection:!1},render:o=>a.jsx(c,{...o,children:p.map(e=>a.jsx(l,{id:e.id,children:e.name},e.id))})},r={args:{"aria-label":"Select an animal",selectionMode:"single"},render:o=>a.jsx(c,{...o,children:p.map(e=>a.jsx(l,{id:e.id,isDisabled:e.id==="snake",children:e.name},e.id))})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Favorite animal",
    selectionMode: "single",
    autoFocus: false,
    disallowEmptySelection: false
  },
  render: args => <DropdownListBox {...args}>
      {animals.map(item => <DropdownItem key={item.id} id={item.id}>
          {item.name}
        </DropdownItem>)}
    </DropdownListBox>
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Select an animal",
    selectionMode: "single"
  },
  render: args => <DropdownListBox {...args}>
      {animals.map(item => <DropdownItem key={item.id} id={item.id} isDisabled={item.id === "snake"}>
          {item.name}
        </DropdownItem>)}
    </DropdownListBox>
}`,...r.parameters?.docs?.source}}};const R=["Basic","WithDisabledItems"];export{s as Basic,r as WithDisabledItems,R as __namedExportsOrder,C as default};
