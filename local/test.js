var start = new Date().getTime();
var i ;
var canvas = document.createElement( 'canvas' );
var ctx = canvas.getContext( '2d' );
document.body.appendChild( canvas );

function testImageData()
{
    var data = Images[2];

    start = new Date().getTime();

    for( i = 0; i < 10000 ; i++ )
    {
        ctx.putImageData( data , 0 , 0 );
    }

    end = new Date().getTime();

    console.log( end - start );
}

var img = new Image;
img.src = 'images/round2.png';

function testImage()
{
    start = new Date().getTime();

    for( i = 0; i < 10000 ; i++ )
    {
        ctx.drawImage( img , 0 , 0 );
    }

    end = new Date().getTime();

    console.log( end - start );
}

function testArrayLoop()
{
    var i , l , a = new Array( 1000000000 );

    start = new Date().getTime();
    for( i=0; i<a.length; i++ )
    {

    }
    end = new Date().getTime();
    console.log( end - start );

    l = a.length;
    start = new Date().getTime();
    for( i=0; i<l; i++ )
    {

    }
    end = new Date().getTime();
    console.log( end - start );
}

function testCoverMethod()
{
    var i , l = 10000000;

    var a = [ 10 , 20 , 40 , 50 ];
    var b = [ 30 , 30 , 90 , 100 ];

    start = new Date().getTime();
    for( i=0; i<l ; i++ )
    {
        ( a[0] < b[0] ? ( b[0] - a[0] < a[2] ) : ( a[0] - b[0] < b[2] ) ) &&
            ( a[1] < b[1] ? ( b[1] - a[1] < a[3] ) : ( a[1] - b[1] < b[3] ) );
    }
    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();
    for( i=0; i<l; i++ )
    {
        Math.abs( a[0] - b[0] ) < ( a[0] < b[0] ? a[2] : b[2] ) &&
            Math.abs( a[1] - b[1] ) < ( a[1] < b[1] ? a[3] : b[3] );
    }
    end = new Date().getTime();
    console.log( end - start );

};

var img = new Image;
img.src = 'images/round2.png';
var cvs = document.createElement( 'canvas' );
cvs.width = 80;
cvs.height = 80;

var cvs1 = document.createElement( 'canvas' );
cvs1.width = 80;
cvs1.height = 80;
var ctx = cvs1.getContext( '2d' );
document.body.appendChild( cvs1 );
img.onload = function()
{
    cvs.getContext( '2d' ).drawImage( img , 0 , 0 );
};

function testDrawImage()
{
    var i , l = 500000;

    start = new Date().getTime();
    for( i=0; i<l ; i++ )
    {
        ctx.drawImage( img , 0 , 0 );
    }
    end = new Date().getTime();
    console.log( end - start );
       

    start = new Date().getTime();
    for( i=0; i<l ; i++ )
    {
        ctx.drawImage( cvs , 0 , 0 );
    }
    end = new Date().getTime();
    console.log( end - start );
}

function testRotate()
{
    var i , l = 500000;

    start = new Date().getTime();
    for( i=0; i<l ; i++ )
    {
        ctx.translate( 10 , 20 );
        ctx.rotate( Math.PI );
    }
    end = new Date().getTime();
    console.log( end - start );
       


}

function testArrayIndex()
{
    var a , b , i , l = 10000000;
    
    var a = new Array( 1000 );
    a [1] = new Array( 1000 );

    start = new Date().getTime();
    for( i=0; i<l ; i++ )
    {
        b = a[1][100];
        b = a[1][200];
        b = a[1][300];
    }
    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();
    var c;
    for( i=0; i<l ; i++ )
    {
        c = a[1];
        b = c[100];
        b = c[200];
        b = c[300];
    }
    end = new Date().getTime();
    console.log( end - start );
}

function testIndex()
{
    var a , b , i , l = 100000000;
    

    a = [ 0 , 1 , 2 , 3 , 4 ];
    b = { a: 0 , b: 1 , c: 2 , d: 3 , e: 4 };
    start = new Date().getTime();

    for( i=0; i< l; i++ )
    {
        c = a[0];
        c = a[1];
        c = a[2];
        c = a[3];
        c = a[4];
    }

    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
        c = b.a;
        c = b.b;
        c = b.c;
        c = b.d;
        c = b.e;
    }

    end = new Date().getTime();
    console.log( end - start );
}
function testArrayObject()
{
    var a , b , i , l = 10000000;
    

    start = new Date().getTime();

    for( i=0; i< l; i++ )
    {
    a = [ 0 , 1 , 2 , 3 , 4 ];
    }

    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
    b = { a: 0 , b: 1 , c: 2 , d: 3 , e: 4 };
    }

    end = new Date().getTime();
    console.log( end - start );
}
function testUndefined()
{
    var i , l = 10000000;
    var a = [];

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
        if( a[2] === undefined )
        {
        }
    }

    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
        if( a[2] )
        {
            
        }
    }

    end = new Date().getTime();
    console.log( end - start );
}
function testPop()
{
    var a = new Array( 100000000 );
    var i;
    var l = a.length;
    var b;

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
        //b = a[i];
    }

    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();

    while( ( b = a.pop() ) )
    {

    };

    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();

    i = 0;
    while( i < l )
    {
        i++;
    };

    end = new Date().getTime();
    console.log( end - start );
}
function testLoop()
{
    var a = new Array( 1000000 );
    var i;
    var l = a.length;
    var b;
    var o = {};

    for( i=0; i<l ; i++ )
    {
        o[ i ] = 0;
    };

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
        b = a[i];
    }

    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();

    for( i in o )
    //for( i=0; i<l ; i++ )
    {
        b = o[i];
    };

    end = new Date().getTime();
    console.log( end - start );
}

function testNewObject(){
    var i , 
        l = 1000 , 
        o = function(){};

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
        new o;
    }

    end = new Date().getTime();
    console.log( end - start );

    start = new Date().getTime();

    for( i=0; i<l ; i++ )
    {
        {}; 
    }

    end = new Date().getTime();
    console.log( end - start );
};
