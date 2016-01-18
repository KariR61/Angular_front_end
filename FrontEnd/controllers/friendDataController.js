main_module.controller('friendDataController',function($scope,friendDataFactory,$location){

    $scope.name = "by Markus Veijola";
    console.log('friendDataController loaded');
    

    
    friendDataFactory.getFriendData(dataCallback);
    
   
    //$scope.friendData = friendDataFactory.friendsArray;
   
    $scope.rowCliked = function(id){
        
        friendDataFactory.selected_id = id;
        $location.path('/edit').replace();
    }
    
     function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
});