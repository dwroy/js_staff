/**
 * @author Roy
 * 
 * class Rectangle 
 */

var Rectangle = function( width , height , center ){
    this.center = center || new Vector3;
    this.halfWidth = width / 2;
    this.halfHeight = height / 2;
    this.width = width;
    this.height = height;
};

Rectangle.prototype = {

    constructor: Rectangle,

    move: function( vector3 ){
        this.center.add( vector3 );
    },

    copy: function(){
        return new Rectangle( this.width , this.height , this.center.copy() );
    },

    scalar: function( modulus ){
        this.halfWidth *= modulus;
        this.halfHeight *= modulus;
        this.width = this.halfWidth * 2;
        this.height = this.halfHeight * 2;
    },

    isIntersectedInRectangle: function( rectangle ){
        var center = rectangle.center,
            w = this.halfWidth + rectangle.halfWidth,
            h = this.halfHeight + rectangle.halfHeight,
            distanceW = Math.abs( center.x - this.center.x ),
            distanceH = Math.abs( center.y - this.center.y );

        return ( distanceW > w || distanceH > h ) ? false : true;
    }
};
