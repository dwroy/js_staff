/**
 * @author Roy
 * 
 * class Vehicle
 */



var Vehicle = function( img , velocity , intersectRadius ){
    Emitter.call( this );

    this.object2D = new Object2D( img , new Circle( intersectRadius ) );
    this.move = new Move( this.object2D , velocity );

    this.move.on( 'intersect' , function( intersectors ){
        this.emit( 'hit' , intersectors );
    } , this );
};

Util.inherits( Vehicle , Emitter );

Vehicle.prototype.start = function( velocity ){
    if( velocity !== undefined ) this.move.velocity = velocity;
    this.move.start();
};

Vehicle.prototype.stop = function(){
    this.move.stop();
};

Vehicle.prototype.isRunning = function(){
    return this.move.state === Animation.STATE_RUN;
};

Vehicle.prototype.face = function( x , y ){
    this.object2D.face( x, y );
};

Vehicle.prototype.setPosition = function( x , y ){
    this.object2D.setPosition( x , y );
};

Vehicle.prototype.signin = function( scene ){
    scene.add( this.object2D );
    scene.animations.push( this.move );
};