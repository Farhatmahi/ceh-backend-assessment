const express = require("express");
const router = express.Router()
const {newStudentForm} = require('../Controllers/newStudentController');

router.route('/').post(newStudentForm)

module.exports = router