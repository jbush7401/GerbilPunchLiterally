/**
 * Created by jbush_000 on 5/18/2016.
 */
"use strict";
import ClientConfig from '../config/clientConfig';

export default class canvasHelper {
  constructor(canvas, infoCanvas, socket) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.infoHeight = infoCanvas.height;
    this.infoWidth = infoCanvas.width;
    this.cvs = canvas;
    this.infoCanvas = infoCanvas;
    this.context = canvas.getContext('2d');
    this.infoContext = infoCanvas.getContext('2d');
    this.socket = socket;
    this._initialize();
    this._initializeClickListeners();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = "black";
  }

  infoClear() {
    this.context.clearRect(0, 0, this.infoWidth, this.infoHeight);
    this.context.fillStyle = "black";
  }

  drawGerbils(data) {
    this.clear();
    for (var i = 0; i < data.length; i++) {
      this.context.fillStyle = data[i].color;
      this.context.fillRect(data[i].x, data[i].y, 20, 20);
    }
  }

  drawPointValues(data) {
    this.infoClear();
    var distance = this.infoWidth/5;
    var tempDistance = distance;
    this.infoContext.font = "30px Arial";
    for (var i in data) {
      this.infoContext.fillStyle = data[i].color;
      this.infoContext.fillRect(distance - 20, this.infoHeight/2 - 20, 40, 40);
      this.infoContext.fillStyle = "black";
      this.infoContext.textAlign = "center";
      this.infoContext.fillText(data[i].points, distance, this.infoHeight / 2 + 10);
      distance += tempDistance;
    }
  }

  getCursorPosition(event) {
    var rect = this.cvs.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
  }

  _initialize() {
    this.cvs.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
    this.infoCanvas.style.backgroundColor = 'rgb(204, 230, 255)';
  }

  _initializeClickListeners() {
    this.cvs.addEventListener('click', (event) => {
      var coords = this.getCursorPosition(event);
      this.socket.emit(ClientConfig.IO.OUTGOING.MOUSE_CLICK, coords);
    });
  }
}

