var Animate = function( x , y , z , image )
{
    O.call( this , x , y , z , image );

    this.actions = []
};

Animate.prototype = new O;

Animate.prototype.addAction = function( name , args )
{
    var action = [ name , args ];
    this.actions.push( action );
    return action;
};

Animate.prototype.cancleAction = function( action )
{
    if( action && action[0] )
    {
        action[0] = false;
    }
};

Animate.prototype.move = function( options )
{
    var ds = Frame.interval * options[0] ,
        width = options[1] - this.x ,
        height = options[2] - this.y ,
        s = this.sqrt( width * width + height * height );

    if( s > ds )
    {
        this.x += this.round( ds * ( width / s ) );
        this.y += this.round( ds * ( height / s ) );
        
        return true;
    }

    this.x = options[1];
    this.y = options[2];

    return false;
};
