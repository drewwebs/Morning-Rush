const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
canvas4.width = 800;
canvas4.height = 500;

class Grinder {
    constructor() {
        this.grinderPic = new Image();
        this.grinderPic.src = 'src/images/grinder.png';
        this.x = 370;
        this.y = 225;
        this.height = 64;
        this.width = 30;
        this.grinding = 0;
    }

    draw() {
        if (this.grinding !== 0) {
            
            this.x === 370 ? this.x = 372 : this.x = 370;
            this.grinding -= 1;
        }

        if (this.grinding > 0) this.grinding -= 1;

        ctx4.drawImage(
            this.grinderPic,
            this.x, this.y,
            this.width, this.height
        );
    }
}

export const grinder = new Grinder();