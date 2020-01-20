//Klasa arkuszy tekstur
S.SpriteSheetTextures = {

    /*
        name - nazwa pliku sprite
        ext - rozszerzenie pliku
        count - liczba klatek
        start - pierwsza klatka (domyślnie 1)
    */
    getArray: function(name,ext,count,start)
    {
        start = start || 1;
        var textures = [],
            i = count,
            j = start;

        while(i--)
        {
            textures.push(PIXI.Texture.fromFrame(name + j + ext));
            j++;
        }
        return textures;
    }
}