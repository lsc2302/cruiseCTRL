function storeNotifications(data){
    const {username, userAvatar, userExperience,
        userSkills,carCountry,carBrand,carModel,question,questionType
    } = data;
    let existNotifications = parseInt(sessionStorage.getItem('notifications'));
    sessionStorage.setItem('notifications',(existNotifications+1).toString());
    let cur = 'notif'+(existNotifications+1).toString();
    sessionStorage.setItem(cur+'username',username);
    sessionStorage.setItem(cur+'userAvatar',userAvatar);
    sessionStorage.setItem(cur+'userExperience',userExperience);
    sessionStorage.setItem(cur+'userSkills',userSkills);
    sessionStorage.setItem(cur+'carCountry',carCountry);
    sessionStorage.setItem(cur+'carBrand',carBrand);
    sessionStorage.setItem(cur+'carModel',carModel);
    sessionStorage.setItem(cur+'question',question);
    sessionStorage.setItem(cur+'questionType',questionType);
}
