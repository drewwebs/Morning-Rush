

class Customer {
    constructor(speed, x, y, patience, orderType, spriteImage) {
        this.x = x;
        this.y = y;
        this.spriteWidth = spriteImage.width / 4;
        this.spriteHeight = spriteImage.height / 4;
        this.moving = true;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = speed;
        this.customerSprite = new Image();
        this.customerSprite.src = `src/images/${spriteImage.name}.png`;
        this.ordered = false;
        this.waiting = false;
        this.fulfilled = false;
        this.wait = 0;
        this.patience = patience;
        this.orderType = orderType;
        this.textBubble = false;
    }

    drawBubble(x, y, w, h) {
        if (this.textBubble) {
            const r = x + w;
            const b = y + h;
            const radius = 10;
            ctx3.beginPath();
            ctx3.fillStyle = "white";
            ctx3.fill();
            ctx3.strokeStyle = "black";
            ctx3.lineWidth = "1";
            ctx3.moveTo(x + radius, y);

            ctx3.lineTo(r - radius, y);
            ctx3.quadraticCurveTo(r, y, r, y + radius);
            ctx3.lineTo(r, y + h - radius);
            ctx3.quadraticCurveTo(r, b, r - radius, b);
            ctx3.lineTo(x + radius, b);
            ctx3.quadraticCurveTo(x, b, x, b - radius);
            ctx3.lineTo(x, y + radius);
            ctx3.quadraticCurveTo(x, y, x + radius, y);
            ctx3.fill();
            ctx3.stroke();
            ctx3.fillStyle = "#000";
            ctx3.fillText(this.orderType, x + 20, y + 30);
        }
    }

    order() {
        cashier.frameY = 3;
        this.waiting = true;
        this.moving = false;
        this.frameY = 0;
        this.wait += 1 * game.speed;
        this.textBubble = true;

        if (this.wait >= 100) {
            this.wait = 0;
            this.waiting = false;
            this.ordered = true;
            this.frameY = 2;
            this.moving = true;
            cashier.frameY = 2;
            this.textBubble = false;
        }
    }

    receiveOrder() {
        this.waiting = true;
        this.moving = false;
        this.frameY = 0;
        this.patience -= 1 * game.speed;
        
        if (this.patience <= 0) {
            game.lives -= 1;
            if (game.lives === 0) game.gameOver();
            this.wait = 0;
            this.waiting = false;
            this.fulfilled = true;
            game.speed += 0.1;
            this.frameY = 3;
            this.moving = true;
        }
    }

    handleCustomerFrame() {
        if (this.frameX < 3 && this.moving) this.frameX++;
        else this.frameX = 0;
    }

    draw() {
        ctx3.drawImage(
            this.customerSprite,
            this.spriteWidth * this.frameX, this.spriteHeight * this.frameY,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.spriteWidth, this.spriteHeight
        );
        this.handleCustomerFrame();
        this.drawBubble(this.x + this.spriteWidth, this.y - this.spriteHeight / 2, ctx3.measureText(this.orderType).width + 40, 50);
    }

    update() {
        if (!this.ordered) {
            if (!this.waiting && this.x > 126 && this.y > 0) {
                this.x -= 0.3;
            } else if (!this.waiting && this.x < 124 && this.y > 0) {
                this.x += 0.3;
            }

            if (this.y >= 195) {
                this.order();
            }
        }


        if (this.x >= 600 && !this.fulfilled) {
            this.receiveOrder();
        }

        if (this.waiting) return;

        if (this.ordered && !this.fulfilled) {
            this.x += this.speed;
        } else if (this.fulfilled) {
            this.y -= this.speed;
        } else {
            this.y += this.speed;
        }
    }
}
