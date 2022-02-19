class View {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    draw(elements) {
        this.context.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        elements.forEach((element) => {
            element.draw(this.context);
        });
    }

    getCanvasWidth(){
        return this.canvas.width;
    }

    getCanvasHeight(){
        return this.canvas.height;
    }
}