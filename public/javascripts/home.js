function clickHome(path){
    if(path==='')return;
    window.location.href = '/'+path;
}
function clickHomeBack2(){
    window.location.href = document.referrer;
}
function clickHomeBack1(){
    window.location.href = '/';
}

$(document).ready(function(){
    $.ajax({
        url: '/getUser',
        type: 'POST',
        success: function (response) {
            if (response.status === 0) {
                sessionStorage.setItem('username', response.data.username);
                sessionStorage.setItem('userAvatar', response.data.userAvatar);
                sessionStorage.setItem('userExperience', response.data.userExperience);
                sessionStorage.setItem('userSkills', response.data.userSkills);
                sessionStorage.setItem('carCountry', response.data.carCountry);
                sessionStorage.setItem('carBrand', response.data.carBrand);
                sessionStorage.setItem('carModel', response.data.carModel);
                let userAvatar = sessionStorage.getItem('userAvatar');
                let avatarContent = `<img src="user-data/` + userAvatar + `" id="avatar" onclick="clickMenu()" alt="Avatar">`;
                $('.top').html(avatarContent);
                let socket = io(location.origin.replace(/^http/, 'ws'));
                socket.emit('login',{username:sessionStorage.getItem('username'),password:sessionStorage.getItem('password')});
                if (!sessionStorage.getItem('notifications')){
                    sessionStorage.setItem('notifications',"0");
                }
                socket.on('receiveNotifications',function(data){
                    storeNotifications(data)
                });
            }else{
                alert('user not exist');
            }
        }
        })
});

