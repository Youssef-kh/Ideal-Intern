const mongoose = require("mongoose");
const shortid = require("shortid");
const CompanySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  },
  job: [
    {
      jobId: {
        type: String,
        default: shortid.generate(),
      },
      title: {
        type: String,
      },
      job_type: {
        type: String,
      },
      posted_date: {
        type: Date,
        default: Date.now,
      },
      start_date: {
        type: Date,
      },
      employees_needed: {
        type: Number,
      },
      description: {
        type: String,
      },
      to: {
        type: Date,
      },
      location: {
        type: String,
        defulat: "N/A",
      },
      appliedTrainees: [
        {
          type: String,
          default: "N/A",
        },
      ],
    },
  ],
});

module.exports = company = mongoose.model("company", CompanySchema);
