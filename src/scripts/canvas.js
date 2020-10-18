const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
const background = new Image();
background.src = '/src/images/background.jpeg';
background.onload = function() {
    ctx1.drawImage(background,0,0);
};






// const canvas4 = document.getElementById('canvas4');
// const ctx4 = canvas.getContext('2d');
// canvas4.width = 800;
// canvas4.height = 500;






export { ctx1 };
