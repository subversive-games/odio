var HORIZONTAL = 0;
var VERTICAL = 1;

var Thumb = function (scroll) {
    this.scroll = scroll;
    this.size = 0;
    this.location = 0;


    this.render = function (drawer) {


        drawer.color = '#fF0';
        if (this.scroll.side === VERTICAL) {
            drawer.rect(this.scroll.x, this.location, this.scroll.arrowSize, this.size);
        } else {
            drawer.rect(this.location, this.scroll.y, this.size, this.scroll.arrowSize);
        }
    }

    this.setLocation = function (location) {
        //var val = location / this.scroll.trackLength;
        //this.location = location * (this.scroll.max - this.scroll.min);
        this.location = scintilla.Math.lerp(this.scroll.min, this.scroll.max, location);
    }

}

var Scroll = function (side, arrowSize) {
    this.side = side;
    this.arrowSize = arrowSize;
    this.trackLength = 0;
    this.thumb = new Thumb(this, side);
    this.x = 0;
    this.y = 0;
    this.min = 0;
    this.max = 0;

    this.render = function (canvas, drawer) {

        if (this.side === VERTICAL) {
   
            // bg
            drawer.color = '#Aab';
            drawer.rect(this.x, this.y, arrowSize, canvas.height);
            // thumb
            this.thumb.render(drawer);
            // buttons
            drawer.color = '#F00a';
            drawer.rect(this.x, this.y, arrowSize, arrowSize);
            drawer.rect(this.x, this.y + (canvas.height - arrowSize), arrowSize, arrowSize);
        } else {
            // bg
            drawer.color = '#Aab';
            drawer.rect(this.x, this.y, canvas.width - arrowSize, arrowSize);
            // thumb
            this.thumb.render(drawer);
            // buttons
            drawer.color = '#F00a';
            drawer.rect(this.x, this.y, arrowSize, arrowSize);
            drawer.rect(this.x + (canvas.width - arrowSize * 2), this.y, arrowSize, arrowSize);
        }
    };

    this.compute = function (canvas, viewport, scrollArea) {

        if (this.side === VERTICAL) {
            this.trackLength = scrollArea.y;

            this.x = canvas.width - this.arrowSize;
            this.y = 0;//this.arrowSize;
            this.min = this.arrowSize;
            this.max = canvas.height - this.arrowSize;

            // thumbHeight = m_originalViewportSize.Value / (Maximum - Minimum + m_originalViewportSize.Value) * trackLength;
            this.thumb.size = Math.max(50, this.trackLength * (viewport.y / World.height));
        } else {

            this.trackLength = scrollArea.x;

            this.x = 0; 
            this.y = canvas.height - this.arrowSize;
            this.min = this.arrowSize;
            this.max = canvas.width - this.arrowSize * 2;
            this.thumb.size = Math.max(50, this.trackLength * (viewport.x / World.width));

        }

        
        //this.thumb.size = viewport.y / (this.max - this.min + viewport.y) * this.trackLength;

        this.thumb.setLocation(0);
    }


}

var ScrollsControl = function (canvas) {


    this.canvas = canvas;


    var arrowSize = 25;

    init = function () {


        //this.viewportRatio = {x:0,y:0};
        //this.viewportRatio.x = canvas.width / worldSize.x;
        //this.viewportRatio.y = canvas.height / worldSize.y;


        this.viewport = {
            x: canvas.width,
            y: canvas.height
        };
        this.scrollLength = {
            x:  canvas.width - arrowSize * 3,
            y:  canvas.height - arrowSize * 2
        };

        this.verticalScroll = new Scroll(VERTICAL, arrowSize);
        this.horizontalScroll = new Scroll(HORIZONTAL, arrowSize);
        this.verticalScroll.compute(canvas, this.viewport, this.scrollLength);
        this.horizontalScroll.compute(canvas, this.viewport, this.scrollLength);
    }.call(this);

    this.update = function (cameraControl) {
        if (!cameraControl.isMoving)
            return;

        this.verticalScroll.thumb.setLocation(cameraControl.camera.y / World.height);
        this.horizontalScroll.thumb.setLocation(cameraControl.camera.x / World.width);
    }

    this.render = function (drawer) {

        var canvas = drawer.canvas;

        this.verticalScroll.render(canvas, drawer);
        this.horizontalScroll.render(canvas, drawer);
    }

}