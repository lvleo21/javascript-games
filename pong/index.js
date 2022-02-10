class Main {
    constructor(canvas, container) {
        this.canvas = canvas;
        this.container = container;
        this.container.fillStyle = "#8b8b8b";
        this.container.font = "20px Arial"
        this.elementsToDraw = [];

        this.player1;
        this.player2;
        this.ball;

        this.start();
    }


    start() {
        this.createElemests();
        this.draw();
        this.ball.startMoving(0, this.canvas.width);
        this.player1.startMoving(0, this.canvas.height)


        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp"){
                this.player1.changeSteps(-8);
            } else if (event.key === "ArrowDown"){
                this.player1.changeSteps(8);
            }

        })
    }

    createElemests() {
        const scorePlayer1 = new Score("Score 1: ", 40, 50);
        this.player1 = new Player(40, 125, 25, 100, scorePlayer1);
        const scorePlayer2 = new Score("Score 2: ", this.canvas.width - 130, 50);
        this.player2 = new Player(735, 125, 25, 100, scorePlayer2);
        this.ball = new Ball(400 - 12.5, 200 - 12.5, 25, 25);

        this.elementsToDraw.push(
            this.player1,
            this.player2,
            this.ball
        )
    }

    draw() {
        setInterval(() => {
            this.container.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.elementsToDraw.forEach((element) => {
                element.draw(this.container);
            })
        }, 10)
    }
}


class Object {
    constructor(posX, posY, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }

    draw(container) {
        container.fillRect(this.posX, this.posY, this.width, this.height);
    }
}

class Player extends Object {
    constructor(posX, posY, width, height, score) {
        super(posX, posY, width, height);
        this.score = score;
        this.steps = 0; 
    }

    draw(container) {
        container.fillRect(this.posX, this.posY, this.width, this.height);
        this.score.draw(container);
    }

    changeSteps(steps){
        this.steps=steps;
    }

    startMoving(minWidth, maxWidth) {
        setInterval(() => {

            this.posY+=this.steps; 
            

            if((this.posY + this.height) >= maxWidth || this.posY<= minWidth){
                this.changeSteps(0);
            }
        }, 10)
    }
}

class Ball extends Object {
    constructor(posX, posY, width, height) {
        super(posX, posY, width, height)
        this.steps = 8
    }

    startMoving(minWidth, maxWidth) {  //!L <- Left; R -> Right;
        setInterval(() => {
            this.posX += this.steps;

            if (this.posX > maxWidth - this.width) {
                this.steps = -8;
            } else if (this.posX < minWidth) {
                this.steps = 8;
            }
        }, 10)
    }
}

class Score {
    constructor(text, posX, posY) {
        this.value = 0
        this.text = text;
        this.posX = posX;
        this.posY = posY;
    }

    draw(container) {
        container.fillText(this.text + this.value, this.posX, this.posY);
    }

    incrementValue() {
        this.value += 1;
    }

}

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const container = canvas.getContext("2d");

    const main = new Main(canvas, container);

    //! fillRect(positionX, positionY, width, height) -> Desenha algo na tela
    //! Definiar a fonta do container -> container.font = "tamanho nome"
    //! container.fillText("Texto", positionX, positionY) -> Criar um texto no canvas
}