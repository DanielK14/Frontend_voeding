// Reads the HTML form, connects to the database and posts the information onto the database.
function CreateClient() {
    
    let usernameInvoer = document.getElementById('username').value;
    let passwordInvoer = document.getElementById('password').value;
    let weightUserInvoer = document.getElementById('weightUser').value;
    let lenghtUserInvoer = document.getElementById('lenghtUser').value;
    let ageUserInvoer = document.getElementById('ageUser').value;
    let agetoJava = new Date(ageUserInvoer).toISOString();
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
    fetch("http://localhost:8082/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPerson)
    })
    .then(response => {
        alert('Je account is opgeslagen');
    })
    .catch(error => {
        alert('Je hebt iets verkeerd ingevuld');
    });
}

// Tries to connect to the database with the clients.
async function FetchClients(){
    
    fetch('http://localhost:8082/klant')
   .then(response => response.json())
   .then(data => show(data))
   .catch(err => {document.getElementById("clientList"). innerHTML = 'The services are currently down please wait a moment or contact our support'});
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

function UpdateClient(){
    let identification = document.getElementById('id').value
    let usernameInvoer = document.getElementById('usernameUpdate').value;
    let passwordInvoer = document.getElementById('passwordUpdate').value;
    let weightUserInvoer = document.getElementById('weightUserUpdate').value;
    let lenghtUserInvoer = document.getElementById('lenghtUserUpdate').value;
    let ageUserInvoer = document.getElementById('ageUserUpdate').value;
    let agetoJava = new Date(ageUserInvoer).toISOString();
    let sexUserInvoer = document.getElementById('sexUserUpdate').value;
    let dietGoalInvoer = document.getElementById('dietGoalUpdate').value;
    let fitnessGoalInvoer = document.getElementById('fitnessGoalUpdate').value;
    
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

    console.log(updatePerson);
    const linkToUpdate = "http://localhost:8082/update/";
    const emptyString = "";
    const fullLink = emptyString.concat(linkToUpdate, identification);
 
    console.log(fullLink);
    fetch(fullLink, {
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

// Add an eventListener to the button to fetch the database and write a new client on it.
const createClient = document.getElementById('createAccount');
createClient.addEventListener('click', CreateClient)

const updateClient = document.getElementById('updateAccount');
updateClient.addEventListener('click', UpdateClient)

