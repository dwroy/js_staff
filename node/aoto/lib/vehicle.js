var Vehicle;

Vehicle = function( x , y , z ){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Vehicle.prototype = {

    constructor: Vehicle,

    move: function(){

    },

    info: function(){
        return { id: this.id , type: 'Vehicle' , x: this.x , y: this.y , z: this.z };
    }

};

module.exports = Vehicle;
