var graphicConstants = {
    tileWidth: 80,
    tileHeight: 60
};

var playerColors = [
    "#aaaaaa",
    "#ffd8b1",
    "#fffac8",
    "#aaffc3",
    "#e6beff",
    "#42d4f4",
    "#bfef45",
    "#469990",
    "#e6a9aB",
]

// global graphics offsets (used for scrolling the map)
globalxoff = 0;
globalyoff = 0;

// assets
bgimg = loadImage('assets/water.png');
farmImg = loadImage('assets/farm.png');
towerImg = loadImage('assets/tower.png');
townImg = loadImage('assets/town.png');
treeImg = loadImage('assets/tree.png');
peasantImg = loadImage('assets/peasant.png');
spearmanImg = loadImage('assets/spearman.png');
swordsmanImg = loadImage('assets/swordsman.png');
knightImg = loadImage('assets/knight.png');

// See gameLogic.units for ordering
var unitImages = [treeImg, towerImg, townImg, farmImg, peasantImg, spearmanImg, swordsmanImg, knightImg];

function loadImage(src) {
    img = new Image;
    img.src = src;
    return img;
}

function drawBackground(cc, time) {
    xoffset = (time / 100) % 100;
    for (x = 0; x < c.width + bgimg.width; x += bgimg.width) {
        for (y = 0; y < c.height + bgimg.height; y += bgimg.height) {
            cc.drawImage(bgimg, x - xoffset, y - xoffset);
        }
    }
}

function coordsToPixels(x, y) {
    dy = 0;
    if (x % 2 == 1) {
        dy = graphicConstants.tileHeight / 2;
    }
    return [x * graphicConstants.tileWidth * 0.75 + globalxoff, dy + y * graphicConstants.tileHeight + globalyoff];
}

function pixelsToCoords(x, y) {
    mx = Math.floor((x - globalxoff + graphicConstants.tileWidth / 2) / (graphicConstants.tileWidth * 0.75));
    dy = 0;
    if (mx % 2 == 1) {
        dy = graphicConstants.tileHeight / 2;
    }
    my = Math.floor((y - globalyoff - dy + graphicConstants.tileHeight / 2) / graphicConstants.tileHeight);
    return [mx, my];
}

function drawImage(cc, img, x, y) {
    pos = coordsToPixels(x, y);
    cc.drawImage(img, pos[0] - graphicConstants.tileWidth / 2, pos[1] - graphicConstants.tileHeight);
}

function drawTile(cc, x, y, color) {
    pos = coordsToPixels(x, y);
    cc.beginPath();
    cc.moveTo(pos[0] - graphicConstants.tileWidth / 2, pos[1]);
    cc.lineTo(pos[0] - graphicConstants.tileWidth / 4, pos[1] - graphicConstants.tileHeight / 2);
    cc.lineTo(pos[0] + graphicConstants.tileWidth / 4, pos[1] - graphicConstants.tileHeight / 2);
    cc.lineTo(pos[0] + graphicConstants.tileWidth / 2, pos[1]);
    cc.lineTo(pos[0] + graphicConstants.tileWidth / 4, pos[1] + graphicConstants.tileHeight / 2);
    cc.lineTo(pos[0] - graphicConstants.tileWidth / 4, pos[1] + graphicConstants.tileHeight / 2);
    cc.closePath();
    cc.fillStyle = playerColors[color];
    cc.stroke();
    cc.fill();
}
