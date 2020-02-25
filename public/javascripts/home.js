function clickHome(path){
    if(path==='')return;
    window.location.href = '/'+path;
}
function clickHomeBack2(){
    let i=-1;
    while(document.referrer=== window.location.host){
        i-=1;
    }
    window.history.go(i);
}
function clickHomeBack1(){
    window.location.href = '/';
}

function searchIntro(e){
    if(e.which===13) {
        window.location.href = '/' + e.target.value;
    }
}

