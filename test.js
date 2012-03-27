var test = function(){
    var i , l , start , end , arr;
    o = {};
    arr = new Array( 1000000000 );
    o.aaa = new Array( 100000000 );

    start = new Date().getTime();
    for( i = 0 , l = o.aaa.length ; i < l ; i++ );
    end = new Date().getTime();

    console.log( end - start );

    start = new Date().getTime();
    for( i = 0 ; i < o.aaa.length ; i++ );
    end = new Date().getTime();
    console.log( end - start );
};

test();
