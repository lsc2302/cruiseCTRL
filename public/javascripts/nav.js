function clickNav(index){
    switch(index){
        case 0:
            window.location.href = '/';
            break;
        case 1:
            window.location.href = '/question';
            break;
        case 2:
            window.location.href = '/nearby';
            break;
        case 3:
            window.location.href = '/article';
            break;
        default:
            window.location.href = '/';
            break;
    }
}



