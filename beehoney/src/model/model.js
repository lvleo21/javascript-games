class Sprit {
    constructor(posX, posY, width, height, urlSprit, type, spritLimit) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.sprit = BuildSprit.build(urlSprit);
        this.type = type;
        this.spritLimit = spritLimit;
        this.spritFrame = 1;
        this.steps = 3

        this.speed = 0;
    }

    draw(context) {
        context.drawImage(this.sprit, this.posX, this.posY, this.width, this.height);
    }

    animation() {
        this.sprit.src = `assets/${this.type}${this.spritFrame}.png`;

        if (this.spritFrame === this.spritLimit) {
            this.spritFrame = 1;
        } else {
            this.spritFrame++;
        }
    }

    randomMove(maxHeight, maxWidth) {
        this.posY += (this.steps + this.speed)

        if (this.posY >= maxHeight) {
            this.posY = -50;
            this.posX = Math.random() * ((maxWidth - this.width) - 0) + 0;
        }
        this.speed += 0.001;
    }

    respaw() {
        this.posY = -200;
        this.posX = Math.random() * ((500 - this.width) - 0) + 0;
    }
}

class Bee extends Sprit {
    constructor(posX, posY, width, height, urlSprit) {
        super(posX, posY, width, height, urlSprit, "bee", 4);
        this.stepsX = 0;
        this.stepsY = 0;
        this.points = new Text(0, "40px Arial", 240, 100, "black");
        this.lifes = new Text(3, "40px Arial", 40, 100, "red");

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

    eventKeyUp(key) {
        if (key === "ArrowUp" || key === "ArrowDown") {
            this.stepsY = 0;
        } else if (key === "ArrowLeft" || key === "ArrowRight") {
            this.stepsX = 0;
        }
    }

    move() {

        if(this.posX+this.stepsX <= 0 || this.posX + this.width + this.stepsX>= 500) {
            this.stepsX = 0;
        } else if (this.posY+this.stepsY <= 0 || this.posY + this.height + this.stepsY>= 900){
            this.stepsY = 0;
        }

        this.posX += this.stepsX;
        this.posY += this.stepsY;
    }

    decrementLife() {
        this.lifes.setText(this.lifes.text - 1);
    }

    incrementPoints() {
        this.points.setText(this.points.text + 1);
    }


    draw(context) {
        context.drawImage(this.sprit, this.posX, this.posY, this.width, this.height);
    }
}

class Spider extends Sprit {
    constructor(posX, posY, width, height, urlSprit) {
        super(posX, posY, width, height, urlSprit, "spider", 4);
    }
}

class Flower extends Sprit {
    constructor(posX, posY, width, height, urlSprit) {
        super(posX, posY, width, height, urlSprit, "florwer", 2);
    }
}

class Background extends Sprit {
    constructor(posX, posY, width, height, urlSprit) {
        super(posX, posY, width, height, urlSprit);
        this.steps = 3;
        this.speed = 0;
    }

    move(maxHeight) {
        this.posY += (this.steps + this.speed)

        if (this.posY >= maxHeight) {
            this.posY = 0;
        }

        this.speed += 0.001;
    }

    draw(context) {
        context.drawImage(this.sprit, this.posX, this.posY, this.width, this.height);
        context.drawImage(this.sprit, this.posX, this.posY - this.height, this.width, this.height);
    }
}

class BuildSprit {
    static build(urlSprit) {
        let image = new Image();
        image.src = urlSprit;
        return image;
    }
}

class Text {
    constructor(text, fontStyle, posX, posY, color) {
        this.text = text;
        this.fontStyle = fontStyle;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
    }

    draw(context) {
        context.font = this.fontStyle;
        context.fillStyle = this.color;
        context.fillText(this.text, this.posX, this.posY);
    }

    setText(text) {
        this.text = text;
    }

    setFontStyle(fontStyle) {
        this.fontStyle = fontStyle;
    }

    setPosX(posX) {
        this.posX = posX;
    }

    setPosY(posY) {
        this.posY = posY;
    }

    setColor(color) {
        this.color = color;
    }
}

class Collider {

    constructor(bee, spider, flower, canvasWidth, canvasHeight) {
        this.bee = bee;
        this.spider = spider;
        this.flower = flower;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }


    verifyCollision() {

        // Spider collision
        if (this.hasCollision(this.bee, this.spider)) {
            this.spider.respaw();
            this.bee.decrementLife();
        }
        //flower collision
        if (this.hasCollision(this.bee, this.flower)) {
            this.flower.respaw();
            this.bee.incrementPoints()
        }

    }

    hasCollision(firstElement, secondElement) {
        if (firstElement.posX < secondElement.posX + secondElement.width &&
            firstElement.posX + firstElement.width > secondElement.posX &&
            firstElement.posY < secondElement.posY + secondElement.height &&
            firstElement.posY + firstElement.height > secondElement.posY
        ) {
            return true;
        }
        return false;
    }

    static verifyWallCollision(bee, canvasWidth, canvasHeight) {
        if (bee.posX + bee.width >= canvasWidth) { //* Colisão Direita
            console.log("Colisão R");
            return "R"
        } else if (bee.posX <= 0) {  //* Colisão Esqueda
            console.log("Colisão L");
            return "L"
        } else if (bee.posY <= 0) {  //* Colisão Cima
            console.log("Colisão T");
            return "T"
        } else if (bee.posY + bee.height >= canvasHeight) { //* Colisão baixo
            console.log("Colisão B");
            return "B"
        }

        return null
    }
}