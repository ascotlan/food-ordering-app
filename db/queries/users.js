const db = require("../connection");

const getUsers = (id) => {
  return db
    .query(`SELECT name, id FROM users WHERE users.id = $1;`, [id])
    .then((data) => {
      return data.rows;
    });
};

//query user table for user type based on restaturant_id and restaurant_admin
const getUserType = (id) => {
  return db
    .query(
      `SELECT restaurant_admin, users.restaurant_id FROM users WHERE users.id = $1;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getUsers, getUserType };
