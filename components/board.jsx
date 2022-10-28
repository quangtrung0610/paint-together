import React, { useEffect, useState } from "react";

const Board = ({ color, size, cursor }) => {
	useEffect(() => {
		drawOnCanvas();
	}, [color, size, cursor]);

	// const widthHalf = size ? size / 2 : 0;
	// let cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.4" height="${size}" viewBox="0 0 ${size} ${size}" width="${size}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;
	// if (selectedTool === "pencil") {
	// 	cursor = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='25px' height='25px' viewBox='0 0 25 25' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 0 0.390625 C 0 0.46875 0.546875 1.640625 1.171875 2.8125 C 1.796875 4.0625 2.578125 6.40625 2.8125 8.046875 C 3.28125 10.625 4.375 11.953125 11.09375 17.65625 C 15.3125 21.25 19.453125 24.21875 20.3125 24.21875 C 22.5 24.21875 24.21875 22.109375 24.21875 19.375 C 24.21875 17.421875 22.96875 15.78125 17.8125 10.46875 C 14.296875 6.875 11.015625 3.90625 10.546875 3.90625 C 10.078125 3.90625 7.5 3.046875 4.84375 2.03125 C 2.1875 0.9375 0 0.234375 0 0.390625 Z M 16.5625 10.703125 C 22.421875 16.5625 24.21875 19.609375 22.65625 21.484375 C 20.859375 23.671875 18.984375 22.734375 11.40625 15.9375 C 5.703125 10.859375 3.90625 8.75 3.90625 7.34375 C 3.90625 6.25 3.59375 4.765625 3.203125 3.984375 C 2.5 2.734375 2.734375 2.734375 6.875 4.0625 C 10.3125 5.234375 12.5 6.71875 16.5625 10.703125 Z M 16.5625 10.703125 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 14.921875 12.1875 C 18.125 15.625 20.859375 18.359375 21.09375 18.203125 C 21.25 18.046875 18.671875 15.234375 15.234375 11.875 L 9.0625 5.859375 Z M 14.921875 12.1875 '/%3E%3C/g%3E%3C/svg%3E%0A") ${widthHalf} ${widthHalf}, auto`;
	// }
	const selectedTool = "brush";

	const drawOnCanvas = () => {
		const mousemove = document.querySelector(".position");
		const canvas = document.querySelector("#board");
		const ctx = canvas.getContext("2d");

		let x = 0;
		let y = 0;
		let isDrawing = false;

		selectedTool = document.querySelector(".active").id;

		window.addEventListener("load", () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		});

		const handleMouseDown = () => {
			ctx.strokeStyle = color;
			ctx.lineWidth = size;
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			isDrawing = true;
			ctx.beginPath();
		};
		const handleMouseMove = (e) => {
			let bound = canvas.getBoundingClientRect();
			x = e.clientX - bound.left - canvas.clientLeft;
			y = e.clientY - bound.top - canvas.clientTop;
			mousemove.innerHTML = `${Math.round(x)}/${Math.round(y)} px`;

			if (!isDrawing) return;

			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
		};
		// const handleMouseUp = () => {};
		// const handleMouseOut = () => {};

		canvas.addEventListener(
			"mousedown",
			() => {
				handleMouseDown();
			},
			false
		);
		canvas.addEventListener(
			"mousemove",
			function (e) {
				handleMouseMove(e);
			},
			false
		);

		canvas.addEventListener(
			"mouseup",
			() => {
				isDrawing = false;
			},
			false
		);

		canvas.addEventListener(
			"mouseout",
			() => {
				mousemove.innerHTML = ``;
				isDrawing = false;
			},
			false
		);
	};
	return (
		<div className="draw-board">
			<canvas className="board" id="board" style={{ cursor: cursor }} />
			<p className="position" />
		</div>
	);
};

export default Board;
