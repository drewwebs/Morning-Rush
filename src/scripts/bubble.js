class Bubble {
    constructor(x, y, width, height, orderType) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.orderType = orderType;
    }

    
    draw() {
        const r = this.x + this.width;
        const b = this.y + this.height;
        const radius = 10;
        ctx3.beginPath();
        ctx3.fillStyle = "white";
        ctx3.fill();
        ctx3.strokeStyle = "black";
        ctx3.lineWidth = "1";
        ctx3.moveTo(this.x + radius, this.y);
        
        ctx3.lineTo(r - radius, this.y);
        ctx3.quadraticCurveTo(r, this.y, r, this.y + radius);
        ctx3.lineTo(r, this.y + this.height - radius);
        ctx3.quadraticCurveTo(r, b, r - radius, b);
        ctx3.lineTo(this.x + radius, b);
        ctx3.quadraticCurveTo(this.x, b, this.x, b - radius);
        ctx3.lineTo(this.x, this.y + radius);
        ctx3.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
        ctx3.fill();
        ctx3.stroke();
        ctx3.fillStyle = "#000";
        ctx3.fillText(this.orderType, this.x + 20, this.y + 30);
    }
}