var Controller = function( time , connection ){
    this.time = time;
    this.connection = connection;
};

var Tank = function( x ){
    this.x = x;
};

var tanks = [];

Controller.prototype.create = function( data ){
    tanks.push( new Tank( data.x ) );
    this.connection.send( 'id:' + tanks.length );
};

Controller.prototype.get = function( data ){
    this.connection.send( 'x: ' + tanks[ data.id ].x );
};

Controller.prototype.error = function( data ){
    throw new Error( 'test error throw' );
};

Controller.init = function( time , connection ){
    return new Controller( time , connection );
};

module.exports = Controller;
