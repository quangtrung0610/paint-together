import React, { useEffect, useState } from "react";
import Board from "./board";
import { BrushPreview } from "./BrushPreview";
import { GiPencil, GiPaintBucket, GiPaintBrush } from "react-icons/gi";
import { BsEraserFill, BsTextareaT } from "react-icons/bs";
import { FiTriangle, FiSquare, FiCircle } from "react-icons/fi";

const ToolBar = () => {
	const [selectedColor, setSelectedColor] = useState("#000000");
	const [selectSize, setSelectSize] = useState(10);
	const [dataUrl, setDataUrl] = useState("#");

	useEffect(() => {
		activeBtn();
	}, []);

	const widthHalf = selectSize ? selectSize / 2 : 0;
	let cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.4" height="${selectSize}" viewBox="0 0 ${selectSize} ${selectSize}" width="${selectSize}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;
	// if (selectedTool === "pencil") {
	// 	cursor = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='25px' height='25px' viewBox='0 0 25 25' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 0 0.390625 C 0 0.46875 0.546875 1.640625 1.171875 2.8125 C 1.796875 4.0625 2.578125 6.40625 2.8125 8.046875 C 3.28125 10.625 4.375 11.953125 11.09375 17.65625 C 15.3125 21.25 19.453125 24.21875 20.3125 24.21875 C 22.5 24.21875 24.21875 22.109375 24.21875 19.375 C 24.21875 17.421875 22.96875 15.78125 17.8125 10.46875 C 14.296875 6.875 11.015625 3.90625 10.546875 3.90625 C 10.078125 3.90625 7.5 3.046875 4.84375 2.03125 C 2.1875 0.9375 0 0.234375 0 0.390625 Z M 16.5625 10.703125 C 22.421875 16.5625 24.21875 19.609375 22.65625 21.484375 C 20.859375 23.671875 18.984375 22.734375 11.40625 15.9375 C 5.703125 10.859375 3.90625 8.75 3.90625 7.34375 C 3.90625 6.25 3.59375 4.765625 3.203125 3.984375 C 2.5 2.734375 2.734375 2.734375 6.875 4.0625 C 10.3125 5.234375 12.5 6.71875 16.5625 10.703125 Z M 16.5625 10.703125 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 14.921875 12.1875 C 18.125 15.625 20.859375 18.359375 21.09375 18.203125 C 21.25 18.046875 18.671875 15.234375 15.234375 11.875 L 9.0625 5.859375 Z M 14.921875 12.1875 '/%3E%3C/g%3E%3C/svg%3E%0A") ${widthHalf} ${widthHalf}, auto`;
	// }
	const handleDownload = () => {
		let canvas = document.getElementById("board");
		setDataUrl(canvas.toDataURL("image/png"));
	};
	const handleClear = () => {
		let canvas = document.querySelector("#board");
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	const activeBtn = () => {
		const toolBtn = document.querySelectorAll(".btn--tool");

		toolBtn.forEach((btn) => {
			btn.addEventListener("click", () => {
				const activeElement = document.getElementsByClassName("active");
				const previewBrush = document.getElementsByClassName("preview__brush");
				if (activeElement.length > 0) {
					//activeElement[0].classList.remove("active")
					activeElement[0].className = activeElement[0].className.replace(
						" active",
						""
					);
					if (previewBrush.length > 0) {
						previewBrush[0].className = previewBrush[0].className.replace(
							" preview__fill",
							""
						);
					}
				}
				if (btn.id === "fill") {
					previewBrush[0].classList.add("preview__fill");
				}
				btn.classList.add("active");

				let canvas = document.querySelector("#board");
				switch (btn.id) {
					case "brush":
						setSelectSize(10);
						break;
					case "pencil":
						setSelectSize(1);
						canvas.style.cursor = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='25px' height='25px' viewBox='0 0 25 25' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 0 0.390625 C 0 0.46875 0.546875 1.640625 1.171875 2.8125 C 1.796875 4.0625 2.578125 6.40625 2.8125 8.046875 C 3.28125 10.625 4.375 11.953125 11.09375 17.65625 C 15.3125 21.25 19.453125 24.21875 20.3125 24.21875 C 22.5 24.21875 24.21875 22.109375 24.21875 19.375 C 24.21875 17.421875 22.96875 15.78125 17.8125 10.46875 C 14.296875 6.875 11.015625 3.90625 10.546875 3.90625 C 10.078125 3.90625 7.5 3.046875 4.84375 2.03125 C 2.1875 0.9375 0 0.234375 0 0.390625 Z M 16.5625 10.703125 C 22.421875 16.5625 24.21875 19.609375 22.65625 21.484375 C 20.859375 23.671875 18.984375 22.734375 11.40625 15.9375 C 5.703125 10.859375 3.90625 8.75 3.90625 7.34375 C 3.90625 6.25 3.59375 4.765625 3.203125 3.984375 C 2.5 2.734375 2.734375 2.734375 6.875 4.0625 C 10.3125 5.234375 12.5 6.71875 16.5625 10.703125 Z M 16.5625 10.703125 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 14.921875 12.1875 C 18.125 15.625 20.859375 18.359375 21.09375 18.203125 C 21.25 18.046875 18.671875 15.234375 15.234375 11.875 L 9.0625 5.859375 Z M 14.921875 12.1875 '/%3E%3C/g%3E%3C/svg%3E%0A") ${widthHalf} ${widthHalf}, auto`;
						break;
					case "fill":
						setSelectSize(161);
						canvas.style.cursor = `url("data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='27px' height='25px' viewBox='0 0 122.88 112.71'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23000000;fill-rule:evenodd;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3Epaint-bucket%3C/title%3E%3Cpath class='cls-1' d='M6.56,52C33.11,57.3,43.18,89.47,86.29,67.8L58,96.06s-.57.58-.63.65a7,7,0,0,1-4.29,2.56,13.6,13.6,0,0,1-4.2.24h0a21.48,21.48,0,0,1-4.8-1.06c-7.4-2.48-15.17-7.8-21.79-14.37S10.22,69.62,7.61,62.19a25.29,25.29,0,0,1-1-3.74,17.9,17.9,0,0,1-.33-3.3A12.86,12.86,0,0,1,6.56,52Z'/%3E%3Cpath d='M110.56,84.94c-1.21-1.85-2.44-3.72-3.61-5.64-1.35,2.26-2.77,4.48-4.15,6.64-3.51,5.48-6.72,10.51-6.72,12.55,0,4.65,2.24,7.71,5.23,9.21a12.56,12.56,0,0,0,4.94,1.25,13,13,0,0,0,5.16-.74,9.49,9.49,0,0,0,6.36-8c.13-4.1-3.44-9.53-7.21-15.27Z'/%3E%3Cpath d='M111.24,72.76c.82,3.48,3.17,7.06,5.43,10.5,3.35,5.1,6.52,9.93,6.18,15.51l0,.22a14.76,14.76,0,0,1-10,12.68,17.35,17.35,0,0,1-6.85,1,17,17,0,0,1-6.73-1.76A14.85,14.85,0,0,1,91,97c0-3.86,2.79-8.22,5.83-13,2.46-3.84,5.11-8,5.86-11.25a4.41,4.41,0,0,1,8.59,0Z'/%3E%3Cpath class='cls-1' d='M107,73.76c2.15,9.2,12,17.11,11.5,24.75-1.49,13.54-23.07,13-23.07-1.51,0-5.18,9.72-15.25,11.57-23.24Z'/%3E%3Cpath d='M34.65,13.77c-10.22,1.1-16.22,4.63-19,9.11a13.37,13.37,0,0,0-1.23,10.65l.09.34,20.11-20.1ZM80.8,24.89c-7.29-7.3-14.66-13-20.73-16.17C55.76,6.5,52.4,5.61,50.75,6.55l-.82.82c-1.22,2-.51,6.26,1.78,11.58A68.81,68.81,0,0,0,66.22,39.47c6.94,6.94,14.39,12.14,20.73,15,4.51,2,8.21,2.9,10.35,2.32l1.91-1.92c.45-1.91-.5-5.14-2.49-9.13C93.63,39.53,88,32.08,80.8,24.89ZM62.94,3.15c6.66,3.43,14.58,9.57,22.31,17.3S99,36.15,102.34,43c3.75,7.51,4.35,13.92.69,17.58A8.23,8.23,0,0,1,101,62L61.88,101.1c-2.35,2.37-3.33,3.37-7.38,4.28a19.93,19.93,0,0,1-6.14.36,27.5,27.5,0,0,1-6.24-1.35c-8.33-2.8-17-8.66-24.22-15.86S4.63,72.6,1.7,64.25A30.28,30.28,0,0,1,.43,59.6,23.6,23.6,0,0,1,0,55.15a15.25,15.25,0,0,1,1.23-6.81A17.84,17.84,0,0,1,5,43.42l.16-.17,4.71-4.7A24.06,24.06,0,0,1,8.65,35.1a19.15,19.15,0,0,1,1.92-15.34C14.84,12.78,24.42,7.59,41,7.42l4.17-4.16a7.06,7.06,0,0,1,1.58-1.57,2.46,2.46,0,0,1,.67-.45C51.13-1,56.62-.11,62.94,3.15ZM91.48,62.61a35.83,35.83,0,0,1-7.11-2.42c-7-3.16-15.11-8.81-22.59-16.28A75.25,75.25,0,0,1,45.94,21.43a34.92,34.92,0,0,1-2.39-7.68L17.44,39.85a25.47,25.47,0,0,0,4.1,4.58c7.26,6.43,18.87,9.69,31.64,4.22a3,3,0,0,1,2.35,5.52c-15.21,6.51-29.17,2.52-38-5.25a32,32,0,0,1-4.42-4.78L9.44,47.85A12.66,12.66,0,0,0,6.9,51a9.73,9.73,0,0,0-.64,4.14,17.9,17.9,0,0,0,.33,3.3,25.29,25.29,0,0,0,1,3.74c2.61,7.43,8,15.27,14.71,21.89S36.71,96,44.11,98.45a21.48,21.48,0,0,0,4.8,1.06h0a13.6,13.6,0,0,0,4.2-.24,7,7,0,0,0,4.29-2.56c.06-.07.64-.64.63-.65L91.48,62.61Z'/%3E%3C/svg%3E"), auto`;
						break;
					case "eraser":
						setSelectedColor("#FFFFFF");
						break;
				}
			});
		});
	};
	return (
		<div className="container">
			<div className="toolbar">
				<BrushPreview currentWidth={selectSize} currentColor={selectedColor} />
				<div className="tool-section" id="brush-size">
					<small>
						<strong>Brush Size</strong>
					</small>

					<input
						style={{ width: "98%" }}
						value={selectSize}
						type="range"
						min={1}
						max={100}
						onChange={(e) => {
							setSelectSize(e.target.value);
						}}
					/>
				</div>

				<div className="tool-section" id="brush-color">
					<small>
						<strong>Brush Color</strong>
					</small>
					<input
						type="color"
						className="color-picker"
						defaultValue="#000000"
						value={selectedColor.hex}
						onChange={(e) => setSelectedColor(e.target.value)}
					/>
				</div>

				<div className="tool-section" id="tools">
					<small>
						<strong>Tools</strong>
					</small>

					<div className="tool-grid">
						<label className="btn btn--tool active" id="brush">
							<GiPaintBrush />
						</label>
						<label className="btn btn--tool" id="pencil">
							<GiPencil />
						</label>
						<label className="btn btn--tool" id="fill">
							<GiPaintBucket />
						</label>
						<label className="btn btn--tool" id="eraser">
							<BsEraserFill />
						</label>
						<label className="btn btn--tool" id="text">
							<BsTextareaT />
						</label>
					</div>
				</div>

				<div className="tool-section" id="shapes">
					<small>
						<strong>Shapes</strong>
					</small>

					<div className="tool-grid tool-section--lrg">
						<label className="btn btn--tool" id="line">
							<svg height="16" width="16">
								<line
									x1="1"
									y1="2"
									x2="15"
									y2="13"
									style={{
										fill: "transparent",
										stroke: "#000000",
										strokeWidth: 1.5,
										strokeLinejoin: "round",
									}}
								/>
							</svg>
						</label>

						<label className="btn btn--tool" id="triangle">
							<FiTriangle />
						</label>
						<label className="btn btn--tool" id="rectangle">
							<FiSquare />
						</label>
						<label className="btn btn--tool" id="circle">
							<FiCircle />
						</label>
					</div>
				</div>

				<div className="btn--bottom">
					<a
						className="btn btn--main btn--block"
						download="image.png"
						onClick={handleDownload}
						href={dataUrl}
					>
						Save Image
					</a>
					<button className="btn btn--block" onClick={handleClear}>
						Clear
					</button>
				</div>
			</div>
			<Board color={selectedColor} size={selectSize} cursor={cursor}></Board>
		</div>
	);
};

export default ToolBar;
