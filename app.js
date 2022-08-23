const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const fillBtn = document.querySelector(".first__btn");
const hidBtn = document.querySelector(".hid__btn");
const hidBtnBrush = document.querySelector(".hid__btn button:first-child");
const hidBtnFill = document.querySelector(".hid__btn button:last-child");

const colorBtn = document.querySelector(".second__btn");
const hidColor = document.querySelector(".hid__colors");
const color = document.querySelector("#color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

const rangeBtn = document.querySelector(".third__btn");
const hidRange = document.querySelector(".hid__range");
const lineWidth = document.querySelector("#line-width");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 550;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function handleFillClickOne() {
  hidBtn.classList.remove("hidden");
  hidBtn.classList.toggle("moving");
  if (hidBtn.classList.contains("reverseMoving")) {
    hidBtn.classList.remove("reverseMoving");
  }
}

function handleFillClickTwo() {
  hidBtn.classList.toggle("reverseMoving");
  hidBtn.classList.remove("moving");
}

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onModeClick(event) {
  const clue = event.target.innerText;
  if (clue == "Fill") {
    isFilling = true;
    fillBtn.innerText = "Fill";
  } else if (clue == "Brush") {
    isFilling = false;
    fillBtn.innerText = "Brush";
  }
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function handleColorClickOne() {
  hidColor.classList.remove("hidden");
  hidColor.classList.toggle("moving");
  if (hidColor.classList.contains("reverseMoving")) {
    hidColor.classList.remove("reverseMoving");
  }
}

function handleColorClickTwo() {
  hidColor.classList.toggle("reverseMoving");
  hidColor.classList.remove("moving");
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function handleRangeClickOne() {
  hidRange.classList.remove("hidden");
  hidRange.classList.toggle("moving");
  if (hidRange.classList.contains("reverseMoving")) {
    hidRange.classList.remove("reverseMoving");
  }
}

function handleRangeClickTwo() {
  hidRange.classList.toggle("reverseMoving");
  hidRange.classList.remove("moving");
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function hello() {
  alert("hello");
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

fillBtn.addEventListener("click", handleFillClickOne);
hidBtn.addEventListener("click", handleFillClickTwo);
hidBtnFill.addEventListener("click", onModeClick);
hidBtnBrush.addEventListener("click", onModeClick);

colorBtn.addEventListener("click", handleColorClickOne);
hidColor.addEventListener("click", handleColorClickTwo);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

rangeBtn.addEventListener("click", handleRangeClickOne);
hidRange.addEventListener("click", handleRangeClickTwo);
lineWidth.addEventListener("change", onLineWidthChange);
