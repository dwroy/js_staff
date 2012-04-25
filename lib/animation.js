/**
 * @author Roy
 *
 * Animation class
 */

/**
 * @arg1 float radian or cos value
 * @arg2 float sin value
 */
var Rotation = function( arg1 , arg2 ){
    arg2 === undefined ?
        this.setRandian( arg1 || 0 ) :
        this.setCosSin( arg1 , arg2 );
};

Rotation.prototype = {};
Rotation.prototype.constructor = Rotation;

/**
 * @radian radian of rotation
 */
Rotation.prototype.setRandian = function( radian ){
    this.radian = radian;
    this.sin = Math.sin( radian );
    this.cos = Math.cos( radian );
};

/**
 * @cos float cos of radian
 * @sin float sin of radian
 */
Rotation.prototype.setCosSin = function( cos , sin ){
    this.cos = cos;
    this.sin = sin;
    this.radian = Math.asin( sin );

    if( cos < 0 ) this.radian = Math.PI - this.radian;
};

/**
 * @rotation Rotation
 */
Rotation.prototype.set = function( rotation ){
    if( rotation instanceof Rotation ){
        this.cos = rotation.cos;
        this.sin = rotation.sin;
        this.radian = rotation.radian;
    }else
        throw new Error( 'Must be an instance of Rotation' );
};

/**
 * base image class
 *
 * @image Image
 */
var SceneImage = function( geometry , rotation ){
    this.geometry = geometry;
    this.rotation = rotation;
};

SceneImage.prototype = {};
SceneImage.prototype.constructor = SceneImage;

/**
 * @x float
 * @y float
 */
SceneImage.prototype.face = function( x , y ){
    if( y === undefined )
        this.rotation.setRandian( x );
    else{
        var center = this.circle.center ,
            w = x - center.x ,
            h = y - center.y ,
            s = Math.sqrt( w * w + h * h );

        this.rotation.setCosSin( w / s , h / s );
    }
};

/**
 * @ctx Canvas2dContext
 */
SceneImage.prototype.draw = function( ctx ){
    var image = this.image ,
        radian = this.rotation.radian ,
        center = this.circle.center ,
        x = center.x - ctx.coordinate.x ,
        y = center.y - ctx.coordinate.y;

    if( ( x > 0 ? x < ( ctx.width + image.ox ) : -x < ( image.width + image.ox ) ) &&
        ( y > 0 ? y < ( ctx.height + image.oy ) : -y < ( image.height + image.oy ) ) ){

        ctx.translate( x - ctx.ox , y - ctx.oy );
        ctx.rotate( radian );
        ctx.drawImage( image , -image.ox , -image.oy , image.width , image.height );
        ctx.rotate( -radian );
        ctx.ox = x , ctx.oy = y;
    }
};

/**
 * Animation class implements animations inherits from Emitter
 */
var Animation = function(){
    Emitter.call( this );
};

Util.inherits( Animation , Emitter );

Animation.STATE_READY = 0;
Animation.STATE_RUN = 1;
Animation.STATE_PAUSE = 2;
Animation.STATE_STOP = 3;
Animation.STATE_FINISH = 4;
Animation.STATE_DISABLE = 5;

/**
 * this method will run on every frame since the instance added to scene
 * and state set to Animation.STATE_RUN
 */
Animation.prototype.tick = function(){
    throw new Error( 'Method must be implemented' );
};

/**
 * set state to Animation.STATE_RUN
 */
Animation.prototype.start = function(){
    if( this.state === Animation.STATE_STOP )
        this.state = Animation.STATE_RUN;
};

/**
 * set state to Animation.STATE_STOP
 */
Animation.prototype.stop = function(){
    if( this.state === Animation.STATE_RUN )
        this.state = Animation.STATE_STOP;
};

/**
 * @animation Animation
 */
var Move = function( sceneImage , v ){
    Animation.call( this );

    this.coordinate = sceneImage.coordinate;
    this.rotation = sceneImage.rotation;
    this.sceneImage = sceneImage;
    this.timer = 0;
    this.odometer = 0;
    this.velocity = v || 0;
    this.state = Animation.STATE_STOP;
};

Util.inherits( Move , Animation );

/**
 * @see Animation.tick
 */
Move.prototype.tick = function(){

};
