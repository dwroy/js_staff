/**
 * Bomb , Cannon
 */

var Bomb = function( image , velocity , distanceLimit ){
    Move.call( this ,
            new SceneImage( new Circle( image.ox , new Rotation ) ) ,
            velocity );

    this.distanceLimit = distanceLimit;
};

Util.inherits( Bomb , Move , new Move( new SceneImage ) );

Bomb.prototype.setCoordinate = function( x , y , z ){
    var center = this.geometry.center;
    if( x !== undefined ) center.x = x;
    if( y !== undefined ) center.y = y;
    if( z !== undefined ) center.z = z;
};

Bomb.prototype.setRotation = function( radian , cos , sin ){
    var rotation = this.rotation;
    rotation.cos = cos;
    rotation.sin = sin;
    rotation.radian = radian;
};

Bomb.prototype.attach = function( scene ){
    scene.addImage( this.sceneImage );
    scene.animations.push( this );
};

var Cannon = function( capacity , loadTime , range ){
    Animation.call( this );

    this.loaded = [];
    this.fired = [];
    this.exploded = [];
    this.capacity = capacity - 1;
    this.loadTime = loadTime;
    this.range = range;
    this.length = 0;
    this._lastLoadTime = 0;
    this.state = Animation.STATE_STOP;
};

Util.inherits( Cannon , Animation );

Cannon.prototype.initBomb = function( className , image , velocity ){
    this.bombData = {
        constructor: constructor ,
        image: image ,
        velocity: velocity
    };

    this.length += image.ox;
};

Cannon.prototype.fire = function(){
    var rotation = this.rotation , 
        bomb = this.loaded.pop();

    if( bomb ){
        bomb.setLocation( this.coordinate.x + this.length * rotation.cos ,
                this.coordinate.y + this.length * rotation.sin );
        bomb.rotation.set( this.rotation );
        bomb.start();
        this.fired.push( bomb );
    }
};

Cannon.prototype.attach = function( scene ){
    var bomb , 
        update = [];

    while( ( bomb = this.fired.pop() ) ){
        if( bomb.state === Animation.STATE_RUN ){
            update.push( bomb );
            bomb.attach( scene );
        }
    }

    scene.animations.push( this );
    this.fired = update;
};

Cannon.prototype.tick = function(){
    var bomb ,
        bombData = this.bombData ,
        cannon = this;

    if( this.loaded.length < this.capacity &&
            ( this._lastLoadTime + this.loadTime ) <= Frame.startTime ){
        bomb = new bombData.constructor( bombData.image , bombData.velocity , this.range );

        bomb.on( 'intersect' , function( intersectors ){
            this.state = Animation.STATE_STOP;
            cannon.owner.emit( 'hit' , intersectors );
        });

        bomb.owner = this;
        this.loaded.push( bomb );
        this._lastLoadTime = Frame.startTime;
    }
};

var Tank = function( image , velocity ){
    Move.call( this ,
            new SceneImage( new Circle( image.ox , new Rotation ) ) ,
            velocity );
};

Util.inherits( Tank , Move , new Move( new SceneImage ) );

Tank.prototype.mount = function( cannon ){
    this.cannon = cannon;
    cannon.coordinate = this.geometry.center;
    cannon.rotation = this.rotation;
    cannon.owner = this;
    cannon.start();
};

Tank.prototype.run = function( x , y ){
    this.animation.face( x , y );
    this.start();
};

Tank.prototype.attach = function( scene ){
    scene.addImage( this.sceneImage );
    scene.animations.push( this );
    this.cannon.attach( scene );
};

var Npc = function( sceneImage , spawnTime ){
    Animation.call( this );

    this.spawnTime = spawnTime;
    this.lifeState = Npc.LIFE_STATE_ALIVE;
    this.state = Animation.STATE_RUN;
    this.sceneImage = new SceneImage( new Circle( ;
    this.sceneImage.owner = this;
    this._deathTime = 0;
};

Npc.LIFE_STATE_ALIVE = 0;
Npc.LIFE_STATE_DEAD = 1;
Util.inherits( Npc , Animation );

Npc.prototype.tick = function( intersectors ){
    if( this.lifeState === Npc.LIFE_STATE_DEAD &&
        Frame.startTime >= ( this._deathTime + this.spawnTime ) ){
        
        this.lifeState = Npc.LIFE_STATE_ALIVE;
    }
};

Npc.prototype.attach = function( scene ){
    if( this.lifeState === Npc.LIFE_STATE_ALIVE ) scene.addImage( this.sceneImage );
    scene.animations.push( this );
};

Npc.prototype.die = function(){
    this.lifeState = Npc.LIFE_STATE_DEAD;
    this._deathTime = Frame.startTime;
};
