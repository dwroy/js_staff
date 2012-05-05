/**
 * @author Roy
 * 
 * class Vector3
 */

var Vector3 = function( x , y , z ){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Vector3.prototype = {
    
    constructor: Vector3,

    set: function( vector3 ){
        this.x = vector3.x;
        this.y = vector3.y;
        this.z = vector3.z;

        return this;
    },

    setValue: function( x , y , z ){
        if( x !== undefined ) this.x = x;
        if( y !== undefined ) this.y = y;
        if( z !== undefined ) this.z = z;
    },

    copy: function(){
        return new Vector3( this.x , this.y , this.z );
    },

    add: function( vector3 ){
        vector3 = vector3 || this;
        this.x += vector3.x;
        this.y += vector3.y;
        this.z += vector3.z;

        return this;
    },

    sub: function( vector3 ){
        vector3 = vector3 || this;
        this.x -= vector3.x;
        this.y -= vector3.y;
        this.z -= vector3.z;

        return this;
    },

    multiply: function( vector3 ){
        vector3 = vector3 || this;
        this.x *= vector3.x;
        this.y *= vector3.y;
        this.z *= vector3.z;

        return this;
    },

    scalar: function( modulus ){
        this.x *= modulus;
        this.y *= modulus;
        this.z *= modulus;

        return this;
    },

    dot: function( vector3 ){
        vector3 = vector3 || this;
        return this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
    },

    length: function(){
        return Math.sqrt( this.dot() );
    },

    manhattanLength: function(){
        return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );
    },

    normalize: function(){
        return this.scalar( 1 / this.length() );
    },

    cross: function( vector3 ){
        this.x = this.y * vector3.z - this.z * vector3.y;
        this.y = this.z * vector3.x - this.x * vector3.z;
        this.z = this.x * vector3.y - this.y * vector3.x;

        return this;
    },

    distanceSquare: function( vector3 ){
        return this.copy().sub( vector3 ).dot();
    },

    distance: function( vector3 ){
        return this.copy().sub( vector3 ).length();
    }
};