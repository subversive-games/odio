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
    var rect;
    var renderRect;
    this.start = function () {
        rect = this.create.rectangle();
        renderRect = rect.modules.get('render');
        renderRect.width = 64;
        renderRect.height = 64;
        rect.position.set(VIEW.w / 2 - 32, VIEW.h / 2 - 32);

        cameraControl = new CameraControl(this.camera);

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

        /*if (!renderRect.bounds.intersects(cameraControl.bounds)) {
            rect.y = cameraControl.camera.y;
        }*/

    };



};