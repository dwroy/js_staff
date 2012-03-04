var Application = function( config ){
    this.config = config;
    this.name = 'ws://' + config.host + ':' + config.port;
    this.connections = {};
};

Application.prototype = {
    
    constructor: Application ,

    init: function( url ){
        ws = new WsClient( this.name + url );

        ws.on( 'open' , function( event ){
            ws.on( 'data' , function( event ){
                //try{
                    var data = JSON.parse( event.data ) ,
                        route = data[0].split( '.' ) ,
                        c = new Controllers[ route[0] ]( data[1] , event.timeStamp , this );

                    if( c[ route[1] ] instanceof Function )
                        c[ route[1] ]( data[1] );
                    else
                        throw new Error( 'Action not found' );

                //}catch( e ){
                 //   console.log( e );
                //}
            });
        });
    }
};

Application.init = function( config ){
    return new Application( config );
};
