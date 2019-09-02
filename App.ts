const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
context.canvas.width = canvas.clientWidth;
context.canvas.height = canvas.clientHeight;

const len: HTMLElement = <HTMLElement>document.getElementById('len');

let step = 20;

class App {
    private map: Map = new Map(step);
    private snake: Snake = new Snake();
    private food: Food = new Food();


    public run() {
        this.init();
        this.update();
        this.draw();
    }


    private init() {

    }

    private update() {
        setInterval(() => {
            this.snake.move();
            if (this.snake.body[0][0] === this.food.x && this.snake.body[0][1] === this.food.y) {
                this.snake.eat();
                len.innerText = (this.snake.body.length - 1).toString();
            }
        }, 200);

        onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.snake.vector = [0, -step];
                    break;
                case  'ArrowDown':
                    this.snake.vector = [0, step];
                    break;
                case 'ArrowLeft':
                    this.snake.vector = [-step, 0];
                    break;
                case 'ArrowRight':
                    this.snake.vector = [step, 0];
                    break;
                default:
                    return;
            }
            this.snake.move();
        };
    }

    private draw() {
        requestAnimationFrame(() => this.draw());

        this.map.draw();
        this.snake.draw();
        this.food.draw();
    }
}

class Map {
    private readonly size: number;
    private width: number = canvas.width;
    private height: number = canvas.height;

    constructor(size: number) {
        this.size = size;
    }

    public draw() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.width, this.height);

        context.strokeStyle = 'gray';
        for (let i = 0; i <= this.height; i += this.size) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(this.width, i);
            context.stroke();
        }
        for (let i = 0; i <= this.width; i += this.size) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, this.height);
            context.stroke();
        }
    }
}

class Snake {
    public body = [[0, 0]];
    public vector = [0, step];

    public eat() {
        let tail = this.body[this.body.length - 1];
        this.body.push(tail);
    }

    public move() {
        let newHead = [this.body[0][0] + this.vector[0], this.body[0][1] + this.vector[1]];

        if (newHead[0] > canvas.width - step) newHead[0] = 0;

        if (newHead[0] < 0) newHead[0] = canvas.width - step;

        if (newHead[1] > canvas.height - step) newHead[1] = 0;

        if (newHead[1] < 0) newHead[1] = canvas.height - step;

        this.body.unshift(newHead);
        this.body.pop();
    }

    public draw() {
        context.fillStyle = 'red';
        this.body.forEach((item, index) => {
            if (index !== 0) {
                context.fillStyle = 'blue';
            }
            context.fillRect(item[0], item[1], step, step);
        });
    }

}

class Food {

    public x: number = 0;
    public y: number = step * 8;

    public draw() {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, step, step);
    }
}


let app = new App();
app.run();
