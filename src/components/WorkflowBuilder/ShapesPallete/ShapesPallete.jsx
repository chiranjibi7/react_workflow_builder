import React from "react";
import "./ShapesPallete.css";
import processImg from "../../../assets/img/process.png";
import conditionImg from "../../../assets/img/condition.png";
import startImg from "../../../assets/img/start.png";
import { Tooltip } from "flowbite-react";

function ShapesPallete() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="shapes-pallete gap-3">
      <Tooltip
        content="Start"
        placement="top"
        className="flex items-center h-6"
      >
        <div
          onDragStart={(event) => onDragStart(event, "startNode")}
          draggable
        >
          <img src={startImg} height={35} width={35} />
        </div>
      </Tooltip>
      <div
        onDragStart={(event) => onDragStart(event, "processNode")}
        draggable
      >
        <img src={processImg} height={30} width={30} />
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "conditionNode")}
        draggable
      >
        <img src={conditionImg} height={30} width={30} />
      </div>
    </div>
  );
}

export default ShapesPallete;
