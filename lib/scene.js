/**
 * @author Roy
 */
var Scene = function(){
    this.actionBag = [];
    this.bag = [];
};

Scene.prototype = {

    constructor: Scene,

    add: function( toy ){
        if( toy instanceof Brick ){
            this.bag[ toy.z ] ? this.bag[ toy.z ].push( toy ) : this.bag[ toy.z ] = [ toy ]; 

            if( toy.actions )
                this.actionBag.push( toy );
        }
    },

    perform: function(){
        var toy , actions , action , nextActions;

        while( ( toy = this.actionBag.pop() ) ){
            actions = toy.actions;
            nextActions = [];

            while( ( action = actions.pop() ) ){
                if( action[0] && toy[ action[0] ]( action[1] ) )
                    nextActions.push( action );
            }

            toy.actions = nextActions;
        }
    }
};
