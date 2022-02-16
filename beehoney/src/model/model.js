class Sprit {
    constructor(posX, posY, width, height, urlSprit) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.sprit = BuildSprit.build(urlSprit);

    }

    draw(context) {
        context.drawImage(this.sprit, this.posX, this.posY, this.width, this.height);
    }
}

class Bee extends Sprit {
    constructor(posX, posY, width, height, urlSprit) {
        super(posX, posY, width, height, urlSprit);
        this.stepsX = 0;
        this.stepsY = 0;
    }

    eventKeyDown(key) {
        switch (key) {
            case "ArrowLeft":
                this.stepsX = -8;
                break
            case "ArrowRight":
                this.stepsX = 8;
                break
            case "ArrowUp":
                this.stepsY = -8;
                break
            case "ArrowDown":
                this.stepsY = 8;
                break

        }
    }

    eventKeyUp(key){
        if (key === "ArrowUp" || key === "ArrowDown"){
            this.stepsY = 0;
        } else if(key === "ArrowLeft" || key === "ArrowRight"){
            this.stepsX = 0;
        }
    }

    move(){
        this.posX+=this.stepsX;
        this.posY+=this.stepsY;
    }
}

class Spider extends Sprit {
    constructor(posX, posY, width, height, urlSprit) {
        super(posX, posY, width, height, urlSprit);
    }

    move(maxHeight, maxWidth){
        this.posY+=10

        if(this.posY >= maxHeight){
            this.posY = -50;
            this.posX = Math.random() * ((maxWidth - this.width) - 0) + 0;
        }
    }
}

class Background extends Sprit{
    constructor(posX, posY, width, height, urlSprit) {
        super(posX, posY, width, height, urlSprit);
    }

    move(maxHeight){
        this.posY+=5;

        if (this.posY === maxHeight){
            this.posY = 0;
        }
    }

    draw(context){
        context.drawImage(this.sprit, this.posX, this.posY, this.width, this.height);
        context.drawImage(this.sprit, this.posX, this.posY - this.height, this.width, this.height);
    }
}

class BuildSprit{
    static build(urlSprit){
        let image = new Image();
        image.src = urlSprit;
        return image;
    }
}