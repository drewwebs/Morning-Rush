

function animate() {
    ctx3.clearRect(0,0, canvas.width, canvas.height);
    customer.draw();
    customer.update();
    requestAnimationFrame(animate);
}

animate();