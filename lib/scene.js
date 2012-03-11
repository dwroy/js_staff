/**
 * @author Roy
 */
var Scene = function(){
    this._actionBag = [];
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

            this._actionBag.push( animation.actions );
        }
    },

    perform: function(){
        var i , action , actions;

        while( ( actions = this._actionBag.pop() ) ){
            for( i = 0; i < actions.length; i++ ){
                if( ( action = actions[i] ) )
                    action.state === Move.STATE_DISABLE ?  actions[i] = undefined : action.tick();
            }
        }
    }
};
