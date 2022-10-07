//getting all the html elements that will be used in the JS code
const searchBar = document.getElementById("searchBar");
const searchBarNum = document.getElementById("searchBarNumber");
const searchButtonLetters = document.getElementById("searchButtonLetters");
const searchButtonNumbers = document.getElementById("searchButtonNumbers");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("closeBtn");
const dynamicResults = document.getElementById("dynamicResults");

//array with descriptions of pokemon, the first array has the types, second has the attack points and third has defense points
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


//TESTING 
dynamicResults.classList.add("close-popup");



//adding an event listener to the search pokedex button

    searchButtonLetters.addEventListener('click',letterSearch)
    
    function letterSearch(){
    //getting the inputted text in the text field next to the search button
    let input = searchBar.value;

    //making sure the input is lowercase
    input=input.toLowerCase();

    ////testing to see that the input contains only letters a-z both capital or lowercase and making sure the input is 20 in size
    if(/^[a-zA-Z]+$/.test(input) && input.length<21){

    //used for debugging
    console.log(true);

    //getting all the pokemon in the search results list
    let x = searchResults.getElementsByClassName('pokemon');

    //initially opening the popup when a search is conducted
    popup.classList.add("open-popup");

    //if the popup has been previously closed and a new search is conducted we open the popup
    if(popup.classList.contains("close-popup")){
    popup.classList.replace("close-popup","open-popup");}
      
    //to track the number of search results that have been shown
    var searches = 0;

    //looping through every letter of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        
        //if the pokemon DOES have the input text in its name and there has been less than 5 search results shown
        if ( x[i].innerText.toLowerCase().search(input)>-1 && searches<5) {
            
            //do show the pokemon
            x[i].style.display="list-item"

            //Show the pokemon descriptions by fetching the data from the array we populated earlier
            searchResults.getElementsByClassName("myclass")[i].textContent = "Type: "+ descriptions[0][i];
            searchResults.getElementsByClassName("myNum")[i].textContent = "⚔ Base ATK: "+ descriptions[1][i];
            searchResults.getElementsByClassName("myDef")[i].textContent = "⛊ Base DEF: "+ descriptions[2][i];
            //increase the number of search results found by 1
            searches++;
            
        }
        //(if the input letter is NOT contained in the pokemon's name) or if there has been 5 search results shown (maximum)
        else {
            //don't show the pokemon
            x[i].style.display="none";
                           
        }
    }
    }
    //wrong input detected
    else{
        showError();
        
    }


}    

//searching by numbers
//adding an event listener to the search pokedex button
searchButtonNumbers.addEventListener('click',numberSearch)

function numberSearch(){
    //getting the inputted text in the text field next to the search button
    let input = searchBarNum.value;

    //making sure that the entered number is 1-20
    if(input > 0 && input < 21){

    //for debugging
    console.log(true);

    //getting all the pokemon in the search results list
    let x = searchResults.getElementsByClassName('pokemon');

    //initially opening the popup when a search is conducted
    popup.classList.add("open-popup");

    //if the popup has been previously closed and a new search is conducted we open the popup
    if(popup.classList.contains("close-popup")){
    popup.classList.replace("close-popup","open-popup");}

    //to track number of search results
    var searches = 0;
      
    //looping through every number of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        //if the pokemon DOES have the input text in its name and less than 5 search results so far
        if ( x[i].innerText.toLowerCase().search(input)>-1 && searches<5) {
            
            //do show the pokemon
            x[i].style.display="list-item";

            //adding descriptions
            searchResults.getElementsByClassName("myclass")[i].textContent = "Type: "+ descriptions[0][i];
            searchResults.getElementsByClassName("myNum")[i].textContent = "⚔ Base ATK: "+ descriptions[1][i];
            searchResults.getElementsByClassName("myDef")[i].textContent = "⛊ Base DEF: "+ descriptions[2][i];

            //increase search number
            searches++;
            
            
        }
        //if the input letter is NOT contained in the pokemon's name or if 5 search results have been already shown
        else {
            //don't show the pokemon
            x[i].style.display="none";
                           
        }
    }
    }
    //wrong input detected => show the error popup
    else{
        showError();
        
    }


}    

//adding an event to the close button of the popup
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
//close button function
closeError.addEventListener('click',(e)=>{
    //we close the popup when the okay button is clicked
    
    errorMsg.classList.replace("open-popup","close-popup");
});

