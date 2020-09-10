export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = {id , title, author , img};
    this.likes.push(like);
    
    // Persist data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    // splice: [2,4,8] splice(1,1) -> return 4, original array is [2,8]
    // slice: [2,4,8] sllice(1,1) -> return 4, original array is [2,4,8]
    this.likes.splice(index, 1); // we arent returning the pulled id because we just want to delete it

    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // restore likes from the localStorage
    if (storage) this.likes = storage;
  }
};

