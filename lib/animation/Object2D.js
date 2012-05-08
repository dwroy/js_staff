/**
 *
 * @author Roy
 *
 * class Object2D
 */

var Object2D = function( img , geometry , rotation , intersected ){
    geometry.owner = this;
    this.image = new Image( img , geometry.center );
    this.geometry = geometry;
    this.rotation = rotation || new Rotation;
    this.intersected = intersected || true;
};

Object2D.prototype = {};
Object2D.prototype.constructor = Object2D;

/**
 * @x float
 * @y float
 */
Object2D.prototype.face = function( x , y ){
    if( y === undefined )
        this.rotation.setRandian( x );
    else{
        var center = this.geometry.center ,
            w = x - center.x ,
            h = y - center.y ,
            s = Math.sqrt( w * w + h * h );

        this.rotation.setCosSin( w / s , h / s );
    }
};

Object2D.prototype.setPosition = function( x , y , z ){
    this.geometry.center.setValue( x , y , z );
};

/**
 * @film Canvas2dContext
 */
Object2D.prototype.draw = function( film , camera ){
    var image = this.image,
        radian = this.rotation.radian,
        center = image.center,
        offset = camera.center,
        x = center.x - offset.x + camera.halfWidth,
        y = center.y - offset.y + camera.halfHeight;

    if( ( x > 0 ? x < ( camera.width + image.halfWidth ) : -x < ( image.halfWidth ) ) &&
            ( y > 0 ? y < ( camera.height + image.halfHeight ) : -y < ( image.halfHeight) ) ){
        film.translate( x - film.ox , y - film.oy );
        film.rotate( radian );
        image.draw( film );
        film.rotate( -radian );
        film.ox = x , film.oy = y;
    }
};