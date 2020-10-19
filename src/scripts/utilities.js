import { player } from './player.js';
import { game } from './game.js';

function startAnimating(fps) {
    const fpsInterval = 1000 / fps;
    const then = Date.now();
    // const startTime = then;
    animate(fpsInterval, then);
}

function animate(fpsInterval, then) {
    requestAnimationFrame(animate);
    
    const now = Date.now();
    const elapsed = now - then;
    
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