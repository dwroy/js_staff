/**
 *
 * @author Roy
 *
 * class SceneImage
 */

var SceneImage = function( geometry , rotation ){
    this.geometry = geometry;
    this.rotation = rotation;
};

SceneImage.prototype = {};
SceneImage.prototype.constructor = SceneImage;

/**
 * @x float
 * @y float
 */
SceneImage.prototype.face = function( x , y ){
    if( y === undefined )
        this.rotation.setRandian( x );
    else{
        var center = this.circle.center ,
            w = x - center.x ,
            h = y - center.y ,
            s = Math.sqrt( w * w + h * h );

        this.rotation.setCosSin( w / s , h / s );
    }
};

/**
 * @ctx Canvas2dContext
 */
SceneImage.prototype.draw = function( ctx ){
    var image = this.image,
        radian = this.rotation.radian,
        center = this.geometry.center,
        offset = ctx.position,
        x = center.x - offset.x,
        y = center.y - offset.y;

    if( ( x > 0 ? x < ( ctx.width + image.ox ) : -x < ( image.width + image.ox ) ) &&
        ( y > 0 ? y < ( ctx.height + image.oy ) : -y < ( image.height + image.oy ) ) ){

        ctx.translate( x - ctx.ox , y - ctx.oy );
        ctx.rotate( radian );
        ctx.drawImage( image , -image.ox , -image.oy , image.width , image.height );
        ctx.rotate( -radian );
        ctx.ox = x , ctx.oy = y;
    }
};
