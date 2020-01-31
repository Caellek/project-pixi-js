//Klasa wroga, uzywana jest dla każdego pojawiającego się
//wroga na planszy

S.Enemy = function()
{
    var textures = S.SpriteSheetTextures.getArray('e_f','.png',6);

    PIXI.extras.AnimatedSprite.call(this, textures);

    this.visible = false;
    this.spd = 1;
    this.animationSpeed = 0.2;
    this.startLife = 100;
    this.life = 100;

    this.hitArea = new S.Rectangle(this.position.x, this.position.y, this.width, this.height);
};

S.Enemy.constructor = S.Enemy;
S.Enemy.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype);

S.Enemy.prototype.alloc = function()
{
    this.visible = true;
    this.life = 100;
    this.alpha = 1;
    this.play();
};

S.Enemy.prototype.canRealloc = function()
{
    this.stop();
    this.visible = false;
    this.parent.pool.add(this);
};

S.Enemy.prototype.updateTransform = function()
{
    if(this.playing)
    {
        this.position.x = this.position.x - this.spd;

        if(this.position.x + this.width < 0)
            this.canRealloc();

        this.hitArea.x = this.position.x;
        this.hitArea.y = this.position.y;
    }
    PIXI.extras.AnimatedSprite.prototype.updateTransform.call(this);
};

S.Enemy.prototype.touched = function(bullet)
{
    this.life = this.life - (this.startLife * bullet.damage);
    this.alpha = this.life/100
    if(this.life <= 0)
    {
        this.canRealloc();
    }
}