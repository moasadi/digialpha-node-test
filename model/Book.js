var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var BookSchema = new mongoose.Schema({
  title:{type:String , unique:true, minlength:3,maxlength:100},
  author:{type:String, minlength:3,maxlength:100},
  pages:{type:Number,min:1,max:10000},
  categories:{type:String,enum:['computer','general','novel',]},
  summary:{type:String,minlength:3,maxlength:1000}
}, { timestamps: true });
BookSchema.plugin(mongoosePaginate);
BookSchema.index({title: 'text', categories: 'text',author:'text',summary:'text'});

module.exports = mongoose.model('Book', BookSchema);
