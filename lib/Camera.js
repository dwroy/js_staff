/**
 * @author Roy
 *
 * class Camera
 */

var Camera = function( x , y , width , height , depth , container ){
    var canvas , ctx,
        center = new Vector3( x , y ),
        camera = this;

    Emitter.call( this );
    Rectangle.call( this , width , height , center );
    this.rotation = new Rotation;
    this.container = container || document.body;
    this.films = [];
    
    for( var i = 0 ; i < depth ; i++ ){
        canvas = document.createElement( 'canvas' );
        canvas.camera = this;
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'absolute';
        ctx = canvas.getContext( '2d' );
        ctx.camera = this;
        this.films.push( ctx );
        this.container.appendChild( canvas );
    }

    this.canvas = canvas;

    var boundingRect = canvas.getBoundingClientRect(),
        _mouseOffsetX = boundingRect.left,
        _mouseOffsetY = boundingRect.top ;

    console.log( boundingRect );

    /**
     * mouse events
     */
    canvas.addEventListener( 'mousemove' , function( e ){
        Mouse.x = e.pageX + center.x - _mouseOffsetX;
        Mouse.y = e.pageY + center.y - _mouseOffsetY;
        camera.emit( 'mousemove' );

        console.log( Mouse.x , Mouse.y );
    } , false );

    canvas.addEventListener( 'mousedown' , function( e ){
        e.preventDefault();
        Mouse.state = Mouse.STATE_DOWN;
        camera.emit( 'mousedown' );
    } , false );

    canvas.addEventListener( 'click' , function( e ){
        camera.emit( 'click' );
    } , false );

    canvas.addEventListener( 'mouseup' , function( e ){
        Mouse.state = Mouse.STATE_UP;
        camera.emit( 'mouseup' );
    } , false );

};

Util.inherits( Camera , Rectangle );
Util.extend( Camera , Emitter );
