function clickSignUpSubmit(){
    let username= $('#signUp-username').val();
    let password = $('#signUp-password').val();
    let userAvatar = 'avatar-1.png';
    let userExperience = $('#signUp-experience').val();
    let userSkills = $('#signUp-skills').val();
    let carCountry = $('#signUp-car-country').val();
    let carBrand = $('#signUp-car-brand').val();
    let carModel = $('#signUp-car-model').val();
    let data = {
        username:username,
        password:password,
        userAvatar:userAvatar,
        userExperience:userExperience,
        userSkills:userSkills,
        carCountry:carCountry,
        carBrand:carBrand,
        carModel:carModel,
    };
    $.ajax({
        url:'/userCreate',
        type: 'POST',
        data:JSON.stringify(data),
        cache: false,
        processData:false,
        contentType:"application/json",
        dataType: 'json',
        success: function (response) {
            if(response.status === 0){
                alert('successfully create Account!');
                window.location.href='/login';
            }else if(response.status === 1){
                alert('User exists!');
            }
            else{
                alert('unknown error!');
            }
        }
    })
}

function signUpLevel(){
    let exp = parseInt($('#signUp-experience').val());
    let level = '';
    switch(true){
        case exp<=5:level='Junior';break;
        case exp<=10:level='Senior';break;
        case exp<=15:level='Staff';break;
        case exp>15:level='Expert';break;
        default:level='Junior';break;
    }
    $('#signUp-level').text(level);
}
