const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    userGender:{type:String},
    userEmail:{type:String},
    userAddress:{type:String},
    userAvatar:{type:String},
    userCoins:{type:Number},
    userExperience:{type:Number},
    userSkills:{type:String},
    userQuestioner:{type:String},
    userExpert:{type:String},
    carCountry:{type: String},
    carBrand:{type:String},
    carModel:{type:String},
});

const UserModel = mongoose.model('User',UserSchema);

UserModel.findOne({username:'admin'}).then(user => {
    if(!user){
        UserModel.create(
            {
            username:'admin',
            password:'admin',
            userAvatar:'manager.png',
            userGender:'Male',
            userEmail:'123@ucsd.edu',
            userAddress:'1234rd',
            userCoins:100,
            userExperience: '10',
            userSkills:'AC, Engine',
            userQuestioner:'checked',
            userExpert:'checked',
            carCountry:'Japan',
            carBrand:'Toyota',
            carModel:'CAMRY',
            }).then(user =>{
            console.log('user init: admin password:admin')
        })
    }
});

UserModel.findOne({username:'sahba'}).then(user => {
    if(!user){
        UserModel.create(
            {
                username:'sahba',
                password:'admin',
                userAvatar:'avatar-2.png',
                userGender:'Female',
                userEmail:'123@ucsd.edu',
                userAddress:'1234rd',
                userCoins:10,
                userExperience: '15',
                userSkills:'window',
                userExpert:'checked',
                carCountry:'Japan',
                carBrand:'Toyota',
                carModel:'Crown',
            }).then(user =>{
            console.log('user init: sahba password:admin')
        })
    }
});

UserModel.findOne({username:'ivan'}).then(user => {
    if(!user){
        UserModel.create(
            {
                username:'ivan',
                password:'admin',
                userAvatar:'avatar-1.png',
                userGender:'Male',
                userEmail:'123@ucsd.edu',
                userAddress:'1234rd',
                userCoins:1,
                userExperience: '8',
                userSkills:'Brake',
                userQuestioner:'checked',
                carCountry:'Japan',
                carBrand:'Toyota',
                carModel:'Camry',
            }).then(user =>{
            console.log('user init: ivan password:admin')
        })
    }
});

module.exports = UserModel;
