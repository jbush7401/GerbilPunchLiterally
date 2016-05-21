/**
 * Created by jbush_000 on 5/20/2016.
 */
"use strict";

class PlayerContainer {
    constructor() {
        this._players = new Map();
    }

    addPlayer(player) {
        this._players.set(player.id, player);
    }

    removePlayer(socket) {
        this._players.delete(socket.id);
    }

    getPlayer(playerId) {
        return this._players.get(playerId);
    }

    getPlayers() {
        return this._players.values();
    }
}

module.exports = PlayerContainer;
