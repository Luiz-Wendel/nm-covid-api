const express = require('express');

// Controllers
const homeController = require('../controllers/homeController');

// Middlewares
const validation = require('../middlewares/validation');

const router = express.Router();

router.get('/', validation, homeController.index);

module.exports = router;
