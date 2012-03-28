/**
 * @author Roy
 */
var Scene = function(){
    this.fx = [];
    this.filmFx = [];
    this.filmAnimations = [];
    this.filmIntersectors = [];
};

Scene.prototype = {

    constructor: Scene,

    add: function( arg , fx ){
        if( arg instanceof Animation ){
            var location = arg.location;

            this.filmAnimations[ location.z ] ?
                this.filmAnimations[ location.z ].push( arg ) :
                this.filmAnimations[ location.z ] = [ arg ]; 

            if( arg.collisional ){
                this.filmIntersectors[ location.z ] ?
                    this.filmIntersectors[ location.z ].push( arg ) :
                    this.filmIntersectors[ location.z ] = [ arg ];

                if( fx instanceof Fx ){
                    this.filmFx[ location.z ] ?
                        this.filmFx[ location.z ].push( fx ) :
                        this.filmFx[ location.z ] = [ fx ];
                }
            }
        }else if( arg instanceof Fx )
            this.fx.push( arg );
    },

    perform: function(){
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
    }
};