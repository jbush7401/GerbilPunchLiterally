/**
 * Created by jbush_000 on 5/13/2016.
 */
"use strict";
var GameController = require("./server/controllers/gameController");
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});




app.use('/client',express.static(__dirname + '/client'));

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

serv.listen(2000, () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

var gameController = new GameController();
gameController.listen(io);

