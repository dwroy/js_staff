/**
 * @author Roy 
 * 
 * class Rotation
 */

var Rotation = function(){
    this.set( arguments[0] || 0 , arguments[1] );
};

Rotation.prototype = {};
Rotation.prototype.constructor = Rotation;

/**
 * @radian radian of rotation
 */
Rotation.prototype.setRandian = function( radian ){
    this.radian = radian;
    this.sin = Math.sin( radian );
    this.cos = Math.cos( radian );

    return this;
};

/**
 * @cos float cos of radian
 * @sin float sin of radian
 */
Rotation.prototype.setCosSin = function( cos , sin ){
    this.cos = cos;
    this.sin = sin;
    this.radian = Math.asin( sin );

    if( cos < 0 ) this.radian = Math.PI - this.radian;

    return this;
};

/**
 * @rotation Rotation
 */
Rotation.prototype.set = function( a , b ){
    if( a instanceof Rotation ){
        this.cos = a.cos;
        this.sin = a.sin;
        this.radian = a.radian;
    }else if( b === undefined )
        this.setRandian( a );
    else
        this.setCosSin( a , b );

    return this;
};

Rotation.prototype.face = function( x , y ){
    var center = this.center,
        w = x - center.x,
        h = y - center.y,
        s = Math.sqrt( w * w + h * h );

    this.setCosSin( w / s , h / s );

    return this;
};

Rotation.prototype.copy = function(){
    return new Rotation( this );
};
