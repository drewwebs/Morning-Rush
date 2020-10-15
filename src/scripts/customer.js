const sprites = [];

sprites.push({name: 'deadpool', width: 128, height: 192});
sprites.push({ name: 'newton', width: 128, height: 192});
sprites.push({ name: 'death_scythe', width: 200, height: 192});
sprites.push({ name: 'crowley_wings', width: 192, height: 192});
sprites.push({ name: 'jawa', width: 128, height: 192});
sprites.push({ name: 'barret', width: 160, height: 224});
// sprites.push({ name: , width: , height: });
// sprites.push({ name: , width: , height: });
// sprites.push({ name: , width: , height: });
// sprites.push({ name: , width: , height: });

class Customer {
    constructor(speed, x, y, spriteImage) {
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
    }

    order() {
        cashier.frameY = 3;
        this.waiting = true;
        this.moving = false;
        this.frameY = 0;
        this.wait += 1 * gameSpeed;
        if (this.wait >= 100) {
            this.wait = 0;
            this.waiting = false;
            this.ordered = true;
            this.frameY = 2;
            this.moving = true;
            cashier.frameY = 2;
        }
    }

    receiveOrder() {
        this.waiting = true;
        this.moving = false;
        this.frameY = 0;
        this.wait += 1 * gameSpeed;
        if (this.wait >= 500) {
            this.wait = 0;
            this.waiting = false;
            this.fulfilled = true;
            gameSpeed += 0.1;
            this.frameY = 2;
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


        if (this.x >= 650 && !this.fulfilled) {
            this.receiveOrder();
        }

        if (this.waiting) return;

        !this.ordered ? this.y += this.speed : this.x += this.speed;
    }
}

function initCustomers() {
    for (let i = 0; i < 100; i++) {
        let y = i * -200;
        let x = 75 + (Math.random() * 100);
        let randomSprite = sprites[sprites.length * Math.random() | 0];
        customers.push(new Customer(1, x, y, randomSprite));
    }
}

initCustomers();

function handleCustomers() {
    for (let i = 0; i < customers.length; i++) {
        customers[i].update();
        customers[i].draw();
    }
}