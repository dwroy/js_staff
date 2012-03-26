/**
 * @author Roy
 */
var Scene = function( cellWidth , cellHeight ){
    this.cellWidth = cellWidth || 5;
    this.cellHeight = cellHeight || this.cellWidth;
    this.fx = [];
    this.filmAnimations = [];
    this.filmCollisions = [];
};

Scene.prototype = {

    constructor: Scene,

    add: function( animation ){
        if( animation instanceof Animation ){
            var position = animation.position;

            this.filmAnimations[ position.z ] ?
                this.filmAnimations[ position.z ].push( animation ) :
                this.filmAnimations[ position.z ] = [ animation ]; 

            if( animation.collision ){
                this.filmCollisions[ position.z ] ?
                    this.filmCollisions[ position.z ].push( animation ) :
                    this.filmCollisions[ position.z ] = [ animation ];
            }
        }
    },

    perform: function(){
        var fx;

        while( ( fx = this.fx.pop() ) && fx.state === Fx.STATE_RUN  ){
            fx.tick();
        }
    },

    getCoveredCells: function(  ){

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
