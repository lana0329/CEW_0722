// Project: Chiken eat worms
// Author: Yun-Chen Lee yclee.c@nycu.edu.tw
// Date: 2021/07
// Description: puzzle game

// import class

var grid_rdus = 115;
var scene;
var leveltxt;
var answertxt;
var picturepak;
var cPic = [];
var gPic = [];
var wPic = [];
var exclPic;
var comPic;
var lastPic;


function preload() {
    leveltxt = loadStrings('txt/level.txt');
    answertxt = loadStrings('txt/answer.txt');

    for (let i = 1; i < 5; i++) {
        filename = "pic/c-pic/c-" + str(i) + ".png"
        pic = loadImage(filename);
        cPic.push(pic);
    }
    for (let i = 1; i < 5; i++) {
        filename = "pic/g-pic/g-" + str(i) + ".png"
        pic = loadImage(filename);
        gPic.push(pic);
    }
    for (let i = 1; i < 5; i++) {
        filename = "pic/w-pic/w-" + str(i) + ".png"
        pic = loadImage(filename);
        wPic.push(pic);
    }

    exclPic = loadImage("pic/excellent.png");
    comPic = loadImage("pic/completed.png")
    lastPic = loadImage("pic/lastLevel.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    picturepak = new PicturePak({
        chicPic: cPic,
        wormPic: wPic,
        grasPic: gPic,
        completedPic: comPic,
        excellentPic: exclPic,
        lastLevelPic: lastPic
    });

    scene = new Scene({
        allLevel: leveltxt,
        answer: answertxt,
        picturePak: picturepak
    });
    scene.init();
}

function draw() {
    // recreate bgc
    fill(255);
    rect(0, 0, windowWidth, windowHeight);
    scene.update();
    scene.draw();
}

function mousePressed() {
    if (scene.inBoard()) {
        let gElement;
        scene.game.grid.forEach(g => { if (g.inRange()) gElement = g; })
        gElement.isPressed = true;
        if (gElement.chess != null) gElement.chess.isPressed = true;
    }
}

function mouseReleased() {
    if (scene.inBoard()) {
        let gElement;
        let cElement;
        scene.game.chesses.forEach(c => {
            if (c.isPressed == true) cElement = c;
        })
        scene.game.grid.forEach(g => { if (g.inRange()) gElement = g; })
        if (cElement != undefined) {
            if (scene.game.isLegalMove(cElement, gElement)) {
                scene.game.setChessInGrid(cElement, gElement)
                scene.game.move();
            }
            scene.game.grid.forEach(g => g.isPressed = false);
            scene.game.chesses.forEach(c => c.isPressed = false);
        }
    } else {
        scene.game.grid.forEach(g => g.isPressed = false);
        scene.game.chesses.forEach(c => c.isPressed = false);
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}