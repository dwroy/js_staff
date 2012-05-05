/**
 * @author Roy
 * 
 * class Vehicle
 */



var Vehicle = function( img , velocity , intersectRadius ){
    Emitter.call( this );

    this.objects2D = new Object2D( img , new Circle( intersectRadius ) );
    this.move = new Move( this.objects2D , velocity );
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
    this.objects2D.face( x, y );
};

Vehicle.prototype.signin = function( scene ){
    scene.add( this.objects2D );
    scene.animations.push( this.move );
};