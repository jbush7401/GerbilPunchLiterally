/**
 * Created by jbush_000 on 5/15/2016.
 */
"use strict";
var uuid = require('node-uuid');

class Gerbil {
    constructor (startX, startY) {
        this.x = startX;
        this.y = startY;
        this.id = uuid.v4();
    }
    CheckIfHit(clickX, clickY){
        if(clickX >= this.x && clickX <= this.x+20 && clickY >= this.y && clickY <= this.y+20)
            return true;
        else
            return false;
    };
}


module.exports = Gerbil;