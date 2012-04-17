/**
 * coordinate class
 * 
 * @x float
 * @y float
 * @z float
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
 * 
 * @vector Vector
 */
Coordinate.prototype.move = function( vector ){
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
};

Coordinate.prototype.getLineLength = function( coordinate ){
    return Math.sqrt( this.getLineLengthSquare( coordinate ) );
};

Coordinate.prototype.getLineLengthSquare = function( coordinate ){
    var x = this.x - coordinate.x , 
        y = this.y - coordinate.y , 
        z = this.z - coordinate.z;

    return x * x + y * y + z * z;
};

/**
 * make a vector by pointing to a coordinate
 * 
 * @param coordinate
 */
Coordinate.prototype.createVectorTo = function( coordinate ){
    return new Vector( coordinate.x - this.x ,
        coordinate.y - this.y ,
        coordinate.z - this.z );
};

/**
 * make a vector by pointing from a coordinate
 * 
 * @param coordinate
 */
Coordinate.prototype.createVectorFrom = function( coordinate ){
    return new Vector( this.x - coordinate.x ,
        this.y - coordinate.y , 
        this.z - coordinate.z );
};

/**
 * vector class inherits from coordinate
 * 
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
 * 
 * @vector Vector
 */
Vector.prototype.add = function( vector ){
    this.move( vector );
    this.length = this._getLength();
};

/**
 * polygon class
 * 
 * @vertices [ Coordinate , ... ] coordinates must in clockwise order
 * @center Coordinate, defaults to Coordinate( 0 , 0 , 0 )
 */
var Polygon = function( vertices , center ){
    this.vertices = vertices;
    this.center = center || new Coordinate;
};

Polygon.prototype = {};
Polygon.prototype.constructor = Polygon;

/**
 * move polygon by vector
 * 
 * @vector Vector
 */
Polygon.prototype.move = function( vector ){
    var i , vertices = this.vertices;

    this.center.move( vector );
    for( i = 0 ; i < vertices.length ; i++ ) vertices[ i ].move( vector );
};

Polygon.prototype.moveTo = function( coordinate ){
    var center = this.center;
    
    this.move( {
        x: coordinate.x - center.x ,
        y: coordinate.y - center.y ,
        z: coordinate.z - center.z
    } );
};

/**
 * copy from weibo
 * 
 * @coordinate Coordinate
 * @return Boolean
 */
Polygon.prototype.isCover = function( coordinate ){
    var i , minx , maxx , vertex/* vertex of the vector line */ ,
        vertices = this.vertices ,
        length = vertices.length ,
        sameSideCount = 0 ,
        origin = vertices[ length - 1 ]; //origin of the vector line

	  for( i = 0 ; i < length ; i++ ){
		    vertex = vertices[i];

        if( origin.x > vertex.x ){
            minx = vertex.x;
            maxx = origin.x;
        }else{
            minx = origin.x;
            maxx = vertex.x;
		    }

 		    // Check whehter x is within interval of upper edge QP or lower edge PQ
		    if( coordinate.x >= minx && coordinate.x <= maxx){
			      if( ( vertex.x - origin.x ) * ( coordinate.y - vertex.y ) - 
                ( vertex.y - origin.y ) * ( coordinate.x - vertex.x ) >= 0 )

				        return false;

            // Previoiusly an edge has been found, so both edges is now  found.
            if ( sameSideCount > 0 ) return true;

            sameSideCount++;
		    }

        origin = vertex;
	  }

	  return false;
};

/**
 * round class
 * 
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
 * 
 * @vector Vector
 */
Round.prototype.move = function( vector ){
    this.center.move( vector );
};

/**
 * Calculate whether is intersected with a round/polygon object
 * 
 * @geometry Round/Polygon
 * @returns Boolean
 */
Round.prototype.isIntersected = function( geometry ){
    if( geometry instanceof Round )
        return this.center.calculateRange( geometry.center ) <= this.radius
            + geometry.radius;
    
    if( geometry instanceof Polygon )
        return this.isIntersectedWithPolygon( geometry );
    
    throw new Error( 'Wrong intersector' );
};

/**
 * is intersected with a round object
 * 
 * @round Round
 * @returns {Boolean}
 */
Round.prototype.isIntersectedWithRound = function( round ){
    return this.center.getLineLength( round.center ) <= this.radius 
            + round.radius;
};

Round.prototype.isIntersectedWithPolygon = function( polygon ){
    var i , 
        center = this.center , 
        vertices = polygon.vertices ,
        length = vertices.length ,
        closestThreeVertices = [ vertices[0] , vertices[1] , vertices[2] ] ,
        lengthToVertices = [ center.getLineLengthSquare( vertices[0] ) ,
                             center.getLineLengthSquare( vertices[1] ) ,
                             center.getLineLengthSquare( vertices[2] ) ,
                            ];

    for( i = 3 ; i < length ; i++ ){
        
    }
};

