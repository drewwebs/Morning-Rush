const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
const background = new Image();
background.src = '/src/images/background.jpeg';
background.onload = function() {
    ctx1.drawImage(background,0,0);
};


const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas.getContext('2d');
canvas2.width = 800;
canvas2.height = 500;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.width = 800;
canvas3.height = 500;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas.getContext('2d');
canvas4.width = 800;
canvas4.height = 500;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = 800;
canvas5.height = 500;

let customers = [];
let keys = [];
let score = 0;
let frame = 0;
let gameSpeed = 1;

