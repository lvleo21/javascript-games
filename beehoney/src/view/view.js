class View{
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    draw(arrayElements){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        arrayElements.forEach((element) => {
            element.draw(this.context);
        })
    }
}