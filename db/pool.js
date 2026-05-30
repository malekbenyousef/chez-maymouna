const { Pool } = require("pg");
const role = process.env.ROLE_NAME
const passwrd = process.env.ROLE_PASSWORD
module.exports = new Pool({
  host: "localhost", 
  user: role,
  database: "chez_maymouna",
  password: passwrd,
  port: 5432 
});
