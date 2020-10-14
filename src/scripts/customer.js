class Customer {
    constructor(speed, x) {
        this.x = x;
        this.y = canvas3.height / 3;
        this.width = 32;
        this.height = 48;
        this.speed = speed;
    }

    draw() {
        ctx3.fillStyle = 'blue';
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.speed * gameSpeed;
    }
}

function initCustomers() {
    for (let i = 0; i < 3; i++) {
        let x = i * 200;
        customers.push(new Customer(1, x));
    }
}

initCustomers();

function handleCustomers() {
    for (let i = 0; i < customers.length; i++) {
        customers[i].update();
        customers[i].draw();
    }
}