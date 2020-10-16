const orderTypes = ["Small coffee", "Small redeye", "Small latte", "Large latte"];

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
        this.numCustomers = 5;
        this.customerSpacing = 200 / this.speed;
        this.customerPatience = 500 / this.speed;
        this.numOrders = 0;
        this.lives = 5;
        this.score = 0;
    }

    initCustomers() {
        for (let i = 0; i < this.numCustomers; i++) {
            let y = i * -this.customerSpacing;
            let x = 75 + (Math.random() * 100);
            let randomSprite = sprites[sprites.length * Math.random() | 0];
            let randomOrder = orderTypes[orderTypes.length * Math.random() | 0];
            customers.push(new Customer(i, this.speed, x, y, this.customerPatience, randomOrder, randomSprite));
        }
    }
    
    
    handleCustomers() {
        for (let i = 0; i < customers.length; i++) {
            customers[i].update();
            customers[i].draw();
        }
    }

    handleScoreboard() {
        ctx5.fillStyle = 'black';
        ctx5.strokeStyle = 'black';
        ctx5.font = 'bold 16px Roboto';
        ctx5.fillText(`Score: ${this.score}`, 700, 20);
        ctx5.fillText(`Lives: ${this.lives}`, 700, 40);
    }

    collision(object1, object2) {
        return !(object1.x > object2.x + object2.width || 
            object1.x + object1.width < object2.x ||
            object1.y > object2.y + object2.height ||
            object1.y + object1.height < object2.y);
            
    }

    nextLevel() {
        this.speed *= 1.1;
        this.numCustomers += 3;
    }

    gameOver() {
        console.log("YOU LOSE");
    }

}

const game = new Game();

game.initCustomers();