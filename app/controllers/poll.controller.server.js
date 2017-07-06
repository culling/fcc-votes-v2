var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var PollModel   = mongoExport.polls.PollModel;


function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}


exports.findAll = function (done){
    console.log("findAll Hit - Poll Controller");    
    PollModel.find()
        .populate("meeting")
        .populate("owner")
        .exec(function(err, foundPolls){
            if(err){ console.error(err)};
        done(foundPolls);
    });
};


exports.drop = function(done){
    console.log("drop Hit - Poll Controller");    
    PollModel.collection.drop(done());
}

exports.create = function(poll, done){
    console.log("create Hit - Poll Controller");
    var poll = new PollModel(poll);
    poll.save(function(err, result){
        if(err){console.error(err);
            return done(err, null);
        }
        done(null, result);
    });
};

