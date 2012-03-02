var Crypto = require('crypto');
var hash = Crypto.createHash('sha1');

hash.update( '111111' );
console.log( hash.digest( 'base64' ) );
