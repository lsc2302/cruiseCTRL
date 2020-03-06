$(document).ready(function() {
    {
        let userAvatar = sessionStorage.getItem('userAvatar');
        let socket = io(location.origin.replace(/^http/, 'ws'));
        socket.emit('login', {
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password')
        });
        if (!sessionStorage.getItem('notifications')) {
            sessionStorage.setItem('notifications', "0");
        }
        socket.on('receiveNotifications', function (data) {
            $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>A new question is waiting for you!</strong>
                            <button type="button" class="btn btn-success" 
                            onclick="javascript:window.location.href='/question'"
                            style="font-size: xx-large"
                            >Go!</button>
                        </div>
                        `);
            storeNotifications(data)
        });
        socket.on('receiveChatRequest', function (data) {
            $('.chatroom').css('display', 'flex');
            $('.index').css('display', 'none');
            sessionStorage.setItem('targetName', data.expertName);
            sessionStorage.setItem('targetAvatar', data.expertAvatar);
            $('.chatroom .chatroom-body').append(
`                    <div class="msg-wrapper-sys">
                    <span class="badge badge-success system-msg">${data.expertName} will answer your question</span>
                    </div>
                `
            );
        });
        socket.on('receiveMessage', function (data) {
            $('.chatroom .chatroom-body').append(
                `
                    <div class="msg-wrapper-oppo">
                    <img src="user-data/${sessionStorage.getItem('targetAvatar')}"  alt="Avatar">
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
            let leaveNotif = {
                leaveSide:sessionStorage.getItem('username'),
                targetSide:sessionStorage.getItem('targetName')
            };
            socket.emit('sendLeaveNotif',leaveNotif);
            setTimeout(function(){
                $('.chatroom').css('display','none');
                $('.index').css('display','flex');
                $('.chatroom .chatroom-body').html('');
            },1000);
            cleanNotification(sessionStorage.getItem('targetNumber'));
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

        $('#question-expert-name').focus(function(){
            $.ajax({
                    url: '/onlineUsers',
                    type: 'POST',
                    success: function (response) {
                        if (response.status === 0){
                            let experts='';
                            for(let i=0;i<response.data.length;i++){
                                if(response.data[i].username!==sessionStorage.getItem('username')){
                                    experts+=`<option>${response.data[i].username}</option>`
                                }
                            }
                            $('#experts-list').html(experts);
                        }
                    }
            });
        }).on('input',function(){
            $('.question-more-info').html(`More Info about ${$('#question-expert-name').val()}`)
        });

        $('.submit').click(function () {
            $.ajax({
                url: '/payMoney',
                type: 'POST',
                cache: false,
                processData:false,
                dataType: 'json',
                success: function (response) {
                    if(response.status===0){
                        let question = $('#question-text').val();
                        let targetName = $('#question-expert-name').val();
                        let questionType = $('.parts-input').val();
                        sessionStorage.setItem('question', question);
                        sendNotifications(question, targetName,questionType);
                        $('#question-text').val('');
                        $('#question-expert-name').val('');
                        $('.parts-input').val('');
                        $('.expert-list').fadeOut();
                    }else if(response.status === 1){
                        $('#alert-placeholder').html(`
                        <div class="alert alert-danger" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Failed for lack of coins!</strong>
                        </div>
                        `)
                    }
                }});

        });

        function sendNotifications(question, expertName,questionType) {
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
                expertName: expertName,
            };
            socket.emit('sendNotifications', questionBody);
        }
        let notifications = parseInt(sessionStorage.getItem('notifications'));
        let html='';
        let posts = 3;
        for(let i=notifications-1;i>=0;i--){
            if(sessionStorage.getItem('notif'+(i+1).toString()+'username')&&posts>=1){
                html=html+
                    `
                    <div class="card" onclick=clickCard(${i})>
                <div class="card-header">
                    <div class="questioner-avatar">
                    <img 
                    src="user-data/${sessionStorage.getItem('notif'+(i+1).toString()+'userAvatar')}" 
                    class="questioner-avatar" alt="questioner-avatar-avatar">
                    </div>
                    <div class="questioner-name">
                    ${sessionStorage.getItem('notif'+(i+1).toString()+'username')}
                    </div>
                </div>
            <div class="card-body">
            ${
                        sessionStorage.getItem('notif'+(i+1).toString()+'question').length>40?
                            sessionStorage.getItem('notif'+(i+1).toString()+'question').substr(0,37)+'...':
                            sessionStorage.getItem('notif'+(i+1).toString()+'question')
                        } 
            </div>
            <div class="card-footer"><img src="images/tag-active.png" class="questioner-part" alt="questioner-part">
            ${sessionStorage.getItem('notif'+(i+1).toString()+'questionType')}
            </div>
            </div>
             `;
               posts--;
            }else{
                break;
            }
        }
        $('.notifs').html(html);
    }
});

function clickCard(i){
    $('.answer-notification-detail').toggle().html(
        `
            <img src="images/back.png" id="answer-back" 
            onclick="
            $('.answer-notification-detail').toggle().html('');
            $('.index').css('display','block').prop('disabled', false);
            "/>
            <div class="card" id="card-detail">
                <div class="card-header" id="card-header-detail">
                    <div class="questioner-avatar" id="questioner-avatar-detail">
                    <img 
                    src="user-data/${sessionStorage.getItem('notif'+(i+1).toString()+'userAvatar')}" 
                    class="questioner-avatar" alt="questioner-avatar">
                    </div>
                    <div class="questioner-name-detail" id="questioner-name-detail">
                    ${sessionStorage.getItem('notif'+(i+1).toString()+'username')}
                    </div>
                </div>
                <div class="card-body" id="card-body-detail">
                <h4>Problem:</h4>
                    ${
                sessionStorage.getItem('notif'+(i+1).toString()+'question')
                }
                </div>
                <div class="card-footer" id="card-footer-detail">
                    <img src="images/tag-active.png" id="questioner-part-detail" alt="questioner-part">
                    ${sessionStorage.getItem('notif'+(i+1).toString()+'questionType')}
                </div>
                <button class="btn submit" id="answer-question" type="button" onclick="clickAnswerQuestion(${i})">Answer Question</button>                
            </div>
        `
    );
    $('.index').css('display','none').prop( "disabled", true );
}

function clickAnswerQuestion(i) {
    $.ajax({
        url: '/getMoney',
        type: 'POST',
        cache: false,
        processData:false,
        dataType: 'json',
        success: function (response) {
            if (response.status === 0) {
                let username = sessionStorage.getItem('notif' + (i + 1).toString() + 'username');
                let userAvatar = sessionStorage.getItem('userAvatar');
                sessionStorage.setItem('targetAvatar', sessionStorage.getItem('notif' + (i + 1).toString() + 'userAvatar'));
                sessionStorage.setItem('targetName',username);
                sessionStorage.setItem('targetNumber',i);
                $('.answer-notification-detail').toggle();
                $('.index').css('opacity', '100%');
                let data = {
                    questionerName: username,
                    expertName: sessionStorage.getItem('username'),
                    expertAvatar:userAvatar,
                };
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
                socket.emit('sendChatRequest', data);
                $('.chatroom').css('display', 'flex');
                $('.index').css('display', 'none');
                $('.chatroom .chatroom-body').append(
                    `
               <div class="msg-wrapper-sys">
                        <span class="badge badge-success system-msg">You will talk to Questioner ${username}</span>
               </div>
        `
                );
                socket.on('receiveMessage', function (data) {
                    $('.chatroom .chatroom-body').append(
                        `
                    <div class="msg-wrapper-oppo">
                            <img src="user-data/${sessionStorage.getItem('targetAvatar')}"  alt="Avatar">
                            <span class="badge badge-success oppo-msg">${data}</span>
                                 <div class="clear"></div>
                    </div>
                       `
                    )
                });
                $('.chatroom #chatroom-send').off('click');
                $('.chatroom #chatroom-send').click(function () {
                        let message = $('.chatroom-bottom input').val();
                        let data = {
                            targetName: username,
                            msg: message,
                        };
                        $('.chatroom .chatroom-body').append(
                            `<div class="msg-wrapper-self">
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

                $('#chatroom-leave').off('click');
                $('#chatroom-leave').click(function () {
                    let leaveNotif = {leaveSide: sessionStorage.getItem('username'), targetSide: username};
                    socket.emit('sendLeaveNotif', leaveNotif);
                    setTimeout(function () {
                        $('.chatroom').css('display', 'none');
                        $('.index').css('display', 'flex');
                    }, 1000);
                    cleanNotification(sessionStorage.getItem('targetNumber'));
                });
                socket.on('receiveLeaveNotif', function (data) {
                    $('.chatroom .chatroom-body').append(
                        `
                    <div class="msg-wrapper-sys">
                            <span class="badge badge-success system-msg">${data} Leaved!</span>
                   </div>
                       `
                    );

                })
            }
        }
    })
}

function clickMoreInfo(){
    let username = $('#question-expert-name').val();
    let fd={'username':username};
    $.ajax({
        url: '/getMoreInfo',
        type: 'POST',
        data:JSON.stringify(fd),
        cache: false,
        processData:false,
        contentType:"application/json",
        dataType: 'json',
        success: function (response) {
            if (response.status === 0) {
                $('.question-more-info-content').toggle().html(
                    `
                    <div id="more-info-close">
                        <span class="align-top" onclick="clickCloseMoreInfo()">
                            <img src="images/close.png" id="more-info-close">
                        </span>
                    </div>
                    <div class="more-info-display">
                        Name:${response.data.username}
                    </div>
                    <div class="more-info-display">
                        Experience:${response.data.userExperience}
                    </div>
                    <div class="more-info-display">
                        Skills:${response.data.userSkills}
                    </div>
                    `
                );
            }
            else{
                $('.question-more-info-content').toggle().html(
                    `
                    <div id="more-info-close">
                        <span class="align-top" onclick="clickCloseMoreInfo()">
                            <img src="images/close.png" id="more-info-close">
                        </span>
                    </div>
                    <div class="more-info-display" style="margin-top: 1vh;margin-left:1vh; height:10vh;">
                        Expert Not Selected or Not Exists!
                    </div>
                    `);
            }
            $('.index').css('opacity','50%');
            $('.index *').prop('disabled',true);
        }
    })
}

function clickCloseMoreInfo(){
    $('.question-more-info-content').hide();
    $('.index').css('opacity','100%');
    $('.index *').prop('disabled',false);
}

function cleanNotification(targetNumber){
    let existNotifications = parseInt(sessionStorage.getItem('notifications'));
    sessionStorage.setItem('notifications',(existNotifications-1).toString());
    let cur = 'notif'+(parseInt(targetNumber)+1);
    sessionStorage.removeItem(cur+'username');
    sessionStorage.removeItem(cur+'userAvatar');
    sessionStorage.removeItem(cur+'userExperience');
    sessionStorage.removeItem(cur+'userSkills');
    sessionStorage.removeItem(cur+'carCountry');
    sessionStorage.removeItem(cur+'carBrand');
    sessionStorage.removeItem(cur+'carModel');
    sessionStorage.removeItem(cur+'question');
    sessionStorage.removeItem(cur+'questionType');
    sessionStorage.removeItem('targetAvatar');
    sessionStorage.removeItem('targetNumber');
    sessionStorage.removeItem('targetName');
    window.location.href = '/question';
}


