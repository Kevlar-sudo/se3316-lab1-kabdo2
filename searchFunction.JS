const searchBar = document.getElementById("searchBar");
let pokemon = new Array(20);

//for debugging
console.log(searchBar);

searchBar.addEventListener('keyup',(e) =>{
    let input = document.getElementById('searchBar').value
    //making sure the input is lowercase
    input=input.toLowerCase();
    let x = document.getElementsByClassName('pokemon');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            //won't show if doesn't contain letter
            x[i].style.display="none";
        }
        else {
            //item will show if contains letter
            x[i].style.display="list-item";                 
        }
    }
}
    

    
);