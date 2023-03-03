const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const salt = 12;
const hashedText = async (text) => {
  const hash = await bcrypt.hash(text, salt);
  return hash;
};

const hashComparation = async (string, hashesString) => {
  const compare = await bcrypt.compare(string, hashesString);
  return compare;
};

const tokenBuild = async (text) => {
  const token = jwt.sign({ id: text }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = {
  hashedText,
  hashComparation,
  tokenBuild,
};
