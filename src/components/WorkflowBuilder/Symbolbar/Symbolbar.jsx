import React from "react";
import "./Symbolbar.css";
import { IoShapesOutline } from "react-icons/io5";
import { RxText } from "react-icons/rx";
import { RiStickyNoteLine } from "react-icons/ri";
import { Controls, ControlButton } from "reactflow";
import "reactflow/dist/style.css";

function Symbolbar(props) {
  const { setIsSymbolPalleteVisible, handleAddNode } = props;

  return (
    <div>
        <Controls className="symbolbar">
        <ControlButton>
          <RxText size={25} />
        </ControlButton>
        <ControlButton onClick={handleAddNode}>
          <RiStickyNoteLine size={25} style={{ margin: "8px 0px" }} />
        </ControlButton>
        <ControlButton
          onClick={() => setIsSymbolPalleteVisible((prevState) => !prevState)}
        >
          <IoShapesOutline size={25} style={{ marginBottom: "8px" }} />
        </ControlButton></Controls>
    </div>
  );
}

export default Symbolbar;
