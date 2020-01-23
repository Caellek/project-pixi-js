S.Collision = function(ship, enemiesManager, bulletsManager)
{
    PIXI.extras.Bump.call(this);


    this.ship = ship;
    this.enemiesManager = enemiesManager;
    this.bulletsManager = bulletsManager;
};

S.Collision.constructor = S.Collision;

S.Collision.prototype.checkCollision = function()
{
    var em = this.enemiesManager.enemies,
        bm = this.bulletsManager.bullets,
        i = em.lenght;
    
    while(i--)
    {
        if(em[i].visible)
        {
            var a = bm.lenght;
            while(a--)
            {
                if(bm[a].visible)
                {
                    if(em[i].hitArea.contain(bm[a].position))
                    {
                        em[i].touched(bm[a]);
                        bm[a].canRealloc();
                        this.dispatchEvent('Enemy_touched');
                    }
                }
            }
            if(this.ship.visible && em[i].hitArea.interesectWith(this.ship.hitArea))
            {
                em[i].canRealloc();
                this.ship.hitEnemy();
                this.dispatchEvent('Touch_enemy');
            }
        }
    }
}