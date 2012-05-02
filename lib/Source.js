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
    this.bag[ src.id ] = src;
    this.loadedCount++;
    this.emit( 'load' , src );

    if( this.loadedCount === this.count )
        this.emit( 'complete' );
};

Source.prototype.get = function( i ){
    return this.bag[ i ];
};

Source.prototype.add = function( src ){
    src.id = this.count;
    this.bag.push( src );
    return this.count++;
};