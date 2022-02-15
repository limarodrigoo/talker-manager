const fs = require('fs').promises;

const getAllTalkers = async (_req, res, _next) => {
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);
  return res.status(200).json(talkers);
};

module.exports = getAllTalkers;