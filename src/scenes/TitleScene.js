
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