PIXI.utils.sayHello();

//Funkcja wywołująca
(function()
{
    //Tworzenie nowej sceny
    var stage = new PIXI.Container(0x000000);

    //Dane globalne
    S.Config = {
        width: Math.min(800, window.innerWidth),
        height: Math.min(550, window.innerHeight)
    };

    //Tworzenie renderer
    var renderer = PIXI.autoDetectRenderer(S.Config.width, S.Config.height);

    //Dołączanie widoku
    document.body.appendChild(renderer.view);

    //Statek
    var ship, bg1, bg2, enemiesManager, bulletsManager, collision = null;

    //Ładowanie potrzebnych zasobów (images/sprites(json))
    var loader = PIXI.loader;
    loader.add("img/ship.json");
    loader.add("img/bg1.jpg");
    loader.add("img/bg2.jpg");
    loader.add("img/starfield.png");
    loader.add('img/enemy.json');
    loader.add('img/bullet.png');
    loader.load(onAssetsLoaded);
    

    function onAssetsLoaded()
    {
        //Dodanie tła
        bg1 = new S.Background(['img/bg1.jpg', 'img/bg2.jpg'], 1);
        stage.addChild(bg1);
        bg1.alpha = 0.6;

        //Dodanie gwiazd
        bg2 = new S.Background(['img/starfield.png'], 1.5);
        stage.addChild(bg2);
        bg2.alpha = 0.2;

        //dodanie sterowania
        S.Controls.start();

        //Dodanie przeciwników
        enemiesManager = new S.EnemyManager();
        stage.addChild(enemiesManager);

        //Tworzenie statku
        ship = new S.Ship;
        stage.addChild(ship);

        //Strzały
        bulletsManager = new S.BulletManager(ship);
        stage.addChild(bulletsManager);

        //Dodanie kolizji
        collision = new S.Collision(ship, enemiesManager, bulletsManager);

        //pętla animacji
        requestAnimationFrame(animate);
    }

    function animate()
    {
        requestAnimationFrame(animate);

        renderer.render(stage);
    }
})();