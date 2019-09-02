const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
context.canvas.width = canvas.clientWidth;
context.canvas.height = canvas.clientHeight;

class App {
    public run() {
        this.init();
        this.update();
    }

    private update() {
        requestAnimationFrame(() => this.update());
    }

    private init() {

    }
}

class Map {

}

class Snake {

}

class food {

}


let app = new App();
app.run();
