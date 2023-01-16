const express = require("express");
const router = express.Router()
const {newStudentForm} = require('../Controllers/newStudentController');
const {protect} = require('../Middleware/AuthMiddleware');

router.route('/').post(protect, newStudentForm)

module.exports = router