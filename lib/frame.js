var Frame = function( startTime ){
    var fpsInterval;
    Frame.startTime = startTime || new Date().getTime();
    Frame.interval = Frame.startTime - Frame.lastTime;
    fpsInterval = Frame.startTime - Frame.lastFpsTime;
    Frame.count++;
    Frame.loop();
    Frame.lastTime = Frame.startTime;

    if( fpsInterval >= Frame.fpsInterval ){
        Frame.fps = Math.round( Frame.count * 1000 / fpsInterval );
        Frame.lastFpsTime = Frame.startTime;
        Frame.count = 0;
    }

    if( Frame.state === Frame.RUN )
        RequestAnimationFrame( Frame );
};

Frame.start = function(){
    this.lastFpsTime = this.lastTime = new Date().getTime();
    this.state = Frame.RUN;
    this.count = 0;

    RequestAnimationFrame( this );
};

Frame.stop = function(){
    this.state = Frame.STOP;
    this.fps = 0;
};

Frame.loop = function(){

};

Frame.fpsInterval = 1000;
Frame.fps = 0;
Frame.STOP = 0;
Frame.RUN = 1;
