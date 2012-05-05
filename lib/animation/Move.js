/**
 * @author Roy
 * 
 */

/**
 * @object2D Object2D
 * @velocity float
 */
var Move = function( object2D , velocity ){
    Animation.call( this );

    this.geometry = object2D.geometry;
    this.rotation = object2D.rotation;
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
        intersector = sameDepth[i];
        if( geometry !== intersector && geometry.isIntersected( intersector ) )
            intersected.push( intersector );
    }

    if( intersected.length > 0 )
        this.emit( 'intersect' , intersected );
    else
        this.step();
};

Move.prototype.step = function(){
    var center = this.geometry.center ,
        rotation = this.rotation ,
        ds = Frame.interval * this.velocity;

    this.distance += ds;
    this.timer += Frame.interval;

    if( this.distanceLimit > 0 ){
        if( this.distance === this.distanceLimit ) return;

        if( this.distance > this.distanceLimit ){
            ds = ds - this.distance + this.distanceLimit;
            this.distance = this.distanceLimit;
            center.x += rotation.cos * ds;
            center.y += rotation.sin * ds;
            this.state = Fx.STATE_FINISH;
            this.emit( 'arrive' );
            return;
        }
    }

    if( this.timeLimit > 0 && this.timer > this.timeLimit ){
        this.emit( 'timeout' );
        return;
    }

    center.x += rotation.cos * ds;
    center.y += rotation.sin * ds;
};

