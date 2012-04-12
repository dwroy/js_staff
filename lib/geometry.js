/**
 * coordinate class
 * @x int
 * @y int
 * @z int
 */
var Coordinate = function( x , y , z ){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Coordinate.prototype = {};
Coordinate.prototype.constructor = Coordinate;

/**
 * move coordinate by vector
 * @vector Vector
 */
Coordinate.prototype.move = function( vector ){
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
};

/**
 * vector class inherits from coordinate
 * @see Coordinate
 */
var Vector = function( x , y , z ){
    Coordinate.call( this , x , y , z );
    this.length = this._getLength();
};

Util.inherits( Vector , Coordinate );

/**
 * calculate the length of vector, use as a private method
 */
Vector.prototype._getLength = function(){
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
};

/**
 * vector plus operator 
 * @vector Vector
 */
Vector.prototype.add = function( vector ){
    this.move( vector );
    this.length = this._getLength();
};

/**
 * polygon class
 * @vertices [ Coordinate , ... ]
 */
var Polygon = function( vertices ){
    this.vertices = vertices;
};

Polygon.prototype = {};
Polygon.prototype.constructor = Polygon;

/**
 * move polygon by vector
 * @vector Vector
 */
Polygon.prototype.move = function( vector ){
    var i ,
        vertices = this.vertices;

    for( i = 0 ; i < vertices.length ; i++ )
        vertices[i].move( vector );
};

/**
 * round class
 * @see Coordinate
 * @radius float
 */
var Round = function( x , y , z , radius ){
    this.center = new Coordinate( x , y , z );
    this.radius = radius;
};

Round.prototype = {};
Round.prototype.constructor = Round;

/**
 * move 
 */
Round.prototype.move = function( vector ){
    this.center.move( vector );
};

