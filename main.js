/**
 * @author Roy
 */
window.on( 'load' , function(){
    camera = new Camera( 0 , 0 , 960 , 640 , 3 , document.getElementById( 'camera' ) );    
    scene = new Scene;

    images.on( 'load' , function( img ){
        console.log( img );
    });

    images.on( 'complete' , function(){
        ball = new Object2D( images.get( 6 ) , new Circle( 5 ) );

        Frame.onloop = function(){
            scene.addImage( ball );
            camera.shoot( scene );
        };

        Frame.start();
    } );

} );
