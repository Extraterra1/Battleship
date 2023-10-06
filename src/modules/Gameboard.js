export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill(0).map((el) => new Array(10).fill({ hasBeenHit: false, ship: null }));
    this.ships = [];
  }

  addShip(ship, coords) {
    const [x, y] = coords;
    const shipLocations = [];
    for (let i = x; i < ship.length + x; i++) {
      this.board[i][y] = { ...this.board[i][y], ship };
      shipLocations.push([i, y]);
    }
    this.ships.push({ ...ship, shipLocations });
  }
}
