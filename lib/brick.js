/**
 * birck, the minimun element in the scene
 * @author Roy
 */

var Point = function( x , y , z ){

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Point.prototype.constructor = Point;

var Brick = function( image ){
    this.position = new Point;
    this.rotation = 0;
    this.image = image;
};

Brick.prototype = {

    constructor: Brick,

    draw: function( ctx ){
        var x = this.x - ctx.x ,
            y = this.y - ctx.y;

        if( ( x > 0 ? x < ctx.width: -x < this.image.width ) &&
            ( y > 0 ? y < ctx.height: -y < this.image.height ) ){
            ctx.translate( x - ctx.ox , y - ctx.oy );
            ctx.rotate( this.rotation );
            ctx.drawImage( this.image , -this.image.ox , -this.image.oy , this.image.width , this.image.height );
            ctx.rotate( -this.rotation );
            ctx.ox = x , ctx.oy = y;
        }
    }
};
