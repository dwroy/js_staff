(function(){

    var c = function( data , time , connection ){
        Controller.call( this , data , time , connection );
    };

    Controllers.user = c;
    Util.inherits( c , Controller );

    c.prototype.login = function( data ){
        CurrentUser = data;
    };
})();
