const models = require('../../../models')

class UserController {
  async getOne(req, res) {
    const id = req.params.id;
    const result = await models.User.findOne({ where: { id: id } })

    console.log('result ', id)
    res.status(200).json(result);
  }

  async getAll (req, res) {
    const result = await models.User.findAll();
    return res.status(200).json(result);
  }

  async create(req, res) {
    const { username, name, email, password } = req.body;
    try {
      const result = await models.User.create({ username, name, email, password });

      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ error: true, message: 'Internal server error' });
    }
  }
}


module.exports = new UserController();