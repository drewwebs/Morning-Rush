const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 800;
canvas2.height = 500;

export default class Bubble {
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
        ctx2.beginPath();
        ctx2.fillStyle = "white";
        ctx2.fill();
        ctx2.strokeStyle = "black";
        ctx2.lineWidth = "1";
        ctx2.moveTo(this.x + radius, this.y);
        
        ctx2.lineTo(r - radius, this.y);
        ctx2.quadraticCurveTo(r, this.y, r, this.y + radius);
        ctx2.lineTo(r, this.y + this.height - radius);
        ctx2.quadraticCurveTo(r, b, r - radius, b);
        ctx2.lineTo(this.x + radius, b);
        ctx2.quadraticCurveTo(this.x, b, this.x, b - radius);
        ctx2.lineTo(this.x, this.y + radius);
        ctx2.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
        ctx2.fill();
        ctx2.stroke();
        ctx2.fillStyle = "#000";
        ctx2.fillText(this.orderType, this.x + 20, this.y + 30);
    }
}

