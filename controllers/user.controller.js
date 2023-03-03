const userModel = require("../models/user.model");
const {
  hashedText,
  hashComparation,
  tokenBuild,
} = require("../plugins/encryption");
const { userId } = require("../plugins/idCreation");

const USER_NAMESPACE = "a8e17321-ec3b-4314-8d32-0cb1a58dba8f";

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hashedText(password);
    const id = userId(email, USER_NAMESPACE);

    const user = {
      id: id,
      email: email,
      password: hashedPassword,
    };

    await userModel.create(user).then((result, error) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(201).json(`The user with email: ${result.email} is created!`);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundEmail = await userModel.findOne({ where: { email: email } });

    if (foundEmail) {
      const foundPassword = await hashComparation(
        password,
        foundEmail.password
      );
      if (foundPassword) {
        const token = await tokenBuild(foundEmail.id);
        res.status(201).json({ token: token });
      } else {
        res.status(400).json({ message: "Password is wrong!" });
      }
    } else {
      res.status(400).json({ message: "User doesn't exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundEmail = await userModel.findOne({ where: { email: email } });
    if (foundEmail) {
      // res.status(201).json(foundEmail)
      const hashedPassword = await hashedText(password);
      await userModel
        .update(
          { password: hashedPassword, createdAt: foundEmail.createdAt },
          {
            where: {
              id: foundEmail.id,
            },
          }
        )
        .then((result, error) => {
          if (error) {
            res.status(400).json(error);
          }

          res.status(201).json({ message: "Password is changed!" });
        });
    } else {
      res.status(400).json({ message: "User doesn't exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  signIn,
  changePassword,
};
