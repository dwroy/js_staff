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

    if( Frame.status === Frame.RUN ){
        requestAnimationFrame( Frame );
    }
};

Frame.start = function(){
    this.lastFpsTime = this.lastTime = new Date().getTime();
    this.status = Frame.RUN;
    this.count = 0;

    requestAnimationFrame( this );
};

Frame.stop = function(){
    this.status = Frame.STOP;
    this.fps = 0;
};

Frame.loop = function(){

};

Frame.fpsInterval = 1000;
Frame.fps = 0;
Frame.STOP = 0;
Frame.RUN = 1;