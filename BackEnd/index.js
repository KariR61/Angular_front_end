var express = require("express");
var path =require("path");
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var user = require('./modules/user');

var app = express();

//############################### Midlewares ##############################

//Bodyparser json() middleware parses the json object from HTTp POSt request
app.use(bodyParser.urlencoded());
app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(req.body);
    //console.log(database.Person);
    database.myFunction();
    //Send request forward in stack
    next();
    
});

//Define middlewares for our static files (.html, .css, .js files that are loaded
//by browser when parsing index.html file
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));


//=========================================OUR REST API MIDDLEWARES======================//
app.use('/persons',person);
app.use('/friends',user);

//############################### Routers #################################

/*

app.get("/",function(req,res){
         
         res.sendfile("views/index.html");
});

app.get("/css/styles.css",function(req,res){
         
         res.sendfile("css/styles.css");
});
*/

app.get("/persons",function(req,res){
         
        queries.getAllPersons(req,res);
    
         //res.send("Hello person there!");
});
/*
app.post("/persons",function(req,res){
         
        queries.postAllPersons(req,res);
    
         //res.send("Hello person there!");
});
*/
app.listen(3000);