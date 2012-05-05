var images = new Source;
window.on( 'load' , function(){

    var img;

    img = document.createElement( 'img' );
    img.name = 'ball';
    img.src = 'images/round.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'ball1';
    img.src = 'images/round1.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'ball2';
    img.src = 'images/round2.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'ball3';
    img.src = 'images/round3.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'bg';
    img.src = 'images/map.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'tank';
    img.src = 'images/tank.png';
    images.load( img );

    img = document.createElement( 'img' );
    img.name = 'bomb';
    img.src = 'images/bomb.png';
    images.load( img );

});