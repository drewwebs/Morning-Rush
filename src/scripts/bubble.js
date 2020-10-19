const canvas7 = document.getElementById('canvas7');
const ctx7 = canvas7.getContext('2d');
canvas7.width = 800;
canvas7.height = 500;

export default class Bubble {
    constructor(x, y, width, height, orderType) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.orderType = orderType;
    }

    static clear() {
        ctx7.clearRect(0, 0, canvas7.width, canvas7.height);
    }
    
    draw() {
        const r = this.x + this.width;
        const b = this.y + this.height;
        const radius = 10;
        ctx7.beginPath();
        ctx7.fillStyle = "white";
        ctx7.fill();
        ctx7.strokeStyle = "black";
        ctx7.lineWidth = "1";
        ctx7.moveTo(this.x + radius, this.y);
        
        ctx7.lineTo(r - radius, this.y);
        ctx7.quadraticCurveTo(r, this.y, r, this.y + radius);
        ctx7.lineTo(r, this.y + this.height - radius);
        ctx7.quadraticCurveTo(r, b, r - radius, b);
        ctx7.lineTo(this.x + radius, b);
        ctx7.quadraticCurveTo(this.x, b, this.x, b - radius);
        ctx7.lineTo(this.x, this.y + radius);
        ctx7.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
        ctx7.fill();
        ctx7.stroke();
        ctx7.fillStyle = "#000";
        ctx7.fillText(this.orderType, this.x + 20, this.y + 30);
    }
}

