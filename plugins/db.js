require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

// const POSTGRES_URL = process.env.DATABASE_URL

// const sequelize = new Sequelize(POSTGRES_URL);
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

async function connectDB() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  
module.exports = { connectDB, sequelize, Sequelize, DataTypes };