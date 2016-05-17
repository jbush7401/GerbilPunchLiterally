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
}
