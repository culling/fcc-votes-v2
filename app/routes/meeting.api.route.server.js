const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");

//Controllers
var meetingController = require("./../controllers/meeting.controller.server");


router.get('/drop', function(req, res){
    console.log("/api/meeting/drop - GET hit");
    meetingController.drop(function(response){
        res.write(response);
        res.end();
    });
});


router.get('/', function(req, res){
    console.log("/api/meeting - GET hit");
    meetingController.findAll(function(found){
        res.write(JSON.stringify(found, null, "\t"));
        res.end();
    });
});

router.post('/', function(req, res){
    console.log("/api/meeting - POST hit");    
    var meeting = req.body;
    meeting.owner = req.user;
    meetingController.create(meeting, function(err, result){
        if(err){
            console.error(err);
        };
        res.write(JSON.stringify( result, null, "\t"));
        res.end();
    });
});

router.delete("/:id", function(req, res){
    console.log("/api/meeting/:id - DELETE hit");    
    var meetingId = req.params.id;
    //console.log(pollId);
    meetingController.delete(meetingId, function(err, result){
        if(err){console.error(err)};

        

        res.write("complete");
        res.end();
    });
});

module.exports = router;