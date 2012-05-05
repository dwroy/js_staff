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

Image.prototype.draw = function( film ){
    film.drawImage( this.img , -this.halfWidth , -this.halfHeight , this.width , this.height );
};