class Game {
    constructor(args) {
        this.chesses = [];
        this.grid = [];
        this.step = 0;
        this.answer;
        this.bestStep;
        this.level;
        this.completeState;
        this.picPak = args.picPak;
    }

    init(args) {
        this.createGrid();
        this.picPak.init();

        this.level = args.level;
        this.answer = args.answer;
        this.step = 0;
        this.chesses = []
        this.bestStep = this.answer.length;

        let aChess = this.level.split(',');
        aChess.forEach(c => {
            let notes = c.split(':');
            let type = notes[0];
            let pos = int(notes[1]);
            this.addChess(type, pos);
        })
    }

    update() {
        this.chesses.forEach(obj => obj.update());
        this.grid.forEach(g => g.update());
    }

    draw() {
        this.chesses.forEach(obj => { obj.draw() })
        this.grid.forEach(g => { g.draw() })
        push();
        fill(100);
        textSize(14);
        text("BEST : " + this.bestStep + " steps", this.grid[0].p.x, this.grid[0].p.y - 13);
        if (this.step > this.bestStep) fill(255, 0, 0);
        text("YOUR : " + this.step, this.grid[0].p.x + 275, this.grid[0].p.y - 13);
        pop();
    }

    setChessInGrid(c, g) {
        let prePos = c.currentGrid;
        if (prePos != null) prePos.chess = null;
        c.currentGrid = g;
        g.chess = c;
    }

    isLegalMove(c, targ) {
        let legel = false;
        if (c.tag == 'chicken') {
            let midPos = c.currentGrid.pos.copy().add(targ.pos).mult(0.5);
            let midGrid;
            this.grid.forEach(g => {
                if (g.pos.x == midPos.x && g.pos.y == midPos.y) midGrid = g;
            })
            let near = c.currentGrid.getChickenNear();
            if (near.includes(targ) && midGrid.chess != null) {
                if (targ.isEmpty) {
                    legel = true;
                    if (midGrid.chess.tag == 'worm') this.removeChess(midGrid.chess);
                } else {
                    if (targ.chess.tag == 'worm' && midGrid.chess.tag != 'worm') {
                        legel = true;
                        this.removeChess(targ.chess);
                    }
                }
            }
        } else if (c.tag == 'grass') {
            let near = c.currentGrid.getGrassNear();
            near.filter(n => n.isEmpty == true).forEach(n => {
                if (n.pos == targ.pos) {
                    legel = true;
                }
            })
        }

        return legel;
    }

    move() {
        this.step += 1;
    }

    addChess(type, pos) {
        let c;
        if (type == 'c') c = new Chicken({ img: picturepak.getChicPic() });
        else if (type == 'w') c = new Worm({ img: picturepak.getWormPic() });
        else c = new Grass({ img: picturepak.getGrasPic() });
        c.scale = 0;
        this.chesses.push(c);
        this.setChessInGrid(c, this.grid[pos]);
    }

    removeChess(c) {
        var index = this.chesses.indexOf(c);
        c.isdead();
        c.currentGrid.chess = null;
        this.chesses.splice(index, 1);
    }

    addStep() {
        this.step += 1;
    }

    complete() {
        let iscomplete = true;
        this.chesses.filter(c => c.tag == 'worm').forEach(w => {
            if (w.dead == false) iscomplete = false;
        })
        if (iscomplete == true) {
            if (this.step <= this.bestStep)
                this.completeState = 'excellent';
            else this.completeState = 'completed';
        }
        return iscomplete;
    }

    createGrid() {
        this.grid = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.grid.push(new Grid({
                    p: createVector(grid_rdus * i, grid_rdus * j),
                    r: grid_rdus,
                    pos: createVector(j, i)
                }))
            }
        }

        this.grid[0].setRelate({
            north: null,
            east: this.grid[3],
            south: this.grid[1],
            west: null
        })

        this.grid[1].setRelate({
            north: this.grid[0],
            east: this.grid[4],
            south: this.grid[2],
            west: null
        })

        this.grid[2].setRelate({
            north: this.grid[1],
            east: this.grid[5],
            south: null,
            west: null
        })

        this.grid[3].setRelate({
            north: null,
            east: this.grid[6],
            south: this.grid[4],
            west: this.grid[0]
        })

        this.grid[4].setRelate({
            north: this.grid[3],
            east: this.grid[7],
            south: this.grid[5],
            west: this.grid[1]
        })

        this.grid[5].setRelate({
            north: this.grid[4],
            east: this.grid[8],
            south: null,
            west: this.grid[2]
        })

        this.grid[6].setRelate({
            north: null,
            east: null,
            south: this.grid[7],
            west: this.grid[3]
        })

        this.grid[7].setRelate({
            north: this.grid[6],
            east: null,
            south: this.grid[8],
            west: this.grid[4]
        })

        this.grid[8].setRelate({
            north: this.grid[7],
            east: null,
            south: null,
            west: this.grid[5]
        })
    }

}