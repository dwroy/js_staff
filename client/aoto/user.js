(function(){

    var c = function( data , time , connection ){
        Controller.call( this , data , time , connection );
    };

    Controllers.user = c;
    Util.inherits( c , Controller );

    c.prototype.login = function( data ){
        CurrentUser = data;
        
        var div = document.getElementById( 'canvas_box' );
        scene = [];
        camera = new Camera( 0 , 0 , 920 , 620 , 3 , div ); 

        Frame.loop = function(){

        };
    };
})();
