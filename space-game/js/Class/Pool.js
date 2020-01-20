//Klasa obsługująca buforowanie obiektów dla listy obiektów
S.Pool = function(objects){
    this.queue = [];
    this.objects = objects;
}

S.Pool.prototype = {
    add: function(object)
    {
        this.objects.push(object);
        return this.call();
    },

    call: function()
    {
        if(this.objects.length && this.queue.length)
        {
            var fn = this.queue.shift(),
            obj = this.objects.shift();
            fn(obj, this);
        }

        return this;
    },

    act: function(fn)
    {
        this.queue.push(fn);
        return this.call();
    }
};