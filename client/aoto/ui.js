(function(){

    var c = function( data , time , connection ){
        Controller.call( this , data , time , connection );
    };

    Controllers.ui = c;
    Util.inherits( c , Controller );

    c.prototype.login = function(){
        var c = this ,
            div = $( 'user-name-input' );

        div.style.display = 'block';

        $( 'start-button' ).addEventListener( 'click' , function(){
            var name = $( 'name' ).value;
            var key = $( 'key' ).value;
            c.send( 'user.login' , { name: name , key: key } );
            div.style.display = 'none';
        } , false );
    };

    c.prototype.scene = function( data ){
        var div = document.createElement( 'div' );
        div.className = 'canvas-box';
        scene = [];
        document.body.appendChild( div );
        camera = new Camera( 0 , 0 , 920 , 620 , 3 , div ); 
    };
})();
