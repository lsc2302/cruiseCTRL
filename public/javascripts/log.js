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
                    alert('User not found! Please Sign up first!');
                }
                else{
                    alert('Login error!');
                }
            }
        })
}

function clickSignup(){
    window.location.href = '/signUp';
}
