/**
 * Created by jbush_000 on 5/19/2016.
 */
'use strict';
const ServerConfig = require("../config/serverConfig");
const PlayerService = require("../services/playerService");
const SocketService = require('../services/socketService');
const GameTickService = require('../services/gameTickService');
const PlayerContainer = require("../models/playerContainer");
var uuid = require('node-uuid');
var Gerbil = require('../models/gerbil');

class GameController {
    constructor() {
        this.playerContainer = new PlayerContainer();
        this.socketService = new SocketService();
        this.gameTickService = new GameTickService(this.socketService);
        this.playerService = new PlayerService(this.playerContainer, this.socketService);
        this.Gerbils = [];
        this.maxX = ServerConfig.maxX;
        this.maxY = ServerConfig.maxY;
        this.ResetGame();
    }

    listen(io) {
        io.sockets.on(ServerConfig.IO.DEFAULT_CONNECTION, socket => {
            socket.id = uuid.v4();
            this.socketService.addSocket(socket);

            //Listeners
            socket.on(ServerConfig.IO.INCOMING.NEW_PLAYER, this.playerService.addPlayer.bind(this.playerService, socket));
            socket.on(ServerConfig.IO.INCOMING.RESTART_GAME, () => {this.ResetGame()});
            socket.on(ServerConfig.IO.DISCONNECT, () => {this.DisconnectPlayer(socket)});
            socket.on(ServerConfig.IO.INCOMING.MOUSE_CLICK, (data) => {this.CanvasClick(data, socket)});
            //this.UpdatePlayers(socket);
        });

    }

    //Handle mouse click from client
    CanvasClick(data, socket){
        var p = this.playerService.getPlayer(socket);
        var foundGerbil = this.CheckIfHit(data.x, data.y);
        if(foundGerbil){
            var i = this.Gerbils.indexOf(foundGerbil);
            this.Gerbils.splice(i, 1);
            p.addScore();
            this.socketService.getAllSockets().forEach((socket) => {
                socket.emit(ServerConfig.IO.OUTGOING.GERBIL_SPAWN, this.Gerbils);
            });
            this.playerService.sendPlayers();
        }
    }

    CheckIfHit(x, y) {
        for(var i = 0; i <= this.Gerbils.length - 1; i++){
            var gerbil = this.Gerbils[i];
            if(gerbil.CheckIfHit(x, y))
            {
                return gerbil;
            }
        }
    }

    //Restart game
    ResetGame() {
        this.Gerbils = [];
        this.socketService.getAllSockets().forEach(socket => {
            socket.emit(ServerConfig.IO.INCOMING.GERBIL_SPAWN, this.Gerbils);
        });
        this.playerService.resetPoints();
        this.playerService.sendPlayers();
        this.gameTickService.changeSpawnSpeed(this.SpawnGerbil.bind(this), ServerConfig.SPAWN_SPEED);
        this.gameTickService.restartGame();
    }

    DisconnectPlayer(socket){
        this.socketService.removeSocket(socket);
        this.playerService.removePlayer(socket);
    }
    //Spawns a new square/gerbil
    SpawnGerbil() {
        var self = this;
        var g = new Gerbil(Math.floor(Math.random() * this.maxX), Math.floor(Math.random() * this.maxY));
        this.Gerbils.push(g);
        this.socketService.getAllSockets().forEach(function (socket) {
            socket.emit(ServerConfig.IO.OUTGOING.GERBIL_SPAWN, self.Gerbils);
        });
    }
}

module.exports = GameController;