//adding searching by enter key for the letter search bar
searchBar.addEventListener("keydown", (e)=> {
    if (e.code === "Enter" && searchBar.value.length != 0) {  //checks whether the pressed key is "Enter"
        letterSearch();
        
    }
});
//adding searching by enter key for the number search bar
searchBarNum.addEventListener("keydown", (e)=> {
    if (e.code === "Enter" && searchBarNum.value.length != 0) {  //checks whether the pressed key is "Enter"
        numberSearch();
        
    }
});


//let tracker = 0;
let searches = 0;
//The function that will be used to create a dynamic div
searchBar.addEventListener('keyup', (e) => {
        
        if((/^[a-zA-Z]+$/.test(searchBar.value) && searchBar.value.length<21)||(searchBar.value.length ==0) )
        {
            dynamicSearcher();//call the dynamic searcher method
        }
        if(!(/^[a-zA-Z]+$/.test(searchBar.value)||searchBar.value.length ==0) ||searchBar.value.length>20){
            showError();

        }

        }           
);
searchBarNum.addEventListener('keyup', (e) => {
        
    if((searchBarNum.value > 0 && searchBarNum.value < 21 ) || (searchBarNum.value.length ==0))
    {
        
        dynamicSearcher();//call the dynamic searcher method
    }
    if(!(searchBarNum.value > -1 && searchBarNum.value < 21 )){
        showError();

    }

    }           
);

function deleterFunction(){
    let x = list.getElementsByClassName('pokemon');
    for (i = 0; i < x.length; i++ ) { 
            if(document.getElementById(i+'pokeDiv')!=null){
                 document.getElementById(i+'pokeDiv').remove();
                }
            }

}

//This is the function that creates and deletes all the various pokemon results dynamically
function dynamicSearcher(){
    let currentInput = searchBar.value || searchBarNum.value;
    
    let x = list.getElementsByClassName('pokemon');
    
        
         //const newDiv = document.createElement("div");
        // const newContent = document.createTextNode("Testing");
        // newDiv.appendChild(newContent);
        // newDiv.setAttribute('id','createdDiv');
        // newDiv.classList.add("dynamicResults");
        //document.body.insertBefore(newDiv, list);
        
        
        //loop through
        
        for (i = 0; i < x.length; i++ ) { 


           
        if ( x[i].innerText.toLowerCase().search(currentInput)>-1) {
            if(document.getElementById(i+'pokeDiv')==null){
            newPokResult = document.createElement("div");
            newPokResult.setAttribute('id',i+'pokeDiv');
            newPokResult.setAttribute('class','classPoke');
            
            newPokResult.classList.add("pokeStyle");
            document.body.insertBefore(newPokResult,list);
            

            
            
            //creating the pokemon image
            var elem = document.createElement("img");
            elem.style.width = '150px';
            elem.style.height = '150px';

            var images = list.getElementsByTagName("img");

            
            elem.src = images[i].src;

            
            newPokResult.appendChild(elem);


            
            //for the type text
            var br = document.createElement("br");
            newPokResult.appendChild(br);

            var span = document.createElement('span');
            span.classList.add("myclass");

            newPokText2 = document.createTextNode("Type: "+ descriptions[0][i]);
            span.appendChild(newPokText2);
            newPokResult.appendChild(span);

            //for the name text
            var br = document.createElement("br");
            newPokResult.appendChild(br);

            newPokText = document.createTextNode(x[i].innerText);
            newPokResult.appendChild(newPokText);
            
            //for the attack field text
            var br = document.createElement("br");
            newPokResult.appendChild(br);

            newPokText3 = document.createTextNode("⚔ Base ATK: "+ descriptions[1][i]);
            newPokResult.appendChild(newPokText3);
            
            //for the defense field text
            var br = document.createElement("br");
            newPokResult.appendChild(br);

            newPokText4 = document.createTextNode("⛊ Base DEF: "+ descriptions[2][i]);
            newPokResult.appendChild(newPokText4);
            
            }
        }
         else if(x[i].innerText.toLowerCase().search(currentInput)==-1 ){
            
            {if(document.getElementById(i+'pokeDiv')!=null){
                
                document.getElementById(i+'pokeDiv').remove();
                }}
        }
            
        }
        //when search empty we delete!!
        if(currentInput.length == 0){
            deleterFunction();
        }
    
}

function showError(){
    //we open the error message popup
    errorMsg.classList.add("open-popup");
    //if it has been previously openened and close we use this if statement to change its close class to an open class (thus opening it)
    if(errorMsg.classList.contains("close-popup")){
        errorMsg.classList.replace("close-popup","open-popup");}
}


