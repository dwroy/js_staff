var Main ,
    Util = require( 'util' );

Main = function( config ){
    var server = require( './websocket.js' ).init() ,
        modules = config.modules;

    server.on( 'connection' , function( connection ){
        var available = modules[ connection.url ];

        if( available ){
            require( '.' + connection.url + '/' + 'main.js' )( connection );

console.log( connection.url );
            connection.on( 'data' , function( buffer , time ){
                try{
                    var data = JSON.parse( buffer.toString( 'utf8' , 0 , buffer.length ) ) ,
                        route = data[0].split( '.' ) ,
                        controller = require( '.' + this.url + '/' + route[0] + '.js' )
                            .init( data[1] , time , this );
console.log( route );
                    if( controller[ route[1] ] instanceof Function )
                        controller[ route[1] ]( data[1] );
                    else
                        throw new Error( 'Action not found' );

                }catch( e ){
                    Util.log( e );
                }
            });

            connection.on( 'pong' , function( time ){
                console.log( 'client pong at ' + time , this.headers.origin , this.url );
            });
        }else
            connection.close();
    });

    server.listen( config.port , config.host );

    setInterval( function(){
        console.log( 'connections: ' + server._server.connections );
    } , 5000 );
};

module.exports = Main;
