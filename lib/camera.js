/**
 * Mouse event class
 */
var Mouse = function(){
    this.x = 0;
    this.y = 0;
    this.lastState = Mouse.STATE_DOWN;
    this.state = Mouse.STATE_UP;
};

Mouse.STATE_UP = 0;
Mouse.STATE_DOWN = 1;
Mouse.prototype = {};
Mouse.prototype.constructor = Mouse;

var Camera = function( x , y , width , height , depth , container ){
    var canvas , ctx ,
        camera = this ,
        coordinate = new Coordinate( x , y ) ,
        mouse = new Mouse;

    Emitter.call( this );
    this.coordinate = coordinate;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.container = container || document.body;
    this.films = [];

    for( var i = 0 ; i < depth ; i++ ){
        canvas = document.createElement( 'canvas' );
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'absolute';
        ctx = canvas.getContext( '2d' );
        ctx.coordinate = this.coordinate;
        ctx.width = width;
        ctx.height = height;
        ctx.ox = ctx.oy = 0;
        this.films.push( ctx );
        this.container.appendChild( canvas );
    }

    this.canvas = canvas;
    this.mouse = mouse;
    this.initLocation();

    /**
     * mouse events
     */
    canvas.addEventListener( 'mousemove' , function( e ){
        mouse.x = e.pagex - camera.left - coordinate.x;
        mouse.y = e.pageY - camera.top - coordinate.y;
        camera.emit( 'mousemove' , mouse );
    } , false );

    canvas.addEventListener( 'mousedown' , function( e ){
        e.preventDefault();
        mouse.state = Mouse.STATE_DOWN;
        camera.emit( 'mousedown' , mouse );
    } , false );

    canvas.addEventListener( 'click' , function( e ){
        camera.emit( 'click' , mouse );
    } , false );

    canvas.addEventListener( 'mouseup' , function( e ){
        mouse.state = Mouse.STATE_UP;
        camera.emit( 'mouseup' , mouse );
    } , false );

    /**
     * touch events
     */
    canvas.addEventListener( 'touchstart' , function( e ){
        camera.emit( 'touchstart' , e );
    } , false );

    canvas.addEventListener( 'touchmove' , function( e ){
        camera.emit( 'touchmove' , e );
    } , false );

    canvas.addEventListener( 'touchend' , function( e ){
        camera.emit( 'touchend' , e );
    } , false );

    canvas.addEventListener( 'touchcancel' , function( e ){

        camera.emit( 'touchcancel' , e );
    } , false );

    /**
     * keyboard event
     */
    document.addEventListener( 'keydown' , function( e ){
        camera.emit( 'keydown' , e );
    } , false );

    document.addEventListener( 'keyup' , function( e ){
        camera.emit( 'keyup' , e );
    } , false );
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
    var ctx , animations , animation , depthIndex = 0;

    for( ; depthIndex < this.depth ; depthIndex++ ){
        if( ( animations = scene.filmAnimations[ depthIndex ] )
                && animations.length > 0 ){
            ctx = this.films[ depthIndex ];
            ctx.clearRect( -ctx.ox , -ctx.oy , this.width , this.height );

            while( ( animation = animations.pop() ) )
                animation.render( ctx );
        }
    }
};

Camera.prototype.getMouse = function(){
    if( this._mouseEvent.offsetX === undefined ){
        this.mouse.x = this._mouseEvent.pageX - this.left + this.coordinate.x;
        this.mouse.y = this._mouseEvent.pageY - this.top + this.coordinate.y;
    }else{
        this.mouse.x = this._mouseEvent.offsetX + this.coordinate.x;
        this.mouse.y = this._mouseEvent.offsetY + this.coordinate.y;
    }
    return this.mouse;
};

/**
 * camera follow a coordinate
 */
Camera.prototype.follow = function( coordinate ){
    this.coordinate.x = coordinate.x - this.width / 2;
    this.coordinate.y = coordinate.y - this.height / 2;
};

Camera.prototype.addEvent = function( name , handler ){
    this.canvas.addEventListener( name , handler , false );
};

Camera.prototype.requestFullScreen = function(){
    this.container.webkitRequestFullScreen();
};
