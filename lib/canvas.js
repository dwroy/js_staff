var Source , Scene , SceneImage ,
    RequestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame;

Function.prototype.bind = function( scope ){
    var me = this ,
        args = Array.prototype.slice.call( arguments, 1 );

    return function(){return me.apply( scope , args );};
};

Source = function(){
    Emitter.call( this );

    this.pool = [];
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

SceneImage = function( x , y , z , image ){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotation = 0;
    this.image = image;
};

SceneImage.prototype = {

    constructor: SceneImage,

    draw: function( ctx ){
        var img = this.image ,
            x   = this.x - ctx.x ,
            y   = this.y - ctx.y;

        if( ( x > 0 ? x < ctx.width: -x < img.width ) &&
            ( y > 0 ? y < ctx.height: -y < img.height ) )
        {
            ctx.translate( x - ctx.ox , y - ctx.oy );
            ctx.rotate( this.rotation );
            ctx.drawImage( img , -img.ox , -img.oy , img.width , img.height );
            ctx.rotate( -this.rotation );
            ctx.ox = x , ctx.oy = y;
        }
    }
};

Scene = function(){
    this.actions = [];
    this.objects = [];
};

Scene.prototype = {

    constructor: Scene,

    init: function() {

    },

    add: function( object )
    {
        this.actions[object.id] = object;
        this.objects[ object.z ] ? this.objects[ object.z ].push( object ) : this.objects[ object.z ] = [ object ];
    },

    perform: function()
    {
        var object , actions , action , nextActions;

        while( ( object = this.actions.pop() ) )
        {
            actions = object.actions;
            nextActions = [];

            while( ( action = actions.pop() ) )
            {
                if( action[0] && object[ action[0] ]( action[1] ) )
                {
                    nextActions.push( action );
                }
            }

            object.actions = nextActions;
        }
    },

    getGrid: function( x , y , z )
    {
        
    },

    reachable: function()
    {

    }
};

var Camera = function( x , y , width , height , depth , container )
{
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

    for( i = 0; i < depth; i++ )
    {
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

    canvas.addEventListener( 'mousemove' , function( e )
    {
        me.mouseEvent= e;
    } , false );

    canvas.addEventListener( 'mousedown' , function( e )
    {
        e.preventDefault();
        me.mouseEvent= e;
        me.mouseStatus = MOUSE_DOWN;
    } , false );

    canvas.addEventListener( 'mouseup' , function( e )
    {
        me.mouseEvent= e;
        me.mouseStatus = MOUSE_UP; 
    } , false );

    document.addEventListener( 'keydown' , function( e )
    {
        me.keyEvent = e;
        me.keyStatus = KEY_DOWN;
    } , false );

    document.addEventListener( 'keyup' , function( e )
    {
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

    draw: function( ctx ){
        var img = this.image ,
            x   = this.x - ctx.x ,
            y   = this.y - ctx.y;

        if( ( x > 0 ? x < ctx.width: -x < img.width ) &&
            ( y > 0 ? y < ctx.height: -y < img.height ) )
        {
            ctx.translate( x - ctx.ox , y - ctx.oy );
            ctx.rotate( this.rotation );
            ctx.drawImage( img , -img.ox , -img.oy , img.width , img.height );
            ctx.rotate( -this.rotation );
            ctx.ox = x , ctx.oy = y;
        }
    },

    shoot: function( scene )
    {
        var ctx , list ,
            depthIndex = 0 ,
            objects = scene.objects;

        for( ; depthIndex < this.depth; depthIndex++ )
        {
            if( ( list = objects[ depthIndex ] ) && list.length > 0 )
            {
                ctx = this.films[ depthIndex ];
                ctx.clearRect( -ctx.ox , -ctx.oy , this.width , this.height );

                while( ( object = list.pop() ) )
                {
                    object.draw( ctx );
                }
            }
        }
    },

    getMouse: function()
    {
        var mouse = this.mouse ,
            event = this.mouseEvent;

        if( event )
        {
            if( event.offsetX === undefined )
            {
                mouse.x = event.pageX - this.left;
                mouse.y = event.pageY - this.top;
            }
            else
            {
                mouse.x = event.offsetX;
                mouse.y = event.offsetY;
            }

            mouse.lastStatus = mouse.status;
            mouse.status = this.mouseStatus;
        }

        return mouse;
    },

    getKey: function()
    {
        var key = this.key;

        if( this.keyEvent )
        {
            key.code = this.keyEvent.keyCode;
            key.lastStatus = key.status;
            key.status = this.keyStatus;
        }

        return key;
    }
};

var Frame = function( startTime )
{
    var fpsInterval;
    Frame.startTime = startTime || new Date().getTime();
    Frame.interval = Frame.startTime - Frame.lastTime;
    fpsInterval = Frame.startTime - Frame.lastFpsTime;
    Frame.count++;
    Frame.loop();
    Frame.lastTime = Frame.startTime;

    if( fpsInterval >= Frame.fpsInterval )
    {
        Frame.fps = Math.round( Frame.count * 1000 / fpsInterval );
        Frame.lastFpsTime = Frame.startTime;
        Frame.count = 0;
    }

    if( Frame.status === Frame.RUN )
    {
        requestAnimationFrame( Frame );
    }
};

Frame.start = function()
{
    this.lastFpsTime = this.lastTime = new Date().getTime();
    this.status = Frame.RUN;
    this.count = 0;

    requestAnimationFrame( this );
};

Frame.stop = function()
{
    this.status = Frame.STOP;
    this.fps = 0;
};

Frame.loop = function()
{

};

Frame.fpsInterval = 1000;
Frame.fps = 0;
Frame.STOP = 0;
Frame.RUN = 1;
