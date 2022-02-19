class Main {
    constructor(canvas) {
        this.view = new View(canvas);
        this.elementsToDraw = new Elements(
            this.view.getCanvasWidth(),
            this.view.getCanvasHeight()
        );

        this.startGameLoop();
    }

    startGameLoop() {
        this.view.draw(this.elementsToDraw.getElements());
        this.elementsToDraw.moveBackground();
        requestAnimationFrame(() => this.startGameLoop());
    }
}