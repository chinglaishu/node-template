import { Sequelize } from "sequelize";
const DataBaseConfig = require("../config/config.js");

const mode = process.env.APP_ENV;

const connection = new Sequelize(mode ? (DataBaseConfig as any)[mode] as any : {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default connection;
