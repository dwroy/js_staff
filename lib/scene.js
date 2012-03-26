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
            var location = animation.location;

            this.filmAnimations[ location.z ] ?
                this.filmAnimations[ location.z ].push( animation ) :
                this.filmAnimations[ location.z ] = [ animation ]; 

            if( animation.collision ){
                this.filmCollisions[ location.z ] ?
                    this.filmCollisions[ location.z ].push( animation ) :
                    this.filmCollisions[ location.z ] = [ animation ];
            }
        }
    },

    perform: function(){
        var fx;

        while( ( fx = this.fx.pop() ) && fx.state === Fx.STATE_RUN  ){
            fx.tick();
        }
    },

    getCoveredCells: function( animation ){
        geometry.getCoveredCells( this.cellWidth , this.cellHeight );
    }
};
