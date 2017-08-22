/* ************************************************************************ */
/*
    Testing Schema
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema= new Schema({
    date: {type: Date, default: Date.now},
    epochdate: {type: Number, default: Date.now},
    content: String,
    ix: Number,
    env: String
});

var TestModel = mongoose.model('testdoc',testSchema);

module.exports=TestModel; 

