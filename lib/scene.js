/**
 * @author Roy
 */
var Scene = function(){
    this._fxBag = [];
    this.filmBag = [];
};

Scene.prototype = {

    constructor: Scene,

    add: function( animation ){
        if( animation instanceof Animation ){
            var position = animation.position;

            this.filmBag[ position.z ] ?
                this.filmBag[ position.z ].push( animation ) : 
                this.filmBag[ position.z ] = [ animation ]; 

            this._fxBag.push( animation.fx );
        }
    },

    perform: function(){
        var i , fx , f;

        while( ( fx = this._fxBag.pop() ) ){
            for( i = 0; i < fx.length; i++ ){
                if( ( f= fx[i] ) )
                    f.state === Move.STATE_DISABLE ?  fx[i] = undefined : f.tick();
            }
        }
    }
};
