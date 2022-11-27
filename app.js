const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.querySelector('#line-width');
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
);
const modeBtn = document.querySelector('#mode-btn');
const eraseBtn = document.querySelector('#erase-btn');
const resetBtn = document.querySelector('#reset-btn');
const saveBtn = document.querySelector('#save');
const fileInput = document.querySelector('#file');
const textInput = document.querySelector('#text');

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;

function onDraw(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function canclePainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
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
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = '배경 채우기';
  } else {
    isFilling = true;
    modeBtn.innerText = '그리기';
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onEraseClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = '배경 채우기';
}
function onResetClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== '') {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = '48px serif';
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'drawing.png';
  a.click();
}

canvas.addEventListener('mousemove', onDraw);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', canclePainting);
canvas.addEventListener('mouseleave', canclePainting);
canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('dblclick', onDoubleClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach(color => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeClick);
eraseBtn.addEventListener('click', onEraseClick);
resetBtn.addEventListener('click', onResetClick);
saveBtn.addEventListener('click', onSaveClick);
fileInput.addEventListener('change', onFileChange);
