
var VIEW = {
    w: 64*15,
    h: 64*10,
};

var config = {
    width: VIEW.w,
    height: VIEW.h,
    parent: "body",
    debug: true,
    pixelated: false,
    roundPixels: false,
};

var game = new scintilla.Game(config);



game.scene.add('game', GameScene);
game.scene.set('game');


