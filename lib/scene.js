/**
 * @author Roy
 */
var Scene = function(){
    this.fx = [];
    this.filmAnimations = [];
};

Scene.prototype = {

    constructor: Scene,

    add: function( animation ){
        if( animation instanceof Animation ){
            var position = animation.position;
            this.filmAnimations[ position.z ] ?
                this.filmAnimations[ position.z ].push( animation ) : 
                this.filmAnimations[ position.z ] = [ animation ]; 
            this.filmCollisions[ position.z ] ?
                this.filmCollisions[ position.z ].push( animation ) :
                this.filmCollisions[ position.z ] = [ animation ];
        }
    },

    perform: function(){
        var fx;

        while( ( fx = this.fx.pop() ) && fx.state === Fx.STATE_RUN  ){
            fx.tick(  );
        }
    },

    checkCollision: function(){
        var filmAnimations = this.filmAnimations ,
            depth = filmAnimations.length ,
            depthIndex = 0 ,
            i = 0 ,
            animation;

        for( ; depthIndex < depth ; depthIndex++ ){
            animations = filmAnimations[depthIndex];

            for( ; i < animations.length ; i++ ){
                animation = animations[i];
            }
        }
    }
};
