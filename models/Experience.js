const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainee',
    },
    title: {
        type: String,
        
      },
      company: {
        type: String,
        
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        
      },
      to: {
        type: Date,
        
      },
      current: {
        type: Boolean,
        
      },
      description: {
        type: String,
      },
})

module.exports = mongoose.model('Experience', ExperienceSchema);