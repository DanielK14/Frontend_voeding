// Reads the HTML form, connects to the database and posts the information onto the database.
function CreateClient() {
    
    let usernameInvoer = document.getElementById('username').value;
    let passwordInvoer = document.getElementById('password').value;
    let weightUserInvoer = document.getElementById('weightUser').value;
    let lenghtUserInvoer = document.getElementById('lenghtUser').value;
    let ageUserInvoer = document.getElementById('ageUser').value;
    let agetoJava = new Date(ageUserInvoer).toISOString();  // Puts the date that has been filled in the form into a useable date for Java.
    let sexUserInvoer = document.getElementById('sexUser').value;
    let dietGoalInvoer = document.getElementById('dietGoal').value;
    let fitnessGoalInvoer = document.getElementById('fitnessGoal').value;
    
    // Puts the data that has been filled in into the proper position for the database.
    let newPerson = {
        username: usernameInvoer,
        password: passwordInvoer,
        weightUser: weightUserInvoer,
        lenghtUser: lenghtUserInvoer,
        ageUser: agetoJava,
        sexUser: sexUserInvoer,
        dietGoal: dietGoalInvoer,
        fitnessGoal: fitnessGoalInvoer
    }

    // Connects to the database and posts the newPerson body into the database.
    fetch("http://localhost:8082/create", {     // Connection string with the database.
        method: 'POST',                         // POSTS the new information into the sql database via a JSON body string.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPerson)         // Puts the body newPerson into a JSON body for the SQL database.
    })
    .then(response => {
        alert('Je account is opgeslagen');      // If the account gets saved correcty give the user feedback that it is saved correctly.
    })
    .catch(error => {
        alert('Error, kon de gegevens niet doorgeven naar de server, heb je misschien iets verkeerds ingevuld?'); // If the account didnt save because of a connection failure or by using the wrong variables, give the user feedback that it failed.
    });
}

// Tries to connect to the database with the clients.
function FetchClients(){
    
    fetch('http://localhost:8082/klant')    // Connection string with the database.
   .then(response => response.json())       // Put the data of the database that is being fetched into a body text as JSON.
   .then(data => show(data))                // Sends the data that is going to be used to the show() function in order to show the user the information
   .catch(document.getElementById("clientList"). innerHTML = 'The services are currently down please wait a moment or contact our support'); // If the data could not be fetched give the user an error.
}

async function FetchCLient(number){

    let identification = number;                        // Keyvalue of the user.

    const linkToUpdate = "http://localhost:8082/user/"; // String to find a specific user, it still needs a key value.
    const emptyString = "";                             // Make an empty string so the keyvalue and the link can be concatenated.           
    const fullLink = emptyString.concat(linkToUpdate, identification); // Concatenate the link to the user page together with the keyvalue.


    fetch(fullLink)                     // Connection string with the database.
   .then(response => response.json())   // Put the data of the database that is being fetched into a body text as JSON.
   .then(data => show(data))            // Sends the data that is going to be used to the show() function in order to show the user the information
   .catch(err => {document.getElementById("clientDetails"). innerHTML = 'The services are currently down please wait a moment or contact our support'}); // If the data could not be fetched give the user an error.
}

// Creates a table that shows the data with its values.
function show(data) {
    let personsTableHtml =
        `<tr>
                <th>ID</th>
                <th>Naam</th>
                <th>Wachtwoord</th>
                <th>Gewicht</th>
                <th>Lengte</th>
                <th>Leeftijd</th>
                <th>Geslacht</th>
                <th>Dieët doel</th>
                <th>Fitness doel</th>
             </tr>`;

    
    // Loop to access all rows.
    for (let r of data) {

        // renders Man when its true and vrouw when its false, to show the gender of the person.
        if(r.sexUser == true){
            r.sexUser = "Man";
        }else{
            r.sexUser = "Vrouw"
        }

        // Renders a new table with the information fetched fromt the server.
        personsTableHtml += `<tr> 
                <td>${r.id} </td>
                <td>${r.username}</td>
                <td>${r.password}</td>
                <td>${r.weightUser}</td>
                <td>${r.lenghtUser}</td>
                <td>${r.ageUser}</td>
                <td>${r.sexUser}</td>
                <td>${r.dietGoal}</td>
                <td>${r.fitnessGoal}</td>
            </tr>`;
    }

    // Setting innerHTML as tab variable
    document.getElementById("clientList").innerHTML = personsTableHtml;
}
// Reads the HTML form, connects to the database and posts the information onto the database.
function UpdateClient(){

    let identification = document.getElementById('id').value
    let usernameInvoer = document.getElementById('usernameUpdate').value;
    let passwordInvoer = document.getElementById('passwordUpdate').value;
    let weightUserInvoer = document.getElementById('weightUserUpdate').value;
    let lenghtUserInvoer = document.getElementById('lenghtUserUpdate').value;
    let ageUserInvoer = document.getElementById('ageUserUpdate').value;
    let agetoJava = new Date(ageUserInvoer).toISOString();  // Puts the date that has been filled in the form into a useable date for Java.
    let sexUserInvoer = document.getElementById('sexUserUpdate').value;
    let dietGoalInvoer = document.getElementById('dietGoalUpdate').value;
    let fitnessGoalInvoer = document.getElementById('fitnessGoalUpdate').value;
    
    // Puts the data that has been filled in into the proper position for the database.
    let updatePerson = {
        id: identification,
        username: usernameInvoer,
        password: passwordInvoer,
        weightUser: weightUserInvoer,
        lenghtUser: lenghtUserInvoer,
        ageUser: agetoJava,
        sexUser: sexUserInvoer,
        dietGoal: dietGoalInvoer,
        fitnessGoal: fitnessGoalInvoer
    }

     // Connects to the database and PUTS the newPerson body into an existing body from the database.
    const linkToUpdate = "http://localhost:8082/update/";               // String to find a specific user, it still needs a key value.
    const emptyString = "";                                             // Make an empty string so the keyvalue and the link can be concatenated.
    const fullLink = emptyString.concat(linkToUpdate, identification);  // Concatenate the link to the user page together with the keyvalue.
    
    
 



    fetch(fullLink, {                           // Connection string with the database.
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePerson)
    })
    .then(response => {
        alert('Je account is geupdate');
    })
    .catch(error => {
        alert('Je hebt iets verkeerd ingevuld');
    });


}
// Add an eventListener to the button to fetch and show the clients.
const showClients = document.getElementById('getClients');
showClients.addEventListener('click', FetchClients)

// Add an eventListener to the button to refresh and show the clients.
const refreshClients = document.getElementById('refreshClients');
refreshClients.addEventListener('click', FetchClients)


// Add an eventListener to the button to fetch the database and write a new client on it.
const createClient = document.getElementById('createAccount');
createClient.addEventListener('click', CreateClient)

// Add an eventListener to the button to fetch a specific user from the database update it with the new info.
const updateClient = document.getElementById('updateAccount');
updateClient.addEventListener('click', UpdateClient)

//const searchUser = document.getElementById('searchUser');
//searchUser.addEventListener('click', FetchCLient)


const user1 = document.getElementById('user1');
user1.addEventListener('click', FetchCLient(148))

const user2 = document.getElementById('user2');
user2.addEventListener('click', FetchCLient(149))

const user3 = document.getElementById('user3');
user3.addEventListener('click', FetchCLient(150))

const user4 = document.getElementById('user4');
user4.addEventListener('click', FetchCLient(151))
