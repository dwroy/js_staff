var Tank = function(){
    Animation.apply( this , arguments );

    this.init( 5 );
};

Util.inherits( Tank , Animation );

Tank.prototype.init = function( size ){
    var i , bomb ,
        me = this ,
        chamber = [];

    this.chamerSize = size;
    this._bombIndex = 0;
    this._chamber = chamber;

    for( i = 0; i < size; i++ ){
        bomb = new Animation( images.get( 6 ) );
        ff = new Forward( bomb );
        ff.rangeLimit = 500;
        ff.on( 'stop' , function(){
            if( me.bomb === this ) me.bomb = null;
        });
        chamber.push( bomb );
    }
};

Tank.prototype.fire = function(){
    var bomb = this._chamber[ this._bombIndex ];
    if( bomb.forward.state !== Fx.STATE_READY ) return;

    bomb.setRandian( this.rotation.rotation );
    bomb.forward.start();
    this.bomb = bomb;

    this._bombIndex++
    if( this._bombIndex >= this.chamerSize ) this._bombIndex = 0;
};
