var Scene , SceneController ,
    stage = [] ,
    Scene = require( './lib/scene.js' );
    util = require( 'util' ) ,
    Controller = require( '../controller.js' );

SceneController = function( data , time , connection ){
    Controller.call( this , data , time , connection );
};

util.inherits( SceneController , Controller );

SceneController.init = function( data , time , connection ){
    return new SceneController( data , time , connection );
};

module.exports = SceneController;

SceneController.prototype.create = function( data ){
    var user = this.getUser();
    var scene = new Scene;
    scene.ownerId = user.id;
    scene.name = data.name || 'Room ' + scene.id;
    scene.openTime = this.time;
    this.send( 'scene.create' , { id: scene.id , ownerId: user.id , openTime: this.time } ); 
    this.send( 'scene.enter' , scene.id );
};

SceneController.prototype.get = function( data ){
    var id = data.id ,
        scene = Scene.get( id );

    this.send( 'scene.info' , { id: scene.id , name: scene.name , openTime: scene.openTime } );
};

SceneController.prototype.enter = function( data ){

};

SceneController.prototype.data = function( data ){
    this.send( 'scene.data' , Scene.get( data ) );
};
