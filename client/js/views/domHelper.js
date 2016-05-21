/**
 * DOM manipulation helper
 */
export default class DomHelper {
    static createElement(elementName) {
        return document.createElement(elementName);
    }

    static getCanvas() {
        return document.getElementById("gameCanvas");
    }

    static getBody() {
        return document.body;
    }

    static getTimer() {
        return document.getElementById("timer");
    }
    static getRestartButton() {
        return document.getElementById("restartGame");
    }

    static getPlayerList() {
        return document.getElementById("playerList");
    }
}
