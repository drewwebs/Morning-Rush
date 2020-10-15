function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    now = Date.now();
    elapsed = now - then;
    
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx5.clearRect(0, 0, canvas5.width, canvas5.height);
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        player.draw();
        player.update();
        cashier.draw();
        cashier.update();
        game.handleCustomers();
        game.handleScoreboard();
    }
}

window.addEventListener('keydown', function(e) {
    keys = [];
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[40]){
        player.move();
    }
});


window.addEventListener('keyup', function(e) {
    delete keys[e.keyCode];
    player.moving = false;
});


function resetGame() {
    player.x = 300;
    player.y = 350;
    game.score = 0;
    game.speed = 1;
}


startAnimating(30);