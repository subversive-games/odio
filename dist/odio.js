
var VIEWAREA = {
    w : 768, // 640 10
    h : 512 // 384 6
};

var SCROLLBUTTONSIZE = 32;

var VIEWPORT = {
    w: VIEWAREA.w + SCROLLBUTTONSIZE,// 665,
    h: VIEWAREA.h + SCROLLBUTTONSIZE,// 409
};



var World = {
    width : 64 * 20,
    height : 64 * 12
};






var CameraControl = function (camera) {

    this.camera = camera;
    this.isMoving = false;
    this.bounds = new scintilla.BoundingBox(camera.bounds);

    var to = {
        x: 0,
        y: 0
    };
    var from = {
        x: 0,
        y: 0
    };
    var moveTimer = 0;

    this.move = function (x, y) {
        this.isMoving = true;
        from.x = this.camera.x;
        from.y = this.camera.y;
        to.x = from.x + x;
        to.y = from.y + y;
        moveTimer = 0;
    };

    this.update = function (dt) {

        if (this.isMoving === false)
            return;

        this.bounds.copy(this.camera.bounds);
        this.bounds.decrease(64, 64);
        this.bounds.move(64, 64);

        moveTimer += dt / 0.5;

        if (moveTimer >= 1) {
            this.camera.x = to.x;
            this.camera.y = to.y;
            moveTimer = 0;
            this.isMoving = false;
        } else {
            this.camera.x = scintilla.Math.lerp(from.x, to.x, moveTimer);
            this.camera.y = scintilla.Math.lerp(from.y, to.y, moveTimer);
        }

    };

}



