const express = require('express');
const router = express.Router();
const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs');
const auth = require('../middleware/authentication');

router.route('/',auth).post(createJob).get(getAllJobs);
router.route('/:id',auth).patch(updateJob).delete(deleteJob).get(getJob);

module.exports = router;