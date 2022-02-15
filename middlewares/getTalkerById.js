const fs = require('fs').promises;

const getTalkerById = async (req, res, _next) => {
  const { id } = req.params;
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);

  const talker = talkers.find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
};

module.exports = getTalkerById;