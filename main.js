/**
 * @author Roy
 */

var div = document.createElement( 'div' );
div.className = 'canvas-box';
var scene = new Scene;
var camera = new Camera( 0 , 0 , 960 , 640 , 3 , document.getElementById( 'canvas-frame' ) );
var span = document.getElementById( 'fps-show' );
var bombs = [];

images.on( 'load', function( name ){
    console.log( name  );
});

images.on( 'complete', function(){
  
    tank = new Tank( images.get( 5 ) , 0.2 );
    cannon = new Cannon( Bomb , images.get( 6 ) , 0.5 , 500 , 5 , 1000  );
    tank.mount( cannon );

    target = new Animation( images.get( 1 ) , 400 , 200 );

    camera.on( 'mousedown' , function(){
        tank.start();
    });

    camera.on( 'mouseup' , function(){
        tank.stop();
    });

    camera.on( 'keydown' , function(){
        tank.cannon.fire();
    });
    
    Frame.start();
});

Frame.onloop = function(){
    var mouse = camera.getMouse();
    span.textContent = this.fps;

    if( mouse.state === Camera.MOUSE_STATE_DOWN ){
        tank.animation.lookAt( mouse.x , mouse.y );
    }

    tank.attach( scene );
    scene.add( target );
    scene.perform();
    camera.shoot( scene );
};

function test(){
    for( i = 0; i < 200000; i++){ 
        ball = new O( 0 , 0 , i%2 , images.get( 5 ) );
        scene.add( ball );
    }

    var start = new Date().getTime();
    camera.shoot( scene );
    var end = new Date().getTime();

    console.log( end - start );
}