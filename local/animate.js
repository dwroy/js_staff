/**
 * @author Roy
 */


var div = document.createElement( 'div' );
div.className = 'canvas-box';
var scene = new Scene();
var camera = new Camera( 0 , 0 , 920 , 620 , 3 , document.getElementById( 'canvas-frame' ) );
var tanks = [];
var actions = [];

var span = document.getElementById( 'fps-show' );


Frame.loop = function()
{
    var mouse = camera.getMouse();
    span.textContent = this.fps + 'fps' ;

    if( mouse.status === MOUSE_DOWN && mouse.lastStatus === MOUSE_UP )
    {
        for( i = 0; i< 50; i++)
        {
            tanks[i].cancleAction( actions[i] );
            actions[i] = tanks[i].addAction( 'forward' , [ 0.3 , mouse.x , mouse.y , 0.01 ] );
        }
    }
    
    for(i=0;i<50;i++)
    {
        scene.add( tanks[i] );
    }

    scene.perform();
    camera.shoot( scene );
};

images.addEvent( 'load', function( name )
{
    console.log( name  );
});

images.addEvent( 'complete', function()
{
    ball = new O( 0 , 0 , 2 , images.get( 0 ) );
    bg = new O( 0 , 0 , 0 , images.get( 4 ) );
    scene.add( bg );
    for( i = 0; i < 200; i++ )
    { 
        tanks.push( new Animate( i*50  , i*50  , 1 , images.get( 5 ) ) );
    }
    Frame.start();
});
function test()
{
    for( i = 0; i < 200000; i++)
    { 
        ball = new O( 0 , 0 , i%2 , images.get( 5 ) );
        scene.add( ball );
    }

    var start = new Date().getTime();
    camera.shoot( scene );
    var end = new Date().getTime();

    console.log( end -start );
}
