const express = require('express');
const router = express.Router();

const { register, login, getMe } = require('../controllers/auth');
const { saveJobs, getJobs } = require('../controllers/jobs');

const { authorizeUser } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/me/:id', authorizeUser, getMe)
router.post('/jobs', saveJobs)
router.get('/jobs/:id', getJobs)

module.exports = router;