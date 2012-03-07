/**
 * used to load images sounds
 * @author Roy
 */


Source = function(){
    Emitter.call( this );

    this.bag = [];
    this.count = 0;
    this.loadedCount = 0;
};

Util.inherits( Source , Emitter );

Source.prototype.load = function( src , callback ){
    src[ callback || 'onload' ] = this.onload.bind( this , src );
    return src.id = this.count++;
};

Source.prototype.onload = function( src ){
    this.pool[ src.id ] = src;
    this.loadedCount++;
    this.emit( 'load' , src.name );

    if( this.loadedCount === this.count ){
        this.emit( 'complete' );
    }
};

Source.prototype.get = function( n ){
    return this.pool[ n ];
};

Source.prototype.add = function( src ){
    src.id = this.count;
    this.pool.push( src );
    return this.count++;
};
