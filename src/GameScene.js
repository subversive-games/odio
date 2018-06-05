
var GameScene = function () {

    var cameraControl;
    var scrolls;
    var rect;
    var renderRect;
    var scalex =(VIEWAREA.w / 640) * 0.5;
    var scaley = (VIEWAREA.h / 384) * 0.501;

    console.log(scalex);

    this.preload = function() {
        this.load.setPath('assets/');
        this.load.image('bg', 'background.jpg');
        this.load.image('fog', 'fog.png');
        this.load.image('arrow', 'arrow.png');
        this.load.image('arrow_hover', 'arrow_hover.png');
        this.load.image('arrow_pressed', 'arrow_pressed.png');
        this.load.image('scroll_bg', 'scroll_bg.png');
    }

    this.postload = function() {
        this.cache.pattern.create('scroll_bg');
    }

    this.start = function () {
        
        cameraControl = new CameraControl(this.camera);
        scrolls = new ScrollsControl(this.game.system.render.canvas);
        this.bg = this.create.sprite('bg');
        //bg.scale.set(0.5, 0.5);

        rect = this.create.rectangle();
        renderRect = rect.modules.get('render');
        renderRect.width = 64;
        renderRect.height = 64;
        rect.position.set(VIEWAREA.w / 2 - 32, VIEWAREA.h / 2 - 32);


    };

    this.update = function (dt) {

        if (cameraControl.isMoving === false) {
            var vertical = this.key.pressed(scintilla.KeyCode.Down)-this.key.pressed(scintilla.KeyCode.Up);
            var horizontal = this.key.pressed(scintilla.KeyCode.Right) - this.key.pressed(scintilla.KeyCode.Left);

            if (vertical !== 0) {
                cameraControl.move(0, 64 * vertical);
            } else if (horizontal !== 0) {
                cameraControl.move(64 * horizontal, 0);
            }
        }

        cameraControl.update(dt);

        this.bg.x = this.camera.x - (this.camera.x / World.width) * World.width * 0.1;

        scrolls.update(cameraControl, this.mouse.position);

        /*if (!renderRect.bounds.intersects(cameraControl.bounds)) {
            rect.y = cameraControl.camera.y;
        }*/

    };

    this.gui = function(drawer) {

        drawer.composite = 'difference';
        drawer.spriteScaled('fog',0,0, scalex,scaley);        
        drawer.spriteScaled('fog',0,0,scalex,scaley);
       
        drawer.composite = 'source-over';
        scrolls.render(drawer);

    };



};