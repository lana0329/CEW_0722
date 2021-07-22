class Worm extends Chess {
    constructor(args) {
        super(args);
        this.tag = 'worm';
        this.dead = false;
        this.currentGrid = null;
    }

    draw() {
        this.hover = false;
        push();
        imageMode(CENTER);
        translate(this.p.x, this.p.y);
        scale(this.setScale());
        image(this.img, 0, 0, 110, 110);
        pop();
    }

    isdead() {
        this.dead = true;
    }

}