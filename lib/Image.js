/**
 * @author Roy
 * 
 * class Image
 */

var Image = function( img ){
    Rectangle.call( this , 0 , 0 , img.width , img.height );
    this.img = img;
};

Util.inherits( Image , Rectangle );

Image.prototype.draw = function( ctx ){

};