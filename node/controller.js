var Controller;

Controller = function( data , time , connection ){
    this.time = time;
    this._data = data;
    this._connection = connection;
};

Controller.prototype = {

    constructor: Controller,

    send: function( route , data ){
        this._connection.sendJson( [ route , data === undefined ? '' : data ] );
    },

    setUser: function( user ){
        this._connection._user = user;
    },

    getUser: function(){
        return this._connection._user;
    }
};

module.exports = Controller;
