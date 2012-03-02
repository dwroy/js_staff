var Astar = function( ox , oy , tx , ty , scene )
{
    if( !this.reachable( tx , ty ) )
    {
        $('time').textContent = 'Could not reach';
        //return;
    }

    var grid = [ ox , oy , 0 , 0 , false ] ,
        map = [];

    map[ox] = [];
    map[ox][oy] = grid;
    this.map = map;
    this.path = [];
    this.open = [ grid ];
    this.x = tx;
    this.y = ty;
    this.scene = scene;
    //this.neighbours = [ [ 1 , 0 ] , [ 1 , 1] , [ 0 , 1 ] , [ -1 , 1] , [ -1 , 0 ] , [ -1 , -1 ] , [ 0 , -1 ] , [ 1 , -1 ] ];
    this.neighbours = [ 1 , 0 , 1 , 1 , 0 , 1 , -1 , 1 , -1 , 0 , -1 , -1 , 0 , -1 , 1 , -1 ];
};

Astar.prototype =
{
    constructor: Astar,

    search: function()
    {
        var grid , i , minIndex , n ,
            length = this.open.length;

        do
        {
            minIndex = 0;

            for( i = 1; i < length; i++ )
            {
                if( this.open[i][3] < this.open[minIndex][3] )
                {
                    minIndex = i;
                }
            }

            grid = this.open.splice( minIndex , 1 )[0];


            ctx.rect( grid[0]*10 - 3 ,grid[1] * 10 - 3 , 6 , 6 );

            if( grid[0] === this.x && grid[1] === this.y )
            {
                this.path.push( grid );

                while( ( grid = grid[5] ) )
                {
                    if( grid[4] )
                    {
                        this.path.push( grid );
                    }
                }

                return this.path;
            }

            this.check( grid , 1 , 0 , Astar.SIDE_LENGTH );
            this.check( grid , 1 , 1 , Astar.DIAGONAL_LENGTH );
            this.check( grid , 0 , 1 , Astar.SIDE_LENGTH );
            this.check( grid ,-1 , 1 , Astar.DIAGONAL_LENGTH );
            this.check( grid ,-1 , 0 , Astar.SIDE_LENGTH );
            this.check( grid ,-1 ,-1 , Astar.DIAGONAL_LENGTH );
            this.check( grid , 0 ,-1 , Astar.SIDE_LENGTH );
            this.check( grid , 1 ,-1 , Astar.DIAGONAL_LENGTH );

        }while( ( length = this.open.length ) );
    },

    g: function( x , y )
    {
        
    },

    f: function( x , y , g )
    {
        return ( ( this.x > x ? this.x - x : x - this.x ) + ( this.y > y ? this.y - y : y - this.y ) ) * 10 + g;
    },

    check: function( parent , i )
    {
        var grid , g , f , isPathGrid ,
            x = parent[0] + this.neighbours[i] ,
            y = parent[1] + this.neighbours[i+1];

        if( this.reachable( x , y ) )
        {
            g = parent[2] + l;
            isPathGrid = this.additional( x , y );

            if( isPathGrid )
            {
                g += Astar.ADDITION_G;
            }

            f = this.f( x , y , g );

            if( this.map[x] )
            {
                if( ( grid = this.map[x][y] ) )
                {
                    if( f < grid[3] )
                    {
                        grid[2] = g;
                        grid[3] = f;
                        grid[4] = isPathGrid;
                        grid[5] = parent;
                    }

                    return;
                }
            }
            else
            {
                this.map[x] = [];
            }

            grid = [ x , y , g , f , isPathGrid , parent ];
            this.map[x][y] = grid;
            this.open.push( grid );
        }
    },

    reachable: function( x , y )
    {
        if( x < 0 || y < 0 || x > 100 || y > 60 )
        {
            return false;
        }
        if( x === 5 && y < 17 )
        {
            return false;
        }
        if( x === 10 && y >= 8 && y < 40 )
        {
            return false;
        }
        if( x >= 8 && x < 35 && y === 5 )
        {
            return false;
        }
        if( x >= 15 && x < 25 && y == 15 )
        {
            return false;
        }
        if( x >= 11 && x < 50 && y == 25 )
        {
            return false;
        }
        if( x === 80 && y >= 10 && y < 55 )
        {
            return false;
        }
        if( x >= 20 && x < 80 && y === 37 )
        {
            return false;
        }

        return true;
    }
};

Astar.SIDE_LENGTH = 10 ,
Astar.DIAGONAL_LENGTH = 14;
Astar.ADDITION_G = 3;

var div = document.createElement( 'div' );
div.className = 'canvas-box';
var scene = new Scene();
var camera = new Camera( 0 , 0 , 920 , 620 , 3 , document.getElementById( 'canvas-frame' ) );
var span = document.getElementById( 'fps-show' );
var ctx = camera.films[0];

function drawMap()
{
    ctx.clearRect( 0 , 0 , 920 , 620 );
    ctx.beginPath();
    ctx.fillStyle = '#f00';

    for( i = 0 ; i < 17 ; i ++ )
    {
        ctx.rect( 5 * 10 - 5, i * 10 -5 , 10 , 10 );
    }
    for( i = 8 ; i < 40 ; i++ )
    {
        ctx.rect( 10 * 10-5 , i * 10 -5 , 10 , 10 );
    }
    for( i = 8 ; i < 35 ; i++ )
    {
        ctx.rect( i * 10 -5 , 5 * 10-5 , 10 , 10 );
    }
    for( i = 15 ; i < 25 ; i++ )
    {
        ctx.rect( i * 10 -5, 15 * 10-5 , 10 , 10 );
    }
    for( i = 11 ; i < 50 ; i++ )
    {
        ctx.rect( i * 10 -5, 25 * 10-5 , 10 , 10 );
    }
    for( i = 10 ; i < 55; i++ )
    {
        ctx.rect( 80 * 10 -5, i * 10-5 , 10 , 10 );
    }
    for( i = 20 ; i < 80; i++ )
    {
        ctx.rect( i * 10 -5, 37 * 10-5 , 10 , 10 );
    }
    ctx.closePath();
    ctx.fill();
}

function test( ox , oy , tx , ty )
{
    ox = parseInt( ox );
    oy = parseInt( oy );
    tx = parseInt( tx );
    ty = parseInt( ty );
    drawMap();
    var start = new Date().getTime();

    ctx.beginPath();
    ctx.fillStyle = '#00f';
    for(var i = 0; i < 1;i++)
    {
        astar = new Astar( ox , oy , tx , ty );
        path = astar.search();
    }

    var end = new Date().getTime();
    $('time').textContent = end - start + ' Microseconds';

    ctx.closePath();
    ctx.fill();

    if( !path )
    {
        $('time').textContent +=  ' could not reach';
        return;
    }

    ctx.beginPath();
    ctx.strokeStyle = '#0f0';
    ctx.moveTo( ox * 10  , oy * 10 );

    while( ( g = path.pop() ) )
    {
        //if( !astar.reachable( x , y ) )
        //{
        //
        //    ctx.rect( g[0] * 20 , g[1] * 20 , 5 , 5 );
        //}
        ctx.lineTo( g[0] * 10 , g[1] * 10 );
        ctx.moveTo( g[0] * 10 , g[1] * 10 );
    };

    ctx.closePath();
    ctx.stroke();
}
function $( id )
{
    return document.getElementById( id );
}
drawMap();
