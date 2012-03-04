var User ,
    Bag = [] ,
    NameIndexBag = {} ,
    Crypto = require( 'crypto' );

User = function( name , password ){
    if( !/^[\w]{1,16}$/.test( name ) )
        throw new Error( 'Invalid name' );

    if( name in NameIndexBag )
        throw new Error( 'User exist' );

    this.id = Bag.length;
    this.name = name;
    this.salt = name + Math.random();
    this.password = this.hashPassword( password , this.salt );
    Bag.push( this );
    NameIndexBag[ name ] = this;
};

User.getByName = function( name ){
    return NameIndexBag[ name ];
};

User.get = function( id ){
    return Bag[ id ];
};

User.prototype = {

    constructor: User,

    checkPassword: function( password ){
        return this.password === this.hashPassword( password , this.salt );
    },

    hashPassword: function( password , salt ){
        return Crypto.createHash( 'sha1' )
        .update( salt + ':' + password )
        .digest();
    },

    getData: function(){
        return {
            id: this.id,
            name: this.name
        };
    }
};

module.exports = User;
