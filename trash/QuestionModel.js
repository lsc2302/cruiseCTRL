const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    name:{type:String, required:true},
    nation:{type:String, required:true},
    car:{type:Array},
    accessories:{type:String},
    question:{type:String},
});

const QuestionModel = mongoose.Model(QuestionSchema);
module.exports(QuestionModel);
