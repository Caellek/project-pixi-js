//Klasa tła oraz przenoszenie obrazów
//availlableImages - tablica indentyfikatorów tekstur, których można użyć dla tła
//speed - szybkość animacji tła, domyślnie ustawiona na 1 pixel na klatkę

S.Background = function(availlableImages, speed)
{
    PIXI.Container.call(this);

    //własności
    this.availlableImages = availlableImages;
    this.speed = speed || 1;
    this.toRealloc = [];

    if(!this.availlableImages || !this.availlableImages.length)
    {
        throw 'Musisz określić parametry "availlableImages" dla S.Background()';
        return ;
    }

    //Tworzenie potrzebnych tekstur
    var totalWidth = 0;
    idxImages = 0;
    nbAvaillableImages = this.availlableImages.length,
    tmpBkg = null;

    //sprawdzamy ile obrazów potrzeba dla całej długości
    while(totalWidth < S.Config.width || this.children.length <= 1)
    {
        if(this.children.length)
        {
            totalWidth += this.children[this.children.length-1].width;
        }
        tmpBkg = new PIXI.Sprite(PIXI.Texture.fromImage(this.availlableImages[idxImages]));

        this.addChild(tmpBkg);
        tmpBkg.position.x = totalWidth;

        idxImages++;
        if(idxImages >= nbAvaillableImages)
        {
            idxImages = 0;
        }
    }
}

//Tworzenie konstruktorów
S.Background.constructor = S.Background;

S.Background.prototype = Object.create(PIXI.Container.prototype);

//Wywoływanie w każdej klatce
S.Background.prototype.updateTransform = function()
{
    var i = this.children.length;
    child = null;
    maxX = Number.MIN_VALUE;

    this.toRealloc = [];

    //Przesuwanie obrazów oraz, kiedy jakiś obraz wyjdzie poza ramkę,
    //wtedy przenosi go na początek
    while(i--)
    {
        child = this.getChildAt(i);
        child.position.x -= this.speed;
        if(child.position.x + child.width <= 0)
        {
            this.toRealloc.push(child);
        }
        else
        {
            maxX = Math.max(maxX, child.position.x + child.width);
        }
    }

    //Jeżeli dane "dziecko" może zostać przeniesione,
    //wtedy przenosi je na odpowiednią pozycję początkową
    if(this.toRealloc.length)
    {
        i = this.toRealloc.length;
        while(i--)
        {
            this.toRealloc[i].position.x = maxX;
            maxX = this.toRealloc[i].position.x + this.toRealloc[i].width;
        }
    }
    PIXI.Container.prototype.updateTransform.call(this);
}