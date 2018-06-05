
var VIEWAREA = {
    w : 768, // 640 10
    h : 512 // 384 6
};

var SCROLLBUTTONSIZE = 32;

var VIEWPORT = {
    w: VIEWAREA.w + SCROLLBUTTONSIZE,// 665,
    h: VIEWAREA.h + SCROLLBUTTONSIZE,// 409
};

var config = {
    width: VIEWPORT.w,
    height: VIEWPORT.h,
    parent: "body",
    debug: false,
    pixelated: false,
    roundPixels: false,
};

var game = new scintilla.Game(config);



game.scene.add('game', GameScene);
game.scene.set('game');


