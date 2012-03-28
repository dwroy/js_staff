/**
 * @author Roy
 */

var Location = function( x , y , z ){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Location.prototype = {};

Location.prototype.constructor = Location;

/**
 * Rotation
 *  randian => 
 *  sin 
 *  cos
 */
var Rotation = function( arg1 , arg2 ){
    arg2 === undefined ?
        this.setRandian( arg1 || 0 ) :
        this.setSinCos( arg1 , arg2 );
};

Rotation.prototype = {};

Rotation.prototype.constructor = Rotation;

Rotation.prototype.setRandian = function( radian ){
    this.radian = radian;
    this.sin = Math.sin( radian );
    this.cos = Math.cos( radian );
};

Rotation.prototype.setCosSin = function( cos , sin ){
    this.cos = cos;
    this.sin = sin;
    this.radian = Math.asin( sin );

    if( cos < 0 ) this.radian = Math.PI - this.radian;
};

Rotation.prototype.set = function( rotation ){
    if( rotation instanceof Rotation ){
        this.cos = rotation.cos;
        this.sin = rotation.sin;
        this.radian = rotation.radian;
    }else
        throw new Error( 'Must be an instance of Rotation' );
}

var Animation = function( element ){
    this.location = new Location( arguments[1] , arguments[2] , arguments[3] );
    this.rotation = new Rotation( arguments[4] , arguments[5] );
    this.element = element;
    this.radius = element.radius;
    this.collisional = true;
};

Animation.prototype = {};

Animation.prototype.constructor = Animation;

Animation.prototype.lookAt = function( x , y ){
    if( y === undefined ){
        this.rotation.setRandian( x );
        return;
    }

    var location = this.location ,
        w = x - location.x ,
        h = y - location.y ,
        s = Math.sqrt( w * w + h * h );

    this.rotation.setCosSin( w / s , h / s );
};

Animation.prototype.render = function( ctx ){
    var image = this.element ,
        location = this.location ,
        radian = this.rotation.radian ,
        x = location.x - ctx.x ,
        y = location.y - ctx.y;

    if( ( x > 0 ? x < ctx.width: -x < image.width ) &&
        ( y > 0 ? y < ctx.height: -y < image.height ) ){

        ctx.translate( x - ctx.ox , y - ctx.oy );
        ctx.rotate( radian );
        ctx.drawImage( image , -image.ox , -image.oy , image.width , image.height );
        ctx.rotate( -radian );
        ctx.ox = x , ctx.oy = y;
    }
};