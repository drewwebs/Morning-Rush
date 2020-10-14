function animate() {
    ctx3.clearRect(0,0, canvas5.width, canvas5.height);
    player.draw();
    player.update();
    handleCustomers();
    requestAnimationFrame(animate);
}

animate();

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