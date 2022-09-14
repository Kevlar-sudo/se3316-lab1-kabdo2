//getting all the html elements that will be used in the JS code
const searchBar = document.getElementById("searchBar");
const searchBarNum = document.getElementById("searchBarNumber");
const searchButtonLetters = document.getElementById("searchButtonLetters");
const searchButtonNumbers = document.getElementById("searchButtonNumbers");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("closeBtn");

//for the error window
const errorMsg = document.getElementById("errorMsg");
const closeError = document.getElementById("closeError");

//copying the list of pokemon shown on main page to the list that will show on the popup search
const list = document.getElementById("list");
const searchResults = document.getElementById("searchResults");
searchResults.innerHTML = list.innerHTML;

//adding an event listener to the search pokedex button
searchButtonLetters.addEventListener('click',(e) =>{
    //getting the inputted text in the text field next to the search button
    let input = document.getElementById('searchBar').value

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
      
    //looping through every letter of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        //if the pokemon doesn't have the input text in its name
        if ( x[i].innerText.toLowerCase().search(input)>-1) {
            
            //do show the pokemon
            x[i].style.display="list-item";
            
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
);

//searching by numbers
//adding an event listener to the search pokedex button
searchButtonNumbers.addEventListener('click',(e) =>{
    //getting the inputted text in the text field next to the search button
    let input = document.getElementById('searchBarNumber').value

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
      
    //looping through every number of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        //if the pokemon doesn't have the input text in its name
        if ( x[i].innerText.toLowerCase().search(input)>-1) {
            
            //do show the pokemon
            x[i].style.display="list-item";
            
            
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
);

popupClose.addEventListener('click',(e)=>{
    //we close the popup when the okay button is clicked
    popup.classList.replace("open-popup","close-popup");
    
});

closeError.addEventListener('click',(e)=>{
    //we close the popup when the okay button is clicked
    
    errorMsg.classList.replace("open-popup","close-popup");
});

