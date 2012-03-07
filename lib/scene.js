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
        var brick , actions , action , nextActions;

        while( ( brick = this.actionBag.pop() ) ){
            actions = brick.actions;
            nextActions = [];

            while( ( action = actions.pop() ) ){
                if( action[0] && action[0].apply( brick , Array.prototype.slice.call( action , 1 ) ) )
                    nextActions.push( action );
            }

            brick.actions = nextActions;
        }
    }
};
