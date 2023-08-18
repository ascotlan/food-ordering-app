const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserType = (id) => {
  return db.query('SELECT restaurant_admin, users.restaurant_id FROM users WHERE users.id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getUserType };
