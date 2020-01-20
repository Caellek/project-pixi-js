//Produkcja pocisków
S.BulletManager = function(ship)
{
    PIXI.Container.call(this);

    var totalBullets = 20;
    this.bullets = [];
    var tmpBullets = [];

    while(totalBullets--)
    {
        var b = new S.Bullet();
        this.addChild(b);
        this.bullets.push(b);
        tmpBullets.push(b);
    }
    this.pool = new S.Pool(tmpBullets);

    this.Shoot_delay = 10;
    this.shootTimer = 0;
    this.ship = ship;
}

S.BulletManager.constructor = S.BulletManager;
S.BulletManager.prototype = Object.create(PIXI.Container.prototype);

S.BulletManager.prototype.updateTransform = function()
{
    this.shootTimer--;

    if(this.shootTimer <= 0 && (S.Controls.pressed(S.Controls.SPACE)) && this.ship.visible)
    {
        this.shoot();
    }

    PIXI.Container.prototype.updateTransform.call(this);
}

S.BulletManager.prototype.shoot = function()
{
    var scope = this;
    this.pool.act(function(b, pool)
    {
        b.alloc();
        b.position.x = scope.ship.position.x + scope.ship.width - b.spd;
        b.position.y = scope.ship.position.y + scope.ship.height/2;
    });
    this.shootTimer = this.Shoot_delay;
}