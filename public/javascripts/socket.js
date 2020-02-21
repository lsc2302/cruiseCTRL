$(function(){
    let userAvatar = sessionStorage.getItem('userAvatar');
    let avatarContent = `<img src="user-data/`+userAvatar+`" id="avatar" onclick="clickMenu()" alt="Avatar">`;
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
});
