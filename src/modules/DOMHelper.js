import PubSub from 'pubsub-js';
import Swal from 'sweetalert2';

export default class DOMHelper {
  constructor() {
    PubSub.subscribe('attackReceived', this.updateGridOnAttack);
    PubSub.subscribe('CPUAttackReceived', this.updateGridOnAttack);
    PubSub.subscribe('winner', this.declareWinner);
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

    if (data.msg.includes('sunk') && data.player === 'Player 2')
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
        title: 'You have sunk a ship!!'
      });
    if (data.msg.includes('sunk') && data.player === 'Player 1')
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'error',
        title: 'One of your ships has been sunk 😟'
      });
  }

  displayUserShips(ships) {
    const positions = ships.map((e) => e.positions).flat();
    positions.forEach((coords) => {
      const [x, y] = coords;
      const gridCell = document.querySelector(`.user-grid .grid-item[data-coords='${x},${y}']`);
      gridCell.classList.add('ship');
    });
  }

  declareWinner(msg, data) {
    const loser = data;
    const winner = loser === 'Player 2' ? 'Player 1' : 'CPU';
    Swal.fire({
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/014/475/134/original/golden-yellow-trophy-icon-for-the-winner-of-a-sports-event-png.png',
      imageHeight: '30rem',
      imageWidth: 'auto',
      title: 'We have a winner!!',
      text: `${winner} wins!`,
      confirmButtonText: 'Play Again',
      allowOutsideClick: false,
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-text',
        confirmButton: 'swal-button'
      },
      width: '30vw'
    }).then((result) => {
      if (result.isConfirmed) {
        PubSub.publish('reset');
      }
    });
  }

  resetGrids() {
    const userGrid = document.querySelector('.user-grid .board-grid');
    const cpuGrid = document.querySelector('.cpu-grid .board-grid');

    userGrid.innerHTML = '';
    cpuGrid.innerHTML = '';

    this.buildBoardGrid(userGrid);
    this.buildBoardGrid(cpuGrid);
  }
}
