/**
 * Created by jbush_000 on 5/18/2016.
 */
"use strict";
import ClientConfig from '../config/clientConfig';

export default class canvasHelper {
    constructor (canvas, socket){
      this.height = canvas.height;
      this.width = canvas.width;
      this.cvs = canvas;
      this.context = canvas.getContext('2d');
      this.socket = socket;
      this._initialize();
      this._initializeClickListeners();
  }
    
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = "black";
    }

    drawGerbils(data) {
        this.clear();
        for (var i = 0; i < data.length; i++) {
            this.context.fillStyle = data[i].color;
            this.context.fillRect(data[i].x, data[i].y, 20, 20);
        }
    }

    getCursorPosition(event) {
        var rect = this.cvs.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return {x: x, y: y};
    }

    _initialize(){
        this.cvs.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
    }

    _initializeClickListeners() {
        this.cvs.addEventListener('click', (event) => {
            var coords = this.getCursorPosition(event);
            this.socket.emit(ClientConfig.IO.OUTGOING.MOUSE_CLICK, coords);
        });
    }
}

