/**
 * Created by jbush_000 on 5/15/2016.
 */
const ServerConfig = require("../config/serverConfig");
const HelperService = require("../services/helperService");

"use strict";
class Player {
  constructor(id) {
    this.id = id;
    this.currentScore = 0;
    this.pointValues = {};
  }

  resetPlayer() {
    this.currentScore = 0;
    this.setPointValues();
  }

  addScore(color) {
    for(var prop in this.pointValues){
      console.log(this.pointValues[prop].color);
      if(this.pointValues[prop].color === color){
        this.currentScore += this.pointValues[prop].points
      }
    }
  }

  setPointValues(){
    var keys = Object.keys(ServerConfig.Gerbil_Colors);
    keys = HelperService.shuffle(keys);
    for(var i = 0; i <= 3; i++){
      this.pointValues[i] = {color: keys[i], points: Math.floor(Math.random() * 7) - 3};
    }
  }
}

module.exports = Player;