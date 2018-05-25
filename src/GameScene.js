var CameraControl = function (camera) {

    this.camera = camera;
    this.isMoving = false;

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

        moveTimer += dt / 0.5;

        if (moveTimer >= 1) {
            this.camera.position.set(to.x, to.y);
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
    this.start = function () {
        var rect = this.create.rectangle();
        var render = rect.modules.get('render');
        render.width = 64;
        render.height = 64;
        rect.position.set(VIEW.w / 2 - 32, VIEW.h / 2 - 32);
        
        cameraControl = new CameraControl(this.camera);

    };

    this.update = function (dt) {

        
        if (this.key.pressed(scintilla.KeyCode.Down)) {
            cameraControl.move(0, 64);
        }

        cameraControl.update(dt);

    };



};