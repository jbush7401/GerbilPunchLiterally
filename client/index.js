/**
 * Created by jbush_000 on 5/13/2016.
 */
import DomHelper from './js/views/domHelper';
import CanvasView from './js/views/canvasHelper';

"use strict";
(function () {
    var socket = io();
    
    var canvas = new CanvasView(DomHelper.getCanvas(), socket);

    var restartGameBtn = document.getElementById("restartGame");
    var playerList = document.getElementById("playerList");

    

    // Connect socket connection

    socket.on('GerbilSpawn', function (data) {
        canvas.context.clearRect(0, 0, 800, 500);
        canvas.context.fillStyle = "#DA44534";
        for (var i = 0; i < data.length; i++) {
            canvas.context.fillRect(data[i].x, data[i].y, 20, 20);
        }
    });

    socket.on('PlayerList', function (data) {
        playerList.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(data[i].substring(0, 8)));
            playerList.appendChild(li);
        }
    });
    restartGameBtn.onclick = function () {
        socket.emit("restartGame", {});
    }

})();