var Scene , 
    maxScenes = 100 ,
    pool = new Array( maxScenes );

Scene = function(){
    var id = 0 ,
        objects = [] ,
        info = [];

    while( pool[id] instanceof Scene )
        id++;

    if( id >= maxScenes )
        throw new Error( 'reach max scenes number' );

    pool[id] = this;

    this._interval = setInterval( function(){
        for( var i = 0; i < objects.length; i++ )
            info.push( objects[i].info() );
    } , 25 );

    this.id = id;
    this.objects = objects;
    this.info = info;
};

module.exports = Scene;

Scene.get = function( id ){
    return pool[id];
};

Scene.getIds = function(){
    var i = 0 ,
        rooms = [];

    for( ; i < pool.length; i++ )
        if( pool[i] instanceof Scene )
            rooms.push( i );

    return rooms;
}

Scene.prototype = {

    constructor: Scene,

    add: function( object ){
        object.id = this.objects.length;
        this.objects.push( object );
    }
};
