$(function(){
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
                let avatarContent = `
                <img src="images/menu.png" alt="Menu" id="menu" onclick="clickMenu()" />
                <img src="user-data/` + userAvatar + `" id="avatar" alt="Avatar">
                `;
                $('.top').html(avatarContent);
                let socket = io(location.origin.replace(/^http/, 'ws'));
                socket.emit('login',{username:sessionStorage.getItem('username'),password:sessionStorage.getItem('password')});
                if (!sessionStorage.getItem('notifications')){
                    sessionStorage.setItem('notifications',"0");
                }
                socket.on('receiveNotifications',function(data){
                    storeNotifications(data);
                    $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>A new question is waiting for you!</strong>
                            <button type="button" class="btn btn-success" 
                            onclick="javascript:window.location.href='/question'"
                            >Go right now!</button>
                        </div>
                        `);
                });
                socket.on('receiveChatRequest', function (data) {
                    $('.chatroom').css('display', 'flex');
                    $('.index').css('display', 'none');
                    sessionStorage.setItem('targetName', data.expertName);
                    sessionStorage.setItem('targetAvatar', data.expertAvatar);
                    $('.chatroom .chatroom-body').append(
                        `
                        <div class="msg-wrapper-sys">
                            <span class="badge badge-success system-msg">${data.expertName} will answer your question</span>
                        </div>
                        `
                    );
                });
                socket.on('receiveMessage', function (data) {
                    $('.chatroom .chatroom-body').append(
                        `
                            <div class="msg-wrapper-oppo">
                            <img src="user-data/${sessionStorage.getItem('targetAvatar')}" alt="Avatar">
                            <span class="badge badge-success oppo-msg">${data}</span>
                                 <div class="clear"></div>
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
                               <div class="msg-wrapper-self">
                                    <img src="user-data/${userAvatar}" alt="Avatar">
                                    <span class="badge badge-success self-msg">${message}</span>
                                         <div class="clear"></div>
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
                    <div class="msg-wrapper-sys">
                            <span class="badge badge-success system-msg">${data} Leaved!</span>
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
