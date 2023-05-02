import React, { useState, useMemo } from "react";
import { Dropdown, Tooltip} from "flowbite-react";
import {Curve,Line,Step, OpenArrow, CloseArrow} from "../../../assets";
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from "react-icons/ai";
import {MdOutlineFormatColorText} from "react-icons/md";
import "../../../App.css";
import { edgeTypes } from "../Edges/edgeTypes";

function EdgeStylebar(props) {
  const { handleUpdateEdge, edgeClickedEvent, clickedEdge, edges } = props;

  const [targetArrow, setTargetArrow]=useState(<Line height="15" width="15"/>);
  const [sourceArrow, setSourceArrow]=useState(<Line height="15" width="15"/>);
  const [edgeWidthValue, setEdgeWidthValue] = useState(1);

  const currentEdge = useMemo(() => {
    return edges.filter((edg) => edg.id === clickedEdge.id)[0];
  }, [clickedEdge, edges]);


  let displayEdge;
  if(currentEdge?.type==="straightEdge"){
    displayEdge=<Line  width="20" height="20"/>;
  } else if(currentEdge?.type==="bezierEdge"){
    displayEdge=<Curve  width="20" height="20"/>;
  } else if(currentEdge?.type==="stepEdge"){
    displayEdge=<Step  width="20" height="20"/>;
  } else{
    displayEdge=<Curve  width="20" height="20"/>
  }

  let displayTargetArrow;
  if(currentEdge?.markerEnd==="arrow"){
    displayTargetArrow=<OpenArrow width="15" height="15"/>;
  } else if(currentEdge?.markerEnd==="arrowclosed"){
    displayTargetArrow=<CloseArrow  width="15" height="15"/>;
  }  else{
    displayTargetArrow="None";
  }

  let displaySourceArrow;
  if(currentEdge?.markerStart==="arrow"){
    displaySourceArrow=<OpenArrow width="15" height="15"/>;
  } else if(currentEdge?.markerStart==="arrowclosed"){
    displaySourceArrow=<CloseArrow width="15" height="15"/>;
  }  else{
    displaySourceArrow="None"
  }

  return (
    <div
      style={{
        position: "fixed",
        top: `${edgeClickedEvent.screenY-20}px`,
        left: `${edgeClickedEvent.screenX-70}px`,
        zIndex:10
      }}
      className="flex gap-3.5 p-1 items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Tooltip
        content="Edge Type"
        placement="top"
        className="flex items-center h-6"
      >
        <Dropdown
          label={<div>
            {displayEdge}
            <p style={{fontSize:"12px"}}>Type</p>
          </div>}
          dismissOnClick={false}
          size="sm"
          inline={true}
          placement="bottom"
          arrowIcon={false}
          style={{padding:0,background:"transparent"}}
        >
          <Dropdown.Item
            onClick={() => {
              handleUpdateEdge({ typeOfEdge: "bezierEdge" });
            }}
          >
            <Curve height="20" width="20"/>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleUpdateEdge({ typeOfEdge: "straightEdge" });
            }}
          >
          <Line height="20" width="20"/>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleUpdateEdge({ typeOfEdge: "stepEdge" });
            }}
          >
            <Step height="20" width="20"/>
          </Dropdown.Item>
        </Dropdown>
      </Tooltip>

      <p>Animated:</p>
      <Tooltip
        content="Animated"
        placement="top"
        className="flex items-center h-6 justify-center"
      >
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={currentEdge?.animated ?? false}
          className="sr-only peer"
          onChange={(e) =>
            handleUpdateEdge({ animatedStatus: e.target.checked })
          }
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      </Tooltip>

      <Tooltip
        content="Source Arrow"
        placement="top"
        className="flex items-center h-6"
      >
        <Dropdown inline={true}
          placement="bottom"
          arrowIcon={false} label={displaySourceArrow} dismissOnClick={false} size="sm" style={{padding:0}}>
          <Dropdown.Item
            onClick={() =>{
              setSourceArrow(<Line height="2" width="15"/>)
              handleUpdateEdge({ startMarkerType: "Default" });
            }}
          >
            {/* <Line height="20" width="20" /> */}
            <p>None</p>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>{
              setSourceArrow(<OpenArrow height="15" width="15"/>);
              handleUpdateEdge({ startMarkerType: "Arrow Opened" });
            }}
          >
           <OpenArrow height="20" width="20"/>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>{
              setSourceArrow(<CloseArrow height="15" width="15"/>);
              handleUpdateEdge({ startMarkerType: "Arrow Closed" });
            }}
          >
            <CloseArrow height="20" width="20"/>
          </Dropdown.Item>
        </Dropdown>
      </Tooltip>

      <Tooltip
        content="Target Arrow"
        placement="top"
        className="flex items-center h-6"
      >
        <Dropdown inline={true}
          placement="bottom"
          arrowIcon={false} label={ displayTargetArrow} dismissOnClick={false} size="sm" style={{padding:0}}>
          <Dropdown.Item
            onClick={() => {
              setTargetArrow( <Line width="15" height="2"/>);
              handleUpdateEdge({ endMarkerType: "Default" });
            }}
          >
           {/* <Line width="20" height="20"/> */}
           <p>None</p>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>{
              setTargetArrow( <OpenArrow width="15" height="15"/>)
              handleUpdateEdge({ endMarkerType: "Arrow Opened" });
            }}
          >
           <OpenArrow width="20" height="20"/>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setTargetArrow(<CloseArrow width="15" height="15"/>)
              handleUpdateEdge({ endMarkerType: "Arrow Closed" });
            }}
          >
           <CloseArrow width="20" height="20" />
          </Dropdown.Item>
        </Dropdown>
      </Tooltip>

      <Tooltip
        content="Edge Color"
        placement="top"
        className="flex items-center h-6"
      >
      <div
        style={{
          border: "solid 2px #ddd",
          position: "relative",
          borderRadius: "50%",
          width: "23px",
          height: "23px",
          background: "red",
          overflow: "hidden",
        }}
      >
     <input
         style={{
          position: "absolute",
          right: "-8px",
          top: "-8px",
          width: "40px",
          height: "40px",
          border: "none",
        }}
        type="color"
        value={currentEdge?.style?.stroke}
        onChange={(e) => handleUpdateEdge({ edgeColor: e.target.value })}
      />
      </div>
      </Tooltip>

      <Tooltip
        content="Width +"
        placement="top"
        className="flex items-center h-6"
      >
      <AiOutlinePlusCircle size={23}  onClick={() => {
          setEdgeWidthValue((prevCount) => {
            handleUpdateEdge({ edgeWidth: prevCount + 1 });
            return prevCount + 1;
          });
        }}/>
        </Tooltip>
      <p>Thickness</p>
      <Tooltip
        content="Width -"
        placement="top"
        className="flex items-center h-6"
      >
      <AiOutlineMinusCircle size={23}  onClick={() => {
          setEdgeWidthValue((prevCount) => {
            if (prevCount == 1) return 1;
            handleUpdateEdge({ edgeWidth: prevCount - 1 });
            return prevCount - 1;
          });
        }} />
      </Tooltip>

    <Tooltip
        content="Label Color"
        placement="top"
        className="flex items-center h-6"
      >
      <div
        style={{
          border: "solid 2px #ddd",
          position: "relative",
          borderRadius: "50%",
          width: "23px",
          height: "23px",
          background: "red",
          overflow: "hidden",
        }}
      >
     <input
         style={{
          position: "absolute",
          right: "-8px",
          top: "-8px",
          width: "40px",
          height: "40px",
          border: "none",
        }}
        type="color"
        value={currentEdge?.style?.labelColor}
        onChange={(e) => handleUpdateEdge({ edgeLabelColor: e.target.value })}
      />
      </div>
      </Tooltip>

      <Tooltip
        content="Label Background"
        placement="top"
        className="flex items-center h-10"
      >
      <div
        style={{
          border: "solid 2px #ddd",
          position: "relative",
          borderRadius: "50%",
          width: "23px",
          height: "23px",
          background: "red",
          overflow: "hidden",
        }}
      >
     <input
         style={{
          position: "absolute",
          right: "-8px",
          top: "-8px",
          width: "40px",
          height: "40px",
          border: "none",
        }}
        type="color"
        value={currentEdge?.style?.labelBgColor}
        onChange={(e) => handleUpdateEdge({ edgeLabelBgColor: e.target.value })}
      />
      </div>
      </Tooltip>

    </div>
  );
}

export default EdgeStylebar;
