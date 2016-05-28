/**
 * Created by jbush_000 on 5/13/2016.
 */
import DomHelper from './js/views/domHelper';
import CanvasView from './js/views/canvasHelper';
import GameController from './js/controllers/gameController';
import io from 'socket.io-client';

"use strict";
const gameController = new GameController();
gameController.connect(io);
