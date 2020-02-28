function clickLogin(){
        let username = $('#login-username').val();
        let password = $('#login-password').val();
        let fd={'username':username,'password':password};
        $.ajax({
            url: '/login',
            type: 'POST',
            data:JSON.stringify(fd),
            // data: `username=${username}&password=${password}`,
            cache: false,
            processData:false,
            // contentType:"application/x-www-form-urlencoded",
            contentType:"application/json",
            dataType: 'json',
            success: function (response) {
                if (response.status === 0) {
                    window.location.href='/';
                } else if(response.status === 1){
                    $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>User not found! Please Sign up first!</strong>
                        </div>
                        `);
                    // alert('User not found! Please Sign up first!');
                }
                else{
                    $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Login error!</strong>
                        </div>
                        `);
                    // alert('Login error!');
                }
            }
        })
}

function clickSignUp(){
    window.location.href = '/signUp';
}
