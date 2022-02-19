class BuildImage {
    static build(path) {
        let image = new Image();
        image.src = path;
        return image;
    }
}

class Elements {
    constructor(canvasWidth, canvasHeight) {
        this.background = new Background(0, 0, 500, 900,
            "FlappyBird/assets/images/sky.png");
        this.ground = new Background(0, 700, 500, 200,
            "FlappyBird/assets/images/ground.png");
    }

    getElements() {
        return [this.background, this.ground]
    }

    moveBackground(){
        this.background.move();
        this.ground.move();
    }

}

class Sprit {
    constructor(posX, posY, width, height, spritPath) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.sprit = BuildImage.build(spritPath);
    }

    draw(context) {
        context.drawImage(this.sprit, this.posX, this.posY, this.width, this.height);
    }
}

class Background extends Sprit {
    constructor(posX, posY, width, height, spritPath) {
        super(posX, posY, width, height, spritPath);
    }

    draw(context) {
        context.drawImage(this.sprit, this.posX, this.posY, this.width, this.height);
        context.drawImage(this.sprit, this.posX + this.width, this.posY, this.width, this.height);
    }

    move() {
        this.posX -= 1;

        if (this.posX + this.width <= 0) {
            this.posX = 0;
        }
    }

}