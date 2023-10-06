import Ship from './modules/Ship';
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

const ship = new Ship(2);
console.log(ship.length);
console.log(`ship is${ship.isSunk ? '' : 'not'} sunk`);
ship.hit();
ship.hit();
console.log(`ship is${ship.isSunk ? '' : 'not'} sunk`);
