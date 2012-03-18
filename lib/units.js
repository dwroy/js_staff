var Unit = function(){
    Emitter.call( this );
};

Util.inherits( Unit , Emitter );

Unit.prototype.attach = function( scene ){
    throw new Error( 'Method must be inplemented' );
};

var Tank = function( tankImage , chamberSize , bombImage , bombSize , loadTime ){
    Unit.call( this );

    this.body = new Animation( tankImage );
    this.setChamberSize( chamberSize );
    this.setBomb( bombImage , bombSize , loadTime );
};

Util.inherits( Tank , Unit );

Tank.prototype.setBomb = function( image , size , loadTime ){
     
};

Tank.prototype.setChamberSize = function( size ){
    this._chamberSize = size;
};


/**
 * cannon
 */
var Cannon = function( bombClass , chamberSize , loadTime ){
    this.init( bombClass , chamberSize , loadTime );
};

Cannon.prototype.constructor = Cannon;

Cannon.prototype.init = function( bombClass , chamberSize , loadTime ){
    this.loadTime = loadTime;

    this.bombClass = bombClass;
    this.chamberSize = chamberSize;
    this._chamber = [];

    this._chamber.length = 0;

    while( this._chamber.length < this.chamberSize )
        this._chamber.push( new this.bombClass );

    this._lastLoadTime = Frame.startTime;
};

Cannon.prototype.load = function(){
    if( this._chamber.length < this._chamberSize && 
        ( this._lastLoadTime + this.loadTime ) > Frame.startTime ){

        this._chamber.push( new this._bombClass );
        this._lastLoadTime = Frame.startTime;
    }
};

Cannon.prototype.fire = function(){
    return this._chamber.pop();
};

var Bomb = function(){
    Animation.call( this );
};
