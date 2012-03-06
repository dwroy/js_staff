var Scene = function(){
    this.actions = [];
    this.objects = [];
};

Scene.prototype = {

    constructor: Scene,

    add: function( object ){
        this.actions[object.id] = object;
        this.objects[ object.z ] ? this.objects[ object.z ].push( object ) : this.objects[ object.z ] = [ object ];
    },

    perform: function()
    {
        var object , actions , action , nextActions;

        while( ( object = this.actions.pop() ) )
        {
            actions = object.actions;
            nextActions = [];

            while( ( action = actions.pop() ) )
            {
                if( action[0] && object[ action[0] ]( action[1] ) )
                {
                    nextActions.push( action );
                }
            }

            object.actions = nextActions;
        }
    },

    getGrid: function( x , y , z )
    {
        
    },

    reachable: function()
    {

    }
};
