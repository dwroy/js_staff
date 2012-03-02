var WebSocket , Connection , 
    util = require( 'util' ) ,
    emitter = require( 'events' ).EventEmitter ,
    crypto = require('crypto') ,
    http = require( 'http' ) ,
    keySuffix = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

Connection = function( request , time , socket ){
    emitter.call( this );
    
    this.headers = request.headers;
    this.method = request.method;
    this.url = request.url;
    this.time = time;
    this._socket = socket;
};

util.inherits( Connection , emitter );

Connection.prototype.send = function( data ){
    var buffer , di ,
        keys = [] ,
        data = new Buffer( data ) ,
        i = 1 ,
        l = data.length;

    if( l < 126 ){
        buffer = new Buffer( l + 6 );
        buffer[i++] = 128 + l;
    }else if( l > 65536 ){
        buffer = new Buffer( l + 10 );
        buffer[i++] = 255;
        buffer.writeUInt32BE( l , i++ , true );
    }else{
        buffer = new Buffer( l + 8 );
        buffer[i++] = 254;
        buffer.writeUInt16BE( l , i++ , true );
    }

    buffer[0] = 129;
    buffer[i++] = keys[0] = Math.floor( Math.random() * 256 );
    buffer[i++] = keys[1] = Math.floor( Math.random() * 256 );
    buffer[i++] = keys[2] = Math.floor( Math.random() * 256 );
    buffer[i++] = keys[3] = Math.floor( Math.random() * 256 );

    for( di = 0; di < l; di++ )
        buffer[i++] = data[di] ^ keys[ di % 4 ];
    
    this._socket.write( buffer );
    this.emit( 'send' );
};

Connection.prototype.sendJson = function( data ){
    this.send( JSON.stringify( data ) );
};

Connection.prototype.ping = function(){
    var buffer = new Buffer( 2 );
    buffer.writeUInt16BE( 35072 , 0 , true );
    this._socket.write( buffer );
};

Connection.prototype.pong = function(){
    var buffer = new Buffer( 2 );
    buffer.writeUInt16BE( 35328 , 0 , true );
    this._socket.write( buffer );
};

Connection.prototype.close = function(){
    this.emit( 'close' );
    this._socket.end();
};

WebSocket = function(){
    var me = this ,
        server = new http.Server;

    emitter.call( this );

    server.on( 'upgrade' , function( request , socket , head ){
        var response , connection ,
            connectTime = new Date().getTime() ,
            key = crypto.createHash( 'sha1' )
                .update( request.headers['sec-websocket-key'] + keySuffix )
                .digest( 'base64' );

        response = 'HTTP/1.1 101 Switching Protocols\r\n' +
            'Upgrade: websocket\r\n' +
            'Connection: Upgrade\r\n' +
            'Time: ' + connectTime + '\r\n' +
            'Sec-WebSocket-Version: ' + request.headers['sec-websocket-version'] + '\r\n' +
            'Sec-WebSocket-Accept: ' + key + '\r\n' +
            'Sec-WebSocket-Origin: ' + request.headers['sec-websocket-origin'] + '\r\n' +
            'Sec-WebSocket-Location: ws://' + request.headers.host + request.url + '\r\n\r\n';

        socket.write( response );
        connection = new Connection( request , connectTime , socket );
        me.emit( 'connection' , connection );

        socket.on( 'data' , function( buffer ){
            var fin , rsv , opcode , masked , i , l ,
                time = new Date().getTime() ,
                bufferIndex = 0 ,
                keys = [];
                data = [];

            do{
                fin  = buffer[bufferIndex] >> 7;
                rsv = buffer[bufferIndex] >> 4 & 7;
                opcode = buffer[bufferIndex++] & 15;
                masked = buffer[bufferIndex] >> 7;

                if( masked === 1 && rsv === 0 ){
                    switch( opcode ){
                    case 1:
                        l = buffer[bufferIndex++] & 127;
                        
                        if( l === 126 ){
                            l = buffer.readUInt16BE( 2 , true );
                            bufferIndex += 2;
                        }else if( l === 127 ){
                            l = buffer.readUInt32BE( 2 , true );
                            bufferIndex += 4;
                        }

                        keys[0] = buffer[bufferIndex++];
                        keys[1] = buffer[bufferIndex++];
                        keys[2] = buffer[bufferIndex++];
                        keys[3] = buffer[bufferIndex++];

                        for( i = 0; i < l; i++ , bufferIndex++ )
                            data.push( buffer[bufferIndex] ^ keys[ i % 4 ] );

                        connection.emit( 'data' , new Buffer( data ) , time );
                        break;
                    case 9:
                        connection.emit( 'ping' , time );
                        connection.pong();
                        break;
                    case 10:
                        connection.emit( 'pong' , time );
                        break;
                    case 8:
                    default:
                        connection.close();
                    }
                }
            }while( fin === 0 );
        });
    });

    this._server = server;
};

util.inherits( WebSocket , emitter );

WebSocket.prototype.listen = function( port , host ){
    this._server.listen( port , host );
    return this;
};

WebSocket.init = function(){
    return new WebSocket;
}

module.exports = WebSocket;
