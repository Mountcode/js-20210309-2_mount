export default class SortableTable {
  static classCollect = '21';

  constructor(header = [],data = []) {
    this.data = data; 
    this.header = header;
    this.render();
  }

  render() {
    this.template();
  }

  template(){
    const element = document.createElement('div');
    element.innerHTML = `
    <div data-element="productsContainer" class="products-list__container">
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
        </div>
        <div data-element="body" class="sortable-table__body">
        </div>
      </div>
    </div>
    `;
    this.element = element.firstElementChild;
    this.collectElements(element);
    this.constructTableHeader();
    this.constructTableRows();
  }
  constructTableHeader(){
    let headerCellsCollect = [];
    for(const dataCell of this.header) {
      let cellItem = `
          <div class="sortable-table__cell" data-id="${dataCell.id}" data-sortable="${dataCell.sortable}" data-order="asc">
            <span>${dataCell.title}</span>
            <span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>
          </div>
      `
      headerCellsCollect.push(cellItem)
      SortableTable.classCollect.header.innerHTML = headerCellsCollect.join('');
    }
  }
  constructTableRows(data = this.data.data){
    let rowsCellsCollect = []
    for(let item of data){
      let cellItem = `
            <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
            <div class="sortable-table__cell">
              <img class="sortable-table-image" alt="Image" src="${item.images[0].url}">
            </div>
            <div class="sortable-table__cell">${item.title}</div>
            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
          </a>
      ` 
      rowsCellsCollect.push(cellItem)
    }
    SortableTable.classCollect.body.innerHTML = rowsCellsCollect.join('');
  }
 

  sort(fieldValue,orderValue){
    let sortableColumnData = [];
    const sortedListArray = [];
    for(let item of this.data.data){
      sortableColumnData.push(item[fieldValue]);
    }
    if(typeof sortableColumnData[0] === 'string') {
      sortableColumnData = this.sortStrings(sortableColumnData,orderValue);
    }
    else {
      sortableColumnData = this.sortNumbers(sortableColumnData,orderValue);
    }
    for(const value of sortableColumnData) {
      sortedListArray.push(this.data.data.find((item) => item[fieldValue] === value));
    }
    this.removeContent(SortableTable.classCollect.body)
    this.constructTableRows(sortedListArray)
  }
  sortNumbers(sortableColumnData, orderValue) {
    return  sortableColumnData.sort((a, b) => {
      switch (orderValue) {
        case 'asc':
          return  a - b;
        case 'desc':
          return  b - a
      }
    });
  }
  remove () {
    this.element.remove();
  }
  removeContent (elem) {
    elem.innerHTML = "";
  }
  sortStrings(sortableColumnData, orderValue) {
    let direction = 0;
    switch (orderValue) {
      case 'asc':
        direction = 1
        break;
      case 'desc':
        direction = -1
    }
    return  sortableColumnData.sort((a, b) => {
      return a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper'}) * direction;
    });
  }
  collectElements(element){
    const elements = element.querySelectorAll('[data-element]');
    const elementsList = [];
    for (const [key, value] of Object.entries(elements)) {
      if (value.hasAttribute("data-element")) {
        elementsList[value.dataset.element] = value;
      }
    } 
    SortableTable.classCollect = elementsList;
  }
  destroy() {
    this.remove();
  }
}

