import React,{useEffect} from 'react';
import { Handle, useUpdateNodeInternals, useNodeId } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import "./Shapes.css";

function Diamond() {
  const updateNodeInternals = useUpdateNodeInternals();
  const nodeId=useNodeId();

  useEffect(()=>{
    updateNodeInternals(nodeId);
  },[nodeId, updateNodeInternals]);

  return (
    <div className='diamond-node'>
      <Handle type="source" position="top" id="1" style={{left:0}}/>
      <Handle type="source" position="bottom" id="2" style={{right:0}}/>
      <Handle type="source" position="left" id="3"  style={{bottom:'-50%'}}/>
      <Handle type="source" position="right" id="4" style={{top:0}}/> 
      {/* <textarea/> */}
  </div>
  )
}

export default Diamond

// import React, { useRef } from 'react';
// import { Handle, useUpdateNodeInternals } from 'react-flow-renderer';

// const DiamondNode = () => {
//   const diamondRef = useRef(null);
//   const updateNodeInternals = useUpdateNodeInternals();

//   const handleRotation = () => {
//     if (!diamondRef.current) return;
//     const diamondBounds = diamondRef.current.getBoundingClientRect();
//     const handleTop = diamondBounds.top - diamondBounds.height / 2 + diamondBounds.width / 2;
//     const handleBottom = diamondBounds.bottom - diamondBounds.height / 2 - diamondBounds.width / 2;
//     const handleLeft = diamondBounds.left - diamondBounds.width / 2 + diamondBounds.height / 2;
//     const handleRight = diamondBounds.right - diamondBounds.width / 2 - diamondBounds.height / 2;
//     updateNodeInternals({
//       id: 'diamond-node-id',
//       handles: {
//         top: { position: { x: diamondBounds.width / 2, y: handleTop } },
//         bottom: { position: { x: diamondBounds.width / 2, y: handleBottom } },
//         left: { position: { x: handleLeft, y: diamondBounds.height / 2 } },
//         right: { position: { x: handleRight, y: diamondBounds.height / 2 } },
//       },
//     });
//   };

//   return (
//     <div className="diamond-node" ref={diamondRef} onClick={handleRotation}>
//       <Handle type="source" position="top" id="1" />
//       <Handle type="source" position="bottom" id="2" />
//       <Handle type="source" position="left" id="3" />
//       <Handle type="source" position="right" id="4" />
//     </div>
//   );
// };

// export default DiamondNode