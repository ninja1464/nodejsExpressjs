const express = require('express')

const router = express.Router()

const { getAllJobs, createJob, deleteJob, getJob, updateJob } = require('../controllers/jobs')


router.route('/').get(getAllJobs).post(createJob)

router.route('/:id').get(getJob).get(deleteJob).patch(updateJob)

module.exports = router