import React, { useState } from "react";
import Board from "../Board/board";
import { BrushPreview } from "./BrushPreview";
import { SketchPicker } from "react-color";

const ToolBar = () => {
  const [SelectColor, setSelectColor] = useState("black");
  const [selectSize, setSelectSize] = useState("5");
  const [text, setText] = useState("");

  const [dateUrl, setDataUrl] = useState("#");
  const handleDownload = () => {
    var canvas = document.getElementById("board");
    setDataUrl(canvas.toDataURL("image/png"));
  };
  const handleClear = () => {
    let canvas = document.querySelector("#board");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <>
      <div className="toolbar">
        <BrushPreview currentWidth={selectSize} currentColor={SelectColor} />
        <div className="tool-section tool-section--lrg">
          <div>
            <div className="tool-section">
              <small>
                <strong>Brush Size</strong>
              </small>
            </div>
            <div className="tool-section">
              <input
                style={{ width: "98%" }}
                defaultValue="5"
                type="range"
                min={1}
                max={100}
                onChange={(e) => {
                  setSelectSize(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div className="tool-section">
              <small>
                <strong>Brush Size</strong>
              </small>
            </div>
            <div className="tool-section">
              <SketchPicker
                width="150px"
                color={SelectColor}
                onChangeComplete={(color) => {
                  setSelectColor(color.hex);
                }}
              />
            </div>
          </div>
        </div>
        <div className="btn--bottom">
          <a
            className="btn btn--main btn--block"
            download="image.png"
            onClick={handleDownload}
            href={dateUrl}
          >
            Save Image
          </a>
          <button className="btn btn--block" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <Board color={SelectColor} size={selectSize}></Board>
    </>
  );
};

export default ToolBar;
