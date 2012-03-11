/**
 * animation class named Toy
 * @author Roy
 */

var Point = function( x , y , z ){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Point.prototype.constructor = Point;

var Rotation = function( arg1 , arg2 ){
    arg2 === undefined ?
        this.setRandian( arg1 || 0 ) :
        this.setSinCos( arg1 , arg2 );
};

Rotation.prototype.constructor = Rotation;

Rotation.prototype.setRandian = function( radian ){
    this.radian = radian;
    this.sin = Math.sin( radian );
    this.cos = Math.cos( radian );
};

Rotation.prototype.setCosSin = function( cos , sin ){
    this.cos = cos;
    this.sin = sin;
    this.radian = Math.asin( sin );

    if( cos < 0 )
        this.radian = Math.PI - this.radian;
};

var Animation = function(){
    this.position = new Point( arguments[1] , arguments[2] , arguments[3] );
    this.rotation = new Rotation( arguments[4] , arguments[5] );
    this.image = arguments[0];
    this.bag = [ this ];
    this.fx = [];
};

Animation.prototype = {};

Animation.prototype.constructor = Animation;

Animation.prototype.lookAt = function( x , y ){
    if( y === undefined ){
        this.rotation.setRandian( x );
        return;
    }

    var point = this.position ,
        rotation = this.rotation ,
        w = x - point.x ,
        h = y - point.y ,
        s = Math.sqrt( w * w + h * h );

    rotation.setCosSin( w / s , h / s );
};

Animation.prototype.draw = function( ctx ){
    var image = this.image ,
        position = this.position ,
        radian = this.rotation.radian ,
        x = position.x - ctx.x ,
        y = position.y - ctx.y;

    if( ( x > 0 ? x < ctx.width: -x < image.width ) &&
        ( y > 0 ? y < ctx.height: -y < image.height ) ){
        ctx.translate( x - ctx.ox , y - ctx.oy );
        ctx.rotate( radian );
        ctx.drawImage( image , -image.ox , -image.oy , image.width , image.height );
        ctx.rotate( -radian );
        ctx.ox = x , ctx.oy = y;
    }
};

var Fx = function( animation ){
    Emitter.call( this );

    this._animation = animation;
    this.state = Fx.STATE_STOP;
};

Util.inherits( Fx , Emitter );

Fx.STATE_READY = 0;
Fx.STATE_RUN = 1;
Fx.STATE_PAUSE = 2;
Fx.STATE_STOP = 3;
Fx.STATE_FINISH = 4;
Fx.STATE_DISABLE = 5;

Fx.prototype.disable = function(){
    this._animation = null;
    this.state = Fx.STATE_DISABLE;
};

Fx.prototype.tick = function(){
    if( this.state === Fx.STATE_RUN )
        this._compute();
};

var Move = function( animation , v ){
    Fx.call( this , animation );
    this._current = animation.position;
    this.destination = new Point;
    this.v = v || 0;
    this.state = Fx.STATE_STOP;
    animation.fx.push( this );
    animation.move = this;
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

var Forward = function( animation , v ){
    Fx.call( this , animation );
    this._current = animation.position;
    this._rotation = animation.rotation;
    this.v = v || 0;
    this.rangeLimit = 0;
    this.timeLimit = 0;
    animation.fx.push( this );
    animation.forward = this;
};

Util.inherits( Forward , Fx );

Forward.prototype.disable = function(){
    delete this._animation.forward;
    this._current = null;
    this._rotation = null;
    this.parent( 'disable' );
};

Forward.prototype.start = function(){
    if( this.state === Fx.STATE_STOP ){
        this.state = Fx.STATE_RUN;
        this.emit( 'start' );
    }
};

Forward.prototype.stop = function(){
    if( this.state === Fx.STATE_RUN ){
        this.state = Fx.STATE_STOP;
        this.emit( 'stop' );
    }
};

Forward.prototype._compute = function(){
    var point = this._current ,
        rotation = this._rotation ,
        ds = Frame.interval * this.v;

    this.range += ds;
    this.time += Frame.interval;

    if( this.rangeLimit > 0 && this.range > this.rangeLimit ){
        ds = this.range - this.rangeLimit;
        this.stop();
    }else if( this.timeLimit > 0 && this.time > this.timeLimit ){
        ds -= ( this.time - this.timeLimit ) * this.v;
        this.stop();
    }

    point.x += rotation.cos * ds;
    point.y += rotation.sin * ds;
};
