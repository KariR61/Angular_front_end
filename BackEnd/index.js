var express = require("express");
var path =require("path");
var https = require('https');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var user = require('./modules/user');
var mysql_module = require('./modules/mysql_module');

var app = express();



var options = {

    key:fs.readFileSync('server.key'),
    cert:fs.readFileSync('server.crt'),
    requestCert:false,
    rejectUnauthorized:false
}

//this is used for creating a secret key value
// for our session cookie
var uuid = require('uuid');

//Create a secret for out web token
var secret = uuid.v1();

exports.secret = secret;

//this is used to create session object for client
var session = require('express-session');

//var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

//############################### Midlewares ##############################

app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:600000}

}));

//Bodyparser json() middleware parses the json object from HTTp POSt request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//Define middlewares for our static files (.html, .css, .js files that are loaded
//by browser when parsing index.html file
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));

app.use('/friends',user);
app.get('/logout',function(req,res){

    req.session.destroy();
    res.redirect('/');
});

//this router checks if client is logged in or not
//app.get('/isLogged',function(req,res){
    //User is logged in if session contains kayttaja attribute 
   // if(req.session.kayttaja){
       // res.status(200).send([{status:'OK'}]);
   // }
    //else{
    
       // res.status(401).send([{status:'Unauthorized'}]);
    //}        
//});

app.use(function(req,res,next){
    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    //Check if there was a token
        if(token){
        //verify that token 
        //
        jwt.verify(token,secret, function(err,decoded){
            
            if(err){
                return res.send(401);
            }else{
                req.decoded = decoded;
                console.log(req.decoded);
                next;
            }
        });
        }else{
            
            res.send(403);
        }
    //console.log(req.method);
    //console.log(req.path);
    //console.log(__dirname);
    //console.log(req.body);
    //console.log(req.session);
    //console.log(database.Person);
    //database.myFunction();
    //Send request forward in stack
    //next();
    
});

//Define middlewares for our static files (.html, .css, .js files that are loaded
//by browser when parsing index.html file
//app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
//app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
//app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
//app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
//app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));
//app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));


//=========================================OUR REST API MIDDLEWARES======================//
app.use('/persons',person);
//app.use('/friends',user);

//############################### Routers #################################

//this router checks if client is logged in or not
app.get('/isLogged',function(req,res){
    //User is logged in if session contains kayttaja attribute 
    if(req.session.kayttaja){
        res.status(200).send([{status:'OK'}]);
    }
    else{
    
        res.status(401).send([{status:'Unauthorized'}]);
    }        
});

https.createServer(options,app).listen(app.get('port'),app.get('ip'),function()
{
    console.log("Express server started");
});

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
//app.listen(3000);