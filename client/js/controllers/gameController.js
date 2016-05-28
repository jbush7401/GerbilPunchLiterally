/**
 * Created by jbush_000 on 5/17/2016.
 */
import ClientConfig from '../config/clientConfig';
import GameView from '../views/gameView';
import DomHelper from '../views/domHelper';
import CanvasView from '../views/canvasHelper';

export default class GameController {
  constructor() {
    this.gameView = new GameView(this.restartGameCB.bind(this));
    this.gameState = "";
  }

  connect(io) {
    this.socket = io();
    this.canvas = new CanvasView(DomHelper.getCanvas(), DomHelper.getInfoCanvas(), this.socket);
    this._initializeSocketListeners();
  }

  restartGameCB(option) {
    this.socket.emit(ClientConfig.IO.OUTGOING.RESTART_GAME, option);
  }

  _initializeSocketListeners() {
    var self = this;
    this.socket.on(ClientConfig.IO.INCOMING.GERBIL_SPAWN, this.canvas.drawGerbils.bind(this.canvas));
    this.socket.on(ClientConfig.IO.INCOMING.PLAYER_LIST, this.gameView.drawPlayerList.bind(this.gameView));
    this.socket.on(ClientConfig.IO.INCOMING.PLAYER_NAME, (data) => this.gameView.setPlayerName(data));
    this.socket.on(ClientConfig.IO.INCOMING.GAME_TICK, (data) => this.gameView.handleTick(data, self.gameState));
    this.socket.on(ClientConfig.IO.INCOMING.PLAYER_POINT_VALUES, (data) => this.canvas.drawPointValues(data));
    this.socket.on(ClientConfig.IO.INCOMING.GAME_STATE, (data) => {
      this.gameState = data.gameState;
      this.gameView.handleTick(data, data.gameState)
    });

  }
}