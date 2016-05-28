/**
 * Created by jbush_000 on 5/23/2016.
 */
/**
 * Created by jbush_000 on 5/21/2016.
 */
const ServerConfig = require("../config/serverConfig");
var gerbil = require('../models/gerbil');

class GerbilService {
  constructor(gerbilContainer, socketService){
    this.gerbilContainer = gerbilContainer;
    this.socketService = socketService;
  }

  getGerbil(id){
    return this.gerbilContainer.getGerbil(id);
  }

  addGerbil(gerbil){
    this.gerbilContainer.addGerbil(gerbil);
  }

  removeGerbil(gerbil){
    this.gerbilContainer.removeGerbil(gerbil);
  }

  resetGerbils(){
    this.gerbilContainer.resetGerbils();
    this.socketService.getAllSockets().forEach((socket) => {
      socket.emit(ServerConfig.IO.OUTGOING.GERBIL_SPAWN, []);
    });
  }

  sendGerbils(){
    var GerbilList = [];
    for(var value of this.gerbilContainer.getGerbils()){
      GerbilList.push(value);
    }
    this.socketService.getAllSockets().forEach((socket) => {
      socket.emit(ServerConfig.IO.OUTGOING.GERBIL_SPAWN, GerbilList);
    });
  }
  
  CheckIfHit(x, y) {
    for(var gerbil of this.gerbilContainer.getGerbils()){
      if (gerbil.CheckIfHit(x, y)) {
        return gerbil;
      }
    }
  }

}

module.exports = GerbilService;