import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem (count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    } 
    this.items.push(item);
    return item;
  }

  deleteItem (id) {
    const index = this.items.findIndex(el => el.id === id);
    // splice: [2,4,8] splice(1,1) -> return 4, original array is [2,8]
    // slice: [2,4,8] sllice(1,1) -> return 4, original array is [2,4,8]
    this.items.splice(index, 1); // we arent returning the pulled id because we just want to delete it
  }

  updateCount(id, newCount) {
    if (newCount >=0) {
      this.items.find(el => el.id === id).count = newCount;
    }  
  }
}