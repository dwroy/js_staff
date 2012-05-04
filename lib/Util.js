/**
 * helpers
 * 
 * @author Roy
 */

var Util = {} , 
        RequestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame || function( callback ){
            setTimeout( callback , 1000 / 60 );
        };


Util.slice = Array.prototype.slice;

/**
Util.slice = Array.prototype.slice;
 * inherit
 */
Util.inherits = function( constructor , superConstructor , prototype ){
    var p;
    prototype = prototype || new superConstructor;

    for( p in prototype )
        if( !prototype[ p ] instanceof Function )
            delete prototype[ p ];

    prototype.constructor = constructor;
    prototype.superConstructor = superConstructor;
    constructor.prototype = prototype;
};

Util.extend = function( constructor , from ){
    var p , prototype = from.prototype;
    for( p in prototype )
        if( prototype[ p ] instanceof Function )
            constructor.prototype[p] = prototype[p];
};

/**
 * bind method to a scope
 */
Function.prototype.bind = function( scope ){
    var me = this , args = Util.slice.call( arguments , 1 );
    
    return function(){
        return me.apply( scope , args );
    };
};

Function.prototype.parent = function(){
    this.superConstructor.prototype[ arguments[ 0 ] ].apply( this , Util.slice
            .call( arguments , 1 ) );
};
