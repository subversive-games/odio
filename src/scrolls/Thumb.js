
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
        this.location = scintilla.Math.lerp(this.scroll.thumbTrackMin, this.scroll.thumbTrackMax, location);
    }

}