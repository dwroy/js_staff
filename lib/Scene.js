/**
 * @author Roy
 */

var Scene = function(){
    this.intersectors = [];
    this.animations = [];
};

Scene.prototype = {};
Scene.prototype.constructor = Scene;

/**
 * @sceneImage SceneImage
 */
Scene.prototype.addImage = function( geometry ){
    var coordinate = geometry.center;

    this.intersectors[ coordinate.z ] ?
        this.intersectors[ coordinate.z ].push( geometry ) :
        this.intersectors[ coordinate.z ] = [ geometry ];
};

/**
 * run all the animations
 */
Scene.prototype.perform = function(){
    var animation ,
        animations = this.animations;

    while( ( animation = animations.pop() ) &&
            animation.state === Animation.STATE_RUN )
        animation.tick( this.intersectors );
};
