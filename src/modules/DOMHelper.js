import PubSub from 'pubsub-js';

export default {
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
  },
  handleClick(e) {
    const [x, y] = this.dataset.coords.split(',');
    this.classList.add('clicked');
    PubSub.publish('cellClicked', [x, y]);
  }
};
