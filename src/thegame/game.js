
var config = {
    width: VIEWPORT.w,
    height: VIEWPORT.h,
    parent: "body",
    debug: false,
    pixelated: false,
    roundPixels: false,
};

var game = new scintilla.Game(config);

console.log(TitleScene);

game.scene.add('title', TitleScene);
game.scene.add('game', GameScene);
game.scene.set('title');
