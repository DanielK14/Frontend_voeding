import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

const combo = document.getElementById('product-combo1');
const combo2 = document.getElementById('product-combo2');
const combo3 = document.getElementById('product-combo3');
const combo4 = document.getElementById('product-combo4');
const combo5 = document.getElementById('product-combo5');

let individueelProduct = false;

let combos = [];

let newObject = {Naam:"Nieuw gerecht", omschrijving:"",
   Product1Id:0, Weight1:0, 
   Product2Id:0, Weight2:0, 
   Product3Id:0, Weight3:0, 
   Product4Id:0, Weight4:0,
   Product5Id:0, Weight5:0
  }

async function FetchIngredients ()
{
    fetch('/products.json')
    .then(response => response.json())
    .then(result => {FillItemLists(result)})
    .catch(err => {document.getElementById("nutrients"). innerHTML = 'The services are currently down please wait a moment or contact our support'});
}

function FillItemLists (result)
{
  result.Array.forEach(element => combos.push(element));

  combo.items = combos; // this array comes from database
  combo2.items = combos;
  combo3.items = combos;
  combo4.items = combos;
  combo5.items = combos;
}

function SendInformationToDatabase()
{ 
  event.preventDefault();
  ResetNutrientsField();
  
}

function FetchIngredient1() 
{
  if(combo.value != null)
  {
    if(individueelProduct)
      {
        ResetViewButtons();
        ResetNutrientsField();
      }
    else
    {
      product1field.innerText = '<';
      FetchNutrients(combo.value, 0);
    }
    individueelProduct = !individueelProduct;
  }
}

function FetchIngredient2() 
{
  if(combo2.value != null)
  {
    if(individueelProduct)
      {
        ResetViewButtons();
        ResetNutrientsField();
      }
    else
    {
      product2field.innerText = '<';
      FetchNutrients(combo2.value, 1);
    }
    individueelProduct = !individueelProduct;
  }
}

function FetchIngredient3() 
{
  if(combo3.value != null)
  {
    if(individueelProduct)
      {
        ResetViewButtons();
        ResetNutrientsField();
      }
    else
    {
      product3field.innerText = '<';
      FetchNutrients(combo3.value, 2);
    }
    individueelProduct = !individueelProduct;
  }
}

function FetchIngredient4() 
{
  if(combo4.value != null)
  {
    if(individueelProduct)
      {
        ResetViewButtons();
        ResetNutrientsField();
      }
    else
    {
      product4field.innerText = '<';
      FetchNutrients(combo4.value, 3);
    }
    individueelProduct = !individueelProduct;
  }
}

function FetchIngredient5() 
{
  if(combo5.value != null)
  {
    if(individueelProduct)
      {
        ResetViewButtons();
        ResetNutrientsField();
      }
    else
    {
      product3field.innerText = '<';
      FetchNutrients(combo5.value, 4);
    }
    individueelProduct = !individueelProduct;
  }
}
function CollectAllNutrients()
{
  ResetNutrientsField();
  SaveNutrients();
}

async function SaveNutrients()
{
  if(!EnoughInformation())
    return;
    
    // Tries to connect to the database with the clients
    fetch("https://localhost:44309/api/gerecht/Totalen/", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObject)
    })
    .then(response => response.json())
    .then(FetchNutrients(document.getElementById("Name").value, 1))
   .catch(err => {document.getElementById("nutrients"). innerHTML = 'Er is iets fout gegaan bij het berekenen'});
} 

async function FetchNutrients(target, productNumber){
  // Tries to connect to the database with the clients
  fetch("https://localhost:44309/api/voedingswaarden/findbyname/" + target)
 .then(response => response.json())
 .then(data => {
  SetProduct(data, productNumber);
  RenderNutrients(data, SetWeight(productNumber));
  //object2 = data[Object.keys(data)];
  })
 .catch(err => {document.getElementById("nutrients"). innerHTML = 'Geen nutrients gevonden'});
}

function SetWeight(productNumber)
{
  switch(productNumber)
  {
    case 0:
      return FixWeight(document.getElementById('weight1').value);
      
    case 1:
      return FixWeight(document.getElementById('weight2').value);

    case 2:
      return FixWeight(document.getElementById('weight3').value);
      
    case 3:
      return FixWeight(document.getElementById('weight4').value);
      
    case 4:
      return FixWeight(document.getElementById('weight5').value);
  }
}

function SetProduct(object, productNumber)
{
  switch(productNumber)
  {
    case 0:
      newObject.Product1Id = object.id;
      newObject.Weight1 = SetWeight(productNumber);
      break;
      
    case 1:
      newObject.Product2Id = object.id;
      newObject.Weight2 = SetWeight(productNumber);
      break;

    case 2:
      newObject.Product3Id = object.id;
      newObject.Weight3 = SetWeight(productNumber);
      break;
      
    case 3:
      newObject.Product4Id = object.id;
      newObject.Weight4 = SetWeight(productNumber);
      break;
      
    case 4:
      newObject.product5Id = object.id;
      newObject.Weight5 = SetWeight(productNumber);
      break;
  }
}

