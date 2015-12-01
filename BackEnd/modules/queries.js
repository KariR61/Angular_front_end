var db = require('./database');

/**
* This function gets all documents from person collection
*/
exports.getAllPersons = function(req,res){
 
    db.Person.find(function(err,data){
     
        if(err){
            
            console.log(err.message);
            res.send("Error in database");
        }
        else{
            
            res.send(data);
        }
    });
}

/**
* This function saves new person information to our person collection
*/
exports.saveNewPerson = function(req,res){
    var personTemp = new db.Person(req.body);
    //Sav it to database
    personTemp.save(function(err,ok){
                    
            //res.send("Database action done");
       
        db.Friends.update({username:req.body.user},
                          {$push:{'friends':personTemp._id}},
                         function(err,model){
            
        //Make a redirect to root context
        //res.redirect('/');
        res.send("Addded stuff");
    });
        
    });
}

//this function deletes one person from our collections
exports.deletePerson = function(req,res){
    
    //what happens here is that req.params.id return string "id=2323324234556"
    //split function splits the string form "=" and creates an array where [0] contains "id"
    //and [1] contains "2323324234556"
    var id = req.params.id.split("=")[1];
    console.log(id);
    db.Person.remove({_id:id},function(err){
    
        
    console.log("delete 1 button pressed");
        
     if(err){
         res.send(err.message);
     }
     else{
        res.send("Delete ok");
     }
     
 });
    
//console.log("delete 1 button pressed");   
}

//this function updates one person info
exports.updatePerson = function(req,res){
    
    var updateData = {
        name:req.body.name,
        address:req.body.address,
        age:req.body.age
    
    }
    db.Person.update({_id:req.body.id},updateData,function(err){
        
        res.send("Updated");
    });
}

/*
*This function searches database by name or begin letters of name
*/
exports.findPersonsByName = function(req,res){
    
    var name = req.params.nimi.split("=")[1];
    console.log("name:" + name);
    
    db.Person.find({name:{'$regex':'^' + name,'$options':'i'}},function(err,data){
    
            if(err){
                    
                   res.send('error');
            }
            else{
                console.log(data);  
                res.send(data);
            }
    });

}

exports.registerFriend = function(req,res){

    var friend = new db.Friends(req.body);
    friend.save(function(err){
    
        if(err){
            res.send({status:err.message});
        }
        else{
            res.send({status:"ok"});
        }
    });
}

exports.loginFriend = function(req,res){

    var searchObject = {
        username:req.body.username,
        password:req.body.password
    
    }
    
    db.Friends.find(searchObject,function(err,data){
    
        if(err){
            
            res.send({status:err.message});
            
        }else{
            //=< 0 means wrong username or password
            if(data.length > 0){
                res.send({status:"OK"});
            }
            else{
                res.send({status:"Wrong username or password"});
            }
        }
    });
}

exports.getFriendsByUsername = function(req,res){

    var usern = req.params.username.split("=")[1];
    db.Friends.find({username:usern}).populate('friends').exec(function(err,data){
    
        console.log(err);
        console.log(data[0].friends);
        res.send(data[0].friends);
        
    });

}


                   
            








