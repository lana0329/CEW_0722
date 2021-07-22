class Chess {
    constructor(args) {
        this.p = args.p || createVector(0, 0);
        this.r = args.r || 30;
        // this.curPos = args.curPos || createVector(0, 0);
        this.currentGrid = null;
        this.hover = false;
        this.isPressed = false;
        this.scale = 1;
        this.tag = args.tag;
        this.img = args.img;
    }

    setScale() {
        if (this.hover) this.scale = lerp(this.scale, 1.2, 0.2);
        else this.scale = lerp(this.scale, 1, 0.2);
        return this.scale;
    }

    update() {
        this.p.x = grid_rdus / 2 + this.currentGrid.pos.y * grid_rdus;
        this.p.y = grid_rdus / 2 + this.currentGrid.pos.x * grid_rdus;

        if (this.scale < 1) this.scale = lerp(this.scale, 1, 0.1);

        if (this.inRange()) {
            this.hover = true;
        } else {
            this.hover = false;
        }
    }

    inRange() {
        var center = createVector(width / 2 - grid_rdus * 1.5, height / 2 + 50 - grid_rdus * 1.5);
        var LB = grid_rdus * this.currentGrid.pos.y + center.x;
        var RB = grid_rdus * this.currentGrid.pos.x + center.y;
        var LT = grid_rdus * this.currentGrid.pos.y + grid_rdus + center.x;
        var RT = grid_rdus * this.currentGrid.pos.x + grid_rdus + center.y;

        if (mouseX > LB && mouseX < LT && mouseY > RB && mouseY < RT) return true;
        return false;
    }

}