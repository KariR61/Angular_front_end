var query = require('./queries');
var mysql = require('./mysql_module');
/*
*This file is a router for User resource
*Version:0.0.1
*Author:Kari Raappana
*Description:Created this new file
*/

var express = require("express");

var router = express.Router();

router.get('/',function(req,res){
    mysql.getFriendsForByUsername(req,res);

    //query.getFriendsByUsername(req,res);
});

//This router handles a request to url localhost:3000/friends/login
router.post('/login',function(req,res){
    
    //query.loginFriend(req,res);
    mysql.loginMysqlProc(req,res);
});


//This router handles a request to url localhost:3000/friends/register
router.post('/register',function(req,res){
    
   //query.registerFriend(req,res);
    
    mysql.registerUser(req,res);
});

module.exports = router;