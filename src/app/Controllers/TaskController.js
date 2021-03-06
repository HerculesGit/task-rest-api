const models = require('../../../models');

class TaskController {
  async create(req, res) {
    try {
      const { name, isDone, userId } = req.body;

      if (!name) return res.status(400).send({ error: true, message: 'Name cannot be null.' });
      if (isDone === undefined || isDone === null) return res.status(400).send({ error: true, message: 'isDone cannot be null.' });
      if (!userId) return res.status(400).send({ error: true, message: 'userId cannot be null.' });

      const user = await models.User.findOne({ where: { id: userId } });

      if (!user) return res.status(401).send({ error: true, message: 'User not found.' })

      const result = await models.Task.create({ name, isDone, userId });

      return res.status(201).send(result);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: true, message: 'Internal Server error!' });
    }
  };

  async getTasks(req, res) {
    const id = req.params.userId;

    try {
      if (!id) res.status(400).send({ error: true, message: 'userId cannot be null.' })
      const tasks = await models.Task.findAll({ where: { userId: id }, raw: true });
      return res.send(tasks);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: true, message: 'Internal Server error!' });
    }
  }

  async getOne(req, res) {
    const id = req.params.id;
    try {
      const task = await models.Task.findOne({ where: { id: id } });

      return res.send(task);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: true, message: 'Internal Server error!' });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      if (!id) return res.status(404).send({ error: true, message: 'Id cannot be null.' })

      const { name, isDone } = req.body;
      const taskToUpdate = { name, isDone, updateAt: new Date() };

      const result = await models.Task.update(taskToUpdate, { where: { id: id } });
      const task = await models.Task.findOne({ where: { id: id } });
      return res.send(task);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: true, message: 'Internal Server error!' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      if (!id) return res.status(404).send({ error: true, message: 'Id cannot be null.' })
      const result = await models.Task.destroy({ where: { id: id } });

      return res.send({});
    } catch (error) {
      return res.status(500).send({ error: true, message: 'Internal Server error!' });
    }
  }
}


module.exports = new TaskController();