searchObjs = document.getElementsByClassName("searchable");

function searchFunction(obj){
    const value = obj.value;

    for(let i = 0; i < searchObjs.length; i++){
        if(searchObjs[i].children[1].innerText.indexOf(value) === -1){
            searchObjs[i].hidden = true;
        }else{
            searchObjs[i].hidden = false;
        }
    }
}