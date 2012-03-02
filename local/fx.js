/**
 * fx, some animation class
 * class list: Animate , Astar.
 * @author Roy
 *
 */

var Animate = function( x , y , z , image )
{
    O.call( this , x , y , z , image );

    this.actions = []
};

Animate.prototype = new O;

Animate.prototype.constructor = Animate;

Animate.prototype.round = Math.round;

Animate.prototype.sqrt = Math.sqrt;

Animate.prototype.sin = Math.sin;

Animate.prototype.cos = Math.cos;

Animate.prototype.acos = Math.acos;

Animate.prototype.asin = Math.asin;

Animate.prototype.PI = Math.PI;

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

Animate.prototype.forward = function( options )
{
    var dr , r , angle , cos ,
        ds = Frame.interval * options[0] ,
        width = options[1] - this.x ,
        height = options[2] - this.y ,
        s = this.sqrt( width * width + height * height );
    
    if( s > ds )
    {
        cos = width / s;
        angle = this.acos( cos );

        if( height < 0 )
        {
            angle = 2 * this.PI - angle;
        }

        if( this.rotation === angle )
        {
            this.x += this.round( ds * cos );
            this.y += this.round( ds * ( height /s ) );
        }
        else
        {
            r = angle - this.rotation;
            dr = Frame.interval * options[3];
            
            if( r < -this.PI )
            {
                this.rotation += dr;
                r = 2 * this.PI + r;
            }
            else if( r < 0 )
            {
                this.rotation -= dr;
                r = -r;
            }
            else if( r <= this.PI )
            {
                this.rotation += dr;
            }
            else
            {
                r = 2 * this.PI - r;
                this.rotation -= dr;
            }

            if( dr > r )
            {
                this.rotation = angle;
            }
        }

        return true;
    }

    this.x = options[1];
    this.y = options[2];

    return false;
};

Animate.prototype.lookAt = function( arg1 , arg2 )
{
    if( arg2 === undefined )
    {
        this.rotation = arg1;
    }
    else
    {
        var x = arg1 - this.x , y = arg2 - this.y ,
            s = Math.sqrt( Math.pow( x , 2 ) + Math.pow( y , 2 ) );

        this.rotation = Math.asin( y / s );

        if( x < 0 )
        {
            this.rotation = Math.PI - this.rotation;
        }
    }
};
