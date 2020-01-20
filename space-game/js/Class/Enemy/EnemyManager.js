//Klasa produkująca przeciwników

S.EnemyManager = function()
{
    PIXI.Container.call(this);

    var totalEnemies = 20;
    this.enemies = [];
    var tmpEnemy = [];

    while (totalEnemies--)
    {
        var e = new S.Enemy();
        e.position.x = S.Config.width + 200;
        this.addChild(e);
        this.enemies.push(e);
        tmpEnemy.push(e);
    }
    this.pool = new S.Pool(tmpEnemy);

    //ustawienia ułatwiające skonfigurowanie przeciwników
    //MinBW = Minimum between wave
    //MaxBW = Max between wave
    //nbFBNW = number of frames before next wave
    this.MinBW = 440;
    this.MaxBW = 540;
    this.Coeff_Disperssion_X = 0.5;

    this.nbFBNW = S.Utils.randBetween(30, 60);
}

S.EnemyManager.constructor = S.EnemyManager;
S.EnemyManager.prototype = Object.create(PIXI.Container.prototype);

S.EnemyManager.prototype.updateTransform = function()
{
    this.nbFBNW--;
    if(this.nbFBNW === 0)
    {
        this.newWave();
    }
    PIXI.Container.prototype.updateTransform.call(this);
}
S.EnemyManager.prototype.newWave = function() 
{
    var scope = this;

    var nbEnemies = S.Utils.randBetween(5, 15);
    while(nbEnemies--)
    {   
        this.pool.act(function(e, pool){
            e.alloc();
            e.position.x = S.Utils.randBetween(S.Config.width, S.Config.width*scope.Coeff_Disperssion_X + S.Config.width);
            e.position.y = S.Utils.randBetween(10, S.Config.height - 30)
        });
    }
    this.nbFBNW = S.Utils.randBetween(this.MinBW, this.MaxBW);
}