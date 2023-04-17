import React, { useCallback, useState, useRef, useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "../components/WorkflowBuilder/Shapes/nodeTypes";
import { edgeTypes } from "../components/WorkflowBuilder/Edges/edgeTypes";
import {
  Symbolbar,
  SymbolPallete,
  EdgeStylebar,
  NodeStylebar,
  Headerbar,
  SideBar,
  SearchModal
} from "../components";
import "../App.css";

function WorkflowBuilder() {
  const workflow = JSON.parse(window.localStorage.getItem("workflow"));
  const [nodes, setNodes] = useState(workflow?.nodes?? []);
  const [edges, setEdges] = useState(workflow?.edges??[]);
  const [isSymbolPalleteVisible, setIsSymbolPalleteVisible] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);

  const [isEdgeClicked, setIsEdgeClicked] = useState(false);
  const [clickedEdge, setClickedEdge] = useState(null);
  const [edgeClickedEvent, setEdgeClickedEvent] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState("bezierEdge");

  const [sideBarVisible,setSideBarVisible]=useState(false);
  const [isNodeClicked, setIsNodeClicked] = useState(false);
  const [clickedNode, setClickedNode] = useState({});
  const [nodeClickedEvent, setNodeClickedEvent] = useState({});

  const [diagramBgColor, setDiagramBgColor] = useState("#eee");
  const [diagramVariantType, setDiagramVariantType] = useState("lines");
  const [patternColor, setPatternColor] = useState("lightgray");
  const [lineGap, setLineGap] = useState([100, 100]);

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const reactFlowWrapper = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge({ ...connection, type: selectedEdge, data: { text: "" } }, eds)
      ),
    [setEdges]
  );

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
          width: "150px",
          height: "150px",
          borderRadius:"50%",
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
      case "parallelogramNode":
        style={}
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

  const handleAddNode = () => {
    const newNode = {
      id: Math.random() + new Date(),
      type: "stickyNoteNode",
      position: { x: 100, y: 100 },
      style: {
        minHeight: "100px",
        minWidth: "100px",
        backgroundColor: "white",
        border: "none",
        boxShadow: "0px 10px 15px -9px #000000",
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
    } = edgeParams;
    setSelectedEdge(typeOfEdge);
    const { id, type, animated, markerStart, markerEnd, style } = edges.filter(
      (edg) => edg.id === clickedEdge.id
    )[0];
    const markerType = {
      Default: null,
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
          },
          markerStart: {
            type: markerType[startMarkerType] ?? markerStart?.type,
          },
          markerEnd: {
            type: markerType[endMarkerType] ?? markerEnd?.type,
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

  const handleWorkflowSettings = (settingParams) => {
    const { bgColor, variant, lineColor, lineGapPlus, lineGapMinus } =
      settingParams;
    if (bgColor) {
      setDiagramBgColor(bgColor);
    }
    if (variant) {
      setDiagramVariantType(variant);
    }
    if (lineColor) {
      setPatternColor(lineColor);
    }
    if (lineGapPlus) {
      setLineGap((prevGap) => prevGap.map((gap) => gap + 2));
    }
    if (lineGapMinus) {
      setLineGap((prevGap) => prevGap.map((gap) => gap - 2));
    }
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

  const handleSideBar = () => {
    if (isNodeClicked) {
      setSideBarVisible(true);
      setIsNodeClicked(false);
    } else {
      setSideBarVisible(false);
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", height: "100vh" }} ref={reactFlowWrapper}>
        <ReactFlow
          connectionMode="loose"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid={true}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onEdgeClick={(event, edge) => {
            event.preventDefault();
            setIsEdgeClicked((prevState) => !prevState);
            setClickedEdge(edge);
            setEdgeClickedEvent(event);
          }}
          onNodeClick={(event, node) => {
            event.preventDefault();
            onNodeDragStop(node);
            setIsNodeClicked((prevState) => !prevState);
            setClickedNode(node);
            setNodeClickedEvent(event);
          }}
          onPaneClick={() => {
            setIsSymbolPalleteVisible(false);
            setIsEdgeClicked(false);
            setIsNodeClicked(false);
          }}
          onMoveStart={() => {
            setIsEdgeClicked(false);
            setIsNodeClicked(false);
          }}
        >
          <Background
            color={patternColor}
            variant={diagramVariantType}
            gap={lineGap}
            style={{ background: diagramBgColor }}
            size={6}
          />

          {isEdgeClicked && (
            <EdgeStylebar
              handleUpdateEdge={handleUpdateEdge}
              edgeClickedEvent={edgeClickedEvent}
              clickedEdge={clickedEdge}
              edges={edges}
            />
          )}

          {isNodeClicked && (
            <NodeStylebar
              handleUpdateNode={handleUpdateNode}
              nodeClickedEvent={nodeClickedEvent}
              clickedNode={clickedNode}
              nodes={nodes}
            />
          )}
        </ReactFlow>
      </div>

      <Symbolbar
        setIsSymbolPalleteVisible={setIsSymbolPalleteVisible}
        handleAddNode={handleAddNode}
      />
      {isSymbolPalleteVisible && <SymbolPallete />}
      <Headerbar
        handleSideBar={handleSideBar}
        saveWorkflow={saveWorkflow}
        handleWorkflowSettings={handleWorkflowSettings}
      />

      {sideBarVisible && 
      <SideBar setSideBarVisible={setSideBarVisible} setIsSearchModalVisible={setIsSearchModalVisible}/>}

      <SearchModal isSearchModalVisible={isSearchModalVisible} setIsSearchModalVisible={setIsSearchModalVisible}/>
    </ReactFlowProvider>
  );
}

export default WorkflowBuilder;
