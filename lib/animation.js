/**
 * animation class named Toy
 * @author Roy
 */

var Animation = function( image , x , y , z ){
    Brick.call( this , image , x , y , z );

    this.actions = [];
};

Util.inherits( Animation , Brick );

Animation.prototype.addAction = function(){
    arguments[0] = this[ arguments[0] ];
    this.actions.push( arguments );
    return arguments;
};

Animation.prototype.cancleAction = function( action ){
    if( action && action.length )
        action[0] = false;
};

Animation.prototype.cancleActions = function(){
    this.actions = [];
};

Animation.prototype.move = function( v , x , y ){
    var ds = Frame.interval * v ,
        width = x - this.x ,
        height = y - this.y ,
        s = Math.sqrt( width * width + height * height );

    if( s > ds ){
        this.x += Math.round( ds * ( width / s ) );
        this.y += Math.round( ds * ( height / s ) );
        
        return true;
    }

    this.x = x;
    this.y = y;

    return false;
};

Animation.prototype.lookAt = function( arg1 , arg2 ){
    var x , y , s;

    if( arg2 === undefined ){
        this.rotation = arg1;
        return;
    }

    x = arg1 - this.x;
    y = arg2 - this.y;
    s = Math.sqrt( x * x + y * y );
    this.rotation = Math.asin( y / s );

    if( x < 0 )
        this.rotation = Math.PI - this.rotation;
};
