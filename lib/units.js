/**
 * Bomb , Cannon
 */

var Bomb = function( image , v , maxRange ){
    Forward.call( this , new Animation( image ) , v , maxRange ); 
};

Util.inherits( Bomb , Forward , new Forward( new Animation( { raidus: 0 } ) ) );

Bomb.prototype.setLocation = function( x , y , z ){
    var location = this.animation.location;
    if( x !== undefined ) location.x = x;
    if( y !== undefined ) location.y = y;
    if( z !== undefined ) location.z = z;
};

Bomb.prototype.setRotation = function( radian , cos , sin ){
    var rotation = this.animation.rotation;
    rotation.cos = cos;
    rotation.sin = sin;
    rotation.radian = radian;
};

Bomb.prototype.attach = function( scene ){
    scene.add( this.animation , this );
};

var Cannon = function( bombClass , bombImage , v , maxRange , size , loadTime ){
    Fx.call( this );

    this.loaded = [];
    this.fired = [];
    this.exploded = [];
    this.v = v;
    this.maxRange = maxRange;

    this.size = size - 1;
    this.loadTime = loadTime;
    this.bombClass = bombClass;
    this.bombImage = bombImage;
    this.state = Fx.STATE_STOP;
    this._lastLoadTime = 0;
};

Util.inherits( Cannon , Fx );

Cannon.prototype.fire = function(){
    var length , 
        rotation = this.rotation , 
        bomb = this.loaded.pop();

    if( bomb ){
        length = this.radius + bomb.animation.radius + 5;
        bomb.setLocation( this.location.x + length * rotation.cos , this.location.y + length * rotation.sin );
        bomb.animation.rotation.set( this.rotation );
        bomb.start();
        this.fired.push( bomb );
    }
};

Cannon.prototype.attach = function( scene ){
    var bomb , 
        update = [];

    while( ( bomb = this.fired.pop() ) ){
        if( bomb.state === Fx.STATE_RUN ){
            update.push( bomb );
            bomb.attach( scene );
        }
    }

    scene.add( this );
    this.fired = update;
};

Cannon.prototype.tick = function(){
    var bomb ,
        cannon = this;

    if( this.loaded.length < this.size &&
        ( this._lastLoadTime + this.loadTime ) <= Frame.startTime ){

        bomb = new this.bombClass( this.bombImage , this.v , this.maxRange );

        bomb.on( 'intersect' , function( intersected ){
            this.state = Fx.STATE_STOP;
            cannon.owner.emit( 'hit' , intersected );
        });

        bomb.owner = this;
        this.loaded.push( bomb );
        this._lastLoadTime = Frame.startTime;
    }
};

var Tank = function( image , v , maxRange ){
    Forward.call( this , new Animation( image ) , v , maxRange ); 
};

Util.inherits( Tank , Forward , new Forward( new Animation( {raidus: 0} ) ) );

Tank.prototype.mount = function( cannon ){
    this.cannon = cannon;
    cannon.location = this.animation.location;
    cannon.rotation = this.animation.rotation;
    cannon.radius = this.animation.radius;
    cannon.owner = this;
    cannon.start();
};

Tank.prototype.run = function( x , y ){
    this.animation.lookAt( x , y );
    this.start();
};

Tank.prototype.attach = function( scene ){
    scene.add( this.animation , this );
    this.cannon.attach( scene );
};

var Npc = function( animation , spawnTime ){
    Fx.call( this );

    this.spawnTime = spawnTime;
    this.lifeState = Npc.LIFE_STATE_ALIVE;
    this.state = Fx.STATE_RUN;
    this.animation = animation;
    animation.owner = this;
    this._deathTime = 0;
};

Npc.LIFE_STATE_ALIVE = 0;
Npc.LIFE_STATE_DEAD = 1;

Util.inherits( Npc , Fx );

Npc.prototype.tick = function(){
    if( this.lifeState === Npc.LIFE_STATE_DEAD &&
        Frame.startTime >= ( this._deathTime + this.spawnTime ) ){
        
        this.lifeState = Npc.LIFE_STATE_ALIVE;
    }
};

Npc.prototype.attach = function( scene ){
    scene.add( this );
    if( this.lifeState === Npc.LIFE_STATE_ALIVE ) scene.add( this.animation );
};

Npc.prototype.die = function(){
    this.lifeState = Npc.LIFE_STATE_DEAD;
    this._deathTime = Frame.startTime;
};