/**
 * Created by jbush_000 on 5/19/2016.
 */
'use strict';
const ServerConfig = require("../config/serverConfig");
const PlayerService = require("../services/playerService");
const PlayerContainer = require("../models/playerContainer");
const GerbilContainer = require("../models/gerbilContainer");
const GerbilService = require("../services/gerbilService");
const SocketService = require('../services/socketService');
const GameTickService = require('../services/gameTickService');
var uuid = require('node-uuid');
var Gerbil = require('../models/gerbil');

class GameController {
  constructor() {
    this.playerContainer = new PlayerContainer();
    this.gerbilContainer = new GerbilContainer();
    this.socketService = new SocketService();
    this.gerbilService = new GerbilService(this.gerbilContainer, this.socketService);
    this.playerService = new PlayerService(this.playerContainer, this.socketService);
    this.gameTickService = new GameTickService(this.socketService, this.SpawnGerbil.bind(this), this.playerService, this.gerbilService);
    this.maxX = ServerConfig.maxX;
    this.maxY = ServerConfig.maxY;
    this.gameTickService.restartGame();
  }

  listen(io) {
    io.sockets.on(ServerConfig.IO.DEFAULT_CONNECTION, socket => {
      socket.id = uuid.v4();
      this.socketService.addSocket(socket);
      this.HandleNewPlayer(socket);

      socket.on(ServerConfig.IO.INCOMING.RESTART_GAME, () => {
        this.gameTickService.restartGame();
      });
      socket.on(ServerConfig.IO.DISCONNECT, () => {
        this.DisconnectPlayer(socket)
      });
      socket.on(ServerConfig.IO.INCOMING.MOUSE_CLICK, (data) => {
        this.CanvasClick(data, socket)
      });
      //this.UpdatePlayers(socket);
    });
  }

  HandleNewPlayer(socket) {
    this.playerService.addPlayer(socket);
    this.gameTickService.sendGameState();
  }

  //Handle mouse click from client
  CanvasClick(data, socket) {
    var p = this.playerService.getPlayer(socket);
    var foundGerbil = this.gerbilService.CheckIfHit(data.x, data.y);
    if (foundGerbil) {
      //var i = this.gerbilContainer.getGerbil(foundGerbil.id);
      this.gerbilService.removeGerbil(foundGerbil);
      if(p){
        p.addScore(foundGerbil.color);
        this.gerbilService.sendGerbils();
        this.playerService.sendPlayers();
      }
      else {
        console.log("Bad player request");
      }
    }
  }

  DisconnectPlayer(socket) {
    this.socketService.removeSocket(socket);
    this.playerService.removePlayer(socket);
  }

  //Spawns a new square/gerbil
  SpawnGerbil() {
    var g = new Gerbil(Math.floor(Math.random() * this.maxX), Math.floor(Math.random() * this.maxY));
    this.gerbilService.addGerbil(g);
    this.gerbilService.sendGerbils();
  }
}

module.exports = GameController;