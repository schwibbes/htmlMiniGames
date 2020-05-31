
function resizeArray(arr, newSize, createFunction) {
    if (newSize > arr.length) {
        while (newSize > arr.length) {
            arr.push(createFunction());
        }
    } else {
        arr.length = newSize;
    }
}

class Level {

    constructor(width, heigth) {
        this.level_width = width;
        this.level_heigth = heigth;
        this.unitMap = new Array(this.level_width);
        this.tileMap = new Array(this.level_width);
        for (var i = 0; i < this.level_width; i++) {
            this.unitMap[i] = new Array(this.level_heigth);
            this.tileMap[i] = new Array(this.level_heigth);
        }
    };

    outOfBounds(x, y) {
        return x < 0 || y < 0 || x >= this.level_width || y >= this.level_heigth;
    }

    resize(new_width, new_heigth) {
        this.level_width = new_width;
        this.level_heigth = new_heigth;
        resizeArray(this.tileMap, new_width, () => new Array());
        resizeArray(this.unitMap, new_width, () => new Array());
        for (var i = 0; i < new_width; i++) {
            resizeArray(this.unitMap[i], new_heigth, () => null);
            resizeArray(this.tileMap[i], new_heigth, () => null);
        }
    }

    toJson() {
        return JSON.stringify(this);
    }

    drawBorder(context) {
        for (var i = -1; i <= this.level_width; i++) {
            for (var j = -1; j <= this.level_heigth; j++) {
                if (i == -1 || j == -1 || i == this.level_width || j == this.level_heigth) {
                    drawImage(context, disabledImg, i, j);
                }
            }
        }
    }

    drawTiles(context, timeNow) {
        drawBackground(context, timeNow);
        cc.lineWidth = "1";
        // draw tiles
        for (var i = 0; i < this.level_width; i++) {
            for (var j = 0; j < this.level_heigth; j++) {
                if (this.tileMap[i][j] != null) {
                    drawTile(context, i, j, this.tileMap[i][j]);
                }
            }
        }
    }

    drawUnits(context, timeNow) {
        // draw units
        for (var i = 0; i < this.level_width; i++) {
            for (var j = 0; j < this.level_heigth; j++) {
                var unit = this.unitMap[i][j];
                if (unit != null && unit != Units.Reserved) {
                    if (canMove(unit)) {
                        var which = (Math.round(timeNow/100)) % 10;
                        if (which > 5) {
                            which = 10 - which;
                        }
                        drawImage(context, animationImgs[unit][which+1], i, j);
                        //drawImage(context, unitImages[unit], i, j);
                    } else {
                        drawImage(context, unitImages[unit], i, j);
                    }
                }
            }
        }
    }
}
