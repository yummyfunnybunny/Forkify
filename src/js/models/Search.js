import axios from 'axios';  // no need to declare the path, just copy the name as shown in the package.json dependency section
// axios automatically imports stuff as json data, whereas fetch did not

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    try{
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes;
      //console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}




