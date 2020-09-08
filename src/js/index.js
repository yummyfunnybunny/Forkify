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
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';   // import everything from searchview.js
import * as recipeView from './views/recipeView';   // import everything from recipeview.js
import * as listView from './views/listView';   // import everything from recipeview.js
import { elements, renderLoader, clearLoader } from './views/base';  // import just the elements object from base.js

// Global state of the app
// - search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};
window.state = state; // makes the state instantly available from the window object

// ==================================================
// SEARCH CONTROLLER
// ==================================================
const controlSearch = async () => {
  // 1: get query from view
  const query = searchView.getInput(); // TO DO
  //console.log(query);

  if (query) {
    // 2: new search object and add to state
    state.search = new Search(query);

    // 3: prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4: search for recipes
      await state.search.getResults();

      // 5: render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('Oopsie-Poopsie, something went whoopsie!');
      clearLoader();
    }
    
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

// ==================================================
// RECIPE CONTROLLER
// ==================================================
const controlRecipe = async () => {
  // get ID from the url
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare the UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // Create a new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get the recipe data and parse ingredients
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      //alert('Error processing recipe');
      console.log(error);
    }
    
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// ==================================================
// LIST CONTROLLER
// ==================================================
const controlList = () => {
  // create a new list IF there is none yet
  if (!state.list) state.list = new List();

  // add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItem(item);
  });
}

// handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // handle delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state
    state.list.deleteItem(id);
    // delete from UI
    listView.deleteItem(id);

  // handle the count update
  } else if (e.target.matches('.shopping__count-value')) {
      const val = parseFloat(e.target.value, 10);
      state.list.updateCount(id, val);
  }
});

// Hnadling recipe button clicks (EVENT DELEGATION)
elements.recipe.addEventListener('click', e => {
  // returns true if you click on the .btn-decrease, or any child element of .btn-decrease
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  // returns true if you click on the .btn-increase, or any child element of .btn-increase
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }
  // console.log(state.recipe);
});

window.l = new List();