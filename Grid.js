class Grid {
    constructor(args) {
        this.p = args.p || createVector(0, 0);
        this.r = args.r || 0;
        this.pos = args.pos || createVector(0, 0);
        this.chess = null;
        this.girdhover = false;
        this.showhover = false;
        this.isPressed = false;
        this.isEmpty = true;
        this.west = null;
        this.north = null;
        this.south = null;
        this.east = null;
    }

    draw() {
        push();

        noFill();
        stroke(215);
        strokeWeight(2.5);
        translate(this.p.x, this.p.y)
        rect(0, 0, this.r, this.r)

        // text
        // fill(100);
        // text(this.pos.x, 5, 15)
        // text(this.pos.y, 12, 15)

        // show relate
        // if (this.girdhover && this.isEmpty) {
        //     push();
        //     fill(180);
        //     rect(30, 30, this.r * 0.5, this.r * 0.5)
        //     pop();
        // }



        pop();
    }

    update() {
        // if (this.chess != null) {
        //     if (!this.inRange() && this.showhover) {
        //         if (this.chess.tag == 'grass') {
        //             let near = this.getGrassNear();
        //             near.forEach(n => n.girdhover = false);
        //         } else if (this.chess.tag == 'chicken') {
        //             let near = this.getChickenNear();
        //             near.forEach(n => n.girdhover = false);
        //         }
        //         this.showhover = false;
        //     } else if (this.inRange() && !this.showhover) {
        //         this.showhover = true;
        //         if (this.chess.tag == 'grass') {
        //             let near = this.getGrassNear();
        //             near.forEach(n => n.girdhover = true);
        //         } else if (this.chess.tag == 'chicken') {
        //             let near = this.getChickenNear();
        //             near.forEach(n => n.girdhover = true);
        //         }
        //     }
        // }

        if (this.chess == null) {
            this.isEmpty = true;
        } else this.isEmpty = false;
    }

    getChickenNear() {
        let near = [];
        if (this.north != null) {
            near.push(this.north.north);
            if (this.north.north != null && this.north.north.west != null) near.push(this.north.north.west.west);
        }
        if (this.east != null) {
            near.push(this.east.east);
            if (this.east.east != null && this.east.east.north != null) near.push(this.east.east.north.north);
        }
        if (this.south != null) {
            near.push(this.south.south);
            if (this.south.south != null && this.south.south.east != null) near.push(this.south.south.east.east);
        }
        if (this.west != null) {
            near.push(this.west.west);
            if (this.west.west != null && this.west.west.south != null) near.push(this.west.west.south.south);
        }

        near = near.filter(n => n != null);
        return near;
    }
    getGrassNear() {
        let near = [this.north, this.east, this.south, this.west];
        near = near.filter(n => n != null);
        return near;
    }

    setRelate(args) {
        this.west = args.west;
        this.north = args.north;
        this.east = args.east;
        this.south = args.south;
    }

    inRange() {
        var center = createVector(width / 2 - grid_rdus * 1.5, height / 2 + 50 - grid_rdus * 1.5);
        var LB = grid_rdus * this.pos.y + center.x;
        var RB = grid_rdus * this.pos.x + center.y;
        var LT = grid_rdus * this.pos.y + grid_rdus + center.x;
        var RT = grid_rdus * this.pos.x + grid_rdus + center.y;

        if (mouseX > LB && mouseX < LT && mouseY > RB && mouseY < RT) return true;
        return false;

    }

}