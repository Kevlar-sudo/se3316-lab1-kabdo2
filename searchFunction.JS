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

//Inititally having the dynamic search box as closed
dynamicResults.classList.add("close-search");



//adding an event listener to the search pokedex button

    searchButtonLetters.addEventListener('click',letterSearch)
    
    function letterSearch(){
    //getting the inputted text in the text field next to the search button
    let input = searchBar.value;

    //making sure the input is lowercase
    input=input.toLowerCase();

    ////testing to see that the input contains only letters a-z both capital or lowercase and making sure the input is 20 in size
    if(/^[a-zA-Z]+$/.test(input) && input.length<21){

    //getting all the pokemon in the search results list
    let x = list.getElementsByClassName('pokemon');

    //to track the number of search results that have been shown
    var searches = 0;
    var alertContent = "";

    //looping through every letter of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        
        //if the pokemon DOES have the input text in its name and there has been less than 5 search results shown
        if ( x[i].innerText.toLowerCase().search(input)>-1 && searches<5) {


            //this variable will store the info that will show up in the alert box
            var alertContent = alertContent+x[i].innerText.replace(/(\r\n|\n|\r)/gm, "")+" \nType: "+ descriptions[0][i]+"\n⚔ Base ATK: "+ descriptions[1][i]+"\n⛊ Base DEF: "+ descriptions[2][i]+"\n\n";
            searches++;
        }
    }
    //trim the alert box text to removing trailing whitespaces
    alertContent = alertContent.trim();
    alert(alertContent); //show the alert with pokemon info!
    }
    //wrong input detected
    else{
        showError();//display an error
        
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

    //getting all the pokemon in the search results list
    let x = list.getElementsByClassName('pokemon');

    //to track number of search results
    var searches = 0;
    var alertContent = "";
      
    //looping through every number of every pokemon in the search popup
    for (i = 0; i < x.length; i++ ) { 
        //if the pokemon DOES have the input text in its name and less than 5 search results so far
        if ( x[i].innerText.toLowerCase().search(input)>-1 && searches<5) {
            
            //this variable will store the info that will show up in the alert box
            var alertContent = alertContent+x[i].innerText.replace(/(\r\n|\n|\r)/gm, "")+" \nType: "+ descriptions[0][i]+"\n⚔ Base ATK: "+ descriptions[1][i]+"\n⛊ Base DEF: "+ descriptions[2][i]+"\n\n";
            searches++;
            
            
        }
    }
    //trim the alert box text to removing trailing whitespaces
    alertContent = alertContent.trim();
    alert(alertContent); //show the alert with pokemon info!
    }
    //wrong input detected => show the error popup
    else{
        showError();
        
    }
}    

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

//The function for dynamic typing in the letter field
searchBar.addEventListener('keyup', (e) => {
    //clearing the content of the number field when typing in letter field
    searchBarNum.value = "";
        
        //checking to see if the input adheres to only letters (letters a to z) and is max 20 letters in length
        if((/^[a-zA-Z]+$/.test(searchBar.value) && searchBar.value.length<21)||(searchBar.value.length ==0) )
        {
            dynamicSearcher();//call the dynamic searcher method
        }
        //if input doesnt adhere to input criteria 
        if(!(/^[a-zA-Z]+$/.test(searchBar.value)||searchBar.value.length ==0) ||searchBar.value.length>20){
            showError(); // show an error message

        }

        }           
);

//the function for dynamic typing in the number field
searchBarNum.addEventListener('keyup', (e) => {
    //clearing the content of the letter field when typing in the number field
    searchBar.value = "";
      
    //checking that input is a number between 1 and 20
    if((searchBarNum.value > 0 && searchBarNum.value < 21 ) || (searchBarNum.value.length ==0))
    {
        
        dynamicSearcher();//call the dynamic searcher method
    }
    //if not between input criteria
    if(!(searchBarNum.value > -1 && searchBarNum.value < 21 )){
        showError(); // display and error

    }

    }           
);
//the function that will delete all pokemon in the dynamic results
function deleterFunction(){
    //get all the pokemon
    let x = list.getElementsByClassName('pokemon');
    //loop through them all
    for (i = 0; i < x.length; i++ ) { 
        //if that pokemon exists
            if(document.getElementById(i+'pokeDiv')!=null){
                //delete it
                 document.getElementById(i+'pokeDiv').remove();
                }
            }

}

//This is the function that creates and deletes all the various pokemon results dynamically
function dynamicSearcher(){
    //works for letters or numbers depending where user is typing
    let currentInput = searchBar.value || searchBarNum.value;
    
    //get all pokemon
    let x = list.getElementsByClassName('pokemon');
    

        //loop through them all
        for (i = 0; i < x.length; i++ ) {  
            //if match is found
        if ( x[i].innerText.toLowerCase().search(currentInput)>-1) {
            //if that pokemon doesn't already exist
            if(document.getElementById(i+'pokeDiv')==null){
                //we create it in the DOM
            newPokResult = document.createElement("div");
            newPokResult.setAttribute('id',i+'pokeDiv');
            
            //adding some styling
            newPokResult.classList.add("pokeStyle");
            //document.body.insertBefore(newPokResult,list);
            dynamicResults.appendChild(newPokResult);
            
            
            //the block that houses dynamic results is opened
            if(dynamicResults.classList.contains("close-search")){
                dynamicResults.classList.replace("close-search","open-search");}
            
            //creating the pokemon image
            var elem = document.createElement("img");
            //setting image size
            elem.style.width = '150px';
            elem.style.height = '150px';
            var images = list.getElementsByTagName("img");
            //getting the images from the full list
            elem.src = images[i].src;
            //adding them to dynamic elements
            newPokResult.appendChild(elem);


            //for the type text
            var br = document.createElement("br");
            newPokResult.appendChild(br);
            //some styling for the rainbow effect
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
        //if the pokemon in dynamic results no longer match with the input
         else if(x[i].innerText.toLowerCase().search(currentInput)==-1 ){
            //we dynamically delete said pokemon!
            {if(document.getElementById(i+'pokeDiv')!=null){
                
                document.getElementById(i+'pokeDiv').remove();
                }}
        }
            
        }
        //when search empty we delete!!
        if(currentInput.length == 0){
            deleterFunction();
            //closing the dynamic block
            if(dynamicResults.classList.contains("open-search")){
                dynamicResults.classList.replace("open-search","close-search");}
        }
        
    
}
//used to show the error popup
function showError(){
    //we open the error message popup
    errorMsg.classList.add("open-popup");
    //if it has been previously openened and close we use this if statement to change its close class to an open class (thus opening it)
    if(errorMsg.classList.contains("close-popup")){
        errorMsg.classList.replace("close-popup","open-popup");}
}



