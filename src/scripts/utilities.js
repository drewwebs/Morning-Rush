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
        ctx6.clearRect(0, 0, canvas6.width, canvas6.height);
        player.draw();
        player.update();
        cashier.draw();
        cashier.update();
        game.handleCustomers();
        game.handleScoreboard();
    }
}

document.addEventListener('keydown', function(e) {
    keys[e.code] = true;
    e.handled = true;
});


document.addEventListener('keyup', function(e) {
    
    if (e.code === "Space") {
        player.handleInventory();
    }
    // debugger
    delete keys[e.code];
    // debugger;
    player.moving = false;
    e.handled = true;
});


function resetGame() {
    player.x = 300;
    player.y = 350;
    game.score = 0;
    game.speed = 1;
}


startAnimating(30);