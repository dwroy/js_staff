/**
 * @author Roy
 * 
 * class circle 
 */

var Circle = function( radius , center ){
    this.radius = radius || 0;
    this.center = center || new Vector3;
};

Circle.prototype = {

    constructor: Circle,

    move: function( vector3 ){
        this.center.add( vector3 );

        return this;
    },

    copy: function(){
        new Circle( this.radius , this.center.copy() );
    },

    isIntersected: function( geometry ){
        if( geometry === this ) return false;

        if( geometry instanceof Circle )
            return this.isIntersectedInCircle( geometry );
        
        if( geometry instanceof Polygon )
            return this.isIntersectedInPolygon( geometry );
        
        throw new Error( 'Wrong intersector' );
    },

    isIntersectedInCircle: function( circle ){
        return this.center.distance( circle.center ) <= this.radius + circle.radius;
    },

    isIntersectedInPolygon: function( polygon ){
        var center = this.center ,
            vertices = polygon.vertices ,
            length = vertices.length ,
            closestVertexIndex = 0 ,
            lengthToVertices = [ center.distanceSquare( vertices[0] ) ] ,
            radiusSquare = this.radius * this.radius;

        for( var i = 1 ; i < length ; i++ ){
            lengthToVertices.push( center.distanceSquare( vertices[i] ) );
            if( lengthToVertices[i] <= radiusSquare ) return true;
            if( lengthToVertices[i] < lengthToVertices[ closestVertexIndex ] )
                closestVertexIndex = i;
        }

        var prevIndex = closestVertexIndex - 1,
            nextIndex = closestVertexIndex + 1;
        
        if( prevIndex < 0 ) prevIndex = length;
        if( nextIndex > length ) nextIndex = 0;

        var crossProduct ,
            prevVertex = vertices[ prevIndex ] ,
            vertex = vertices[ closestVertexIndex ] ,
            nextVertex = vertices[ nextIndex ];

        crossProduct = ( vertex.x - prevVertex.x ) * ( center.y - vertex.y ) - 
                ( vertex.y - prevVertex.y ) * ( center.x - vertex.x );

        if( crossProduct > 0 ){
            if( crossProduct > radiusSquare ) return false;

            if( ( center.x - vertex.x ) * ( vertex.x - prevVertex.x ) -
                    ( center.y - vertex.y ) * ( prevVertex.y - vertex.y ) < 0 )
                return false;

            return true;
        }

        crossProduct = ( nextVertex.x - vertex.x ) * ( center.y - nextVertex.y ) - 
                ( nextVertex.y - vertex.y ) * ( center.x - nextVertex.x );

        if( crossProduct > 0 ){
            if( crossProduct > radiusSquare ) return false;

            if( ( center.x - vertex.x ) * ( vertex.x - nextVertex.x ) -
                    ( center.y - vertex.y ) * ( nextVertex.y - vertex.y ) < 0 )
                return false;
        }

        return true;
    }
};
