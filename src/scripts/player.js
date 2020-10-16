import {ctx6, ctx5, keys} from './canvas';

const items = [
    { name: "Milk", width: 20, height: 20, x: 660, y: 275, icon_url: '/src/images/items/milk-carton.svg'}, 
    { name: "Cup", width: 20, height: 20, x: 400, y: 275, icon_url: '/src/images/items/coffee-mug.svg' },
    { name: "Ice", width: 20, height: 20, x: 400, y: 425, icon_url: '/src/images/items/ice-cube.svg' }
];

const upgrades = [
    { name: "Steamed Milk", width: 20, height: 20, x: 270, y: 275, reagent: "Milk", icon_url: '/src/images/items/red-milk-carton.svg'},
    { name: "Hot Coffee", width: 20, height: 20, x: 320, y: 425, reagent: "Cup", icon_url: '/src/images/items/hot-coffee.svg'},
    { name: "Iced Coffee", width: 20, height: 20, x: 400, y: 425, reagent: "Hot Coffee", icon_url: '/src/images/items/iced-coffee.svg' },
    { name: "Espresso", width: 20, height: 20, x: 320, y: 275, reagent: "Cup", icon_url: '/src/images/items/hot-espresso.svg' },
    // { name: "Cup of Coffee", width: 20, height: 20, x: 320, y: 425, reagent: "Cup", icon_url: '/src/images/items/' },
    
];

class Player {
    constructor() {
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

        itemNames = [];
        game.

        upgrades.forEach(upgrade => {
            if (game.collision(this, upgrade) && this.inventory[upgrade.reagent]) {
                delete this.inventory[upgrade.reagent];
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
        if (keys.ArrowUp) {
            this.moving = true;
            this.frameY = 3;
            if (this.x < 170 && this.y < 350) return;
            else if (this.y > 275) {
                this.y -= this.speed;
            }
        }

        if (keys.ArrowDown) {
            this.frameY = 0;
            this.moving = true;
            if (this.y < 425) {
                this.y += this.speed;
            }
        }

        if (keys.ArrowLeft) {
            this.frameY = 1;
            this.moving = true;
            if (this.x < 170 && this.y < 350) return;
            else if (this.x > 125) {
                this.x -= this.speed;
            }
        }

        if (keys.ArrowRight) {
            this.frameY = 2;
            this.moving = true;
            if (this.x < 650) {
                this.x += this.speed;
            }
        }

        
        // if (keys.Space) {
        //     this.handleInventory();
        // }

        if (keys.Delete) {
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