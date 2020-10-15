

class Player {
    constructor() {
        this.spriteHeight = 64;
        this.spriteWidth = 48;
        this.x = 500;
        this.y = 275;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
        this.playerSprite = new Image();
        this.playerSprite.src = 'src/images/ryuk.png';
        this.speed = 10;
    }

    update() {
        if (keys[38]) { //up
            if (this.y > 275) {
                this.y -= this.speed;
            } 
            this.moving = true;
            this.frameY = 3;
        }

        if (keys[40]) { //down
            if (this.y < 425) {
                this.y += this.speed;
            }
            this.frameY = 0;
            this.moving = true;
        }

        if (keys[37]) { //left
            if (this.x > this.spriteWidth) {
                this.x -= this.speed;
            }
            this.frameY = 1;
            this.moving = true;
        }

        if (keys[39]) { //right
            if (this.x < canvas5.width - this.spriteWidth * 2) {
                this.x += this.speed;
            }
            this.frameY = 2;
            this.moving = true;
        }
    }

    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx5.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    handlePlayerFrame() {
        if (this.frameX < 3 && this.moving) this.frameX ++;
        else this.frameX = 0;
    }

    draw() {
        this.drawSprite(
            this.playerSprite, 
            this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, 
            this.spriteWidth, this.spriteHeight, 
            this.x, this.y, 
            this.spriteWidth, this.spriteHeight
        );

        this.handlePlayerFrame();
    }

    move() {
        // console.log('move');
    }
    
}

const player = new Player();