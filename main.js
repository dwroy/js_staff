/**
 * @author Roy
 */

var div = document.createElement( 'div' );
div.className = 'canvas-box';
var scene = new Scene;
var camera = new Camera( 0 , 0 , 920 , 620 , 3 , document.getElementById( 'canvas-frame' ) );
var span = document.getElementById( 'fps-show' );
var bombs = [];

images.on( 'load', function( name ){
    console.log( name  );
});

images.on( 'complete', function(){

    chamber = new Chamber( Bomb , images.get( 6 ) , 1.2 , 500 , 100 );
    chamber.position = new Point( 200 , 200 , 1 );
    chamber.rotation = new Rotation;

    camera.on( 'click' , function(){
        var mouse = camera.getMouse();


        chamber.start();
    });
    
    Frame.start();
});

Frame.onloop = function(){
    span.textContent = this.fps;

    for( var i = 0; i < bombs.length; i++ ){
        bombs[i].attach( scene );
    }

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

    console.log( end -start );
}
