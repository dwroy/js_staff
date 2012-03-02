var Emitter , WsClient , Controller , $ ,
    Controllers = {} ,
    Util = {};

Util.inherits = function( constructor , superConstructor ){
    var p ,
        prototype = new superConstructor;

    for( p in prototype )
        if( !prototype[p] instanceof Function )
            delete prototype[p];

    prototype.constructor = constructor;
    prototype.superConstructor = superConstructor;
    constructor.prototype = prototype;
};

Emitter = function(){
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
            events = this._events[ name ];

        if( events && ( l = events.length ) > 0 )
            for( ;i < l;i++ )
                events[i].apply( events[i]._scope , Array.prototype.slice.call( arguments , 1 ) );
    }
};

WsClient = function( url ){
    var ws ,
        me = this ,
        WsClass = window.WebSocket || window.MozWebSocket;

    Emitter.call( this );
    ws = new WsClass( url );

    ws.onopen = function( event ){
        me.emit( 'open' , event );
    };

    ws.onmessage = function( event ){
        me.emit( 'data' , event );
    };

    ws.onerror = function( event ){
        me.emit( 'error' , event );
    };

    ws.onclose = function( event ){
        me.emit( 'close' , event );
    };

    this._ws = ws;
};

Util.inherits( WsClient , Emitter );

WsClient.prototype.send = function( data ){
    this._ws.send( data );
};

WsClient.prototype.sendJson = function( data ){
    this._ws.send( JSON.stringify( data ) );
};

Controller = function( data , time , connection ){
    this.time = time;
    this._data = data;
    this._connection = connection;
};

Controller. prototype = {
    
    constructor: Controller,

    send: function( route , data ){
        this._connection.sendJson( [ route , data || '' ] );
    }
};

$ = function( id ){
    return document.getElementById( id );
}
