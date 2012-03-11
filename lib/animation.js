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

var Animation = function( image , x , y , z ){
    this.position = new Point( x , y , z );
    this.rotation = 0;
    this.image = image;
    this.actions = [];
};

Animation.prototype.constructor = Animation;

Animation.prototype.draw = function( ctx ){
    var image = this.image ,
        position = this.position ,
        x = position.x - ctx.x ,
        y = position.y - ctx.y;

    if( ( x > 0 ? x < ctx.width: -x < image.width ) &&
        ( y > 0 ? y < ctx.height: -y < image.height ) ){
        ctx.translate( x - ctx.ox , y - ctx.oy );
        ctx.rotate( this.rotation );
        ctx.drawImage( image , -image.ox , -image.oy , image.width , image.height );
        ctx.rotate( -this.rotation );
        ctx.ox = x , ctx.oy = y;
    }
};

var Move = function( animation , v ){
    Emitter.call( this );
    this._animation = animation;
    this._current = animation.position;
    this.destination = new Point;
    this.v = v || 0;
    this.state = Move.STATE_FINISH;
    animation.actions.push( this );
    animation.move = this;
};

Util.inherits( Move , Emitter );

Move.STATE_READY = 0;
Move.STATE_RUN = 1;
Move.STATE_STOP = 2;
Move.STATE_FINISH = 3;
Move.STATE_DISABLE = 4;

Move.prototype.disable = function(){
    delete this._animation.move;
    this._animation = null;
    this._current = null;
    this.state = Move.STATE_DISABLE;
};

Move.prototype.setDestination = function( x , y , z ){
    if( this.state === Move.STATE_DISABLE )
        throw new Error( 'Cant use a disabled fx instance' );

    var destination = this.destination;
    if( x !== undefined ) destination.x = x;
    if( y !== undefined ) destination.y = y;
    if( z !== undefined ) destination.z = z;
    this.state = Move.STATE_READY;
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
        this.state = Move.STATE_FINISH;
        this.emit( 'finish' );
    }
};

Move.prototype.start = function(){
    if( this.state === Move.STATE_READY || this.state === Move.STATE_STOP ){
        this.state = Move.STATE_RUN;
        this.emit( 'start' );
    }
};

Move.prototype.stop = function(){
    if( this.state === Move.STATE_RUN ){
        this.state = Move.STATE_STOP;
        this.emit( 'stop' );
    }
};

Move.prototype.tick = function(){
    if( this.state === Move.STATE_RUN ){
        this._compute();
    }
};
