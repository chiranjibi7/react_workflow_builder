import React,{useState} from 'react';
import {getSmoothStepPath, EdgeLabelRenderer} from "reactflow";
import "../../../App.css";

function Step({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    markerStart,
    markerEnd,
    data
  }) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
      });

    const [edgeLabel, setEdgeLabel]=useState("");
    const [showInput, setShowInput] = useState(false);
 
      return (
        <>
        <path
        className="react-flow__edge-path-selector"
        d={edgePath}
        onDoubleClick={() => {
          setShowInput((prevState) => !prevState);
        }}
      />
          <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            markerStart={markerStart}
            onDoubleClick={() => {
              setShowInput((prevState) => !prevState);
            }}
          />
         <EdgeLabelRenderer>
          <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: '#ffcc00',
            fontSize: 12,
            fontWeight:"bold",
            pointerEvents: "all",
            padding:"4px",
            borderRadius:"5px"
          }}
        > 
        {showInput ? (
            <input
            className="focus:outline-none p-0.5"
              onChange={(e) => {
                e.stopPropagation();
                setEdgeLabel(e.target.value);
                data.text = e.target.value;
              }}
              value={data.text}
              onMouseLeave={() => {
                setShowInput((prevState) => !prevState);
              }}
            />
          ) : <p>{data.text}</p>}
        </div>
          </EdgeLabelRenderer>
        </>
      );
}

export default Step