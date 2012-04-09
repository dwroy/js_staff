/**
 * event emitter, allow add triggers to specified events
 * @author Roy
 */

var Emitter = function(){
    this._events = {};
};

Emitter.prototype = {

    constructor: Emitter,
    
    /**
     * add an handler
     */
    on: function( name , handler , scope ){
        if( handler instanceof Function ){
            handler._scope = scope || this;
            this._events[ name ] ? this._events[ name ].push( handler ) : this._events[ name ] = [ handler ];
        }
    },

    /**
     * trigger the handlers
     */
    emit: function( name ){
        var l , 
            i = 0 , 
            handlers = this._events[ name ];

        if( handlers && ( l = handlers.length ) > 0 ){
            for( ;i < l;i++ )
                handlers[i].apply( handlers[i]._scope , Util.slice.call( arguments , 1 ) );
        }
    }
};

window._events = {};
window.on = Emitter.prototype.on;
window.emit = Emitter.prototype.emit;
window.onload = function(){ this.emit( 'load' ); };