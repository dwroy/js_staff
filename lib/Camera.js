/**
 * @author Roy
 *
 * class Camera
 */

var Camera = function( x , y , width , height , depth , container ){
    var canvas , film,
        center = new Vector3( x , y , depth ),
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
        film = canvas.getContext( '2d' );
        film.ox = film.oy = 0;
        this.films.push( film );
        this.container.appendChild( canvas );
    }

    this.canvas = canvas;

    var boundingRect = canvas.getBoundingClientRect(),
        _offsetX = boundingRect.left + this.halfWidth,
        _offsetY = boundingRect.top + this.halfHeight;

    /**
     * mouse events
     */
    canvas.addEventListener( 'mousemove' , function( e ){
        Mouse.x = e.pageX + center.x - _offsetX;
        Mouse.y = e.pageY + center.y - _offsetY;
        camera.emit( 'mousemove' );
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

Util.inherits( Camera , Rectangle );
Util.extend( Camera , Emitter );

Camera.prototype.shoot = function( scene ){
    var film , object2D , objects2D,
        center = this.center;

    for( var i = 0 ; i < center.z ; i++ ){
        if( ( objects2D  = scene.objects2D[i] )
                && objects2D.length > 0 ){
            film = this.films[i];
            film.clearRect( -film.ox , -film.oy , this.width , this.height );

            while( ( object2D = objects2D.pop() ) )
                object2D.draw( film , this );
        }
    }
};

/**
 * camera follow a coordinate
 */
Camera.prototype.follow = function( vector3 ){
    this.center.setValue( vector3.x , vector3.y );
};

Camera.prototype.addEvent = function( name , handler ){
    this.canvas.addEventListener( name , handler , false );
};