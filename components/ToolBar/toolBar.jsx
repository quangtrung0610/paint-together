import React, { useState } from "react";
import Board from "../Board/board";
import { BrushPreview } from "./BrushPreview";
import {Slider} from 'antd';

const ToolBar = () => {
  const [SelectColor, setSelectColor] = useState("black");
  const [selectSize, setSelectSize] = useState("5");
  
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
          <div className="tool-section">
            <small>
              <strong>Brush Size</strong>
            </small>
          </div>
        <div className="tool-section">
          <input
            defaultValue="5"
            type="range"
            min={1}
            max={100}
            onChange={(value) => {
              setSelectSize(value);
            }}
          />
          
        </div>
          <div className="tool-section">
            <input
              className="btn--color"
              type="color"
              value={SelectColor}
              onChange={(e) => {
                setSelectColor(e.target.value);
              }}
            />
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
