import Ship from './modules/Ship';
import Gameboard from './modules/Gameboard';
import './style.css';

const buildBoardGrid = (parent) => {
  for (let i = 0; i < 100; i++) {
    const elementToAppend = document.createElement('div');
    elementToAppend.classList.add('grid-item');
    parent.append(elementToAppend);
  }
};

const userGrid = document.querySelector('.user-grid .board-grid');
const cpuGrid = document.querySelector('.cpu-grid .board-grid');

buildBoardGrid(userGrid);
buildBoardGrid(cpuGrid);

const gameboard = new Gameboard();
const ship = new Ship(2);

gameboard.addShip(ship, [0, 0]);

console.log(gameboard.board);
