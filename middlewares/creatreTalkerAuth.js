const fs = require('fs').promises;

const tokenAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameAuth = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageAuth = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkObjAuth = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
      .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const watchedAtAuth = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!watchedAt) {
    return res.status(400)
      .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateAuth = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === undefined) {
    return res.status(400)
      .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;

  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);
  const lastId = talkers[talkers.length - 1].id;
  const newTalker = { id: lastId + 1, name, age, talk };
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

module.exports = { 
  tokenAuth, nameAuth, ageAuth, talkObjAuth, watchedAtAuth, rateAuth, createTalker };