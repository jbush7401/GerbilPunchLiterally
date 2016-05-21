/**
 * Created by jbush_000 on 5/13/2016.
 */
import DomHelper from './js/views/domHelper';
import CanvasView from './js/views/canvasHelper';
import GameController from './js/controllers/gameController';

"use strict";
const gameController = new GameController();
gameController.connect(io);
