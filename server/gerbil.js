/**
 * Created by jbush_000 on 5/15/2016.
 */
"use strict";
var uuid = require('node-uuid');

var Gerbil = function Gerbil(startX, startY) {
    var x = startX;
    var y = startY;
    var id = uuid.v4();

    var CheckIfHit = (clickX, clickY) => {
        if(clickX >= x && clickX <= x+20 && clickY >= y && clickY <= y+20)
            return true;
        else 
            return false;
    };

    return {
        x: x,
        y: y,
        id: id,
        CheckIfHit: CheckIfHit
    }
};

module.exports = Gerbil;