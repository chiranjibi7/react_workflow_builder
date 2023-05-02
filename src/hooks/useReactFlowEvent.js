import {useState,useCallback,useRef} from 'react';
import {
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    MarkerType,
  } from "reactflow";

function useReactFlowEvent() {
    const workflow = JSON.parse(window.localStorage.getItem("workflow"));
    const reactFlowWrapper = useRef(null);

    //state for storing nodes and edges of workflows
    const [nodes, setNodes] = useState(workflow?.nodes?? []);
    const [edges, setEdges] = useState(workflow?.edges??[]);
    //state for saving react-flow instance
    const [rfInstance, setRfInstance] = useState(null);

    //state for storing edge-events
    const [isEdgeClicked, setIsEdgeClicked] = useState(false);
    const [clickedEdge, setClickedEdge] = useState(null);
    const [edgeClickedEvent, setEdgeClickedEvent] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState("bezierEdge");

    //state for storing node-events
    const [isNodeClicked, setIsNodeClicked] = useState(false);
    const [clickedNode, setClickedNode] = useState({});
    const [nodeClickedEvent, setNodeClickedEvent] = useState({});

    const [isSymbolPalleteVisible, setIsSymbolPalleteVisible] = useState(false);
    const [sideBarVisible,setSideBarVisible]=useState(false);

    //react-flow event triggered when node is changes
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
      );
 
    //react-flow event triggered when edge is changes
      const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
      );
    
    //react-flow event triggered when nodes are connected with each other
      const onConnect = useCallback(
        (connection) =>
          setEdges((eds) =>
            addEdge({ ...connection, type: selectedEdge, data: { text: "" } }, eds)
          ),
        [setEdges]
      );
      
    //react-flow event triggered when shape is dragged and droppped into the canvas
      const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      };
    
      const onDrop = (event) => {
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");
    
        if (type === undefined || !type) {
          return;
        }
    
        const position = rfInstance.project({
          x: event.clientX - reactFlowBounds.left - 50,
          y: event.clientY - reactFlowBounds.top - 50,
        });
    
        let style;
        switch (type) {
          case "rectangleNode":
            style = {
              display: "inline-block",
              width: "150px",
              height: "80px",
              backgroundColor: "#eeeeee",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#787878",
              textAlign: "center",
              fontSize: "10px",
              fontWeight: "normal",
              color: "#000000",
              padding: "4px",
            };
          break;
          case "circleNode":
            style={
              display: "inline-block",
              width: "130px",
              height: "130px",
              backgroundColor: "#eeeeee",
              borderRadius:"50%",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#787878",
              textAlign: "center",
              fontSize: "10px",
              fontWeight: "normal",
              color: "#000000",
              padding: "4px"
            };
          break;
          case "diamondNode":
            style={
            display: "inline-block",
            width: "100px",
            height: "100px",
            backgroundColor: "red",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#787878",
            textAlign: "center",
            fontSize: "10px",
            fontWeight: "normal",
            color: "#000000",
            padding: "4px",
            transform: "rotate(-45deg)"
          };
          break;
        }
        const newNode = {
          id: Math.random() + new Date(),
          type,
          position,
          style,
          data: {},
        };
        setNodes((nds) => nds.concat(newNode));
      };

      const handleEdgeClick=(event, edge) => {
        event.preventDefault();
        setIsEdgeClicked((prevState) => !prevState);
        setClickedEdge(edge);
        setEdgeClickedEvent(event);
      };

      const onNodeDragStop=(node)=>{
        const {id,data}=node;
        let updatedNode = nodes.map((nds) => {
          if (nds.id === id) {
            return {
              ...nds,
              data: { ...data, label:data.label ?? ""},
            };
          } else {
            return { ...nds };
          }
        });
        setNodes(updatedNode);
      };
    
      const handleNodeClick=(event, node) => {
        event.preventDefault();
        onNodeDragStop(node);
        setIsNodeClicked((prevState) => !prevState);
        setClickedNode(node);
        setNodeClickedEvent(event);
      }
    
      const handlePaneClick=()=>{
        setIsSymbolPalleteVisible(false);
        setIsEdgeClicked(false);
        setIsNodeClicked(false);
      }
    
      const handleMoveStart=() => {
        setIsEdgeClicked(false);
        setIsNodeClicked(false);
      }

      const handleAddNode = (type) => {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const newNode = {
          id: Math.random() + new Date(),
          type,
          position :rfInstance.project({
            x:  type==="stickyNoteNode" ? (reactFlowBounds.left + 100) : (reactFlowBounds.left + 150),
            y: type==="stickyNoteNode" ? (reactFlowBounds.top + 100) : (reactFlowBounds.top + 150)
          }),
          style: {
            backgroundColor: type==="stickyNoteNode" ? "white" : "transparent",
            border: type==="stickyNoteNode" ? "none" : "1px dashed gray",
            boxShadow: type==="stickyNoteNode" ? "0px 10px 15px -9px #000000" : "none",
            display: "inline-block",
            width: "100px",
            height: "100px",
            textAlign: "center",
            fontSize: "10px",
            fontWeight: "normal",
            color: "#000000",
            padding: "4px",
          },
          data:{}
        };
        setNodes((nds) => nds.concat(newNode));
      };
    
      const handleUpdateNode = (nodeParams) => {
        const {
          nodeBgColor,
          textBold,
          textItalic,
          textDecorationLine,
          borderWidth,
          nodeBorderColor,
          textColor,
          textSize,
          nodeTextAlign,
        } = nodeParams;
        const thisNode =nodes.find((node) => node.id === clickedNode.id);
        const { id, style, data }=thisNode;
        let updatedNode = nodes.map((nds) => {
          if (nds.id === id) {
            return {
              ...nds,
              data: {
                ...data,
                textUnderline: textDecorationLine ?? data?.textUnderline,
              },
              style: {
                ...style,
                backgroundColor: nodeBgColor ?? style?.backgroundColor,
                fontWeight: textBold ?? style?.fontWeight,
                fontStyle: textItalic ?? style?.fontStyle,
                textDecoration: textDecorationLine ?? style?.textDecoration,
                borderWidth: borderWidth ?? style?.borderWidth,
                borderColor: nodeBorderColor ?? style?.borderColor,
                color: textColor ?? style?.color,
                fontSize: textSize ?? style?.fontSize,
                textAlign: nodeTextAlign ?? style?.textAlign,
              },
            };
          } else {
            return { ...nds };
          }
        });
        setNodes(updatedNode);
      };
    
      const handleUpdateEdge = (edgeParams) => {
        const {
          typeOfEdge,
          animatedStatus,
          startMarkerType,
          endMarkerType,
          edgeColor,
          edgeWidth,
          edgeLabelColor,
          edgeLabelBgColor
        } = edgeParams;
        console.log(startMarkerType, endMarkerType)
        setSelectedEdge(typeOfEdge);
        const { id, type, animated, markerStart, markerEnd, style } = edges.filter(
          (edg) => edg.id === clickedEdge.id
        )[0];
        const markerType = {
          "Default": undefined,
          "Arrow Opened": MarkerType.Arrow,
          "Arrow Closed": MarkerType.ArrowClosed,
        };
    
        let updatedEdge = edges.map((eds) => {
          if (eds.id === id) {
            return {
              ...eds,
              focusable: true,
              type: typeOfEdge ?? type,
              animated: animatedStatus ?? animated,
              style: {
                stroke: edgeColor ?? style?.stroke,
                strokeWidth: edgeWidth ?? style?.strokeWidth,
                labelColor: edgeLabelColor ?? style?.labelColor,
                labelBgColor: edgeLabelBgColor ?? style?.labelBgColor
              },
              markerStart: {
                type: markerType[startMarkerType] ?? markerStart?.type,
                color: (edgeColor ?? style?.stroke ?? "black"),
                strokeWidth: (edgeWidth-3) ?? (style?.strokeWidth-3),
              },
              markerEnd: {
                type: markerType[endMarkerType] ?? markerEnd?.type,
                color: (edgeColor ?? style?.stroke ?? "black"),
                strokeWidth: (edgeWidth-3) ?? (style?.strokeWidth-3),
              },
            };
          } else {
            return { ...eds };
          }
        });
        setEdges(updatedEdge);
      };
    
      const saveWorkflow = () => {
        console.log(rfInstance?.toObject());
        const workflow = JSON.stringify(rfInstance?.toObject());
        window.localStorage.setItem("workflow", workflow);
      };

      const handleSideBar = () => {
        if (isNodeClicked) {
          setSideBarVisible(true);
          setIsNodeClicked(false);
        } else {
          setSideBarVisible(false);
        }
      };
    
      return {nodes,edges,setRfInstance,onNodesChange,onEdgesChange,onConnect,isEdgeClicked,clickedEdge,edgeClickedEvent,isNodeClicked,clickedNode,nodeClickedEvent,onDragOver,onDrop,reactFlowWrapper,handleNodeClick,handleEdgeClick,handlePaneClick,handleMoveStart,isSymbolPalleteVisible, setIsSymbolPalleteVisible,handleAddNode,handleUpdateNode,handleUpdateEdge,saveWorkflow,handleSideBar,sideBarVisible,setSideBarVisible}
    }

export default useReactFlowEvent