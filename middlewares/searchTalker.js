const fs = require('fs').promises;

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);

  const queryTalker = talkers.filter((talker) => talker.name.includes(q));

  return res.status(200).json(queryTalker);
};

module.exports = searchTalker;