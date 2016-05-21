/**
 * Created by jbush_000 on 5/15/2016.
 */
"use strict";
class Player {
    constructor(id){
        this.id = id;
        this.currentScore = 0;
    }

    resetPlayer(){
        this.currentScore = 0;
    }

    addScore(){
        this.currentScore++;
    }
}

module.exports = Player;