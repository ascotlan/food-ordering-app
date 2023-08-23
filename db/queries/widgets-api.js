const db = require("../connection");

// Insert user_id, restarant_id and order_date into orders table. This is a helper function for 2nd oredr entry query:
const createOrder = (orderData) => {
  return db
    .query(
      `INSERT INTO orders (user_id, restaurant_id, order_date)
    VALUES ($1, $2, NOW()) RETURNING *;`,
      [orderData.user_id, orderData.restaurant_id]
    )
    .then((data) => data.rows);
};

//Insert order items into order_items table using order.id from previous insertion
const addNewItems = (orderId, menuItemsId, quantity) => {
  return db
    .query(
      `INSERT INTO order_items (order_id, menu_items_id, quantity)
    VALUES ($1, $2, $3) RETURNING *;`,
      [orderId, menuItemsId, quantity]
    )
    .then((data) => data.rows);
};

//get contact info for Admin SMS text
const newOrderContactInfo = (userId, restarantId, orderId) => {
  return db
    .query(
      `SELECT u.name, u.phone_number, o.id as order_id, o.restaurant_id, u.admin_phone_number
FROM (
    SELECT users.id, users.name, users.phone_number, orders.id as order_id, orders.restaurant_id, admin.phone_number as admin_phone_number
    FROM users
    JOIN orders ON orders.user_id = users.id
    JOIN users AS admin ON orders.restaurant_id = admin.restaurant_id AND admin.restaurant_admin = true
    WHERE users.id = $1
) AS u
JOIN orders AS o ON u.order_id = o.id
WHERE u.restaurant_id = $2 and order_id = $3;`,
      [userId, restarantId, orderId]
    )
    .then((data) => data.rows);
};

// get all open orders for a restaurant
const getOpenOrdersByRestaurantAdminId = (userId) => {
  return db
    .query(
      `SELECT orders.id as order_number, users.name as customer_name, users.phone_number as customer_phone, order_date, pending, in_progress, completed, eta
    FROM orders
    JOIN users on users.id = user_id
    WHERE completed = FALSE
    AND orders.restaurant_id = (SELECT restaurant_id FROM users WHERE id = $1 AND restaurant_admin = TRUE)
    ORDER BY order_number DESC;`,
      [userId]
    )
    .then((data) => data.rows);
};

//get order items by order.id
// get all open orders for a restaurant
const getOrderItems = (orderId) => {
  return db
    .query(
      `SELECT orders.id, order_items.quantity, menu_items.name, menu_items.price
    FROM orders
    JOIN order_items ON order_items.order_id = orders.id
    JOIN menu_items ON menu_items.id = order_items.menu_items_id
    WHERE orders.id = $1;`,
      [orderId]
    )
    .then((data) => data.rows);
};

// Update order ETA and change state to in_progress
const updateOrderEta = (orderId, eta) => {
  return db
    .query(
      `UPDATE orders
    SET eta = $1, pending = false, in_progress = true, completed = false
    WHERE id = $2
    RETURNING id, eta, pending, in_progress, completed;`,
      [eta, orderId]
    )
    .then((data) => data.rows);
};

// Update order status from in-progress to complete
const completeOrder = (orderId) => {
  return db
    .query(
      `UPDATE orders
    SET in_progress = false, completed = true
    WHERE id = $1;`,
      [orderId]
    )
    .then((data) => data.rows);
};

module.exports = {
  createOrder,
  addNewItems,
  newOrderContactInfo,
  getOpenOrdersByRestaurantAdminId,
  getOrderItems,
  updateOrderEta,
  completeOrder,
};
