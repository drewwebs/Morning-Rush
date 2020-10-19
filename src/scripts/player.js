
const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = 800;
canvas5.height = 500;

const canvas6 = document.getElementById('canvas6');
const ctx6 = canvas6.getContext('2d');
canvas6.width = 150;
canvas6.height = 450;

const items = [
    { name: "Milk", width: 20, height: 20, x: 660, y: 275, icon_url: './src/images/items/milk-carton.svg'}, 
    { name: "Cup", width: 20, height: 20, x: 400, y: 275, icon_url: './src/images/items/coffee-mug.svg' },
    { name: "Ice", width: 20, height: 20, x: 400, y: 425, icon_url: './src/images/items/ice-cube.svg' }
];

const upgrades = [
    { name: "Steamed Milk", width: 20, height: 20, x: 270, y: 275, reagent: "Milk", icon_url: './src/images/items/red-milk-carton.svg'},
    { name: "Hot Coffee", width: 20, height: 20, x: 320, y: 425, reagent: "Cup", icon_url: './src/images/items/hot-coffee.svg'},
    { name: "Iced Coffee", width: 20, height: 20, x: 400, y: 425, reagent: "Hot Coffee", icon_url: './src/images/items/iced-coffee.svg' },
    { name: "Espresso", width: 20, height: 20, x: 320, y: 275, reagent: "Cup", icon_url: './src/images/items/hot-espresso.svg' },
    { name: "Redeye", width: 20, height: 20, x: 320, y: 275, reagent: "Hot Coffee", icon_url: './src/images/items/redeye.svg' },
    { name: "Latte", width: 20, height: 20, x: 320, y: 275, reagent: "Steamed Milk", icon_url: './src/images/items/latte.svg'},
    { name: "Iced Latte", width: 20, height: 20, x: 400, y: 425, reagent: "Latte", icon_url: './src/images/items/iced-latte.svg' },    
];

const servingArea = { x: 500, y: 275, width: 100, height: 20 };

import { game } from './game';

class Player {
    constructor() {
        this.keys = [];
        this.height = 64;
        this.width = 48;
        this.x = 500;
        this.y = 275;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
        this.playerSprite = new Image();
        this.playerSprite.src = 'src/images/ryuk.png';
        this.speed = 10;
        this.inventory = [];
    }


    handleInventory() {
        items.forEach(item => {
            if (game.collision(this, item)) {
                if (this.inventory.length >= 3) this.inventory.pop(); 
                this.addItemToInventory(item);
            }
        });

        let itemNames = [];
        this.inventory.forEach( item => {
            itemNames.push(item.name);
        });

        upgrades.forEach(upgrade => {
            // 
            if (game.collision(this, upgrade) && itemNames.includes(upgrade.reagent)) {
                // 
                this.inventory.splice(itemNames.indexOf(upgrade.reagent), 1);
                this.addItemToInventory(upgrade);
            }
        });
    }

    addItemToInventory(item) {
        item.icon = new Image();
        item.icon.src = item.icon_url;
        this.inventory.unshift(item);
    }

    clearInventory() {
        this.inventory = [];
    }


    renderItems() {
        this.inventory.forEach((item, i) => {
            ctx6.drawImage(item.icon, 10, 10 + 150 * i, 125, 125);
        });
    }

    serveGuest(index) {
        let itemNames = [];
        this.inventory.forEach(item => {
            itemNames.push(item.name);
        });

        game.guests.forEach( guest => {
            if (guest.ordered && !(guest.fulfilled || guest.frustrated) && this.inventory[index].name === guest.orderType) {
                guest.fulfilled = true;
                game.score += 1;
                this.inventory.splice(itemNames.indexOf(guest.orderType), 1);
                return;
            }
        });
    }

    // handleInventory() {
    //     items.forEach( item => {
    //         if (game.collision(this, item)) {
    //             this.addItemToInventory(item);
    //         }
    //     });

    //     upgrades.forEach( upgrade => {
    //         if (game.collision(this, upgrade) && this.inventory[upgrade.reagent]) {
    //             delete this.inventory[upgrade.reagent];
    //             this.addItemToInventory(upgrade);
    //         }
    //     }); 
    // }

    // addItemToInventory(item) {
    //     this.inventory[item.name] = item;
    //     this.inventory[item.name].icon = new Image();
    //     this.inventory[item.name].icon.src = item.icon_url;
    // }


    // clearInventory() {
    //     Object.keys(this.inventory).forEach (key => { delete this.inventory[key]});
    // }


    // renderItems() {
    //     Object.keys(this.inventory).forEach ((key, i) => { 
    //         ctx6.drawImage(this.inventory[key].icon, 10, 10 + 150 * i, 125, 125);
    //     });
    // }




    
    update() {

        // Handle movements
        if (this.keys.ArrowUp) {
            this.moving = true;
            this.frameY = 3;
            if (this.x < 170 && this.y < 350) return;
            else if (this.y > 275) {
                this.y -= this.speed;
            }
        }

        if (this.keys.ArrowDown) {
            this.frameY = 0;
            this.moving = true;
            if (this.y < 425) {
                this.y += this.speed;
            }
        }

        if (this.keys.ArrowLeft) {
            this.frameY = 1;
            this.moving = true;
            if (this.x < 170 && this.y < 350) return;
            else if (this.x > 125) {
                this.x -= this.speed;
            }
        }

        if (this.keys.ArrowRight) {
            this.frameY = 2;
            this.moving = true;
            if (this.x < 650) {
                this.x += this.speed;
            }
        }

        if (this.keys.Delete) {
            this.clearInventory();
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
        ctx5.clearRect(0, 0, canvas5.width, canvas5.height);
        ctx6.clearRect(0, 0, canvas6.width, canvas6.height);
        this.drawSprite(
            this.playerSprite, 
            this.width * this.frameX, this.height * this.frameY, 
            this.width, this.height, 
            this.x, this.y, 
            this.width, this.height
            );
            
            this.handlePlayerFrame();
            this.renderItems();
    }
        

}

export const player = new Player();