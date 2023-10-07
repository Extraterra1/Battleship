export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill(0).map((el) => new Array(10).fill({ hasBeenHit: false, ship: null }));
    this.ships = [];
  }

  addShip(ship, coords) {
    const [x, y] = coords;
    const positions = [];

    for (let i = x; i < ship.length + x; i++) {
      this.board[i][y] = { ...this.board[i][y], ship };
      positions.push([i, y]);
    }

    ship.positions = positions;
    this.ships.push(ship);
  }

  receiveAttack(coords) {
    if (!this.isValidMove(coords)) throw new Error('Invalid Move');
    const [x, y] = coords;
    const cell = this.board[x][y];
    let message = `attacked [${x},${y}]`;

    if (cell.ship) {
      const ship = this.ships.find((s) => s === cell.ship);
      ship.hit();
      ship.isSunk() ? (message += ' ship has been sunk!') : (message += ' ship found!');
    }

    this.board[x][y] = { ...cell, hasBeenHit: true };
    return message;
  }

  isValidMove(coords) {
    const [x, y] = coords;
    return x >= 0 && x <= 9 && y >= 0 && y <= 9 && !this.board[x][y].hasBeenHit;
  }
}
