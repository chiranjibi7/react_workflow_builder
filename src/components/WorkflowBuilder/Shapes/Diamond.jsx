import React,{useEffect,useState,useRef} from 'react';
import { Handle, useUpdateNodeInternals, useNodeId, useReactFlow } from 'reactflow';
import { NodeResizer } from "@reactflow/node-resizer";
import '@reactflow/node-resizer/dist/style.css';
import "./Shapes.css";

function Diamond({selected,data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const nodeId=useNodeId();
  const {getNode, getNodes}=useReactFlow();
  const [initialNodes, setInitialNodes]=useState(getNodes());

  const textareaRef = useRef();
  const [nodeLabel, setNodeLabel]=useState(data.label);

  useEffect(()=>{
    updateNodeInternals(nodeId);
  },[nodeId, updateNodeInternals]);

  const handleUpdateNodeData = (e) => {
    e.preventDefault();
    const newLabel = e.target.value;
    setNodeLabel(newLabel);
    const thisNode=getNode(nodeId);
    if(thisNode){
      thisNode.data.label=newLabel;
      setInitialNodes((els) => els.map((el) => (el.id === nodeId ? thisNode : el)));
    }
  };

  return (
  //   <span>
  //      <NodeResizer
  //       isVisible={selected}
  //       color="#ff0071"
  //       lineStyle={{ width: "0px", height: "0px" }}
  //       handleStyle={{ width: "7px", height: "7px", borderRadius: "50%" }}
  //       minWidth={100}
  //       minHeight={30}
  //     />
  //     {/* <Handle type="source" position="top" id="1" style={{background:"red",left:0}}/>
  //     <Handle type="source" position="bottom" id="2" style={{background:"red",marginLeft:"51%"}}/>
  //     <Handle type="source" position="left" id="3" style={{background:"red",marginTop:"51%"}} />
  //     <Handle type="source" position="right" id="4" style={{background:"red",top:0}}/>  */}

  //     <Handle type="source" position="top" id="1" />
  //     <Handle type="source" position="bottom" id="2" />
  //     <Handle type="source" position="left" id="3" />
  //     <Handle type="source" position="right" id="4" /> 
  //     <textarea
  //       ref={textareaRef}
  //       className='diamond-node'
  //       style={{ textDecoration: data?.textUnderline }}
  //       readOnly={true}
  //       onDoubleClick={() => {
  //         textareaRef.current.readOnly = false;
  //       }}
  //       onBlur={() => {
  //         textareaRef.current.readOnly = true;
  //       }}
  //       value={nodeLabel}
  //       onChange={(e) => handleUpdateNodeData(e)}
  //     />
  // </span>

  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,5 90,50 50,95 10,50" fill="none" stroke="black"/>
</svg>

  )
}

export default Diamond

