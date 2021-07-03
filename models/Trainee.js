const mongoose = require('mongoose');
const shortid = require('shortid')
const TraineeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  firstName: {
    type: String, 
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      experienceId:{
        type: String,
        default: shortid.generate()
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
    },
  ],
  education: [
    {
      school: {
        type: String,
       
      },
      degree: {
        type: String,
        
      },
      fieldofstudy: {
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
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Trainee', TraineeSchema);
