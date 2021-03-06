//This is the way you define controllers
//the main_module variable is defined in mainModule.js file (located in module folder)
//The first argument is the name of the controller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view
//The $scope object is the glue between the view and controller. You use this object to transfer
//data between the view and controller
main_module.controller('controllerLogin',function($scope,loginFactory,$location){
    
    //var user = $scope.user;
    //$scope.pass = "halituli";
    
    //this is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('login was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        }
        
        var waitPromise = loginFactory.startLogin(temp);
        //Wait the response from server
        waitPromise.then(function(data){
            //Store jsonwebtoken
            console.log(data.secret);
            sessionStorage['token'] = data.secret;
            $location.path('/list');
            
            //code inside this block will be called when success response
            //from server receives
        },function error(data){
            $('.errror').text('Wrong username or password!');
        });
    }
    
    $scope.registerClicked = function(){
        
        console.log('register was pressed');
        
         var temp = {
            username:$scope.user,
            password:$scope.pass
        }
         
        var response = loginFactory.startRegister(temp);
        
        response.then(success,error)
    }
});

function success(data){
    
    alert('New person registered. You ca n now login with you creditentials');
}

function error(data){
    alert('Registering person failed. Username already in use');
}

