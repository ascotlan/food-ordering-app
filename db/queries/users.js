const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

//query user table for user type based on restaturant_id and restaurant_admin
const getUser = (id) => {
  return db.query(`SELECT.....${id}`).then((data) => {
    return data.rows;
  });
};

module.exports = { getUsers };
