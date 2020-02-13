$(function(){
    let userAvatar = sessionStorage.getItem('userAvatar');
    let avatarContent = `<img src="user-data/`+userAvatar+`" id="avatar" onclick="clickMenu()" alt="Avatar">`;
    $('.top').html(avatarContent);
    let socket = io('ws://localhost:3000');
    socket.emit('login',{username:sessionStorage.getItem('username'),password:sessionStorage.getItem('password')});
    if (!sessionStorage.getItem('notifications')){
        sessionStorage.setItem('notifications',"0");
    }
    socket.on('receiveNotifications',function(data){
        storeNotifications(data)
    });
});
