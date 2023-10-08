import Ship from './modules/Ship';
import Gameboard from './modules/Gameboard';
import './style.css';

const buildBoardGrid = (parent) => {
  let row = 0;
  let column = 0;
  for (let i = 0; i < 100; i++) {
    const elementToAppend = document.createElement('div');
    elementToAppend.classList.add('grid-item');
    elementToAppend.setAttribute('data-coords', `${row},${column}`);
    parent.append(elementToAppend);

    if (++column === 10) {
      row++;
      column = 0;
    }
  }
};

const userGrid = document.querySelector('.user-grid .board-grid');
const cpuGrid = document.querySelector('.cpu-grid .board-grid');

buildBoardGrid(userGrid);
buildBoardGrid(cpuGrid);

const gameboard = new Gameboard();
// const ship = new Ship(2);

// gameboard.addShip(ship, [0, 0], true);
gameboard.generateShips();

console.log(gameboard.receiveAttack([0, 0]));
console.log(gameboard.receiveAttack([1, 0]));
console.log(gameboard.receiveAttack([1, 1]));
console.log(gameboard.receiveAttack([0, 1]));
console.log(gameboard.receiveAttack([3, 0]));
console.log(gameboard.receiveAttack([9, 9]));
console.log(gameboard.receiveAttack([7, 9]));
console.log(gameboard.receiveAttack([8, 9]));
console.log(gameboard.receiveAttack([5, 9]));
console.log(gameboard.receiveAttack([3, 9]));

console.log(gameboard.board);
console.log(gameboard.ships);
