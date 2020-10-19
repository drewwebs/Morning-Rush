const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
const background = new Image();
background.src = '/src/images/background.jpeg';
background.onload = function() {
    ctx1.drawImage(background,0,0);
};


export { ctx1 };


