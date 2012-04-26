/**
 * @author Roy
 */

var Scene = function(){
    this.images = [];
    this.animations = [];
};

Scene.prototype = {};
Scene.prototype.constructor = Scene;

/**
 * @sceneImage SceneImage
 */
Scene.prototype.addImage = function( sceneImage ){
    var coordinate = sceneImage.geometry.center;

    this.images[ coordinate.z ] ?
        this.images[ coordinate.z ].push( sceneImage ) :
        this.images[ coordinate.z ] = [ sceneImage ];
};

/**
 * run all the animations
 */
Scene.prototype.perform = function(){
    var animation ,
        animations = this.animations;

    while( ( animation = animations.pop() ) &&
            animation.state === Animation.STATE_RUN )
        animation.tick( this.images );
};
