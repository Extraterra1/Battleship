export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill(0).map((el) => new Array(10).fill({ hasBeenHit: false, ship: null }));
    this.ships = [];
  }

  addShip(ship, coords) {
    const [x, y] = coords;
    this.ships.push(ship);
    for (let i = x; i < ship.length + x; i++) {
      this.board[i][y] = { ...this.board[i][y], ship };
    }
  }

  receiveAttack(coords) {
    const [x, y] = coords;
    const cell = this.board[x][y];

    if (cell.ship) cell.ship.hit();
    if (cell.ship.isSunk()) console.log('ship has been sunk!');
    this.board[x][y] = { ...cell, hasBeenHit: true };
  }
}
