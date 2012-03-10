/**
 * @author Roy
 */
var Scene = function(){
    this.actionBag = [];
    this.bag = [];
};

Scene.prototype = {

    constructor: Scene,

    add: function( brick ){
        if( brick instanceof Brick ){
            this.bag[ brick.z ] ? this.bag[ brick.z ].push( brick ) : this.bag[ brick.z ] = [ brick ]; 

            if( brick.actions )
                this.actionBag.push( brick );
        }
    },

    perform: function(){
        var action , actions;

        while( ( actions = this.actionBag.pop().actions ) ){
            for( action in actions ) 
              action.animationFrame();
        }
    }
};
