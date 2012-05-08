/**
 * @author Roy
 */
window.on( 'load' , function(){
    var img , images = new Source;

    img = document.createElement( 'img' );
    img.name = 'ball';
    img.src = 'images/round.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'ball1';
    img.src = 'images/round1.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'ball2';
    img.src = 'images/round2.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'ball3';
    img.src = 'images/round3.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'bg';
    img.src = 'images/map.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'tank';
    img.src = 'images/tank.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'bomb';
    img.src = 'images/bomb.png';
    images.load( img );


    var camera = new Camera( 0 , 0 , 960 , 640 , 3 , document.getElementById( 'camera' ) ),
        fpsSpan = document.getElementById( 'fps' ),
        scene = new Scene;

    images.on( 'load' , function( img ){
        console.log( img );
    });

    images.on( 'complete' , function(){
        var vehicle = new Vehicle( images.get( 5 ) , 0.1 , 10 ),
            npc = new Vehicle( images.get( 5 ) , 0.2 , 10 );

        npc.setPosition( 200 , 300 );


        camera.on( 'mousedown' , function(){
            vehicle.start();
        });

        camera.on( 'mousemove' , function(){
            if( vehicle.isRunning() ) vehicle.face( Mouse.x , Mouse.y );
            npc.face( Mouse.x , Mouse.y );
        });

        camera.on( 'mouseup' , function(){
            vehicle.stop();
        });

        vehicle.on( 'hit' , function( intersectors ){
            console.log( intersectors );
        });

        Frame.onloop = function(){
            fpsSpan.textContent = this.fps;
            camera.emit( 'mousemove' );

            vehicle.signin( scene );
            npc.signin( scene );

            scene.perform();
            camera.shoot( scene );
        };

        Frame.start();
    });

});
