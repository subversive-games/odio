
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