/**
 * Created by jbush_000 on 5/13/2016.
 */
"use strict";

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var reload = require('reload');
var io = require('socket.io')(serv, {});

var uuid = require('node-uuid');

var Gerbil = require('./server/gerbil');

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);

var SOCKET_LIST = [];
var Gerbils = [];

//Socket Connection
io.sockets.on('connection', socket => {
    socket.id = uuid.v4();
    SOCKET_LIST.push(socket);
    UpdatePlayers();

    //Listener for a game restart
    socket.on('restartGame', () => {
        ResetGame();
    });

    socket.on('disconnect', () => {
        console.log('Got disconnect!');
        var i = SOCKET_LIST.indexOf(socket);
        SOCKET_LIST.splice(i, 1);
        UpdatePlayers();
    });

    socket.on('mouseClick', (data) => {
        var foundGerbil = CheckIfHit(data.x, data.y);
        if(foundGerbil){
            var i = Gerbils.indexOf(foundGerbil);
            Gerbils.splice(i, 1);
            SOCKET_LIST.forEach(function (socket) {
                socket.emit('GerbilSpawn', Gerbils);
            });
        }
    })
});

function CheckIfHit(x, y) {
    for(var i = 0; i <= Gerbils.length - 1; i++){
        var gerbil = Gerbils[i];
        if(gerbil.CheckIfHit(x, y))
        {
            return gerbil;
        }
    }
}

var maxX = 780;
var maxY = 480;
//var wh = 20;

//Restart game
function ResetGame() {
    Gerbils = [];
    SOCKET_LIST.forEach(function (socket) {
        socket.emit('GerbilSpawn', Gerbils);
    });
}
//Recursively spawns the shapes/gerbils
function UpdatePlayers() {
    var players = [];
    SOCKET_LIST.forEach(function (socket) {
        players.push(socket.id);
    });
    SOCKET_LIST.forEach(function (socket) {
        socket.emit("PlayerList", players)
    });
}

//Spawns a new square/gerbil
function SpawnGerbil() {
    var g = new Gerbil( Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY));
    Gerbils.push(g);
    SOCKET_LIST.forEach(function (socket) {
        socket.emit('GerbilSpawn', Gerbils);
    });
}

// setInterval(function () {
//     for(var i in SOCKET_LIST){
//         var socket = SOCKET_LIST[i];
//     }
// },1000/25);

setInterval(SpawnGerbil, 2000);

