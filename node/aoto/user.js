var UserController ,
    Scene = require( './lib/scene.js' ) ,
    User = require( './lib/user.js' ) ,
    Vehicle = require( './lib/vehicle.js' ) ,
    Util = require( 'util' ) ,
    Controller = require( '../controller.js' );

UserController = function( data , time , connection ){
    Controller.call( this , data , time , connection );
};

Util.inherits( UserController , Controller );

UserController.init = function( data , time , connection ){
    return new UserController( data , time , connection );
};

module.exports = UserController;

UserController.prototype.login = function( data ){
    var controller = this ,
        scene = Scene.get( 0 ) ,
        user = User.getByName( data.name );

    if( scene === undefined )
        scene = new Scene;

    if( user ){
        if( !user.checkPassword( data.password ) )
            throw new Error( 'Password error' );
    }else{
        user = new User( data.name , data.password );
        vehicle = new Vehicle( 0 , 0 , 0 );
        user.vehicle = vehicle;
        scene.add( vehicle );
    }

    this.setUser( user );
    this.send( 'user.login' , user.getData() );
};
