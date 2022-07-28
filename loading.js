function loadData(arr){
    for (let i = 0; i < arr.length; i++){
        const sel = document.getElementById(arr[i]);
        sel.value = getSavedDate(arr[i]);
    }
}

function keepData(el){
    console.log('hi')
    let id = el.id;
    let val = document.getElementById(id).value;
    sessionStorage.setItem(id,val);
    if(val!=''){
        //console.log(val)
        document.getElementById(id).style.background= '#E2E2E2';
    }
}

function getSavedDate(v){
    if(!sessionStorage.getItem(v)){
        return "";
    }
    return sessionStorage.getItem(v)
}

function check(li,page){
    let canGo = true;
    for(let i=0; i< li.length;i++){
        if(document.getElementById(li[i]).value==""){
            document.getElementById(li[i]).style.background = 'pink';
            canGo = false;
        }
    }
    if(canGo==true){
        document.getElementById('next').href=page;
    }
}

function design(num){
    const pages = ['history-el','antSeg-el','cornea-el','postSeg-el',
    'exOcularPath-el','spots-el','imaging-el','labs-el','results-el'];
    for(let i = 0; i < num; i++){
        document.getElementById(pages[i]).style.borderLeftColor = '#59A77D';
    }
    document.getElementById(pages[num-1]).style.fontWeight = 600;
    document.getElementById('green-bar').style.width = num*10 + "%"; 
}




