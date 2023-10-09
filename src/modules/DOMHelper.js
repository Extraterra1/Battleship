import PubSub from 'pubsub-js';

export default class DOMHelper {
  constructor() {
    PubSub.subscribe('attackReceived', this.updateGridOnAttack);
    PubSub.subscribe('CPUAttackReceived', this.updateGridOnAttack);
  }

  buildBoardGrid(parent) {
    let row = 0;
    let column = 0;
    for (let i = 0; i < 100; i++) {
      const elementToAppend = document.createElement('div');
      elementToAppend.classList.add('grid-item');
      elementToAppend.setAttribute('data-coords', `${row},${column}`);
      elementToAppend.addEventListener('click', this.handleClick, { once: true });
      parent.append(elementToAppend);

      if (++column === 10) {
        row++;
        column = 0;
      }
    }
  }

  handleClick(e) {
    const [x, y] = this.dataset.coords.split(',');
    this.classList.add('clicked');
    PubSub.publish('cellClicked', [x, y]);
  }

  updateGridOnAttack(msg, data) {
    const [x, y] = data.coords;
    if (data.player === 'Player 1') {
      const gridCell = document.querySelector(`.user-grid .grid-item[data-coords='${x},${y}']`);
      gridCell.classList.add('clicked');
      if (!data.msg.includes('ship')) return;
    }
    const gridToUpdate = data.player === 'Player 2' ? '.cpu-grid' : '.user-grid';

    const gridCell = document.querySelector(`${gridToUpdate} .grid-item[data-coords='${x},${y}']`);
    gridCell.classList.add('hit');
  }

  displayUserShips(ships) {
    const positions = ships.map((e) => e.positions).flat();
    positions.forEach((coords) => {
      const [x, y] = coords;
      const gridCell = document.querySelector(`.user-grid .grid-item[data-coords='${x},${y}']`);
      gridCell.classList.add('ship');
    });
  }
}