function RenderNutrients(dataObject, weight)  
{ 
  if(dataObject == null)
  {
    console.log("dataobject is null")
    return;
  }
  document.getElementById('nutrients').innerHTML = 
  '<p>Dit zijn de nutrients van ' + dataObject.name + '.</p>' +
   'Energie: '+ dataObject.energieKcal *  weight + ' kcal</br>' +
   'Energie:  ' + dataObject.energieKj * weight + ' kj</br>' +
   'Water: '+ dataObject.water * weight + ' gram/ml </br>'  +
   'Eiwitten: '+dataObject.eiwit * weight+ ' gram</br>' +
   'Koolhydraten: '+dataObject.koolhydraten * weight+ ' gram</br>' +
   'Suikers: '+dataObject.suikers * weight+ ' gram</br>' +
   'Vet: '+dataObject.vet * weight+ ' gram</br>' +
   'waarvan verzadigd: '+dataObject.verzadigdVet * weight+ ' gram</br>' +
   'Enkelvoudig verzadigd: '+dataObject.enkelvoudigVerzadigd * weight+ ' gram</br>' +
   'Meervoudig verzadigd: '+dataObject.meervoudigVerzadigd * weight+ ' gram</br>' +
   'Cholesterol: '+dataObject.cholesterol * weight+ ' milligram</br>' +
   'Voedingsvezels:' +dataObject.voedingsVezels * weight+ ' gram</br>';
   if(dataObject.alcohol > 0 ) document.getElementById('nutrients').innerHTML +=  'Alcohol: ' + dataObject.alcohol * weight+ ' gram ';
}

function ResetNutrientsField()
{
  if(document.getElementById("Name").value != "" && document.getElementById("Name").value != null)
    newObject.Naam = document.getElementById("Name").value;
  
  if(document.getElementById("Description").value != "")
    newObject.omschrijving = document.getElementById("Description").value;
}

function ResetViewButtons()
{
  product1field.innerText = '>';
  product2field.innerText = '>';
  product3field.innerText = '>';
  product4field.innerText = '>';
  product5field.innerText = '>';
}

function FixWeight(input)
{
  let weight = parseInt(input)
  if(!Number.isInteger(weight))
  {
    weight = 0;
  }
  if(weight < 0)
  {
    weight = -weight;
  }
  return weight;
}

function EnoughInformation()
{
  console.log("checking");
  let msg = "Vul de volgende velden in: \n"
  let fellthrough = true;
  if(document.getElementById("Name").value == "" || document.getElementById("Name").value == null)
  {
    msg += "Naam  \n";
    fellthrough = false;
  }
  if(combo.value == "" || document.getElementById('weight1').value == null || document.getElementById('weight1').value == "")
  {
    msg+= "Product 1 met bijpassend gewicht \n";
    fellthrough= false; 
  }
  if(combo2.value == "" || document.getElementById('weight2').value == null ||  document.getElementById('weight2').value == "")
  {
    msg+= "Product 2 met bijpassend gewicht \n";
    fellthrough= false;
  }
  if(!fellthrough)
    {
      alert(msg);
    }

  return fellthrough;
}

const product1field = document.getElementById('product1field');
product1field.addEventListener('click',  FetchIngredient1);
const product2field =document.getElementById('product2field');
product2field.addEventListener('click',  FetchIngredient2);
const product3field = document.getElementById('product3field');
product3field.addEventListener('click',  FetchIngredient3);
const product4field = document.getElementById('product4field');
product4field.addEventListener('click',  FetchIngredient4);
const product5field = document.getElementById('product5field');
product5field.addEventListener('click',  FetchIngredient5);

const submit = document.getElementById('submit');
submit.addEventListener('click', CollectAllNutrients);
ResetNutrientsField();
FetchIngredients();

/*  Graveyard: here lie the obsolete functions for reference:



async function FetchIngredient(target, productNumber){
  // Tries to connect to the database with the clients
  fetch("https://localhost:44309/api/producten/find/" + target)
 .then(response => response.json())
 .then(data => {
   productList[productNumber] = data;
   console.log(data.nutrientsId);
   FetchNutrients(data.nutrientsId);
  })
 .catch(err => {document.getElementById("nutrients"). innerHTML = 'Geen product gevonden'});
}



function updateFields(){
  if(document.getElementById('Name').value != "" && document.getElementById('Name').value != null)
  {
    newObject.Name = document.getElementById('Name').value;
    ResetNutrientsField();
  }
  if(document.getElementById('Description').value != "" && document.getElementById('Description').value != null)
  {
    newObject.omschrijving = document.getElementById('Description').value;
    ResetNutrientsField();
  }
  if(document.getElementById('product-combo1').value != "" && document.getElementById('product-combo1').value != null)
  {
    productList[0] = document.getElementById('product-combo1').value;
    newObject.Weight1 = document.getElementById('weight1').value;
    ResetNutrientsField();
  }
  if(document.getElementById('product-combo2').value != "" && document.getElementById('product-combo2').value != null)
  {
    newObject.product2 = document.getElementById('product-combo2').value;
    newObject.Weight2 = document.getElementById('weight2').value;
    ResetNutrientsField();
  }
  if(document.getElementById('product-combo3').value != "" && document.getElementById('product-combo3').value != null)
  {
    newObject.product3 = document.getElementById('product-combo3').value;
    newObject.Weight3 = document.getElementById('weight3').value;
    ResetNutrientsField();
  }
  if(document.getElementById('product-combo4').value != "" && document.getElementById('product-combo4').value != null)
  {
    newObject.product4 = document.getElementById('product-combo4').value;
    newObject.Weight4 = document.getElementById('weight4').value;
    ResetNutrientsField();
  }
  if(document.getElementById('product-combo5').value != "" && document.getElementById('product-combo5').value != null)
  {
    newObject.product5 = document.getElementById('product-combo5').value;
    newObject.Weight5 = document.getElementById('weight5').value;
    ResetNutrientsField();
  }
}




async function ProductNameToId(object)
{
 // console.log("producten:")
 if(combo.value != null)
 {
     productList[0] = FetchId(combo.value);
  }
  if(combo2.value != null)
  {
    FetchIngredient(combo2.value);
  }if(combo3.value != null)
  {
    FetchIngredient(combo3.value);
  }
  if(combo4.value != null)
  {
    FetchIngredient(combo4.value);
  }if(combo5.value != null)
  {
   FetchIngredient(combo5.value);
  }
}

*/