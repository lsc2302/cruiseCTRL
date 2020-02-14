$(document).ready(function() {
    // $.ajax({
    //     url: '/getUser',
    //     type: 'POST',
    //     success: function (response) {
    //         if (response.status === 0)
            {
                // sessionStorage.setItem('username', response.data.username);
                // sessionStorage.setItem('userAvatar', response.data.userAvatar);
                // sessionStorage.setItem('userExperience', response.data.userExperience);
                // sessionStorage.setItem('userSkills', response.data.userSkills);
                // sessionStorage.setItem('carCountry', response.data.carCountry);
                // sessionStorage.setItem('carBrand', response.data.carBrand);
                // sessionStorage.setItem('carModel', response.data.carModel);
                let userAvatar = sessionStorage.getItem('userAvatar');
                let avatarContent = `<img src="user-data/` + userAvatar + `" id="avatar" onclick="clickMenu()" alt="Avatar">`;
                $('.top').html(avatarContent);

                let socket = io(location.origin.replace(/^http/, 'ws'));
                socket.emit('login', {
                    username: sessionStorage.getItem('username'),
                    password: sessionStorage.getItem('password')
                });
                if (!sessionStorage.getItem('notifications')) {
                    sessionStorage.setItem('notifications', "0");
                }
                socket.on('receiveNotifications', function (data) {
                    storeNotifications(data)
                });
                socket.on('receiveChatRequest', function (data) {
                    $('.chatroom').css('display', 'flex');
                    $('.index').css('display', 'none');
                    $('.chatroom .chatroom-body').append(
                        `
                            <div class="system-msg">${data}</div>
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
                    // setTimeout(function(){
                    //     $('.chatroom').css('display','none');
                    //     $('.index').css('display','flex');
                    // },2000);
                });

                $('.submit').click(function () {
                    let question = $('#question-text').val();
                    let targetName = $('#question-expert-name').val();
                    let questionTitle = $('.question-title').val();
                    let questionType = $('.parts-input').val();
                    sessionStorage.setItem('question', question);
                    sessionStorage.setItem('targetName', targetName);
                    sendNotifications(question, targetName,questionTitle,questionType);
                    $('#question-text').val('');
                    $('#question-expert-name').val('');
                    $('.question-title').val('');
                    $('.parts-input').val('');
                    $('.expert-list').fadeOut();
                });

                $('#expert-save').click(function(){
                    let targetName = $('#question-expert-name').val();
                    $('.expert-list').fadeIn();
                    $('.expert-list span #expert-name').text(`You choose expert:${targetName}`);
                });

                $('.align-top').click(function(){
                    $('#question-expert-name').val('');
                    $('.expert-list').fadeOut();
                });

                function sendNotifications(question, expertName,questionTitle,questionType) {
                    let questionBody = {
                        username: sessionStorage.getItem('username'),
                        userAvatar: sessionStorage.getItem('userAvatar'),
                        userExperience: sessionStorage.getItem('userExperience'),
                        userSkills: sessionStorage.getItem('userSkills'),
                        carCountry: sessionStorage.getItem('carCountry'),
                        carBrand: sessionStorage.getItem('carBrand'),
                        carModel: sessionStorage.getItem('carModel'),
                        question: question,
                        questionType:questionType,
                        questionTitle:questionTitle,
                        expertName: expertName,
                    };
                    socket.emit('sendNotifications', questionBody);
                }
                let notifications = parseInt(sessionStorage.getItem('notifications'));
                let html='';
                for(let i=notifications-1;i>=0;i--){
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
                            <div class="questioner-title">
                            ${sessionStorage.getItem('notif'+(i+1).toString()+'questionTitle')}
                            </div>
                        </div>
                    <div class="card-body"> ${sessionStorage.getItem('notif'+(i+1).toString()+'question')}</div>
                    <div class="card-footer"><img src="images/tag-active.png" class="questioner-part" alt="questioner-part">
                    ${sessionStorage.getItem('notif'+(i+1).toString()+'questionType')}
                    </div>
                    </div>
                     `;
                }
                $('.notifs').html(html);
            }
            // else {
            //     window.location.href = '/login';
            // }

    //     }
    // })
});

function clickCard(i){
    let username = sessionStorage.getItem('notif'+(i+1).toString()+'username');
    let data = {questionerName:username};
    let socket = io(location.origin.replace(/^http/, 'ws'));
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
                            <span class="badge badge-success oppo-msg">${data}</span>
                   </div>
                       `
        )
    });
    $('.chatroom #chatroom-send').off('click');
    $('.chatroom #chatroom-send').click(function(){
        let message = $('.chatroom-bottom input').val();
        let data = {
                targetName: username,
                msg:message,
            };
            $('.chatroom .chatroom-body').append(
                `<div class="msg-wrapper">
                            <span class="badge badge-success self-msg">${message}</span>
                </div>
                               `
            );
            socket.emit('sendMessage',data);
            $('.chatroom-bottom input').val('');
        }
    );

    $('#chatroom-leave').click(function(){
        let leaveNotif = {leaveSide:sessionStorage.getItem('username'),targetSide:username};
        socket.emit('sendLeaveNotif',leaveNotif);
        setTimeout(function(){
            $('.chatroom').css('display','none');
            $('.index').css('display','flex');
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
        // setTimeout(function(){
        //     $('.chatroom').css('display','none');
        //     $('.index').css('display','flex');
        //     $('.chatroom .chatroom-body').html('');
        // },2000);

    })
}


