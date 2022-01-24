import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

const combo = document.getElementById('ingredient-combo');

const combos = Array.from(document.querySelectorAll('ingredient-combo'));


async function FetchIngredients ()
{
    const ingredients = await fetch(ingredients.json)
    const result = ingredients.json();
    console.log(result);
}

combos.forEach(combo => {
  combo.items = [{ ingredient: 'banana' }]; // this array comes from database
})

combo.items = [{ ingredient: 'orange' }]; // this array comes from database

FetchIngredients();