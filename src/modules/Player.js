import PubSub from 'pubsub-js';
export default class Player {
  constructor(name) {
    this.board = [];
    this.name = name;
    this.possibleAttacks = [...Array(10)].flatMap((_, x) => [...Array(10)].map((_, y) => [x, y]));
    if (this.name === 'Player 2') {
      PubSub.subscribe('cellClicked', (msg, data) => {
        const attack = this.board.receiveAttack(data);
        if (attack.includes('ship')) {
          PubSub.publish('attackReceived', { coords: data, msg: attack, player: this.name });
          if (this.board.checkWinner()) PubSub.publish('winner', this.name);
        }

        // wait half a second and do a random attack
        setTimeout(this.randomAttack.bind(this), 500);
      });
    }
    if (this.name === 'Player 1') {
      PubSub.subscribe('cpuAttack', (msg, data) => {
        const attack = this.board.receiveAttack(data);

        PubSub.publish('CPUAttackReceived', { coords: data, msg: attack, player: this.name });
        if (this.board.checkWinner()) PubSub.publish('winner', this.name);
      });
    }
  }

  randomAttack() {
    const coords = this.possibleAttacks[Math.floor(Math.random() * this.possibleAttacks.length)];
    const [x, y] = coords;
    this.possibleAttacks = this.possibleAttacks.filter((e) => {
      const [eX, eY] = e;
      return eX !== x || eY !== y;
    });
    PubSub.publish('cpuAttack', coords);
  }

  reset() {
    this.possibleAttacks = [...Array(10)].flatMap((_, x) => [...Array(10)].map((_, y) => [x, y]));
  }
}
