import React from "react";
import "./Symbolbar.css";
import { IoShapesOutline } from "react-icons/io5";
import { RxText } from "react-icons/rx";
import { RiStickyNoteLine } from "react-icons/ri";
import { Controls,ControlButton} from "reactflow";
import {Tooltip} from "flowbite-react";
import "reactflow/dist/style.css";

function Symbolbar(props) {
  const { setIsSymbolPalleteVisible, handleAddNode } = props;

  return (
        <Controls className="symbolbar">
          <div style={{marginTop:"10px"}} onClick={()=>handleAddNode("textNode")}>
            <RxText size={17}/>
          </div>
        
          <div onClick={()=>handleAddNode("stickyNoteNode")} style={{margin:"10px 0px"}}>
              <RiStickyNoteLine size={16}/>
          </div>

       <div
          style={{ marginBottom: "10px" }}
          onClick={() => setIsSymbolPalleteVisible((prevState) => !prevState)}
        >
          <IoShapesOutline size={17}/>
        </div>
        </Controls>
  );
}

export default Symbolbar;
