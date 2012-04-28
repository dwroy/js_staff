/**
 * @author Roy
 *
 * Animation class
 */

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
        center = this.geometry.center ,
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
    throw new Error( 'Method must be overwrite' );
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
 * @sceneImage SceneImage
 * @velocity float
 */
var Move = function( sceneImage , velocity ){
    Animation.call( this );

    this.geometry = sceneImage.geometry;
    this.rotation = sceneImage.rotation;
    this.sceneImage = sceneImage;
    this.timer = 0;
    this.distance = 0;
    this.velocity = velocity || 0;
    this.timeLimit = 0;
    this.distanceLimit = 0;
    this.state = Animation.STATE_STOP;
};

Util.inherits( Move , Animation );

/**
 * @see Animation.tick
 */
Move.prototype.tick = function( sceneImages ){
    var intersector ,
        intersectors = [] ,
        geometry = this.geometry ,
        sameDepthImages = sceneImages[ geometry.center.z ];
    
    for( var i = 0 ; i < sameDepthImages.length ; i++ ){
        intersector = sameDepthImages[i].geometry;
        if( geometry !== intersector && geometry.isIntersected( intersector ) )
            intersectors.push( sameDepthImages[i] );
    }

    if( intersectors.length > 0 )
        this.emit( 'intersect' , intersectors );
    else
        this.step();
};

Move.prototype.step = function(){
    var coordinate = this.geometry.center ,
        rotation = this.rotation ,
        ds = Frame.interval * this.velocity;

    this.distance += ds;
    this.timer += Frame.interval;

    if( this.distanceLimit > 0 && this.distance >= this.distanceLimit ){
        ds = ds - this.distance + this.distanceLimit;
        this.distance = this.distanceLimit;
        coordinate.x += rotation.cos * ds;
        coordinate.y += rotation.sin * ds;
        this.state = Fx.STATE_FINISH;
        this.emit( 'arrive' );
        return;
    }

    if( this.timeLimit > 0 && this.timer > this.timeLimit ){
        this.emit( 'timeout' );
        return;
    }

    coordinate.x += rotation.cos * ds;
    coordinate.y += rotation.sin * ds;
};