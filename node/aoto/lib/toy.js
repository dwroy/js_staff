var Toy ,
    Bag = [];

Toy = function( x , y , z ){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Toy.prototype = {

    constructor: Toy
};

module.exports = Toy;
