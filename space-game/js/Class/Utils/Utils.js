//Klasa przechowująca podstawowe funkcje

S.Utils = {
    //Ograniczenie wartości od min do max
    boundary: function(value, min, max)
    {
        return value < min ? min : value > max ? max : value;
    },

    //Randomowa liczba między min i max
    randBetween: function(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    } 
}