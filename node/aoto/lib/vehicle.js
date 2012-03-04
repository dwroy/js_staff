var Vehicle , 
    Util = require( 'util' );
    Toy = require( './toy.js' );

Vehicle = function( x , y , z ){
    Toy.call( this , x , y ,z );

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Util.inherits( Vehicle , Toy );

Vehicle.prototype.getData = function(){
    return { id: this.id , type: 'Vehicle' , x: this.x , y: this.y , z: this.z };
};

module.exports = Vehicle;
