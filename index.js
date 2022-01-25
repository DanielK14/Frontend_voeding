import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

const combo = document.getElementById('ingredient-combo1');
const combo2 = document.getElementById('ingredient-combo2');
const combo3 = document.getElementById('ingredient-combo3');
const combo4 = document.getElementById('ingredient-combo4');
const combo5 = document.getElementById('ingredient-combo5');

const combos = Array.from(document.querySelectorAll('ingredient-combo'));

async function FetchIngredients ()
{
    const response = await fetch('/ingredients.json');
    if (response.status !== 200) {
      console.log("error");
      return null;
    }
    const result = await response.json();
    result.Array.forEach(element =>  combos.push(element.Naam));

        combo.items = combos; // this array comes from database
        combo2.items = combos;
        combo3.items = combos;
        combo4.items = combos;
        combo5.items = combos;
}

 function SendInformationToDatabase()
{ const naam = document.getElementById("Gerecht naam");
  const omschrijving = document.getElementById("Gerecht Omschrijving")
  const gewicht1 = document.getElementById("gewicht1");
  const gewicht2 = document.getElementById("gewicht2");
  const gewicht3 = document.getElementById("gewicht3");
  const gewicht4 = document.getElementById("gewicht4");
  const gewicht5 = document.getElementById("gewicht5");
  const newObject = { Naam:naam,omschrijving:omschrijving, Ingredient1Id:"0",Gewicht1:gewicht1, Ingredient2Id:"0", Gewicht2:gewicht2, Ingredient3Id:"0", Gewicht3:gewicht3, Ingredient4Id:"0", Gewicht4:gewicht4, Ingredient5Id:"0", Gewicht5:gewicht5}
  ProductNameToId(newObject);
  console.log(newObject);
}

async function ProductNameToId(object)
{
  event.preventDefault();
  console.log("ingredienten:")
  const response2 = await fetch('/ingredients.json');
  if (response2.status !== 200)
    return null;
  const result2 = await response2.json();
  result2.Array.forEach(element => {
    if(element.Naam == combo.value)
    {
      object.Ingredient1Id=element.Id;
      console.log("Ingredient 1: " + element.Id);
    }
    else if(element.Naam == combo2.value)
    {
      object.Ingredient2Id=element.Id;
      console.log("Ingredient 2: " + element.Id);
    }
    else if(element.Naam == combo3.value)
    {
      object.Ingredient3Id=element.Id;
      console.log("Ingredient 3: " + element.Id);
    }
    else if(element.Naam == combo4.value)
    {
      object.Ingredient4Id=element.Id;
      console.log("Ingredient 4: " + element.Id);
    }
    else if(element.Naam == combo4.value)
    {
      object.Ingredient5Id=element.Id;
      console.log("Ingredient 5: " + element.Id);
    }
  });
}

FetchIngredients();

const submit = document.getElementById('submit');
submit.addEventListener('click', SendInformationToDatabase);
