import Bubble from './bubble';
import Guest from './guest';

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 800;
canvas2.height = 500;

const orderTypes = ["Hot Coffee", "Redeye", "Latte", "Iced Coffee", "Espresso"];

const sprites = [];

sprites.push({ name: 'deadpool', width: 128, height: 192 });
sprites.push({ name: 'newton', width: 128, height: 192 });
sprites.push({ name: 'death_scythe', width: 200, height: 192 });
sprites.push({ name: 'crowley_wings', width: 192, height: 192 });
sprites.push({ name: 'jawa', width: 128, height: 192 });
sprites.push({ name: 'barret', width: 160, height: 224 });
// sprites.push({ name: , width: , height: });
// sprites.push({ name: , width: , height: });
// sprites.push({ name: , width: , height: });
// sprites.push({ name: , width: , height: });

class Game {
    constructor() {
        this.speed = 1;
        this.guests = [];
        this.numGuests = 5;
        this.guestSpacing = 300 / this.speed;
        this.guestPatience = 500 / this.speed;
        this.numOrders = 0;
        this.lives = 5;
        this.score = 0;
    }

    initGuests() {
        for (let i = 0; i < this.numGuests; i++) {
            let y = i * -this.guestSpacing;
            let x = 75 + (Math.random() * 100);
            let randomSprite = sprites[sprites.length * Math.random() | 0];
            let randomOrder = orderTypes[orderTypes.length * Math.random() | 0];
            this.guests.push(new Guest(i, this.speed, x, y, this.guestPatience, randomOrder, randomSprite));
        }
    }
    
    
    handleGuests() {
        Guest.clear();
        Bubble.clear();
        for (let i = 0; i < this.guests.length; i++) {
            this.guests[i].update();
            this.guests[i].draw();
        }

        if (this.guests.length === 0) {
            this.nextLevel();
        }
    }

    handleScoreboard() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.fillStyle = 'black';
        ctx2.strokeStyle = 'black';
        ctx2.font = 'bold 16px Roboto';
        ctx2.fillText(`Score: ${this.score}`, 700, 20);
        ctx2.fillText(`Lives: ${this.lives}`, 700, 40);
    }

    collision(object1, object2) {
        return !(object1.x > object2.x + object2.width || 
            object1.x + object1.width < object2.x ||
            object1.y > object2.y + object2.height ||
            object1.y + object1.height < object2.y);
            
    }

    nextLevel() {
        this.speed *= 1.2;
        this.numGuests += 3;
        this.initGuests();
    }

    gameOver() {
        console.log("YOU LOSE");
    }

}

export const game = new Game();


