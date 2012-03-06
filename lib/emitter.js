var Emitter = function(){
    this._events = {};
};

Emitter.prototype = {

    constructor: Emitter,
    
    on: function( name , handler , scope ){
        if( handler instanceof Function ){
            handler._scope = scope || this;
            this._events[ name ] ? this._events[ name ].push( handler ) : this._events[ name ] = [ handler ];
        }
    },

    emit: function( name ){
        var l , 
            i = 0 , 
            handlers = this._events[ name ];

        if( handlers && ( l = handlers.length ) > 0 ){
            for( ;i < l;i++ )
                handlers[i].apply( handlers[i]._scope , Array.prototype.slice.call( arguments , 1 ) );
        }
    }
};