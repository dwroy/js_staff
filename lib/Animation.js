/**
 * @author Roy
 *
 * Animation class
 */

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
Move.prototype.tick = function( intersectors ){
    var intersector,
        intersected = [],
        geometry = this.geometry,
        sameDepth = intersectors[ geometry.center.z ];
    
    for( var i = 0 , l = sameDepth.length ; i < l ; i++ ){
        intersector = sameDepth[i].geometry;
        if( geometry !== intersector && geometry.isIntersected( intersector ) )
            intersected.push( intersector );
    }

    if( intersected.length > 0 )
        this.emit( 'intersect' , intersected );
    else
        this.step();
};

Move.prototype.step = function(){
    var coordinate = this.geometry.center ,
        rotation = this.rotation ,
        ds = Frame.interval * this.velocity;

    this.distance += ds;
    this.timer += Frame.interval;

    if( this.distanceLimit > 0 ){
        if( this.distance === this.distanceLimit ) return;

        if( this.distance > this.distanceLimit ){
            ds = ds - this.distance + this.distanceLimit;
            this.distance = this.distanceLimit;
            coordinate.x += rotation.cos * ds;
            coordinate.y += rotation.sin * ds;
            this.state = Fx.STATE_FINISH;
            this.emit( 'arrive' );
            return;
        }
    }

    if( this.timeLimit > 0 && this.timer > this.timeLimit ){
        this.emit( 'timeout' );
        return;
    }

    coordinate.x += rotation.cos * ds;
    coordinate.y += rotation.sin * ds;
};