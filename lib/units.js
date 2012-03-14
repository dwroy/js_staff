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
