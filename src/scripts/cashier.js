const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
canvas4.width = 800;
canvas4.height = 500;

class Cashier {
    constructor() {
        this.height = 48;
        this.width = 32;
        this.x = 143;
        this.y = 290;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 3;
        this.cashierSprite = new Image();
        this.cashierSprite.src = 'src/images/lightyagami.png';
        this.speed = 10;
    }


    draw() {
        ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
        ctx4.drawImage(
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

export const cashier = new Cashier();