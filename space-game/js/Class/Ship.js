//Klasa statku

S.Ship = function()
{
    var textures = S.SpriteSheetTextures.getArray('f','.png', 4);

    //Wywołanie konstruktora
    PIXI.extras.AnimatedSprite.call(this, textures);

    this.position.x = 10;
    this.position.y = S.Config.height/2;

    //poruszanie statkiem
    this.speedX = this.speedY = 0;
    this.Acceteration = 0.4;
    this.Max_Speed = 6;
    this.Min_X = 0;
    this.Min_Y = 0;
    this.Max_X = S.Config.width - this.width;
    this.Max_Y = S.Config.height - this.height;

    //Życie statku
    this.life = 4;

    //Szybkość animacji statku
    this.animationSpeed = 0.2;

    //ustalenie obszaru w którym statek może zostać trafiony
    this.hitArea = new S.Rectangle(this.position.x, this.position.y, this.width, this.height);

    //rozpoczęcie animacji
    this.play();
}

S.Ship.constructor = S.Ship;

//Obiekt statku rozszerza obiekt PIXI AnimatedSprite
S.Ship.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype);

//Utrata życia po otrzymaniu obrażeń od przeciwnika
S.Ship.prototype.hitEnemy = function()
{
    this.life--;
    this.alpha = this.life / 4;
    if(this.life === 0)
        this.die();
}

//Koniec życia
S.Ship.prototype.die = function()
{
    this.visible = false;
    S.Controls.stop();
}

//Przesłonienie metody updateTransform, wywołanie na każdej ramce
S.Ship.prototype.updateTransform = function()
{
    //Sterowanie
    if(S.Controls.pressed(S.Controls.UP_ARROW))
    {
        this.speedY -= this.Acceteration;
    } 
    else if(S.Controls.pressed(S.Controls.DOWN_ARROW))
    {
        this.speedY += this.Acceteration;
    } 
    else
        this.speedY /= 1.3;

    if(S.Controls.pressed(S.Controls.LEFT_ARROW))
    {
        this.speedX -= this.Acceteration;
    }
    else if(S.Controls.pressed(S.Controls.RIGHT_ARROW)){
        this.speedX += this.Acceteration;
    }
    else
        this.speedX /= 1.3;

    //akualizacja pozycji i szybkości
    this.speedY = S.Utils.boundary(this.speedY, -this.Max_Speed, this.Max_Speed);
    this.position.y += this.speedY;
    this.speedX = S.Utils.boundary(this.speedX, -this.Max_Speed, this.Max_Speed);
    this.position.x += this.speedX;

    //aktualizacja pozycji obszaru w którym można otrzymać obrażenia
    this.hitArea.x = this.position.x;
    this.hitArea.y = this.position.y;

    //zapobieganie opuszczenia planszy przez statek
    this.position.y = S.Utils.boundary(this.position.y, this.Min_Y, this.Max_Y);
    this.position.x = S.Utils.boundary(this.position.x, this.Min_X, this.Max_X);

    PIXI.extras.AnimatedSprite.prototype.updateTransform.call(this);
}