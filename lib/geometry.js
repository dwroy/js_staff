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

Coordinate.prototype.getSegmentLength = function( coordinate ){
    return Math.sqrt( this.getSegmentLengthSquare( coordinate ) );
};

Coordinate.prototype.getSegmentLengthSquare = function( coordinate ){
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
 * circle class
 * 
 * @see Coordinate
 * @radius float
 */
var Circle = function( x , y , z , radius ){
    this.center = new Coordinate( x , y , z );
    this.radius = radius;
};

Circle.prototype = {};
Circle.prototype.constructor = Circle;

/**
 * move
 * 
 * @vector Vector
 */
Circle.prototype.move = function( vector ){
    this.center.move( vector );
};

/**
 * Calculate whether is intersected with a circle/polygon object
 * 
 * @geometry Circle/Polygon
 * @returns Boolean
 */
Circle.prototype.isIntersected = function( geometry ){
    if( geometry instanceof Circle )
        return this.center.calculateRange( geometry.center ) <= this.radius
            + geometry.radius;
    
    if( geometry instanceof Polygon )
        return this.isIntersectedWithPolygon( geometry );
    
    throw new Error( 'Wrong intersector' );
};

/**
 * is intersected with a circle object
 * 
 * @circle Circle
 * @returns Boolean
 */
Circle.prototype.isIntersectedWithCircle = function( circle ){
    return this.center.getSegmentLength( circle.center ) <= this.radius 
            + circle.radius;
};

/**
 * is intersected with a polygon object
 * 
 * @polygon Polygon
 * @returns Boolean
 */
Circle.prototype.isIntersectedWithPolygon = function( polygon ){
    var center = this.center ,
        vertices = polygon.vertices ,
        length = vertices.length ,
        closestVertexIndex = 0 ,
        lengthToVertices = [ center.getSegmentLengthSquare( vertices[0] ) ] ,
        radiusSquare = this.radius * this.radius;

    for( var i = 1 ; i < length ; i++ ){
        lengthToVertices.push( center.getSegmentLengthSquare( vertices[i] ) );

        if( lengthToVertices[i] <= radiusSquare ) return true;

        if( lengthToVertices[i] < lengthToVertices[ closestVertexIndex ] )
            closestVertexIndex = i;
    }

    var prevIndex = closestVertexIndex - 1 ,
        nextIndex = closestVertexIndex + 1;
    
    if( prevIndex < 0 ) prevIndex = length;
    if( nextIndex > length ) nextIndex = 0;

    var crossProduct , 
        vector = { x: 0 , y: 0 } ,
        prevVertex = vertices[ prevIndex ] ,
        vertext = vertices[ closestVertexIndex ] ,
        nextVertex = vertices[ nextIndex ];

    vector1X = vertex.x - prevVertex.x;
    vector1Y = vertex.y - prevVertex.y;

    vector2x = vertex.x


    crossProduct = ( vertex.x - prevVertex.x ) * ( center.y - vertex.y ) - 
            ( vertex.y - prevVertex.y ) * ( center.x - vertex.x );

    if( crossProduct >= 0 ){
        if( crossProduct > radiusSquare ) return false;


    }

    if( ( nextVertex.x - vertex.x ) * ( center.y - nextVertex.y ) - 
            ( nextVertex.y - vertex.y ) * ( center.x - nextVertex.x ) >= 0 ){


    }

    return true;
};
