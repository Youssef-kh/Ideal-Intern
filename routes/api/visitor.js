const express = require("express");
const router = express.Router();
const Company = require("../../models/Company");

// @route    GET api/company/get-all-jobs for visitor

// @access   Public
router.get("/get-all-jobs", async (req, res) => {
    try {
        await Company.find()
          .then(function (companies) {
            if (!companies) {
              return res.status(404).json({ msg: "Companies empty." });
            }
            res.json(companies);
          })
          .catch((err) => (results = err));
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});

module.exports = router;
