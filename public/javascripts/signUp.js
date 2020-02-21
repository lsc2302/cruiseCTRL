$(function(){

    $.ajax({
        url: '/car',
        type: 'POST',
        cache: false,
        processData:false,
        success: function (response) {
            let rendercar = response.data;
            console.log(rendercar.data.length);
            $('#signUp-car-country').focus(function(){
                let tmp = '';
                for (let i = 0; i < rendercar.data.length; i++) {
                    tmp += `<option>${rendercar.data[i].carCountry}</option>`;
                }
                $("#signUp-cars-country-select").html(tmp);
            });
            $('#signUp-car-brand').focus(function(){
                let tmp = '';
                let carCountry = $('#signUp-car-country').val();
                let country_idx;
                if (carCountry !== 'Country'){
                    for(let i=0;i<rendercar.data.length;i++){
                        if(rendercar.data[i].carCountry === carCountry){
                            country_idx = i;
                        }
                    }
                    for (let i = 0; i < rendercar.data[country_idx].children.length; i++) {
                        tmp += `<option>${rendercar.data[country_idx].children[i].carBrand}</option>`;
                    }
                }
                $("#signUp-cars-brand-select").html(tmp);
            });
            $('#signUp-car-model').focus(function(){
                let tmp = '';
                let carCountry = $('#signUp-car-country').val();
                let carBrand = $('#signUp-car-brand').val();
                let country_idx;
                let brand_idx;
                if (carCountry !== ''&& carBrand !== ''){
                    for(let i=0;i<rendercar.data.length;i++){
                        if(rendercar.data[i].carCountry === carCountry){
                            country_idx = i;
                            for(let j=0;j<rendercar.data[i].children.length;j++){
                                if(rendercar.data[i].children[j].carBrand === carBrand){
                                    brand_idx = j;
                                }
                            }
                        }
                    }
                    for (let i = 0; i < rendercar.data[country_idx].children[brand_idx].children.length; i++) {
                        tmp += `<option>${rendercar.data[country_idx].children[brand_idx].children[i].carModel}</option>`;
                    }
                }
                $("#signUp-cars-model-select").append(tmp);

            }).on('change',function(){
                let carModel = $('#signUp-car-model').val();
                if(carModel !== ''){
                    let carCountry = $('#signUp-car-country').val();
                    let carBrand = $('#signUp-car-brand').val();
                    let country_idx;
                    let brand_idx;
                    if (carCountry !== ''&& carBrand !== '') {
                        for (let i = 0; i < rendercar.data.length; i++) {
                            if (rendercar.data[i].carCountry === carCountry) {
                                country_idx = i;
                                for (let j = 0; j < rendercar.data[i].children.length; j++) {
                                    if (rendercar.data[i].children[j].carBrand === carBrand) {
                                        brand_idx = j;
                                    }
                                }
                            }
                        }
                    }
                    let model_idx;
                    for(let i=0;i< rendercar.data[country_idx].children[brand_idx].children.length; i++){
                        if(rendercar.data[country_idx].children[brand_idx].children[i].carModel===carModel){
                            model_idx = i;
                        }
                    }
                    $('#signUp-car-img').attr('src',rendercar.data[country_idx].children[brand_idx].children[model_idx].img)
                }
            })

        }
    });

    $('#user-avatar').on('change',function(e){
        let files = e.target.files;
        let file = files[0];
        $('#signUp-submit').click(function(){
            let username= $('#signUp-username').val();
            let password = $('#signUp-password').val();
            let userExperience = $('#signUp-experience').val();
            let userSkills = $('#signUp-skills').val();
            let carCountry = $('#signUp-car-country').val();
            let carBrand = $('#signUp-car-brand').val();
            let carModel = $('#signUp-car-model').val();
            let data = new FormData();
            data.append('username',username);
            data.append('password',password);
            data.append('userAvatar',file);
            data.append('userExperience',userExperience);
            data.append('userSkills',userSkills);
            data.append('carCountry',carCountry);
            data.append('carBrand',carBrand);
            data.append('carModel',carModel);
            console.log(Array.from(data));
            $.ajax({
                url:'/signUp',
                type: 'POST',
                data:data,
                cache: false,
                processData:false,
                contentType: false,
                // contentType:'multipart/form-data',
                dataType: 'json',
                success: function (response) {
                    if(response.status === 0){
                        alert('Successfully create Account! \n Now you have 1 free coin, try asking an expert!');
                        window.location.href='/login';
                    }else if(response.status === 1){
                        alert('User exists!');
                    }
                    else{
                        alert('unknown error!');
                    }
                }
            })
        });
    });

    $('#signUp-back').click(function(){
        window.location.href = '/login';
    })

});


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
