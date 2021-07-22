class Scene {
    constructor(args) {
        this.game;
        this.allLevel = args.allLevel;
        this.currentLevel = 0;
        this.answer = args.answer;
        this.picturePak = args.picturePak;
    }

    init() {
        this.game = new Game({ picPak: this.picturePak });
        this.currentLevel = 0;
        this.game.init({
            level: this.allLevel[0],
            answer: this.answer[0].split(",")
        })

    }

    update() {
        this.game.update();
    }

    draw() {
        this.drawBackGround();
        push();
        translate(width / 2 - grid_rdus * 1.5, height / 2 + 50 - grid_rdus * 1.5);
        fill(255);
        rect(0, 0, grid_rdus * 3);
        this.game.draw();
        fill(255);
        stroke(100);
        strokeWeight(5);
        strokeJoin(ROUND);
        textSize(54);
        textAlign(CENTER);
        text(this.currentLevel + 1, 175, -15);

        if (this.game.complete()) {
            this.game.chesses = [];
            fill(255, 130);
            noStroke();
            rect(0, 0, grid_rdus * 3);
            if (this.game.completeState == 'excellent') {
                if (this.currentLevel == 29) image(this.game.picPak.lastLevelPic, 0, 0, grid_rdus * 3, grid_rdus * 3);
                else image(this.game.picPak.excellentPic, 0, 0, grid_rdus * 3, grid_rdus * 3);
            } else image(this.game.picPak.completedPic, 0, 0, grid_rdus * 3, grid_rdus * 3);
        }
        pop();
    }

    newGame() {
        this.game.init({
            level: this.allLevel[this.currentLevel],
            answer: this.answer[this.currentLevel].split(",")
        })
    }

    preLevel() {
        if (this.currentLevel > 0) this.currentLevel -= 1;
        this.newGame();
    }

    nextLevel() {
        if (this.currentLevel < 29) this.currentLevel += 1;
        this.newGame();
    }

    resumeLevel() {
        this.newGame();
    }

    inBoard() {
        var center = createVector(width / 2 - grid_rdus * 1.5, height / 2 + 50 - grid_rdus * 1.5);
        var LB = center.x;
        var RB = center.y;
        var LT = center.x + 3 * grid_rdus;
        var RT = center.y + 3 * grid_rdus;
        if (mouseX > LB && mouseX < LT && mouseY > RB && mouseY < RT) return true;
        return false;
    }

    drawBackGround() {
        let span = 25;
        for (let i = 0; i < width; i++) {
            push();
            noFill();
            strokeWeight(1.5);
            stroke(240);
            line(0, span * i, width, span * i);
            pop();
        }
        for (let i = 0; i < height; i++) {
            push();
            noFill();
            strokeWeight(1.5);
            stroke(240);
            line(span * i, 0, span * i, height);
            pop();
        }
    }




}