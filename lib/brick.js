var Brick = function( x , y , z , image ){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotation = 0;
    this.image = image;
};

Brick.prototype = {

    constructor: Brick,

    draw: function( ctx ){
        var img = this.image ,
            x   = this.x - ctx.x ,
            y   = this.y - ctx.y;

        if( ( x > 0 ? x < ctx.width: -x < img.width ) &&
            ( y > 0 ? y < ctx.height: -y < img.height ) )
        {
            ctx.translate( x - ctx.ox , y - ctx.oy );
            ctx.rotate( this.rotation );
            ctx.drawImage( img , -img.ox , -img.oy , img.width , img.height );
            ctx.rotate( -this.rotation );
            ctx.ox = x , ctx.oy = y;
        }
    }
};
