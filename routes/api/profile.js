const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Trainee = require('../../models/Trainee');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');
const request = require('request');



// @route    GET api/trainee
// @desc     Get current users Trainee Profile
// @access   Private
router.get('/', auth, async (req, res) => {
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
    const trainee = await Trainee.findOne({
      user: req.user.id,//populate?
    }).populate('user', ['email', 'avatar']);

    if (!trainee) {
      return res.status(400).json({ msg: 'There is no trainee profile for this user' });
    }

    res.json(trainee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/Trainee/create
// @desc        Create or update user Trainee
// @access      Private
router.post(
  '/create',
  [
    auth,
    [
      check('firstName', 'firstName is required').notEmpty(),
      check('lastName', 'lastName is required').notEmpty(),
      check('skills', 'Skills is required').notEmpty(),
      check('dateOfBirth', 'dateOfBirth is required').notEmpty(),
      check('bio', 'bio is required').notEmpty(),
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
      firstName,
      lastName,
      dateOfBirth,
      location,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    //build Trainee object
    const traineeFields = {};
    traineeFields.user = req.user.id;
    if (firstName) traineeFields.firstName = firstName;
    if (lastName) traineeFields.lastName = lastName;
    if (dateOfBirth) traineeFields.dateOfBirth = dateOfBirth;
    if (location) traineeFields.location = location;
    if (bio) traineeFields.bio = bio;
    if (githubusername) traineeFields.githubusername = githubusername;
    if (skills) {
      traineeFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //build social object
    traineeFields.social = {};
    if (youtube) traineeFields.social.youtube = youtube;
    if (twitter) traineeFields.social.twitter = twitter;
    if (facebook) traineeFields.social.facebook = facebook;
    if (linkedin) traineeFields.social.linkedin = linkedin;
    if (instagram) traineeFields.social.instagram = instagram;

    try {
      let trainee = await Trainee.findOne({ user: req.user.id });

      if (trainee) {
        //update
        trainee = await Trainee.findOneAndUpdate(
          { user: req.user.id },
          { $set: traineeFields },
          { new: true }
        );
        return res.json(trainee);
      }

      //create
      trainee = new Trainee(traineeFields);
      await trainee.save();
      res.json(trainee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       GET api/trainee/profiles
// @desc        Get all Trainees
// @access      Public
router.get('/proflies', async (req, res) => { 
  try {
    const trainee = await Trainee.find().populate('user', [
      'email',
      'avatar',

      'following',
      'followers',
    ]);
    res.json(trainee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route       GET api/Trainee/user/:user_id
// @desc        Get Trainee profile by user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const trainee = await Trainee.findOne({
      user: req.params.user_id,
    }).populate('user', ['email', 'avatar', 'following', 'followers']);
    if (!trainee) {
      return res.status(400).json({ msg: 'trainee profile not found' });
    }
    res.json(trainee);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'trainee profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/Trainee
// @desc     Delete Trainee, user & posts
// @access   Private
router.delete('/delete', auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove Trainee
 
    await Promise.all([
      // Post.deleteMany({ user: req.user.id }),
      Trainee.findOneAndRemove({ user: req.user.id }),
    ]);

    res.json({ msg: 'trainee profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/Trainee/experience
// @desc     Add Trainee experience
// @access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('company', 'Company is required').notEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title: title,
      company: company,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description,
    };
    try {
      const trainee = await Trainee.findOne({ user: req.user.id });
      trainee.experience.unshift(newExp);
      await trainee.save();
      res.json(trainee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    EDIT api/Trainee/experience_edit/:exp_id
// @desc     EDIT experience from Trainee
// @access   Private
/*router.post('/experience_edit/:exp_id', auth, async (req, res) => {
  try {
    const trainee = await Trainee.findOne({ user: req.user.id });
    const experience = trainee.experience;
  if (trainee) {
     experience.findOneAndUpdate(
      { user: req.user.id },
      { $set: trainee },
      { new: true } 
    );
    return res.json(trainee);
  } else {
    res.status(404).send("no experience added");
  }
  }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})*/
 router.post('/experience_edit/:exp_id', auth,  (req, res) => {
  
  Trainee.findOne({ user : req.user.id })
    .then((trainee) => {
      console.log("req.body",req.body);
      trainee.title = req.body.title;
      trainee.company = req.body.company;
      trainee.location = req.body.location;
      trainee.from = req.body.from;
      trainee.to = req.body.to;
      trainee.current = req.body.current;
      trainee.description = req.body.description;

    trainee.save().then(() => res.json("Experience Edited!"));
  
    })
    .catch((err) => res.status(400).json("Error: " + err));
})

// @route    DELETE api/Trainee/experience/:exp_id
// @desc     Delete experience from Trainee
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundTrainee = await Trainee.findOne({ user: req.user.id });

    foundTrainee.experience = foundTrainee.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundTrainee.save();
    return res.status(200).json(foundTrainee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
// @route    PUT api/Trainee/education
// @desc     Add Trainee education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      degree,
      school,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      degree: degree,
      school: school,
      fieldofstudy: fieldofstudy,
      from: from,
      to: to,
      current: current,
      description: description,
      schoollogo: 'https://logo.clearbit.com/' + school + '.tn',
    };
    try {
      const trainee = await Trainee.findOne({ user: req.user.id });

      trainee.education.unshift(newEdu);

      await trainee.save();

      res.json(trainee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    DELETE api/Trainee/education/:edu_id
// @desc     Delete education from Trainee
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundTrainee = await Trainee.findOne({ user: req.user.id });
    foundTrainee.education = foundTrainee.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundTrainee.save();
    return res.status(200).json(foundTrainee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/Trainee/github/:username
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

module.exports = router;
