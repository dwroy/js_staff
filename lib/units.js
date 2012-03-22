/**
 * cannon
 */
var Cannon = function(){
    Fx.call( this );

    this._firedBombs = [];
    this._chamber = [];
};

Util.inherits( Cannon , Fx );

Cannon.prototype.initialize = function( bombClass , size , loadTime ){
    var i , bomb;

    this.size = size;
    this.loadTime = loadTime;
    this._chamber.length = 0;
    this._bombClass = bombClass;
    this._lastLoadTime = 0;

    for( i = 0; i < this.size; i++ ){
        bomb = bombClass.get();
        bomb.owner = this;
        this._chamber.push( bomb );
    }
};

Cannon.prototype.start = function(){
    if( this.state === Fx.STATE_STOP )
        this.state = Fx.STATE_RUN;
};

Cannon.prototype.stop = function(){
    if( this.state === Fx.STATE_RUN )
        this.state = Fx.STATE_STOP;
};

Cannon.prototype.fire = function(){
    var bomb = this.chamber.pop();

    if( bomb ){
        this.firedBombs.push( bomb );
        bomb.start();
    }
};

Cannon.prototype.getFiredBombs = function(){

};

Cannon.prototype.tick = function(){
    if( this.state === Fx.STATE_RUN &&
        this.chamber.size < this.size &&
        ( this._lastLoadTime + this.loadTime ) >= Frame.startTime ){

        this._chamber.push( this._bombClass.get() );
        this._lastLoadTime = Frame.startTime;
    }
};

var Bomb = function(){
    Fx.call( this );

    this.animation = new Animation( Bomb.image );
    this.range = 0;
    this.state = Fx.STATE_STOP;
};

Bomb.image = images.get( 6 );
Bomb.v = 0.5;
Bomb.maxRange = 500;
Bomb.fired = [];
Bomb.exploded = [];

Bomb.get = function(){
    var bomb = this.bin.pop();

    if( bomb ){
        bomb.range = 0;
    }else{
        bomb = new Bomb;
    }

    return bomb;
};

Util.inherits( Bomb , Fx );

Bomb.prototype.start = function(){
    if( this.state === Fx.STATE_STOP )
        this.state = Fx.STATE_RUN;
};

Bomb.prototype.stop = function(){
    if( this.state === Fx.STATE_RUN )
        this.state = Fx.STATE_STOP;
};

Bomb.prototype.tick = function(){
    var rotation , position , ds;

    if( this.state === Fx.STATE_RUN ){
        rotation = this.animation.rotation;
        position = this.animation.position;
        ds = Bomb.v * Frame.interval;
        this.range += ds;

        if( this.range > Bomb.maxRange ){
            ds = ds - this.range + Bomb.maxRange;
            this.range = Bomb.maxRange;
            this.state = Fx.STATE_STOP;
            Bomb.exploded.push( this );
        }

        position.x += ds * rotation.cos;
        position.y += ds * rotation.sin;
    }
};

var Tank = function(){
    Fx.call( this );

    this.animation = new Animation( images.get( 5 ) );
};

Util.inherits( Tank , Fx );

Tank.prototype.assembly = function( cannon ){
    this.cannon = cannon;
    cannon.rotation = this.rotation;
};