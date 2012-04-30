/**
 * @author Roy
 * 
 * class Polygon
 */

var Polygon = function( vertices , center ){
    this.vertices = vertices;
    this.center = center || new Vector3;
};

Polygon.prototype = {

    constructor: Polygon,

    move: function( vector3 ){
        var vertices = this.vertices ,
            length = vertices.length;

        this.center.add( vector3 );
        for( var i = 0 ; i < length ; i++ ) vertices[i].add( vector3 );

        return this;
    },

    copy: function(){
        var i = 0,
            copy = [], 
            vertices = this.vertices,
            length = vertices.length;

        for( ; i < length ; i++ ) copy.push( vertices[i].copy() );

        return new Polygon( copy , this.center.copy() );
    }
};
