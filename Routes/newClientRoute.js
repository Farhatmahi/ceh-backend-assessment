const express = require("express");
const router = express.Router()
const {newClientForm} = require('../Controllers/newClientController');
const {protect} = require('../Middleware/AuthMiddleware');

router.route('/').post(protect, newClientForm)

module.exports = router