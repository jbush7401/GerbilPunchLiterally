/**
 * Created by jbush_000 on 5/21/2016.
 */
"use strict";
const ServerConfig = require("../config/serverConfig");

class GameTickService {
  constructor(socketService, spawnGerbil, playerService, gerbilService) {
    this.socketService = socketService;
    this.playerService = playerService;
    this.gerbilService = gerbilService;
    this.spawnGerbil = spawnGerbil;
    this.gameState = "";
  }

  restartGame() {
    this.gerbilService.resetGerbils();
    this.playerService.resetPoints();
    this.playerService.sendPlayers();
    clearInterval(this.gameTickId);
    clearInterval(this.GerbilSpawnsId);
    this.gameTickId = setInterval(this.gameTick.bind(this), 1000 / 8);
    this.preGame();
  }

  preGame() {
    this.gameState = "Starting";
    this.setTimeToGameStart();
    this.playerService.sendPlayerPointValues();
    this.sendGameState();
  }

  sendGameState() {
    var tick = {};
    if (this.gameState === "Running") {
      tick = {gameState: this.gameState, timeLeft: this.getGameTimeLeft()}
    }
    else if (this.gameState === "Starting") {
      tick = {gameState: this.gameState, timeLeft: this.getTimeToGameStart()};
    }
    this.socketService.getAllSockets().forEach(socket => {
      socket.emit(ServerConfig.IO.OUTGOING.GAME_STATE, tick);
    })
  }

  startGame() {
    this.gameState = "Running";
    this.sendGameState();
    this.setGameTimeLeft();
    this.changeSpawnSpeed(1000);
  }

  changeSpawnSpeed(speed) {
    clearInterval(this.GerbilSpawnsId);
    this.GerbilSpawnsId = setInterval(this.spawnGerbil, speed);

  }

  gameTick() {
    var tick;
    if (this.gameState === "Running") {
      tick = {timeLeft: this.getGameTimeLeft()};
      if(tick.timeLeft <= 0){
        this.restartGame();
      }
    }
    else if (this.gameState === "Starting") {
      tick = {timeLeft: this.getTimeToGameStart()};
      if(tick.timeLeft <= 0){
        this.startGame();
      }
    }
    this.socketService.getAllSockets().forEach(socket => {
      socket.emit(ServerConfig.IO.OUTGOING.GAME_TICK, tick);
    });
  }

  setGameTimeLeft() {
    this.gameEndTime = new Date();
    this.gameEndTime.setSeconds(this.gameEndTime.getSeconds() + 10);
  }

  getGameTimeLeft() {
    return (this.gameEndTime - new Date()) / 1000;
  }

  setTimeToGameStart() {
    this.gameStartTime = new Date();
    this.gameStartTime.setSeconds(this.gameStartTime.getSeconds() + 5);
  }


  getTimeToGameStart() {
    return (this.gameStartTime - new Date()) / 1000;
  }
}

module.exports = GameTickService;