const express = require('express');
const getAllTalkers = require('../middlewares/getAllTalkers');

const router = express.Router();

router.get('/', getAllTalkers);

module.exports = router;