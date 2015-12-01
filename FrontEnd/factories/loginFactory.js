main_module.factory('loginFactory',function(){

    var factory = {};
    
    //This function can be called from any controller using this factory
    //implementation
    factory.startLogin = function(data){
        
        console.log(data);
    }
    
    //Factory must always return an object!
    return factory;

});