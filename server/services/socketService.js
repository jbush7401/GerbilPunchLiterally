/**
 * Created by jbush_000 on 5/21/2016.
 */
"use strict"

class SocketService {
    constructor() {
        this._gameSockets = [];
    }
    
    addSocket(socket){
        this._gameSockets.push(socket);
    }

    removeSocket(socket){
        var i = this._gameSockets.indexOf(socket);
        this._gameSockets.splice(i, 1);
    }
    
    getAllSockets(){
        return this._gameSockets;
    }
    
    
}

module.exports = SocketService;