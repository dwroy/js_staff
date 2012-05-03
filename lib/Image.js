/**
 * @author Roy
 * 
 * class Image
 */

var Image = function( img , center ){
    Rectangle.call( this , img.width , img.height , center );
    this.img = img;
};

Util.inherits( Image , Rectangle );

Image.prototype.draw = function( ctx ){
        ctx.drawImage( image , -image.ox , -image.oy , image.width , image.height );
};