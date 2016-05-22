/**
 * Created by jbush_000 on 5/21/2016.
 */
"use strict";
const ServerConfig = require("../config/serverConfig");

class GameTickService{
    constructor(socketService) {
        this.socketService = socketService;
    }
    restartGame() {
        this.setGameTimeLeft();
        clearInterval(this.gameTickId);
        this.gameTickId = setInterval(this.gameTick.bind(this), 1000 / 8);
    }

    changeSpawnSpeed(SpawnGerbil, speed){
        clearInterval(this.GerbilSpawnsId);
        this.GerbilSpawnsId = setInterval(SpawnGerbil, speed);
    }

    gameTick(){
        var tick = {timeLeft: this.getGameTimeLeft()};
        this.socketService.getAllSockets().forEach(socket => {
            socket.emit(ServerConfig.IO.OUTGOING.GAME_TICK, tick);
        });
    }

    setGameTimeLeft(){
        this.gameEndTime = new Date();
        this.gameEndTime.setSeconds(this.gameEndTime.getSeconds() + 120);
    }

    getGameTimeLeft(){
        return (this.gameEndTime - new Date()) / 1000;
    }
}

module.exports = GameTickService;