import React, {useState, useRef} from "react";
import ReactFlow, {
  Background,
  ReactFlowProvider,
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
  SearchModal,
  ShapesPallete
} from "../components";
import useReactFlowEvent from "../hooks/useReactFlowEvent";
import "../App.css";

function WorkflowBuilder() {

  const {nodes,edges,setRfInstance,onNodesChange,onEdgesChange,onConnect,isEdgeClicked,clickedEdge,edgeClickedEvent,isNodeClicked,clickedNode,nodeClickedEvent,onDragOver,onDrop,reactFlowWrapper,handleNodeClick,handleEdgeClick,handlePaneClick,handleMoveStart, handleEdgeDelete,isSymbolPalleteVisible, isShapePalleteVisible,setIsShapePalleteVisible,setIsSymbolPalleteVisible,handleAddNode,handleUpdateNode,handleUpdateEdge,saveWorkflow,handleSideBar,sideBarVisible,setSideBarVisible}=useReactFlowEvent();

  const [diagramBgColor, setDiagramBgColor] = useState("#eee");
  const [diagramVariantType, setDiagramVariantType] = useState("lines");
  const [patternColor, setPatternColor] = useState("lightgray");
  const [lineGap, setLineGap] = useState([100, 100]);

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

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
          onEdgeClick={(event,edge)=> handleEdgeClick(event,edge)}
          onNodeClick={(event, node)=> handleNodeClick(event,node)}
          onPaneClick={handlePaneClick}
          onMoveStart={handleMoveStart}
          onEdgesDelete={handleEdgeDelete}
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
        setIsShapePalleteVisible={setIsShapePalleteVisible}
        handleAddNode={handleAddNode}
      />
      {isSymbolPalleteVisible && <SymbolPallete />}
      {isShapePalleteVisible && <ShapesPallete/>}
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
