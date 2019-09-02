const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
context.canvas.width = canvas.clientWidth;
context.canvas.height = canvas.clientHeight;

const len: HTMLElement = <HTMLElement>document.getElementById('len');

let step: number = 25; // 方块大小
let originX: number = canvas.width % step / 2;
let originY: number = canvas.height % step / 2;
let endX: number = canvas.width - originX;
let endY: number = canvas.height - originY;

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
            this.snakeRun();
        }, 200);

        // 电脑方向键控制
        onkeydown = (e) => {
            let oldVector = this.snake.vector;
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

            // 长按加速
            if (oldVector[0] === this.snake.vector[0] && oldVector[1] === this.snake.vector[1]) {
                this.snakeRun();
            }
        };
    }

    private snakeRun() {
        this.snake.move();

        // 食物碰撞
        if (this.snake.body[0][0] === this.food.x && this.snake.body[0][1] === this.food.y) {
            this.snake.eat();
            len.innerText = (this.snake.body.length - 1).toString();
            console.log(`🐍.len = ${this.snake.body.length}`);
        }
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

    constructor(size: number) {
        this.size = size;
    }

    public draw() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = 'gray';
        for (let i = originY; i <= canvas.height; i += this.size) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.stroke();
        }
        for (let i = originX; i <= canvas.width; i += this.size) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, canvas.height);
            context.stroke();
        }
    }
}

class Snake {
    public body = [[step * 10 + originX, originY]];
    public vector = [0, step];

    public eat() {
        let tail = this.body[this.body.length - 1];
        this.body.push(tail);
        this.move();
    }

    public move() {
        let newHead = [this.body[0][0] + this.vector[0], this.body[0][1] + this.vector[1]];

        // 碰壁处理
        if (newHead[0] > endX - step) newHead[0] = originX;
        if (newHead[0] < originX) newHead[0] = endX - step;
        if (newHead[1] > endY - step) newHead[1] = originY;
        if (newHead[1] < originY) newHead[1] = endY - step;

        this.body.unshift(newHead);
        this.body.pop();
    }

    public draw() {
        context.fillStyle = '#888888';
        this.body.forEach((item, index) => {
            if (index !== 0) {
                context.fillStyle = '#CCCCCC';
            }
            context.fillRect(item[0], item[1], step, step);
        });
    }

}

class Food {

    public x: number = step * 10 + originX;
    public y: number = step * 8 + originY;

    public draw() {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, step, step);
    }
}

let app = new App();
app.run();
