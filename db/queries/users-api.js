const db = require("../connection");

const getUserOrders = (id) => {
  return db
    .query(
      `SELECT restaurants.logo_url,
  restaurants.name AS restaurant,
  orders.id AS order_number,
  orders.order_date,
  menu_items.thumbnail_photo_url
FROM orders
JOIN restaurants ON restaurants.id = orders.restaurant_id
JOIN order_items ON order_items.order_id = orders.id
JOIN menu_items ON menu_items.id = order_items.menu_items_id
WHERE orders.user_id = $1 AND orders.completed = 'true'
  AND menu_items.price = (
    SELECT MAX(price)
    FROM order_items
    JOIN menu_items ON menu_items.id = order_items.menu_items_id
    WHERE order_items.order_id = orders.id
  )
GROUP BY orders.id,
    restaurants.logo_url,
    restaurants.name,
    orders.order_date,
    menu_items.thumbnail_photo_url
ORDER BY orders.order_date DESC
LIMIT 3;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const getRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`).then((data) => {
    return data.rows;
  });
};

// it takes in restaurant id and retrieves restaurant logo and name.
// let me know if I should modify it to get rest id from users table
const getRestaurantInfo = (id) => {
  return db
    .query(
      `SELECT *
FROM restaurants
WHERE id = $1;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const getAllMenuItems = (restaurantId) => {
  return db
    .query(
      `SELECT menu_items.*, menu_categories.name as menu_category_name
    FROM menu_items
    JOIN menu_categories ON menu_items.menu_category_id = menu_categories.id
    WHERE menu_items.restaurant_id = $1;`,
      [restaurantId]
    )
    .then((data) => data.rows);
};

module.exports = {
  getUserOrders,
  getRestaurants,
  getAllMenuItems,
  getRestaurantInfo,
};
