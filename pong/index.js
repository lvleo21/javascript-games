class Main {
    constructor(canvas, container) {
        this.canvas = canvas;
        this.container = container;
        this.container.fillStyle = "#8b8b8b";
        this.container.font = "20px Arial"
        this.elementsToDraw = [];
        this.collision;
        this.player1;
        this.player2;
        this.ball;

        this.start();
    }

    start() {
        this.createElemests();
        this.draw();
        this.verifyGameLoop();
        this.ball.startMoving(this.collision);
        this.player1.startMoving(0, this.canvas.height, false)
        this.player2.startMoving(0, this.canvas.height, true)


        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
                this.player1.changeSteps(-8);
            } else if (event.key === "ArrowDown") {
                this.player1.changeSteps(8);
            }

        })

        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowUp") {
                this.player1.changeSteps(0);
            } else if (event.key === "ArrowDown") {
                this.player1.changeSteps(0);
            }
        })
    }

    restart() {
        this.player1.posY = 125;
        this.player2.posY = 125;
        this.ball.posX = 400 - 12.5;
        this.ball.posY = 200 - 12.5;
    }


    verifyGameLoop = () => {
        setInterval(() => {
            switch (this.collision.hasPointCollision()) {
                case 1:
                    this.player1.score.incrementValue();
                    this.ball.steps = -8
                    this.restart();
                    break;
                case 2:
                    this.player2.score.incrementValue();
                    this.ball.steps = 8
                    this.restart();
                    break;
            }
        }, 20)
    }


    createElemests() {
        const scorePlayer1 = new Score("P1: ", 40, 50);
        this.player1 = new Player(40, 125, 25, 100, scorePlayer1);
        const scorePlayer2 = new Score("P2: ", this.canvas.width - 130, 50);
        this.player2 = new Player(735, 125, 25, 100, scorePlayer2);
        this.ball = new Ball(400 - 12.5, 200 - 12.5, 25, 25);
        this.collision = new Collision(this.ball, this.player1, this.player2, 0, this.canvas.width, this.canvas.height);

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

    changeSteps(steps) {
        this.steps = steps;
    }

    movingAuto(minHeight, maxHeight) {
        if (this.posY > maxHeight - this.height || this.steps === 0) {
            this.changeSteps(-8);
        } else if (this.posY < 0) {
            this.changeSteps(8);
        }
    }

    startMoving(minHeight, maxHeight, auto) {
        setInterval(() => {

            if (auto) {
                this.movingAuto(minHeight, maxHeight)
            }

            if (this.posY < minHeight) {
                this.posY = 0;
            } else if (this.posY + this.height > maxHeight) {
                this.posY = maxHeight - this.height;
            }

            this.posY += this.steps;


        }, 10)
    }
}

class Ball extends Object {
    constructor(posX, posY, width, height) {
        super(posX, posY, width, height)
        this.steps = 8
        this.stepsY = -2;
    }

    startMoving(collision) {  //!L <- Left; R -> Right;
        setInterval(() => {
            switch (collision.hasBallCollision()) {
                case 1:
                    this.steps = -8;
                    break;
                case 2:
                    this.steps = 8;
                    break;
                case 3:
                    this.stepsY = 2;
                    break;
                case 4:
                    this.stepsY = -2;
                    break;
            }
            this.posX += this.steps;
            this.posY += this.stepsY;
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

    resetValue() {
        this.value = 0;
    }

}


class Collision {

    constructor(ball, player1, player2, canvaMinWidth, canvaMaxWidth, canvaHeight) {
        this.ball = ball;
        this.player1 = player1;
        this.player2 = player2;
        this.canvaMinWidth = canvaMinWidth;
        this.canvaMaxWidth = canvaMaxWidth;
        this.canvaHeight = canvaHeight;
    }

    hasPointCollision() {
        if (this.ball.posX <= this.canvaMinWidth) {
            return 2 // Ponto do player 2
        } else if (this.ball.posX + this.ball.width >= this.canvaMaxWidth) {
            return 1 // Ponto do ṕlayer 1
        }
    }

    hasBallCollision() {

        if (this.ball.posY + this.ball.height >= this.player2.posY &&
            this.ball.posY <= this.player2.posY + this.player2.height &&
            this.ball.posX >= this.player2.posX - this.player2.width &&
            this.ball.posX >= this.player2.posX - this.player2.width) {
            return 1; // 1 = Colisão a direita
        } else if (
            this.ball.posY + this.ball.height >= this.player1.posY &&
            this.ball.posY <= this.player1.posY + this.player1.height &&
            this.ball.posX <= this.player1.posX + this.player1.width
        ) {
            return 2; // 2 = Colisão a esquerda
        } else if (this.ball.posY <= 0) {
            return 3; // 3 = Colisão na parte de cima
        } else if (this.ball.posY + this.ball.height >= this.canvaHeight) {
            return 4 // 4 = Colisão na parte de baixo
        }
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