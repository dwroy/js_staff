/**
 * @author Roy
 * 
 * class Rectangle 
 */

var Rectangle = function( halfWidth , halfHeight , center ){
    this.center = center || new Vector3;
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
};

Rectangle.prototype = {

    constructor: Rectangle,

    move: function( vector3 ){
        this.center.add( vector3 );
    },

    copy: function(){
        return new Rectangle( this.halfWidth , this.halfHeight , this.center.copy() );
    },

    scalar: function( modulus ){
        this.halfWidth *= modulus;
        this.halfHeight *= modulus;
    }
};
