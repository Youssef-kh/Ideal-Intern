const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company_name: {
    type: String,
    required: true,
  },
  company_status: {
    type: String,
    required: true,
  },
  date_of_creation: {
    type: Date,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  website_adress: {
    type: String, 
    required: true,
  },
  location: {
    type: String,
    required: true,
    
  }

}); 

module.exports = company = mongoose.model('company', CompanySchema);
