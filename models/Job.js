/*const mongoose = require('mongoose');
mongoose.Promise = global.Promise ;

let Schema = mongoose.Schema
const JobSchema = new Schema({

   
  title: {
    type: String,
    required: true
  },
  job_type: {
    
    type : String,
    required: true
 },
  posted_date: {
    type: Date,
    default: Date.now
  },
  start_date: {
    type: Date,
  },
  employees_needed: {
    type: Number
  },
  description: {
    type: String
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'company'
    
 },
  to: {
    type: Date,
   
  },
  location : {
    type : String , 
    required : true
  }
   
});



module.exports = Job = mongoose.model('job', JobSchema);*/