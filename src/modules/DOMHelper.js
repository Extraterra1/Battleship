export default {
  buildBoardGrid(parent) {
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
  },
  handleClick(e) {
    console.log(this);
  }
};
