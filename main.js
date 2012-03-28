/**
 * @author Roy
 */

images.on( 'load', function( name ){
    console.log( name  );
});

images.on( 'complete', function(){
    var div = document.createElement( 'div' );
    div.className = 'canvas-box';
    var scene = new Scene;
    var camera = new Camera( 0 , 0 , 960 , 640 , 3 , document.getElementById( 'canvas-frame' ) );
    var span = document.getElementById( 'fps-show' );
    var npc = [
        new Npc( new Animation( images.get( 5 ) , 100 , 150 ) , 3000 ) ,
        new Npc( new Animation( images.get( 5 ) , 200 , 50  ) , 4000 ) ,
        new Npc( new Animation( images.get( 5 ) , 300 , 300 ) , 1000 ) ,
        new Npc( new Animation( images.get( 5 ) , 400 , 100 ) , 2000 ) ,
        new Npc( new Animation( images.get( 5 ) , 700 , 500 ) , 1000 ) ,
        new Npc( new Animation( images.get( 5 ) , 800 , 150 ) , 3000 ) ,
        new Npc( new Animation( images.get( 5 ) , 900 , 50  ) , 4000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1000 , 300 ) , 1000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1100 , 100 ) , 2000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1200 , 500 ) , 1000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1300 , 150 ) , 3000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1500 , 50  ) , 4000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1500 , 300 ) , 1000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1600 , 100 ) , 2000 ) ,
        new Npc( new Animation( images.get( 5 ) , 1700 , 500 ) , 1000 ) ,
    ];

    var tank = new Tank( images.get( 5 ) , 0.1 );
    var cannon = new Cannon( Bomb , images.get( 6 ) , 1.5 , 5000 , 20 , 500  );

    tank.mount( cannon );

    tank.on( 'hit' , function( targets ){
        var npc;
        while( ( npc = targets.pop() ) ){
            if( ( npc = npc.owner ) && npc instanceof Npc ){
                npc.die();
            }
        }
    });

    tank.on( 'intersect' , function(){
        var location = this.animation.location;
        location.x -= this.lastDx;
        location.y -= this.lastDy;
    });

    camera.on( 'mousedown' , function(){
        tank.start();
    });

    camera.on( 'mouseup' , function(){
        tank.stop();
    });

    camera.on( 'keydown' , function(){
        tank.cannon.fire();
    });
    
    Frame.onloop = function(){
        var mouse = camera.getMouse();
        span.textContent = this.fps;

        if( mouse.state === Camera.MOUSE_STATE_DOWN && tank.state === Fx.STATE_RUN ){
            tank.animation.lookAt( mouse.x , mouse.y );
        }

        tank.attach( scene );

        for( var i = 0 ; i < npc.length ; i++ ){
            npc[i].attach( scene );
        }

        camera.stick( tank.animation.location );
        scene.perform();
        camera.shoot( scene );
    };

    Frame.start();
});
