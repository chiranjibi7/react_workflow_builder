import React,{useState} from "react";
import { Sidebar, Button, Dropdown, Badge} from "flowbite-react";
import { AiOutlinePlusCircle, AiOutlineFilePdf, AiOutlineSearch} from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import TailwindSelect from "react-tailwindcss-select";
import "./SideBar.css";

function SideBar({ setSideBarVisible,setIsSearchModalVisible }) {

  const [isDocumentsVisible, setIsDocumentsVisible]=useState(false);
  const [isEntitiesVisible, setIsEntitiesVisible]=useState(false);

  const [animal, setAnimal] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };

  const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" }
];

  return (
    <Sidebar className="sidebar">
      <div className="flex items-center justify-between mb-2 hover:cursor-pointer">
        <Button size="xs">
          Visit Complete Workflow
          <BsFillPlayFill className="ml-2" color="white" size={20} />
        </Button>
        <IoCloseOutline size={25} onClick={() => setSideBarVisible(false)} />
      </div>

      <div className="flex flex-col justify-between mb-2">
       <p className="font-bold text-lg">Workflow Name:</p>
        <TailwindSelect
            value={animal}
            onChange={handleChange}
            options={options}
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-between mb-2">
      <Dropdown
          placement="bottom"
          label="Version 1.0"
          dismissOnClick={false}
          size="sm"
          style={{ padding: 0, background: "gray" }}
        >
          <Dropdown.Item>Version 2.0</Dropdown.Item>
          <Dropdown.Item>Version 2.0</Dropdown.Item>
          <Dropdown.Item>Version 2.0</Dropdown.Item>
        </Dropdown>

        <Button size="xs" className="h-0 text-black border-black" onClick={()=>setIsSearchModalVisible(true)}>
            Advanced Search
            <AiOutlineSearch size={20} className="ml-2"/>
        </Button>
      </div>
 
      <div className="flex flex-col justify-center mb-3">
        <p className="font-bold text-lg">Description:</p>
        <p className="text-base">lorem</p>
      </div>

      <div className="mb-3">
        <p className="font-bold text-lg">Tags:</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge icon={IoCloseOutline}>Work Instruction</Badge>
          <Badge icon={IoCloseOutline}>Controlled Document</Badge>
          <Badge icon={IoCloseOutline}>Machine Control</Badge>
          <Badge icon={IoCloseOutline}>Floor Location</Badge>
        </div>
      </div>

      <p className="font-bold text-lg">Thumbnail:</p>
      <img width="100%" height="50px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVF6i-uJyDTaOR6JxQTP-Ks3cLQOflH0BIWiAireLjFIh3obLCuEhl_4MDmMs-118twr0&usqp=CAU"/>

      <div className="flex flex-col justify-center mb-3">
        <p className="font-bold text-lg">Workflow:</p>
        <img src="https://images.ctfassets.net/qop92tnevinq/2r2GOaT8jHg6I3c7DzqRpl/1fbc073f4a035b0b77ac6a63eede7687/flowchart-thumb-web.png" />
      </div>

      <div className="flex items-center justify-between mb-1">
        <p className="font-bold text-lg">Documents:</p>
        <AiOutlinePlusCircle size={25} className="hover:cursor-pointer" onClick={()=>setIsDocumentsVisible(prevState=>!prevState)} />
      </div>

      {isDocumentsVisible && (
        <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center justify-between gap-2">
          <AiOutlineFilePdf className="grow-0 shrink-0" size={23} color="red" />
          <p className="text-base grow shrink-0">EPA-12-22 Work instruction.pdf</p>
          <Badge className="hover:cursor-pointer grow-0 shrink-0" color="info">View</Badge>
        </div>
         <div className="flex items-center justify-between gap-2">
         <AiOutlineFilePdf size={23} className="grow-0 shrink-0" color="red" />
         <p className="text-base grow shrink-0">EPA-12-21 TWL.pdf</p>
         <Badge className="hover:cursor-pointer grow-0 shrink-0" color="info">View</Badge>
       </div>
      </div>
      )}

      <div className="flex items-center justify-between mb-1">
        <p className="font-bold text-lg">Physical Entities:</p>
        <AiOutlinePlusCircle size={25} className="hover:cursor-pointer" onClick={()=>setIsEntitiesVisible(prevState=>!prevState)} />
      </div>

      {isEntitiesVisible && 
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src="https://cdn.shopify.com/s/files/1/2239/4255/products/0251059_1_720x720.jpg?v=1575654056" height={100} width={60} />
            <div >
                <div><span className="font-bold">Name:</span><span> Multimeter</span></div>
                <div><span className="font-bold">Part Number:</span><span> MM-12-2020</span></div>
                <div><span className="font-bold">Category:</span><span> Measurement Tool</span></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://www.raspberrypi-spy.co.uk/wp-content/uploads/2018/03/raspberry_pi_3_model_b_plus_01-1024x683.jpg" height={100} width={60} />
            <div >
                <div><span className="font-bold">Name:</span><span> Raspberry Pi</span></div>
                <div><span className="font-bold">Part Number:</span><span> RP-09-2022</span></div>
                <div><span className="font-bold">Category:</span><span> Consumables</span></div>
            </div>
          </div>    
        </div>}
    </Sidebar>
    // </div>
  );
}

export default SideBar;
