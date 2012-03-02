var Scene , c ,
    stage = [] ,
    Scene = require( './lib/scene.js' );
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

c.prototype.create = function( data ){
    var user = this.getUser();
    var scene = new Scene;
    scene.ownerId = user.id;
    scene.name = data.name || 'Room ' + scene.id;
    scene.openTime = this.time;
    this.send( 'scene.create' , { id: scene.id , ownerId: user.id , openTime: this.time } ); 
    this.send( 'scene.enter' , scene.id );
};

c.prototype.get = function( data ){
    var id = data.id ,
        scene = Scene.get( id );

    this.send( 'scene.info' , { id: scene.id , name: scene.name , openTime: scene.openTime } );
};

c.prototype.enter = function( data ){

};
