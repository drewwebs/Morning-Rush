

class Customer {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth/5;
        this.height = this.spriteHeight/5;
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height/2 - this.height/2;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }

    update() {
        console.log("update");
    }

    draw() {
        
        ctx3.fillStyle = 'red';
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    
}

const customer = new Customer();