var WebSocket = require( './websocket.js' );
var ws = new WebSocket;

ws.listen( 1792 );

ws.on( 'connection' , function( connection ){

    console.log( 'new client' );

    connection.on( 'data' , function( buffer , time ){
        var controller = this.url.replace( '/' , '' );

        console.log( buffer.toString() , controller , this.url );
    });

    connection.on( 'pong' , function( time ){

        console.log( 'client pong at ' + time , this.headers.origin );

        setTimeout( function(){
            connection.ping();   
        } , 10000 );

    });

    connection.ping();
});
