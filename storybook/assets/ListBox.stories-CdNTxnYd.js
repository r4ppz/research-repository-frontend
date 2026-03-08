import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-C4huN6xK.js";import{a as o,L as l}from"./ListBox-C_TXa7uC.js";import"./preload-helper-PPVm8Dsz.js";import"./compiler-runtime-CIsh9yRT.js";import"./utils-DOyiVSFO.js";import"./clsx-B-dksMZM.js";import"./Content-BNBNZ3qH.js";import"./BaseCollection-BxD8DDI0.js";import"./Hidden-D6VhJK1C.js";import"./index-BUVrOMMW.js";import"./index-WePXSU8V.js";import"./index-BfJS-i_R.js";const I={component:o,parameters:{layout:"centered"},argTypes:{selectionMode:{control:{type:"select"},options:["none","single","multiple"]},autoFocus:{control:"boolean"},disallowEmptySelection:{control:"boolean"}}},d=[{id:"aardvark",name:"Aardvark"},{id:"cat",name:"Cat"},{id:"dog",name:"Dog"},{id:"kangaroo",name:"Kangaroo"},{id:"panda",name:"Panda"},{id:"snake",name:"Snake"}],t={args:{"aria-label":"Favorite animal",selectionMode:"single",autoFocus:!1,disallowEmptySelection:!1},render:n=>a.jsx(o,{...n,children:d.map(e=>a.jsx(l,{id:e.id,children:e.name},e.id))})},s={args:{"aria-label":"Select an animal",selectionMode:"single"},render:n=>{const[e,m]=c.useState(new Set(["cat"]));return a.jsxs("div",{style:{minWidth:"200px"},children:[a.jsx(o,{...n,selectedKeys:e,onSelectionChange:m,children:d.map(r=>a.jsx(l,{id:r.id,children:r.name},r.id))}),a.jsxs("p",{style:{marginTop:"20px",fontSize:"15px",alignItems:"center"},children:["Selected: ",e==="all"?"all":[...e].join(", ")||"none"]})]})}},i={args:{"aria-label":"Select an animal",selectionMode:"single"},render:n=>a.jsx(o,{...n,children:d.map(e=>a.jsx(l,{id:e.id,isDisabled:e.id==="snake",children:e.name},e.id))})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Favorite animal",
    selectionMode: "single",
    autoFocus: false,
    disallowEmptySelection: false
  },
  render: args => <ListBox {...args}>
      {animals.map(item => <ListBoxItem key={item.id} id={item.id}>
          {item.name}
        </ListBoxItem>)}
    </ListBox>
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Select an animal",
    selectionMode: "single"
  },
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<Selection>(new Set(["cat"]));
    return <div style={{
      minWidth: "200px"
    }}>
        <ListBox {...args} selectedKeys={selected} onSelectionChange={setSelected}>
          {animals.map(item => <ListBoxItem key={item.id} id={item.id}>
              {item.name}
            </ListBoxItem>)}
        </ListBox>
        <p style={{
        marginTop: "20px",
        fontSize: "15px",
        alignItems: "center"
      }}>
          Selected: {selected === "all" ? "all" : [...selected].join(", ") || "none"}
        </p>
      </div>;
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Select an animal",
    selectionMode: "single"
  },
  render: args => <ListBox {...args}>
      {animals.map(item => <ListBoxItem key={item.id} id={item.id} isDisabled={item.id === "snake"}>
          {item.name}
        </ListBoxItem>)}
    </ListBox>
}`,...i.parameters?.docs?.source}}};const v=["Basic","Controlled","WithDisabledItems"];export{t as Basic,s as Controlled,i as WithDisabledItems,v as __namedExportsOrder,I as default};
