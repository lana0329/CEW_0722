class PicturePak {
    constructor(args) {
        this.picindex = [
            [0, 1, 2, 3],
            [0, 1, 2, 3],
            [0, 1, 2, 3]
        ];
        this.chicIndex = 0;
        this.wormIndex = 0;
        this.grasIndex = 0;
        this.chicPic = args.chicPic;
        this.wormPic = args.wormPic;
        this.grasPic = args.grasPic;
        this.completedPic = args.completedPic;
        this.excellentPic = args.excellentPic;
        this.lastLevelPic = args.lastLevelPic;
    }

    init() {
        this.chicIndex = 0;
        this.wormIndex = 0;
        this.grasIndex = 0;
        for (let i = 0; i < 3; i++) {
            this.picindex[i] = shuffle(this.picindex[i])
        }
    }

    getChicPic() {
        let img = this.chicPic[this.picindex[0][this.chicIndex]];
        this.chicIndex += 1;
        return img;
    }

    getWormPic() {
        let img = this.wormPic[this.picindex[1][this.wormIndex]];
        this.wormIndex += 1;
        return img;
    }

    getGrasPic() {
        let img = this.grasPic[this.picindex[2][this.grasIndex]];
        this.grasIndex += 1;
        return img;
    }



}