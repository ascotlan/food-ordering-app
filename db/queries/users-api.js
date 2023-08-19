const db = require('../connection');

const getUserOrders = (id) => {
  return db.query(`SELECT restaurants.logo_url,
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
LIMIT 3;`, [id])
    .then(data => {
      return data.rows;
    });
};

const getRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUserOrders, getRestaurants };
