import { player } from './player.js';
import { game } from './game.js';
import { cashier } from './cashier.js';
import { grinder } from './grinder.js';

export const orderTypesEasy = [
    "Hot Coffee",
    "Iced Coffee",
    "Espresso",
];

export const orderTypesMedium = [
    "Hot Coffee", 
    "Iced Coffee",
    "Redeye", 
    "Iced Redeye", 
    "Espresso",
    "Latte", 
    "Iced Latte"
];

export const sprites = [
    { name: 'deadpool', width: 128, height: 192 },
    { name: 'newton', width: 128, height: 192 },
    { name: 'death_scythe', width: 200, height: 192 },
    { name: 'crowley_wings', width: 192, height: 192 },
    { name: 'jawa', width: 128, height: 192 },
    { name: 'barret', width: 160, height: 224 },
    { name: 'L', width: 128, height: 192 },
    { name: 'ironman', width: 128, height: 192 },
    { name: 'mandalorian', width: 128, height: 192 },
    { name: 'yoda', width: 128, height: 192 },
    { name: 'astromechdroid', width: 108, height: 104 },
    { name: 'aziraphale_wings', width: 192, height: 192 }
];


export const items = [
    {
        name: "Milk",
        width: 10, height: 20, x: 680, y: 325,
        frameDir: 2,
        icon_url: './src/images/items/milk-pitcher.png'
    },

    {
        name: "Cup",
        width: 10, height: 20, x: 260, y: 275,
        frameDir: 3,
        icon_url: './src/images/items/coffee-cup.svg'
    },

    {
        name: "Portafilter",
        width: 100, height: 20, x: 490, y: 275,
        frameDir: 3,
        icon_url: './src/images/items/portafilter.png'
    }

];

export const upgrades = [
    {
        name: "Steamed Milk",
        width: 10, height: 20, x: 470, y: 275,
        reagents: ["Milk"],
        frameDir: 3,
        icon_url: './src/images/items/steamed-milk.png'
    },

    {
        name: "Hot Coffee",
        width: 40, height: 20, x: 260, y: 355,
        reagents: ["Cup"],
        frameDir: 0,
        icon_url: './src/images/items/hot-coffee.png'
    },

    {
        name: "Iced Coffee",
        width: 40, height: 20, x: 460, y: 355,
        reagents: ["Hot Coffee"],
        frameDir: 0,
        icon_url: './src/images/items/iced-coffee.png'
    },

    {
        name: "Ground Espresso",
        width: 1, height: 20, x: 370, y: 275,
        reagents: ["Portafilter"],
        frameDir: 3,
        icon_url: './src/images/items/portafilter-full.png'
    },

    {
        name: "Espresso",
        width: 100, height: 20, x: 490, y: 275,
        reagents: ["Cup", "Ground Espresso"],
        frameDir: 3,
        icon_url: './src/images/items/hot-espresso.svg'
    },

    {
        name: "Redeye",
        width: 100, height: 20, x: 490, y: 275,
        reagents: ["Hot Coffee", "Ground Espresso"],
        frameDir: 3,
        icon_url: './src/images/items/redeye.png'
    },

    {
        name: "Latte",
        width: 100, height: 20, x: 490, y: 275,
        reagents: ["Steamed Milk", "Espresso"],
        frameDir: 3,
        icon_url: ['./src/images/items/latte-1.png', './src/images/items/latte-2.png'][Math.floor(Math.random() * 2)]
    },

    {
        name: "Iced Latte",
        width: 20, height: 20, x: 400, y: 355,
        reagents: ["Latte"],
        frameDir: 0,
        icon_url: './src/images/items/iced-latte.png'
    },

];

const servingArea = { x: 600 , y: 275, width: 100, height: 20 };
let gameStarted = false;

window.addEventListener("load", () => {
    var fpsInterval, startTime, now, then, elapsed;

    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        
        now = Date.now();
        elapsed = now - then;
        
        if (elapsed > fpsInterval && !game.over) {
            
            then = now - (elapsed % fpsInterval);
            player.draw();
            player.update();
            cashier.draw();
            game.handleGuests();
            game.handleScoreboard();
            grinder.draw();
        }
    }

    document.addEventListener('keydown', function (e) {
        player.keys[e.code] = true;
        if (e.code === "Space") player.handleInventory();
        if (player.keys.Digit1 && game.collision(player, servingArea)) player.serveGuest(0);
        if (player.keys.Digit2 && game.collision(player, servingArea)) player.serveGuest(1);
        if (player.keys.Digit3 && game.collision(player, servingArea)) player.serveGuest(2);
        if (e.code === "Enter" && gameStarted === false) {
            document.querySelector("#start-screen").style.display = "none";
            gameStarted = true;
            startGame();
        }
    });


    document.addEventListener('keyup', function (e) {
        delete player.keys[e.code];
        player.moving = false;

        e.handled = true;
    });

    function resetGame() {
        player.x = 300;
        player.y = 350;
        game.score = 0;
        game.speed = 1;
    }

    function startGame() {
        game.initGuests();
        startAnimating(30);
    }
});