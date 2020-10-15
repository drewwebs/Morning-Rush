

class Cashier {
    constructor() {
        this.spriteHeight = 48;
        this.spriteWidth = 32;
        this.x = 125;
        this.y = 290;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 3;
        this.cashierSprite = new Image();
        this.cashierSprite.src = 'src/images/L.png';
        this.speed = 10;
    }

    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx5.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }


    update() {
        console.log("update");
    }

    draw() {
        this.drawSprite(
            this.cashierSprite,
            this.spriteWidth * this.frameX, this.spriteHeight * this.frameY,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.spriteWidth, this.spriteHeight
        );
    }

    move() {
        // console.log('move');
    }

}

const cashier = new Cashier();