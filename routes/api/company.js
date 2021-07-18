const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Company = require('../../models/Company');
const User = require('../../models/User');
/* const Job = require('../../models/Job'); */
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');
const request = require('request');
const mongoose = require('mongoose');
/*const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobById,
  deleteJob,
  getJobStat,
} = require('../../controllers/job.controller');*/

const ClearbitLogo = require('clearbit-logo');

// @route    GET api/company/get-all-jobs
// @desc     Get current users company profile
// @access   Private
router.get('/get-all-jobs',auth, async (req, res) => {
  try {
    await Company
    .find()
    .then(function (companies) {
      if (!companies) {
        return res.status(404).json({ msg: 'Companies empty.' });
      }
      res.json(companies);
    })
    .catch((err) => (results = err));
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    GET api/profile/company
// @desc     Get current users company profile
// @access   Private
router.get('/user', auth, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'content-type',
    'Authorization',
    'x-auth-token'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  try {
    const company = await Company.findOne({
      user: req.user.id,//populate?
    }).populate('user', ['email', 'avatar']);

    if (!company) {
      return res.status(400).json({ msg: 'There is no company profile for this user' });
    }

    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/profile/company
// @desc        Create or update user company profile
// @access      Private
router.post(
  '/create',
  [
    auth,
    [
      check('company_name', 'company name is required').notEmpty(),
      check('company_status', 'company status is required').notEmpty(),
      check('activity', 'activity is required').notEmpty(),
      check('date_of_creation', 'date of creation is required').notEmpty(),
      check('website_adress', 'website adress is required').notEmpty(),
      check('location', 'location is required').notEmpty(),

    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const {
      company_name,
      company_status,
      date_of_creation,
      activity,
      website_adress,
      location,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company_name) profileFields.company_name = company_name;
    if (company_status) profileFields.company_status = company_status;
    if (date_of_creation) profileFields.date_of_creation = date_of_creation;
    if (activity) profileFields.activity = activity;
    if (website_adress) profileFields.website_adress = website_adress;
    if (location) profileFields.location = location;

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let company = await Company.findOne({ user: req.user.id });

      if (company) {
        //update
        company = await Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(company);
      }

      //create
      company = new Company(profileFields);
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// @route       GET api/company
// @desc        Get all profiles
// @access      Public
router.get('/profiles', async (req, res) => {
  try {
    const companies = await Company.find().populate('user', [
      'email',
      'avatar',
      'following',
      'followers',
    ]);
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// @route       GET api/company/user/:user_id
// @desc        Get profile by user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const company = await Company.findOne({
      user: req.params.user_id,
    }).populate('user', ['email', 'avatar', 'following', 'followers']);
    if (!company) {
      return res.status(400).json({ msg: 'Company Profile not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Company Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/delete', auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    await Promise.all([
      // Post.deleteMany({ user: req.user.id }),
      Company.findOneAndRemove({ user: req.user.id }),
    ]);

    res.json({ msg: 'Company Profile Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
  router.get('/github/:username', (req, res) => {
  try {
    const options = {
      //api externe
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//router.post('/job', createJob);

router.put(
  '/job',
  [
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('job_type', 'job type is required').notEmpty(),
     
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      job_type,
      posted_date,
      start_date,
      employees_needed,
      description,
      to
    } = req.body;

    const newJob = {
      title: title,
      job_type: job_type,
      posted_date: posted_date,
      start_date: start_date,
      employees_needed: employees_needed,
      description: description,
      to: to
    };
    try {
      const company = await Company.findOne({ user: req.user.id });
      company.job.unshift(newJob);
      console.log(newJob);
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    EDIT api/Trainee/job_edit/:job_id
// @desc     EDIT education from Trainee
// @access   Private
router.post('/Job_edit/:jb_d', auth,  (req, res) => {
  
  Company.findOne({ user : req.user.id }) 
    .then((company) => {
      company.job.forEach(job => {
        if(job._id.toString() === req.body.jobId){
          job.title = req.body.title;
          job.job_type = req.body.job_type;
          job.posted_date = req.body.posted_date;
          job.start_date = req.body.start_date;
          job.employees_needed = req.body.employees_needed;
          job.to = req.body.to;
          job.description = req.body.description;
        }
      });

    company.save().then(() => res.json("Job Edited!"));
  
    })
    .catch((err) => res.status(400).json("Error: " + err));
})
// @route    DELETE api/company/Job/:job_id
// @desc     Delete job from company
// @access   Private

router.delete('/Job/:job_id', auth, async (req, res) => {
  try {
    const foundCompany = await Company.findOne({ user: req.user.id });
    foundCompany.job = foundCompany.job.filter(
      (job) => job._id.toString() !== req.params.job_id
    );
    await foundCompany.save();
    return res.status(200).json(foundCompany);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    POST api/company/apply
// @desc     Apply trainee to job
// @access   Private
router.post('/apply', auth,  (req, res) => {
  const traineeId = req.body.traineeId;
  const companyId = req.body.companyId;
  const jobId = req.body.jobId;
    Company.findOne({ user : companyId }) 
    .then((company) => {
      company.job.forEach(job => {
        if(job.jobId === jobId){
          job.appliedTrainees.push(traineeId) 
        }
      });

    company.save().then(() => res.json("Job Edited!"));
  
    })
    .catch((err) => res.status(400).json("Error: " + err));
 })


module.exports = router;