var net = require( 'net' );
var http = require( 'http' );
var Crypto = require('crypto');

var server = new http.Server; 
server.on( 'upgrade' , function( request , socket , head ){
    var response;
    var hash = Crypto.createHash('sha1');
    console.log( 'upgrade' );

    hash.update( request.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11' );
    var key = hash.digest( 'base64' );

    response = 'HTTP/1.1 101 Switching Protocols\r\n' +
        'Upgrade: websocket\r\n' +
        'Connection: Upgrade\r\n' +
        'Date: ' + new Date().getTime() + '\r\n' +
        'Sec-WebSocket-Version: 13\r\n' +
        'Sec-WebSocket-Accept: ' + key + '\r\n' +
        'Sec-WebSocket-Origin: ' + request.headers['sec-websocket-origin'] + '\r\n' +
        'Sec-WebSocket-Loaction: ws://' + request.headers.host + request.url +
        //'Sec-WebSocket-Protocol: *\r\n' +
        '\r\n\r\n';

    socket.write( response );

    socket.on( 'data' , function( stream ){
        console.log( stream );
        var fin , rsv , opcode , masked , buffer , i , l ,
            si = 0 ,
            keys = [];
            data = [];
            
        do{
            fin  = stream[si] >> 7;
            rsv = stream[si] >> 4 & 7;
            opcode = stream[si++] & 15;
            masked = stream[si] >> 7;

            if( rsv === 0 && masked === 1 ){

                if( opcode === 10 ){
                    console.log( 'pong' );
                    return;
                }

                l = stream[si++] & 127;

                if( l === 126 ){
                    l = stream.readUInt16BE( 2 , true );
                    si += 2;
                }else if( l === 127 ){
                    l = stream.readUInt32BE( 2 , true );
                    si += 4;
                }

                keys[0] = stream[si++];
                keys[1] = stream[si++];
                keys[2] = stream[si++];
                keys[3] = stream[si++];

                for( i = 0; i < l; i++ , si++ )
                    data.push( stream[si] ^ keys[ i % 4 ] );
            }
        }while( fin === 0 );

        buffer = new Buffer( data );
        
        console.log( buffer.toString() );

        buffer = new Buffer( buffer.toString() + ' from server' );

        console.log( buffer.toString() );
        
        i = 0;
        var sm = []
        sm[i++] = 128 + 9;
        sm[i++] = 0;
        
        socket.write( new Buffer( sm ) );
    });
});

server.listen( 1792 );
