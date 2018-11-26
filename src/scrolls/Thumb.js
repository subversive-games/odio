
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