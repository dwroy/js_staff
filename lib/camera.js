var Camera = function( x , y , width , height , depth , container ){
    var canvas , ctx , i ,
        me = this;

    Emitter.call( this );
    this.x = x ,
    this.y = y ,
    this.width = width ,
    this.height = height ,
    this.depth = depth ,
    this.container = container || document.body ,
    this.films = [];
    this.mouse = { x: 0 , y: 0 , state: 0 };
    this._mouseEvent = { offsetX: 0 , offsetY: 0 , state: 0 };

    for( i = 0; i < depth; i++ ){
        canvas = document.createElement( 'canvas' );
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'absolute';
        ctx = canvas.getContext( '2d' );
        ctx.x = x;
        ctx.y = y;
        ctx.width = width;
        ctx.height = height;
        ctx.ox = ctx.oy = 0;
        this.films.push( ctx );
        this.container.appendChild( canvas );
    }

    canvas.addEventListener( 'mousemove' , function( e ){
        me._mouseEvent = e;
    } , false );

    canvas.addEventListener( 'mousedown' , function( e ){
        e.preventDefault();
        me.mouse.state = Camera.MOUSE_STATE_DOWN;
        me.emit( 'mousedown' , e );
    } , false );

    canvas.addEventListener( 'click' , function( e ){
        me.emit( 'click' , e );
    } , false );

    canvas.addEventListener( 'mouseup' , function( e ){
        me.mouse.state = Camera.MOUSE_STATE_UP;
        me.emit( 'mouseup' , e );
    } , false );

    document.addEventListener( 'keydown' , function( e ){
        me.emit( 'keydown' , e );
    } , false );

    document.addEventListener( 'keyup' , function( e ){
        me.emit( 'keyup' , e );
    } , false );
    
    this.canvas = canvas;
    this.initLocation();    
};

Util.inherits( Camera , Emitter );

Camera.MOUSE_STATE_UP = 0;
Camera.MOUSE_STATE_DOWN = 1;

Camera.prototype.initLocation = function(){
    var rect = this.canvas.getBoundingClientRect();
    this.top = rect.top;
    this.left = rect.left;
};

Camera.prototype.shoot = function( scene ){
    var ctx , list , brick ,
        depthIndex = 0;

    for( ; depthIndex < this.depth; depthIndex++ ){
        if( ( list = scene.filmBag[ depthIndex ] ) && list.length > 0 ){
            ctx = this.films[ depthIndex ];
            ctx.clearRect( -ctx.ox , -ctx.oy , this.width , this.height );

            while( ( brick = list.pop() ) )
                brick.draw( ctx );
        }
    }
};

Camera.prototype.getMouse = function(){
    if( this._mouseEvent.offsetX === undefined ){
        this.mouse.x = this._mouseEvent.pageX - this.left;
        this.mouse.y = this._mouseEvent.pageY - this.top;
    }else{
        this.mouse.x = this._mouseEvent.offsetX;
        this.mouse.y = this._mouseEvent.offsetY;
    }
    return this.mouse;
};
