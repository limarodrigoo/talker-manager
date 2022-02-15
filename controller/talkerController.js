const express = require('express');
const { 
  tokenAuth, 
  nameAuth, 
  ageAuth, 
  watchedAtAuth, 
  rateAuth, 
  talkObjAuth, 
  createTalker } = require('../middlewares/creatreTalkerAuth');
const getAllTalkers = require('../middlewares/getAllTalkers');
const getTalkerById = require('../middlewares/getTalkerById');

const router = express.Router();

router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);
router.post('/', tokenAuth, nameAuth, ageAuth, talkObjAuth, watchedAtAuth, rateAuth, createTalker);

module.exports = router;