
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

