import React from "react";
import "./Symbolbar.css";
import { IoShapesOutline } from "react-icons/io5";
import { RxText } from "react-icons/rx";
import { RiStickyNoteFill } from "react-icons/ri";
import {FcFlowChart} from "react-icons/fc";
import { Controls,ControlButton} from "reactflow";
import {Tooltip} from "flowbite-react";
import "reactflow/dist/style.css";

function Symbolbar(props) {
  const { setIsSymbolPalleteVisible,setIsShapePalleteVisible,handleAddNode } = props;

  return (
        <Controls className="symbolbar">
          <div style={{marginTop:"10px"}} onClick={()=>handleAddNode("textNode")}>
            <RxText size={17}/>
          </div>
        
          <div onClick={()=>handleAddNode("stickyNoteNode")} style={{margin:"10px 0px"}}>
              <RiStickyNoteFill size={18} color="#20de99"/>
          </div>

       <div
          style={{ marginBottom: "10px" }}
          onClick={() => {
            setIsSymbolPalleteVisible((prevState) => !prevState);
            setIsShapePalleteVisible(false);
          }}
        >
          <IoShapesOutline size={18} color="red"/>
        </div>

        <div
          style={{ marginBottom: "10px" }}
          onClick={() => {
            setIsShapePalleteVisible((prevState) => !prevState);
            setIsSymbolPalleteVisible(false);
          }}
        >
          <FcFlowChart size={22} color="black"/>
        </div>
        </Controls>
  );
}

export default Symbolbar;
