import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ad18d-default-rtdb.europe-west1.firebasedatabase.app/"
}
// This code initializes an app, retrieves a database, and sets up references to various elements in the HTML document.
//  It uses custom or library functions like initializeApp, getDatabase, and ref to perform these tasks.
//  Additionally, it uses the built-in getElementById function to retrieve specific HTML elements by their IDs
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// The code attaches a "click" event listener to the addButton element. 
// When the button is clicked, it retrieves the value from the inputField element, and
//  pushes it to the shopping list in the database, logs the value to the console, and clears the input field.
addButton.addEventListener("click", function(){
    let inputValue = inputField.value
    
    push(shoppingListInDB, inputValue)
    
    console.log(inputValue)
    
    clearInputField()
       
})

// The code sets up a listener for changes in the shoppingListInDB reference.
//  When the data changes, it retrieves the data, clears the shopping list element,
//  and appends each item to the shopping list. If there is no data, it displays a message indicating that there are no items yet

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.entries(snapshot.val())
    
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()
        
    for( let i = 0; i < itemsArray.length; i++){
        
        
         
        let currentItem = itemsArray[i]
        
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
         
        appendItemToShoppingListEl(currentItem)
    }
            
        } else {
            shoppingListEl.innerHTML = "No items here... yet"
        }
    
} )

// This function is to clear the contents of the shoppingListEl element, 
// likely to prepare it for displaying a new set of items or to reset the shopping list

function clearShoppingListEl()
{
    shoppingListEl.innerHTML = ""    
}

// This function is to clear the value of the inputField element, likely to reset it or prepare it for receiving new input
function clearInputField(){
    inputField.value = ""
}


//This function is to create a new li element, set its text content to the itemValue, 
// add a double-click event listener to remove the item from the database, and append the element to the shoppingListEl element
function appendItemToShoppingListEl(item){
    
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.classList.add("item")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfShoppintListInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfShoppintListInDB)
    })
    
    shoppingListEl.append(newEl)
}
