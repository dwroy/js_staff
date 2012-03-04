(function(){

    var c = function( data , time , connection ){
        Controller.call( this , data , time , connection );
    };

    Controllers.ui = c;
    Util.inherits( c , Controller );

    c.prototype.login = function(){
        var controller = this ,
            div = $( 'user_name_input' );

        div.style.display = 'block';

        $( 'start_button' ).addEventListener( 'click' , function(){
            var name = $( 'name' ).value;
            var password = $( 'password' ).value;
            controller.send( 'user.login' , { name: name , password: password } );
            div.style.display = 'none';
        } , false );
    };

    c.prototype.scene = function( data ){
        var div = document.getElementById( 'canvas_box' );
        scene = [];
        camera = new Camera( 0 , 0 , 920 , 620 , 3 , div ); 
    };
})();
