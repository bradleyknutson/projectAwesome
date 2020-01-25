module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB.NAME,
    "host": process.env.DB.HOST,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB.NAME,
    "host": process.env.DB.HOST,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
