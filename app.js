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

const eraseBtn = document.querySelector(".fourth__btn");
const hidErase = document.querySelector(".hid__erase");
const hidBtnErase = document.querySelector(".hid__erase button:first-child");
const hidBtnDestroy = document.querySelector(".hid__erase button:last-child");

const textInput = document.querySelector("#text");
const textSize = document.querySelector("#fontSizes");
const textFont = document.querySelector("#fontTypes");
const textBold = document.querySelector("#fontWeights");

const fileInput = document.querySelector("#file");

const saveBtn = document.querySelector("#save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 550;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;
let isErase = false;

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

function handleEraseClickOne() {
  hidErase.classList.remove("hidden");
  hidErase.classList.toggle("moving");
  if (hidErase.classList.contains("reverseMoving")) {
    hidErase.classList.remove("reverseMoving");
  }
}

function handleEraseClickTwo() {
  hidErase.classList.toggle("reverseMoving");
  hidErase.classList.remove("moving");
}

function onModeEraseClick(event) {
  const clue = event.target.innerText;
  if (clue == "Erase") {
    isErase = true;
    eraseBtn.innerText = "Erase";
  } else if (clue == "Destroy") {
    isErase = false;
    eraseBtn.innerText = "Destroy";
  }
}

function onEraseClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  fillBtn.innerText = "Brush";
}

function onDestroyClick() {
  if (confirm("Are you sure to Destroy?")) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    alert("Think One More Time.");
  }
}

function onDoubleClick(event) {
  const text = textInput.value;
  const mySize = textSize.value;
  const myFont = textFont.value;
  const myBold = textBold.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${myBold} ${mySize}px ${myFont}`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myPicture.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

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

eraseBtn.addEventListener("click", handleEraseClickOne);
hidErase.addEventListener("click", handleEraseClickTwo);
hidBtnErase.addEventListener("click", onEraseClick);
hidBtnDestroy.addEventListener("click", onDestroyClick);

fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);
