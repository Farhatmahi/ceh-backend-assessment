const express = require('express');
const router = express.Router()
const {postJob} = require('../Controllers/postJobController');

router.route('/').post(postJob)

module.exports = router