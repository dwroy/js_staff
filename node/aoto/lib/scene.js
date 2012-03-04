var Scene , 
    Toy = require( './toy.js' ) ,
    MaxCount = 100 ,
    Bag = new Array( MaxCount );

Scene = function(){
    var id = 0 ,
        bag = [] ,
        data = [];

    while( Bag[id] instanceof Scene )
        id++;

    if( id >= MaxCount )
        throw new Error( 'reach max scenes number' );

    Bag[id] = this;

    this._intervalId = setInterval( function(){
        var i = 0;
        data.length = 0;

        for( ; i < bag.length; i++ )
            data.push( bag[i].getData() );
    } , 25 );

    this.openTime = new Date().getTime();
    this.id = id;
    this.bag = bag;
    this.data = data;
    this._state = Scene.STATE_OPEN;
};

module.exports = Scene;
Scene.STATE_OPEN = 0;
Scene.STATE_CLOSE = 1;

Scene.get = function( id ){
    return Bag[id];
};

Scene.getIds = function(){
    var i = 0 ,
        rooms = [];

    for( ; i < Bag.length; i++ )
        if( Bag[i] instanceof Scene )
            rooms.push( i );

    return rooms;
}

Scene.prototype = {

    constructor: Scene,

    add: function( toy ){
        if( toy instanceof Toy ){
            toy.scene = this;
            this.bag.push( toy );
        }
    },

    isOpen: function(){
        return this._state === Scene.STATE_OPEN;
    },

    isClose: function(){
        return this._state === Scene.STATE_CLOSE;
    },

    close: function(){
        clearInterval( this._intervalId );
        while( ( toy = this.bag.pop() ) && toy.scene === this )
            toy.scene = null;

        this._state = Scene.STATE_CLOSE;
    }
};

