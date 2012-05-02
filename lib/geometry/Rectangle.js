/**
 * @author Roy
 * 
 * class Rectangle 
 */

var Rectangle = function( vertex , width , height ){
    this.vertex = vertex || new Vector3;
    this.width = width || 0;
    this.height = height || 0;
    this.center = new Vector3( vertex.x + width / 2 , vertex.y + height / 2 , vertex.z );
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
        this.width *= modulus;
        this.height *= modulus;
    }
};
