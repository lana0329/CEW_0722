class Chicken extends Chess {
    constructor(args) {
        super(args);
        this.tag = 'chicken';
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
            translate(mouseX, mouseY);
            translate(-(width / 2 - grid_rdus * 1.5), -(height / 2 + 50 - grid_rdus * 1.5));
            scale(this.setScale());
            fill(220, 120);
            noStroke();
            triangle(-28, 25, 0, -25, 28, 25);
            pop();
        }
    }



}