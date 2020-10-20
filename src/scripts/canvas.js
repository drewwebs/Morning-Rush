window.addEventListener("load", () => {
    const canvas = document.getElementById('canvas1');
    const ctx1 = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;
    const background = new Image();
    background.src = './src/images/background.png';
    background.onload = function() {
        ctx1.drawImage(background,0,0);
    };

    // const canvas8 = document.getElementById('canvas8');
    // const ctx8 = canvas8.getContext('2d');
    // canvas.width = 300;
    // canvas.height = 450;
});

