import { player } from './player.js';
import { game } from './game.js';

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
        cashier.update();
        game.handleCustomers();
        game.handleScoreboard();
    }
}




function resetGame() {
    player.x = 300;
    player.y = 350;
    game.score = 0;
    game.speed = 1;
}


startAnimating(30);