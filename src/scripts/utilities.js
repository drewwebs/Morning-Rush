import { player } from './player.js';
import { game } from './game.js';
import { cashier } from './cashier.js';

var fpsInterval, startTime, now, then, elapsed;

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
        player.draw();
        player.update();
        cashier.draw();
        game.handleGuests();
        game.handleScoreboard();
    }
}

document.addEventListener('keydown', function (e) {
    if (!e.handled) {
        player.keys[e.code] = true;
        if (e.code === "Space") player.handleInventory();
        if (player.keys.Digit1) player.serveGuest(0);
        if (player.keys.Digit2) player.serveGuest(1);
        if (player.keys.Digit3) player.serveGuest(2);
        e.handled = true;
    }
});


document.addEventListener('keyup', function (e) {
    delete player.keys[e.code];
    player.moving = false;

    e.handled = true;
});

function resetGame() {
    player.x = 300;
    player.y = 350;
    game.score = 0;
    game.speed = 1;
}

game.initGuests();
startAnimating(30);