import Bubble from './bubble';
import Guest from './guest';
import { orderTypesEasy, orderTypesMedium, sprites } from './utilities';

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 800;
canvas2.height = 500;



class Game {
    constructor() {
        this.level = 1;
        this.difficulty = 1;
        this.speed = 1 + (this.level * this.difficulty / 4);
        this.guests = [];
        this.numGuests = 3;
        this.guestSpacing = 500 / this.speed;
        this.guestPatience = 500 / this.speed;
        this.numOrders = 0;
        this.lives = 5;
        this.score = 0;
        this.over = false;
    }

    initGuests() {
        for (let i = 0; i < this.numGuests; i++) {
            let y = i * -this.guestSpacing;
            let x = 105;
            let randomSprite = sprites[sprites.length * Math.random() | 0];
            let randomOrder;

            if (this.level <= 2) {
                randomOrder = orderTypesEasy[orderTypesEasy.length * Math.random() | 0];
            } else {
                randomOrder = orderTypesMedium[orderTypesEasy.length * Math.random() | 0];
            }

            this.guests.push(new Guest(i, this.speed, x, y, this.guestPatience, randomOrder, randomSprite));
        }
    }
    
    
    handleGuests() {
        Guest.clear();
        Bubble.clear();
        if (this.guests.length === 0) {
            this.nextLevel();
        }

        for (let i = 0; i < this.guests.length; i++) {

            this.guests[i].update();
            this.guests[i].draw();
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
        this.level += 1;
        this.numGuests += 3;
        this.initGuests();
    }


}

export const game = new Game();
