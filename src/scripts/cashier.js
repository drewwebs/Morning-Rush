class Cashier {
    constructor() {
        this.height = 48;
        this.width = 32;
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
      
    }

    draw() {
        this.drawSprite(
            this.cashierSprite,
            this.width * this.frameX, this.height * this.frameY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
    }

    move() {
        // console.log('move');
    }

}

const cashier = new Cashier();