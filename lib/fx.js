var Fx = function(){
    Emitter.call( this );
};

Util.inherits( Fx , Emitter );

Fx.STATE_READY = 0;
Fx.STATE_RUN = 1;
Fx.STATE_PAUSE = 2;
Fx.STATE_STOP = 3;
Fx.STATE_FINISH = 4;
Fx.STATE_DISABLE = 5;

Fx.prototype.tick = function(){
    throw new Error( 'Method must be implemented' );
};

Fx.prototype.start = function(){
    if( this.state === Fx.STATE_STOP )
        this.state = Fx.STATE_RUN;
};

Fx.prototype.stop = function(){
    if( this.state === Fx.STATE_RUN )
        this.state = Fx.STATE_STOP;
};

var Forward = function( animation , v , maxRange ){
    Fx.call( this );

    this.v = v;
    this.lastDx = 0;
    this.lastDy = 0;
    this.maxRange = maxRange || 0;
    this.range = 0;
    this.animation = animation;
    this.state = Fx.STATE_STOP;
};

Util.inherits( Forward , Fx );

Forward.prototype.tick = function(){
    var location = this.animation.location ,
        rotation = this.animation.rotation ,
        ds = Frame.interval * this.v;

    this.range += ds;

    if( this.maxRange > 0 && this.range > this.maxRange ){
        ds = ds - this.range + this.maxRange;
        this.range = this.maxRange;
        this.state = Fx.STATE_FINISH;
        this.emit( 'finish' );
    }
    
    this.lastDx = rotation.cos * ds;
    this.lastDy = rotation.sin * ds;
    location.x += this.lastDx;
    location.y += this.lastDy;
};

Forward.prototype.checkCollisions = function( intersectors ){
    var i , w , h , s , intersector ,
        animation = this.animation ,
        intersected = [];

    for( i = 0 ; i < intersectors.length ; i++ ){
        intersector = intersectors[i];
        if( animation === intersector ) continue;
        w = animation.location.x - intersector.location.x;
        h = animation.location.y - intersector.location.y;
        s = Math.sqrt( w * w + h * h );

        if( s < ( animation.radius + intersector.radius ) )
            intersected.push( intersector );
    }
    
    if( intersected.length > 0 )
        this.emit( 'intersect' , intersected );
};

/**
var Move = function( animation , v ){
    Fx.call( this );

    this._animation = animation;
    this._current = animation.location;
    this.destination = new Location;
    this.v = v || 0;
    this.state = Fx.STATE_STOP;
};

Util.inherits( Move , Fx );

Move.prototype.disable = function(){
    delete this._animation.move;
    this._current = null;
    this.parent( 'disable' );
};

Move.prototype.setDestination = function( x , y , z ){
    if( this.state === Fx.STATE_DISABLE )
        throw new Error( 'Cant use a disabled fx instance' );

    var destination = this.destination;
    if( x !== undefined ) destination.x = x;
    if( y !== undefined ) destination.y = y;
    if( z !== undefined ) destination.z = z;
};

Move.prototype._compute = function(){
    var ds = Frame.interval * this.v ,
        current = this._current ,
        destination = this.destination ,
        width = destination.x - current.x ,
        height = destination.y - current.y ,
        s = Math.sqrt( width * width + height * height );

    if( s > ds ){
        current.x += Math.round( ds * ( width / s ) );
        current.y += Math.round( ds * ( height / s ) );
    }else{
        current.x = destination.x;
        current.y = destination.y;
        this.state = Fx.STATE_STOP;
        this.emit( 'arrive' );
    }
};

Move.prototype.start = function(){
    if( this.state === Fx.STATE_STOP ){
        this.state = Fx.STATE_RUN;
        this.emit( 'start' );
    }
};

Move.prototype.stop = function(){
    if( this.state === Fx.STATE_RUN ){
        this.state = Fx.STATE_STOP;
        this.emit( 'stop' );
    }
};

*/
