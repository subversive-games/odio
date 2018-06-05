
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