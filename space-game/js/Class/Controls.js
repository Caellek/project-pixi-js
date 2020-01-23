//Klasa sterowania, bo czymś musimy sterować naszym statkiem :D

S.Controls =
{
    //zdefiniowanie klawiszy sterujących
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
    SPACE: 32,

    keysPressed: [],

    //Sterowanie statkiem
    start: function()
    {
        var scope = this;

        this.keyDownHandler = function(e)
        {
            scope.keyDown(e);
        };
        document.addEventListener('keydown', this.keyDownHandler);

        this.keyUpHandler = function(e)
        {
            scope.keyUp(e);
        };
        document.addEventListener('keyup', this.keyUpHandler);
    },

    //Wyłączenie listenerów, w wypadku kiedy np przegramy
    stop: function()
    {
        document.removeEventListener('keydown', this.keyDownHandler);
        document.removeEventListener('keyup', this.keyUpHandler);
        this.keysPressed = [];
    },

    keyDown: function(e)
    {
        this.keysPressed[e.keyCode] = true;
    },

    keyUp: function(e)
    {
        this.keysPressed[e.keyCode] = false;
    },

    pressed: function(keyCode)
    {
        return this.keysPressed[keyCode];
    }
        
}
