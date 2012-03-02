var GetPosition = function(){

};

GetPosition.prototype.run = function(){
    throw new Error( 'aasdd' );
    return 'a111111';
};

GetPosition.init = function(){
    return new GetPosition;
};

module.exports = GetPosition;
