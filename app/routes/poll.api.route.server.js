const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");

//Controllers
var pollController = require("./../controllers/poll.controller.server");

router.get('/', function(req, res){
    console.log("/api/poll - GET hit");
    pollController.findAll(function(found){
        res.write(JSON.stringify(found, null, "\t"));
        res.end();
    });
});

router.post('/', function(req, res){
    console.log("/api/poll - POST hit");    
    var poll = req.body;
    poll.owner = req.user;

    //console.log("Poll: ");
    //console.log(poll);
    pollController.create(poll, function(err, result){
        if(err){
            console.error(err);
        }

        res.write(JSON.stringify( result, null, "\t"));
        res.end();

    });


})


module.exports = router;