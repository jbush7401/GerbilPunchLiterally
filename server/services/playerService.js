/**
 * Created by jbush_000 on 5/21/2016.
 */
const ServerConfig = require("../config/serverConfig");
var player = require('../models/player');

class PlayerService {
  constructor(playerContainer, socketService) {
    this.playerContainer = playerContainer;
    this.socketService = socketService;
  }

  getPlayer(socket) {
    return this.playerContainer.getPlayer(socket.id);
  }

  addPlayer(socket) {
    var p = new player(socket.id);
    this.playerContainer.addPlayer(p);
    this.sendPlayer(socket);
    this.sendPlayers();
  }

  removePlayer(socket) {
    this.playerContainer.removePlayer(socket);
    this.sendPlayers();
  }

  sendPlayer(socket) {
    socket.emit(ServerConfig.IO.OUTGOING.PLAYER_NAME, this.playerContainer.getPlayer(socket.id));
  }

  sendPlayers() {
    var PlayerList = [];
    for (var value of this.playerContainer.getPlayers()) {
      PlayerList.push(value);
    }
    PlayerList.sort((a, b) => b.currentScore - a.currentScore);
    this.socketService.getAllSockets().forEach(socket => {
      socket.emit(ServerConfig.IO.OUTGOING.PLAYER_LIST, PlayerList);
    });
  }

  sendPlayerPointValues() {
    this.socketService.getAllSockets().forEach(socket => {
      var p = this.getPlayer(socket);
      if(p != undefined)
        socket.emit(ServerConfig.IO.OUTGOING.PLAYER_POINT_VALUES, p.pointValues);
    });
  }

  resetPoints() {
    for (var value of this.playerContainer.getPlayers()) {
      value.resetPlayer();
    }
  }
}

module.exports = PlayerService;