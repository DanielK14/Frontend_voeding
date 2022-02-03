import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

//#region recipes part
const combo = document.getElementById('product-combo1');
const combo2 = document.getElementById('product-combo2');
const combo3 = document.getElementById('product-combo3');
const combo4 = document.getElementById('product-combo4');
const combo5 = document.getElementById('product-combo5');

let individueelProduct = false;

let combos = [];

var accessibleValue = 1;

var newDish = {
  Name:"New dish", description:"",
   Product1Id:0, Weight1:0, 
   Product2Id:0, Weight2:0, 
   Product3Id:0, Weight3:0, 
   Product4Id:0, Weight4:0,
   Product5Id:0, Weight5:0
  }

async function FetchIngredients ()
{
    fetch('products.json')
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
  if(!EnoughInformationDish())
    return;
    
    // Tries to connect to the database with the clients
    fetch("https://localhost:44309/api/dish/Totals/", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDish)
    })
    .then(response => response.json())
    .then(data => {
      FetchNutrients(data, -1);
      AssignDish(data);
      document.getElementById("addButton").style.visibility = "visible";
    })
   .catch(err => {document.getElementById("nutrients"). innerHTML = 'An error occured during calculations'});
} 

async function FetchNutrients(target, productNumber){
  // Tries to connect to the database with the clients
  let address = "https://localhost:44309/api/nutrients/findbyname/";
  if(Number.isInteger(target))
    address = "https://localhost:44309/api/nutrients/findbyid/"
  fetch(address + target)
 .then(response => response.json())
 .then(data => {if(productNumber < 0)
  {
    RenderNutrients(data,1)
  } else {
    SetProduct(data, productNumber);
    RenderNutrients(data, SetWeight(productNumber))
  };
  //object2 = data[Object.keys(data)];
  })
 .catch(err => {document.getElementById("nutrients"). innerHTML = 'No nutrients found'});
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
      newDish.Product1Id = object.id;
      newDish.Weight1 = SetWeight(productNumber);
      break;
      
    case 1:
      newDish.Product2Id = object.id;
      newDish.Weight2 = SetWeight(productNumber);
      break;

    case 2:
      newDish.Product3Id = object.id;
      newDish.Weight3 = SetWeight(productNumber);
      break;
      
    case 3:
      newDish.Product4Id = object.id;
      newDish.Weight4 = SetWeight(productNumber);
      break;
      
    case 4:
      newDish.product5Id = object.id;
      newDish.Weight5 = SetWeight(productNumber);
      break;
  }
}

function RenderNutrients(dataObject, weight)  
{ 
  if(dataObject == null)
  {
    alert("Nothing to calculate")
    return;
  }
  console.log(dataObject);
  document.getElementById('nutrients').innerHTML = 
  '<p>These are the nutrients of ' + dataObject.name + '.</p>' +
   'Energy: '+ dataObject.energyKcal *  weight + ' kcal</br>' +
   'Energy:  ' + dataObject.energyKj * weight + ' kj</br>' +
   'Water: '+ dataObject.water * weight + ' gram/ml </br>'  +
   'Protein: '+dataObject.protein * weight+ ' gram</br>' +
   'Carbohydrates: '+dataObject.carbohydrates * weight+ ' gram</br>' +
   'Sugar: '+dataObject.sugars * weight+ ' gram</br>' +
   'Fat: '+dataObject.fat * weight+ ' gram</br>' +
   'of which saturated: '+dataObject.saturatedFat * weight+ ' gram</br>' +
   'Single saturation: '+dataObject.singleSaturation * weight+ ' gram</br>' +
   'Multiple saturation: '+dataObject.multipleSaturation * weight+ ' gram</br>' +
   'Cholesterol: '+dataObject.cholesterol * weight+ ' milligram</br>' +
   'Fibres:' +dataObject.fibers * weight+ ' gram</br>';
   if(dataObject.alcohol > 0 ) document.getElementById('nutrients').innerHTML +=  'Alcohol: ' + dataObject.alcohol * weight+ ' gram ';
}

