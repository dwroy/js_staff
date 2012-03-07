var Camera = function( x , y , width , height , depth , container ){
    var canvas , ctx , i , rect ,
        me = this;

    this.x = x ,
    this.y = y ,
    this.width = width ,
    this.height = height ,
    this.depth = depth ,
    this.container = container || document.body ,
    this.films = [] ,
    this.mouseStatus = Camera.MOUSE_UP ,
    this.KeyStatus = Camera.KEY_UP ,
    this.mouse = { x: 0 , y: 0 , lastState: 0 , state: 0 } ,
    this.key = { code: 0 , lastState: 0 , state: 0 };

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
        me.mouseEvent= e;
    } , false );

    canvas.addEventListener( 'mousedown' , function( e ){
        e.preventDefault();
        me.mouseEvent= e;
        me.mouseState = Camera.MOUSE_DOWN;
    } , false );

    canvas.addEventListener( 'mouseup' , function( e ){
        me.mouseEvent= e;
        me.mouseState = Camera.MOUSE_UP; 
    } , false );

    document.addEventListener( 'keydown' , function( e ){
        me.keyEvent = e;
        me.keyState = Camera.KEY_DOWN;
    } , false );

    document.addEventListener( 'keyup' , function( e ){
        me.keyEvent = e;
        me.keyState = Camera.KEY_UP;
    } , false );
    
    this.canvas = canvas;
    this.initLocation();    
};

Camera.prototype = {

    constructor: Camera,

    initLocation: function(){
        rect = this.canvas.getBoundingClientRect();
        this.top = rect.top;
        this.left = rect.left;
    },

    shoot: function( scene ){
        var ctx , list ,
            depthIndex = 0;

        for( ; depthIndex < this.depth; depthIndex++ ){
            if( ( list = scene.bag[ depthIndex ] ) && list.length > 0 ){
                ctx = this.films[ depthIndex ];
                ctx.clearRect( -ctx.ox , -ctx.oy , this.width , this.height );

                while( ( toy = list.pop() ) )
                    toy.draw( ctx );
            }
        }
    },

    getMouse: function(){
        var mouse = this.mouse ,
            event = this.mouseEvent;

        if( event ){
            if( event.offsetX === undefined ){
                mouse.x = event.pageX - this.left;
                mouse.y = event.pageY - this.top;
            }else{
                mouse.x = event.offsetX;
                mouse.y = event.offsetY;
            }

            mouse.lastState = mouse.state;
            mouse.state = this.mouseState;
        }

        return mouse;
    },

    getKeyboard: function(){
        var key = this.key;

        if( this.keyEvent ){
            key.code = this.keyEvent.keyCode;
            key.lastState = key.state;
            key.state = this.keyState;
        }

        return key;
    }
};

Camera.KEY_UP = 0;
Camera.KEY_DOWN = 1;
Camera.MOUSE_UP = 0;
Camera.MOUSE_DOWN = 1;
