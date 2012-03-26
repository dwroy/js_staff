/**
 * @author Roy
 */

var Location = function( x , y , z ){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Location.prototype = {};

Location.prototype.constructor = Location;

/**
 * Rotation
 *  randian => 
 *  sin 
 *  cos
 */
var Rotation = function( arg1 , arg2 ){
    arg2 === undefined ?
        this.setRandian( arg1 || 0 ) :
        this.setSinCos( arg1 , arg2 );
};

Rotation.prototype = {};

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

    if( cos < 0 ) this.radian = Math.PI - this.radian;
};

Rotation.prototype.set = function( rotation ){
    if( rotation instanceof Rotation ){
        this.cos = rotation.cos;
        this.sin = rotation.sin;
        this.radian = rotation.radian;
    }else
        throw new Error( 'Must be an instance of Rotation' );
}

var Geometry = function(){

};

Geometry.prototype = {};

Geometry.prototype.constructor = Geometry;

var Round = function( radius ){
    Geometry.call( this );

    this.radius = radius || 0;
};

Util.inherits( Round , Geometry );

var Animation = function( image ){
    this.location = new Location( arguments[1] , arguments[2] , arguments[3] );
    this.rotation = new Rotation( arguments[4] , arguments[5] );
    this.element = image;
    this.radius = image.radius;
    this.collision = true;
};

Animation.prototype = {};

Animation.prototype.constructor = Animation;

Animation.prototype.lookAt = function( x , y ){
    if( y === undefined ){
        this.rotation.setRandian( x );
        return;
    }

    var location = this.location ,
        w = x - location.x ,
        h = y - location.y ,
        s = Math.sqrt( w * w + h * h );

    this.rotation.setCosSin( w / s , h / s );
};

Animation.prototype.render = function( ctx ){
    var image = this.element ,
        location = this.location ,
        radian = this.rotation.radian ,
        x = location.x - ctx.x ,
        y = location.y - ctx.y;

    if( ( x > 0 ? x < ctx.width: -x < image.width ) &&
        ( y > 0 ? y < ctx.height: -y < image.height ) ){

        ctx.translate( x - ctx.ox , y - ctx.oy );
        ctx.rotate( radian );
        ctx.drawImage( image , -image.ox , -image.oy , image.width , image.height );
        ctx.rotate( -radian );
        ctx.ox = x , ctx.oy = y;
    }
};

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

var Forward = function( animation , v , maxRange ){
    Fx.call( this );

    this.v = v;
    this.maxRange = maxRange || 0;
    this.range = 0;
    this.animation = animation;
    this.state = Fx.STATE_STOP;
};

Util.inherits( Forward , Fx );

Forward.prototype.start = function(){
    if( this.state === Fx.STATE_STOP )
        this.state = Fx.STATE_RUN;
};

Forward.prototype.stop = function(){
    if( this.state === Fx.STATE_RUN )
        this.state = Fx.STATE_STOP;
};

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

    location.x += rotation.cos * ds;
    location.y += rotation.sin * ds;
};


var Bomb = function( image , v , maxRange ){
    Forward.call( this , new Animation( image ) , v , maxRange ); 
};

Util.inherits( Bomb , Forward , new Forward( new Animation( { raidus: 0 } ) ) );

Bomb.prototype.setLocation = function( x , y , z ){
    var location = this.animation.location;
    if( x !== undefined ) location.x = x;
    if( y !== undefined ) location.y = y;
    if( z !== undefined ) location.z = z;
};

Bomb.prototype.setRotation = function( radian , cos , sin ){
    var rotation = this.animation.rotation;
    rotation.cos = cos;
    rotation.sin = sin;
    rotation.radian = radian;
};

Bomb.prototype.attach = function( scene ){
    scene.add( this.animation , this );
};

var Cannon = function( bombClass , bombImage , v , maxRange , size , loadTime ){
    Fx.call( this );

    this.loaded = [];
    this.fired = [];
    this.exploded = [];
    this.v = v;
    this.maxRange = maxRange;

    this.size = size - 1;
    this.loadTime = loadTime;
    this.bombClass = bombClass;
    this.bombImage = bombImage;
    this.state = Fx.STATE_STOP;
    this._lastLoadTime = 0;
};

Util.inherits( Cannon , Fx );

Cannon.prototype.start = function(){
    if( this.state === Fx.STATE_STOP )
        this.state = Fx.STATE_RUN;
};

Cannon.prototype.stop = function(){
    if( this.state === Fx.STATE_RUN )
        this.state = Fx.STATE_STOP;
};

Cannon.prototype.fire = function(){
    var bomb = this.loaded.pop();

    if( bomb ){
        bomb.setLocation( this.location.x , this.location.y );
        bomb.animation.rotation.set( this.rotation );
        bomb.start();
        this.fired.push( bomb );
    }
};

Cannon.prototype.attach = function( scene ){
    var bomb , 
        update = [];

    while( ( bomb = this.fired.pop() ) ){
        if( bomb.state === Fx.STATE_RUN ){
            update.push( bomb );
            bomb.attach( scene );
        }
    }

    scene.add( this );
    this.fired = update;
};

Cannon.prototype.tick = function(){
    var bomb;

    if( this.loaded.length < this.size &&
        ( this._lastLoadTime + this.loadTime ) <= Frame.startTime ){

        bomb = new this.bombClass( this.bombImage , this.v , this.maxRange );
        bomb.owner = this;
        this.loaded.push( bomb );
        this._lastLoadTime = Frame.startTime;
    }
};

var Tank = function( image , v , maxRange ){
    Forward.call( this , new Animation( image ) , v , maxRange ); 
};

Util.inherits( Tank , Forward , new Forward( new Animation( { raidus: 0 } ) ) );

Tank.prototype.mount = function( cannon ){
    this.cannon = cannon;
    cannon.location = this.animation.location;
    cannon.rotation = this.animation.rotation;
    cannon.start();
};

Tank.prototype.run = function( x , y ){
    this.animation.lookAt( x , y );
    this.start();
};

Tank.prototype.attach = function( scene ){
    scene.add( this.animation , this );
    this.cannon.attach( scene );
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