function ResetNutrientsField()
{
  if(document.getElementById("Name").value != "" && document.getElementById("Name").value != null)
    newDish.Name = document.getElementById("Name").value;
  
  if(document.getElementById("Description").value != "")
    newDish.description = document.getElementById("Description").value;
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

function EnoughInformationDish()
{
  let msg = "Fill in the following: \n\n"
  let fellthrough = true;
  if(document.getElementById("Name").value == "" || document.getElementById("Name").value == null)
  {
    msg += "Name of the dish  \n";
    fellthrough = false;
  }
  if(combo.value == "" || document.getElementById('weight1').value == null || document.getElementById('weight1').value == "")
  {
    msg+= "Product 1 and appropriate weight \n";
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

//#endregion

//#region Meals region

const comboMeal = document.getElementById('mealtype-combo');
comboMeal.items = ["Breakfast" , "Lunch" , "Dinner" , "Snack"];


var newMeal = {
name:"",  
momentOfDay:0,
mealType:0,
notes:"",
totalNutrients:0,
mealsDishComponentsId:0
}

var newMealComponents = {
  Dish0:0,
  Dish1:0,
  Dish2:0,
  Dish3:0,
  Dish4:0,
  Dish5:0,
  Dish6:0,
  Dish7:0,
  Dish8:0,
  Dish9:0
}

function EnoughInformationMeal()
{
  let msg = "Fill in the following: \n\n"
  let fellthrough = true;
  if(document.getElementById("nameMeal").value == "" || document.getElementById("nameMeal").value == null)
  {
    msg += "Meal name  \n";
    fellthrough = false;
  }
  if(comboMeal.value == "")
  {
    msg+= "Meal type \n";
    fellthrough= false;
  }
  if(document.getElementById("time").value == ""|| document.getElementById("time").value == null)
  {
    msg+= "Time of consumption \n";
    fellthrough= false;
  }
  if(newMealComponents.Dish0 == 0)
  {
    msg+= "Add at least one dish \n";
    fellthrough= false;
  }
  if(!fellthrough)
    {
      alert(msg);
    }
  return fellthrough;
}

function AssignDish(DishToAssign)
{
  for(let i = 0;i<10;i++ )
    {
      if(newMealComponents[i] == null)
      {
        var newKeyName = Object.keys(newMealComponents)[i];
        delete newMealComponents[Object.keys(newMealComponents)[i]];
        newMealComponents[newKeyName]=  DishToAssign;
        break;
      }
    }
    console.log(newMealComponents)
}

function SaveMeal()
{
  if(!EnoughInformationMeal())
    return;
   
  newMeal.name=document.getElementById("nameMeal").value;
  newMeal.momentOfDay = document.getElementById("time").value ;
  newMeal.mealType = comboMeal.value;
  newMeal.notes = document.getElementById("DescriptionMeal").value ; 
  SaveMealsDishComponents();
  SaveMealNutrients();
}

async function SaveMealsDishComponents()
{
  fetch("https://localhost:44309/api/MealsDishComponent/", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMealComponents)
    })
    .then(response => response.json())
    .then(data => newMeal.mealsDishComponentsId = data)
   .catch(err => {document.getElementById("nutrients"). innerHTML = 'Er is iets fout gegaan bij het berekenen'});

   console.log(newMeal);
}

async function SaveMealNutrients()
{
  fetch("https://localhost:44309/api/Meal/Totals", {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newDish)
  })
  .then(response => response.json())
  .then(data => {
    FetchNutrients(data, -1);
    newMeal.totalNutrients = data;
  })
 .catch(err => {document.getElementById("nutrients"). innerHTML = 'An error occured during calculations'});
} 

function ClearForm()
{
  const children = document.getElementById('formContainer').getElementsByClassName('clearable');
  for (let i = 0; i < 7; i++)
    children[i].value= '';

  combo.value = '';
  combo2.value = '';
  combo3.value = '';
  combo4.value = '';
  combo5.value = '';
}

const saveMeal = document.getElementById('saveMeal');
saveMeal.addEventListener('click', SaveMeal);

const addButton = document.getElementById("addButton");
addButton.addEventListener('click', ClearForm);

//#endregion
