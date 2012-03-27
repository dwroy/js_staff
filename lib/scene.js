/**
 * @author Roy
 */
var Scene = function(){
    this.fx = [];
    this.filmFx = [];
    this.filmAnimations = [];
    this.filmImpactors = [];
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
                this.filmImpactors[ location.z ] ?
                    this.filmImpactors[ location.z ].push( arg ) :
                    this.filmImpactors[ location.z ] = [ arg ];

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
        var i , fxList , fx , impactors;

        while( ( fx = this.fx.pop() ) && fx.state === Fx.STATE_RUN )
            fx.tick();

        for( i = 0 ; i < this.filmFx.length ; i++ ){
            fxList = this.filmFx[i];
            impactors = this.filmImpactors[i];
            this.filmImpactors = [];

            while( ( fx = fxList.pop() ) && fx.state === Fx.STATE_RUN ){
                fx.tick();
                fx.checkCollisions( impactors );
            }
        }
    }
};