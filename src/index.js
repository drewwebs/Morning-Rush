import "./styles/index.scss";

import canvasExample from "./scripts/canvas";

const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas.getContext('2d');
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas.getContext('2d');
ctx1.fillStyle = 'green';
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas.getContext('2d');
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas.getContext('2d');
canvas5.width = 600;
canvas5.height = 600;
