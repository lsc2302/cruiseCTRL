$(document).ready(function(){
    if($('#answer a').hasClass('active')){
        $.ajax({
            url: '/getUser',
            type: 'POST',
            success: function (response) {
                if(response.status===0){
                    sessionStorage.setItem('username',response.data.username);
                    sessionStorage.setItem('userAvatar',response.data.userAvatar);
                    sessionStorage.setItem('userExperience',response.data.userExperience);
                    sessionStorage.setItem('userSkills',response.data.userSkills);
                    sessionStorage.setItem('carCountry',response.data.carCountry);
                    sessionStorage.setItem('carBrand',response.data.carBrand);
                    sessionStorage.setItem('carModel',response.data.carModel);
                    let userAvatar = sessionStorage.getItem('userAvatar');
                    let avatarContent = `<img src="user-data/`+userAvatar+`" id="avatar" onclick="clickMenu()" alt="Avatar">`;
                    $('.top').html(avatarContent);
                    let socket = io('ws://localhost:3000');
                    socket.emit('login',{username:sessionStorage.getItem('username'),password:sessionStorage.getItem('password')});
                    if (!sessionStorage.getItem('notifications')||sessionStorage.getItem('notifications')==='NaN'){
                        sessionStorage.setItem('notifications',"0");
                    }
                    socket.on('receiveNotifications',function(data){
                        storeNotifications(data)
                    });

                    socket.on('receiveMessage',function(data){
                        $('.chatroom .chatroom-body').append(
                            `
                           <div class="oppo-msg">${data}</div>
                       `
                        )
                    });

                    let notifications = parseInt(sessionStorage.getItem('notifications'));
                    let html='';
                    for(let i=0;i<notifications;i++){
                        // let username = sessionStorage.getItem('notif'+(i+1).toString()+'username');
                        // let password = sessionStorage.getItem('notif'+(i+1).toString()+'password');
                        html=html+
                            `
                        <div class="card" onclick=clickCard(${i})>
                            <div class="card-header">
                            <div class="questioner-avatar">
                            <img src="user-data/${sessionStorage.getItem('notif'+(i+1).toString()+'userAvatar')}" class="questioner-avatar" alt="questioner-avatar-avatar">
                            </div>
                            <div class="questioner-name">
                            ${sessionStorage.getItem('notif'+(i+1).toString()+'username')}
                        </div>
                        </div>
                        <div class="card-body"> ${sessionStorage.getItem('notif'+(i+1).toString()+'question')}</div>
                        <div class="card-footer"><img src="images/tag-active.png" class="questioner-part" alt="questioner-part">
                        Tyre
                        </div>
                        </div>
                         `;
                    }
                    $('.notifs').html(html);

                }
                else{
                    window.location.href='/login';
                }

            }
        })
    }
});

function clickCard(i){
    let username = sessionStorage.getItem('notif'+(i+1).toString()+'username');
    let data = {questionerName:username};
    let socket = io('ws://localhost:3000');
    socket.emit('login',{username:sessionStorage.getItem('username'),password:sessionStorage.getItem('password')});    if (!sessionStorage.getItem('notifications')){
        sessionStorage.setItem('notifications',"0");
    }
    socket.on('receiveNotifications',function(data){
        storeNotifications(data)
    });
    socket.emit('sendChatRequest',data);
    $('.chatroom').css('display','flex');
    $('.index').css('display','none');
    socket.on('receiveMessage',function(data){
        $('.chatroom .chatroom-body').append(
            `
                    <div class="msg-wrapper">
                           <div class="oppo-msg">${data}</div>
                   </div>
                       `
        )
    });
    $('.chatroom #chatroom-send').click(function(){
            let message = $('.chatroom-bottom input').val();
            let data = {
                targetName: username,
                msg:message,
            };
            $('.chatroom-bottom input').val('');
            $('.chatroom .chatroom-body').append(
                `<div class="msg-wrapper">
                                   <div class="self-msg">${message}</div>
                </div>
                               `
            );
            socket.emit('sendMessage',data);
        }
    );
}

