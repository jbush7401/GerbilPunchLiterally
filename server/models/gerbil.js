/**
 * Created by jbush_000 on 5/15/2016.
 */
"use strict";
var uuid = require('node-uuid');
const ServerConfig = require("../config/serverConfig");

class Gerbil {
    constructor (startX, startY) {
        this.x = startX;
        this.y = startY;
        this.id = uuid.v4();
        this.color = this.pickRandomColor();
    }
    CheckIfHit(clickX, clickY){
        if(clickX >= this.x && clickX <= this.x+20 && clickY >= this.y && clickY <= this.y+20)
            return true;
        else
            return false;
    };

    pickRandomColor(){
        var keys = Object.keys(ServerConfig.Gerbil_Colors);
        return ServerConfig.Gerbil_Colors[keys[ keys.length * Math.random() << 0]];
    }
}

module.exports = Gerbil;