const fs = require('fs').promises;

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);

  const newTalkers = talkers.filter((t) => t.id !== Number(id));

  const newTalker = { id: Number(id), name, age, talk };
  newTalkers.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(newTalkers));

  return res.status(200).json(newTalker);
};

module.exports = editTalker;