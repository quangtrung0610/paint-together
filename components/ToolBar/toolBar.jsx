import React, { useEffect, useState } from "react";
import Board from "../Board/board";
import { BrushPreview } from "./BrushPreview";
import { faPlay, faSquare, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
const SketchPicker = dynamic(
	() => import("react-color").then((mod) => mod.SketchPicker),
	{ ssr: false }
);

const ToolBar = (color, size) => {
	const [selectColor, setSelectColor] = useState("black");
	const [selectSize, setSelectSize] = useState("5");

	useEffect(() => {
		color = selectColor;
		size = selectSize;
	}, []);
	const [dateUrl, setDataUrl] = useState("#");
	const handleDownload = () => {
		let canvas = document.getElementById("board");
		setDataUrl(canvas.toDataURL("image/png"));
	};
	const handleClear = () => {
		let canvas = document.querySelector("#board");
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	return (
		<div className="container">
			<div className="toolbar">
				<BrushPreview currentWidth={selectSize} currentColor={selectColor} />
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
								<strong>Brush Color</strong>
							</small>
						</div>
						<div className="tool-section">
							<input
								type="color"
								className="color-picker"
								value={selectColor.hex}
								onChange={(e) => setSelectColor(e.target.value)}
							/>
						</div>
						<div className="tool-section">
							<small>
								<strong>Shapes</strong>
							</small>
						</div>
						<div className="tool-grid tool-section tool-section--lrg">
							<label className="btn btn--tool" id="triangle">
								<FontAwesomeIcon icon={faPlay} />
							</label>
							<label className="btn btn--tool" id="square">
								<FontAwesomeIcon icon={faSquare} />
							</label>
							<label className="btn btn--tool" id="circle">
								<FontAwesomeIcon icon={faCircle} />
							</label>
							<label
								htmlFor="tool-autowidth"
								className="btn btn--tool"
								id="line"
							>
								<FontAwesomeIcon icon={faPlay} />
							</label>
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
			</div>
			<Board color={selectColor} size={selectSize}></Board>
		</div>
	);
};

export default ToolBar;
