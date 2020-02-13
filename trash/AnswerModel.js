const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    author:{type:String, required:true},
    nation:{type:String, required:true},
    answer:{type:String},
});

const AnswerModel = mongoose.Model(AnswerSchema);
module.exports(AnswerModel);
