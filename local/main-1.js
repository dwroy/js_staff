var body = document.body;
var canvas = document.createElement( 'canvas' );
var ctx = canvas.getContext( '2d' );
var DEBUG = true;

canvas.width = 400;
canvas.height = 300;
canvas.style.cssText += 'background-color:rgba(0,0,0,1);';
body.style.cssText += 'margin:0px;padding:0px;';
body.appendChild( canvas );

setNextFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame || function(callback){ setTimeout(callback, 1000 / 60); };

Function.prototype.bind = function( scope )
{
    var me = this;
    return function(){ return me.apply( scope , arguments ); };
};

var Point = function( x , y , z )
{
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

var Fx = function()
{
    this.morphs = {};
    this.morphCount = 0;

    Fx.count ++;
    this.id = Fx.count;
    Fx[this.id] = this;
};

Fx.count = 0;

Fx.prototype.setMorph = function( attr , to , duration )
{
    if( this.morphs[ attr ] === undefined )
    {
        this.morphCount ++;
    }

    this.morphs[ attr ] = {
        to: to,
        duration: duration
    };
};

Fx.prototype.start = function()
{
    this.lastFrameTime = new Date().getTime();

    Frame.add( this );
};

Fx.prototype.frame = function()
{
    var morph , now , delta , attr;

    for( attr in this.morphs )
    {
        morph = this.morphs[attr];
        now = new Date().getTime();
        delta = now - this.lastFrameTime;
        this[ attr ] += ( morph.to - this[ attr ] ) * delta / morph.duration;
        morph.duration -= delta;
        
        if( morph.duration <= 0 )
        {
            delete this.morphs[ attr ];
            this.morphsCount --;
        }
    }

    if( this.morphCount > 0 )
    {
        this.lastFrameTime = now;
        Frame.add( this );
    }
};

var Frame = {

    list: [],
    
    add: function( fx )
    {
        this.list.push( fx );
    },

    each: function()
    {
        var i , list = this.list , l = list.length;
        var morphs , morphsCount;
        this.list = [];

        for( i = 0; i < l; i++ )
        {
            morphs = list[i].morphs;
            morphsCount = morphs.length;

            for( j = 0; j < morphsCount; j++ )
            {
                morphs[j].frame();
            }

            list[i].draw();
            Frame.add( list[i] );
        }
    }
};

function main()
{
    Frame.each();

    setNextFrame( main );
}

main();

var ball = new Image;
ball.src = 'images/ball.png';
ball = new Fx( ball );

ball.x = 0;
ball.y = 0;

ball.setMorph( 'x' , 200 , 3000 );
ball.setMorph( 'y' , 300 , 3000 );

ball.draw = function()
{
    ctx.drawImage( this.image , this.x , this.y );
};

