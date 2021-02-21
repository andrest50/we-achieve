var express = require('express')
var cors = require('cors')
var app = express()

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
var corsOptions = (req, callback) => {
    var corsOrigin;

    if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOrigin = {origin: true};
    }
    else {
        corsOrigin = {origin: false};
    }
    callback(null, corsOrigin);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptions);