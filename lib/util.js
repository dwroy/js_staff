/**
 * helpers    
 * @author Roy
 */

var Util = {} ,
    RequestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame;

/**
 * inherit
 */
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

Util.slice = Array.prototype.slice;

/**
 * bind method to a scope
 */
Function.prototype.bind = function( scope ){
    var me = this ,
        args = Array.prototype.slice.call( arguments, 1 );

    return function(){return me.apply( scope , args );};
};

Function.prototype.parent = function(){
    this.superConstructor.prototype[ arguments[0] ]
        .apply( this , Array.prototype.slice.call( arguments , 1 ) );
};
