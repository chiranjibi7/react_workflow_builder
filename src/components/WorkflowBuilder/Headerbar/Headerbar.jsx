import React from "react";
import { Dropdown, Tooltip, Button } from "flowbite-react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import "./Headerbar.css";
import { toPng, toJpeg } from "html-to-image";
import { GrDocumentDownload } from "react-icons/gr";
import { HiPlus } from "react-icons/hi";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { CgLayoutGridSmall,CgNotes } from "react-icons/cg";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import {BsInfoCircle} from "react-icons/bs";

function Headerbar(props) {
  const { saveWorkflow, handleWorkflowSettings,handleSideBar} = props;

  const downloadPngImage = () => {
    toPng(document.querySelector(".react-flow")).then(function (dataUrl) {
      const a = document.createElement("a");
      a.setAttribute("download", "reactflow.png");
      a.setAttribute("href", dataUrl);
      a.click();
    });
  };

  const downloadJpegImage = () => {
    toJpeg(document.querySelector(".react-flow")).then(function (dataUrl) {
      const a = document.createElement("a");
      a.setAttribute("download", "reactflow.jpeg");
      a.setAttribute("href", dataUrl);
      a.click();
    });
  };
  return (
    <>
    <div className="headerbar1 flex gap-3.5 p-1 items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Tooltip
        content="Download"
        placement="top"
        className="flex items-center h-6"
      >
        <Dropdown
          label={<GrDocumentDownload size={23} />}
          dismissOnClick={false}
          inline={true}
          size="sm"
          arrowIcon={false}
          placement="bottom"
        >
          <DropdownItem onClick={downloadJpegImage}>JPEG</DropdownItem>
          <DropdownItem onClick={downloadPngImage}>PNG</DropdownItem>
        </Dropdown>
      </Tooltip>

      <Button color="light" size="xs" onClick={saveWorkflow}>
        SAVE
      </Button>

      <Dropdown
        label="SETTINGS"
        dismissOnClick={false}
        size="xs"
        placement="bottom"
        style={{
          background: "transparent",
          color: "black",
          border: "1px solid #ddd",
        }}
        className="settings-dropdown"
      >
        <div className="flex gap-2 items-center justify-center bg-white md:flex-row md:max-w-xl ">
          <Tooltip
            content="Theme"
            placement="bottom"
            className="flex items-center h-6"
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
                margin: 0,
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
                onChange={(e) =>
                  handleWorkflowSettings({ bgColor: e.target.value })
                }
              />
            </div>
          </Tooltip>

          <Dropdown
            label="VARIANT"
            size="xs"
            style={{
              background: "transparent",
              color: "black",
              border: "1px solid #ddd",
            }}
          >
            <Tooltip
              content="Lines"
              placement="left"
              className="flex items-center h-6"
            >
              <DropdownItem
                onClick={() => {
                  handleWorkflowSettings({ variant: "lines" });
                }}
              >
                <MdOutlineGrid3X3 size={20} />
              </DropdownItem>
            </Tooltip>
            <Tooltip
              content="Dots"
              placement="left"
              className="flex items-center h-6"
            >
              <DropdownItem
                onClick={() => {
                  handleWorkflowSettings({ variant: "dots" });
                }}
              >
                <CgLayoutGridSmall size={20} />
              </DropdownItem>
            </Tooltip>
            <Tooltip
              content="Cross"
              placement="left"
              className="flex items-center h-6"
            >
              <DropdownItem
                onClick={() => {
                  handleWorkflowSettings({ variant: "cross" });
                }}
              >
                <HiPlus size={20} />
              </DropdownItem>
            </Tooltip>
          </Dropdown>

          <Tooltip
            content="Line Color"
            placement="bottom"
            className="flex items-center h-6"
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
                margin: 0,
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
                onChange={(e) =>
                  handleWorkflowSettings({ lineColor: e.target.value })
                }
              />
            </div>
          </Tooltip>

            <AiOutlinePlusCircle size={23} onClick={()=>handleWorkflowSettings({lineGapPlus:true})}/>
            Gap
            <AiOutlineMinusCircle size={23} onClick={()=>handleWorkflowSettings({lineGapMinus:true})}/>
        </div>
      </Dropdown>

      <Tooltip
        content="Details"
        placement="top"
        className="flex items-center h-6"
      >
      <CgNotes size={23} onClick={handleSideBar}/>
      </Tooltip>
    </div>

    <div className="headerbar2 flex gap-3.5 p-1 items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <Dropdown
        label="Workflow Versions"
        dismissOnClick={false}
        size="xs"
        placement="bottom"
        style={{
          background: "transparent",
          color: "black",
          border: "1px solid #ddd",
        }}
      >
        <DropdownItem>Workflow 1.0</DropdownItem>
        <DropdownItem>Workflow 2.0</DropdownItem>
        <DropdownItem>Workflow 3.0</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Parent Workflow"
        dismissOnClick={false}
        size="xs"
        placement="bottom"
        style={{
          background: "transparent",
          color: "black",
          border: "1px solid #ddd",
        }}
      >
        <DropdownItem>Parent 1</DropdownItem>
        <DropdownItem>Parent 2</DropdownItem>
        <DropdownItem>Parent 3</DropdownItem>
      </Dropdown>

      <Tooltip
        content="Created"
        placement="top"
        className="flex items-center h-6"
      >
      <BsInfoCircle size={23}/>
      </Tooltip>
    </div>
    </>
  );
}

export default Headerbar;
