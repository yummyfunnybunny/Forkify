//=======================================================================================================
//3 ways to import from other models:
/*
// 1: import one single element from a model:
import str from './models/Search';

//1: import the specific elements from the SearchView model (must use exact same names given in the SearchView model)
// you can say '[imported el] as [new name]' to change the name we use for the imported element
import { add as a, multiply as m, ID} from './views/SearchView';
console.log(`Using imported funcions! ${a(ID, 2)} and ${m(3, 5)}. ${str}}`);

// 3: import everything from a model and insert them into the 'searchView' variable
// '*' = import everything
import * as searchView from './views/SearchView';
console.log(`Using imported funcions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}}`);
*/
//=======================================================================================================
import Search from './models/Search';
import * as searchView from './views/searchView';   // import everything from searchview.js
import { elements, renderLoader, clearLoader } from './views/base';  // import just the elements object from base.js

// Global state of the app
// - search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};

const controlSearch = async () => {
  // 1: get query from view
  const query = searchView.getInput(); // TO DO
  console.log(query);

  if (query) {
    // 2: new search object and add to state
    state.search = new Search(query);

    // 3: prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4: search for recipes
    await state.search.getResults();

    // 5: render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  console.log(btn);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});



