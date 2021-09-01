
const { Op } = require("sequelize");
const models = require('../../../models');

const JWTTokenService = require('../Services/JWTTokenService');

class AuthController {
  async login(req, res) {
    try {
      let { username, email, password } = req.body;

      if (!username && !email) return res.status(401).send({ error: true, message: 'Username and email cannot be null.' });
      if (!password) return res.status(401).send({ error: true, message: 'Password cannot be null' });

      // password = Cryptography.encrypt(password);

      if (!email) email = '';

      const authUser = await models.AuthUser.findOne({
        where: {
          password: password,

          [Op.or]: [
            { username: username },
            { email: email }
          ]
        },
        raw: true,
      });

      if (!authUser) return res.status(404).send({ error: true, message: 'User not found.' })

      const userToken = await JWTTokenService.sign(authUser.id);
      const user = await models.User.findOne({ where: { id: authUser.userId } });
      userToken.user = user;

      Object.keys(userToken).map(key => authUser[key] = userToken[key]);

      return res.status(200).send(authUser);

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
      const userToken = await JWTTokenService.sign(userId);
      userToken.user = result;

      return res.status(201).send(userToken);
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: true, message: 'Internal server error' });
    }
  }

}


module.exports = new AuthController();