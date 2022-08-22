const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const hello = document.querySelector(".left__side button:first-child");
const hidBtn = document.querySelector(".hid__btn");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

function handleClickOne() {
  hidBtn.classList.remove("hidden");
  hidBtn.classList.toggle("moving");
  if (hidBtn.classList.contains("reverseMoving")) {
    hidBtn.classList.remove("reverseMoving");
  }
}

function handleClickTwo() {
  hidBtn.classList.toggle("reverseMoving");
  hidBtn.classList.remove("moving");
}

hello.addEventListener("click", handleClickOne);
hidBtn.addEventListener("click", handleClickTwo);
