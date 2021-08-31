
const { Op } = require("sequelize");
const models = require('../../../models');

const Cryptography = require('../../services/cryptography/cryptography');

class AuthController {
  async login(req, res) {
    try {
      let { username, email, password } = req.body;

      if (!username && !email) return res.status(401).send({ error: true, message: 'Username and email cannot be null.' });
      if (!password) return res.status(401).send({ error: true, message: 'Password cannot be null' });

      // password = Cryptography.encrypt(password);

      const user = models.AuthUser.findOne({
        where: {
          password: password,

          [Op.or]: [
            {
              username: username,
              email: email
            },
          ]
        },

      });

      return res.status(200).send(user);

    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: true, message: `Internal server error \n${error}` });
    }
  }

  async createUser(req, res) {
    let { username, name, email, password } = req.body;
    try {
      if (!username || !email || !password || !name) return res.status(401).send({ error: true, message: 'Any mandatory params are null.' });

      const user = await models.AuthUser.findOne({
        where: {
          [Op.or]: [
            {
              username: username,
              email: email
            },
          ]
        },

      });

      if (user) {
        return res.status(400).send({ error: true, message: 'Username or email as used.' });
      }
      const userCreated = (await models.User.create({ name }, { raw: true })).toJSON();
      // password = Cryptography.encrypt(password);

      const userId = userCreated['id'];
      const result = await models.AuthUser.create({ username, email, password, userId });

      return res.status(201).send(result);
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: true, message: 'Internal server error' });
    }
  }

}


module.exports = new AuthController();