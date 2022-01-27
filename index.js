import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

const combo = document.getElementById('ingredient-combo1');
const combo2 = document.getElementById('ingredient-combo2');
const combo3 = document.getElementById('ingredient-combo3');
const combo4 = document.getElementById('ingredient-combo4');
const combo5 = document.getElementById('ingredient-combo5');

let ingredient1;
let ingredient2;
let ingredient3;
let ingredient4;
let ingredient5;

const combos = Array.from(document.querySelectorAll('ingredient-combo'));


async function FetchIngredients ()
{
    const response = await fetch('/ingredients.json');
    if (response.status !== 200) {
      console.log("error");
      return null;
    }
    const result = await response.json();
    result.Array.forEach(element => combos.push(element.Naam));

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
}

async function ProductNameToId(object)
{
  event.preventDefault();
 // console.log("ingredienten:")


  let response2 = "";
  let address
  
  if(combo.value != null)
  {
      address = 'https://localhost:44309/api/producten/find/' + combo.value;
      console.log(address)
      response2 = await fetch(address);
      if (response2.status !== 200)
        console.log("error " + response2.status)
          

      ingredient1 = await response2.json();
  }
  if(combo2.value != null)
  {
      address = 'https://localhost:44309/api/producten/find/' + combo2.value;
      response2 = await fetch(address);
      if (response2.status !== 200)
          return null;

      ingredient2 = await response2.json();
  }if(combo3.value != null)
  {
      address = 'https://localhost:44309/api/producten/find/' + combo3.value;
      response2 = await fetch(address);
      if (response2.status !== 200)
          return null;

          ingredient3 = await response2.json();
  }
  if(combo4.value != null)
  {
      address = 'https://localhost:44309/api/producten/find/' + combo4.value;
      response2 = await fetch(address);
      if (response2.status !== 200)
          return null;

          ingredient4 = await response2.json();
  }if(combo5.value != null)
  {
      address = 'https://localhost:44309/api/producten/find/' + combo5.value
      response2 = await fetch(address);
      if (response2.status !== 200)
          return null;

          ingredient5 = await response2.json();
  }

  

  /*
  let response2 = await fetch('');
  if (response2.status !== 200)
    return null;
    
  let result2 = await response2.json();
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
  */
}

async function GetVoedingswaarden1()
{
  const ingredient1field = document.getElementById('ingredient-combo1')
  if(ingredient1field.value == null ||ingredient1field.value == "")
  {
    console.log('empty');
    return ' empty';
  }

  

  document.getElementById('voedingswaarden').innerHTML = 
  '<p>Dit zijn de voedingswaarden van ' + ingredient1field.value +
   '.</p>' +
   'Energie: '+ result2.EnergieKcal + ' kcal</br>' +
   'Energie:  '+ result2.EnergieKj + ' kj</br>' +
   'Water: '+ ' gram/ml </br>'  +
   'Eiwitten: '+' gram</br>' +
   'Koolhydraten: '+' gram</br>' +
   'Suikers: '+' gram</br>' +
   'Vet: '+' gram</br>' +
   'waarvan verzadigd: '+' gram</br>' +
   'Enkelvoudig verzadigd: '+' gram</br>' +
   'Meervoudig verzadigd: '+' gram</br>' +
   'Cholesterol '+' milligram</br>' +
   'Voedingsvezels' +' gram</br>' +
   /*if(alcohol > 0 )*/
    'Alcohol' + ' gram ';
}

function RenderVoedingswaarden()
{

}

const ingredient1Field = document.getElementById('ingredient1field');
ingredient1Field.addEventListener('mouseover', GetVoedingswaarden1);

const ingredient2Field = document.getElementById('ingredient2field');
ingredient2Field.addEventListener('mouseover', GetVoedingswaarden1);

const ingredient3Field = document.getElementById('ingredient3field');
ingredient3Field.addEventListener('mouseover', GetVoedingswaarden1);

const ingredient4Field = document.getElementById('ingredient4field');
ingredient4Field.addEventListener('mouseover', GetVoedingswaarden1);

const ingredient5Field = document.getElementById('ingredient5field');
ingredient5Field.addEventListener('mouseover', GetVoedingswaarden1);

const submit = document.getElementById('submit');
submit.addEventListener('click', SendInformationToDatabase);

FetchIngredients();


