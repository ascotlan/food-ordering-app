const db = require("../connection");

// get order history for last 5 orders
const getUserOrders = (id) => {
  return db
    .query(
      `SELECT DISTINCT ON (orders.id)
          orders.id AS order_number,
          menu_items.name AS item_name,
          menu_items.price AS max_price,
          orders.order_date,
        orders.eta,
        orders.completed,
        orders.in_progress,
        orders.pending,
        menu_items.thumbnail_photo_url,
        restaurants.logo_url,
        restaurants.name AS restaurant
      FROM orders
      JOIN order_items ON order_items.order_id = orders.id
      JOIN menu_items ON menu_items.id = order_items.menu_items_id
      JOIN restaurants ON restaurants.id = orders.restaurant_id
      WHERE orders.user_id = $1
      ORDER BY orders.id DESC, orders.order_date DESC, max_price DESC
      LIMIT 5;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

//get all restaurants
const getRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`).then((data) => {
    return data.rows;
  });
};

// it takes in restaurant id and retrieves a restaurant's info.
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

// Get all menu items for a particular restaurant
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
