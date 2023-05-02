import React, { useMemo, useState,useRef } from "react";
import {MdFormatBold } from "react-icons/md";
import { Dropdown, Tooltip} from "flowbite-react";
import { RiItalic, RiUnderline } from "react-icons/ri";
import {
  CiTextAlignLeft,
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignRight,
} from "react-icons/ci";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import "../../../App.css";

function NodeStylebar(props) {
  const { handleUpdateNode, nodeClickedEvent, clickedNode, nodes } = props;

  const [borderWidthValue, setBorderWidthValue] = useState(1);
  const [textSizeValue, setTextSizeValue] = useState(10);

  const [fontBoldType,setFontBoldType]= useState("normal");
  const [fontStyleType,setFontStyleType]= useState("normal");
  const [fontUnderline, setFontUnderline]= useState("none");

  const alignLeftRef=useRef("black");
  const alignRightRef=useRef("black");
  const alignCenterRef=useRef("black");
  const alignJustifyRef=useRef("black");

  const currentNode = useMemo(() => {
    return nodes.filter((node) => node.id === clickedNode.id)[0];
  }, [clickedNode, nodes]);

    let alignText;
    if(currentNode?.style?.textAlign==="left"){
     alignText=<CiTextAlignLeft color="blue" size={18}/>;
    alignLeftRef.current="blue";
    alignRightRef.current="black";
    alignCenterRef.current="black";
    alignJustifyRef.current="black";
    }else if(currentNode?.style?.textAlign==="right"){
      alignText=<CiTextAlignRight color="blue" size={18}/>;
      alignLeftRef.current="black";
      alignRightRef.current="blue";
      alignCenterRef.current="black";
      alignJustifyRef.current="black";
    }else if(currentNode?.style?.textAlign==="justify"){
      alignText=<CiTextAlignJustify color="blue" size={18}/>;
      alignLeftRef.current="black";
      alignRightRef.current="black";
      alignCenterRef.current="black";
      alignJustifyRef.current="blue";
    }else {
      alignText=<CiTextAlignCenter color="blue" size={18}/>;
      alignLeftRef.current="black";
      alignRightRef.current="black";
      alignCenterRef.current="blue";
      alignJustifyRef.current="black";
    }
    
  return (
    <div
      style={{
        position: "fixed",
        top: `${nodeClickedEvent.screenY - 20}px`,
        left: `${nodeClickedEvent.screenX - 70}px`,
        zIndex: 10,
      }}
      className="flex gap-2.5 p-1 items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
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
          value={currentNode?.style?.backgroundColor}
          onChange={(e) => handleUpdateNode({ nodeBgColor: e.target.value })}
        />
      </div>
      <MdFormatBold
        size={25}
        // onClick={() => handleUpdateNode({ textBold: "bold" })}
        onClick={() => {
          if(fontBoldType==="normal"){
              setFontBoldType("bold");
              handleUpdateNode({ textBold: "bold"});
          }else{
            setFontBoldType("normal");
            handleUpdateNode({ textBold: "normal"});
          }
        }}
      />
      <RiItalic
        size={23}
        // onClick={() => handleUpdateNode({ textItalic: "italic" })}
        onClick={() => {
          if(fontStyleType==="normal"){
            setFontStyleType("italic");
            handleUpdateNode({ textItalic: "italic"});
        }else{
          setFontStyleType("normal");
          handleUpdateNode({ textItalic: "normal"});
        }
        }}
      />
      <RiUnderline
        size={23}
        // onClick={() => handleUpdateNode({ textDecorationLine: "underline" })}
        onClick={() => {
          if(fontUnderline==="none"){
            setFontUnderline("underline");
            handleUpdateNode({ textDecorationLine: "underline" });
        }else{
          setFontUnderline("none");
          handleUpdateNode({ textDecorationLine: "none"});
        }
        }}
      />
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
          value={currentNode?.style?.color}
          onChange={(e) => handleUpdateNode({ textColor: e.target.value })}
        />
      </div>
      <AiOutlinePlusCircle
        size={23}
        onClick={() => {
          setTextSizeValue((prevCount) => {
            handleUpdateNode({ textSize: prevCount + 1 });
            return prevCount + 1;
          });
        }}
      />
      <AiOutlineMinusCircle
        size={23}
        onClick={() => {
          setTextSizeValue((prevCount) => {
            if (prevCount == 10) return 10;
            handleUpdateNode({ textSize: prevCount - 1 });
            return prevCount - 1;
          });
        }}
      />
     <Dropdown
          label={alignText}
          dismissOnClick={false}
          inline={true}
          size="sm"
          arrowIcon={false}
          placement="bottom"
          style={{padding:0,background:"transparent"}}
        >
        <DropdownItem onClick={()=>handleUpdateNode({nodeTextAlign:"left"})} >
          <CiTextAlignLeft ref={alignLeftRef} size={23} color={alignLeftRef.current}/>
        </DropdownItem>

        <DropdownItem onClick={()=>handleUpdateNode({nodeTextAlign:"center"})}>
          <CiTextAlignCenter ref={alignCenterRef} size={23} color={alignCenterRef.current} />
        </DropdownItem>

        <DropdownItem onClick={()=>handleUpdateNode({nodeTextAlign:"justify"})}>
          <CiTextAlignJustify ref={alignJustifyRef} size={23} color={alignJustifyRef.current} />
        </DropdownItem>

        <DropdownItem  onClick={()=>handleUpdateNode({nodeTextAlign:"right"})}>
          <CiTextAlignRight sref={alignRightRef} size={23} color={alignRightRef.current}/>
        </DropdownItem>
        </Dropdown>
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
          value={currentNode?.style?.borderColor}
          onChange={(e) =>
            handleUpdateNode({ nodeBorderColor: e.target.value })
          }
        />
      </div>
      <AiOutlinePlusCircle
        size={23}
        onClick={() => {
          setBorderWidthValue((prevCount) => {
            handleUpdateNode({ borderWidth: prevCount + 1 });
            return prevCount + 1;
          });
        }}
      />
      {/* <p style={{fontWeight:"500",fontSize:"12px"}}>Border Width</p> */}
      <AiOutlineMinusCircle
        size={23}
        onClick={() => {
          setBorderWidthValue((prevCount) => {
            if (prevCount == 1) return 1;
            handleUpdateNode({ borderWidth: prevCount - 1 });
            return prevCount - 1;
          });
        }}
      />
    </div>
  );
}

export default NodeStylebar;
