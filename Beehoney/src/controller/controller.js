class Controller {
    constructor(canvas) {
        this.view = new View(canvas);
        this.arrayElements = []
        this.bee;
        this.spider;
        this.background;
        this.flower;
        this.collision;

        this.createElements();
        this.addListener();
        this.start();
    }

    createElements() {
        this.background = new Background(0, 0, 500, 900, "Beehoney/assets/bg.png");
        this.bee = new Bee(210, 800, 70, 58, "Beehoney/assets/bee1.png");
        this.spider = new Spider(0, 100, 70, 58, "Beehoney/assets/spider1.png");
        this.flower = new Flower(50, 400, 48, 48, "Beehoney/assets/florwer1.png");

        this.collision = new Collider(this.bee, this.spider, this.flower);

        this.arrayElements.push(
            this.background,
            this.bee,
            this.bee.points,
            this.bee.lifes,
            this.spider,
            this.flower,
        );
    }

    addListener() {
        document.addEventListener("keydown", (event) => this.bee.eventKeyDown(event.code));
        document.addEventListener("keyup", (event) => this.bee.eventKeyUp(event.code));
    }

    start() {

        //* Change animations
        this.bee.animation();
        this.spider.animation();
        this.flower.animation();

        //* Start Game Looping
        this.background.move(this.view.canvas.height);
        this.bee.move();
        this.spider.randomMove(this.view.canvas.height, this.view.canvas.width);
        this.flower.randomMove(this.view.canvas.height, this.view.canvas.width);
        this.view.draw(this.arrayElements);
        this.collision.verifyCollision();



        requestAnimationFrame(() => {
            this.start();
        });
    }
}