const express = require('express');
const router = express.Router();
const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs');

router.get('/').post(createJob).get(getAllJobs);
router.get('/:id').put(updateJob).delete(deleteJob).get(getJob);

module.exports = router;