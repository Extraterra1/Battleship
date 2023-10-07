export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill(0).map((el) => new Array(10).fill({ hasBeenHit: false, ship: null }));
    this.ships = [];
  }

  addShip(ship, coords, horizontal) {
    const positions = Gameboard.getShipPositions(ship, coords, horizontal, this);
    if (positions.length === 0) throw new Error('ship position invalid');

    positions.forEach((coords) => {
      const [x, y] = coords;
      this.board[x][y] = { ...this.board[x][y], ship };
    });

    ship.positions = positions;
    this.ships.push(ship);
  }

  receiveAttack(coords) {
    if (!Gameboard.isValidMove(coords, this)) throw new Error('Invalid Move');
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

  static isValidMove(coords, instance) {
    const [x, y] = coords;
    return x >= 0 && x <= 9 && y >= 0 && y <= 9 && !instance.board[x][y].hasBeenHit;
  }

  static getShipPositions(ship, coords, horizontal, instance) {
    const [x, y] = coords;
    const positions = [];
    if (!horizontal) {
      for (let i = x; i < ship.length + x; i++) {
        positions.push([i, y]);
      }
    }
    if (horizontal) {
      for (let i = y; i < ship.length + x; i++) {
        positions.push([x, i]);
      }
    }
    const isThereAShip = positions
      .map((e) => {
        const [x, y] = e;
        return !!instance.board[x][y].ship;
      })
      .includes(true);

    return isThereAShip ? [] : positions;
  }
}
