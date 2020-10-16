

class Customer {
    constructor(id, speed, x, y, patience, orderType, spriteImage) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = spriteImage.width / 4;
        this.height = spriteImage.height / 4;
        this.moving = true;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = speed;
        this.customerSprite = new Image();
        this.customerSprite.src = `src/images/${spriteImage.name}.png`;
        this.ordered = false;
        this.waiting = false;
        this.fulfilled = false;
        this.timeWaited = 0;
        this.patience = patience;
        this.orderType = orderType;
        this.showBubble = false;
        this.bubble = false;
    }

    wait() {
        this.waiting = true;
        this.moving = false;
        this.frameY = 0;
        this.timeWaited += 1 * game.speed;
        this.patience -= 1 * game.speed;
    }
    
    order() {        
        this.bubble = this.bubble || 
                    new Bubble(
                        this.x + this.width, 
                        this.y - this.height / 2,
                        ctx3.measureText(this.orderType).width + 40,
                        50,
                        this.orderType
                    );
        cashier.frameY = 3;
        this.wait();
        this.showBubble = true;

        if (this.timeWaited >= 100) {
            this.timeWaited = 0;
            this.waiting = false;
            this.ordered = true;
            game.numOrders += 1;
            this.frameY = 2;
            this.moving = true;
            cashier.frameY = 2;
        }
    }
    
    receiveOrder() {
        this.wait();
        this.patience -= 1 * game.speed;

        
        if (this.patience <= 0) {
            game.lives -= 1;
            if (game.lives === 0) game.gameOver();
            this.timeWaited = 0;
            this.waiting = false;
            this.fulfilled = true;
            game.speed += 0.1;
            this.frameY = 3;
            this.moving = true;
            this.showBubble = false;
            game.numOrders -= 1;
        }
    }
    
    handleCustomerFrame() {
        if (this.frameX < 3 && this.moving) this.frameX++;
        else this.frameX = 0;
    }
    
    draw() {
        ctx3.drawImage(
            this.customerSprite,
            this.width * this.frameX, this.height * this.frameY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
            );
            
            this.handleCustomerFrame();
            
            if (this.showBubble) this.bubble.draw();
        }
        
        update() {
            // handle customer collision
            customers.forEach( customer => {
                if (customer.id < this.id) {
                    if (game.collision(this, customer) && this.patience > 0) {
                        this.wait();
                    } else {
                        this.waiting = false;
                        this.moving = true;
                        
                    }
                }
            });
            
            // handle walking down to register
            if (!this.ordered) {
                if (!this.waiting && this.x > 126 && this.y > 0) {
                    this.x -= 0.3;
                } else if (!this.waiting && this.x < 124 && this.y > 0) {
                    this.x += 0.3;
                }
                // place order at register
                if (this.y >= 195) {
                    this.order();
                }
            }
            
            // wait for order at end of bar
            if (this.x >= 600 && !this.fulfilled) {
                this.receiveOrder();
            }
            
            // Move bubble over
            if (this.waiting) {
                let collision = false;
                customers.forEach(customer => {
                    if (customer.id < this.id && this.showBubble && customer.showBubble && game.collision(this.bubble, customer.bubble)) {
                        collision = true;
                    }
                });
            
                if (collision === false &&
                    this.bubble.x + this.bubble.width / 2 < this.x + this.width / 2) {
                        this.bubble.x += 1;
                }
                return;
            }
            
            // walk to end of bar after ordering
            if (this.ordered && !this.fulfilled) {
                this.x += this.speed;
                
            customers.forEach(customer => {
                if (customer.id < this.id) {
                    if (this.showBubble && customer.showBubble && game.collision(this.bubble, customer.bubble)) {
                        this.bubble.y += 1;
                        this.bubble.x -= 1;
                    }
                }
            });
            if (this.bubble.y >= 40) {
                this.bubble.y -= 1;
            }
            if (this.bubble.x + this.bubble.width / 2 > this.x + this.width / 2) {
                this.bubble.x -= 0.3333;
            }
            this.bubble.x += 1;
        } else if (this.fulfilled) {
            this.y -= this.speed;
        } else {
            this.y += this.speed;
        }

    }
}
