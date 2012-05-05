/**
 * @author Roy
 */

var Scene = function(){
    this.objects2D = [];
    this.intersectors = [];
    this.animations = [];
};

Scene.prototype = {};
Scene.prototype.constructor = Scene;

/**
 * @sceneImage SceneImage
 */
Scene.prototype.addImage = function( object2D ){
    var geometry = object2D.geometry,
        coordinate = geometry.center;

    this.objects2D[ coordinate.z ] ?
        this.objects2D[ coordinate.z ].push( object2D ) :
        this.objects2D[ coordinate.z ] = [ object2D ];

    if( object2D.intersected ){
        this.intersectors[ coordinate.z ] ?
            this.intersectors[ coordinate.z ].push( geometry ) :
            this.intersectors[ coordinate.z ] = [ geometry ];
    }
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
