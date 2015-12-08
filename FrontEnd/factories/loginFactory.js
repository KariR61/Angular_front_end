main_module.factory('loginFactory',function($resource){

    var factory = {};
    
    //This function can be called from any controller using this factory
    //implementation
    factory.startLogin = function(data){
        
        console.log('loginFactory');
        //Create a resourse for contex '/friends/login'
        var req = $resource('/friends/login',{},{'post':{method:'POST'}});
        //Use POST method to send the username and password tp above contex
        //note that we return an promise object from here
        return req.post(data).$promise;
    }
    
    factory.startRegister = function(data){
        var req = $resource('/friends/register',{},{'post':{method:'POST'}});
        return req.post(data).$promise; 
    }
    
    //Factory must always return an object!
    return factory;

});