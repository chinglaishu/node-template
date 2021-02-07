const postgresPass = process.env.PSQL_PASS || "";

const DataBaseConfig = {
  production: {
    database: "postgres",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    password: postgresPass,
    username: "postgres",
  },
  development: {
    database: "postgres",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    password: "postgres",
    username: "postgres",
  },
  test: {
    database: "user",
    dialect: "postgres",
    host: "localhost",
    logging: false,
    password: "postgres",
    username: "postgres",
  },
};

module.exports = DataBaseConfig;
