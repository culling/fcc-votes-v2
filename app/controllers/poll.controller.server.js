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
            if(err){ 
                console.error(err)
                done(err, null);
                return;
            };
            done(null, foundPolls);
        });
};


exports.find = function (findObject, done){
    console.log("find Hit - Poll Controller");    
    PollModel.find(findObject)
        .populate("meeting")
        .populate("owner")
        .exec(function(err, foundPolls){
            if(err){ 
                console.error(err)
                done(err, null);
                return;
            };
            done(null, foundPolls);
        });
};



exports.drop = function(done){
    console.log("drop Hit - Poll Controller");    
    PollModel.collection.drop();
    done("Dropped Polls");
}

exports.create = function(rawPoll, done){
    console.log("create Hit - Poll Controller");
    clean(rawPoll);
    var poll = new PollModel(rawPoll);


    console.log(poll);

    poll.save(function(err, result){
        if(err){console.error(err);
            return done(err, null);
        }
        done(null, result);
    });

};

exports.update = function (poll, done){
    console.log("update Hit - Poll Controller");    
    PollModel.findByIdAndUpdate(poll._id, poll, function(err, result){
        if(err){
            console.error(err);
            return done(err, null);
        }
        done(null, result);
    });
}

exports.delete = function(pollId, done){
    PollModel.findByIdAndRemove(pollId, function(err, result){
        if(err){
            console.error(err)
            return done(err, null);
        }
        done(null, result);
    });
}