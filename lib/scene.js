/**
 * @author Roy
 */
var Scene = function(){
    this.fx = [];
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
        }
    },

    perform: function(){
        var f , 
            fx = this.fx;

        while( ( f = fx.pop() ) && f.state === Fx.STATE_RUN  ){
            f.tick(  );
        }
    },

    checkCollision: function(){
        var filmBag = this.filmBag ,
            depth = filmBag.length ,
            depthIndex = 0 ,
            i = 0 ,
            animation;

        for( ; depthIndex < depth ; depthIndex++ ){
            animations = filmBag[depthIndex];

            for( ; i < animations.length ; i++ ){
                animation = animations[i];
            }
        }
    }
};