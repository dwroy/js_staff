var User ,
    pool = [] ,
    crypto = require( 'crypto' );

User = function( name , key ){

    this.id = pool.length;
    this.name = name;
    this.secret = crypto.createHash( 'sha1' )
        .update( name + ':' + key )
        .digest();

    pool.push( this );
};

User.prototype = {

    constructor: User,

    check: function( key ){
        return this.secret === crypto.createHash( 'sha1' )
            .update( name + ':' + key )
            .digest();
    }
};

User.get = function( id ){
    return pool[ id ];
};

module.exports = User;
