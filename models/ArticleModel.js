const mongoose = require('mongoose');

const ArticleScheme = new mongoose.Schema({
    articleCarCountry:{type: String},
    articleCarBrand:{type:String},
    articleCarModel:{type:String},
    articleTitle:{type:String},
    articleBody:{type:String},
    articleImage:{type:String},
});

const ArticleModel = mongoose.model('Article', ArticleScheme);
// ArticleModel.findOne({articleCarModel:'Century'}).then(user => {
//     if(!user){
//         ArticleModel.create(
//             {
//                 articleCarCountry:"Japan",
//                 articleCarBrand:"Toyota",
//                 articleCarModel:"Century",
//                 articleTitle:"Century Comes",
//                 articleImage:"Toyota_Century.jpg"
//             }).then(user =>{
//             console.log('article create');
//         })
//     }
// });
ArticleModel.findOne({articleCarModel:'Crown'}).then(user => {
    if(!user){
        ArticleModel.create(
            {
                articleCarCountry:"Japan",
                articleCarBrand:"Toyota",
                articleCarModel:"Crown",
                articleTitle:"Crown Comes",
                articleBody:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                articleImage:"Toyota_Crown.jpg"
            }).then(user =>{
            console.log('article create');
        })
    }
});
ArticleModel.findOne({articleCarModel:'Camry'}).then(user => {
    if(!user){
        ArticleModel.create(
            {
                articleCarCountry:"Japan",
                articleCarBrand:"Toyota",
                articleCarModel:"Camry",
                articleTitle:"Century Comes",
                articleBody:"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                articleImage:"Toyota_CAMRY.jpg"
            }).then(user =>{
            console.log('article create');
        })
    }
});
ArticleModel.findOne({articleCarModel:'MIRAI'}).then(user => {
    if(!user){
        ArticleModel.create(
            {
                articleCarCountry:"Japan",
                articleCarBrand:"Toyota",
                articleCarModel:"MIRAI",
                articleTitle:"MIRAI Comes",
                articleBody:"CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
                articleImage:"Toyota_Mirai.jpg"
            }).then(user =>{
            console.log('article create');
        })
    }
});
ArticleModel.findOne({articleCarModel:'Mark X'}).then(user => {
    if(!user){
        ArticleModel.create(
            {
                articleCarCountry:"Japan",
                articleCarBrand:"Toyota",
                articleCarModel:"Mark X",
                articleTitle:"Mark X Comes",
                articleBody:"DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
                articleImage:"Toyota_MARK_X.jpg"
            }).then(user =>{
            console.log('article create');
        })
    }
});
module.exports = ArticleModel;
