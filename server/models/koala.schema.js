let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let koalaSchema = new Schema({

  name : {
    type : String,
    required : true
  },
  gender : {
    type : String,
    required : true
  },
  age : {
    type : Number,
    required : true
  },
  ready_to_transfer : {
    type : Boolean,
    default: false
  },
  notes : {
    type : String,
    required : true
  }

});


module.exports = mongoose.model('Koala', koalaSchema);
