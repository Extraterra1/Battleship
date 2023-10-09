// import Ship from './modules/Ship';
import Gameboard from './modules/Gameboard';
import DOMHelper from './modules/DOMHelper';
import Player from './modules/Player';
import './style.css';

const helper = new DOMHelper();

const player1 = new Player('Player 1');
player1.board = new Gameboard();
const player2 = new Player('Player 2');
player2.board = new Gameboard();

console.log(player1);
console.log(player2);

const userGrid = document.querySelector('.user-grid .board-grid');
const cpuGrid = document.querySelector('.cpu-grid .board-grid');

helper.buildBoardGrid(userGrid);
helper.buildBoardGrid(cpuGrid);

// console.log(gameboard.receiveAttack([0, 0]));
// console.log(gameboard.receiveAttack([1, 0]));
// console.log(gameboard.receiveAttack([1, 1]));
// console.log(gameboard.receiveAttack([0, 1]));
// console.log(gameboard.receiveAttack([3, 0]));
// console.log(gameboard.receiveAttack([9, 9]));
// console.log(gameboard.receiveAttack([7, 9]));
// console.log(gameboard.receiveAttack([8, 9]));
// console.log(gameboard.receiveAttack([5, 9]));
// console.log(gameboard.receiveAttack([3, 9]));
