
const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = 800;
canvas5.height = 500;

const canvas6 = document.getElementById('canvas6');
const ctx6 = canvas6.getContext('2d');
canvas6.width = 150;
canvas6.height = 450;


import { game } from './game';
import { grinder } from './grinder';
import { items, upgrades } from './utilities';

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
        let addedItem = "";
        items.forEach(item => {
            if (game.collision(this, item) && this.frameY === item.frameDir) {
                this.addItemToInventory(item);
                addedItem = item;
            }
        });


        let itemNames = [];
        this.inventory.forEach( item => {
            itemNames.push(item.name);
        });

        upgrades.forEach(upgrade => {
            if (game.collision(this, upgrade) && this.frameY === upgrade.frameDir) {
                
                let upgradeable = true;
                upgrade.reagents.forEach(reagent => {
                    if (!itemNames.includes(reagent)) {
                        upgradeable = false;
                        return;
                    }
                });
                if (upgradeable) {
                    this.addItemToInventory(upgrade, itemNames, addedItem);
                    if (upgrade.name === "Ground Espresso") grinder.grinding = 100;
                }
            }
        });

        if (this.inventory.length > 3) this.inventory.pop(); 


    }


    addItemToInventory(object, itemNames, addedItem) {
        if (object.reagents) {
            object.reagents.forEach( reagent => {
                this.inventory.splice(itemNames.indexOf(reagent), 1);
            });
        }

        object.icon = new Image();
        object.icon.src = object.icon_url;
        this.inventory.unshift(object);

        if (object.reagents) { 
            this.inventory.forEach( (item, i) => {
                if (item === addedItem) this.inventory.splice(i, 1);
            });
        }
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
            if (this.y < 350) {
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