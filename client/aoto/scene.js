(function(){
    var c = function( data , time , connection ){
        Controller.call( this , data , time , connection );
    };

    Controllers.scene = c;
    Util.inherits( c , Controller );

    c.prototype.list = function( data ){
        var i 
            c = this , 
            body = document.body;

        $( 'user-name-input' ).style.display = 'none';

        for( i = 0; i < data.length; i++ ){
            div = document.createElement( 'div' );
            div.textContent = i;
            body.appendChild( div );
        }

        btn = document.createElement( 'button' );
        btn.textContent = 'Create new room';
        btn.addEventListener( 'click' , function(){
            c.send( 'scene.create' );
        } , false );

        body.appendChild( btn );
    };

    c.prototype.create = function( data ){
        console.log( data );
    };

    c.prototype.enter = function( id ){
        console.log( id );
    };

    c.prototype.sync = function( data ){
        scene.push( data );
        camera.shoot( data );
    };

    c.prototype.add = function( data ){
        var vehicle = new O( data.x , data.y , data.z , images.get( 5 ) );
        scene.add( vehicle );
    };
})();
