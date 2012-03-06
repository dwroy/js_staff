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
    this.mouseStatus = MOUSE_UP ,
    this.KeyStatus = KEY_UP ,
    this.mouse = { x: 0 , y: 0 , lastStatus: MOUSE_UP , status: MOUSE_UP } ,
    this.key = { code: 0 , lastStatus: KEY_UP , status: KEY_UP };

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
        me.mouseStatus = MOUSE_DOWN;
    } , false );

    canvas.addEventListener( 'mouseup' , function( e ){
        me.mouseEvent= e;
        me.mouseStatus = MOUSE_UP; 
    } , false );

    document.addEventListener( 'keydown' , function( e ){
        me.keyEvent = e;
        me.keyStatus = KEY_DOWN;
    } , false );

    document.addEventListener( 'keyup' , function( e ){
        me.keyEvent = e;
        me.keyStatus = KEY_UP;
    } , false );
    
    rect = canvas.getBoundingClientRect();
    this.top = rect.top;
    this.left = rect.left;
    this.canvas = canvas;
};

Camera.prototype = {

    constructor: Camera,

    shoot: function( scene ){
        var ctx , list ,
            depthIndex = 0 ,
            objects = scene.objects;

        for( ; depthIndex < this.depth; depthIndex++ ){
            if( ( list = objects[ depthIndex ] ) && list.length > 0 ){
                ctx = this.films[ depthIndex ];
                ctx.clearRect( -ctx.ox , -ctx.oy , this.width , this.height );

                while( ( object = list.pop() ) )
                    object.draw( ctx );
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

            mouse.lastStatus = mouse.status;
            mouse.status = this.mouseStatus;
        }

        return mouse;
    },

    getKey: function(){
        var key = this.key;

        if( this.keyEvent ){
            key.code = this.keyEvent.keyCode;
            key.lastStatus = key.status;
            key.status = this.keyStatus;
        }

        return key;
    }
};