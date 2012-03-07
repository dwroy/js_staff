/**
 * @author Roy
 */

var div = document.createElement( 'div' );
div.className = 'canvas-box';
var scene = new Scene;
var camera = new Camera( 0 , 0 , 920 , 620 , 3 , document.getElementById( 'canvas-frame' ) );
var tanks = [];
var actions = [];

var span = document.getElementById( 'fps-show' );


Frame.loop = function()
{
    var action;
    var mouse = camera.getMouse();
    span.textContent = this.fps + 'fps' ;

    if( mouse.state === Camera.MOUSE_DOWN ){
        tank.cancleAction( action );
        action = tank.addAction( 'move' , 0.5 , mouse.x , mouse.y );
        //tank.move( 0.5 , mouse.x , mouse.y );
    }

    scene.add( tank );
    scene.perform();
    camera.shoot( scene );
};

images.on( 'load', function( name ){
    console.log( name  );
});

images.on( 'complete', function(){
    tank = new Animation( images.get( 5 ) , 50  , 50  , 1 );

    Frame.start();
});

function test(){
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
