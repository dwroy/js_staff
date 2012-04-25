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
    var coordinate = sceneImage.coordinate;

    this.images[ coordinate.z ] ?
        this.images[ coordinate.z ].push( sceneImage ) :
        this.images[ coordinate.z ] = [ sceneImage ]; 
};

/**
 * @animation Animation
 */
Scene.prototype.addAnimation = function( animation ){
    
};

Scene.prototype.perform = function(){
    var i , fxList , fx , intersectors;

    while( ( fx = this.fx.pop() ) && fx.state === Fx.STATE_RUN )
        fx.tick();

    for( i = 0 ; i < this.filmFx.length ; i++ ){
        fxList = this.filmFx[i];
        intersectors = this.filmIntersectors[i];
        this.filmIntersectors = [];

        while( ( fx = fxList.pop() ) && fx.state === Fx.STATE_RUN ){
            fx.tick();
            fx.checkCollisions( intersectors );
        }
    }
};
