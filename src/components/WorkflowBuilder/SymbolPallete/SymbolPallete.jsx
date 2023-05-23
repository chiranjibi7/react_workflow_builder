import React from "react";
import "./SymbolPallete.css";

function SymbolPallete() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="symbolpallete">
      <div
        onDragStart={(event) => onDragStart(event, "rectangleNode")}
        draggable
      >
        <svg fill="#000000" height="30px" width="50px" viewBox="0 0 512 512">
          <g>
            <g>
              <path
                d="M501.333,96H10.667C4.779,96,0,100.779,0,106.667v298.667C0,411.221,4.779,416,10.667,416h490.667
			c5.888,0,10.667-4.779,10.667-10.667V106.667C512,100.779,507.221,96,501.333,96z M490.667,394.667H21.333V117.333h469.333
			V394.667z"
              />
            </g>
          </g>
        </svg>
      </div>

      <div onDragStart={(event) => onDragStart(event, "circleNode")} draggable>
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#000000"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div
        onDragStart={(event) => onDragStart(event, "parallelogramNode")}
        draggable
      >
        <svg width="50px" height="30px" viewBox="0 0 20 20">
          <g>
            <path
              d="M 5.1308594 3 L 0.82226562 17 L 1.5 17 L 14.869141 17 L 19.177734 3 L 5.1308594 3 z M 5.8691406 4 L 17.822266 4 L 14.130859 16 L 2.1777344 16 L 5.8691406 4 z "
            />
          </g>
        </svg>
      </div>

      <div onDragStart={(event) => onDragStart(event, "ovalNode")} draggable>
        <svg fill="#000000" width="50px" height="30px" viewBox="0 0 24 24">
          <path d="M12 21c-6.617 0-12-4.037-12-9s5.383-9 12-9 12 4.037 12 9-5.383 9-12 9zm0-17C5.935 4 1 7.589 1 12s4.935 8 11 8 11-3.589 11-8-4.935-8-11-8z" />
        </svg>
      </div>

      <div onDragStart={(event) => onDragStart(event, "conditionNode")} draggable>
        <svg width="30px" height="30px" viewBox="0 0 24 24">
          <path d="M2.25 12.5a1.11 1.11 0 0 1 .324-.787l9.138-9.137a1.144 1.144 0 0 1 1.576 0l9.137 9.136a1.118 1.118 0 0 1 0 1.577l-9.137 9.135a1.143 1.143 0 0 1-1.576 0l-9.138-9.136a1.11 1.11 0 0 1-.324-.788zm19.5 0a.116.116 0 0 0-.033-.082l-9.135-9.133a.117.117 0 0 0-.164 0l-9.134 9.133a.117.117 0 0 0 0 .165l9.134 9.133a.117.117 0 0 0 .164 0l9.135-9.134a.116.116 0 0 0 .033-.082z" />
          <path fill="none" d="M0 0h24v24H0z" />
        </svg>
      </div>
    </div>
  );
}

export default SymbolPallete;
