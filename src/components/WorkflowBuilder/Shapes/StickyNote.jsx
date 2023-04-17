import React from 'react';
import { Handle } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";
import "./Shapes.css";

function StickyNote({selected}) {
  return (
    <div>
      <NodeResizer isVisible={selected} color="#ff0071" />
    </div>
  )
}

export default StickyNote;