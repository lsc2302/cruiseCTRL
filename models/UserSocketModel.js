const mongoose = require('mongoose');

const UserSocketSchema = new mongoose.Schema({
    username:{type:String, required:true},
    socketId:{type:String},
});

const UserSocketModel = mongoose.model('UserSocket',UserSocketSchema);

module.exports = UserSocketModel;
