"use strict";

var config  = require("./../../config/config");

//Crypto 
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


// mongo
var mongo               = require("mongodb").MongoClient;
var mongoUrl            = config.mongoUrl;

// Mongoose
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl);
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;
/*
var UserSchema = new Schema({
    twitterId           : String,
    username            : String,
    displayName         : String,
    profileImageUrl     : String,
    email               : String,
    messages            : Array,
    wallPosts           : [{type: Schema.Types.ObjectId, ref: "Post" }]
});
*/

var UserSchema = new Schema({
    username            : String,
    password            : String,
    email               : String,
    salt                : String,
    firstName           : String,
    lastName            : String,    
    type                : String,
    city                : String,
    state               : String,
    country             : String,
    messages            : Array
});

// never save the password in plaintext, always a hash of it
UserSchema.pre("save", function (next) {
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    // use bcrypt to generate a salt
    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
        if (err) {
            return next(err);
        }

        // using the generated salt, use bcrypt to generate a hash of the password
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            // store the password hash as the password
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.isPasswordValid = function (rawPassword, callback) {
    bcrypt.compare(rawPassword, this.password, function (err, same) {
        if (err) {
            callback(err);
        }
        callback(null, same);
    });
};




// Compile model from schema
var UserModel       = mongoose.model('User', UserSchema );
exports.UserModel   = UserModel;

