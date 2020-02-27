$(function(){
    $.ajax({
        url: '/car',
        type: 'POST',
        cache: false,
        processData:false,
        success: function (response) {
            let rendercar = response.data;
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
    $('#signUp-submit').click(function(){
        if($('#signUp-username').val()===''){
            $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Must Input username!</strong>
                        </div>
                        `);
        }
        else if($('#signUp-password').val()===''){
            $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Must Input password!</strong>
                        </div>
                        `);
        }
        else if(!$('#signUp-avatar').val()){
            $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Must Select Avatar!</strong>
                        </div>
                        `);
        }
    });
    $('#signUp-avatar').on('change',function(e){
        $('#signUp-submit').off('click');
        $('#signUp-submit').click(function(){
            let files = e.target.files;
            let file = files[0];
            let username= $('#signUp-username').val();
            let password = $('#signUp-password').val();
            let userGender = $('#signUp-male input').attr('checked')?'Male':'Female';
            let userExperience = $('#signUp-experience').val();
            let userSkills = $('#signUp-skills').val();
            let userEmail = $('#signUp-email').val();
            let userAddress = $('#signUp-address').val();
            let userQuestioner = $('#signUp-questioner input').attr('checked');
            let userExpert = $('#signUp-expert input').attr('checked');
            let carCountry = $('#signUp-car-country').val();
            let carBrand = $('#signUp-car-brand').val();
            let carModel = $('#signUp-car-model').val();
            let data = new FormData();
            data.append('username',username);
            data.append('password',password);
            data.append('userAvatar',file);
            data.append('userGender',userGender);
            data.append('userExperience',userExperience);
            data.append('userSkills',userSkills);
            data.append('userEmail',userEmail);
            data.append('userAddress',userAddress);
            data.append('userQuestioner',userQuestioner);
            data.append('userExpert',userExpert);
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
                        $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Successfully create Account!</strong>
                        </div>
                        `);
                        // alert('Successfully create Account! \n Now you have 1 free coin, try asking an expert!');
                        window.location.href='/login';
                    }else if(response.status === 1){
                        $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>User exists!</strong>
                        </div>
                        `);
                        // alert('User exists!');
                    }
                    else{
                        $('#alert-placeholder').html(`
                        <div class="alert alert-warning" style="display: block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>unknown error!</strong>
                        </div>
                        `);
                        // alert('unknown error!');
                    }
                }
            })
        });
    });

    $('#signUp-back').click(function(){
        window.location.href = '/login';
    });

    $('.signUp-questioner').toggle();

    $('#signUp-male').click(function(){
        let checkedState = $(this).find(' input').attr('checked');
        $('#signUp-female input').removeAttr("checked");
        $(this).find(' input').attr('checked',true);
        if(checkedState === 'checked'){
            $(this).find(' input').removeAttr("checked");
        }
    });

    $('#signUp-female').click(function(){
        let checkedState = $(this).find(' input').attr('checked');
        $('#signUp-male input').removeAttr("checked");
        $(this).find(' input').attr('checked',true);
        if(checkedState === 'checked'){
            $(this).find(' input').removeAttr("checked");
        }
    });

    $('#signUp-questioner').click(function(){
        let checkedState = $(this).find(' input').attr('checked');
        $('.signUp-questioner').toggle();
        $(this).find(' input').attr('checked',true);
        if(checkedState === 'checked'){
            $(this).find(' input').removeAttr("checked");
        }
    });
    $('#signUp-expert').click(function(){
        let checkedState = $(this).find(' input').attr('checked');
        $('.signUp-expert').toggle();
        $(this).find(' input').attr('checked',true);
        if(checkedState === 'checked'){
            $(this).find(' input').removeAttr("checked");
        }
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
