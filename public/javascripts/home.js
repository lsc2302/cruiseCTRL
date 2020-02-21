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
    // window.location.href = document.referrer;
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
                socket.on('receiveChatRequest', function (data) {
                    $('.chatroom').css('display', 'flex');
                    $('.index').css('display', 'none');
                    $('.chatroom .chatroom-body').append(
                        `
                            <div class="system-msg">${data.expertName} will answer your question</div>
                        `
                    );
                });
                socket.on('receiveMessage', function (data) {
                    $('.chatroom .chatroom-body').append(
                        `
                            <div class="msg-wrapper">
                            <span class="badge badge-success oppo-msg">${data}</span>
                           </div>
                       `
                    )
                });
                $('.chatroom #chatroom-send').click(function () {
                        let message = $('.chatroom-bottom input').val();
                        let data = {
                            targetName: sessionStorage.getItem('targetName'),
                            msg: message,
                        };
                        $('.chatroom .chatroom-body').append(
                            `
                               <div class="msg-wrapper">
                            <span class="badge badge-success self-msg">${message}</span>
                               </div>
                           `
                        );
                        socket.emit('sendMessage', data);
                        $('.chatroom-bottom input').val('');
                    }
                );
                $('#chatroom-leave').click(function(){
                    let leaveNotif = {leaveSide:sessionStorage.getItem('username'),targetSide:sessionStorage.getItem('targetName')
                    };
                    socket.emit('sendLeaveNotif',leaveNotif);
                    setTimeout(function(){
                        $('.chatroom').css('display','none');
                        $('.index').css('display','flex');
                        $('.chatroom .chatroom-body').html('');
                    },1000);
                });
                socket.on('receiveLeaveNotif',function(data){
                    $('.chatroom .chatroom-body').append(
                        `
                    <div class="msg-wrapper">
                            <div class="system-msg">${data} Leaved!</div>
                   </div>
                       `
                    );
                });

            }else{
                alert('user not exist');
            }
        }
        })
});

function searchIntro(e){
    if(e.which===13) {
        window.location.href = '/' + e.target.value;
    }
}

