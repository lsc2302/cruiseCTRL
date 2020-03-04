function expandSecond(item){
    ga("send", "event", 'buttonClick','click');
    if ($(item).attr('src')==='../../images/right.png'){
        $(item).attr('src','../../images/down.png')
    }else{
        $(item).attr('src','../../images/right.png')
    }
    $(item).parent().siblings().toggle();
}

function expandThird(item){
    ga("send", "event", 'buttonClick','click');
    if ($(item).attr('src')==='../../images/right.png'){
        $(item).attr('src','../../images/down.png')
    }else{
        $(item).attr('src','../../images/right.png')
    }
    $(item).parent().siblings().toggle();
}
