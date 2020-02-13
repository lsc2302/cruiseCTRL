const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    userAvatar:{type:String},
    userExperience:{type:Number},
    userSkills:{type:String},
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
            userExperience: '10',
            userSkills:'AC, Engine',
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
                userAvatar:'avatar-1.png',
                userExperience: '15',
                userSkills:'window',
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
                userAvatar:'avatar-2.png',
                userExperience: '8',
                userSkills:'Brake',
                carCountry:'Japan',
                carBrand:'Toyota',
                carModel:'Camry',
            }).then(user =>{
            console.log('user init: ivan password:admin')
        })
    }
});

module.exports = UserModel;
