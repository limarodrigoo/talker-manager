const express = require('express');
const { 
  tokenAuth, 
  nameAuth, 
  ageAuth, 
  watchedAtAuth, 
  rateAuth, 
  talkObjAuth, 
  createTalker } = require('../middlewares/creatreTalkerAuth');
const deleteTalker = require('../middlewares/deleteTalker');
const editTalker = require('../middlewares/editTalker');
const getAllTalkers = require('../middlewares/getAllTalkers');
const getTalkerById = require('../middlewares/getTalkerById');

const router = express.Router();

router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);
router.post('/', tokenAuth, nameAuth, ageAuth, talkObjAuth, watchedAtAuth, rateAuth, createTalker);
router.put('/:id', tokenAuth, nameAuth, ageAuth, talkObjAuth, watchedAtAuth, rateAuth, editTalker);
router.delete('/:id', tokenAuth, deleteTalker);

module.exports = router;