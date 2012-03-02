var c ,
    Scene = require( './lib/scene.js' ) ,
    User = require( './lib/user.js' ) ,
    Vehicle = require( './lib/vehicle.js' ) ,
    O = require( './lib/object.js' ) ,
    util = require( 'util' ) ,
    Controller = require( '../controller.js' );

c = function( data , time , connection ){
    Controller.call( this , data , time , connection );
};

util.inherits( c , Controller );

c.init = function( data , time , connection ){
    return new c( data , time , connection );
};

module.exports = c;

c.prototype.login = function( data ){
    var scene = Scene.get( 0 ) ,
        user = new User( data.name , data.key );

    this.setUser( user );
    this.send( 'user.login' , { id: user.id , name: user.name  } );

    if( scene === undefined ){
        scene = new Scene;
        scene.ownerId = user.id;
        scene.name = 'Room ' + scene.id;
        scene.openTime = this.time;
    };

    var vehicle = new O( user.id * 10 , user.id * 10 , 1 );

    this.send( 'ui.scene' , { id: scene.id , name: scene.name , ownerId: user.id } );
    scene.add( vehicle );

    var sync = function(){
        c.send( 'scene.sync' , scene.info );

        if( !scene.closed )
            setTimeout( sync , 25 );
    }; 

    sync();
};
