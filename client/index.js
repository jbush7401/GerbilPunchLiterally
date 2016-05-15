/**
 * Created by jbush_000 on 5/13/2016.
 */
"use strict";
(function () {
    var cvs = document.getElementById("gameCanvas");
    var ctx = cvs.getContext("2d");

    cvs.addEventListener('click', function(event){
        getCursorPosition(event);
    });

    var restartGameBtn = document.getElementById("restartGame");
    var playerList = document.getElementById("playerList");

    cvs.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';

    // Connect socket connection
    var socket = io();

    socket.on('GerbilSpawn', function(data){
        ctx.clearRect(0, 0, 800, 500);
        ctx.fillStyle = "#DA44534";
        for(var i = 0; i < data.length; i++){
            ctx.fillRect(data[i].x, data[i].y , 20, 20);
        }
    });

    socket.on('PlayerList', function (data) {
        playerList.innerHTML = "";
        for(var i = 0; i < data.length; i++){
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(data[i].substring(0, 8)));
            playerList.appendChild(li);
        }
    });
    restartGameBtn.onclick=function() {
        console.log("Client: Game Restarting");
        socket.emit("restartGame", {});
    }

    function getCursorPosition(event) {
        var rect = cvs.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        socket.emit('mouseClick', {x: x, y: y});
        console.log("x: " + x + " y: " + y);
    }

}) ();