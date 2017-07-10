var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

//Controlers
var PollController  = require("./poll.controller.server");

//Models
var MeetingModel    = mongoExport.meetings.MeetingModel;


function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}


exports.findAll = function (done){
    console.log("findAll Hit - Meeting Controller");    
    MeetingModel.find({},function(err, foundMeetings){
        if(err){ console.error(err)};
        done(foundMeetings);
    });
};


exports.drop = function(done){
    console.log("drop Hit - Meeting Controller");    
    MeetingModel.collection.drop();
    //PollModal.collection.drop();
    PollController.drop(
        function(message){
            done("Dropped Meetings \n" + message);
        }
    );

};

exports.create = function(meeting, done){
    console.log("create Hit - Meeting Controller");
    var meeting = new MeetingModel(meeting);
    meeting.save(function(err, result){
        if(err){console.error(err);
            return done(err, null);
        }
        done(null, result);
    });
};

exports.delete = function(meetingId, done){

    MeetingModel.findByIdAndRemove(meetingId, function(err, result){
        if(err){
            console.error(err)
            return done(err, null);
        };

        PollController.find({meeting: meetingId}, function(err, polls){
            polls.map((poll) => {
                console.log("Poll ID to be deleted");
                console.log(poll._id);
                PollController.delete(poll._id, function(err, result){
                    if(err){console.error(err)};
                    console.log(result);
                });
            });
        });
        //console.log(meetingId);
        return done(null, err);
    });
};