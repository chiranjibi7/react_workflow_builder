import React from 'react'
import { Handle } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import "./Shapes.css";

function Oval() {
  return (
    <div className='oval-node'>
        <Handle
        type="source"
        position="top"
        id="1"
      />
      <Handle
        type="source"
        position="bottom"
        id="2"
      />
       <Handle
        type="source"
        position="left"
        id="3"
      />
       <Handle
        type="source"
        position="right"
        className="handlebar"
        id="4"
      />
    </div>
  )
}

export default Oval