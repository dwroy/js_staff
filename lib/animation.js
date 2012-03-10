/**
 * animation class named Toy
 * @author Roy
 */

var Animation = function( image , x , y , z ){
    Brick.call( this , image , x , y , z );

    this.actions = [];
};

Util.inherits( Animation , Brick );

var Move = function(){
    Emitter.call( this );
    this.state = Move.STATE_READY;
};

Util.inherits( Move , Emitter );

Move.STATE_READY = 0;
Move.STATE_RUN = 1
Move.STATE_PAUSE = 2;
Move.STATE_STOP = 3;

Move.prototype.init = function( options ){
    if( options.angle > 0 ){
        this._sin = Math.sin( options.angle );
        this._cos = Math.cos( options.angle );
        this._method = this._byAngle;
    }else{
        this._x = options.x;
        this._y = options.y;
        this._method = this._toPoint;
    }

    this.v = options.v;
};

Move.prototype._byAngle = function(){
    var ds = Frame.interval * this.v;
    this._brick.x += Math.round( ds * this._cos );
    this._brick.y += Math.round( ds * this._sin );
};

Move.prototype._toPoint = function(){
    var ds = Frame.interval * this.v ,
        brick = this._brick ,
        width = this.x - brick.x ,
        height = this.y - brick.y ,
        s = Math.sqrt( width * width + height * height );

    if( s > ds ){
        brick.x += Math.round( ds * ( width / s ) );
        brick.y += Math.round( ds * ( height / s ) );
    }else{
        brick.x = this.x;
        brick.y = this.y;
        this.stop();
    }
};

Move.prototype.start = function(){
    if( this.state === Move.STATE_READY )
        this.state = Move.STATE_RUN;
};

Move.prototype.pause = function(){
    if( this.state === Move.STATE_RUN )
        this.state = Move.STATE_PAUSE;
};

Move.prototype.resume = function(){
    if( this.state === Move.STATE_PAUSE )
        this.state = Move.STATE_RUN;
};

Move.prototype.stop = function(){

};

Move.prototype.turn = function(){

};

Move.prototype.frame = function(){
    if( this.state === Move.STATE_RUN ){
        this._method();
    }
};