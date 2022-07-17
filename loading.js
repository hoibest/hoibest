function loadData(arr){
    for (let i = 0; i < arr.length; i++){
        const sel = document.getElementById(arr[i]);
        sel.value = getSavedDate(arr[i]);
    }
}





function keepData(el){
    let id = el.id;
    let val = document.getElementById(id).value;
    sessionStorage.setItem(id,val);
    console.log(sessionStorage);
}

function getSavedDate(v){
    if(!sessionStorage.getItem(v)){
        return "";
    }
    return sessionStorage.getItem(v)
}

