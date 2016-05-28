/**
 * Created by jbush_000 on 5/19/2016.
 */
import DomHelper from './domHelper';

export default class GameView {
  constructor(restartGameCB) {
    this.restartGameCB = restartGameCB;
    this.timer = DomHelper.getTimer();
    this.playerList = DomHelper.getPlayerList();
    this._initEventHandling();
  }

  /*****************
   * Event Handling *
   ******************/

  drawPlayerList(data) {
    this.playerList.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement("li");
      var isYou = "";
      if (data[i].id === this.playerName) {
        li.className = "currentPlayer";
        isYou = "(You)"
      }
      li.appendChild(document.createTextNode(data[i].currentScore + " | " + data[i].id.substring(0, 8) + " " + isYou));
      this.playerList.appendChild(li);
    }
  }

  setPlayerName(name) {
    this.playerName = name.id;
  }

  drawTimer(data, gameState) {

    this.timer.innerHTML = "";
    var h2 = document.createElement("h2");
    if (gameState === "Running")
      h2.innerHTML = "Time Left: " + Math.round(data.timeLeft);
    else if (gameState === "Starting")
      h2.innerHTML = "Game Starts In: " + Math.round(data.timeLeft);
    this.timer.appendChild(h2);
  }

  handleTick(data, gameState) {
    this.drawTimer(data, gameState);
  }

  _handleRestartGameButtonClick() {
    this.restartGameCB({});
  }

  _initEventHandling() {
    DomHelper.getRestartButton().addEventListener('click', this._handleRestartGameButtonClick.bind(this));
  }
}