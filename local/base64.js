var img = new Image;

var canvas = document.createElement( 'canvas' );
var ctx = canvas.getContext( '2d' );

img.onload = function()
{
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage( img , 0 , 0 );
    base64 = canvas.toDataURL();
    console.log( base64);
};
img.src = 'images/round3.png';
