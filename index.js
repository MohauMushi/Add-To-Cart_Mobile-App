import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ad18d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// javascript

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButton.addEventListener("click", function(){
    let inputValue = inputField.value
    
    //  Using the Firebase function 'push' to push inputValue to the database
    push(shoppingListInDB, inputValue)
    
    console.log(inputValue)
    
    clearInputField()
       
})
// Call the onValue function with shoppingListInDB as the first argument and function(snapshot) {} as the second argument
onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.entries(snapshot.val())
    
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()
        // A for loop to iterate on itemsArray and console log each item
    for( let i = 0; i < itemsArray.length; i++){
        
        
         
        let currentItem = itemsArray[i]
        
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        // Using the appendItemToShoppingListEl(currentItem) function inside of the for loop to append item to the shopping list element for each iteration.  
        appendItemToShoppingListEl(currentItem)
    }
            
        } else {
            shoppingListEl.innerHTML = "No items here... yet"
        }
    
} )

function clearShoppingListEl()
{
    shoppingListEl.innerHTML = ""    
}

//Function for Clearing the input field when button is pressed
function clearInputField(){
    inputField.value = ""
}
//  Append a new <li> with text content inputValue to the 'shopping-list' <ul>
function appendItemToShoppingListEl(item){
    
    let itemID = item[0]
    let itemValue = item[1]
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let newEl = document.createElement("li")
    
    newEl.classList.add("item")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfShoppintListInDB = ref(database, `shoppingList/${itemID}`)
        // Remove function to remove the item from the database
        remove(exactLocationOfShoppintListInDB)
    })
    
    shoppingListEl.append(newEl)
}
