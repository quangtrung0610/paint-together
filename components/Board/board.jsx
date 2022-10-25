import React, { useEffect, useState } from "react";

const Board = ({ color, size }) => {
    useEffect(() => {
        drawOnCanvas();
    }, [color, size]);

    const drawOnCanvas = () => {
        let mousemove = document.querySelector(".position");
        let canvas = document.querySelector("#board");
        let ctx = canvas.getContext("2d");
        let x = 0,
            y = 0;

        let isDrawing = false;
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
            });
        });
        window.addEventListener("load", () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });
        //Drawing on Paint App

        ctx.strokeStyle = color;

        const handleMouseDown = () => {
            ctx.lineWidth = size;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            isDrawing = true;
            ctx.beginPath();
        };
        const handleMouseMove = (e) => {
            // mouseX = parseInt(e.clientX - offsetX);
            // mouseY = parseInt(e.clientY - offsetY);
            let bound = canvas.getBoundingClientRect();
            // console.log(bound);
            x = e.clientX - bound.left - canvas.clientLeft;
            y = e.clientY - bound.top - canvas.clientTop;
            mousemove.innerHTML = `${x}/${y} px`;
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
            <canvas className="board" id="board" />
            <p className="position" />
        </div>
    );
};

export default Board;
