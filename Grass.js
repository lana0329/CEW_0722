class Grass extends Chess {
    constructor(args) {
        super(args);
        this.tag = 'grass';
        this.currentGrid = null;
    }

    draw() {
        push();
        imageMode(CENTER);
        translate(this.p.x, this.p.y);
        scale(this.setScale());
        image(this.img, 0, 0, 110, 110);
        pop();

        if (this.isPressed) {
            push();
            rectMode(CENTER);
            translate(mouseX, mouseY);
            translate(-(width / 2 - grid_rdus * 1.5), -(height / 2 + 50 - grid_rdus * 1.5));
            scale(this.setScale());
            fill(190, 230, 115, 120);
            noStroke();
            rect(0, 0, 50, 50);
            pop();
        }
    }

}