var images = new Src;
(function()
{
    var img;

    img = new Image;
    img.name = 'ball';
    img.src = 'images/round.png';
    img.ox = 10;
    img.oy = 10;
    images.load( img );

    img = new Image;
    img.name = 'ball1';
    img.src = 'images/round1.png';
    img.ox = 20;
    img.oy = 20;
    images.load( img );

    img = new Image;
    img.name = 'ball2';
    img.src = 'images/round2.png';
    img.ox = 40;
    img.oy = 40;
    images.load( img );

    img = new Image;
    img.name = 'ball3';
    img.src = 'images/round3.png';
    img.ox = 15;
    img.oy = 10;
    images.load( img );

    img = new Image;
    img.name = 'bg';
    img.ox = 0;
    img.oy = 0;
    img.src = 'images/map.png';
    images.load( img );

    img = new Image;
    img.name = 'tank';
    img.src = 'images/tank.png';
    img.ox = 45;
    img.oy = 30;
    images.load( img );

    img = new Image;
    img.name = 'bomb';
    img.src = 'images/bomb.png';
    img.ox = 7;
    img.oy = 7;
    images.load( img );
})();
