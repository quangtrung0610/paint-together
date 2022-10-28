import React, { useEffect, useState } from "react";
import Board from "./board";
import { BrushPreview } from "./BrushPreview";
import { GiPencil, GiPaintBucket, GiPaintBrush } from "react-icons/gi";
import { BsEraser, BsTextareaT } from "react-icons/bs";

const ToolBar = () => {
	const [selectColor, setSelectColor] = useState("#000000");
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
				if (activeElement.length > 0) {
					//activeElement[0].classList.remove("active")
					activeElement[0].className = activeElement[0].className.replace(
						" active",
						""
					);
				}
				btn.classList.add("active");
				switch (btn.id) {
					case "brush":
						setSelectSize(10);
						break;
					case "pencil":
						setSelectSize(1);
						document.querySelector(
							"#board"
						).style.cursor = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='25px' height='25px' viewBox='0 0 25 25' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 0 0.390625 C 0 0.46875 0.546875 1.640625 1.171875 2.8125 C 1.796875 4.0625 2.578125 6.40625 2.8125 8.046875 C 3.28125 10.625 4.375 11.953125 11.09375 17.65625 C 15.3125 21.25 19.453125 24.21875 20.3125 24.21875 C 22.5 24.21875 24.21875 22.109375 24.21875 19.375 C 24.21875 17.421875 22.96875 15.78125 17.8125 10.46875 C 14.296875 6.875 11.015625 3.90625 10.546875 3.90625 C 10.078125 3.90625 7.5 3.046875 4.84375 2.03125 C 2.1875 0.9375 0 0.234375 0 0.390625 Z M 16.5625 10.703125 C 22.421875 16.5625 24.21875 19.609375 22.65625 21.484375 C 20.859375 23.671875 18.984375 22.734375 11.40625 15.9375 C 5.703125 10.859375 3.90625 8.75 3.90625 7.34375 C 3.90625 6.25 3.59375 4.765625 3.203125 3.984375 C 2.5 2.734375 2.734375 2.734375 6.875 4.0625 C 10.3125 5.234375 12.5 6.71875 16.5625 10.703125 Z M 16.5625 10.703125 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 14.921875 12.1875 C 18.125 15.625 20.859375 18.359375 21.09375 18.203125 C 21.25 18.046875 18.671875 15.234375 15.234375 11.875 L 9.0625 5.859375 Z M 14.921875 12.1875 '/%3E%3C/g%3E%3C/svg%3E%0A") ${widthHalf} ${widthHalf}, auto`;
						break;
				}
			});
		});
	};
	return (
		<div className="container">
			<div className="toolbar">
				<BrushPreview currentWidth={selectSize} currentColor={selectColor} />
				<div className="tool-section tool-section--lrg ">
					<div className="tool-section">
						<small>
							<strong>Brush Size</strong>
						</small>
						<div className="tool-section">
							<input
								id="size"
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
					</div>

					<div className="tool-section">
						<small>
							<strong>Brush Color</strong>
						</small>
						<div className="tool-section">
							<input
								type="color"
								className="color-picker"
								value={selectColor.hex}
								onChange={(e) => setSelectColor(e.target.value)}
							/>
						</div>
					</div>

					<div className="tool-section">
						<small>
							<strong>Tools</strong>
						</small>
						<div className="tool-grid tool-section tool-section--lrg">
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
								<BsEraser />
							</label>
							<label className="btn btn--tool" id="text">
								<BsTextareaT />
							</label>
						</div>
					</div>

					<div className="tool-section">
						<small>
							<strong>Shapes</strong>
						</small>

						<div className="tool-grid tool-section tool-section--lrg">
							<label className="btn btn--tool" id="line">
								<svg height="16" width="28">
									<line
										x1="2"
										y1="2"
										x2="25"
										y2="14"
										style={{
											fill: "transparent",
											stroke: "black",
											strokeWidth: 1.5,
											strokeLinejoin: "round",
										}}
									/>
								</svg>
							</label>

							<label className="btn btn--tool" id="triangle">
								<svg height="16" width="28">
									<polygon
										points="14 2, 5 15, 22 15"
										style={{
											fill: "transparent",
											stroke: "black",
											strokeWidth: 1.5,
											strokeLinejoin: "round",
										}}
									/>
								</svg>
							</label>
							<label className="btn btn--tool" id="rectangle">
								<svg height="16" width="28">
									<rect
										x="7"
										y="1"
										width="15"
										height="14"
										style={{
											fill: "transparent",
											stroke: "black",
											strokeWidth: 1.5,
											strokeLinejoin: "round",
										}}
									/>
								</svg>
							</label>
							<label className="btn btn--tool" id="circle">
								<svg height="16" width="28">
									<circle
										cx="14"
										cy="8"
										r="7"
										style={{
											fill: "transparent",
											stroke: "black",
											strokeWidth: 1.5,
										}}
									/>
								</svg>
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
			</div>
			<Board color={selectColor} size={selectSize} cursor={cursor}></Board>
		</div>
	);
};

export default ToolBar;
