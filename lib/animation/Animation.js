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