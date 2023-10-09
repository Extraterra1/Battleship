import Gameboard from './modules/Gameboard';
import DOMHelper from './modules/DOMHelper';
import Player from './modules/Player';
import PubSub from 'pubsub-js';
import './style.css';

const helper = new DOMHelper();

const player1 = new Player('Player 1');
player1.board = new Gameboard();
const player2 = new Player('Player 2');
player2.board = new Gameboard();

const userGrid = document.querySelector('.user-grid .board-grid');
const cpuGrid = document.querySelector('.cpu-grid .board-grid');

helper.buildBoardGrid(userGrid);
helper.buildBoardGrid(cpuGrid);
helper.displayUserShips(player1.board.ships);

PubSub.subscribe('reset', () => {
  player1.reset();
  player1.board.reset();
  player2.reset();
  player2.board.reset();

  helper.resetGrids();
  helper.displayUserShips(player1.board.ships);
});
