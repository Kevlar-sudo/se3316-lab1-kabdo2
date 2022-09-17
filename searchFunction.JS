//getting all the html elements that will be used in the JS code
const searchBar = document.getElementById("searchBar");
const searchBarNum = document.getElementById("searchBarNumber");
const searchButtonLetters = document.getElementById("searchButtonLetters");
const searchButtonNumbers = document.getElementById("searchButtonNumbers");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("closeBtn");

//array with descriptions of pokemon (placeholder for now)
const descriptions = [["Grass/Poison","Grass/Poison","Grass/Poison","Fire","Fire","Fire/Flying","Water","Water","Water","Bug","Bug","Bug/Flying","Bug/Poison","Bug/Poison","Bug/Poison","Normal/Flying","Normal/Flying","Normal/Flying","Normal","Normal"],
["118","151","198","116","158","223","94","126","171","55","45","167","63","46","169","85","117","166","103","161"],
["118","151","198","96","129","176","122","155","210","62","94","151","55","86","150","76","108","157","70","144"]];




//for the error window
const errorMsg = document.getElementById("errorMsg");
const closeError = document.getElementById("closeError");

//copying the list of pokemon shown on main page to the list that will show on the popup search
const list = document.getElementById("list");
const searchResults = document.getElementById("searchResults");

//copying the results from the original list to the list that will show with the popup window
searchResults.innerHTML = list.innerHTML;

//adding an event listener to the search pokedex button

    
    searchButtonLetters.addEventListener('click',letterSearch)
    
    function letterSearch(){
    //getting the inputted text in the text field next to the search button
    let input = searchBar.value;

    //making sure the input is lowercase
    input=input.toLowerCase();

    ////testing to see that the input contains only letters a-z both capital or lowercase
    if(/^[a-zA-Z]+$/.test(input)){

    //if true proceed
    console.log(true);

    //getting all the pokemon in the search results list
    let x = searchResults.getElementsByClassName('pokemon');

    //initially opening the popup when a search is conducted
    popup.classList.add("open-popup");

    //if the popup has been previously closed and a new search is conducted we open the popup
    if(popup.classList.contains("close-popup")){
    popup.classList.replace("close-popup","open-popup");}
      
    var searches = 0;

    //looping through every letter of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        
        //if the pokemon DOES have the input text in its name
        if ( x[i].innerText.toLowerCase().search(input)>-1 && searches<5) {
            
            //do show the pokemon
            x[i].style.display="list-item"
            //Show the pokemon descriptions 
            //x[i].classList.add("addInfo");
            searchResults.getElementsByClassName("myclass")[i].textContent = "Type: "+ descriptions[0][i];
            searchResults.getElementsByClassName("myNum")[i].textContent = "⚔ Base ATK: "+ descriptions[1][i];
            searchResults.getElementsByClassName("myDef")[i].textContent = "⛊ Base DEF: "+ descriptions[2][i];
            searches++;
            
        }
        //(if the input letter is NOT contained in the pokemon's name)
        else {
            //don't show the pokemon
            x[i].style.display="none";
                           
        }
    }
    }
    //wrong input detected
    else{
        console.log(false);
        errorMsg.classList.add("open-popup");
        if(errorMsg.classList.contains("close-popup")){
            errorMsg.classList.replace("close-popup","open-popup");}
        
    }


}    

//searching by numbers
//adding an event listener to the search pokedex button
searchButtonNumbers.addEventListener('click',numberSearch)

function numberSearch(){
    //getting the inputted text in the text field next to the search button
    let input = searchBarNum.value;

    //making sure the leading zeros do not interfere with our result
    input= parseInt(input,10);


    //making sure that the entered number is 1-20
    if(input > 0 && input < 21){

    //if true proceed
    console.log(true);

    //getting all the pokemon in the search results list
    let x = searchResults.getElementsByClassName('pokemon');

    //initially opening the popup when a search is conducted
    popup.classList.add("open-popup");

    //if the popup has been previously closed and a new search is conducted we open the popup
    if(popup.classList.contains("close-popup")){
    popup.classList.replace("close-popup","open-popup");}

    var searches = 0;
      
    //looping through every number of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        //if the pokemon doesn't have the input text in its name
        if ( x[i].innerText.toLowerCase().search(input)>-1 && searches<5) {
            
            //do show the pokemon
            x[i].style.display="list-item";

            //adding descriptions
            searchResults.getElementsByClassName("myclass")[i].textContent = "Type: "+ descriptions[0][i];
            searchResults.getElementsByClassName("myNum")[i].textContent = "⚔ Base ATK: "+ descriptions[1][i];
            searchResults.getElementsByClassName("myDef")[i].textContent = "⛊ Base DEF: "+ descriptions[2][i];

            searches++;
            
            
        }
        //(if the input letter is contained in the pokemon's name)
        else {
            //don't show the pokemon
            x[i].style.display="none";
                           
        }
    }
    }
    //wrong input detected
    else{
        console.log(false);
        errorMsg.classList.add("open-popup");
        if(errorMsg.classList.contains("close-popup")){
            errorMsg.classList.replace("close-popup","open-popup");}
        
    }


}    


popupClose.addEventListener('click',(e)=>{
    //we close the popup when the okay button is clicked
    popup.classList.replace("open-popup","close-popup");
    //clearing all the descriptions so that they don't interfere in the next search (pokemon won't show up in a search if it's description contains a search key)
    for(y = 0; y<20; y++) {
    searchResults.getElementsByClassName("myclass")[y].textContent = "";
    searchResults.getElementsByClassName("myNum")[y].textContent = "";
    searchResults.getElementsByClassName("myDef")[y].textContent = "";
    }
});

closeError.addEventListener('click',(e)=>{
    //we close the popup when the okay button is clicked
    
    errorMsg.classList.replace("open-popup","close-popup");
});

//adding searching by enter key for the letter search bar
searchBar.addEventListener("keydown", (e)=> {
    if (e.code === "Enter" && searchBar.value.length != 0) {  //checks whether the pressed key is "Enter"
        letterSearch();
        console.log(searchBar.value);
    }
});
//adding searching by enter key for the number search bar
searchBarNum.addEventListener("keydown", (e)=> {
    if (e.code === "Enter" && searchBarNum.value.length != 0) {  //checks whether the pressed key is "Enter"
        numberSearch();
        
    }
});

