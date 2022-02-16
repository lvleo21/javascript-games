class Controller {
    constructor(canvas) {
        this.view = new View(canvas);
        this.arrayElements = []

        this.createElements();
        this.start();

        this.bee;
        this.spider;
        this.background;

        this.addListener();
    }

    createElements() {
        this.background = new Background(0, 0, 500, 900, "assets/bg.png");
        this.bee = new Bee(0, 0, 70, 58, "assets/bee1.png");
        this.spider = new Spider(0, 100, 70, 58, "assets/spider1.png");
        this.arrayElements.push(this.background, this.bee, this.spider);
    }

    addListener() {
        document.addEventListener("keydown", (event) => this.bee.eventKeyDown(event.code));
        document.addEventListener("keyup", (event) => this.bee.eventKeyUp(event.code));
    }

    start() {
        setInterval(() => {
            this.background.move(this.view.canvas.height);
            this.bee.move();
            this.spider.move(this.view.canvas.height, this.view.canvas.width);
            this.view.draw(this.arrayElements);
        }, 10)
    }
}