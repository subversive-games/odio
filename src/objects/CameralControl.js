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