var GameScene = function () {

    var cameraControl;
    var scrolls;
    var rect;
    var renderRect;
    var scalex =(VIEWAREA.w / 640) * 0.5;
    var scaley = (VIEWAREA.h / 384) * 0.501;

    console.log(scalex);



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

var TitleScene = function () {

    var tx = VIEWAREA.w / 2;
    var ty = VIEWAREA.h / 2 - 64;
    var tilty = 0;
    var tiltx = 0;
    var tiltTimer = 0;
    var offsety = 31.5;

    this.preload = function() {
        this.load.setPath('assets/');
        this.load.image('bg', 'background.jpg');
        this.load.image('fog', 'fog.png');
        this.load.image('arrow', 'arrow.png');
        this.load.image('arrow_hover', 'arrow_hover.png');
        this.load.image('arrow_pressed', 'arrow_pressed.png');
        this.load.image('scroll_bg', 'scroll_bg.png');
        this.load.image('title_0', 'title_burn.png');
        this.load.image('title_1', 'title_multiply.png');
        this.load.image('title_2', 'title_overlay.png');
      
       
    }

    this.postload = function() {
        this.cache.pattern.create('scroll_bg');
    }

    this.update = function(dt) {
        tiltTimer += dt;

        if (tiltTimer > 0.15) {
            tilty = scintilla.Random.range(-2,2);
            tiltx =  scintilla.Random.range(-2,2);
            tiltTimer = 0;
        }

        if (this.key.pressed(scintilla.KeyCode.Enter)) {
            this.scene.set('game')
        }
    }

    this.gui = function(drawer) {

        drawer.sprite('bg', 0, 0);
        drawer.alpha = 1;
        drawer.composite = 'color-burn';
        drawer.sprite('title_0', tx + tiltx, ty - offsety + tilty, 0.5, 0.5);
        drawer.composite = 'multiply';
        drawer.sprite('title_1', tx, ty - offsety, 0.5, 0.5);
        
        drawer.alpha = 0.51;
        drawer.composite = 'overlay';
        drawer.sprite('title_2', tx, ty, 0.5, 0.5);

    }

}

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

var HORIZONTAL = 0;
var VERTICAL = 1;
var MIN = 0;
var MAX = 1;

var ButtonImageScale = {
    x: SCROLLBUTTONSIZE / 75,
    y: SCROLLBUTTONSIZE / 77,
}

var ButtomHalfImage  = {
    x : ButtonImageScale.x * 74 * 0.5,
    y : ButtonImageScale.y * 77 * 0.5,
}


var Scroll = function (side, arrowSize) {
    this.side = side;
    this.arrowSize = arrowSize;
    this.trackLength = 0;
    this.thumbSpaceLength = 0;
    this.thumb = new Thumb(this, side);
    this.buttons = [new Button(this, MIN), new Button(this, MAX)];
    this.x = 0;
    this.y = 0;
    this.thumbTrackMin = 0;
    this.thumbTrackMax = 0;
    this.min = 0;
    this.max = 0;


    this.render = function (canvas, drawer) {

        // bg
        drawer.color = '#241F0C';

        if (this.side === VERTICAL) {
            //drawer.rect(this.x, this.y, arrowSize, canvas.height);
            var d = drawer.patternTransformed('scroll_bg', 
            this.x + arrowSize, this.y,
            canvas.height - arrowSize, undefined,ButtonImageScale.x,1, 90);
            
        
        } else {
            drawer.patternTransformed('scroll_bg', 
            this.x, this.y,
            canvas.width - arrowSize, undefined,1,ButtonImageScale.y, 0);
            //drawer.rect(this.x, this.y, canvas.width - arrowSize, arrowSize);
        }
        this.thumb.render(drawer);
        this.buttons[0].render(drawer);
        this.buttons[1].render(drawer);
    };

    this.update = function (cameraControl, mousePos) {

        if (cameraControl.isMoving) {
            if (this.side === VERTICAL) {
                this.thumb.setLocation(cameraControl.camera.y / World.height);
            } else {
                this.thumb.setLocation(cameraControl.camera.x / World.width);
            }
        }

        this.buttons[0].update(mousePos);
        this.buttons[1].update(mousePos);

    }

    this.init = function (canvas, viewport) {

        var thumbSize = 50;

        var arrowThumbSpace = arrowSize * 3;
        var maxArrowRight = arrowSize * 2;

        if (this.side === VERTICAL) {
            this.thumbSpaceLength = viewport.y - arrowThumbSpace;

            this.x = canvas.width - this.arrowSize;
            this.y = 0; 
        
            thumbSize = Math.max(50, this.thumbSpaceLength * (viewport.y / World.height));
            this.max = canvas.height - maxArrowRight;
        } else {

            this.thumbSpaceLength = viewport.x - arrowThumbSpace;

            this.x = 0;
            this.y = canvas.height - this.arrowSize;
          
            thumbSize = Math.max(50, this.thumbSpaceLength * (viewport.x / World.width));
            this.max = canvas.width - maxArrowRight;
        }

        
        this.thumb.size = thumbSize;
        this.thumbTrackMin = this.arrowSize;
        this.thumbTrackMax = this.max - thumbSize;
        this.trackLength = this.thumbSpaceLength;

        this.buttons[0].init();
        this.buttons[1].init();
        //this.thumb.size = viewport.y / (this.max - this.min + viewport.y) * this.trackLength;

        this.thumb.setLocation(0);
    }


}



var Button = function (scroll, which) {

    this.scroll = scroll;
    this.which = which;
    this.rect = new scintilla.Rect();
    this.state = 0;
    this.spr = 'arrow';
    this.scale = {
        x : ButtonImageScale.x,
        y : ButtonImageScale.y,
    }
    this.ang = 0;

    this.init = function () {


        var arrowSize = this.scroll.arrowSize;


        this.rect.set(this.scroll.x, this.scroll.y, arrowSize, arrowSize);

        if (this.which === MAX) {
            if (this.scroll.side === VERTICAL) {
                this.rect.y = this.scroll.y + this.scroll.max;
                this.ang = 90;
                
            } else {
                this.rect.x = this.scroll.x + this.scroll.max;
            }
        } else {
            if (this.scroll.side === HORIZONTAL) {
                this.scale.x *= -1;
            } else {
                this.ang = -90;
            }
        }

    };



    this.update = function (mousePos) {

        var contains = this.rect.contains(mousePos.x, mousePos.y);

        if (contains) {
            if (this.state === 0) {
                this.state = 1;
                this.spr = 'arrow_hover';
            }
        } else {
            if (this.state !== 0) {
                this.state = 0;
                this.spr = 'arrow';
            }
            
        }


    }

    this.render = function (drawer) {


        drawer.color = 'green'; //'#F00a';

        drawer.spriteTransformed(this.spr, 
            this.rect.x + ButtomHalfImage.x, 
            this.rect.y + ButtomHalfImage.y, 
            this.scale.x, ButtonImageScale.y, 
            this.ang,
            0.5 ,0.5);

        // if (this.scroll.side === VERTICAL) {

        //     if (this.which === MIN)
        //         drawer.rect(this.scroll.x, this.scroll.y, arrowSize, arrowSize);
        //     else
        //         drawer.rect(this.scroll.x, this.scroll.y + (canvas.height - arrowSize), arrowSize, arrowSize);

        // } else {
        //     if (this.which === MIN)
        //         drawer.rect(this.scroll.x, this.scroll.y, arrowSize, arrowSize);
        //     else {
        //         //drawer.rect(this.scroll.x + (canvas.width - arrowSize * 2), this.scroll.y, arrowSize, arrowSize);

        //     }
        // }
    }

}

var ScrollsControl = function (canvas) {


    this.canvas = canvas;


   

    init = function () {

        var arrowSize = SCROLLBUTTONSIZE;
        //this.viewportRatio = {x:0,y:0};
        //this.viewportRatio.x = canvas.width / worldSize.x;
        //this.viewportRatio.y = canvas.height / worldSize.y;

        this.viewport = {
            x: VIEWPORT.w,
            y: VIEWPORT.h
        };


        this.verticalScroll = new Scroll(VERTICAL, arrowSize);
        this.horizontalScroll = new Scroll(HORIZONTAL, arrowSize);
        this.verticalScroll.init(canvas, this.viewport);
        this.horizontalScroll.init(canvas, this.viewport);
    }.call(this);

    this.update = function (cameraControl, mousePos) {
        
        this.verticalScroll.update(cameraControl, mousePos);
        this.horizontalScroll.update(cameraControl, mousePos);

    }

    this.render = function (drawer) {

        var canvas = drawer.canvas;

        this.verticalScroll.render(canvas, drawer);
        this.horizontalScroll.render(canvas, drawer);
    }

}

var BORDER_COLOR = '#4d4c49';

var Thumb = function (scroll) {
    this.scroll = scroll;
    this.size = 0;
    this.location = 0;


    this.render = function (drawer) {


        drawer.color = '#c1b89c';
        if (this.scroll.side === VERTICAL) {
            drawer.rect(this.scroll.x, this.location, this.scroll.arrowSize-1, this.size);
            drawer.outlineRect(this.scroll.x, this.location, this.scroll.arrowSize-1, this.size, 2, BORDER_COLOR);
        } else {
            
            drawer.rect(this.location, this.scroll.y, this.size, this.scroll.arrowSize);
            drawer.outlineRect(this.location, this.scroll.y, this.size, this.scroll.arrowSize-1, 2, BORDER_COLOR);
        }
    }

    this.setLocation = function (location) {
        //var val = location / this.scroll.trackLength;
        //this.location = location * (this.scroll.max - this.scroll.min);
        this.location = scintilla.Math.lerp(this.scroll.thumbTrackMin, this.scroll.thumbTrackMax, location);
    }

}