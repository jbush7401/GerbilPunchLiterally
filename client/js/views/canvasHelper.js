/**
 * Created by jbush_000 on 5/18/2016.
 */
"use strict";

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
        this.context.fillRect(0, 0, this.width, this.height);
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
        const self = this;
        this.cvs.addEventListener('click', function (event) {
            var coords = self.getCursorPosition(event);
            self.socket.emit('mouseClick', coords);
            console.log("x: " + coords.x + " y: " + coords.y);
        });
    }
}

